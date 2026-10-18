// Stała kolejność odpowiedzi dla danego pytania: inna niż w pliku treści,
// ale ta sama po odświeżeniu i u wszystkich osób w klasie.

function hash(text) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function random(seed) {
  let t = seed;
  return () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

// Zwraca indeksy oryginalnych elementów w kolejności wyświetlania.
export function shuffledOrder(length, key) {
  const order = Array.from({ length }, (_, i) => i);
  const next = random(hash(key));
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

// Kolejność do ułożenia nie może być od razu poprawna.
export function scrambledOrder(length, key) {
  let order = shuffledOrder(length, key);
  if (length > 1 && order.every((v, i) => v === i)) order = [...order.slice(1), order[0]];
  return order;
}
