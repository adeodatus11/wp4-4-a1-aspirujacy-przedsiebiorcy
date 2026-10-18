// Zapis postępu w przeglądarce. Bez kont i bez wysyłania danych.
// Gdy localStorage jest niedostępny (tryb prywatny, blokada), lekcja działa dalej w pamięci strony.

export const storageKey = 'pracownia-lekcje-v1';

function emptyState() {
  return { version: 1, lessons: {}, trainings: {}, settings: {} };
}

export function loadState(storage = globalThis.localStorage) {
  try {
    const parsed = JSON.parse(storage.getItem(storageKey));
    if (parsed && parsed.version === 1 && typeof parsed.lessons === 'object') return { trainings: {}, settings: {}, ...parsed };
  } catch {
    // brak zapisu albo uszkodzony wpis: zaczynamy od zera
  }
  return emptyState();
}

export function saveState(state, storage = globalThis.localStorage) {
  try {
    storage.setItem(storageKey, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

export function lessonState(state, id) {
  return state.lessons[id] || { answers: {}, visited: [] };
}

export function withLesson(state, id, update) {
  const current = lessonState(state, id);
  return { ...state, lessons: { ...state.lessons, [id]: { ...update(current), updated: new Date().toISOString() } } };
}

export function withoutLesson(state, id) {
  const lessons = { ...state.lessons };
  delete lessons[id];
  return { ...state, lessons };
}

export function trainingState(state, id) {
  return state.trainings?.[id] || {};
}

export function withTraining(state, id, update) {
  return { ...state, trainings: { ...state.trainings, [id]: update(trainingState(state, id)) } };
}

export function clearAll(storage = globalThis.localStorage) {
  try {
    storage.removeItem(storageKey);
  } catch {
    // nic do usunięcia
  }
  return emptyState();
}
