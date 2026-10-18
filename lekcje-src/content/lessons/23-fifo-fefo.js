import { choice, methods, note, number } from '../schema.js';

export default {
  id: '23',
  order: 23,
  part: 'B',
  title: 'Przyjęcie i wydanie z magazynu: FIFO i FEFO',
  subtitle: 'Taśma pakowa przyszła w trzech dostawach po trzech różnych cenach. Ile kosztowało to, co wydaliśmy klientom, i ile jest wart zapas?',
  duration: 45,
  sessions: [45],
  han: ['HAN.02.5'],
  tags: ['FIFO', 'FEFO', 'kartoteka magazynowa', 'wycena rozchodu'],
  realia: [],
  audience: {
    adults:
      'Dla osób prowadzących sklep lub hurtownię FIFO to sposób na wiarygodny koszt sprzedanego towaru, gdy ceny zakupu rosną. Program magazynowy liczy to sam, ale warto rozumieć, skąd biorą się kwoty — zwłaszcza przy inwentaryzacji i wycenie zapasu.',
  },
  format: {
    name: 'Przykład rozwiązany i kartoteka',
    student:
      'Pracujesz w magazynie hurtowni papierniczej. Wycenisz wydania taśmy pakowej metodą FIFO, uzupełnisz kartotekę magazynową i zdecydujesz, którą partię jogurtów wydać najpierw.',
    teacher:
      'Wycena rozchodu metodą FIFO to element egzaminu praktycznego HAN.02 (program magazynowo-sprzedażowy z ustawieniem FIFO). Uczniowie liczą najpierw jedno wydanie razem z przykładem, potem całą kartotekę. FEFO pokazujemy jako zasadę przy towarach z datą ważności.',
    methods: [methods.przyklady, methods.ksztaltujace],
  },
  objectives: [
    'Wyceniam rozchód towaru metodą FIFO.',
    'Prowadzę kartotekę magazynową: przychód, rozchód, stan.',
    'Stosuję FEFO przy towarach z datą ważności.',
  ],
  materials: ['Kalkulator'],
  teacherGuide: {
    preparation: 'Narysuj na tablicy trzy „warstwy” towaru jedna na drugiej z cenami 5,00, 5,40 i 5,60 zł. Przy wydaniu zdejmujesz najpierw najniższą (najstarszą) warstwę.',
    summary:
      'FIFO (pierwsze przyszło — pierwsze wyszło): wydanie wycenia się po cenach najstarszych partii, aż się wyczerpią. Zapas na koniec ma ceny najnowszych dostaw. FEFO (pierwsze traci ważność — pierwsze wychodzi): przy żywności i lekach o kolejności decyduje data ważności, a nie data przyjęcia.',
  },
  sections: [
    {
      id: 'start',
      label: 'Start',
      title: 'Co znaczy FIFO?',
      grouping: 'solo',
      intro: 'W ustawieniach programu magazynowego hurtowni zaznaczono metodę wyceny rozchodu: FIFO.',
      ...note(
        5,
        'Każdy wybiera sam. Pokaż na tablicy warstwy towaru.',
        'Dlaczego przy rosnących cenach metoda wyceny ma znaczenie?',
        'Bo od niej zależy, jaki koszt sprzedanego towaru pokaże firma i ile jest wart zapas na koniec.',
        'Mylenie FIFO z kolejnością fizycznego układania towaru na półce.',
        'Sprawdź, co oznacza skrót LIFO (ostatnie przyszło — pierwsze wyszło) i dlaczego rzadko się go stosuje w Polsce.',
      ),
      activities: [
        choice(
          'q-fifo',
          'Co oznacza FIFO przy wycenie wydania?',
          [
            'Wydanie wycenia się po cenach najstarszych dostaw',
            'Wydanie wycenia się po cenie ostatniej dostawy',
            'Wydanie wycenia się po średniej cenie wszystkich dostaw',
            'Najpierw wydaje się towar z najkrótszą datą ważności',
          ],
          0,
          'First In, First Out: pierwsze przyszło, pierwsze wychodzi — także w wycenie.',
          [
            null,
            'To LIFO (ostatnie przyszło — pierwsze wychodzi).',
            'To metoda średniej ważonej, inna niż FIFO.',
            'To FEFO, zasada dla towarów z datą ważności.',
          ],
        ),
      ],
    },
    {
      id: 'przyklad',
      label: 'Przykład',
      title: 'Pierwsze wydanie',
      grouping: 'pair',
      intro: 'Taśma pakowa 48 mm. Na 1 października w magazynie było 80 rolek po 5,00 zł. 5 października przyjęto 120 rolek po 5,40 zł. 12 października wydano klientowi 150 rolek.',
      reading: {
        example: {
          question: 'Jaka jest wartość wydania z 12 października metodą FIFO?',
          steps: [
            'Najpierw wydajesz całą najstarszą partię: 80 rolek po 5,00 zł = 400,00 zł.',
            'Brakuje jeszcze 150 − 80 = 70 rolek. Bierzesz je z partii 5,40 zł: 70 × 5,40 = 378,00 zł.',
            'Wartość wydania: 400,00 + 378,00 = 778,00 zł.',
            'Zostaje 120 − 70 = 50 rolek po 5,40 zł, czyli 270,00 zł.',
          ],
          answer: 'Wydanie 778,00 zł, zapas 50 rolek za 270,00 zł.',
        },
      },
      ...note(
        12,
        'Przykład przechodzicie razem, krok po kroku. Potem pary liczą wydanie na nowych danych (pytanie poniżej).',
        'Dlaczego nie można po prostu pomnożyć 150 × 5,40?',
        'Bo w magazynie były dwie partie w różnych cenach. Przy FIFO najpierw wydaje się tańszą, starszą partię.',
        'Liczenie całego wydania po jednej cenie (najnowszej albo najstarszej).',
        'Policz wartość wydania metodą średniej ważonej i porównaj (150 × 5,24 = 786 zł).',
      ),
      activities: [
        number('q-wydanie', 'Inny towar: stan 40 sztuk po 3,00 zł, dostawa 60 sztuk po 3,50 zł. Wydano 70 sztuk. Jaka jest wartość wydania metodą FIFO?', 225, '40 × 3,00 = 120,00 zł + 30 × 3,50 = 105,00 zł. Razem 225,00 zł.', {
          unit: 'zł',
          mistakes: [
            { value: 245, text: 'Policzono całe wydanie po 3,50 zł. Najpierw wydajesz 40 sztuk po 3,00 zł.' },
            { value: 210, text: 'Policzono całe wydanie po 3,00 zł. Starszej partii jest tylko 40 sztuk.' },
          ],
        }),
      ],
    },
    {
      id: 'kartoteka',
      label: 'Kartoteka',
      title: 'Kartoteka taśmy pakowej',
      grouping: 'pair',
      intro: 'Dokończ kartotekę za październik. Po 12 października: 20 października przyjęto 100 rolek po 5,60 zł, a 25 października wydano 120 rolek.',
      ...note(
        15,
        'Pary uzupełniają kartotekę. Zapytaj, po jakiej cenie są rolki, które zostały na koniec miesiąca.',
        'Po jakiej cenie wyceniony jest zapas na koniec października?',
        'Po cenie najnowszej dostawy (5,60 zł), bo starsze partie wyszły pierwsze.',
        'Zapominanie, że po 12 października zostało 50 rolek po 5,40 zł.',
        'Policz łączną wartość wydań w październiku (778 + 662 = 1440 zł).',
      ),
      activities: [
        {
          type: 'docForm',
          id: 'doc-kartoteka',
          title: 'Kartoteka magazynowa: taśma pakowa 48 mm',
          context: 'Metoda wyceny rozchodu: FIFO.',
          points: 5,
          doc: {
            title: 'Kartoteka magazynowa — taśma pakowa 48 mm, październik 2026',
            table: {
              head: ['Data', 'Dokument', 'Przychód', 'Rozchód', 'Stan (szt.)', 'Wartość stanu'],
              rows: [
                ['01.10', 'Stan początkowy', '', '', '80', '400,00'],
                ['05.10', 'PZ 201', '120 × 5,40', '', '200', '1048,00'],
                ['12.10', 'WZ 377', '', '150 → 778,00', { f: 's1' }, { f: 'w1' }],
                ['20.10', 'PZ 214', '100 × 5,60', '', '150', '830,00'],
                ['25.10', 'WZ 395', '', { f: 'r2' }, { f: 's2' }, { f: 'w2' }],
              ],
            },
          },
          fields: {
            s1: { label: 'Stan po 12.10 — ilość', answer: 50, hint: '200 − 150.' },
            w1: { label: 'Stan po 12.10 — wartość', answer: 270, hint: 'Zostały rolki z partii 5,40 zł.' },
            r2: { label: 'Rozchód 25.10 — wartość', answer: 662, hint: 'Najpierw 50 rolek po 5,40 zł, potem 70 rolek po 5,60 zł.' },
            s2: { label: 'Stan po 25.10 — ilość', answer: 30, hint: '150 − 120.' },
            w2: { label: 'Stan po 25.10 — wartość', answer: 168, hint: 'Zostały rolki z partii 5,60 zł.' },
          },
          explanation: '25.10: 50 × 5,40 = 270 zł + 70 × 5,60 = 392 zł, razem 662 zł. Zostaje 30 rolek po 5,60 zł = 168 zł.',
        },
      ],
    },
    {
      id: 'fefo',
      label: 'FEFO',
      title: 'Jogurty: data ważniejsza niż dostawa',
      grouping: 'pair',
      intro: 'Hurtownia spożywcza ma dwie partie jogurtów: przyjętą w poniedziałek z datą ważności 30.10 i przyjętą w środę z datą 27.10.',
      reading: {
        paragraphs: [
          'Przy żywności, lekach i kosmetykach o kolejności wydawania decyduje data ważności: FEFO (pierwsze traci ważność — pierwsze wychodzi). Wycena w księgach może nadal być prowadzona metodą FIFO — to dwie różne sprawy.',
        ],
      },
      ...note(
        8,
        'Pary odpowiadają. Wyjaśnij różnicę: FEFO dotyczy fizycznej kolejności wydawania, FIFO — także wyceny.',
        'Dlaczego dostawca może przysłać później towar z krótszą datą?',
        'Bo produkował partie w różnym czasie albo miał w magazynie starszy towar. Data przyjęcia nie mówi o dacie ważności.',
        'Wydawanie według daty przyjęcia, gdy towar ma datę ważności.',
        'Wymień trzy towary w sklepie spożywczym, przy których FEFO jest szczególnie ważne.',
      ),
      activities: [
        choice(
          'q-fefo',
          'Którą partię jogurtów wydajesz najpierw?',
          ['Środową, z datą 27.10', 'Poniedziałkową, z datą 30.10', 'Obie po połowie', 'Tę, która stoi bliżej rampy'],
          0,
          'Krótsza data ważności wychodzi pierwsza, choć partia przyszła później.',
          [
            null,
            'Tak byłoby przy FIFO według dat przyjęcia. Przy żywności decyduje data ważności.',
            'Mieszanie partii utrudnia kontrolę dat.',
            'Wygoda nie decyduje o kolejności wydawania żywności.',
          ],
        ),
        {
          type: 'matching',
          id: 'q-zasada',
          question: 'Jaką zasadą kierujesz się przy wydawaniu?',
          options: ['FEFO (data ważności)', 'FIFO (kolejność dostaw)'],
          rows: [
            { label: 'Jogurty', correct: 0 },
            { label: 'Długopisy', correct: 1 },
            { label: 'Leki bez recepty w drogerii', correct: 0 },
            { label: 'Segregatory', correct: 1 },
            { label: 'Kremy do twarzy', correct: 0 },
          ],
          explanation: 'Gdy towar ma datę ważności — FEFO. Gdy nie ma — FIFO.',
        },
      ],
    },
    {
      id: 'sprawdzenie',
      label: 'Sprawdzenie',
      title: 'Wartość zapasu',
      grouping: 'solo',
      intro: 'Jedno pytanie na nowych danych.',
      ...note(
        5,
        'Samodzielnie. Na koniec przypomnij: zapas po FIFO ma ceny najnowszych dostaw.',
        'Co się dzieje z wartością zapasu po FIFO, gdy ceny rosną?',
        'Zapas jest wyceniony po wyższych, najnowszych cenach, a koszt sprzedanego towaru po starszych, niższych.',
        'Wycenianie zapasu po najstarszej cenie.',
        'Sprawdź w programie magazynowym, gdzie ustawia się metodę wyceny.',
      ),
      activities: [
        number('q-zapas', 'Stan: 30 sztuk po 8,00 zł. Dostawa: 50 sztuk po 9,00 zł. Wydano 60 sztuk. Ile jest wart zapas, który został (FIFO)?', 180, 'Wydano 30 × 8 i 30 × 9. Zostało 20 sztuk z partii 9,00 zł: 20 × 9 = 180 zł.', {
          unit: 'zł',
          mistakes: [
            { value: 160, text: 'Zostały sztuki z nowszej partii po 9,00 zł, nie po 8,00 zł.' },
            { value: 510, text: 'To wartość wydania (240 + 270). Pytanie dotyczy zapasu, który został.' },
          ],
        }),
        {
          type: 'resultCard',
          id: 'karta',
          badges: [
            { min: 0, name: 'Do powtórki', text: 'Wróć do przykładu z taśmą pakową.' },
            { min: 0.6, name: 'Liczysz FIFO', text: 'Powtórz kartotekę i różnicę FIFO/FEFO.' },
            { min: 0.85, name: 'Magazyn pod kontrolą', text: 'Wycenisz wydanie i zapas bez programu.' },
          ],
        },
      ],
    },
  ],
  exitTicket: 'FIFO: wydanie po cenach najstarszych partii, zapas po cenach najnowszych. FEFO: najpierw wydaje się towar z najkrótszą datą ważności, niezależnie od daty dostawy.',
};
