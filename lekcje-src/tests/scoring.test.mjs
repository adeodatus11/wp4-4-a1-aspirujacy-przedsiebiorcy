import { test } from 'node:test';
import assert from 'node:assert/strict';
import { activityScore, checkDocFields, checkNumber, checkSpotErrors, lessonScore, parseNumber } from '../lib/scoring.js';
import { scrambledOrder, shuffledOrder } from '../lib/shuffle.js';
import { loadState, saveState, storageKey, withLesson, withoutLesson } from '../lib/store.js';

test('liczby po polsku', () => {
  assert.equal(parseNumber('1 234,50'), 1234.5);
  assert.equal(parseNumber('12,5 zł'), 12.5);
  assert.equal(parseNumber('−3,33%'), -3.33);
  assert.equal(parseNumber('20%'), 20);
  assert.equal(parseNumber('abc'), null);
  assert.equal(parseNumber(''), null);
});

test('liczba z tolerancją i rozpoznaniem typowej pomyłki', () => {
  const activity = { answer: 200, tolerance: 0.01, mistakes: [{ value: 192, text: 'narzut' }] };
  assert.equal(checkNumber(activity, '200,00').correct, true);
  assert.equal(checkNumber(activity, '192').mistake.text, 'narzut');
  assert.equal(checkNumber(activity, '199').mistake, null);
  assert.equal(checkNumber(activity, 'dwieście').valid, false);
});

test('punkty: pierwsze trafienie, poprawka, brak', () => {
  const a = { type: 'choice' };
  assert.deepEqual(activityScore(a, { first: true, done: true }), { score: 1, max: 1 });
  assert.deepEqual(activityScore(a, { first: false, done: true }), { score: 0.5, max: 1 });
  assert.deepEqual(activityScore(a, undefined), { score: 0, max: 1 });
  const m = { type: 'matching', rows: [{}, {}, {}, {}] };
  assert.deepEqual(activityScore(m, { firstRatio: 0.75 }), { score: 3, max: 4 });
});

test('pola dokumentu', () => {
  const fields = { a: { answer: 1600 }, b: { kind: 'text', answer: 'PZ', accept: ['przyjęcie zewnętrzne'] }, c: { kind: 'select', answer: 'FIFO' } };
  const r = checkDocFields(fields, { a: '1 600,00', b: ' pz ', c: 'LIFO' });
  assert.deepEqual(r, { a: true, b: true, c: false });
});

test('szukanie błędów odejmuje fałszywe alarmy', () => {
  const activity = { lines: [{ error: 'x' }, {}, { error: 'y' }, {}] };
  assert.equal(checkSpotErrors(activity, [0, 2]).ratio, 1);
  assert.equal(checkSpotErrors(activity, [0, 1]).ratio, 0);
  assert.equal(checkSpotErrors(activity, [0]).ratio, 0.5);
});

test('kolejność odpowiedzi stała i zawsze pomieszana do układania', () => {
  assert.deepEqual(shuffledOrder(4, 'q1'), shuffledOrder(4, 'q1'));
  for (let i = 0; i < 50; i++) {
    const order = scrambledOrder(3, `s${i}`);
    assert.ok(!order.every((v, j) => v === j));
  }
});

test('wynik lekcji i ocena', () => {
  const lesson = {
    sections: [
      { activities: [{ type: 'choice', id: 'a' }, { type: 'number', id: 'b' }, { type: 'text', id: 'c' }] },
    ],
  };
  const r = lessonScore(lesson, { a: { first: true, done: true }, b: { done: true } });
  assert.equal(r.score, 1.5);
  assert.equal(r.max, 2);
  assert.equal(r.grade, 'dobra (4)');
});

test('zapis: odczyt, uszkodzony wpis, brak storage', () => {
  const memory = new Map();
  const storage = { getItem: k => memory.get(k) ?? null, setItem: (k, v) => memory.set(k, v), removeItem: k => memory.delete(k) };
  let state = loadState(storage);
  state = withLesson(state, '19', s => ({ ...s, answers: { q: { done: true } } }));
  assert.ok(saveState(state, storage));
  assert.equal(loadState(storage).lessons['19'].answers.q.done, true);
  assert.deepEqual(withoutLesson(state, '19').lessons, {});
  memory.set(storageKey, '{zepsute');
  assert.deepEqual(loadState(storage).lessons, {});
  const broken = { getItem() { throw new Error('blokada'); }, setItem() { throw new Error('blokada'); } };
  assert.deepEqual(loadState(broken).lessons, {});
  assert.equal(saveState(state, broken), false);
});
