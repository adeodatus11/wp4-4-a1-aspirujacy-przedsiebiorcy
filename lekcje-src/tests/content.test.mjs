// Kontrakt treści lekcji. Pilnuje struktury, czasu, jakości pytań i stylu.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadLessons } from './load.mjs';
import { realia } from '../content/realia.js';
import { isScored, lessonActivities } from '../lib/scoring.js';
import { shuffledOrder } from '../lib/shuffle.js';

const lessons = await loadLessons();
const knownTypes = new Set(['choice', 'multi', 'number', 'matching', 'sequence', 'text', 'checklist', 'info', 'docForm', 'spotErrors', 'dialog', 'resultCard']);
const filled = value => typeof value === 'string' && value.trim().length > 0;
const words = text => (text || '').split(/\s+/).filter(Boolean).length;

// Zwroty, które w tekście dla ucznia brzmią sztucznie albo są kalkami.
const bannedPhrases = [
  'wygodnego doboru',
  'kwalifikowane zapytania',
  'w dzisiejszym dynamicznym',
  'warto zauważyć',
  'podsumowując',
  'kluczowe znaczenie',
  'odgrywa kluczową rolę',
  'w erze cyfrowej',
  'holistyczn',
  'synergi',
  'ask',
];

for (const lesson of lessons) {
  test(`lekcja ${lesson.id} (${lesson.file}): pola główne`, () => {
    assert.match(lesson.id, /^\d{2}$/);
    assert.equal(lesson.order, Number(lesson.id));
    assert.ok(['A', 'B'].includes(lesson.part));
    for (const key of ['title', 'subtitle', 'exitTicket']) assert.ok(filled(lesson[key]), `brak ${key}`);
    assert.ok([45, 90].includes(lesson.duration));
    assert.deepEqual(lesson.sessions, lesson.duration === 90 ? [45, 45] : [45]);
    assert.ok(lesson.han.length > 0 && lesson.han.every(u => /^HAN\.0[12]\.\d+$/.test(u)), 'jednostki HAN');
    assert.ok(lesson.tags.length >= 2 && lesson.tags.length <= 5, 'tagi 2–5');
    assert.ok(filled(lesson.audience?.adults), 'wskazówka dla dorosłych');
    for (const key of ['name', 'student', 'teacher', 'grouping']) assert.ok(filled(lesson.format?.[key]), `format.${key}`);
    assert.ok(lesson.format.methods.length >= 1);
    assert.ok(lesson.objectives.length >= 2 && lesson.objectives.length <= 5);
    assert.ok(lesson.materials.length >= 1);
    assert.ok(filled(lesson.teacherGuide?.preparation) && filled(lesson.teacherGuide?.summary));
    for (const key of lesson.realia || []) assert.ok(realia[key], `nieznany wpis realiów ${key}`);
  });

  test(`lekcja ${lesson.id}: etapy i czas`, () => {
    assert.ok(lesson.sections.length >= 3);
    const ids = new Set();
    let minutes = 0;
    let breakAt = null;
    for (const section of lesson.sections) {
      assert.ok(!ids.has(section.id), `powtórzony etap ${section.id}`);
      ids.add(section.id);
      for (const key of ['label', 'title', 'intro', 'teacherNotes', 'askStudents', 'expectedAnswers', 'commonMistakes', 'optionalExtension']) {
        assert.ok(filled(section[key]), `etap ${section.id}: brak ${key}`);
      }
      assert.ok(section.duration > 0);
      assert.ok(section.label.length <= 14, `etap ${section.id}: etykieta za długa`);
      minutes += section.duration;
      if (section.breakAfter) {
        assert.equal(breakAt, null, 'tylko jedna przerwa');
        breakAt = minutes;
      }
    }
    assert.equal(minutes, lesson.duration, 'suma minut etapów');
    if (lesson.duration === 90) assert.equal(breakAt, 45, 'przerwa po 45 minutach');
    else assert.equal(breakAt, null, 'lekcja 45 min bez przerwy');
  });

  test(`lekcja ${lesson.id}: ćwiczenia`, () => {
    const all = lessonActivities(lesson);
    const ids = new Set();
    for (const a of all) {
      assert.ok(knownTypes.has(a.type), `nieznany typ ${a.type}`);
      if (a.type === 'info') continue;
      assert.ok(filled(a.id), 'ćwiczenie bez id');
      assert.ok(!ids.has(a.id), `powtórzone id ${a.id}`);
      ids.add(a.id);
      checkActivity(a);
    }
    const cards = all.filter(a => a.type === 'resultCard');
    assert.equal(cards.length, 1, 'jedna karta wyniku');
    assert.ok(lesson.sections.at(-1).activities.includes(cards[0]), 'karta wyniku w ostatnim etapie');
    const scored = all.filter(isScored).length;
    assert.ok(scored >= (lesson.duration / 45) * 5, `za mało zadań z punktami: ${scored}`);
  });

  test(`lekcja ${lesson.id}: ilość tekstu i styl`, () => {
    const reading = lesson.sections.reduce(
      (sum, s) => sum + words(s.intro) + (s.reading?.paragraphs || []).reduce((n, p) => n + words(p), 0),
      0,
    );
    assert.ok(reading <= (lesson.duration / 45) * 650, `za dużo tekstu do czytania: ${reading} słów`);
    const studentText = JSON.stringify({ s: lesson.sections.map(s => [s.intro, s.reading, s.activities]), t: lesson.subtitle }).toLowerCase();
    for (const phrase of bannedPhrases) {
      const pattern = new RegExp(`(^|[^a-ząćęłńóśźż])${phrase}`, 'i');
      assert.ok(!pattern.test(studentText), `zakazany zwrot „${phrase}”`);
    }
    const fictional = (studentText.match(/fikcyjn/g) || []).length;
    assert.ok(fictional <= 1, `„fikcyjny” ${fictional} razy — wystarczy stopka serwisu`);
  });
}

