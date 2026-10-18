import { choice, methods, note, text } from '../schema.js';

const transcript = {
  type: 'info',
  tone: 'case',
  title: 'Zapis rozmowy, wtorek 9:40',
  paragraphs: [
    '„Dzień dobry, Iwona Mazur, sekretariat Szkoły Podstawowej nr 12. Chcemy zamówić 200 zeszytów A5 w kratkę, 32 kartki, na przyszły poniedziałek. Czy zdążycie z dostawą? Proszę oddzwonić do 14:00, bo potem kończę pracę. Mój numer: 56 622 14 08.”',
  ],
};

export default {
  id: '13',
  order: 13,
  part: 'A',
  title: 'Telefon, e-mail i opinie w internecie',
  subtitle: 'Klient dzwoni, gdy nie znasz odpowiedzi, pisze maila bez numeru zamówienia i zostawia jedną gwiazdkę w opiniach.',
  duration: 45,
  sessions: [45],
  han: ['HAN.01.4', 'HAN.01.6'],
  tags: ['rozmowa telefoniczna', 'notatka', 'opinie online', 'obsługa klienta'],
  realia: [],
  audience: {
    adults:
      'Dla osób prowadzących małą firmę opinie w internecie to codzienność. Poproś, żeby przynieśli (albo znaleźli) jedną negatywną opinię o firmie z ich branży i napisali na nią odpowiedź według zasad z etapu 4. Zwróć uwagę na dane osobowe w odpowiedziach.',
  },
  format: {
    name: 'Symulacja rozmowy i praca na tekstach',
    student:
      'Pracujesz w dziale obsługi klienta hurtowni papierniczej w Toruniu. Odbierzesz telefon, zapiszesz notatkę, odpowiesz na maila i na negatywną opinię w internecie.',
    teacher:
      'Lekcja ćwiczy komunikację na odległość, gdzie nie widać twarzy klienta. Najważniejsze nawyki: przedstawić się, zapisać ustalenia, powtórzyć je klientowi, nie obiecywać w ciemno. W internecie — odpowiadać rzeczowo i nie ujawniać danych klienta.',
    grouping: 'Etapy 1 i 5 samodzielnie, etapy 2–4 w parach: jedna osoba dzwoni, druga odbiera.',
    methods: [methods.przypadek, methods.feedback],
  },
  objectives: [
    'Odbieram telefon służbowy i prowadzę rozmowę do konkretnych ustaleń.',
    'Zapisuję notatkę z rozmowy, z której skorzysta ktoś inny.',
    'Odpowiadam na opinię w internecie rzeczowo i bez ujawniania danych.',
  ],
  materials: ['Urządzenie z przeglądarką', 'Telefon (do odegrania rozmowy w parach, bez dzwonienia)'],
  teacherGuide: {
    preparation: 'Przygotuj dla par kartki z rolami: klient dzwoni z pytaniem, na które odbierający nie zna odpowiedzi. W etapie 4 możesz pokazać prawdziwe (zanonimizowane) odpowiedzi firm na opinie.',
    summary:
      'Telefon odbiera się z nazwą firmy i imieniem. W rozmowie zapisuje się: kto, w jakiej sprawie, co ustalono, do kiedy i numer kontaktowy. Jeśli nie znasz odpowiedzi, mówisz, do kiedy oddzwonisz — i dotrzymujesz tego. Na opinię w internecie odpowiada się spokojnie, odnosi do faktów, nie ujawnia danych klienta i zaprasza do kontaktu.',
  },
  sections: [
    {
      id: 'start',
      label: 'Start',
      title: 'Dzwoni telefon',
      grouping: 'solo',
      intro: 'Telefon w hurtowni dzwoni o 9:40. Odbierasz.',
      ...note(
        5,
        'Każdy wybiera sam. Poproś jedną osobę, żeby powiedziała wybrane zdanie na głos z uśmiechem, a drugą — bez. Czy słychać różnicę?',
        'Po co mówić nazwę firmy i swoje imię?',
        'Klient wie, że dodzwonił się tam, gdzie chciał, i z kim rozmawia. Łatwiej mu potem wrócić do sprawy.',
        'Odbieranie „Halo?” albo „Słucham” jak w prywatnym telefonie.',
        'Ułóż zdanie, którym odbierzesz telefon w szkole praktyk.',
      ),
      activities: [
        choice(
          'q-odbior',
          'Jak odbierasz?',
          [
            'Hurtownia Papiernicza, mówi Ola. W czym mogę pomóc?',
            'Halo? Słucham, kto mówi i w jakiej sprawie dzwoni?',
            'Hurtownia, proszę chwilę poczekać, zaraz kogoś poproszę.',
            'Tak? Dzień dobry, czego Pan albo Pani potrzebuje od nas?',
          ],
          0,
          'Nazwa firmy, imię i pytanie o sprawę. Krótko i jasno.',
          [
            null,
            'To powitanie z prywatnego telefonu. Klient nie wie, czy dodzwonił się do firmy.',
            'Klient czeka, zanim w ogóle powiedział, w jakiej sprawie dzwoni.',
            '„Czego Pan potrzebuje” brzmi szorstko, a brakuje nazwy firmy i imienia.',
          ],
        ),
      ],
    },
    {
      id: 'rozmowa',
      label: 'Rozmowa',
      title: 'Nie znasz odpowiedzi',
      grouping: 'pair',
      intro: 'Dzwoni sekretariat szkoły. Pyta o termin dostawy, którego nie znasz — trzeba sprawdzić w magazynie.',
      reading: {
        title: 'Rozmowa telefoniczna krok po kroku',
        paragraphs: [
          'Przedstaw się, wysłuchaj i zapisuj na bieżąco: kto dzwoni, w jakiej sprawie, czego oczekuje, do kiedy, numer telefonu. Jeśli nie znasz odpowiedzi, nie zgaduj — powiedz, kiedy oddzwonisz. Na koniec powtórz ustalenia i upewnij się, że numer jest poprawny.',
        ],
      },
      ...note(
        12,
        'Najpierw rozmowa na platformie, potem pary odgrywają ją z telefonem w ręku, siedząc tyłem do siebie (nie widzą się — jak w prawdziwej rozmowie).',
        'Co się stanie, jeśli obiecasz dostawę na poniedziałek, nie sprawdziwszy magazynu?',
        'Jeśli towaru nie ma, szkoła zostaje bez zeszytów, a firma traci wiarygodność.',
        'Obiecywanie terminu „na oko”. Zapominanie numeru telefonu do oddzwonienia.',
        'Zagrajcie wersję, w której klient jest zdenerwowany, bo dzwoni trzeci raz.',
      ),
      activities: [
        transcript,
        {
          type: 'dialog',
          id: 'q-telefon',
          title: 'Rozmowa z sekretariatem szkoły',
          start: 'n1',
          nodes: {
            n1: {
              speaker: 'Pani Iwona',
              text: 'Czy zdążycie z dostawą 200 zeszytów na poniedziałek?',
              choices: [
                { text: 'Muszę sprawdzić stan w magazynie. Oddzwonię do Pani dziś do 12:00, dobrze?', next: 'n2', good: true, feedback: 'Nie zgadujesz, podajesz konkretny termin oddzwonienia — przed 14:00.' },
                { text: 'Na pewno zdążymy, zawsze mamy zeszyty.', next: 'n2', good: false, feedback: 'Obietnica bez sprawdzenia. Jeśli magazyn jest pusty, szkoła zostanie bez zeszytów.' },
                { text: 'Nie wiem, proszę zadzwonić jutro.', next: 'n2', good: false, feedback: 'Przerzucasz pracę na klientkę, a ona prosiła o odpowiedź do 14:00.' },
              ],
            },
            n2: {
              speaker: 'Pani Iwona',
              text: 'Dobrze. Zapisze Pan lub Pani numer?',
              choices: [
                { text: 'Tak, zapisuję: 56 622 14 08. Powtórzę: pięćdziesiąt sześć, sześćset dwadzieścia dwa, czternaście, zero osiem. Zgadza się?', next: 'n3', good: true, feedback: 'Powtórzenie numeru chroni przed pomyłką w jednej cyfrze.' },
                { text: 'Tak, numer się wyświetla, nie trzeba.', next: 'n3', good: false, feedback: 'Numer na wyświetlaczu bywa numerem centrali albo jest ukryty. Zapisz i powtórz.' },
              ],
            },
            n3: {
              speaker: 'Pani Iwona',
              text: 'Zgadza się. To czekam na telefon.',
              choices: [
                { text: 'Podsumuję: 200 zeszytów A5 w kratkę, 32 kartki, dostawa na poniedziałek, oddzwonię do 12:00. Dziękuję, do usłyszenia.', next: 'end', good: true, feedback: 'Podsumowanie ustaleń zamyka rozmowę bez nieporozumień.' },
                { text: 'Dobrze, pa.', next: 'end', good: false, feedback: 'Zbyt potocznie i bez podsumowania ustaleń.' },
              ],
            },
            end: { end: true, text: 'Sprawdzasz magazyn i oddzwaniasz o 11:30: zeszyty są, dostawa w poniedziałek rano. Klientka dostała odpowiedź przed terminem.' },
          },
        },
      ],
    },
    {
      id: 'notatka',
      label: 'Notatka',
      title: 'Notatka dla magazynu',
      grouping: 'pair',
      intro: 'Kierowniczka prosi o notatkę z rozmowy, żeby magazyn mógł przygotować zamówienie, nawet jeśli Ciebie nie będzie.',
      ...note(
        10,
        'Pary wypełniają notatkę. Zapytaj: czy osoba, która nie słyszała rozmowy, wie z tej notatki, co ma zrobić?',
        'Czego najczęściej brakuje w notatkach z telefonu?',
        'Numeru telefonu, terminu oddzwonienia i szczegółów towaru (format, liczba kartek).',
        'Zapisywanie samego „dzwoniła szkoła, oddzwonić”.',
        'Napisz notatkę z rozmowy, w której klient zgłasza reklamację.',
      ),
      activities: [
        transcript,
        {
          type: 'docForm',
          id: 'doc-notatka',
          title: 'Notatka z rozmowy telefonicznej',
          points: 4,
          doc: {
            title: 'Notatka z rozmowy — wtorek, 9:40',
            meta: [
              ['Kto dzwonił', { f: 'kto' }],
              ['Sprawa', { f: 'sprawa' }],
              ['Termin oddzwonienia', { f: 'termin' }],
              ['Telefon', { f: 'telefon' }],
            ],
            footer: 'Przyjął(a): obsługa klienta.',
          },
          fields: {
            kto: { label: 'Kto dzwonił', kind: 'select', options: ['Iwona Mazur, sekretariat SP 12', 'Dyrektor SP 12', 'Nie podano'], answer: 'Iwona Mazur, sekretariat SP 12', hint: 'Klientka przedstawiła się na początku.' },
            sprawa: { label: 'Sprawa', kind: 'select', options: ['Zamówienie 200 zeszytów A5, 32 kartki, kratka, na poniedziałek', 'Zamówienie zeszytów', 'Reklamacja zeszytów'], answer: 'Zamówienie 200 zeszytów A5, 32 kartki, kratka, na poniedziałek', hint: 'Magazyn musi wiedzieć dokładnie, jaki towar przygotować.' },
            termin: { label: 'Termin oddzwonienia', kind: 'select', options: ['Dziś do 14:00', 'Jutro rano', 'Nie ustalono'], answer: 'Dziś do 14:00', hint: 'Klientka podała godzinę, do której pracuje.' },
            telefon: { label: 'Telefon', kind: 'text', answer: '56 622 14 08', accept: ['566221408', '56-622-14-08'], hint: 'Przepisz numer z zapisu rozmowy.' },
          },
          explanation: 'Dobra notatka pozwala komuś innemu załatwić sprawę bez dzwonienia do Ciebie: kto, co dokładnie, do kiedy, numer.',
        },
      ],
    },
    {
      id: 'online',
      label: 'Opinie',
      title: 'Jedna gwiazdka',
      grouping: 'pair',
      intro: 'W wizytówce hurtowni w mapach internetowych pojawiła się opinia: „★ Zamówiłem papier do drukarki, przyszedł po 5 dniach zamiast 2. Nikt nie odbierał telefonu. Nie polecam.” — Tomasz K.',
      reading: {
        title: 'Odpowiedź na negatywną opinię',
        paragraphs: [
          'Odpowiedź czytają przyszli klienci, nie tylko autor. Podziękuj za opinię, odnieś się do faktów, przeproś za to, co rzeczywiście poszło źle, zaproponuj kontakt. Nie podawaj danych klienta (nazwiska, adresu, numeru zamówienia), nie kłóć się i nie obwiniaj innych.',
        ],
      },
      ...note(
        10,
        'Pary sprawdzają odpowiedź kolegi. Zapytaj, które zdanie najbardziej zaszkodziłoby firmie w oczach innych klientów.',
        'Kto naprawdę czyta odpowiedzi na opinie?',
        'Przyszli klienci. Oceniają, jak firma reaguje, gdy coś pójdzie źle.',
        'Ujawnianie szczegółów zamówienia, kłótnia z klientem, obwinianie kuriera.',
        'Napisz odpowiedź na pozytywną opinię — krótką, bez szablonu.',
      ),
      activities: [
        {
          type: 'spotErrors',
          id: 'q-odpowiedz',
          title: 'Projekt odpowiedzi przygotowany przez kolegę',
          context: 'Zaznacz zdania, które trzeba usunąć albo zmienić.',
          lines: [
            { text: 'Dziękujemy za opinię.' },
            { text: 'Panie Tomaszu Kowalski, Pana zamówienie nr 4512 na ul. Lipową 7 wysłaliśmy zgodnie z procedurą.', error: 'Ujawnia nazwisko, numer zamówienia i adres klienta. Takich danych nie publikuje się w odpowiedzi.' },
            { text: 'Przepraszamy za opóźnienie — dostawa miała dotrzeć w 2 dni.' },
            { text: 'To wina firmy kurierskiej, nie nasza.', error: 'Dla klienta to Wasza dostawa. Obwinianie innych brzmi jak wymówka.' },
            { text: 'Telefony odbieramy w dni robocze 8–16; we wtorek mieliśmy awarię centrali, już usuniętą.' },
            { text: 'Może trzeba było zamówić wcześniej.', error: 'Pouczanie klienta w publicznej odpowiedzi szkodzi firmie.' },
            { text: 'Zapraszamy do kontaktu: obsluga@hurtownia-torun.pl — chętnie wyjaśnimy sprawę.' },
          ],
          explanation: 'Trzy zdania do usunięcia: dane klienta, obwinianie kuriera, pouczanie. Reszta to rzeczowa i uprzejma odpowiedź.',
        },
        choice(
          'q-kiedy',
          'Kiedy najlepiej odpowiedzieć na negatywną opinię?',
          [
            'W ciągu 1–2 dni, po sprawdzeniu faktów',
            'Od razu, w ciągu kilku minut, zanim ktoś ją przeczyta',
            'Wcale, bo każda odpowiedź tylko przyciąga uwagę do opinii',
            'Po miesiącu, gdy klient już ochłonie i zapomni o sprawie',
          ],
          0,
          'Szybko, ale nie w emocjach i nie bez sprawdzenia, co się stało.',
          [
            null,
            'Odpowiedź w pośpiechu bywa emocjonalna i bez faktów.',
            'Brak odpowiedzi wygląda tak, jakby firmie nie zależało na klientach.',
            'Po miesiącu odpowiedź nikomu już nie pomoże.',
          ],
        ),
      ],
    },
    {
      id: 'sprawdzenie',
      label: 'Sprawdzenie',
      title: 'Mail bez numeru zamówienia',
      grouping: 'solo',
      intro: 'Przychodzi e-mail: „Gdzie jest moje zamówienie???”. Bez podpisu, bez numeru zamówienia.',
      ...note(
        8,
        'Samodzielnie. Porównaj kilka odpowiedzi na opinię z kryteriami na platformie.',
        'Jak poprosić o brakujące dane, żeby klient nie poczuł się zbyty?',
        'Krótko, uprzejmie, z konkretną listą: numer zamówienia albo nazwa firmy i data zamówienia.',
        'Odpowiadanie „nie wiemy, o które zamówienie chodzi” bez prośby o dane.',
        'Ułóż szablon odpowiedzi na takie maile do wykorzystania w hurtowni.',
      ),
      activities: [
        choice(
          'q-mail',
          'Co odpisujesz?',
          [
            'Proszę o numer zamówienia lub nazwę firmy i datę — sprawdzę od razu.',
            'Nie wiemy, o które zamówienie chodzi, więc nie możemy niczego sprawdzić.',
            'Wszystkie zamówienia wysyłamy w terminie, proszę jeszcze trochę poczekać.',
            'Nie odpowiadam, bo wiadomość nie ma podpisu i może być spamem.',
          ],
          0,
          'Prosisz o konkretne dane i obiecujesz szybkie działanie.',
          [
            null,
            'Zamykasz rozmowę, zamiast poprosić o dane.',
            'Uspokajasz bez sprawdzenia — nie wiesz, czy zamówienie jest w terminie.',
            'Mail od zdenerwowanego klienta to nie spam. Brak odpowiedzi zwiększy złość.',
          ],
        ),
        text(
          'q-moja-odpowiedz',
          'Napisz odpowiedź na opinię Tomasza K. (3–4 zdania).',
          'Dziękujemy za opinię i przepraszamy za opóźnienie — dostawa powinna dotrzeć w 2 dni. We wtorek mieliśmy awarię centrali telefonicznej, już usuniętą. Prosimy o kontakt na obsluga@hurtownia-torun.pl, sprawdzimy, co się stało z przesyłką, i zaproponujemy rekompensatę.',
          { minLength: 60, criteria: ['Jest podziękowanie i przeprosiny za fakty.', 'Brak danych klienta.', 'Jest zaproszenie do kontaktu.', 'Brak obwiniania innych.'] },
        ),
        {
          type: 'resultCard',
          id: 'karta',
          badges: [
            { min: 0, name: 'Do powtórki', text: 'Wróć do rozmowy telefonicznej i notatki.' },
            { min: 0.6, name: 'Dobry kontakt', text: 'Powtórz zasady odpowiadania na opinie.' },
            { min: 0.85, name: 'Obsługa na odległość', text: 'Telefon, notatka i odpowiedź w internecie bez wpadek.' },
          ],
        },
      ],
    },
  ],
  exitTicket: 'Telefon: nazwa firmy, imię, notatka, powtórzenie ustaleń, termin oddzwonienia. Opinia w internecie: podziękuj, fakty, przeprosiny za to, co poszło źle, kontakt — bez danych klienta i bez kłótni.',
};
