// Ścieżka modułu: rozwiązanie kluczem, karta wyniku i zapis pól do „Mojego projektu” serwisu.
import { test, expect } from '@playwright/test';
import { modules } from '../content/modules/index.js';
import { formatNumber, lessonScore } from '../lib/scoring.js';
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
    const { max } = lessonScore(unit, {});
    await expect(page.locator('.result-score strong')).toHaveText(formatNumber(max, 1));
    await expect(page.getByText('W szkole: proponowana ocena')).toHaveCount(0);
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
