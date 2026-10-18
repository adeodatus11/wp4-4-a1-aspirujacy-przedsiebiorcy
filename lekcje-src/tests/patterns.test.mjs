// Pilnuje, żeby lekcje nie były skrojone z jednego szablonu: liczba etapów, nazwy,
// układ pracy, liczba odpowiedzi, miejsce poprawnej odpowiedzi, zakończenia.
// Progi są celowo luźne: chodzi o wychwycenie schematu, nie o sztuczną losowość.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadLessons } from './load.mjs';
import { lessonActivities } from '../lib/scoring.js';

const lessons = await loadLessons();
const count = list => list.reduce((m, x) => m.set(x, (m.get(x) || 0) + 1), new Map());
const top = list => Math.max(...count(list).values());
const show = list => [...count(list)].sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k}:${v}`).join(' ');
const letters = 'ABCDE';

test('liczba etapów nie jest stała', () => {
  for (const duration of [45, 90]) {
    const group = lessons.filter(l => l.duration === duration).map(l => l.sections.length);
    assert.ok(count(group).size >= 3, `${duration} min: ${show(group)}`);
    assert.ok(top(group) / group.length <= 0.45, `${duration} min: ${show(group)}`);
  }
});

test('nazwy etapów: bez stałego „Start” i „Sprawdzenie”', () => {
  const first = lessons.map(l => l.sections[0].label);
  const last = lessons.map(l => l.sections.at(-1).label);
  const all = lessons.flatMap(l => l.sections.map(s => s.label));
  assert.ok(top(first) <= 2, `pierwszy etap: ${show(first)}`);
  assert.ok(top(last) <= 2, `ostatni etap: ${show(last)}`);
  assert.ok(top(all) <= 4, `etykiety: ${show(all).slice(0, 200)}`);
});

test('czas etapów i układ pracy się różnią', () => {
  const firstMinutes = lessons.map(l => l.sections[0].duration);
  assert.ok(count(firstMinutes).size >= 4, `pierwszy etap: ${show(firstMinutes)}`);
  const grouping = lessons.map(l => l.sections.map(s => s.grouping[0]).join(''));
  assert.ok(top(grouping) / lessons.length <= 0.2, `układy: ${show(grouping)}`);
  const varied = lessons.filter(l => l.sections.some(s => ['trio', 'class', 'group'].includes(s.grouping))).length;
  assert.ok(varied >= 8, `lekcje z pracą w trójkach, grupach albo całą klasą: ${varied}`);
});

test('pytania wyboru mają różną liczbę odpowiedzi', () => {
  const sizes = lessons.flatMap(lessonActivities).filter(a => a.type === 'choice').map(a => a.options.length);
  assert.ok(count(sizes).size >= 3, show(sizes));
  assert.ok(top(sizes) / sizes.length <= 0.6, show(sizes));
});

test('poprawna odpowiedź: równy rozkład liter i bez trzech takich samych z rzędu', () => {
  const shown = [];
  for (const lesson of lessons) {
    const seq = lessonActivities(lesson)
      .filter(a => a.type === 'choice')
      .map(a => a.order.indexOf(a.correct));
    for (let i = 2; i < seq.length; i++) assert.ok(!(seq[i] === seq[i - 1] && seq[i] === seq[i - 2]), `lekcja ${lesson.id}: trzy razy ${letters[seq[i]]}`);
    shown.push(...lessonActivities(lesson).filter(a => a.type === 'choice').map(a => ({ n: a.options.length, pos: a.order.indexOf(a.correct) })));
  }
  for (let pos = 0; pos < 3; pos++) {
    const eligible = shown.filter(x => x.n > pos);
    const expected = eligible.reduce((s, x) => s + 1 / x.n, 0);
    const actual = eligible.filter(x => x.pos === pos).length;
    assert.ok(Math.abs(actual - expected) / expected <= 0.3, `litera ${letters[pos]}: ${actual} zamiast ok. ${Math.round(expected)}`);
  }
});

test('zakończenia lekcji są różne', () => {
  const lastTask = lessons.map(l => lessonActivities(l).filter(a => a.type !== 'resultCard').at(-1).type);
  assert.ok(top(lastTask) / lessons.length <= 0.4, `ostatnie zadanie: ${show(lastTask)}`);
  const lastStage = lessons.map(l => l.sections.at(-1).activities.map(a => a.type).join('+'));
  assert.ok(top(lastStage) / lessons.length <= 0.25, `ostatni etap: ${show(lastStage)}`);
  const texts = lessons.map(l => lessonActivities(l).filter(a => a.type === 'text').length);
  assert.ok(top(texts) / lessons.length <= 0.6, `zadania otwarte na lekcję: ${show(texts)}`);
});

test('wstępy etapów nie zaczynają się tak samo', () => {
  const starts = lessons.flatMap(l => l.sections.map(s => s.intro.split(/\s+/).slice(0, 2).join(' ').toLowerCase()));
  assert.ok(top(starts) <= 3, show(starts).slice(0, 200));
});

test('szukanie błędów: różna liczba wierszy i błędów', () => {
  const spots = lessons.flatMap(lessonActivities).filter(a => a.type === 'spotErrors');
  const shapes = spots.map(a => `${a.lines.length}/${a.lines.filter(l => l.error).length}`);
  assert.ok(top(shapes) / shapes.length <= 0.25, show(shapes));
  assert.ok(count(spots.map(a => a.lines.filter(l => l.error).length)).size >= 3, show(shapes));
});

test('cele lekcji: różna liczba', () => {
  const objectives = lessons.map(l => l.objectives.length);
  assert.ok(top(objectives) / lessons.length <= 0.6, show(objectives));
});

test('tekst nie odwołuje się do numerów etapów', () => {
  // Numery etapów zmieniają się przy przebudowie lekcji; odwołania po nazwie zostają prawdziwe.
  for (const lesson of lessons) {
    const text = JSON.stringify(lesson);
    const found = text.match(/etap(?:ie|u|em|y|ów)? \d/gi) || [];
    assert.deepEqual(found, [], `lekcja ${lesson.id}`);
  }
});
