import { choice, methods, note, number, text } from '../schema.js';

export default {
  id: '07',
  order: 7,
  part: 'A',
  title: 'Opakowania, kaucja i odpady',
  subtitle: 'Klient oddaje butelki bez paragonu, piekarnia czeka na skrzynki, a na zapleczu rośnie góra kartonów.',
  duration: 45,
  sessions: [45],
  han: ['HAN.01.3', 'HAN.02.1'],
  tags: ['system kaucyjny', 'opakowania zwrotne', 'segregacja', 'greenwashing'],
  realia: ['kaucja'],
  audience: {
    adults:
      'Dorośli znają system kaucyjny jako klienci — zacznij od ich doświadczeń z automatami. Osobom prowadzącym mały sklep wyjaśnij, że obowiązek przyjmowania opakowań dotyczy sklepów powyżej 200 m², a mniejsze mogą przystąpić dobrowolnie. Warto sprawdzić aktualne zasady dla szkła.',
  },
  format: {
    name: 'Obsługa zwrotów i ewidencja',
    student:
      'Pracujesz w markecie w Tarnowie (260 m²). Przyjmiesz opakowania w systemie kaucyjnym, rozliczysz skrzynki z piekarnią, posegregujesz odpady z zaplecza i napiszesz uczciwy komunikat o ekologii.',
    teacher:
      'System kaucyjny działa od 1 października 2025 r., więc uczniowie mogą go znać z zakupów. Lekcja łączy obsługę klienta (zwrot opakowań), ewidencję opakowań zwrotnych między firmami i komunikat bez przesadnych deklaracji.',
    grouping: 'Etapy 1 i 5 samodzielnie, etapy 2–4 w parach.',
    methods: [methods.przypadek, methods.ksztaltujace],
  },
  objectives: [
    'Obsługuję zwrot opakowań w systemie kaucyjnym i liczę kaucję.',
    'Prowadzę ewidencję opakowań zwrotnych między sklepem a dostawcą.',
    'Segreguję odpady z zaplecza sklepu.',
    'Piszę komunikat ekologiczny oparty na danych.',
  ],
  materials: ['Urządzenie z przeglądarką', 'Kalkulator'],
  teacherGuide: {
    preparation: 'Możesz przynieść pustą butelkę ze znakiem kaucji i bez znaku — uczniowie porównają oznaczenia.',
    summary:
      'Sklep powyżej 200 m², który sprzedaje napoje w opakowaniach systemu, przyjmuje puste opakowania ze znakiem kaucji, także kupione gdzie indziej i bez paragonu. Opakowanie musi być puste, niezgniecione, z czytelną etykietą. Opakowania zwrotne między firmami (skrzynki, palety) ewidencjonuje się osobno. Komunikat ekologiczny podaje konkretne dane i okres, bez haseł w rodzaju „zero waste”.',
  },
  sections: [
    {
      id: 'start',
      label: 'Start',
      title: 'Butelki bez paragonu',
      grouping: 'solo',
      intro: 'Klient przynosi 10 pustych butelek po wodzie ze znakiem kaucji. Kupił je w innym sklepie i nie ma paragonu.',
      ...note(
        5,
        'Każdy decyduje sam. Zapytaj, kto oddawał butelki w automacie i czy automat pytał o paragon.',
        'Dlaczego system nie wymaga paragonu?',
        'Kaucja jest „w butelce”, a nie w paragonie. Każdy sklep w systemie rozlicza się z operatorem.',
        'Przekonanie, że sklep zwraca kaucję tylko za opakowania kupione u siebie.',
        'Sprawdźcie, ile automatów do zwrotu jest w okolicy szkoły.',
      ),
      activities: [
        choice(
          'q-bez-paragonu',
          'Co robisz?',
          [
            'Przyjmuję butelki i oddaję 5 zł kaucji',
            'Odmawiam, bo klient nie ma paragonu z naszego sklepu',
            'Przyjmuję tylko butelki marek, które mamy w ofercie',
            'Odsyłam klienta do sklepu, w którym kupił wodę',
          ],
          0,
          'Sklep powyżej 200 m² przyjmuje opakowania ze znakiem kaucji bez paragonu, także kupione gdzie indziej. 10 × 0,50 zł = 5 zł.',
          [
            null,
            'Paragon nie jest potrzebny. Liczy się znak kaucji na opakowaniu.',
            'Obowiązek dotyczy wszystkich opakowań systemu, nie tylko marek ze sklepu.',
            'Sklep tej wielkości musi przyjąć opakowania kupione w innym sklepie.',
          ],
        ),
      ],
    },
    {
      id: 'kaucja',
      label: 'Kaucja',
      title: 'Zwrot opakowań przy kasie',
      grouping: 'pair',
      intro: 'W sklepie nie ma automatu, więc opakowania przyjmuje się przy kasie.',
      reading: {
        title: 'System kaucyjny w skrócie',
        paragraphs: [
          'Od 1 października 2025 r. do ceny napoju w butelce plastikowej do 3 l albo w puszce do 1 l dolicza się 0,50 zł kaucji, a do szklanej butelki wielorazowej do 1,5 l — 1 zł. Klient odzyskuje kaucję, gdy odda puste opakowanie.',
          'Opakowanie musi mieć znak kaucji, być puste, niezgniecione i mieć czytelny kod kreskowy. Sklepy powyżej 200 m² muszą przyjmować opakowania, mniejsze mogą to robić dobrowolnie.',
        ],
      },
      ...note(
        12,
        'Najpierw obliczenie, potem dopasowanie. Przy zgniecionej puszce zapytaj, dlaczego automat jej nie przyjmie (nie odczyta kształtu i kodu).',
        'Dlaczego opakowanie musi być niezgniecione?',
        'Automat i kasjer muszą odczytać kod i rozpoznać opakowanie. Zgniecione mogłoby być oddane dwa razy albo nie być w systemie.',
        'Liczenie wszystkich opakowań po 0,50 zł.',
        'Policz, ile kaucji zostawia rodzina, która kupuje tygodniowo 12 butelek wody i 6 puszek (9 zł).',
      ),
      activities: [
        number('q-kaucja', 'Klientka oddaje 14 butelek plastikowych, 8 puszek i 4 szklane butelki wielorazowe, wszystkie ze znakiem kaucji. Ile wypłacasz?', 15, '14 × 0,50 + 8 × 0,50 + 4 × 1,00 = 7 + 4 + 4 = 15 zł.', {
          unit: 'zł',
          mistakes: [
            { value: 13, text: 'Szklane butelki wielorazowe mają kaucję 1 zł, nie 0,50 zł.' },
            { value: 26, text: 'Butelki plastikowe i puszki mają kaucję 0,50 zł, nie 1 zł.' },
          ],
        }),
        {
          type: 'matching',
          id: 'q-przyjmujesz',
          question: 'Czy przyjmujesz opakowanie w systemie kaucyjnym?',
          options: ['Tak, z kaucją', 'Nie w systemie'],
          rows: [
            { label: 'Pusta butelka 1,5 l po wodzie, ze znakiem kaucji', correct: 0 },
            { label: 'Zgnieciona puszka ze znakiem kaucji', correct: 1, explanation: 'Zgniecionej nie da się rozpoznać — nie przyjmujesz.' },
            { label: 'Butelka bez znaku kaucji ze starego zapasu', correct: 1, explanation: 'Za opakowania bez znaku nie pobierano kaucji, więc się jej nie oddaje.' },
            { label: 'Butelka po oleju spożywczym', correct: 1, explanation: 'System obejmuje opakowania po napojach.' },
            { label: 'Butelka 0,5 l po soku, ze znakiem, z resztką soku', correct: 1, explanation: 'Opakowanie musi być puste. Można poprosić klienta o wylanie resztki.' },
            { label: 'Puszka 0,33 l po napoju, ze znakiem, niezgnieciona', correct: 0 },
          ],
          explanation: 'Przyjmujesz tylko puste, niezgniecione opakowania po napojach ze znakiem kaucji.',
        },
      ],
    },
    {
      id: 'skrzynki',
      label: 'Skrzynki',
      title: 'Skrzynki z piekarni',
      grouping: 'pair',
      intro: 'Piekarnia dowozi pieczywo w plastikowych skrzynkach. Za każdą skrzynkę sklep ma u piekarni 15 zł kaucji. Skrzynki pęknięte rozlicza się jako utracone.',
      ...note(
        10,
        'Pary uzupełniają ewidencję. Zwróć uwagę na wartość kaucji w skrzynkach: to pieniądze sklepu „zamrożone” na zapleczu.',
        'Dlaczego sklepowi opłaca się szybko oddawać puste skrzynki?',
        'Bo w każdej leży 15 zł kaucji. Dużo skrzynek na zapleczu to zamrożone pieniądze i zajęte miejsce.',
        'Mieszanie skrzynek z kaucją w systemie butelek. To dwie osobne ewidencje.',
        'Policz, ile kaucji „leży” na zapleczu, jeśli stan skrzynek wzrośnie do 50 (750 zł).',
      ),
      activities: [
        {
          type: 'docForm',
          id: 'doc-skrzynki',
          title: 'Ewidencja skrzynek od piekarni — tydzień 43',
          points: 3,
          doc: {
            title: 'Opakowania zwrotne: skrzynki na pieczywo',
            table: {
              head: ['Pozycja', 'Liczba skrzynek'],
              rows: [
                ['Stan na początek tygodnia', '40'],
                ['Przyjęte z dostawami', '35'],
                ['Oddane piekarni', '42'],
                ['Pęknięte, rozliczone jako utracone', '3'],
                ['Stan na koniec tygodnia', { f: 'stan' }],
              ],
            },
            after: [
              ['Kaucja w skrzynkach na koniec tygodnia (15 zł/szt.)', { f: 'kaucja' }],
              ['Kaucja utracona za pęknięte skrzynki', { f: 'strata' }],
            ],
          },
          fields: {
            stan: { label: 'Stan na koniec tygodnia', answer: 30, hint: 'Stan = początek + przyjęte − oddane − utracone.' },
            kaucja: { label: 'Kaucja w skrzynkach', answer: 450, hint: 'Stan końcowy × 15 zł.' },
            strata: { label: 'Kaucja utracona', answer: 45, hint: 'Pęknięte skrzynki × 15 zł.' },
          },
          explanation: '40 + 35 − 42 − 3 = 30 skrzynek, w których leży 450 zł kaucji. Pęknięte skrzynki to 45 zł straty.',
        },
      ],
    },
    {
      id: 'odpady',
      label: 'Odpady',
      title: 'Zaplecze i komunikat',
      grouping: 'pair',
      intro: 'Na zapleczu: kartony po dostawie, folia z palet, słoiki bez kaucji, paragony, zatłuszczony papier spod pieczywa. Kierownik chce też powiesić informację o „ekologicznym sklepie”.',
      ...note(
        10,
        'Najpierw segregacja, potem komunikat. Przy paragonach zapytaj, dlaczego nie trafiają do papieru (papier termiczny z dodatkami chemicznymi).',
        'Czym różni się komunikat „jesteśmy eko” od komunikatu „w październiku oddaliśmy do recyklingu 180 kg kartonów”?',
        'Pierwszy jest ogólnikiem, którego nie da się sprawdzić. Drugi podaje fakt, liczbę i okres.',
        'Wrzucanie paragonów i zatłuszczonego papieru do pojemnika na papier.',
        'Napiszcie komunikat dla klientów o automacie do butelek, który sklep planuje (bez obietnic, których nie da się dotrzymać).',
      ),
      activities: [
        {
          type: 'matching',
          id: 'q-frakcje',
          question: 'Do jakiego pojemnika?',
          options: ['Papier', 'Metale i tworzywa', 'Szkło', 'Zmieszane'],
          rows: [
            { label: 'Kartony po dostawie, złożone', correct: 0 },
            { label: 'Folia stretch z palet', correct: 1 },
            { label: 'Słoiki po ogórkach (bez kaucji)', correct: 2 },
            { label: 'Paragony z papieru termicznego', correct: 3 },
            { label: 'Zatłuszczony papier spod pieczywa', correct: 3 },
          ],
          explanation: 'Papier zatłuszczony i paragony termiczne nie nadają się do recyklingu papieru. Folia trafia do metali i tworzyw sztucznych.',
        },
        {
          type: 'spotErrors',
          id: 'q-komunikat',
          title: 'Projekt plakatu kierownika',
          context: 'Zaznacz zdania, których nie wolno zostawić, bo wprowadzają w błąd albo są niesprawdzalne.',
          lines: [
            { text: 'Jesteśmy pierwszym sklepem zero waste w Tarnowie!', error: 'Sklep nie ma dowodów ani na „zero waste”, ani na „pierwszy”. To ogólnik, który wprowadza w błąd.' },
            { text: 'W październiku oddaliśmy do recyklingu 180 kg kartonów.' },
            { text: 'Za każde opakowanie ze znakiem kaucji oddajemy kaucję — także bez paragonu.' },
            { text: 'Nasze torby są w 100% ekologiczne.', error: '„Ekologiczne” bez wyjaśnienia nic nie znaczy. Trzeba podać, z czego są i co z nimi zrobić.' },
            { text: 'Zakupy w naszym sklepie chronią klimat.', error: 'Niesprawdzalna obietnica. Komunikat powinien opisać konkretne działanie i jego wynik.' },
          ],
          explanation: 'Dobry komunikat ekologiczny podaje konkretne działanie, liczbę i okres. Hasła bez dowodów to greenwashing.',
        },
      ],
    },
    {
      id: 'sprawdzenie',
      label: 'Sprawdzenie',
      title: 'Mniejszy sklep',
      grouping: 'solo',
      intro: 'Twoja ciocia prowadzi sklep 150 m² w małej miejscowości i pyta, czy musi przyjmować butelki w systemie kaucyjnym.',
      ...note(
        8,
        'Samodzielnie. Komunikaty z pytania otwartego porównaj z kryteriami.',
        'Jakie plusy może mieć dobrowolne przystąpienie małego sklepu do systemu?',
        'Klienci przychodzą oddać butelki i przy okazji robią zakupy. Ale trzeba mieć miejsce i obsługę.',
        'Twierdzenie, że każdy sklep musi przyjmować butelki.',
        'Sprawdź, jak sklep może przystąpić do systemu dobrowolnie (umowa z operatorem).',
      ),
      activities: [
        choice(
          'q-150',
          'Co odpowiesz cioci?',
          [
            'Nie musi, ale może przystąpić dobrowolnie',
            'Musi przyjmować butelki, bo sprzedaje napoje',
            'Musi przyjmować tylko szklane butelki, bez plastiku',
            'Nie może przyjmować butelek, bo to zarezerwowane dla dużych sieci',
          ],
          0,
          'Obowiązek dotyczy sklepów powyżej 200 m². Mniejsze mogą przystąpić dobrowolnie.',
          [
            null,
            'Sprzedaż napojów nie wystarczy — obowiązek zależy od powierzchni sklepu.',
            'Nie ma takiego podziału według materiału dla małych sklepów.',
            'Małe sklepy mogą przystąpić do systemu dobrowolnie.',
          ],
        ),
        text(
          'q-moj-komunikat',
          'Napisz uczciwy komunikat ekologiczny dla sklepu w Tarnowie (2 zdania).',
          'W październiku oddaliśmy do recyklingu 180 kg kartonów i 25 kg folii z dostaw. Butelki i puszki ze znakiem kaucji przyjmujemy przy każdej kasie — także bez paragonu.',
          { criteria: ['Jest konkretne działanie.', 'Jest liczba i okres.', 'Brak ogólników typu „eko”, „zero waste”.'] },
        ),
        {
          type: 'resultCard',
          id: 'karta',
          badges: [
            { min: 0, name: 'Do powtórki', text: 'Wróć do zasad systemu kaucyjnego.' },
            { min: 0.6, name: 'Obsługujesz zwroty', text: 'Powtórz ewidencję skrzynek i segregację.' },
            { min: 0.85, name: 'Porządek w opakowaniach', text: 'Przyjmiesz zwrot, rozliczysz skrzynki i napiszesz rzetelny komunikat.' },
          ],
        },
      ],
    },
  ],
  exitTicket: 'Kaucja: 0,50 zł plastik i puszka, 1 zł szkło wielorazowe. Sklep > 200 m² przyjmuje opakowania bez paragonu. Skrzynki = osobna ewidencja. Komunikat: działanie + liczba + okres.',
};
