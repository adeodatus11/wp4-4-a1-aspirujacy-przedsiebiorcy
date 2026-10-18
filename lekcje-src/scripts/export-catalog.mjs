// Eksport katalogu lekcji dla generatora serwisu w Pythonie (mapa HAN, wyszukiwarka, moduły).
import { writeFileSync } from 'node:fs';
import { loadLessons } from '../tests/load.mjs';
import { trainings } from '../content/trainings/index.js';
import { modules } from '../content/modules/index.js';

const lessons = await loadLessons();
const catalog = lessons.map(({ id, part, title, subtitle, duration, han, tags }) => ({ id, part, title, subtitle, duration, han, tags }));
writeFileSync(new URL('../../src/lekcje.json', import.meta.url), JSON.stringify(catalog, null, 1) + '\n');
console.log(`Katalog: ${catalog.length} lekcji → src/lekcje.json`);

const training = trainings.map(({ id, title, subtitle, who, minutes, round, modules }) => ({ id, title, subtitle, who, minutes, round, modules }));
writeFileSync(new URL('../../src/trening.json', import.meta.url), JSON.stringify(training, null, 1) + '\n');
console.log(`Trening: ${training.length} serii → src/trening.json`);

const paths = modules.map(m => ({ n: m.n, title: m.title, duration: m.duration, stages: m.sections.map(s => ({ label: s.label, title: s.title, duration: s.duration })) }));
writeFileSync(new URL('../../src/moduly.json', import.meta.url), JSON.stringify(paths, null, 1) + '\n');
console.log(`Moduły: ${paths.length} ścieżek → src/moduly.json`);
