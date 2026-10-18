import { choice, methods, note } from '../schema.js';

export default {
  id: '22',
  order: 22,
  part: 'B',
  title: 'Dokumenty magazynowe: PZ, WZ, PW, RW, MM',
  subtitle: 'Każdy ruch towaru w magazynie zostawia ślad w dokumencie. Który dokument wystawić i jak go wypełnić.',
  duration: 45,
  sessions: [45],
  han: ['HAN.02.5', 'HAN.02.7'],
  tags: ['PZ', 'WZ', 'RW', 'MM', 'magazyn'],
  realia: [],
  audience: {
    adults:
      'Dla osób, które otwierają sklep lub małą hurtownię, dokumenty magazynowe to podstawa porządku w towarze — nawet gdy prowadzi je program. Pokaż, że program „wystawia” PZ i WZ, ale człowiek musi wybrać właściwy dokument i wpisać prawdziwe ilości.',
  },
  format: {
    name: 'Dopasowanie operacji i wypełnianie dokumentu',
    student:
      'Pracujesz w magazynie hurtowni papierniczej w Toruniu. Dobierzesz dokument do każdej operacji, wypełnisz PZ i sprawdzisz WZ przed wydaniem towaru.',
    teacher:
      'Na egzaminie HAN.02 uczniowie wystawiają dokumenty magazynowe w programie magazynowo-sprzedażowym. Ta lekcja uczy logiki: który dokument do jakiej operacji i co musi w nim być. Program tylko przyspiesza pracę — decyzja należy do człowieka.',
    methods: [methods.jawne, methods.przyklady],
  },
  objectives: [
    'Dobieram dokument magazynowy do operacji.',
    'Wypełniam przyjęcie zewnętrzne (PZ) i liczę wartości.',
    'Sprawdzam wydanie zewnętrzne (WZ) przed wydaniem towaru.',
  ],
  materials: ['Kalkulator'],
  teacherGuide: {
    preparation: 'Jeśli szkoła ma program magazynowo-sprzedażowy, pokaż w nim listę dokumentów magazynowych. Wystarczy też tablica z pięcioma skrótami.',
    summary:
      'PZ — przyjęcie towaru od dostawcy. WZ — wydanie towaru klientowi. PW — przyjęcie wewnętrzne, np. zwrot z działu albo towar z własnej produkcji. RW — rozchód wewnętrzny, np. zużycie na potrzeby firmy. MM — przesunięcie między magazynami tej samej firmy. Każdy dokument ma numer, datę, kontrahenta lub magazyn, towary, ilości, ceny i podpisy.',
  },
  sections: [
    {
      id: 'rodzaje',
      label: 'Pięć skrótów',
      title: 'Który dokument?',
      grouping: 'pair',
      intro: 'Do magazynu hurtowni przyjechały segregatory, długopisy i zeszyty od producenta. To pierwsza z wielu operacji dnia — do każdej trzeba dobrać dokument.',
      reading: {
        title: 'Dokumenty magazynowe',
        paragraphs: [
          'PZ: towar od dostawcy. WZ: towar do klienta. PW: przyjęcie wewnętrzne, np. zwrot niewykorzystanego towaru z działu firmy. RW: rozchód wewnętrzny, np. papier wzięty do biura hurtowni. MM: przesunięcie towaru z jednego magazynu firmy do drugiego.',
        ],
      },
      ...note(
        15,
        'Najpierw każdy sam odpowiada o dostawie od producenta; napisz na tablicy pięć skrótów i rozwinięcia. Potem pary dopasowują. Przy MM zapytaj: dlaczego to nie WZ, skoro towar wyjeżdża z magazynu?',
        'Dlaczego przesunięcie do drugiego magazynu firmy to MM, a nie WZ?',
        'Bo towar zostaje w tej samej firmie. Zmienia się tylko miejsce, a nie właściciel.',
        'Wystawianie WZ przy zużyciu towaru w firmie (powinno być RW).',
        'Wymyśl jeszcze jedną operację dla PW.',
      ),
      activities: [
        choice(
          'q-pz',
          'Jaki dokument wystawia magazyn przy przyjęciu dostawy od producenta?',
          ['PZ', 'WZ', 'RW', 'MM', 'PW'],
          0,
          'PZ — przyjęcie zewnętrzne: towar wchodzi do magazynu od kogoś spoza firmy.',
          [
            null,
            'WZ to wydanie towaru na zewnątrz, np. klientowi.',
            'RW to rozchód wewnętrzny, np. zużycie w firmie.',
            'MM to przesunięcie między magazynami tej samej firmy.',
            'PW to przyjęcie wewnętrzne, np. zwrot towaru z działu firmy, a nie dostawa od producenta.',
          ],
        ),
        {
          type: 'matching',
          id: 'q-dokumenty',
          question: 'Który dokument?',
          options: ['PZ', 'WZ', 'PW', 'RW', 'MM'],
          rows: [
            { label: 'Dostawa 500 długopisów od producenta', correct: 0 },
            { label: 'Wydanie 200 zeszytów dla Szkoły Podstawowej nr 12', correct: 1 },
            { label: 'Biuro hurtowni bierze 5 ryz papieru do drukarki', correct: 3 },
            { label: 'Przewiezienie 50 segregatorów z magazynu w Toruniu do magazynu w Bydgoszczy', correct: 4 },
            { label: 'Dział sprzedaży zwraca do magazynu niewykorzystane próbki katalogów', correct: 2 },
            { label: 'Dostawa toreb papierowych od hurtowni opakowań', correct: 0 },
          ],
          explanation: 'Z — kontakt z kimś spoza firmy, W — ruch wewnątrz firmy. MM — między magazynami tej samej firmy.',
        },
      ],
    },
    {
      id: 'pz',
      label: 'PZ',
      title: 'Wypełnij PZ',
      grouping: 'pair',
      intro: 'Dostawa od producenta została przyjęta bez rozbieżności. Uzupełnij wartości na dokumencie PZ (ceny zakupu netto).',
      ...note(
        15,
        'Pary liczą. Zapytaj, skąd magazyn bierze cenę na PZ (z faktury lub zamówienia u dostawcy).',
        'Skąd wiadomo, jakie ceny wpisać na PZ?',
        'Z faktury dostawcy albo z zamówienia — to ceny zakupu netto.',
        'Wpisywanie cen sprzedaży zamiast cen zakupu.',
        'Policz, ile wyniesie PZ, jeśli 20 zeszytów było uszkodzonych i nie zostały przyjęte (1637 zł).',
      ),
      activities: [
        {
          type: 'docForm',
          id: 'doc-pz',
          title: 'PZ 214/10/2026',
          points: 4,
          doc: {
            title: 'PZ — przyjęcie zewnętrzne nr 214/10/2026',
            meta: [
              ['Data', '23.10.2026'],
              ['Dostawca', 'Zakłady Papiernicze, Kwidzyn'],
              ['Magazyn', 'Toruń, magazyn główny'],
            ],
            table: {
              head: ['Towar', 'Ilość', 'Cena netto', 'Wartość netto'],
              rows: [
                ['Segregator A4 75 mm', '100 szt.', '9,60', { f: 's' }],
                ['Długopis niebieski', '500 szt.', '0,85', { f: 'd' }],
                ['Zeszyt A5, 32 kartki', '200 szt.', '1,40', { f: 'z' }],
              ],
            },
            after: [['Razem', { f: 'r' }]],
            footer: 'Podpisy: przyjął (magazynier), zatwierdził (kierownik magazynu).',
          },
          fields: {
            s: { label: 'Segregatory — wartość', answer: 960, hint: '100 × 9,60.' },
            d: { label: 'Długopisy — wartość', answer: 425, hint: '500 × 0,85.' },
            z: { label: 'Zeszyty — wartość', answer: 280, hint: '200 × 1,40.' },
            r: { label: 'Razem', answer: 1665, hint: 'Suma trzech wartości.' },
          },
          explanation: '960 + 425 + 280 = 1665 zł netto. Ta kwota zwiększa wartość zapasu w magazynie.',
        },
      ],
    },
    {
      id: 'wz',
      label: 'Wydanie',
      title: 'WZ przed wydaniem i dwie inne operacje',
      grouping: 'pair',
      intro: 'Szkoła zamówiła 200 zeszytów A5 i 30 segregatorów. Magazynier przygotował WZ. Sprawdź dokument, zanim towar wyjedzie.',
      ...note(
        15,
        'Na koniec każdy sam rozwiązuje dwie nowe sytuacje (RW i MM) i wracacie do zasady: Z — zewnętrzne, W — wewnętrzne. Pary sprawdzają WZ. Zapytaj, kto podpisuje WZ przy odbiorze (osoba odbierająca towar).',
        'Po co odbiorca podpisuje WZ?',
        'Potwierdza, że odebrał towar w tej ilości. To dowód przy ewentualnym sporze.',
        'Wydawanie towaru bez sprawdzenia ilości z zamówieniem.',
        'Wymień dokumenty, które jadą z towarem do szkoły (WZ, ewentualnie faktura).',
      ),
      activities: [
        {
          type: 'spotErrors',
          id: 'q-wz',
          title: 'WZ 388/10/2026 — przed wydaniem',
          context: 'Zaznacz wiersze do poprawy.',
          lines: [
            { text: 'WZ — wydanie zewnętrzne nr 388/10/2026, data 23.10.2026' },
            { text: 'Odbiorca: —', error: 'Brakuje odbiorcy: Szkoła Podstawowa nr 12 w Toruniu.' },
            { text: 'Zeszyt A5, 32 kartki — 2000 szt.', error: 'Zamówiono 200, nie 2000 zeszytów.' },
            { text: 'Segregator A4 75 mm — 30 szt.' },
            { text: 'Wydał: magazynier' },
            { text: 'Rodzaj dokumentu: PZ', error: 'Wydanie towaru klientowi to WZ, nie PZ.' },
          ],
          explanation: 'Trzy błędy: brak odbiorcy, zła ilość, zły rodzaj dokumentu. Po poprawkach odbiorca podpisuje WZ przy odbiorze towaru.',
        },
        choice(
          'q-rw',
          'Sprzątaczka bierze z magazynu 10 rolek worków na śmieci na potrzeby hurtowni. Jaki dokument?',
          ['RW', 'WZ', 'MM'],
          0,
          'Towar zostaje zużyty w firmie — to rozchód wewnętrzny.',
          [
            null,
            'WZ dotyczy wydania na zewnątrz, np. klientowi.',
            'MM dotyczy przesunięcia między magazynami.',
          ],
        ),
        choice(
          'q-mm',
          'Hurtownia przewozi 100 długopisów do własnego sklepu firmowego w innym budynku. Jaki dokument?',
          ['MM', 'WZ', 'RW', 'PW'],
          0,
          'Towar zostaje w firmie, zmienia się tylko magazyn — przesunięcie międzymagazynowe.',
          [
            null,
            'Sklep należy do tej samej firmy, więc to nie wydanie na zewnątrz.',
            'Długopisy nie są zużywane w firmie, tylko będą sprzedawane w sklepie.',
            'PW to przyjęcie wewnętrzne, a tu towar opuszcza magazyn.',
          ],
        ),
        {
          type: 'resultCard',
          id: 'karta',
          badges: [
            { min: 0, name: 'Do powtórki', text: 'Wróć do pięciu dokumentów i zasady Z/W.' },
            { min: 0.6, name: 'Znasz dokumenty', text: 'Powtórz kontrolę WZ.' },
            { min: 0.85, name: 'Porządek w magazynie', text: 'Dobierasz dokument i wypełniasz go bez błędów.' },
          ],
        },
      ],
    },
  ],
  exitTicket: 'PZ — od dostawcy, WZ — do klienta, PW — przyjęcie wewnętrzne, RW — zużycie w firmie, MM — między magazynami firmy. Na dokumencie: numer, data, strona, towar, ilość, cena, podpisy.',
};
