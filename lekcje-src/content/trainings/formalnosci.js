import { choice, number } from '../schema.js';
import { round2 } from '../../lib/training.js';
import { addDays, dateLabel, int, pick, workdayWithDeadline, zl } from './helpers.js';

const LIMIT = 10813.5;

const cashCases = [
  {
    text: 'Stoisko z rękodziełem na jarmarkach. Sprzedaż osobom prywatnym, gotówką i kartą: w 2026 r. około 1 400 zł miesięcznie.',
    options: ['Nie — roczna sprzedaż osobom prywatnym nie przekroczy 20 000 zł', 'Tak — każda sprzedaż za gotówkę wymaga kasy', 'Tak — bo stoisko przyjmuje karty'],
    correct: 0,
    explanation: '12 × 1 400 = 16 800 zł, poniżej limitu 20 000 zł. Trzeba jednak pilnować sumy w ciągu roku.',
  },
  {
    text: 'Stoisko z rękodziełem na jarmarkach. Sprzedaż osobom prywatnym, gotówką i kartą: w 2026 r. około 2 500 zł miesięcznie.',
    options: ['Tak — w ciągu roku sprzedaż przekroczy 20 000 zł', 'Nie — kasa jest tylko w sklepach stacjonarnych', 'Nie — limit liczy się osobno dla każdego miesiąca'],
    correct: 0,
    explanation: 'W 2026 r. sprzedaż osobom prywatnym przekroczy 20 000 zł (we wrześniu). Zwolnienie wygasa po dwóch miesiącach od końca miesiąca, w którym przekroczono limit — do tego czasu trzeba kupić i zgłosić kasę.',
  },
  {
    text: 'Fryzjerka zaczyna pracę z dojazdem do klientek. W pierwszym miesiącu zarobiła 900 zł.',
    options: ['Tak — usługi fryzjerskie wymagają kasy od pierwszej sprzedaży', 'Nie — do 20 000 zł rocznie kasa nie jest potrzebna', 'Nie — usługi z dojazdem są zwolnione'],
    correct: 0,
    explanation: 'Niektóre branże, m.in. usługi fryzjerskie i kosmetyczne, nie korzystają ze zwolnienia kwotowego. Kasa od pierwszej usługi.',
  },
  {
    text: 'Mała hurtownia sprzedaje wyłącznie firmom, na faktury, za około 150 000 zł rocznie.',
    options: ['Nie — kasa dotyczy sprzedaży osobom prywatnym i rolnikom ryczałtowym', 'Tak — obrót przekracza 20 000 zł', 'Tak — każda firma handlowa musi mieć kasę'],
    correct: 0,
    explanation: 'Limit 20 000 zł i obowiązek kasy dotyczą sprzedaży dla osób fizycznych nieprowadzących firmy i rolników ryczałtowych.',
  },
];

const vatStarts = [
  ['1 kwietnia', 275],
  ['1 lipca', 184],
  ['1 września', 122],
  ['1 października', 92],
];

const ksefCases = [
  {
    text: 'Pracownia mebli sprzedaje firmom na faktury za około 6 000 zł brutto miesięcznie. W 2026 r. ani razu nie przekroczy 10 000 zł. Od kiedy musi wystawiać faktury w KSeF?',
    options: ['Od 1 stycznia 2027 r.', 'Od 1 kwietnia 2026 r.', 'Od 1 lutego 2026 r.', 'Wcale, bo to mała firma'],
    correct: 0,
    explanation: 'Do końca 2026 r. firma, której faktury nie przekraczają 10 000 zł brutto w miesiącu, może je wystawiać poza KSeF. Od 2027 r. — już w KSeF.',
  },
  {
    text: 'Hurtownia papiernicza (obrót kilka milionów złotych rocznie) wystawia faktury na około 300 000 zł miesięcznie. Od kiedy musi wystawiać je w KSeF?',
    options: ['Od 1 kwietnia 2026 r.', 'Od 1 lutego 2026 r.', 'Od 1 stycznia 2027 r.'],
    correct: 0,
    explanation: 'Od 1 lutego 2026 r. obowiązek dotyczy największych firm (sprzedaż ponad 200 mln zł w 2024 r.), od 1 kwietnia — pozostałych.',
  },
  {
    text: 'Pracownia mebli zwykle fakturuje około 6 000 zł miesięcznie, ale w maju 2026 r. wystawiła faktury na 13 000 zł. Co z KSeF?',
    options: ['Od chwili przekroczenia 10 000 zł do końca roku faktury idą przez KSeF', 'Tylko majowe faktury idą przez KSeF, od czerwca znowu poza nim', 'Nic się nie zmienia do 2027 r.'],
    correct: 0,
    explanation: 'Jedno przekroczenie 10 000 zł brutto w miesiącu kończy zwolnienie na resztę 2026 r.',
  },
];

