import { choice, number } from '../schema.js';
import { formatNumber } from '../../lib/scoring.js';
import { round2 } from '../../lib/training.js';
import { int, pick, zl } from './helpers.js';

const goods = [
  ['słoik miodu', 22],
  ['świeca sojowa', 18.5],
  ['kubek ceramiczny', 26],
  ['książka kucharska', 34],
  ['krem do rąk', 14.2],
  ['torba lniana', 31],
];

const vatGoods = [
  ['książka drukowana', 5],
  ['chleb', 5],
  ['usługa fryzjerska', 8],
  ['kosmetyk', 23],
  ['słuchawki', 23],
  ['zabawka', 23],
];

const discounts = [
  [30, 10, 50],
  [40, 10, 33.33],
  [25, 5, 25],
  [30, 5, 20],
  [35, 10, 40],
  [40, 20, 100],
  [20, 5, 33.33],
];

export default {
  id: 'liczby-sklepu',
  order: 4,
  title: 'Liczby mojego sklepu',
  subtitle: 'Cena z marżą, VAT, rabat, próg rentowności i gotówka na trzy miesiące. Nowe kwoty w każdej serii.',
  who: 'Dla osób, które ustalają ceny i pilnują pieniędzy w małym sklepie, na stoisku albo w sprzedaży internetowej.',
  minutes: 12,
  round: 6,
  modules: [4, 8],
  realia: ['vatStawki', 'vatZwolnienie'],
  brief: [
    'Marżę liczysz od ceny sprzedaży: cena = koszt ÷ (1 − marża). Narzut liczysz od kosztu: cena = koszt × (1 + narzut). Przy tym samym procencie narzut daje niższą cenę.',
    'Cena brutto = netto × (1 + stawka VAT). Netto z brutto: brutto ÷ (1 + stawka). Firma zwolniona z VAT nie dolicza go do ceny, ale płaci go w cenach zakupu.',
    'Rabat zjada marżę szybciej, niż się wydaje. Przy marży 30% i rabacie 10% trzeba sprzedać o połowę więcej, żeby zarobić tyle samo.',
    'Próg rentowności: koszty stałe miesiąca ÷ (cena − koszt jednej sztuki).',
    'Saldo na koniec = saldo na początek + wpływy − wydatki. Najniższe saldo mówi, ile pieniędzy potrzebujesz na start.',
  ],
  pool: [
    {
      id: 'cena',
      skill: 'cena',
      make(r) {
        const [item, cost] = pick(r, goods);
        const margin = pick(r, [20, 25, 30, 35, 40]);
        const answer = round2(cost / (1 - margin / 100));
        return number(
          'cena',
          `${item[0].toUpperCase()}${item.slice(1)} kosztuje Cię ${zl(cost)}. Chcesz mieć ${margin}% marży. Jaka powinna być cena sprzedaży? Firma jest zwolniona z VAT.`,
          answer,
          `${zl(cost)} ÷ (1 − ${formatNumber(margin / 100, 2)}) = ${zl(answer)}.`,
          { unit: 'zł', mistakes: [{ value: round2(cost * (1 + margin / 100)), text: `To narzut ${margin}% od kosztu. Marżę liczysz od ceny sprzedaży: koszt ÷ (1 − marża).` }] },
        );
      },
    },
    {
      id: 'jaka-marza',
      skill: 'cena',
      make(r) {
        const cost = pick(r, [12, 16, 20, 24, 30]);
        const price = cost + pick(r, [4, 6, 8, 10, 12]);
        const answer = round2(((price - cost) / price) * 100);
        return number(
          'jaka-marza',
          `Kupujesz towar za ${zl(cost)}, sprzedajesz za ${zl(price)}. Jaka jest marża w procentach? Zaokrąglij do dwóch miejsc.`,
          answer,
          `(${price} − ${cost}) ÷ ${price} = ${formatNumber(answer, 2)}%.`,
          { unit: '%', tolerance: 0.05, mistakes: [{ value: round2(((price - cost) / cost) * 100), text: 'To narzut — różnica podzielona przez koszt. Marża to różnica podzielona przez cenę sprzedaży.' }] },
        );
      },
    },
    {
      id: 'brutto',
      skill: 'VAT',
      make(r) {
        const [item, rate] = pick(r, vatGoods);
        const net = pick(r, [40, 56, 80, 95, 120, 149]);
        const answer = round2(net * (1 + rate / 100));
        return number(
          'brutto',
          `${item[0].toUpperCase()}${item.slice(1)}, stawka VAT ${rate}%. Cena netto ${zl(net)}. Ile wynosi cena brutto?`,
          answer,
          `${zl(net)} × ${formatNumber(1 + rate / 100, 2)} = ${zl(answer)}.`,
          { unit: 'zł', mistakes: [{ value: round2((net * rate) / 100), text: 'To sam VAT. Cena brutto to netto plus VAT.' }] },
        );
      },
    },
    {
      id: 'netto',
      skill: 'VAT',
      make(r) {
        const rate = pick(r, [23, 8]);
        const gross = pick(r, rate === 23 ? [123, 246, 61.5, 369] : [108, 54, 216, 324]);
        const answer = round2(gross / (1 + rate / 100));
        return number(
          'netto',
          `Na paragonie: ${zl(gross)} brutto, stawka VAT ${rate}%. Ile wynosi kwota netto?`,
          answer,
          `${zl(gross)} ÷ ${formatNumber(1 + rate / 100, 2)} = ${zl(answer)}.`,
          { unit: 'zł', mistakes: [{ value: round2(gross * (1 - rate / 100)), text: `Odjęcie ${rate}% od brutto daje za mało. ${rate}% liczy się od netto, więc brutto dzielisz przez ${formatNumber(1 + rate / 100, 2)}.` }] },
        );
      },
    },
    {
      id: 'rabat',
      skill: 'rabat',
      make(r) {
        const [margin, discount, answer] = pick(r, discounts);
        return number(
          'rabat',
          `Marża w sklepie to ${margin}% ceny. Planujesz rabat ${discount}% na wszystko. O ile procent więcej musisz sprzedać, żeby zarobić tyle samo złotych co bez rabatu?`,
          answer,
          `Z każdych 100 zł ceny zostawało ${margin} zł. Po rabacie zostaje ${margin - discount} zł. ${margin} ÷ ${margin - discount} = ${formatNumber(margin / (margin - discount), 2)}, czyli o ${formatNumber(answer, 2)}% więcej.`,
          { unit: '%', tolerance: 0.5, mistakes: [{ value: discount, text: `Rabat ${discount}% nie oznacza ${discount}% więcej sprzedaży. Rabat zabiera część marży: zostaje ${margin - discount} zamiast ${margin} zł ze 100 zł.` }] },
        );
      },
    },
    {
      id: 'prog',
      skill: 'próg',
      make(r) {
        const fixed = pick(r, [1800, 2400, 3000, 3600, 4200]);
        const cost = pick(r, [12, 15, 18, 22]);
        const price = cost + pick(r, [8, 10, 13, 15]);
        const answer = Math.ceil(fixed / (price - cost));
        return number(
          'prog',
          `Stałe koszty stoiska to ${zl(fixed)} miesięcznie (miejsce, prąd, strona, składka zdrowotna). Jedna sztuka kosztuje Cię ${zl(cost)}, sprzedajesz po ${zl(price)}. Ile sztuk miesięcznie pokrywa koszty stałe? Zaokrąglij w górę.`,
          answer,
          `Na sztuce zostaje ${price - cost} zł. ${fixed} ÷ ${price - cost} = ${formatNumber(fixed / (price - cost), 2)}, w górę: ${answer} sztuk.`,
          { unit: 'szt.', tolerance: 0, mistakes: [{ value: Math.ceil(fixed / price), text: 'Koszty stałe pokrywa to, co zostaje na sztuce (cena − koszt), a nie cała cena.' }] },
        );
      },
    },
    {
      id: 'gotowka',
      skill: 'gotówka',
      make(r) {
        const start = pick(r, [3000, 4000, 5000, 6000]);
        const inflow = [int(r, 20, 40) * 100, int(r, 40, 60) * 100, int(r, 45, 70) * 100];
        const outflow = [int(r, 55, 80) * 100, int(r, 35, 55) * 100, int(r, 40, 60) * 100];
        const s1 = start + inflow[0] - outflow[0];
        const s2 = s1 + inflow[1] - outflow[1];
        const s3 = s2 + inflow[2] - outflow[2];
        return {
          type: 'docForm',
          id: 'gotowka',
          title: 'Gotówka na pierwsze trzy miesiące',
          points: 4,
          doc: {
            title: 'Plan gotówki',
            table: {
              head: ['Miesiąc', 'Saldo na początek', 'Wpływy', 'Wydatki', 'Saldo na koniec'],
              rows: [
                ['1', String(start), String(inflow[0]), String(outflow[0]), { f: 's1' }],
                ['2', { f: 'p2' }, String(inflow[1]), String(outflow[1]), { f: 's2' }],
                ['3', String(s2), String(inflow[2]), String(outflow[2]), { f: 's3' }],
              ],
            },
          },
          fields: {
            s1: { label: 'Miesiąc 1 — saldo na koniec', answer: s1, hint: 'Saldo na początek + wpływy − wydatki.' },
            p2: { label: 'Miesiąc 2 — saldo na początek', answer: s1, hint: 'To saldo na koniec miesiąca 1.' },
            s2: { label: 'Miesiąc 2 — saldo na koniec', answer: s2, hint: 'Saldo na początek + wpływy − wydatki.' },
            s3: { label: 'Miesiąc 3 — saldo na koniec', answer: s3, hint: 'Saldo na początek + wpływy − wydatki.' },
          },
          explanation: `Salda: ${s1}, ${s2}, ${s3} zł. Pierwszy miesiąc z wydatkami na start jest zwykle najtrudniejszy.`,
        };
      },
    },
    {
      id: 'dolozyc',
      skill: 'gotówka',
      make(r) {
        const nets = [-int(r, 15, 35) * 100, -int(r, 3, 12) * 100, int(r, 2, 10) * 100, int(r, 5, 15) * 100];
        let balance = 0;
        let lowest = 0;
        for (const n of nets) {
          balance += n;
          lowest = Math.min(lowest, balance);
        }
        const answer = -lowest;
        return number(
          'dolozyc',
          `Wynik gotówkowy kolejnych miesięcy (wpływy minus wydatki): ${nets.map(n => `${n > 0 ? '+' : '−'}${Math.abs(n)}`).join(', ')} zł. Ile co najmniej pieniędzy potrzebujesz na start, żeby saldo ani razu nie spadło poniżej zera?`,
          answer,
          `Narastająco: ${nets.reduce((acc, n) => [...acc, (acc.at(-1) || 0) + n], []).join(', ')} zł. Najniżej: −${answer} zł, więc na start potrzeba ${answer} zł.`,
          { unit: 'zł', tolerance: 0, mistakes: [{ value: -nets[0], text: 'To tylko pierwszy miesiąc. W drugim saldo spada dalej — licz narastająco.' }] },
        );
      },
    },
    {
      id: 'vat-limit',
      skill: 'VAT',
      make(r) {
        const monthly = pick(r, [14000, 17500, 19000, 21000, 23500]);
        const yearly = monthly * 12;
        const over = yearly > 240000;
        return choice(
          'vat-limit',
          `Sklep sprzedaje średnio za ${zl(monthly)} miesięcznie (bez VAT), cały rok. Czy zmieści się w zwolnieniu podmiotowym z VAT w 2026 r.?`,
          ['Tak', 'Nie'],
          over ? 1 : 0,
          `${monthly} × 12 = ${zl(yearly)}. Limit w 2026 r. to 240 000 zł.${over ? ' Zwolnienie przestaje działać od sprzedaży, którą firma przekroczy limit.' : ''}`,
          over ? ['Roczna sprzedaż przekracza 240 000 zł.', null] : [null, 'Roczna sprzedaż mieści się w 240 000 zł.'],
        );
      },
    },
  ],
};
