import { choice, methods, note, text } from '../schema.js';

export default {
  id: '11',
  order: 11,
  part: 'A',
  title: 'Zastrzeżenia i trudny klient',
  subtitle: 'Odkurzacz z gazetki skończył się o dziesiątej, a klientka przyjechała po niego z drugiego końca miasta.',
  duration: 45,
  sessions: [45],
  han: ['HAN.01.4', 'HAN.01.6'],
  tags: ['obsługa klienta', 'zastrzeżenia', 'konflikt', 'emocje'],
  realia: [],
  audience: {
    adults:
      'Dorośli mają za sobą wiele takich rozmów — po obu stronach lady. Poproś o jedną sytuację z ich doświadczenia i przejdźcie ją pięcioma krokami. Osobom prowadzącym firmę usługową warto pokazać, że te same kroki działają przez telefon i w komentarzach w internecie.',
  },
  format: {
    name: 'Pięć kroków rozmowy i symulacja',
    student:
      'Pracujesz w sklepie RTV-AGD w Gliwicach. Poznasz pięć kroków rozmowy z niezadowolonym klientem, rozpoznasz typowe zastrzeżenia i przeprowadzisz trudną rozmowę o towarze z gazetki.',
    teacher:
      'Lekcja oddziela emocje klienta od jego problemu. Uczniowie ćwiczą kolejność: wysłuchać, pokazać zrozumienie, dopytać, zaproponować, sprawdzić. Ważne jest też bezpieczeństwo: z agresywnym klientem nie zostaje się samemu.',
    grouping: 'Rozmowę z klientem warto odegrać na żywo.',
    methods: [methods.dialogowe, methods.przypadek, methods.feedback],
  },
  objectives: [
    'Prowadzę rozmowę z niezadowolonym klientem w pięciu krokach.',
    'Rozpoznaję rodzaj zastrzeżenia: cena, jakość, zaufanie, zwłoka.',
    'Proponuję rozwiązanie, które mogę naprawdę zrealizować.',
    'Wiem, kiedy wezwać kierownika albo ochronę.',
  ],
  materials: [],
  teacherGuide: {
    preparation: 'Przygotuj na tablicy pięć kroków: wysłuchaj, pokaż zrozumienie, dopytaj, zaproponuj, sprawdź. Przy rozmowie o odkurzaczu wybierz parę, która odegra ją przed klasą.',
    summary:
      'Zdenerwowany klient zwykle ma prawdziwy problem. Najpierw pozwalasz mu go opowiedzieć, nie przerywasz i nie bierzesz złości do siebie. Potem dopytujesz i proponujesz rozwiązanie w granicach swoich uprawnień. Obietnice bez pokrycia pogarszają sytuację. Gdy klient grozi albo jest agresywny — wzywasz kierownika lub ochronę i nie zostajesz sam(a).',
  },
  sections: [
    {
      id: 'kroki',
      label: 'Gazetka',
      title: 'Pierwsze sekundy i kolejność rozmowy',
      grouping: 'pair',
      intro: 'Klientka podchodzi szybkim krokiem, z gazetką w ręku: „Gdzie jest ten odkurzacz? Jechałam pół godziny!”. Rozmowa z niezadowolonym klientem ma stałą kolejność — pominięcie kroku zwykle wraca jako kolejna pretensja.',
      reading: {
        title: 'Pięć kroków',
        paragraphs: [
          'Wysłuchaj bez przerywania. Pokaż zrozumienie: „Rozumiem, że to strata czasu”. Dopytaj o szczegóły: czego klient potrzebuje, na kiedy. Zaproponuj to, co naprawdę możesz zrobić. Sprawdź, czy propozycja odpowiada klientowi.',
          'Zrozumienie to nie przyznanie się do winy. Możesz rozumieć złość klientki, a jednocześnie wiedzieć, że promocja była do wyczerpania zapasów.',
        ],
      },
      ...note(
        15,
        'Na początek każdy sam wybiera pierwszą reakcję na klientkę z gazetką. Pary układają kroki. Potem każda para wymyśla jedno zdanie do każdego kroku dla sytuacji z odkurzaczem.',
        'Czym różni się „Rozumiem, że jest Pani zła” od „Przepraszam, to nasza wina”?',
        'Pierwsze pokazuje, że słyszysz emocje. Drugie przyznaje winę, której może nie być.',
        'Przeskakiwanie od razu do propozycji, zanim klient poczuje się wysłuchany.',
        'Ułóż zdania do pięciu kroków dla klienta, któremu zepsuł się telefon po tygodniu.',
      ),
      activities: [
        choice(
          'q-pierwsza-reakcja',
          'Co robisz najpierw?',
          [
            'Słucham do końca, nie przerywam',
            'Od razu wyjaśniam, że promocja była do wyczerpania zapasów',
            'Proszę, żeby klientka się uspokoiła, bo inaczej nie porozmawiamy',
            'Wołam kierownika, żeby to on się tym zajął od początku',
          ],
          0,
          'Klientka chce, żeby ktoś usłyszał jej problem. Gdy skończy mówić, łatwiej o rzeczową rozmowę.',
          [
            null,
            'To prawda, ale powiedziana na start brzmi jak zbycie. Najpierw wysłuchaj.',
            'Prośba „proszę się uspokoić” zwykle jeszcze bardziej denerwuje.',
            'Kierownik jest potrzebny przy agresji albo decyzji ponad Twoje uprawnienia. Tu możesz zacząć sam(a).',
          ],
        ),
        {
          type: 'sequence',
          id: 'q-kroki',
          question: 'Ułóż kroki rozmowy w kolejności.',
          items: ['Wysłuchaj bez przerywania', 'Pokaż zrozumienie', 'Dopytaj o szczegóły', 'Zaproponuj rozwiązanie', 'Sprawdź, czy klientowi odpowiada'],
          explanation: 'Emocje najpierw, potem fakty, na końcu rozwiązanie i sprawdzenie.',
        },
        choice(
          'q-zrozumienie',
          'Które zdanie pokazuje zrozumienie, ale nie przyznaje winy?',
          [
            'Rozumiem, szkoda tej podróży',
            'Przepraszam, to my źle zaplanowaliśmy dostawę do sklepu',
            'Nie ma się czym denerwować, to tylko odkurzacz w promocji',
            'Każdy klient dziś o to pyta, nie jest Pani jedyna',
          ],
          0,
          'Nazywasz emocję i jej przyczynę, bez obietnic i bez winy.',
          [
            null,
            'To przyznanie winy, której możesz nie znać.',
            'Bagatelizowanie złości zwykle ją wzmacnia.',
            'To brzmi jak lekceważenie: klientka czuje się jedną z wielu.',
          ],
        ),
      ],
    },
    {
      id: 'zastrzezenia',
      label: 'Zastrzeżenia',
      title: 'Co naprawdę mówi klient',
      grouping: 'pair',
      intro: 'Zastrzeżenie to nie odmowa. To informacja, czego klient się obawia.',
      ...note(
        10,
        'Pary dopasowują. Przy cenie zapytaj, czy obniżka jest jedyną odpowiedzią na „widziałem taniej”.',
        'Co odpowiesz na „w internecie widziałem taniej”?',
        'Zapytam, gdzie i za ile, porównam warunki (gwarancja, dostawa, odbiór dziś, zwrot), a jeśli sklep ma politykę dopasowania ceny — powiem o niej.',
        'Natychmiastowe proponowanie rabatu albo krytykowanie konkurencji.',
        'Przygotuj odpowiedź na „muszę się zastanowić”, która nie naciska.',
      ),
      activities: [
        {
          type: 'matching',
          id: 'q-typy',
          question: 'Jaki to rodzaj zastrzeżenia?',
          options: ['Cena', 'Jakość', 'Zaufanie', 'Zwłoka'],
          rows: [
            { label: 'W internecie widziałem ten model taniej.', correct: 0 },
            { label: 'Poprzedni odkurzacz tej marki zepsuł się po roku.', correct: 1 },
            { label: 'Skąd mam wiedzieć, że to nie jest towar powystawowy?', correct: 2 },
            { label: 'Muszę to jeszcze przemyśleć.', correct: 3 },
            { label: 'Za taką cenę spodziewałem się czegoś lepszego.', correct: 0, explanation: 'Klient porównuje cenę z wartością — pokaż, za co płaci.' },
          ],
          explanation: 'Każdy rodzaj wymaga innej odpowiedzi: porównania warunków, faktów o jakości, dowodu albo czasu na decyzję.',
        },
        choice(
          'q-cena',
          'Klient mówi: „W internecie ten odkurzacz jest o 80 zł tańszy”. Co odpowiadasz?',
          [
            'Pytam o sklep i warunki, porównuję z naszymi',
            'Od razu daję 80 zł rabatu, żeby klient nie wyszedł',
            'Mówię, że sklepy internetowe sprzedają podróbki',
          ],
          0,
          'Porównujesz całe warunki: koszt dostawy, termin, odbiór od ręki, pomoc przy reklamacji. Czasem różnica znika, czasem nie — wtedy uczciwie o tym mówisz.',
          [
            null,
            'Rabatu nie dajesz bez uprawnień. To też uczy klientów, że wystarczy narzekać.',
            'Oczernianie konkurencji bez dowodów jest nieuczciwe i podważa Twoją wiarygodność.',
          ],
        ),
      ],
    },
    {
      id: 'rozmowa',
      label: 'Rozmowa',
      title: 'Odkurzacz z gazetki',
      grouping: 'pair',
      intro: 'Odkurzacz z gazetki (499 zł, promocja „do wyczerpania zapasów”) skończył się o 10:00. Sklep może zamówić go do innego sklepu sieci w Katowicach (odbiór za 2 dni w promocyjnej cenie) albo sprzedać podobny model za 549 zł. Nie możesz dać rabatu.',
      ...note(
        15,
        'Po rozmowie każdy zapisuje trzy własne zdania dla klientki z odkurzaczem. Najpierw rozmowa na platformie, potem jedna para odgrywa ją przed klasą. Klasa ocenia, czy pojawiło się pięć kroków.',
        'Który moment rozmowy był najtrudniejszy i dlaczego?',
        'Zwykle moment, gdy klientka żąda rabatu — trzeba odmówić i jednocześnie zaproponować coś realnego.',
        'Obiecywanie rzeczy, które nie zależą od sprzedawcy („na pewno jutro przyjdzie dostawa”).',
        'Zagrajcie tę samą rozmowę, ale z klientem, który zaczyna grozić skargą w internecie.',
      ),
      activities: [
        {
          type: 'dialog',
          id: 'q-odkurzacz',
          title: 'Klientka z gazetką',
          start: 'n1',
          nodes: {
            n1: {
              speaker: 'Klientka',
              text: 'Jechałam pół godziny, a odkurzacza z gazetki nie ma! To oszustwo!',
              choices: [
                { text: 'Rozumiem, szkoda podróży. Promocyjne odkurzacze skończyły się rano. Sprawdzę, co mogę zrobić — na kiedy potrzebuje go Pani?', next: 'n2', good: true, feedback: 'Zrozumienie, krótki fakt i pytanie o potrzebę.' },
                { text: 'To nie oszustwo, w gazetce jest napisane „do wyczerpania zapasów”.', next: 'n2', good: false, feedback: 'Masz rację co do faktów, ale zaczynasz od obrony. Klientka słyszy, że jej problem Cię nie obchodzi.' },
                { text: 'Proszę nie krzyczeć, bo nie będę rozmawiać.', next: 'n2', good: false, feedback: 'Stawiasz warunek zamiast słuchać. Rozmowa się zaostrzy.' },
              ],
            },
            n2: {
              speaker: 'Klientka',
              text: 'Mój stary odkurzacz się spalił, a w sobotę mam gości.',
              choices: [
                { text: 'Mogę zamówić ten model do sklepu w Katowicach w cenie z gazetki, odbiór za dwa dni. Albo od ręki podobny model za 549 zł. Który wariant będzie lepszy przed sobotą?', next: 'n3', good: true, feedback: 'Dwie realne opcje i decyzja po stronie klientki.' },
                { text: 'Na pewno jutro przyjdzie dostawa, proszę wpaść.', next: 'n3', good: false, feedback: 'Nie wiesz tego. Jeśli dostawy nie będzie, klientka przyjedzie drugi raz na próżno.' },
              ],
            },
            n3: {
              speaker: 'Klientka',
              text: 'To niech mi Pan da ten droższy w cenie z gazetki. Należy mi się!',
              choices: [
                { text: 'Nie mogę zmienić ceny, nie mam takich uprawnień. Mogę zamówić promocyjny model albo zapytać kierowniczkę, czy jest inna możliwość.', next: 'n4', good: true, feedback: 'Odmawiasz jasno, ale dajesz drogę dalej.' },
                { text: 'Dobrze, dam Pani rabat 50 zł, tylko proszę nikomu nie mówić.', next: 'n4', good: false, feedback: 'Rabat bez uprawnień to naruszenie zasad sklepu, a „nikomu nie mówić” brzmi nieuczciwie.' },
                { text: 'Nic się Pani nie należy, takie są zasady.', next: 'n4', good: false, feedback: 'Odmowa bez propozycji kończy rozmowę skargą.' },
              ],
            },
            n4: {
              speaker: 'Klientka',
              text: 'Dobrze… niech będzie zamówienie do Katowic. Ale jak nie przyjdzie, to wracam tutaj!',
              choices: [
                { text: 'Zapisuję zamówienie i Pani numer. Dostanie Pani SMS, gdy odkurzacz będzie gotowy. Czy taki termin pasuje przed sobotą?', next: 'end', good: true, feedback: 'Konkret, potwierdzenie i sprawdzenie, czy rozwiązanie odpowiada.' },
                { text: 'Dobrze, do widzenia.', next: 'end', good: false, feedback: 'Brakuje potwierdzenia ustaleń i sprawdzenia, czy klientce to pasuje.' },
              ],
            },
            end: { end: true, text: 'Klientka wychodzi z zamówieniem i terminem odbioru. Nie dostała tego, czego chciała na początku, ale dostała realne rozwiązanie.' },
          },
        },
        text(
          'q-zdania',
          'Napisz trzy zdania dla klientki z odkurzaczem: zrozumienie, propozycja, sprawdzenie.',
          'Rozumiem, że to zła wiadomość, zwłaszcza przed sobotą. Mogę zamówić ten odkurzacz w cenie z gazetki do odbioru w Katowicach za dwa dni albo pokazać podobny model dostępny od ręki. Który wariant będzie dla Pani lepszy?',
          { criteria: ['Jest zrozumienie bez przyznania winy.', 'Propozycja jest realna.', 'Na końcu jest pytanie sprawdzające.'] },
        ),
      ],
    },
    {
      id: 'sprawdzenie',
      label: 'Agresja',
      title: 'Granica',
      grouping: 'solo',
      intro: 'Klient przy kasie zaczyna wyzywać kasjerkę i uderza pięścią w ladę.',
      ...note(
        5,
        'Samodzielnie. Na koniec przypomnij, gdzie w waszej szkole lub zakładzie praktyk jest przycisk alarmowy albo numer do ochrony.',
        'Kiedy rozmowa przestaje być obsługą klienta, a staje się sprawą bezpieczeństwa?',
        'Gdy pojawiają się wyzwiska, groźby, przemoc albo uszkadzanie mienia.',
        'Przekonanie, że sprzedawca musi „wytrzymać wszystko”.',
        'Sprawdź, jakie są procedury bezpieczeństwa w sklepie, w którym masz praktyki.',
      ),
      activities: [
        choice(
          'q-agresja',
          'Co robisz?',
          [
            'Wzywam kierownika lub ochronę i nie zostaję z nim sam na sam',
            'Odpowiadam tym samym tonem, żeby klient wiedział, że się nie boję',
            'Obsługuję go dalej najszybciej, jak umiem, żeby jak najszybciej wyszedł',
            'Wychodzę z kasy bez słowa i zostawiam otwartą szufladę z pieniędzmi',
          ],
          0,
          'Wyzwiska i agresja to sprawa bezpieczeństwa. Wzywasz pomoc, zachowujesz dystans, a w razie zagrożenia dzwonisz pod 112.',
          [
            null,
            'Odpowiedź tym samym tonem eskaluje konflikt i może skończyć się przemocą.',
            'Obsługa agresywnego klienta w pojedynkę naraża Ciebie i innych. Najpierw pomoc.',
            'Odejście bez słowa i zostawienie gotówki tworzy nowe zagrożenie.',
          ],
        ),
        {
          type: 'resultCard',
          id: 'karta',
          badges: [
            { min: 0, name: 'Do powtórki', text: 'Wróć do pięciu kroków i przejdź rozmowę jeszcze raz.' },
            { min: 0.6, name: 'Spokój przy ladzie', text: 'Powtórz rodzaje zastrzeżeń i odpowiedź na cenę.' },
            { min: 0.85, name: 'Trudne rozmowy', text: 'Prowadzisz rozmowę w pięciu krokach i znasz swoje granice.' },
          ],
        },
      ],
    },
  ],
  exitTicket: 'Wysłuchaj, pokaż zrozumienie, dopytaj, zaproponuj, sprawdź. Zrozumienie to nie przyznanie się do winy. Obiecuj tylko to, co możesz zrobić. Agresja = kierownik lub ochrona.',
};