const receiptCases = [
  {
    text: 'Klient wraca po tygodniu i prosi o fakturę na firmę do paragonu za 120 zł. Na paragonie nie ma NIP. Co robisz?',
    options: ['Odmawiasz — do paragonu bez NIP nie wystawia się faktury dla firmy', 'Wystawiasz fakturę, bo minęło mniej niż 3 miesiące', 'Dopisujesz NIP na paragonie długopisem'],
    correct: 0,
    explanation: 'Firma dostanie fakturę do paragonu tylko wtedy, gdy na paragonie jest jej NIP. Dlatego przy kasie pyta się „czy NIP na paragon?”.',
  },
  {
    text: 'Klient przy kasie podaje NIP. Paragon z NIP wynosi 380 zł brutto. Czy musisz wystawić osobną fakturę?',
    options: ['Nie — paragon z NIP do 450 zł brutto jest fakturą uproszczoną', 'Tak — firma zawsze potrzebuje osobnej faktury', 'Tak — jeśli klient płacił kartą'],
    correct: 0,
    explanation: 'Paragon z NIP nabywcy na kwotę do 450 zł brutto (lub 100 euro) jest fakturą uproszczoną.',
  },
];

const startCases = [
  {
    text: 'Ewa nigdy nie prowadziła firmy. Zakłada sklep internetowy na pełny etat. Co z ZUS w pierwszych 6 miesiącach?',
    options: ['Może nie płacić składek społecznych, ale płaci składkę zdrowotną', 'Nie płaci żadnych składek', 'Płaci pełne składki od pierwszego dnia', 'Płaci tylko składkę emerytalną'],
    correct: 0,
    explanation: 'Ulga na start: 6 pełnych miesięcy bez składek emerytalnej, rentowej, chorobowej i wypadkowej. Zdrowotna od początku.',
  },
  {
    text: 'Marek zamknął firmę 3 lata temu. Teraz otwiera nową. Czy może skorzystać z ulgi na start?',
    options: ['Nie — od ostatniej firmy musi minąć 60 miesięcy', 'Tak — każda nowa firma ma ulgę', 'Tak — jeśli zmieni branżę'],
    correct: 0,
    explanation: 'Ulga przysługuje, jeśli w ciągu ostatnich 60 miesięcy nie prowadziło się firmy.',
  },
  {
    text: 'Ola przez dwa lata pracowała na etacie jako grafik. Odchodzi i chce na firmie robić grafikę dla tego samego pracodawcy. Czy może mieć ulgę na start?',
    options: ['Nie — nie można świadczyć dla byłego pracodawcy tego, co na etacie', 'Tak — bo nigdy nie miała firmy', 'Tak — jeśli wystawi pierwszą fakturę po miesiącu'],
    correct: 0,
    explanation: 'Ulgi nie ma, gdy firma wykonuje dla byłego pracodawcy te same zadania co na etacie w bieżącym lub poprzednim roku.',
  },
];

