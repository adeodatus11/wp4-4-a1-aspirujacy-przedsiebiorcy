import { test } from 'node:test';
import assert from 'node:assert/strict';
import { trainings } from '../content/trainings/index.js';
import { realia } from '../content/realia.js';
import { activityPoints, checkNumber, isScored } from '../lib/scoring.js';
import { buildItem, finishSession, nextDate, pickRound, sessionScore, startSession, trainingStatus } from '../lib/training.js';
import { shuffledOrder } from '../lib/shuffle.js';

const seeds = Array.from({ length: 40 }, (_, i) => `s${i}`);
const gendered = /\b\w+(łeś|łaś|łbyś|łabyś)\b/i;

test('każdy trening ma komplet pól i powiązanie z modułem', () => {
  const ids = new Set();
  for (const t of trainings) {
    assert.ok(!ids.has(t.id), t.id);
    ids.add(t.id);
    for (const key of ['title', 'subtitle', 'who']) assert.ok(t[key]?.length > 10, `${t.id}.${key}`);
    assert.ok(t.brief.length >= 3 && t.brief.length <= 7, `${t.id}: ściąga 3–7 punktów`);
    assert.ok(t.brief.join(' ').split(/\s+/).length <= 220, `${t.id}: ściąga za długa`);
    assert.ok(t.modules.length && t.modules.every(n => n >= 1 && n <= 8), t.id);
    assert.ok(t.round >= 5 && t.round < t.pool.length, `${t.id}: pula większa niż seria`);
    for (const key of t.realia) assert.ok(realia[key], `${t.id}: brak realiów ${key}`);
    assert.ok(new Set(t.pool.map(i => i.skill)).size >= 3, `${t.id}: co najmniej 3 umiejętności`);
  }
});

test('każde zadanie z puli buduje się poprawnie dla wielu ziaren', () => {
  for (const t of trainings) {
    for (const item of t.pool) {
      for (const seed of seeds) {
        const a = buildItem(item, seed);
        assert.ok(isScored(a), `${t.id}/${item.id}: zadanie bez punktów`);
        assert.ok(activityPoints(a) > 0);
        const text = JSON.stringify(a);
        assert.ok(!gendered.test(text), `${t.id}/${item.id}: forma rodzajowa w ${text.match(gendered)?.[0]}`);
        assert.ok(!/NaN|undefined|Infinity/.test(text), `${t.id}/${item.id}: błędne dane ${seed}`);
        if (a.type === 'choice') {
          assert.ok(a.options.length >= 2 && a.options.length <= 5, `${t.id}/${item.id}`);
          assert.equal(new Set(a.options).size, a.options.length, `${t.id}/${item.id}: powtórzona odpowiedź ${seed}`);
          assert.ok(a.correct >= 0 && a.correct < a.options.length);
          a.options.forEach((_, i) => i === a.correct || assert.ok(a.why?.[i], `${t.id}/${item.id}: brak wyjaśnienia błędnej odpowiedzi ${i}`));
        }
        if (a.type === 'number') {
          assert.ok(Number.isFinite(a.answer));
          assert.equal(checkNumber(a, String(a.answer).replace('.', ',')).correct, true);
          for (const m of a.mistakes || []) assert.ok(Math.abs(m.value - a.answer) > (a.tolerance ?? 0.01), `${t.id}/${item.id}: pomyłka równa odpowiedzi ${seed}`);
        }
        if (a.type === 'spotErrors') {
          const errors = a.lines.filter(l => l.error).length;
          assert.ok(errors >= 1 && errors < a.lines.length, `${t.id}/${item.id}`);
        }
        if (a.type === 'matching') assert.ok(a.rows.length >= 3);
      }
    }
  }
});

test('zadania z losowanymi danymi naprawdę się zmieniają', () => {
  for (const t of trainings) {
    const varied = t.pool.filter(item => new Set(seeds.map(s => JSON.stringify({ ...buildItem(item, s), id: '' }))).size > 1);
    assert.ok(varied.length >= Math.ceil(t.pool.length / 3), `${t.id}: za mało zadań ze zmiennymi danymi (${varied.length})`);
  }
});

test('poprawna odpowiedź nie stoi stale w jednym miejscu', () => {
  const positions = [0, 0, 0, 0, 0];
  for (const t of trainings) for (const item of t.pool) for (const seed of seeds) {
    const a = buildItem(item, seed);
    if (a.type !== 'choice') continue;
    positions[shuffledOrder(a.options.length, a.id).indexOf(a.correct)]++;
  }
  const total = positions.reduce((a, b) => a + b, 0);
  assert.ok(positions[0] / total < 0.4 && positions[1] / total < 0.4 && positions[2] / total < 0.4, positions.join('/'));
});

test('seria: najpierw błędne, potem nowe; zapis wyniku i termin powtórki', () => {
  const t = trainings[0];
  let progress = {};
  const s1 = startSession(t, progress, 'a');
  assert.equal(s1.items.length, t.round);
  assert.equal(new Set(s1.items).size, t.round);
  // Pierwsze zadanie źle, reszta dobrze za pierwszym razem.
  const acts = s1.items.map(id => buildItem(t.pool.find(i => i.id === id), 'a'));
  acts.forEach((a, i) => (s1.answers[a.id] = i === 0 ? { done: true, first: false, firstRatio: 0 } : { done: true, first: true, firstRatio: 1 }));
  const score = sessionScore(t, s1);
  assert.ok(score.score < score.max);
  progress = finishSession(t, progress, s1, '2026-10-18T10:00:00.000Z');
  assert.equal(progress.history.length, 1);
  assert.deepEqual(progress.history[0].wrong, [acts[0].itemId]);
  assert.equal(progress.boxes[acts[0].itemId], 0);
  const s2 = pickRound(t, progress, 'b');
  assert.equal(s2.includes(acts[0].itemId), true, 'błędne zadanie wraca');
  const fresh = t.pool.filter(i => progress.boxes[i.id] === undefined).map(i => i.id);
  assert.ok(s2.filter(id => fresh.includes(id)).length >= Math.min(fresh.length, t.round - 1), 'potem zadania jeszcze niewidziane');
  assert.deepEqual(pickRound(t, progress, 'c', { onlyWrong: true }), [acts[0].itemId]);
  assert.equal(trainingStatus(progress, '2026-10-18').kind, 'later');
  assert.equal(trainingStatus(progress, progress.history[0].next).kind, 'due');
});

test('rytm powtórek', () => {
  assert.equal(nextDate(0.5, '2026-10-18T10:00:00Z'), '2026-10-19');
  assert.equal(nextDate(0.8, '2026-10-18T10:00:00Z'), '2026-10-21');
  assert.equal(nextDate(0.95, '2026-10-18T10:00:00Z'), '2026-10-25');
});
