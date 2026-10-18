// Pomocnicze funkcje do zadań z losowanymi danymi.
import { formatNumber } from '../../lib/scoring.js';
import { int, pick, shuffle } from '../../lib/training.js';

export { int, pick, shuffle };

export const zl = value => `${formatNumber(value, 2)} zł`;

const DAY = 24 * 60 * 60 * 1000;
const days = ['niedz.', 'pon.', 'wt.', 'śr.', 'czw.', 'pt.', 'sob.'];

// Dni ustawowo wolne w 2026 r. (bez niedziel). Terminy w zadaniach nie wypadają w te dni ani w weekend,
// żeby nie wchodzić w przesuwanie terminu na następny dzień roboczy.
const holidays2026 = ['2026-01-01', '2026-01-06', '2026-04-06', '2026-05-01', '2026-06-04', '2026-08-15', '2026-11-11', '2026-12-24', '2026-12-25', '2026-12-26'];

export function addDays(date, n) {
  return new Date(date.getTime() + n * DAY);
}

export function isWorkday(date) {
  const day = date.getUTCDay();
  return day !== 0 && day !== 6 && !holidays2026.includes(date.toISOString().slice(0, 10));
}

export function dateLabel(date) {
  const dd = String(date.getUTCDate()).padStart(2, '0');
  const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
  return `${days[date.getUTCDay()]} ${dd}.${mm}`;
}

// Losowy dzień roboczy 2026 r., dla którego dzień po dodaniu `offset` też jest roboczy.
export function workdayWithDeadline(rng, offset) {
  for (let i = 0; i < 200; i++) {
    const date = new Date(Date.UTC(2026, int(rng, 0, 10), int(rng, 1, 28)));
    if (isWorkday(date) && isWorkday(addDays(date, offset))) return date;
  }
  return new Date(Date.UTC(2026, 2, 2));
}
