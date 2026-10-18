// Trening dla dorosłych: krótka seria zadań losowanych z puli.
// Zadania liczbowe mają nowe dane przy każdym podejściu, a te z błędem wracają w kolejnej serii.
// Bez zależności od przeglądarki, żeby logikę dało się sprawdzić w Node.

import { activityScore, isScored } from './scoring.js';
import { hash, random } from './shuffle.js';

export function rngFor(...parts) {
  return random(hash(parts.join(':')));
}

export const pick = (rng, list) => list[Math.floor(rng() * list.length)];
export const int = (rng, min, max) => min + Math.floor(rng() * (max - min + 1));
export const round2 = value => Math.round(value * 100) / 100;

export function shuffle(rng, list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function sample(rng, list, count) {
  return shuffle(rng, list).slice(0, count);
}

export function newSeed(now = Date.now()) {
  return now.toString(36);
}

// Zadanie z puli w wersji na dane podejście. Identyfikator zawiera ziarno,
// więc kolejność odpowiedzi i zapis odpowiedzi są osobne dla każdej serii.
export function buildItem(item, seed) {
  const activity = item.make(rngFor(item.id, seed));
  return { ...activity, id: `${item.id}@${seed}`, itemId: item.id };
}

// Kolejność doboru: zadania z błędem w poprzedniej serii, nowe, a potem najdawniej widziane.
export function pickRound(training, progress = {}, seed, { onlyWrong = false } = {}) {
  const boxes = progress.boxes || {};
  const seen = progress.seen || {};
  const rng = rngFor(training.id, 'seria', seed);
  const pool = onlyWrong ? training.pool.filter(i => boxes[i.id] === 0) : training.pool;
  const wrong = shuffle(rng, pool.filter(i => boxes[i.id] === 0));
  const fresh = shuffle(rng, pool.filter(i => boxes[i.id] === undefined));
  const rest = shuffle(rng, pool.filter(i => boxes[i.id] > 0)).sort((a, b) => boxes[a.id] - boxes[b.id] || String(seen[a.id]).localeCompare(String(seen[b.id])));
  const size = onlyWrong ? wrong.length : Math.min(training.round, pool.length);
  const chosen = [...wrong, ...fresh, ...rest].slice(0, size);
  return spreadSkills(shuffle(rng, chosen)).map(i => i.id);
}

// Dwa zadania z tej samej umiejętności nie stoją obok siebie, jeśli da się tego uniknąć.
function spreadSkills(items) {
  const out = [];
  const left = [...items];
  while (left.length) {
    const previous = out[out.length - 1];
    const index = left.findIndex(i => !previous || i.skill !== previous.skill);
    out.push(...left.splice(index === -1 ? 0 : index, 1));
  }
  return out;
}

export function startSession(training, progress, seed, options) {
  return { seed, items: pickRound(training, progress, seed, options), answers: {}, index: 0, onlyWrong: !!options?.onlyWrong };
}

export function sessionActivities(training, session) {
  return session.items.map(id => buildItem(training.pool.find(i => i.id === id), session.seed));
}

export function sessionScore(training, session) {
  const rows = sessionActivities(training, session).map(activity => {
    const { score, max } = activityScore(activity, session.answers[activity.id]);
    return { itemId: activity.itemId, activity, score, max, full: max > 0 && score === max };
  });
  const score = Math.round(rows.reduce((sum, r) => sum + r.score, 0) * 10) / 10;
  const max = rows.reduce((sum, r) => sum + r.max, 0);
  return { rows, score, max, ratio: max ? score / max : 0 };
}

const DAY = 24 * 60 * 60 * 1000;

// Prosty rytm powtórek: słaby wynik — jutro, średni — za 3 dni, dobry — za tydzień.
export function nextDate(ratio, from) {
  const days = ratio >= 0.9 ? 7 : ratio >= 0.7 ? 3 : 1;
  return new Date(new Date(from).getTime() + days * DAY).toISOString().slice(0, 10);
}

export function finishSession(training, progress = {}, session, now = new Date().toISOString()) {
  const result = sessionScore(training, session);
  const boxes = { ...(progress.boxes || {}) };
  const seen = { ...(progress.seen || {}) };
  for (const row of result.rows) {
    boxes[row.itemId] = row.full ? Math.min(3, (boxes[row.itemId] || 0) + 1) : 0;
    seen[row.itemId] = now;
  }
  const entry = {
    date: now,
    score: result.score,
    max: result.max,
    wrong: result.rows.filter(r => !r.full).map(r => r.itemId),
    next: nextDate(result.ratio, now),
  };
  return { boxes, seen, history: [...(progress.history || []), entry].slice(-30), session: null };
}

export function trainingStatus(progress = {}, today = new Date().toISOString().slice(0, 10)) {
  const last = progress.history?.at(-1);
  if (progress.session) return { kind: 'open', last };
  if (!last) return { kind: 'new' };
  return { kind: last.next <= today ? 'due' : 'later', last };
}

export function wrongCount(progress = {}) {
  return Object.values(progress.boxes || {}).filter(b => b === 0).length;
}

export function sessionDone(training, session) {
  return sessionActivities(training, session).every(a => !isScored(a) || session.answers[a.id]?.done);
}
