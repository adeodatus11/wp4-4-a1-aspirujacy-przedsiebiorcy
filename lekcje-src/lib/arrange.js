// Kolejność odpowiedzi w pytaniach wyboru, ustalana raz dla całej lekcji.
// Poprawna odpowiedź trafia na losowe miejsce, ale nigdy trzy razy z rzędu na to samo,
// żeby z układu liter nie dało się zgadywać. Wynik jest stały: ta sama lekcja wygląda
// tak samo po odświeżeniu i u wszystkich osób w klasie.

import { rngFor, shuffle } from './training.js';

export function arrangeLesson(lesson) {
  const rng = rngFor(lesson.id, 'odpowiedzi');
  const recent = [];
  const sections = lesson.sections.map(section => ({
    ...section,
    activities: section.activities.map(activity => {
      if (activity.type !== 'choice') return activity;
      const n = activity.options.length;
      let position;
      do position = Math.floor(rng() * n);
      while (recent.length >= 2 && recent[0] === position && recent[1] === position);
      recent.unshift(position);
      recent.length = Math.min(recent.length, 2);
      const others = shuffle(rng, [...Array(n).keys()].filter(i => i !== activity.correct));
      others.splice(position, 0, activity.correct);
      return { ...activity, order: others };
    }),
  }));
  return { ...lesson, sections };
}
