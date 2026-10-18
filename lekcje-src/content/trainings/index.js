import zwroty from './zwroty.js';
import opinie from './opinie.js';
import klientWraca from './klient-wraca.js';
import liczbySklepu from './liczby-sklepu.js';
import formalnosci from './formalnosci.js';

export const trainings = [zwroty, opinie, klientWraca, liczbySklepu, formalnosci].sort((a, b) => a.order - b.order);

// Moduły programu dla aspirujących przedsiębiorców, do których trening jest ćwiczeniem.
export const modules = {
  1: 'Coaching',
  2: 'Postawa przedsiębiorcza',
  3: 'Walidacja pomysłu',
  4: 'Model biznesowy i Lean',
  5: 'Cyfryzacja i AI',
  6: 'Marketing i komunikacja',
  7: 'Zrównoważony rozwój i ESG',
  8: 'Pitch i finansowanie',
};
