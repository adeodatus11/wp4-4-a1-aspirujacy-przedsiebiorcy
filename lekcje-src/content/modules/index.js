import { arrangeCatalog } from '../../lib/arrange.js';
import m1 from './01-od-celu-do-dzialania.js';
import m2 from './02-przedsiebiorczosc.js';
import m3 from './03-walidacja.js';
import m4 from './04-model-biznesowy.js';
import m5 from './05-narzedzia.js';
import m6 from './06-marketing.js';
import m7 from './07-esg.js';
import m8 from './08-pitch.js';

// Ścieżki pracy własnej do modułów programu dla aspirujących przedsiębiorców.
export const modules = arrangeCatalog([m1, m2, m3, m4, m5, m6, m7, m8].sort((a, b) => a.n - b.n).map(m => ({ ...m, kind: 'module' })));
