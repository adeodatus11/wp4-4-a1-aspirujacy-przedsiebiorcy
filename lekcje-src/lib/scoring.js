// Ocena odpowiedzi i punktacja lekcji. Bez zależności od przeglądarki,
// żeby te same funkcje działały w interfejsie i w testach Node.

// Liczba wpisana po polsku: przecinek albo kropka, spacje tysięcy, opcjonalne „zł” lub „%”.
export function parseNumber(input) {
  if (input === null || input === undefined) return null;
  const text = String(input)
    .trim()
    .replace(/−/g, '-')
    .replace(/(zł|pln|%|szt\.?|kg)$/i, '')
    .replace(/[\s ]/g, '')
    .replace(',', '.');
  if (!/^-?\d+(\.\d+)?$/.test(text)) return null;
  return Number(text);
}

export function formatNumber(value, digits = 2) {
  const rounded = Math.round(value * 10 ** digits) / 10 ** digits;
  return rounded.toLocaleString('pl-PL', { minimumFractionDigits: 0, maximumFractionDigits: digits });
}

export function checkNumber(activity, input) {
  const value = parseNumber(input);
  if (value === null) return { valid: false, correct: false };
  const tolerance = activity.tolerance ?? 0.01;
  const correct = Math.abs(value - activity.answer) <= tolerance + 1e-9;
  const mistake = correct
    ? null
    : (activity.mistakes || []).find(m => Math.abs(value - m.value) <= tolerance + 1e-9) || null;
  return { valid: true, correct, mistake, value };
}

export function checkMulti(activity, selected) {
  const want = [...activity.correct].sort().join(',');
  const got = [...selected].sort().join(',');
  return want === got;
}

export function checkSequence(activity, order) {
  return order.every((item, i) => item === i);
}

// Zwraca, które pola dokumentu są poprawne.
export function checkDocFields(fields, values) {
  const result = {};
  for (const [key, field] of Object.entries(fields)) {
    const raw = values?.[key];
    if (field.kind === 'text') {
      const accepted = [field.answer, ...(field.accept || [])].map(normalizeText);
      result[key] = accepted.includes(normalizeText(raw));
    } else if (field.kind === 'select') {
      result[key] = raw === field.answer;
    } else {
      const value = parseNumber(raw);
      result[key] = value !== null && Math.abs(value - field.answer) <= (field.tolerance ?? 0.01) + 1e-9;
    }
  }
  return result;
}

export function normalizeText(text) {
  return String(text ?? '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[.,;:]$/, '');
}

// Znalezione błędy minus fałszywe alarmy, nie mniej niż zero.
export function checkSpotErrors(activity, marked) {
  const errors = activity.lines.map((line, i) => (line.error ? i : null)).filter(i => i !== null);
  const found = errors.filter(i => marked.includes(i)).length;
  const falseAlarms = marked.filter(i => !activity.lines[i]?.error).length;
  const ratio = errors.length ? Math.max(0, found - falseAlarms) / errors.length : 0;
  return { found, falseAlarms, total: errors.length, ratio };
}

const scoredTypes = new Set(['choice', 'multi', 'number', 'sequence', 'matching', 'docForm', 'spotErrors', 'dialog']);

export function isScored(activity) {
  return scoredTypes.has(activity.type) && activity.points !== 0;
}

export function activityPoints(activity) {
  if (activity.points !== undefined) return activity.points;
  if (activity.type === 'matching') return activity.rows.length;
  if (activity.type === 'docForm') return Object.keys(activity.fields).length;
  if (activity.type === 'spotErrors') return activity.lines.filter(l => l.error).length;
  if (activity.type === 'dialog') return 3;
  return 1;
}

// Pytania jednokrokowe: pełne punkty za trafienie za pierwszym razem, połowa po poprawce.
// Zadania wieloelementowe: odsetek poprawnych elementów przy pierwszym sprawdzeniu.
export function activityScore(activity, value) {
  const max = activityPoints(activity);
  if (!value) return { score: 0, max };
  if (['choice', 'multi', 'number', 'sequence'].includes(activity.type)) {
    return { score: value.first ? max : value.done ? max / 2 : 0, max };
  }
  const ratio = Math.max(0, Math.min(1, value.firstRatio ?? 0));
  return { score: Math.round(ratio * max * 2) / 2, max };
}

export function lessonActivities(lesson) {
  return lesson.sections.flatMap(section => section.activities);
}

export function scoredActivities(lesson) {
  return lessonActivities(lesson).filter(isScored);
}

export const defaultGrades = [
  [0.9, 'bardzo dobra (5)'],
  [0.75, 'dobra (4)'],
  [0.55, 'dostateczna (3)'],
  [0.4, 'dopuszczająca (2)'],
  [0, 'do poprawy — wróć do zadań'],
];

export function lessonScore(lesson, answers = {}) {
  const rows = scoredActivities(lesson).map(activity => ({
    id: activity.id,
    label: activity.label || activity.question || activity.title || activity.id,
    ...activityScore(activity, answers[activity.id]),
  }));
  const score = Math.round(rows.reduce((sum, row) => sum + row.score, 0) * 10) / 10;
  const max = rows.reduce((sum, row) => sum + row.max, 0);
  const ratio = max ? score / max : 0;
  const grade = defaultGrades.find(([min]) => ratio >= min)[1];
  return { rows, score, max, ratio, grade };
}

export function sectionDone(section, answers = {}) {
  return section.activities
    .filter(a => isScored(a) || a.type === 'text')
    .every(a => answers[a.id]?.done);
}