export default {
  id: 'formalnosci',
  order: 5,
  title: 'Formalności małego handlu 2026',
  subtitle: 'Kiedy zarejestrować firmę, kiedy kasa, VAT i KSeF, ulga na start i koszt pracownika.',
  who: 'Dla osób, które dorabiają sprzedażą, zakładają pierwszą firmę albo planują zatrudnić pierwszą osobę.',
  minutes: 12,
  round: 7,
  modules: [2, 8],
  realia: ['nierejestrowana', 'nierejestrowanaPrzekroczenie', 'kasaFiskalna', 'vatZwolnienie', 'ksef', 'paragonNip', 'ulgaNaStart', 'kosztPracodawcy', 'placaMinimalna'],
  brief: [
    'Działalność nierejestrowana: przychód do 10 813,50 zł w kwartale (2026). Bez wpisu do CEIDG i bez składek ZUS, ale z podatkiem w zeznaniu rocznym. Po przekroczeniu limitu masz 7 dni na wpis do CEIDG.',
    'Kasa fiskalna: przy sprzedaży osobom prywatnym obowiązkowa po przekroczeniu 20 000 zł w roku. W niektórych branżach, np. u fryzjera, od pierwszej sprzedaży.',
    'VAT: zwolnienie do 240 000 zł sprzedaży w roku. Gdy zaczynasz w trakcie roku, limit liczysz proporcjonalnie do liczby dni.',
    'KSeF: faktury dla firm od 1.04.2026; do końca 2026 r. bez KSeF, jeśli faktury nie przekraczają 10 000 zł brutto w miesiącu.',
    'Paragon z NIP do 450 zł to faktura uproszczona. Do paragonu bez NIP firma faktury nie dostanie.',
    'Ulga na start: pierwsze 6 miesięcy nowej firmy bez składek społecznych, zdrowotna od początku.',
  ],
  pool: [
    {
      id: 'kwartal',
      skill: 'nierejestrowana',
      make(r) {
        const months = [int(r, 25, 45) * 100, int(r, 25, 45) * 100, int(r, 25, 45) * 100];
        const sum = months.reduce((a, b) => a + b, 0);
        const over = sum > LIMIT;
        return choice(
          'kwartal',
          `Działalność nierejestrowana w 2026 r. Przychód w lipcu: ${zl(months[0])}, w sierpniu: ${zl(months[1])}, we wrześniu: ${zl(months[2])}. Czy trzeba zarejestrować firmę?`,
          ['Nie — przychód mieści się w limicie kwartalnym', 'Tak — w ciągu 7 dni od przekroczenia limitu', 'Tak, ale dopiero od nowego roku'],
          over ? 1 : 0,
          `Razem ${zl(sum)}. Limit na kwartał 2026 r. to ${zl(LIMIT)}.${over ? ' Od dnia przekroczenia to już firma — wniosek do CEIDG w 7 dni.' : ''}`,
          over ? ['Suma kwartału przekracza limit.', null, 'Na wniosek jest 7 dni, nie do nowego roku.'] : [null, 'Suma kwartału mieści się w limicie.', 'Limit nie został przekroczony.'],
        );
      },
    },
    {
      id: 'ile-jeszcze',
      skill: 'nierejestrowana',
      make(r) {
        const a = int(r, 20, 45) * 100;
        const b = int(r, 20, 45) * 100;
        const answer = round2(LIMIT - a - b);
        return number(
          'ile-jeszcze',
          `Działalność nierejestrowana. W październiku przychód ${zl(a)}, w listopadzie ${zl(b)}. Ile najwyżej możesz zarobić w grudniu, żeby nie przekroczyć limitu kwartalnego?`,
          answer,
          `${zl(LIMIT)} − ${zl(a)} − ${zl(b)} = ${zl(answer)}.`,
          { unit: 'zł', mistakes: [{ value: 3499.5, text: 'To dawny limit miesięczny z 2025 r. Od 2026 r. limit jest kwartalny.' }] },
        );
      },
    },
    {
      id: 'siedem-dni',
      skill: 'nierejestrowana',
      make(r) {
        const day = workdayWithDeadline(r, 7);
        return choice(
          'siedem-dni',
          `Limit działalności nierejestrowanej został przekroczony w ${dateLabel(day)}. Do kiedy trzeba złożyć wniosek o wpis do CEIDG?`,
          [dateLabel(addDays(day, 7)), dateLabel(addDays(day, 14)), 'do końca kwartału', dateLabel(addDays(day, 30))],
          0,
          `Na wniosek jest 7 dni od przekroczenia: do ${dateLabel(addDays(day, 7))}. Wpis w CEIDG jest bezpłatny.`,
          [null, 'Termin to 7 dni, nie 14.', 'Nie czeka się do końca kwartału.', 'Termin to 7 dni.'],
        );
      },
    },
    {
      id: 'kasa',
      skill: 'kasa',
      make(r) {
        const c = pick(r, cashCases);
        return choice('kasa', `${c.text} Czy potrzebna jest kasa fiskalna?`, c.options, c.correct, c.explanation, [null, 'Sprawdź limit 20 000 zł, branżę i to, komu sprzedajesz.', 'Sprawdź limit 20 000 zł, branżę i to, komu sprzedajesz.']);
      },
    },
    {
      id: 'kasa-nierejestrowana',
      skill: 'kasa',
      make: () =>
        choice(
          'kasa-nierejestrowana',
          'Działalność nierejestrowana: sprzedaż na targu osobom prywatnym, równo 2 500 zł miesięcznie przez cały 2026 r. Co jest prawdą?',
          [
            'Limit kwartalny jest zachowany, ale w ciągu roku sprzedaż przekroczy 20 000 zł — potrzebna będzie kasa',
            'Działalność nierejestrowana nigdy nie potrzebuje kasy',
            'Trzeba zarejestrować firmę, bo przekroczono limit kwartalny',
            'Kasa jest potrzebna od pierwszej sprzedaży',
          ],
          0,
          'Kwartał: 7 500 zł — poniżej 10 813,50 zł. Rok: 30 000 zł — powyżej 20 000 zł. Brak rejestracji nie zwalnia z kasy.',
          [null, 'Obowiązek kasy zależy od sprzedaży, nie od rejestracji firmy.', '3 × 2 500 = 7 500 zł — mieści się w limicie.', 'Przy sprzedaży towarów na targu obowiązuje limit 20 000 zł.'],
        ),
    },
    {
      id: 'vat-start',
      skill: 'VAT',
      make(r) {
        const [label, days] = pick(r, vatStarts);
        const limit = Math.round((240000 * days) / 365);
        const fmt = n => `${n.toLocaleString('pl-PL')} zł`;
        return choice(
          'vat-start',
          `Firma rusza ${label} 2026 r. Jaki ma limit sprzedaży ze zwolnieniem z VAT do końca roku?`,
          [`około ${fmt(limit)}`, fmt(240000), fmt(20000)],
          0,
          `240 000 × ${days} dni ÷ 365 dni ≈ ${fmt(limit)}. Limit liczy się proporcjonalnie do liczby dni działalności w roku.`,
          [null, 'Pełny limit dotyczy całego roku. Przy starcie w trakcie roku liczy się proporcję.', '20 000 zł to limit kasy fiskalnej, nie VAT.'],
        );
      },
    },
    {
      id: 'ksef',
      skill: 'faktury',
      make(r) {
        const c = pick(r, ksefCases);
        return choice('ksef', c.text, c.options, c.correct, c.explanation, c.options.map((_, i) => (i === c.correct ? null : 'Sprawdź datę obowiązku i limit 10 000 zł brutto miesięcznie.')));
      },
    },
    {
      id: 'paragon',
      skill: 'faktury',
      make(r) {
        const c = pick(r, receiptCases);
        return choice('paragon', c.text, c.options, c.correct, c.explanation, c.options.map((_, i) => (i === c.correct ? null : 'O fakturze do paragonu decyduje NIP na paragonie i kwota 450 zł.')));
      },
    },
    {
      id: 'ulga',
      skill: 'ZUS',
      make(r) {
        const c = pick(r, startCases);
        return choice('ulga', c.text, c.options, c.correct, c.explanation, c.options.map((_, i) => (i === c.correct ? null : 'Ulga: 6 miesięcy bez składek społecznych, 60 miesięcy przerwy, nie dla byłego pracodawcy.')));
      },
    },
    {
      id: 'pracownik',
      skill: 'zatrudnienie',
      make(r) {
        const pay = pick(r, [4806, 5200, 5600, 6000, 6500]);
        const rates = [9.76, 6.5, 1.67, 2.45, 0.1];
        const extra = rates.reduce((sum, rate) => sum + round2((pay * rate) / 100), 0);
        const answer = round2(pay + extra);
        return number(
          'pracownik',
          `Zatrudniasz sprzedawcę na etat za ${zl(pay)} brutto. Pracodawca dopłaca składki: emerytalną 9,76%, rentową 6,5%, wypadkową 1,67%, Fundusz Pracy 2,45% i FGŚP 0,1%. Ile miesięcznie kosztuje Cię ta osoba? Bez PPK.`,
          answer,
          `Składki pracodawcy: ${zl(round2(extra))}. Razem ${zl(pay)} + ${zl(round2(extra))} = ${zl(answer)}. Pracownik dostaje na rękę mniej niż ${zl(pay)}.`,
          { unit: 'zł', tolerance: 0.05, mistakes: [{ value: pay, text: 'To pensja brutto. Do niej pracodawca dolicza swoje składki.' }] },
        );
      },
    },
  ],
};
