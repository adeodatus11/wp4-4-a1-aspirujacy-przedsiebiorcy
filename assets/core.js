/* Czyste funkcje: format projektu, quizy, wyszukiwanie i przepływy. */
(function (root, factory) {
  const core = factory();
  if (typeof module === 'object' && module.exports) module.exports = core;
  else root.CourseCore = core;
})(typeof window !== 'undefined' ? window : this, function () {
  'use strict';
  const blank = () => ({ version: 1, notes: {}, completed: [], visited: [], quizzes: {}, cash: {}, role: 'participant' });
  const money = x => Number.isFinite(Number(x)) && Math.abs(Number(x)) <= 1e12 ? Math.round(Number(x) * 100) / 100 : 0;
  const norm = x => String(x).toLocaleLowerCase('pl').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ł/g, 'l');
  const noteKeys = ['project-name', 'project-description'];
  for (let m = 1; m <= 8; m++) for (let i = 0; i < 6; i++) noteKeys.push(`m${m}-${i}`);
  const cashKeys = ['opening', 'sales', 'funding', 'materials', 'fixed', 'tax', 'investment', 'other'];
  function normalize(input) {
    if (!input || typeof input !== 'object' || input.version !== 1) throw new Error('Nieobsługiwany format lub wersja projektu.');
    const out = blank();
    for (const k of noteKeys) if (typeof input.notes?.[k] === 'string') out.notes[k] = input.notes[k].slice(0, 20000);
    for (const k of ['completed', 'visited']) out[k] = [...new Set(Array.isArray(input[k]) ? input[k].filter(x => Number.isInteger(x) && x >= 1 && x <= 8) : [])];
    if (input.role === 'teacher') out.role = 'teacher';
    for (let m = 1; m <= 8; m++) {
      const q = input.quizzes?.[m];
      if (Array.isArray(q) && q.length === 3 && q.every(x => Number.isInteger(x) && x >= 0 && x <= 2)) out.quizzes[m] = q.slice();
    }
    for (const k of cashKeys) if (Array.isArray(input.cash?.[k])) out.cash[k] = Array.from({length: 6}, (_, i) => money(input.cash[k][i]));
    return out;
  }
  function calculate(cash) {
    const rows = []; let opening = money(cash?.opening?.[0]);
    for (let i = 0; i < 6; i++) {
      const income = money(cash?.sales?.[i]) + money(cash?.funding?.[i]);
      const spending = ['materials', 'fixed', 'tax', 'investment', 'other'].reduce((s, k) => s + money(cash?.[k]?.[i]), 0);
      const net = Math.round((income - spending) * 100) / 100;
      const closing = Math.round((opening + net) * 100) / 100;
      rows.push({ opening, income, spending, net, closing }); opening = closing;
    }
    return rows;
  }
  function grade(questions, answers) {
    const results = questions.map((q, i) => answers[i] === q[2]);
    return { results, score: results.filter(Boolean).length, total: questions.length };
  }
  function search(entries, query) {
    const words = norm(query).trim().split(/\s+/).filter(Boolean);
    if (!words.length) return [];
    return entries.filter(r => words.every(w => norm(r.title + ' ' + r.text).includes(w))).sort((a,b) => {
      const points = r => words.reduce((n,w) => n + (norm(r.title).includes(w) ? 1 : 0), 0);
      return points(b) - points(a);
    });
  }
  return { blank, normalize, calculate, grade, norm, search, money, cashKeys, noteKeys };
});
