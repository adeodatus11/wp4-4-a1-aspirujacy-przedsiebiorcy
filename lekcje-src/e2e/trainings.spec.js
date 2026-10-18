// Trening: seria z losowanymi danymi rozwiązana kluczem, zapis wyniku, powtórka błędnych.
import { test, expect } from '@playwright/test';
import { trainings } from '../content/trainings/index.js';
import { buildItem } from '../lib/training.js';
import { solve } from './solve.js';

function watchErrors(page) {
  const errors = [];
  page.on('console', m => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', e => errors.push(e.message));
  return errors;
}

async function session(page, id) {
  return page.evaluate(key => JSON.parse(localStorage.getItem('pracownia-lekcje-v1')).trainings[key].session, id);
}

test('katalog treningów: pięć treningów z odnośnikami do modułów', async ({ page }) => {
  await page.goto('index.html#/trening');
  await expect(page.locator('.card')).toHaveCount(trainings.length);
  await expect(page.getByRole('button', { name: 'Prowadzę zajęcia' })).toHaveCount(0);
  await page.goto(`index.html#/trening/${trainings[0].id}`);
  await expect(page.locator('.module-links a').first()).toHaveAttribute('href', `../modul-${trainings[0].modules[0]}.html`);
});

for (const training of trainings) {
  test(`trening ${training.id}: seria rozwiązana kluczem daje komplet punktów`, async ({ page }) => {
    const errors = watchErrors(page);
    await page.goto(`index.html#/trening/${training.id}`);
    await page.getByRole('button', { name: 'Zacznij pierwszą serię' }).click();
    const s = await session(page, training.id);
    expect(s.items).toHaveLength(training.round);
    for (let i = 0; i < s.items.length; i++) {
      const activity = buildItem(training.pool.find(p => p.id === s.items[i]), s.seed);
      await expect(page.locator('.training-progress')).toContainText(`Zadanie ${i + 1} z ${s.items.length}`);
      await solve(page, activity);
      const last = i === s.items.length - 1;
      await page.getByRole('button', { name: last ? 'Zakończ serię i zobacz wynik' : 'Następne zadanie →' }).click();
    }
    await expect(page.locator('.training-summary h2')).toContainText(/Wynik serii: (\d+) \/ \1 pkt/);
    await expect(page.locator('.training-summary')).toContainText('Następny trening');
    await page.reload();
    await expect(page.locator('.training-status')).toContainText('Ostatnia seria');
    await page.goto('index.html#/trening');
    await expect(page.locator('.card').filter({ hasText: training.title })).toContainText('Następny:');
    expect(errors).toEqual([]);
  });
}

test('błędne zadanie wraca w powtórce, przerwanie serii', async ({ page }) => {
  const training = trainings.find(t => t.id === 'liczby-sklepu');
  const items = ['cena', 'brutto', 'prog', 'rabat', 'netto', 'jaka-marza'];
  await page.goto('index.html#/');
  await page.evaluate(([id, items]) => {
    localStorage.setItem('pracownia-lekcje-v1', JSON.stringify({ version: 1, lessons: {}, settings: {}, trainings: { [id]: { session: { seed: 'e2e', items, answers: {}, index: 0 } } } }));
  }, [training.id, items]);
  await page.goto(`index.html#/trening/${training.id}`);
  await page.reload();
  const first = buildItem(training.pool.find(p => p.id === 'cena'), 'e2e');
  const box = page.locator(`[id="a-${first.id}"]`);
  for (let k = 0; k < 2; k++) {
    await box.locator('input').fill('1');
    await box.getByRole('button', { name: 'Sprawdź' }).click();
  }
  await box.getByRole('button', { name: 'Pokaż rozwiązanie (bez punktów)' }).click();
  for (let i = 1; i < items.length; i++) {
    await page.getByRole('button', { name: 'Następne zadanie →' }).click();
    await solve(page, buildItem(training.pool.find(p => p.id === items[i]), 'e2e'));
  }
  await page.getByRole('button', { name: 'Zakończ serię i zobacz wynik' }).click();
  await expect(page.locator('.training-wrong')).toContainText(first.question.slice(0, 30));
  await page.getByRole('button', { name: 'Tylko zadania z błędem (1)' }).click();
  expect((await session(page, training.id)).items).toEqual(['cena']);
  page.once('dialog', d => d.accept());
  await page.getByRole('button', { name: 'Przerwij serię' }).click();
  await expect(page.getByRole('button', { name: 'Nowa seria (nowe dane)' })).toBeVisible();
});

test('trening na telefonie 390 px bez przewijania w bok', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const training of trainings) {
    await page.goto(`index.html#/trening/${training.id}`);
    await page.getByRole('button', { name: /Zacznij pierwszą serię|Nowa seria/ }).click();
    const s = await session(page, training.id);
    for (let i = 0; i < s.items.length; i++) {
      const activity = buildItem(training.pool.find(p => p.id === s.items[i]), s.seed);
      expect(await page.evaluate(() => document.documentElement.scrollWidth), `${training.id} ${activity.itemId}`).toBeLessThanOrEqual(390);
      await solve(page, activity);
      if (i < s.items.length - 1) await page.getByRole('button', { name: 'Następne zadanie →' }).click();
    }
  }
});
