// Notatki „Mojego projektu” serwisu programu (assets/site.js, klucz pracownia-project-v1).
// Aplikacja leży w tym samym serwisie, więc pisze do tego samego zapisu w przeglądarce.
// Format musi zostać zgodny z assets/core.js: wersja 1, notatki pod kluczami m{moduł}-{pole}.

export const projectKey = 'pracownia-project-v1';
const blank = () => ({ version: 1, notes: {}, completed: [], visited: [], quizzes: {}, cash: {}, role: 'participant' });

function read(storage) {
  try {
    const parsed = JSON.parse(storage.getItem(projectKey));
    if (parsed && parsed.version === 1 && typeof parsed.notes === 'object') return parsed;
  } catch {
    // brak zapisu albo zapis uszkodzony
  }
  return blank();
}

export function readNote(key, storage = globalThis.localStorage) {
  return read(storage).notes[key] || '';
}

export function writeNote(key, value, storage = globalThis.localStorage) {
  try {
    const state = read(storage);
    state.notes = { ...state.notes, [key]: String(value).slice(0, 20000) };
    storage.setItem(projectKey, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}