function checkActivity(a) {
  switch (a.type) {
    case 'choice': {
      assert.equal(a.options.length, 4, `${a.id}: 4 odpowiedzi`);
      assert.ok(a.correct >= 0 && a.correct < 4, `${a.id}: indeks poprawnej`);
      assert.equal(new Set(a.options).size, 4, `${a.id}: odpowiedzi się powtarzają`);
      assert.ok(filled(a.explanation), `${a.id}: wyjaśnienie`);
      a.options.forEach((_, i) => {
        if (i !== a.correct) assert.ok(filled(a.why?.[i]), `${a.id}: brak komentarza do błędnej odpowiedzi ${i}`);
      });
      break;
    }
    case 'multi':
      assert.ok(a.options.length >= 4 && a.correct.length >= 2, `${a.id}: multi`);
      assert.ok(filled(a.explanation));
      break;
    case 'number':
      assert.equal(typeof a.answer, 'number', `${a.id}: odpowiedź liczbowa`);
      assert.ok(filled(a.explanation), `${a.id}: wyjaśnienie`);
      for (const m of a.mistakes || []) {
        assert.ok(Math.abs(m.value - a.answer) > (a.tolerance ?? 0.01), `${a.id}: pomyłka równa odpowiedzi`);
        assert.ok(filled(m.text));
      }
      break;
    case 'matching':
      assert.ok(a.options.length >= 2 && a.rows.length >= 3, `${a.id}: dopasowanie`);
      for (const r of a.rows) assert.ok(r.correct >= 0 && r.correct < a.options.length, `${a.id}: ${r.label}`);
      break;
    case 'sequence':
      assert.ok(a.items.length >= 3, `${a.id}: kolejność`);
      break;
    case 'text':
      assert.ok(filled(a.question) && filled(a.model), `${a.id}: pytanie i wzór`);
      break;
    case 'checklist':
      assert.ok(a.items.length >= 2);
      break;
    case 'docForm': {
      const used = new Set();
      const visit = cell => {
        if (cell && typeof cell === 'object' && cell.f) used.add(cell.f);
      };
      a.doc.meta?.forEach(([, v]) => visit(v));
      a.doc.table?.rows.forEach(row => row.forEach(visit));
      a.doc.after?.forEach(([, v]) => visit(v));
      assert.deepEqual([...used].sort(), Object.keys(a.fields).sort(), `${a.id}: pola dokumentu`);
      for (const [key, f] of Object.entries(a.fields)) {
        assert.ok(filled(f.label), `${a.id}.${key}: etykieta`);
        assert.ok(f.answer !== undefined, `${a.id}.${key}: odpowiedź`);
        if (f.kind === 'select') assert.ok(f.options.includes(f.answer), `${a.id}.${key}: odpowiedź spoza listy`);
      }
      assert.ok(filled(a.explanation));
      break;
    }
    case 'spotErrors': {
      const errors = a.lines.filter(l => l.error).length;
      assert.ok(errors >= 1 && errors < a.lines.length, `${a.id}: błędy i poprawne wiersze`);
      assert.ok(filled(a.explanation));
      break;
    }
    case 'dialog': {
      assert.ok(a.nodes[a.start], `${a.id}: start`);
      let ends = 0;
      for (const [key, node] of Object.entries(a.nodes)) {
        if (node.end) {
          ends++;
          continue;
        }
        assert.ok(node.choices.length >= 2, `${a.id}.${key}: wybory`);
        assert.ok(node.choices.some(c => c.good), `${a.id}.${key}: brak dobrej odpowiedzi`);
        for (const c of node.choices) {
          assert.ok(filled(c.feedback), `${a.id}.${key}: komentarz`);
          if (c.good) assert.ok(a.nodes[c.next], `${a.id}.${key}: brak węzła ${c.next}`);
        }
      }
      assert.ok(ends >= 1, `${a.id}: brak zakończenia`);
      break;
    }
    case 'resultCard':
      assert.ok(Array.isArray(a.badges));
      break;
    default:
      break;
  }
}

