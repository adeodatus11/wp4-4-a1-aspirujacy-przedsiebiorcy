import { arrangeCatalog } from '../../lib/arrange.js';
import m1 from './01-od-celu-do-dzialania.js';

// Ścieżki pracy własnej do modułów programu dla aspirujących przedsiębiorców.
export const modules = arrangeCatalog([m1].sort((a, b) => a.n - b.n).map(m => ({ ...m, kind: 'module' })));
