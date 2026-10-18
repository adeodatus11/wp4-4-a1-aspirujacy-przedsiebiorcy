// Każda lekcja rozwiązana w przeglądarce kluczem odpowiedzi z pliku treści.
// Sprawdza, że klucze są spójne z interfejsem i że karta wyniku pokazuje komplet punktów.
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { loadLessons } from '../tests/load.mjs';
import { formatNumber, lessonScore } from '../lib/scoring.js';

const lessons = await loadLessons();

function watchErrors(page) {
  const errors = [];
  page.on('console', m => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', e => errors.push(e.message));
  return errors;
}

const exact = text => new RegExp(`^${text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`);

async function solve(page, activity) {
  const box = page.locator(`#a-${activity.id}`);
  switch (activity.type) {
    case 'choice':
      await box.locator('label.option').filter({ has: page.locator('span', { hasText: exact(activity.options[activity.correct]) }) }).click();
      await box.getByRole('button', { name: 'Sprawdź' }).click();
      await expect(box.locator('.feedback-ok')).toBeVisible();
      break;
    case 'multi':
      for (const i of activity.correct) {
        await box.locator('label.option').filter({ has: page.locator('span', { hasText: exact(activity.options[i]) }) }).click();
      }
      await box.getByRole('button', { name: 'Sprawdź' }).click();
      await expect(box.locator('.feedback-ok')).toBeVisible();
      break;
    case 'number':
      await box.locator('input').fill(formatNumber(activity.answer).replace(/\s/g, ''));
      await box.getByRole('button', { name: 'Sprawdź' }).click();
      await expect(box.locator('.feedback-ok')).toBeVisible();
      break;
    case 'matching': {
      const rows = box.locator('.match-rows > li');
      for (let i = 0; i < activity.rows.length; i++) {
        await rows.nth(i).getByRole('radio', { name: activity.options[activity.rows[i].correct], exact: true }).click();
      }
      await box.getByRole('button', { name: 'Sprawdź' }).click();
      await expect(box.locator('.feedback-ok')).toBeVisible();
      break;
    }
    case 'sequence': {
      for (let target = 0; target < activity.items.length; target++) {
        const item = activity.items[target];
        for (;;) {
          const texts = await box.locator('.sequence-text').allTextContents();
          if (texts.indexOf(item) <= target) break;
          await box.getByRole('button', { name: `Przesuń wyżej: ${item}`, exact: true }).click();
        }
      }
      await box.getByRole('button', { name: 'Sprawdź kolejność' }).click();
      await expect(box.locator('.feedback-ok')).toBeVisible();
      break;
    }
    case 'docForm':
      for (const field of Object.values(activity.fields)) {
        const input = box.getByLabel(field.label, { exact: true });
        if (field.kind === 'select') await input.selectOption(field.answer);
        else await input.fill(String(field.answer).replace('.', ','));
      }
      await box.getByRole('button', { name: 'Sprawdź dokument' }).click();
      await expect(box.locator('.feedback-ok')).toBeVisible();
      break;
    case 'spotErrors':
      for (const line of activity.lines.filter(l => l.error)) {
        await box.locator('.spot-lines button').filter({ hasText: exact(line.text) }).click();
      }
      await box.getByRole('button', { name: /^Sprawdź/ }).click();
      await expect(box.locator('.feedback-ok')).toBeVisible();
      break;
    case 'dialog': {
      let node = activity.nodes[activity.start];
      while (!node.end) {
        const good = node.choices.find(c => c.good);
        await box.locator('.chat-choice').filter({ hasText: exact(good.text) }).click();
        node = activity.nodes[good.next];
      }
      await expect(box.locator('.feedback-ok')).toBeVisible();
      break;
    }
    case 'text':
      await box.locator('textarea').fill(activity.model);
      break;
    default:
      break;
  }
}

for (const lesson of lessons) {
  test(`lekcja ${lesson.id}: rozwiązanie kluczem daje komplet punktów`, async ({ page }) => {
    const errors = watchErrors(page);
    for (let i = 0; i < lesson.sections.length; i++) {
      await page.goto(`index.html#/lekcja/${lesson.id}/${i + 1}`);
      await expect(page.locator('.stage > h2')).toHaveText(lesson.sections[i].title);
      for (const activity of lesson.sections[i].activities) await solve(page, activity);
    }
    const { max } = lessonScore(lesson, {});
    await expect(page.locator('.result-score strong')).toHaveText(formatNumber(max, 1));
    expect(errors).toEqual([]);
  });
}

test('telefon 390 px: żaden etap nie przewija się w bok', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const lesson of lessons) {
    for (let i = 0; i < lesson.sections.length; i++) {
      await page.goto(`index.html#/lekcja/${lesson.id}/${i + 1}`);
      const width = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(width, `lekcja ${lesson.id}, etap ${i + 1}`).toBeLessThanOrEqual(390);
    }
  }
});

test('zapis postępu, odświeżenie i czyszczenie odpowiedzi', async ({ page }) => {
  const lesson = lessons[0];
  const activity = lesson.sections.flatMap(s => s.activities).find(a => a.type === 'choice' || a.type === 'number');
  const stage = lesson.sections.findIndex(s => s.activities.includes(activity));
  await page.goto(`index.html#/lekcja/${lesson.id}/${stage + 1}`);
  await solve(page, activity);
  await page.reload();
  await expect(page.locator(`#a-${activity.id} .feedback-ok`)).toBeVisible();
  page.once('dialog', d => d.accept());
  await page.getByRole('button', { name: 'Wyczyść moje odpowiedzi w tej lekcji' }).click();
  await expect(page.locator(`#a-${activity.id} .feedback-ok`)).toHaveCount(0);
});

test('tryb prowadzącego: notatki etapu i plan do druku', async ({ page }) => {
  const lesson = lessons[0];
  await page.goto(`index.html#/lekcja/${lesson.id}`);
  await page.getByRole('button', { name: 'Prowadzę zajęcia' }).click();
  await page.getByRole('button', { name: 'Notatki prowadzącego do tego etapu' }).click();
  await expect(page.getByRole('dialog')).toContainText(lesson.sections[0].askStudents);
  await page.getByRole('button', { name: 'Zamknij notatki' }).click();
  await page.goto(`index.html#/plan/${lesson.id}`);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(lesson.title);
  await expect(page.getByRole('heading', { name: 'Klucz odpowiedzi' })).toBeVisible();
});

test('katalog: filtr i wyszukiwanie', async ({ page }) => {
  await page.goto('index.html');
  await expect(page.locator('.card')).toHaveCount(lessons.length);
  await page.getByLabel('Szukaj').fill(lessons[0].tags[0]);
  await expect(page.locator('.card').first()).toBeVisible();
  await page.getByLabel('Szukaj').fill('xyz-brak-takiej-lekcji');
  await expect(page.locator('.card')).toHaveCount(0);
});

test('dostępność (axe): katalog, lekcja, plan', async ({ page }) => {
  const lesson = lessons[0];
  for (const hash of ['', `#/lekcja/${lesson.id}`, `#/lekcja/${lesson.id}/${lesson.sections.length}`, `#/plan/${lesson.id}`, '#/o-lekcjach']) {
    await page.goto(`index.html${hash}`);
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
    expect(result.violations.map(v => `${hash}: ${v.id} — ${v.nodes.length}`)).toEqual([]);
  }
});