test('katalog: numery bez powtórzeń i właściwe części', () => {
  const ids = lessons.map(l => l.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const l of lessons) assert.equal(l.part, Number(l.id) <= 15 ? 'A' : 'B', `część lekcji ${l.id}`);
});

test('katalog: komplet 34 lekcji', () => {
  assert.deepEqual(
    lessons.map(l => l.id),
    Array.from({ length: 34 }, (_, i) => String(i + 1).padStart(2, '0')),
  );
});

test('pytania wyboru: poprawna odpowiedź nie wyróżnia się długością ani miejscem', () => {
  const choices = lessons.flatMap(lessonActivities).filter(a => a.type === 'choice');
  if (choices.length < 10) return;
  const longest = choices.filter(a => {
    const lengths = a.options.map(o => o.length);
    return lengths[a.correct] === Math.max(...lengths) && lengths.filter(l => l === Math.max(...lengths)).length === 1;
  }).length;
  assert.ok(longest / choices.length <= 0.4, `najdłuższa jest poprawna w ${longest} z ${choices.length}`);
  const positions = [0, 0, 0, 0];
  for (const a of choices) positions[shuffledOrder(4, a.id).indexOf(a.correct)]++;
  for (const count of positions) assert.ok(count / choices.length <= 0.4, `rozkład liter: ${positions.join('/')}`);
});

test('realia: data sprawdzenia nie starsza niż rok', () => {
  const stale = Object.entries(realia).filter(([, r]) => Date.now() - new Date(r.checked).getTime() > 365 * 24 * 3600 * 1000);
  if (stale.length) console.warn(`Do ponownego sprawdzenia: ${stale.map(([k]) => k).join(', ')}`);
  for (const r of Object.values(realia)) assert.ok(filled(r.value) && filled(r.source) && filled(r.url));
});
