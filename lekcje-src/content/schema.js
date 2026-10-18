// Skróty do zapisu lekcji. Kontrakt danych opisuje README w lekcje-src.

export const note = (duration, teacherNotes, askStudents, expectedAnswers, commonMistakes, optionalExtension, skipIfShortOnTime = false) => ({
  duration,
  teacherNotes,
  askStudents,
  expectedAnswers,
  commonMistakes,
  optionalExtension,
  skipIfShortOnTime,
});

// options: cztery odpowiedzi; why: komentarz do każdej błędnej odpowiedzi (typowy błąd).
export const choice = (id, question, options, correct, explanation, why = [], extra = {}) => ({
  type: 'choice',
  id,
  question,
  options,
  correct,
  explanation,
  why,
  ...extra,
});

// mistakes: [{value, text}] — wyniki typowych pomyłek z wyjaśnieniem.
export const number = (id, question, answer, explanation, extra = {}) => ({
  type: 'number',
  id,
  question,
  answer,
  explanation,
  ...extra,
});

export const text = (id, question, model, extra = {}) => ({
  type: 'text',
  id,
  question,
  model,
  minLength: 20,
  ...extra,
});

export const methods = {
  jawne: { name: 'Nauczanie jawne', url: 'https://metodyka.covepolska.pl/metoda-nauczanie-jawne.html' },
  przyklady: { name: 'Przykłady rozwiązane', url: 'https://metodyka.covepolska.pl/metoda-przyklady-rozwiazane.html' },
  retrieval: { name: 'Retrieval practice', url: 'https://metodyka.covepolska.pl/metoda-retrieval-practice.html' },
  ksztaltujace: { name: 'Ocenianie kształtujące', url: 'https://metodyka.covepolska.pl/metoda-ocenianie-ksztaltujace.html' },
  tutoring: { name: 'Tutoring rówieśniczy', url: 'https://metodyka.covepolska.pl/metoda-peer-tutoring.html' },
  feedback: { name: 'Feedback i poprawa', url: 'https://metodyka.covepolska.pl/metoda-feedback-poprawa.html' },
  przypadek: { name: 'Problem, projekt i przypadek', url: 'https://metodyka.covepolska.pl/metoda-problem-projekt-przypadek.html' },
  metapoznanie: { name: 'Metapoznanie', url: 'https://metodyka.covepolska.pl/metoda-metapoznanie.html' },
  udl: { name: 'UDL', url: 'https://metodyka.covepolska.pl/metoda-udl.html' },
  dialogowe: { name: 'Nauczanie dialogowe', url: 'https://metodyka.covepolska.pl/metoda-nauczanie-dialogowe.html' },
};
