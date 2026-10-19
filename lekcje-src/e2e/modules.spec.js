// Ścieżka modułu: rozwiązanie kluczem, karta wyniku i zapis pól do „Mojego projektu” serwisu.
import { test, expect } from '@playwright/test';
import { modules } from '../content/modules/index.js';
import { solve } from './solve.js';

for (const unit of modules) {
  test(`moduł ${unit.n}: przejście kluczem i pola w Moim projekcie`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => m.type() === 'error' && errors.push(m.text()));
    for (let i = 0; i < unit.sections.length; i++) {
      await page.goto(`index.html#/modul/${unit.n}/${i + 1}`);
      await expect(page.locator('.stage > h2')).toHaveText(unit.sections[i].title);
      for (const activity of unit.sections[i].activities) await solve(page, activity);
    }
    await expect(page.locator('.result-card')).toHaveCount(0);
    await expect(page.locator('.module-summary')).toContainText(`Pola projektu: ${unit.sections.flatMap(s => s.activities).filter(a => a.type === 'projectField').length} z`);
    const field = unit.sections.flatMap(s => s.activities).find(a => a.type === 'projectField');
    await page.goto('../moj-projekt.html');
    await expect(page.locator(`[data-note="${field.field}"]`)).toHaveValue(field.example);
    expect(errors).toEqual([]);
  });

  test(`moduł ${unit.n}: telefon 390 px`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    for (let i = 0; i < unit.sections.length; i++) {
      await page.goto(`index.html#/modul/${unit.n}/${i + 1}`);
      expect(await page.evaluate(() => document.documentElement.scrollWidth), `etap ${i + 1}`).toBeLessThanOrEqual(390);
    }
  });
}

test('lista modułów: wszystkie ścieżki i link z etapu', async ({ page }) => {
  await page.goto('index.html#/moduly');
  await expect(page.locator('.module-paths a')).toHaveCount(modules.length);
  for (const unit of modules) await expect(page.locator(`.module-paths a[href="#/modul/${unit.n}"]`)).toContainText(unit.title);
  await page.goto(`index.html#/modul/${modules.at(-1).n}/2`);
  await page.getByRole('link', { name: 'Wszystkie moduły' }).click();
  await expect(page.locator('h1')).toContainText(`${modules.length} modułów`);
});

test('pasek etapów pokazuje bieżący etap także na telefonie', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const unit = modules.reduce((a, b) => (b.sections.length > a.sections.length ? b : a));
  const last = unit.sections.length;
  await page.goto(`index.html#/modul/${unit.n}/${last}`);
  const box = await page.locator('.stages .is-current').boundingBox();
  expect(box.x).toBeGreaterThanOrEqual(0);
  expect(box.x + box.width).toBeLessThanOrEqual(390);
});
