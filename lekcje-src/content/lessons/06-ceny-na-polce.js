import { choice, methods, note, number } from '../schema.js';

export default {
  id: '06',
  order: 6,
  part: 'A',
  title: 'Ceny na półce',
  subtitle: 'Który proszek jest naprawdę tańszy, co musi być na etykiecie i od jakiej ceny liczyć promocję.',
  duration: 45,
  sessions: [45],
  han: ['HAN.01.3'],
  tags: ['cena jednostkowa', 'etykieta cenowa', 'promocja', 'najniższa cena z 30 dni'],
  realia: ['cenaJednostkowa', 'omnibus'],
  audience: {
    adults:
      'Dorośli porównują ceny na co dzień, ale rzadko liczą cenę za kilogram. Zacznij od prawdziwych paragonów lub zdjęć półek z ich zakupów. Osobom prowadzącym sklep stacjonarny lub internetowy pokaż, że najniższa cena z 30 dni dotyczy także obniżek w e-sklepie i na platformach.',
  },
  format: {
    name: 'Porównanie cen i kontrola etykiet',
    student:
      'Pracujesz w markecie. Policzysz ceny jednostkowe, przygotujesz etykiety i ustalisz, jak poprawnie ogłosić obniżkę kawy.',
    teacher:
      'Najpierw szybkie liczenie ceny za kilogram, potem porównanie trzech opakowań — tu wiele osób myli się, wybierając największe. Potem etykiety i obniżka: kluczowa jest najniższa cena z 30 dni przed obniżką.',
    methods: [methods.przyklady, methods.ksztaltujace],
  },
  objectives: [
    'Liczę cenę za kilogram i za litr i porównuję według niej opakowania.',
    'Ustalam najniższą cenę z 30 dni przed obniżką i liczę od niej procent obniżki.',
    'Wiem, co zrobić, gdy cena na półce różni się od ceny w kasie.',
  ],
  materials: ['Kalkulator', 'Zdjęcia etykiet cenowych z pobliskiego sklepu (nie są konieczne)'],
  teacherGuide: {
    preparation: 'Możesz poprosić uczniów, żeby na lekcję przynieśli zdjęcie jednej etykiety cenowej z ceną jednostkową.',
    summary:
      'Cena jednostkowa (za kg, za l) pozwala porównać różne opakowania. Większe opakowanie nie zawsze jest tańsze. Przy obniżce sklep podaje najniższą cenę z 30 dni przed obniżką, a procent obniżki liczy od tej ceny. Gdy cena na półce i w kasie się różnią, klient może kupić po cenie dla siebie korzystniejszej.',
  },
  sections: [
    {
      id: 'porownanie',
      label: 'Za kilogram',
      title: 'Który proszek jest naprawdę tańszy?',
      grouping: 'solo',
      intro: 'Na półce stoją trzy opakowania tego samego proszku: 1,35 kg za 32,99 zł, 2,6 kg za 59,99 zł i 4,05 kg za 94,99 zł. Najpierw rozgrzewka na maśle.',
      reading: {
        example: {
          question: 'Ile kosztuje 1 kg proszku w opakowaniu 1,35 kg za 32,99 zł?',
          steps: ['Cenę dzielisz przez masę w kilogramach: 32,99 ÷ 1,35.', 'Wynik: 24,437… zł, czyli po zaokrągleniu 24,44 zł za kilogram.'],
          answer: '24,44 zł/kg.',
        },
      },
      ...note(
        14,
        'Przejdźcie przykład razem, potem każdy liczy sam: masło, proszek, wybór opakowania. Zanim ktoś kliknie ostatnie pytanie, zapytaj, ile osób postawiłoby na największe opakowanie.',
        'Dlaczego największe opakowanie nie jest najtańsze?',
        'Sklep i producent ustalają ceny osobno dla każdego opakowania. Duże bywa droższe w przeliczeniu, zwłaszcza gdy średnie jest w promocji.',
        'Porównywanie cen opakowań zamiast cen za kilogram.',
        'Sprawdź w domu albo w sklepie internetowym dwa opakowania tego samego produktu i porównaj ceny za kilogram.',
      ),
      activities: [
        number('q-maslo', 'Masło 200 g kosztuje 7,99 zł. Ile kosztuje 1 kg?', 39.95, '7,99 ÷ 0,2 = 39,95 zł za kilogram.', {
          unit: 'zł/kg',
          mistakes: [
            { value: 1.6, text: 'Tu cena jest pomnożona przez 0,2. Cenę dzielisz przez masę w kilogramach.' },
          ],
        }),
        number('q-sredni', 'Ile kosztuje 1 kg proszku w opakowaniu 2,6 kg?', 23.07, '59,99 ÷ 2,6 = 23,07 zł/kg.', {
          unit: 'zł/kg',
          tolerance: 0.01,
          mistakes: [{ value: 155.97, text: 'Tu cena jest pomnożona przez masę. Cenę dzielisz przez masę.' }],
        }),
        choice(
          'q-najtanszy',
          'Które opakowanie jest najtańsze w przeliczeniu na kilogram?',
          ['2,6 kg za 59,99 zł', '4,05 kg za 94,99 zł', '1,35 kg za 32,99 zł', 'Wszystkie kosztują tyle samo za kilogram'],
          0,
          '1,35 kg: 24,44 zł/kg; 2,6 kg: 23,07 zł/kg; 4,05 kg: 23,45 zł/kg. Najtańsze jest średnie opakowanie.',
          [
            null,
            '94,99 ÷ 4,05 = 23,45 zł/kg — więcej niż średnie opakowanie (23,07 zł/kg).',
            'Najmniejsze opakowanie jest najdroższe w przeliczeniu: 24,44 zł/kg.',
            'Ceny za kilogram różnią się o ponad 1 zł.',
          ],
        ),
      ],
    },
    {
      id: 'etykiety',
      label: 'Etykiety',
      title: 'Etykiety do wydrukowania',
      grouping: 'pair',
      intro: 'Dostawa nowych towarów. Uzupełnij ceny jednostkowe na etykietach, a potem sprawdź etykiety przygotowane przez kogoś innego.',
      ...note(
        13,
        'Najpierw dokument, potem szukanie błędów. Przy przyprawie zwróć uwagę, jak wysoka jest cena za kilogram małego opakowania.',
        'Po co klientowi cena za kilogram przyprawy, której nikt nie kupuje na kilogramy?',
        'Żeby porównać opakowania 20 g, 50 g i 100 g. Małe opakowania są zwykle dużo droższe w przeliczeniu.',
        'Zaokrąglanie ceny jednostkowej w dół, „żeby lepiej wyglądała”.',
        'Porównaj przyprawę 20 g za 2,49 zł z opakowaniem 50 g za 4,99 zł (99,80 zł/kg).',
      ),
      activities: [
        {
          type: 'docForm',
          id: 'doc-etykiety',
          title: 'Ceny jednostkowe na etykietach',
          context: 'Zaokrąglij do groszy.',
          points: 3,
          doc: {
            title: 'Etykiety cenowe — dostawa 21.10',
            table: {
              head: ['Towar', 'Opakowanie', 'Cena', 'Cena jednostkowa'],
              rows: [
                ['Kawa mielona', '250 g', '18,99 zł', { f: 'kawa' }],
                ['Sok jabłkowy', '1,5 l', '7,49 zł', { f: 'sok' }],
                ['Pieprz czarny mielony', '20 g', '2,49 zł', { f: 'pieprz' }],
              ],
            },
            footer: 'Kawa i pieprz: zł za kilogram. Sok: zł za litr.',
          },
          fields: {
            kawa: { label: 'Kawa — cena za kg', answer: 75.96, hint: '250 g to 0,25 kg. Cenę dzielisz przez 0,25.' },
            sok: { label: 'Sok — cena za litr', answer: 4.99, hint: 'Cenę dzielisz przez 1,5.' },
            pieprz: { label: 'Pieprz — cena za kg', answer: 124.5, hint: '20 g to 0,02 kg. Cenę dzielisz przez 0,02.' },
          },
          explanation: 'Kawa 18,99 ÷ 0,25 = 75,96 zł/kg, sok 7,49 ÷ 1,5 = 4,99 zł/l, pieprz 2,49 ÷ 0,02 = 124,50 zł/kg.',
        },
        {
          type: 'spotErrors',
          id: 'q-etykiety',
          title: 'Etykiety przygotowane przez kolegę',
          context: 'Zaznacz etykiety, które trzeba poprawić.',
          lines: [
            { text: 'Ryż biały 1 kg — 5,49 zł — 5,49 zł/kg' },
            { text: 'Olej rzepakowy 1 l — 9,99 zł — brak ceny za litr', error: 'Brakuje ceny jednostkowej. Tu wynosi 9,99 zł/l.' },
            { text: 'Herbata 100 g — 8,99 zł — 0,90 zł/kg', error: 'Źle policzona cena za kilogram: 8,99 ÷ 0,1 = 89,90 zł/kg.' },
            { text: 'Mąka pszenna 1 kg — 3,79 zł — 3,79 zł/kg' },
            { text: 'Płatki owsiane 500 g — na półce 4,49 zł, w systemie kasowym 4,99 zł', error: 'Cena na półce i w kasie musi być taka sama. Klient może żądać sprzedaży po 4,49 zł.' },
            { text: 'Woda mineralna 1,5 l — 2,29 zł — 1,53 zł/l' },
          ],
          explanation: 'Trzy etykiety do poprawy: brak ceny jednostkowej, błąd w obliczeniu, niezgodność z kasą.',
        },
      ],
    },
    {
      id: 'obnizka',
      label: 'Promocja',
      title: 'Kawa w promocji i płatki przy kasie',
      grouping: 'pair',
      intro: 'Kawa ziarnista 1 kg. Od 5 listopada sklep obniża cenę do 54,99 zł. Sprawdź historię cen.',
      reading: {
        title: 'Najniższa cena z 30 dni',
        paragraphs: [
          'Przy każdej obniżce sklep podaje najniższą cenę towaru z 30 dni przed obniżką. Jeśli ogłasza obniżkę w procentach albo w złotych, liczy ją właśnie od tej ceny. Dzięki temu klient wie, czy promocja jest prawdziwa.',
        ],
        table: {
          head: ['Okres', 'Cena kawy'],
          rows: [
            ['1–10 października', '69,99 zł'],
            ['11–20 października (promocja)', '59,99 zł'],
            ['21 października – 4 listopada', '69,99 zł'],
            ['od 5 listopada (nowa obniżka)', '54,99 zł'],
          ],
        },
      },
      ...note(
        18,
        'Pary czytają tabelę i liczą obniżkę. Pytanie o płatki przy kasie każdy rozwiązuje sam — na koniec zapytaj, jak to powiedzieć klientce i co potem zrobić z etykietą. Przy tabeli: Zapytaj, ile wynosi „przekreślona” cena, którą sklep chciałby pokazać (69,99 zł), a jaką musi pokazać (59,99 zł).',
        'Dlaczego obniżka „−21%” byłaby wprowadzeniem klienta w błąd?',
        'Bo 21% liczono by od 69,99 zł, a w ostatnich 30 dniach kawa kosztowała już 59,99 zł. Prawdziwa obniżka względem najniższej ceny to około 8%.',
        'Wybieranie ceny regularnej zamiast najniższej z 30 dni.',
        'Sprawdźcie w gazetce promocyjnej lub w sklepie internetowym, jak podana jest najniższa cena z 30 dni.',
      ),
      activities: [
        choice(
          'q-najnizsza',
          'Jaką najniższą cenę z 30 dni przed obniżką sklep musi podać przy kawie?',
          ['59,99 zł', '69,99 zł', '54,99 zł', '64,99 zł'],
          0,
          '30 dni przed 5 listopada obejmuje okres od 6 października. W tym czasie najniższa cena wynosiła 59,99 zł (promocja 11–20 października).',
          [
            null,
            '69,99 zł to cena regularna, ale w ostatnich 30 dniach kawa była tańsza.',
            '54,99 zł to nowa cena po obniżce, a nie cena sprzed obniżki.',
            'Nie liczy się średniej. Liczy się najniższa cena z 30 dni.',
          ],
        ),
        number('q-procent', 'O ile procent obniżono cenę kawy względem najniższej ceny z 30 dni? Zaokrąglij do części setnych.', 8.33, '(59,99 − 54,99) ÷ 59,99 × 100% = 8,33%.', {
          unit: '%',
          tolerance: 0.02,
          mistakes: [
            { value: 21.43, text: 'To obniżka od ceny regularnej 69,99 zł. Liczysz od najniższej ceny z 30 dni.' },
            { value: 9.09, text: 'Tu dzielisz przez nową cenę 54,99 zł. Procent obniżki liczysz od ceny przed obniżką.' },
          ],
        }),
        choice(
          'q-kasa',
          'Klientka podchodzi do kasy z płatkami. Na półce było 4,49 zł, kasa nabiła 4,99 zł. Co robisz?',
          [
            'Sprzedaję po 4,49 zł i zgłaszam błąd etykiety',
            'Sprzedaję po 4,99 zł, bo cena w kasie jest zawsze ważniejsza od etykiety',
            'Proszę klientkę, żeby odłożyła płatki, dopóki kierownik nie sprawdzi cen',
          ],
          0,
          'Gdy ceny się różnią, klient może żądać sprzedaży po cenie dla siebie korzystniejszej. Potem trzeba poprawić etykietę albo system.',
          [
            null,
            'To klient decyduje: może kupić po cenie niższej. Sklep odpowiada za zgodność cen.',
            'Klientka ma prawo kupić płatki po cenie z półki teraz.',
          ],
        ),
        {
          type: 'resultCard',
          id: 'karta',
          badges: [
            { min: 0, name: 'Do powtórki', text: 'Wróć do liczenia ceny za kilogram i do tabeli cen kawy.' },
            { min: 0.6, name: 'Liczysz ceny jednostkowe', text: 'Powtórz zasady obniżki.' },
            { min: 0.85, name: 'Etykiety bez błędów', text: 'Sprawdzisz ceny na półce i poprawnie ogłosisz promocję.' },
          ],
        },
      ],
    },
  ],
  exitTicket: 'Cena jednostkowa = cena ÷ masa (lub objętość). Obniżkę liczy się od najniższej ceny z 30 dni przed obniżką. Różnica półka–kasa: klient płaci mniej.',
};
