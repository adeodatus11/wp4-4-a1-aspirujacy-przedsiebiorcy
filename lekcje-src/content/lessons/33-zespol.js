import { choice, methods, note, number, text } from '../schema.js';

const task = {
  type: 'info',
  tone: 'case',
  title: 'Stoisko sklepu sportowego na festynie osiedlowym w sobotę',
  list: [
    'Zespół: Ada dobrze pisze, Bartek szybko liczy, Celina lubi rozmawiać z ludźmi.',
    'Do zrobienia: sprawdzić dane 5 produktów (15 min), policzyć ceny festynowe (15 min), przygotować kartę oferty (20 min), wydrukować kartę i plakat (10 min), przećwiczyć dwuminutową prezentację (10 min), sprawdzić całość przed drukiem (10 min).',
    'Czas: każda osoba ma 30 minut w piątek po lekcjach. Budżet na wydruk: 30 zł (2,50 zł za stronę w punkcie ksero).',
    'Termin: wszystko gotowe w piątek do 15:00.',
  ],
};

export default {
  id: '33',
  order: 33,
  part: 'B',
  title: 'Plan zadania i współpraca w zespole',
  subtitle: 'Trzy osoby, 90 minut pracy razem, 30 zł na wydruk i stoisko na sobotę. Kto co robi i kiedy sprawdzacie, czy wszystko się zgadza?',
  duration: 45,
  sessions: [45],
  han: ['HAN.02.10'],
  tags: ['praca zespołowa', 'plan', 'podział zadań', 'informacja zwrotna'],
  realia: [],
  audience: {
    adults:
      'Dorośli prowadzący mały zespół (sklep, kawiarnia, serwis) mogą od razu przenieść tę lekcję na planowanie zmiany albo akcji promocyjnej. Szczególnie przydatna jest zasada kontroli krzyżowej i rezerwy czasu.',
  },
  format: {
    name: 'Planowanie zadania z ograniczonymi zasobami',
    student:
      'Wasz zespół przygotowuje stoisko sklepu sportowego na festyn. Ułożysz kolejność zadań, podzielisz je między osoby, policzysz czas i budżet, a na koniec sprawdzisz plan innego zespołu.',
    teacher:
      'Uczniowie planują realistyczne zadanie z ograniczonym czasem i pieniędzmi. Pilnuj trzech rzeczy: zależności między zadaniami (najpierw dane, potem ceny), kontroli krzyżowej (nie sprawdzam sam siebie) i rezerwy. Na końcu każdy ustala własny cel rozwojowy.',
    grouping: 'Etapy 1 i 5 samodzielnie, etapy 2–4 w trójkach. Przy dwóch osobach jedna przejmuje dwie role, przy czterech — jedna osoba robi tylko kontrolę.',
    methods: [methods.przypadek, methods.feedback, methods.metapoznanie],
  },
  objectives: [
    'Formułuję cel zespołu z terminem i rezultatem.',
    'Układam kolejność zadań z uwzględnieniem zależności.',
    'Dzielę pracę według mocnych stron i planuję kontrolę krzyżową.',
    'Mieszczę plan w czasie i budżecie, z rezerwą.',
  ],
  materials: ['Urządzenie z przeglądarką', 'Kartka do rozpisania planu'],
  teacherGuide: {
    preparation: 'Podziel klasę na trójki. Jeśli liczba się nie zgadza, ustal role zastępcze (opis w organizacji pracy).',
    summary:
      'Dobry cel ma rezultat, termin i miarę. Zadania układa się według zależności: najpierw dane, potem kalkulacja, karta, kontrola, druk. Pracę dzieli się według mocnych stron, ale kontroluje ktoś inny niż autor. Plan mieści się w dostępnym czasie i budżecie i ma rezerwę na poprawki.',
  },
  sections: [
    {
      id: 'start',
      label: 'Start',
      title: 'Cel zespołu',
      grouping: 'solo',
      intro: 'Kierowniczka sklepu prosi zespół o przygotowanie materiałów na stoisko. Zanim zaczniecie, zapiszcie cel.',
      ...note(
        5,
        'Każdy wybiera sam. Zapytaj, po czym zespół pozna, że cel jest osiągnięty.',
        'Po czym poznacie, że cel jest osiągnięty?',
        'Karta oferty i plakat są wydrukowane, prezentacja przećwiczona, wszystko gotowe w piątek do 15:00.',
        'Cele bez terminu i bez miary („zrobić dobre stoisko”).',
        'Zapisz cel dla zespołu, który przygotowuje gazetkę klasową.',
      ),
      activities: [
        choice(
          'q-cel',
          'Który cel jest najlepiej sformułowany?',
          [
            'Do piątku 15:00 karta 5 produktów, plakat i prezentacja',
            'Przygotować najlepsze stoisko na całym festynie osiedlowym',
            'Postarać się zrobić wszystko, co trzeba, na sobotę rano',
            'Sprzedać na festynie jak najwięcej produktów ze sklepu',
          ],
          0,
          'Cel ma rezultat (karta, plakat, prezentacja) i termin. Wiadomo, kiedy jest osiągnięty.',
          [
            null,
            '„Najlepsze” nie da się zmierzyć, a zespół nie ma wpływu na inne stoiska.',
            'Brak konkretnego rezultatu — nie wiadomo, co trzeba zrobić.',
            'To cel stoiska w sobotę, a nie zadania zespołu w piątek.',
          ],
        ),
      ],
    },
    {
      id: 'zadania',
      label: 'Zadania',
      title: 'Kolejność i podział',
      grouping: 'trio',
      intro: 'Ułóżcie zadania w kolejności i przypiszcie je osobom.',
      ...note(
        12,
        'Trójki układają kolejność i dzielą pracę. Zapytaj, dlaczego kontrola jest przed drukiem, a nie po nim.',
        'Dlaczego Bartek nie powinien sam sprawdzać swoich cen?',
        'Bo własnych błędów najczęściej nie widać. Kontrola krzyżowa — sprawdza ktoś inny.',
        'Druk przed kontrolą; prezentacja przed przygotowaniem karty.',
        'Ustal, co robi każda osoba, gdy czeka na wynik pracy innej (np. Celina pisze plan prezentacji).',
      ),
      activities: [
        task,
        {
          type: 'sequence',
          id: 'q-kolejnosc',
          question: 'Ułóż zadania w kolejności.',
          items: ['Sprawdzić dane 5 produktów', 'Policzyć ceny festynowe', 'Przygotować kartę oferty', 'Sprawdzić całość przed drukiem', 'Wydrukować kartę i plakat', 'Przećwiczyć prezentację na wydruku'],
          explanation: 'Każde zadanie korzysta z wyniku poprzedniego. Kontrola jest przed drukiem, bo poprawka po druku kosztuje pieniądze.',
          hint: 'Co musi być gotowe, zanim zaczniesz kolejne zadanie?',
        },
        {
          type: 'matching',
          id: 'q-podzial',
          question: 'Kto najlepiej wykona zadanie?',
          options: ['Ada', 'Bartek', 'Celina'],
          rows: [
            { label: 'Policzyć ceny festynowe', correct: 1 },
            { label: 'Przygotować tekst karty oferty', correct: 0 },
            { label: 'Przećwiczyć prezentację dla klientów', correct: 2 },
            { label: 'Sprawdzić ceny policzone przez Bartka', correct: 0, explanation: 'Kontrola krzyżowa: sprawdza ktoś inny niż autor.' },
          ],
          explanation: 'Zadania według mocnych stron, ale kontrola zawsze w innych rękach niż autor.',
        },
      ],
    },
    {
      id: 'zasoby',
      label: 'Zasoby',
      title: 'Czas i budżet',
      grouping: 'trio',
      intro: 'Sprawdźcie, czy plan mieści się w czasie i budżecie.',
      ...note(
        10,
        'Trójki liczą. Zapytaj, ile zostaje rezerwy czasu i na co ją przeznaczyć.',
        'Ile osobominut zostaje w rezerwie?',
        '90 − 80 = 10 osobominut. Na poprawki po kontroli.',
        'Liczenie 30 minut na cały zespół zamiast 30 minut na osobę.',
        'Policz, ile stron można wydrukować, jeśli punkt ksero podniesie cenę do 3 zł (10 stron).',
      ),
      activities: [
        task,
        number('q-osobominuty', 'Ile osobominut pracy ma zespół łącznie?', 90, '3 osoby × 30 minut = 90 osobominut.', {
          unit: 'min',
          mistakes: [{ value: 30, text: 'Każda z trzech osób ma 30 minut.' }],
        }),
        number('q-zadania-czas', 'Ile osobominut zajmą wszystkie zadania z listy?', 80, '15 + 15 + 20 + 10 + 10 + 10 = 80 osobominut. Zostaje 10 minut rezerwy.', { unit: 'min' }),
        number('q-strony', 'Ile stron najwięcej możecie wydrukować za 30 zł?', 12, '30 ÷ 2,50 = 12 stron.', { unit: 'stron' }),
      ],
    },
    {
      id: 'kontrola',
      label: 'Kontrola',
      title: 'Plan innego zespołu',
      grouping: 'trio',
      intro: 'Sąsiedni zespół pokazuje swój plan. Sprawdźcie go i dajcie informację zwrotną.',
      ...note(
        10,
        'Trójki zaznaczają problemy, potem formułują jedną uwagę dla drugiego zespołu. Ćwiczcie formę: obserwacja, skutek, propozycja.',
        'Jak powiedzieć drugiemu zespołowi o błędzie, żeby chcieli go poprawić?',
        'Konkretnie i życzliwie: „W planie druk jest przed sprawdzeniem — jeśli w cenach będzie błąd, trzeba drukować drugi raz. Może zamienicie kolejność?”',
        'Ogólniki („słaby plan”) albo krytyka osób zamiast planu.',
        'Napiszcie jedną mocną stronę planu sąsiadów.',
      ),
      activities: [
        {
          type: 'spotErrors',
          id: 'q-plan',
          title: 'Plan zespołu B',
          context: 'Zaznacz to, co trzeba poprawić.',
          lines: [
            { text: 'Cel: do piątku 15:00 karta oferty, plakat i prezentacja.' },
            { text: 'Wszystkie zadania wykonuje Kasia, bo „jest najlepsza”.', error: 'Jedna osoba nie zmieści 80 minut pracy w swoich 30 minutach. Pozostali nic nie robią.' },
            { text: 'Druk o 14:00, sprawdzenie całości o 14:30.', error: 'Sprawdzenie musi być przed drukiem. Poprawka po druku kosztuje pieniądze i czas.' },
            { text: 'Ceny sprawdza osoba, która je policzyła.', error: 'Brak kontroli krzyżowej. Sprawdza ktoś inny.' },
            { text: 'Rezerwa 10 minut na poprawki.' },
            { text: 'Wydruk: 12 stron po 2,50 zł.' },
          ],
          explanation: 'Trzy problemy: brak podziału pracy, kontrola po druku, sprawdzanie własnej pracy.',
        },
        choice(
          'q-feedback',
          'Która uwaga dla zespołu B jest najbardziej pomocna?',
          [
            'Sprawdźcie przed drukiem — błąd po druku kosztuje nowy wydruk',
            'Wasz plan jest słaby i trzeba go zrobić od nowa',
            'Kasia jest zbyt pewna siebie, niech inni coś zrobią',
            'Jest dobrze, nic nie trzeba zmieniać w planie',
          ],
          0,
          'Uwaga mówi, co poprawić, dlaczego i jak. Dotyczy planu, nie osób.',
          [
            null,
            'Ogólnik bez wskazówki — zespół nie wie, co zmienić.',
            'Uwaga o osobie, a nie o planie. Wywołuje obronę.',
            'Plan ma błędy. Przemilczenie ich nie pomaga.',
          ],
        ),
      ],
    },
    {
      id: 'sprawdzenie',
      label: 'Sprawdzenie',
      title: 'Zmiana planu i cel osobisty',
      grouping: 'solo',
      intro: 'Sytuacja awaryjna i Twój własny cel rozwojowy.',
      ...note(
        8,
        'Samodzielnie. Przeczytaj 2–3 cele rozwojowe: czy mają działanie i miarę?',
        'Czym różni się cel „być lepszym w zespole” od dobrego celu rozwojowego?',
        'Dobry cel mówi, co konkretnie zrobię i po czym poznam efekt, np. „przećwiczę prezentację dwa razy i poproszę o jedną uwagę”.',
        'Cele typu „nigdy się nie mylić”.',
        'Zapisz, kogo poprosisz o informację zwrotną po festynie.',
      ),
      activities: [
        choice(
          'q-nieobecnosc',
          'W piątek Bartek jest chory. Co robi zespół?',
          [
            'Ada liczy ceny, Celina je sprawdza; prezentację skracacie',
            'Odwołujecie przygotowania, bo bez Bartka nie da się policzyć cen',
            'Drukujecie karty bez cen, klienci zapytają przy stoisku',
            'Celina robi wszystko sama, a Ada idzie do domu odpocząć',
          ],
          0,
          'Zespół przesuwa zadania, zachowuje kontrolę krzyżową i ogranicza zakres tam, gdzie się da.',
          [
            null,
            'Ceny może policzyć inna osoba. Rezygnacja z celu nie jest konieczna.',
            'Brak cen na karcie to gorsza oferta i więcej pytań na stoisku.',
            'Jedna osoba nie zmieści całej pracy w czasie i nie ma kto jej sprawdzić.',
          ],
        ),
        text(
          'q-cel-osobisty',
          'Zapisz swój cel rozwojowy na to zadanie: co zrobisz i po czym poznasz efekt.',
          'Przećwiczę dwuminutową prezentację dwa razy przed zespołem i poproszę o jedną konkretną uwagę. Efekt: w sobotę mówię bez kartki i mieszczę się w 2 minutach.',
          { criteria: ['Jest konkretne działanie.', 'Jest sposób sprawdzenia efektu.'] },
        ),
        {
          type: 'resultCard',
          id: 'karta',
          badges: [
            { min: 0, name: 'Do powtórki', text: 'Wróć do kolejności zadań i podziału pracy.' },
            { min: 0.6, name: 'Planujesz zespołowo', text: 'Powtórz czas, budżet i kontrolę krzyżową.' },
            { min: 0.85, name: 'Zgrany zespół', text: 'Zaplanujesz zadanie z zasobami, rezerwą i kontrolą.' },
          ],
        },
      ],
    },
  ],
  exitTicket: 'Cel: rezultat + termin. Kolejność według zależności, kontrola przed drukiem. Podział według mocnych stron, kontrola krzyżowa. Plan w czasie i budżecie, z rezerwą.',
};
