import { choice, methods, note, number, text } from '../schema.js';

const offers = {
  type: 'info',
  tone: 'case',
  title: 'Trzy oferty na 100 segregatorów A4 dla sklepu papierniczego w Kaliszu',
  paragraphs: ['Sklep potrzebuje towaru najpóźniej za 6 dni, przed początkiem września. Ceny są netto.'],
  table: {
    head: ['', 'Hurtownia A', 'Hurtownia B', 'Hurtownia C'],
    rows: [
      ['Cena za sztukę', '12,40 zł', '13,00 zł', '11,90 zł'],
      ['Rabat', 'brak', '5% od 100 sztuk', 'brak'],
      ['Transport', '80 zł', 'gratis', '150 zł'],
      ['Płatność', 'gotówką przy odbiorze', 'przelew w 21 dni', 'przedpłata'],
      ['Czas dostawy', '2 dni', '5 dni', '7 dni'],
    ],
  },
};

export default {
  id: '20',
  order: 20,
  part: 'B',
  title: 'Zamówienie i wybór oferty dostawcy',
  subtitle: 'Najniższa cena na sztuce nie oznacza najtańszej dostawy. Porównaj trzy hurtownie tak, jak na egzaminie zawodowym.',
  duration: 45,
  sessions: [45],
  han: ['HAN.02.4'],
  tags: ['oferta dostawcy', 'koszt całkowity', 'termin płatności', 'zamówienie'],
  realia: [],
  audience: {
    adults:
      'Osoby prowadzące firmę często wybierają dostawcę po cenie jednostkowej. Pokaż, jak liczyć koszt całkowity i ile jest wart termin płatności. Zaproponuj, żeby porównali w ten sam sposób dwie oferty, które ostatnio dostali.',
  },
  format: {
    name: 'Porównanie ofert w tabeli i decyzja',
    student:
      'Zaopatrujesz sklep papierniczy w Kaliszu przed rokiem szkolnym. Policzysz koszt trzech ofert, uwzględnisz termin dostawy i płatności, wybierzesz dostawcę i sprawdzisz zamówienie.',
    teacher:
      'Wybór oferty dostawcy z uzasadnieniem to typowe zadanie egzaminu praktycznego HAN.02. Uczniowie liczą koszt całkowity (cena, rabat, transport), sprawdzają termin dostawy i doceniają termin płatności. Uzasadnienie ma odwoływać się do liczb.',
    grouping: 'Etapy 1 i 5 samodzielnie, etapy 2–4 w parach.',
    methods: [methods.przyklady, methods.przypadek],
  },
  objectives: [
    'Liczę koszt całkowity oferty z rabatem i transportem.',
    'Uwzględniam termin dostawy i termin płatności.',
    'Wybieram dostawcę i uzasadniam wybór liczbami.',
    'Sprawdzam zamówienie przed wysłaniem.',
  ],
  materials: ['Urządzenie z przeglądarką', 'Kalkulator'],
  teacherGuide: {
    preparation: 'Jeśli masz arkusz egzaminacyjny HAN.02 z zadaniem o wyborze dostawcy, pokaż na koniec, jak wygląda tam uzasadnienie.',
    summary:
      'Koszt całkowity = wartość towaru po rabacie + transport. Oferta z najniższą ceną jednostkową może być najdroższa po doliczeniu transportu. Termin dostawy może wykluczyć ofertę, a odroczona płatność pozwala sprzedać część towaru przed zapłatą. Uzasadnienie wyboru podaje liczby.',
  },
  sections: [
    {
      id: 'start',
      label: 'Start',
      title: 'Najtańsza na sztuce',
      grouping: 'solo',
      intro: 'Przeczytaj trzy oferty. Hurtownia C ma najniższą cenę za sztukę.',
      ...note(
        5,
        'Każdy odpowiada sam, bez liczenia. Zapisz na tablicy, ile osób wybrało C.',
        'Co poza ceną za sztukę wpływa na koszt zakupu?',
        'Rabat, transport, a dla sklepu także termin płatności i dostawy.',
        'Wybieranie dostawcy tylko po cenie jednostkowej.',
        'Zgadnij, która oferta wyjdzie najtaniej po doliczeniu wszystkiego.',
      ),
      activities: [
        offers,
        choice(
          'q-najtansza',
          'Czy oferta C jest na pewno najtańsza?',
          [
            'Nie wiadomo, trzeba doliczyć rabat i transport',
            'Tak, bo ma najniższą cenę za sztukę',
            'Tak, bo przedpłata zawsze obniża koszt zakupu',
            'Nie, bo najtańsza jest zawsze oferta z darmowym transportem',
          ],
          0,
          'Porównuje się koszt całkowity: wartość towaru po rabacie plus transport.',
          [
            null,
            'Cena na sztuce to tylko część kosztu. Transport C kosztuje 150 zł.',
            'Przedpłata nie obniża ceny, a sklep traci pieniądze wcześniej.',
            'Darmowy transport pomaga, ale trzeba policzyć całość.',
          ],
        ),
      ],
    },
    {
      id: 'porownanie',
      label: 'Porównanie',
      title: 'Koszt całkowity',
      grouping: 'pair',
      intro: 'Uzupełnij tabelę porównawczą.',
      reading: {
        example: {
          question: 'Ile kosztuje oferta B?',
          steps: ['Wartość bez rabatu: 100 × 13,00 = 1300 zł.', 'Rabat 5%: 1300 × 0,95 = 1235 zł.', 'Transport gratis: 1235 + 0 = 1235 zł.'],
          answer: '1235 zł netto.',
        },
      },
      ...note(
        15,
        'Przykład B razem, potem pary liczą A i C. Zapytaj, ile osób wybrałoby C w etapie 1.',
        'Dlaczego oferta z najniższą ceną za sztukę wyszła najdrożej?',
        'Bo transport 150 zł zjada 50 zł oszczędności na towarze (100 × 0,50 zł) i jeszcze więcej.',
        'Doliczanie rabatu do transportu albo pomijanie rabatu.',
        'Policz, przy ilu sztukach oferta C byłaby tańsza od A (gdy 0,50 zł × n > 70 zł, czyli od 141 sztuk).',
      ),
      activities: [
        offers,
        {
          type: 'docForm',
          id: 'doc-porownanie',
          title: 'Porównanie ofert',
          points: 6,
          doc: {
            title: 'Koszt zakupu 100 segregatorów A4 (netto)',
            table: {
              head: ['', 'A', 'B', 'C'],
              rows: [
                ['Wartość towaru po rabacie', { f: 'ta' }, { f: 'tb' }, { f: 'tc' }],
                ['Transport', '80,00', '0,00', '150,00'],
                ['Koszt całkowity', { f: 'ra' }, { f: 'rb' }, { f: 'rc' }],
              ],
            },
          },
          fields: {
            ta: { label: 'A — wartość towaru', answer: 1240, hint: '100 × 12,40.' },
            tb: { label: 'B — wartość towaru po rabacie', answer: 1235, hint: '100 × 13,00 × 0,95.' },
            tc: { label: 'C — wartość towaru', answer: 1190, hint: '100 × 11,90.' },
            ra: { label: 'A — koszt całkowity', answer: 1320, hint: 'Wartość towaru + transport.' },
            rb: { label: 'B — koszt całkowity', answer: 1235, hint: 'Wartość towaru + transport.' },
            rc: { label: 'C — koszt całkowity', answer: 1340, hint: 'Wartość towaru + transport.' },
          },
          explanation: 'A: 1320 zł, B: 1235 zł, C: 1340 zł. Najniższa cena za sztukę (C) daje najwyższy koszt całkowity.',
        },
      ],
    },
    {
      id: 'kryteria',
      label: 'Kryteria',
      title: 'Termin dostawy i płatności',
      grouping: 'pair',
      intro: 'Koszt to nie wszystko. Sklep potrzebuje towaru w 6 dni i nie chce wydawać pieniędzy, zanim zacznie sprzedawać.',
      ...note(
        10,
        'Pary odpowiadają. Przy terminie płatności zapytaj: co sklep zrobi z pieniędzmi przez 21 dni?',
        'Ile jest wart termin płatności 21 dni?',
        'Sklep może sprzedać część segregatorów przed zapłatą i nie musi mieć całej kwoty od razu. To zmniejsza ryzyko braku gotówki.',
        'Wybieranie oferty, która nie zdąży z dostawą.',
        'Co wybierzesz, gdy towar jest potrzebny za 3 dni? (A — tylko ona zdąży.)',
      ),
      activities: [
        offers,
        number('q-sztuka', 'Ile kosztuje jeden segregator w ofercie B po doliczeniu wszystkiego?', 12.35, '1235 zł ÷ 100 = 12,35 zł.', {
          unit: 'zł',
          mistakes: [{ value: 13, text: 'To cena przed rabatem. Koszt całkowity B to 1235 zł na 100 sztuk.' }],
        }),
        choice(
          'q-termin',
          'Którą ofertę wyklucza termin dostawy (towar potrzebny w 6 dni)?',
          ['Ofertę C', 'Ofertę A', 'Ofertę B', 'Żadnej, wszystkie zdążą'],
          0,
          'C dostarcza w 7 dni — za późno. A (2 dni) i B (5 dni) zdążą.',
          [
            null,
            'A dostarcza w 2 dni — zdąży.',
            'B dostarcza w 5 dni — zdąży, choć z małym zapasem.',
            'C potrzebuje 7 dni.',
          ],
        ),
        choice(
          'q-platnosc',
          'Co daje sklepowi płatność przelewem w 21 dni w ofercie B?',
          [
            'Czas na sprzedaż części towaru przed zapłatą',
            'Niższą cenę za każdy segregator w zamówieniu',
            'Zwolnienie z obowiązku zapłaty, gdy towar się nie sprzeda',
            'Możliwość zwrotu wszystkich segregatorów po 21 dniach',
          ],
          0,
          'Odroczona płatność oznacza, że pieniądze z części sprzedaży mogą pokryć zakup.',
          [
            null,
            'Cena jest ta sama. Odroczenie dotyczy terminu zapłaty.',
            'Zapłacić trzeba zawsze, niezależnie od sprzedaży.',
            'Termin płatności nie daje prawa zwrotu towaru.',
          ],
        ),
      ],
    },
    {
      id: 'zamowienie',
      label: 'Zamówienie',
      title: 'Zamówienie do hurtowni B',
      grouping: 'pair',
      intro: 'Sklep wybrał ofertę B. Stażysta przygotował zamówienie. Sprawdź je przed wysłaniem.',
      ...note(
        10,
        'Pary sprawdzają zamówienie. Zapytaj, który błąd byłby najdroższy.',
        'Który błąd kosztowałby sklep najwięcej?',
        'Ilość 1000 zamiast 100 — sklep dostałby dziesięć razy za dużo towaru i musiałby za niego zapłacić.',
        'Zamówienie bez adresu dostawy i bez numeru oferty.',
        'Dopisz do zamówienia termin dostawy i numer oferty.',
      ),
      activities: [
        {
          type: 'spotErrors',
          id: 'q-zamowienie',
          title: 'Zamówienie nr 45/2026 — wersja robocza',
          context: 'Zaznacz wiersze do poprawy.',
          lines: [
            { text: 'Do: Hurtownia B, dział sprzedaży' },
            { text: 'Dotyczy oferty nr 118 z 20.08.2026' },
            { text: 'Segregator A4 75 mm, niebieski — 1000 szt.', error: 'Sklep potrzebuje 100 sztuk, nie 1000.' },
            { text: 'Cena: 12,40 zł netto za sztukę', error: 'To cena z oferty A. Oferta B: 13,00 zł z rabatem 5%.' },
            { text: 'Rabat: 5% od 100 sztuk' },
            { text: 'Płatność: przelew w 21 dni' },
            { text: 'Adres dostawy: —', error: 'Brakuje adresu sklepu, do którego ma przyjechać towar.' },
          ],
          explanation: 'Trzy błędy: ilość, cena z innej oferty, brak adresu dostawy. Każdy mógłby kosztować sklep pieniądze albo czas.',
        },
      ],
    },
    {
      id: 'sprawdzenie',
      label: 'Sprawdzenie',
      title: 'Uzasadnienie',
      grouping: 'solo',
      intro: 'Na egzaminie wybór dostawcy trzeba uzasadnić. Napisz uzasadnienie dla oferty B.',
      ...note(
        5,
        'Samodzielnie. Przeczytaj jedno-dwa uzasadnienia: czy są liczby?',
        'Co musi być w uzasadnieniu, żeby było pełne?',
        'Koszt całkowity porównany z innymi ofertami, termin dostawy i termin płatności.',
        'Uzasadnienie bez liczb: „bo jest najlepsza”.',
        'Napisz uzasadnienie, gdyby sklep potrzebował towaru w 3 dni (A).',
      ),
      activities: [
        text(
          'q-uzasadnienie',
          'Uzasadnij wybór hurtowni B (2–3 zdania z liczbami).',
          'Wybieram hurtownię B: koszt całkowity 1235 zł netto jest najniższy (A: 1320 zł, C: 1340 zł). B dostarczy towar w 5 dni, czyli przed wymaganym terminem 6 dni, a płatność przelewem w 21 dni pozwala sprzedać część segregatorów przed zapłatą.',
          { minLength: 60, criteria: ['Jest koszt całkowity B i porównanie z A i C.', 'Jest termin dostawy.', 'Jest termin płatności.'] },
        ),
        {
          type: 'resultCard',
          id: 'karta',
          badges: [
            { min: 0, name: 'Do powtórki', text: 'Wróć do tabeli kosztów całkowitych.' },
            { min: 0.6, name: 'Porównujesz oferty', text: 'Powtórz terminy dostawy i płatności.' },
            { min: 0.85, name: 'Zaopatrzeniowiec', text: 'Wybierzesz dostawcę i uzasadnisz wybór liczbami.' },
          ],
        },
      ],
    },
  ],
  exitTicket: 'Koszt całkowity = towar po rabacie + transport. Najniższa cena za sztukę nie znaczy najtaniej. Termin dostawy może wykluczyć ofertę, termin płatności ma wartość. Uzasadnienie z liczbami.',
};
