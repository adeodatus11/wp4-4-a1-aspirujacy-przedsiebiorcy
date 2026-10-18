// Rozwiązuje zadanie w przeglądarce kluczem z pliku treści.
import { expect } from '@playwright/test';
import { formatNumber } from '../lib/scoring.js';

export const exact = text => new RegExp(`^${text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`);

export async function solve(page, activity) {
  const box = page.locator(`[id="a-${activity.id}"]`);
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

