// Każda lekcja rozwiązana w przeglądarce kluczem odpowiedzi z pliku treści.
// Sprawdza, że klucze są spójne z interfejsem i że karta wyniku pokazuje komplet punktów.
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { loadLessons } from '../tests/load.mjs';
import { formatNumber, lessonScore } from '../lib/scoring.js';
import { solve } from './solve.js';

const lessons = await loadLessons();

function watchErrors(page) {
  const errors = [];
  page.on('console', m => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', e => errors.push(e.message));
  return errors;
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

test('dostępność (axe): katalog, lekcja, plan, trening', async ({ page }) => {
  const lesson = lessons[0];
  for (const hash of ['', `#/lekcja/${lesson.id}`, `#/lekcja/${lesson.id}/${lesson.sections.length}`, `#/plan/${lesson.id}`, '#/o-lekcjach', '#/trening', '#/trening/zwroty', '#/modul/1', '#/modul/1/8', '#/modul/6/2', '#/modul/6/5', '#/modul/8/5', '#/modul/8/8']) {
    await page.goto(`index.html${hash}`);
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
    expect(result.violations.map(v => `${hash}: ${v.id} — ${v.nodes.length}`)).toEqual([]);
  }
});
