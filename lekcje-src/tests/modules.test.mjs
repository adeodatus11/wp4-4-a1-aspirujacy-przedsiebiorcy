// Kontrakt ścieżek pracy własnej do modułów programu.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { join } from 'node:path';
import { realia } from '../content/realia.js';
import { isScored, lessonActivities } from '../lib/scoring.js';

const dir = fileURLToPath(new URL('../content/modules/', import.meta.url));
const course = JSON.parse(readFileSync(new URL('../../src/course.json', import.meta.url)));
const units = [];
for (const file of readdirSync(dir).filter(f => /^\d+.*\.js$/.test(f)).sort()) units.push((await import(pathToFileURL(join(dir, file)).href)).default);
const words = text => (text || '').split(/\s+/).filter(Boolean).length;

for (const unit of units) {
  const source = course.find(m => m.n === unit.n);

  test(`moduł ${unit.n}: pola i czas`, () => {
    assert.ok(source, 'moduł istnieje w src/course.json');
    assert.equal(unit.title, source.title, 'tytuł jak na stronie modułu');
    assert.ok(unit.objectives.length >= 3 && unit.objectives.length <= 6);
    assert.ok(unit.forGroup && unit.solo, 'wskazówki do pracy w grupie i bez grupy');
    for (const key of unit.realia) assert.ok(realia[key], `realia ${key}`);
    const minutes = unit.sections.reduce((s, x) => s + x.duration, 0);
    assert.equal(minutes, unit.duration, 'suma minut etapów');
    assert.ok(unit.duration >= 75 && unit.duration <= 120, 'ścieżka na około półtorej godziny');
    for (const s of unit.sections) {
      assert.ok(s.label.length <= 14, `etykieta ${s.label}`);
      assert.ok(s.title && s.intro, `etap ${s.id}`);
    }
  });

  test(`moduł ${unit.n}: zadania i pola projektu`, () => {
    const all = lessonActivities(unit);
    const scored = all.filter(isScored);
    assert.ok(scored.length >= 8, `zadań z informacją zwrotną: ${scored.length}`);
    for (const a of all.filter(a => a.type === 'choice')) {
      a.options.forEach((_, i) => i === a.correct || assert.ok(a.why?.[i], `${a.id}: wyjaśnienie błędnej odpowiedzi ${i}`));
    }
    const fields = all.filter(a => a.type === 'projectField');
    assert.deepEqual(
      fields.map(f => f.field).sort(),
      source.fields.map((_, i) => `m${unit.n}-${i}`).sort(),
      'wszystkie pola projektu modułu, każde raz',
    );
    for (const f of fields) assert.equal(f.label, source.fields[Number(f.field.split('-')[1])], `${f.field}: nazwa pola jak w projekcie`);
    assert.equal(all.filter(a => a.type === 'resultCard').length, 0, 'bez karty oceny — moduł kończy podsumowanie');
    assert.ok(unit.outcome, 'rezultat modułu do podsumowania');
  });

  test(`moduł ${unit.n}: objętość i język`, () => {
    const reading = unit.sections.reduce((sum, s) => sum + words(s.intro) + (s.reading?.paragraphs || []).reduce((n, p) => n + words(p), 0), 0);
    assert.ok(reading <= (unit.duration / 45) * 650, `za dużo tekstu do czytania: ${reading} słów`);
    const text = JSON.stringify(unit.sections);
    assert.deepEqual(text.match(/[a-ząćęłńóśźż]+(?:łeś|łaś|łbyś|łabyś)(?![a-ząćęłńóśźż])/gi) || [], [], 'formy rodzajowe');
    assert.ok(!/\.replace\(/.test(readFileSync(join(dir, readdirSync(dir).find(f => f.startsWith(String(unit.n).padStart(2, '0')))), 'utf8')), 'bez łatania tekstu w kodzie');
  });
}
