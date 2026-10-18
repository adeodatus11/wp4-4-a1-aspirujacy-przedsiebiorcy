// Kolejność odpowiedzi w pytaniach wyboru, ustalana raz dla całego katalogu lekcji.
// Poprawna odpowiedź trafia na losowe miejsce, przy czym losowanie lekko faworyzuje
// litery, które dotąd wypadały rzadziej — w całym katalogu każda pojawia się mniej więcej
// równie często. W jednej lekcji ta sama litera nie wypada trzy razy z rzędu.
// Wynik jest stały: lekcja wygląda tak samo po odświeżeniu i u wszystkich osób w klasie.

import { rngFor, shuffle } from './training.js';

export function arrangeCatalog(lessons) {
  const rng = rngFor('katalog', 'odpowiedzi');
  const used = [0, 0, 0, 0, 0];
  const expected = [0, 0, 0, 0, 0];
  return lessons.map(lesson => {
    const recent = [];
    const sections = lesson.sections.map(section => ({
      ...section,
      activities: section.activities.map(activity => {
        if (activity.type !== 'choice') return activity;
        const n = activity.options.length;
        for (let p = 0; p < n; p++) expected[p] += 1 / n;
        const blocked = recent.length === 2 && recent[0] === recent[1] ? recent[0] : -1;
        const weights = [...Array(n).keys()].map(p => (p === blocked ? 0 : Math.max(0.15, 1 + expected[p] - used[p])));
        let r = rng() * weights.reduce((a, b) => a + b, 0);
        let position = 0;
        while (r > weights[position] || weights[position] === 0) r -= weights[position++];
        used[position]++;
        recent.unshift(position);
        recent.length = Math.min(recent.length, 2);
        const others = shuffle(rng, [...Array(n).keys()].filter(i => i !== activity.correct));
        others.splice(position, 0, activity.correct);
        return { ...activity, order: others };
      }),
    }));
    return { ...lesson, sections };
  });
}
