import { choice, methods, note, number, text } from '../schema.js';

const facts = {
  type: 'info',
  tone: 'case',
  title: 'Sklep z oświetleniem w Łodzi',
  list: [
    'Lampa biurkowa L1: 79 zł brutto za sztukę, w magazynie 30 sztuk.',
    'Odbiór osobisty w sklepie, poniedziałek–piątek 10–18. Sklep nie wysyła lamp.',
    'Producent nie deklaruje wodoodporności.',
    'Zapytanie: biuro rachunkowe z Łodzi prosi o ofertę na 10 lamp do nowego biura.',
  ],
};

export default {
  id: '20',
  order: 20,
  part: 'B',
  title: 'Oferta handlowa: popraw szkic i sprawdź AI',
  subtitle: 'Narzędzie AI napisało ofertę w kilka sekund. Lampa „wodoodporna”, „dostawa gratis” i prośba o prywatne numery pracowników. Co z tym zrobić?',
  duration: 45,
  sessions: [45],
  han: ['HAN.02.7'],
  tags: ['oferta', 'dokumenty handlowe', 'AI', 'dane osobowe'],
  realia: [],
  audience: {
    adults:
      'Wielu dorosłych już używa narzędzi AI do pisania maili i ofert. Ta lekcja pokazuje, jak sprawdzić wynik i czego nie wklejać do narzędzia. Poproś, żeby na koniec napisali polecenie dla AI do własnej oferty — z ograniczeniem do podanych danych.',
  },
  format: {
    name: 'Korekta dokumentu i praca z narzędziem AI',
    student:
      'Pracujesz w sklepie z oświetleniem w Łodzi. Poprawisz ofertę wygenerowaną przez AI, uzupełnisz dokument i napiszesz polecenie, które nie pozwoli narzędziu wymyślać faktów.',
    teacher:
      'Lekcja nie wymaga konta w żadnym narzędziu AI — szkic jest gotowy na platformie. Uczniowie uczą się sprawdzać fakty, ceny i dane osobowe w tekście, który brzmi przekonująco. Druga część: obieg dokumentów handlowych (zapytanie, oferta, zamówienie, potwierdzenie, faktura).',
    grouping: 'Etapy 1 i 5 samodzielnie, etapy 2–4 w parach.',
    methods: [methods.przypadek, methods.feedback],
  },
  objectives: [
    'Rozróżniam zapytanie ofertowe, ofertę, zamówienie, potwierdzenie i fakturę.',
    'Sprawdzam szkic oferty: fakty, ceny, warunki, dane osobowe.',
    'Przygotowuję poprawną ofertę na podstawie potwierdzonych danych.',
    'Piszę polecenie dla AI, które ogranicza wymyślanie faktów.',
  ],
  materials: ['Urządzenie z przeglądarką', 'Narzędzie AI nie jest potrzebne'],
  teacherGuide: {
    preparation: 'Jeśli szkoła ma dostęp do narzędzia AI, możesz w etapie 4 pokazać na projektorze, jak działa polecenie z ograniczeniami. Nie wklejaj do niego żadnych prawdziwych danych.',
    summary:
      'Zapytanie ofertowe wysyła klient, ofertę sprzedawca, zamówienie klient, potwierdzenie zamówienia i fakturę sprzedawca. Szkic z AI może brzmieć pewnie i zawierać nieprawdę: zmyślone cechy, ceny i warunki. Każdy fakt sprawdza się w danych firmy. Do narzędzia AI nie wkleja się danych osobowych ani poufnych.',
  },
  sections: [
    {
      id: 'start',
      label: 'Start',
      title: 'Kto wysyła który dokument?',
      grouping: 'solo',
      intro: 'Biuro rachunkowe pisze maila z prośbą o ofertę na lampy. To początek obiegu dokumentów.',
      ...note(
        5,
        'Każdy dopasowuje sam. Narysuj na tablicy strzałki klient ↔ sprzedawca z pięcioma dokumentami.',
        'W którym momencie dochodzi do umowy sprzedaży?',
        'Gdy sprzedawca przyjmie zamówienie (potwierdzenie) albo klient przyjmie ofertę w terminie jej ważności.',
        'Mylenie zapytania ofertowego z ofertą.',
        'Wymień dokument, który pojawia się, gdy towar wyjeżdża z magazynu (WZ).',
      ),
      activities: [
        {
          type: 'matching',
          id: 'q-obieg',
          question: 'Kto wysyła dokument?',
          options: ['Klient', 'Sprzedawca'],
          rows: [
            { label: 'Zapytanie ofertowe', correct: 0 },
            { label: 'Oferta', correct: 1 },
            { label: 'Zamówienie', correct: 0 },
            { label: 'Potwierdzenie zamówienia', correct: 1 },
            { label: 'Faktura', correct: 1 },
          ],
          explanation: 'Klient pyta i zamawia. Sprzedawca proponuje warunki, potwierdza i wystawia fakturę.',
        },
      ],
    },
    {
      id: 'szkic',
      label: 'Szkic AI',
      title: 'Co napisało AI',
      grouping: 'pair',
      intro: 'Pracownik wpisał do narzędzia AI: „Napisz ofertę na lampy biurkowe dla biura”. Oto wynik. Porównaj go z danymi sklepu.',
      ...note(
        10,
        'Pary porównują szkic z danymi. Zapytaj, które zdanie brzmiało najbardziej wiarygodnie, choć było nieprawdziwe.',
        'Dlaczego AI dopisało wodoodporność i dostawę gratis?',
        'Bo nie dostało danych sklepu — wygenerowało typowe zdania z ofert. Narzędzie nie wie, co jest prawdą w tej firmie.',
        'Uznawanie tekstu za poprawny, bo jest gramatycznie dobry i brzmi profesjonalnie.',
        'Znajdź w szkicu słowa, które są ogólnikami bez treści.',
      ),
      activities: [
        facts,
        {
          type: 'spotErrors',
          id: 'q-szkic',
          title: 'Szkic oferty wygenerowany przez AI',
          context: 'Zaznacz zdania, których nie wolno wysłać klientowi.',
          lines: [
            { text: 'Szanowni Państwo, dziękujemy za zainteresowanie naszą ofertą.' },
            { text: 'Proponujemy najlepszą wodoodporną lampę na rynku.', error: 'Producent nie deklaruje wodoodporności, a „najlepsza na rynku” to niesprawdzalny ogólnik.' },
            { text: 'Cena: 59 zł za sztukę.', error: 'Cena wynosi 79 zł brutto. AI wymyśliło kwotę.' },
            { text: 'Dostawa gratis jeszcze dziś do każdego miasta w Polsce.', error: 'Sklep nie wysyła lamp — tylko odbiór osobisty.' },
            { text: 'Prosimy o przesłanie listy pracowników z prywatnymi numerami telefonów.', error: 'Do oferty te dane nie są potrzebne. Prośba narusza zasadę minimalizacji danych osobowych.' },
            { text: 'Oferta ważna 14 dni od daty wysłania.' },
          ],
          explanation: 'Cztery zdania do usunięcia lub poprawy. AI pisze płynnie, ale nie zna faktów o sklepie, dopóki ich nie dostanie.',
        },
      ],
    },
    {
      id: 'oferta',
      label: 'Oferta',
      title: 'Poprawna oferta',
      grouping: 'pair',
      intro: 'Uzupełnij ofertę na podstawie danych sklepu.',
      ...note(
        12,
        'Pary uzupełniają dokument. Zapytaj, co jeszcze warto dopisać (termin ważności, kontakt, osoba do odbioru).',
        'Co oferta mówi klientowi o odbiorze?',
        'Że lampy trzeba odebrać w sklepie, w jakich godzinach i że sklep ich nie wysyła.',
        'Pomijanie informacji o braku wysyłki, żeby oferta wyglądała atrakcyjniej.',
        'Dopisz zdanie o możliwości rezerwacji 10 lamp na 3 dni.',
      ),
      activities: [
        facts,
        {
          type: 'docForm',
          id: 'doc-oferta',
          title: 'Oferta nr 7/10/2026',
          points: 4,
          doc: {
            title: 'Oferta: lampy biurkowe L1',
            parties: [
              ['Sprzedawca', 'Sklep z oświetleniem, Łódź'],
              ['Odbiorca', 'Biuro rachunkowe, Łódź'],
            ],
            table: {
              head: ['Towar', 'Ilość', 'Cena brutto/szt.', 'Wartość brutto'],
              rows: [['Lampa biurkowa L1', { f: 'ilosc' }, '79,00 zł', { f: 'wartosc' }]],
            },
            after: [
              ['Dostępność', { f: 'dostepnosc' }],
              ['Odbiór', { f: 'odbior' }],
              ['Ważność oferty', '14 dni'],
            ],
          },
          fields: {
            ilosc: { label: 'Ilość', answer: 10, hint: 'Ile lamp chce biuro?' },
            wartosc: { label: 'Wartość brutto', answer: 790, hint: 'Ilość × 79 zł.' },
            dostepnosc: { label: 'Dostępność', kind: 'select', options: ['W magazynie, od ręki', 'Na zamówienie, 14 dni', 'Brak'], answer: 'W magazynie, od ręki', hint: 'W magazynie jest 30 sztuk.' },
            odbior: { label: 'Odbiór', kind: 'select', options: ['Osobiście w sklepie, pn–pt 10–18', 'Dostawa gratis', 'Kurier za 20 zł'], answer: 'Osobiście w sklepie, pn–pt 10–18', hint: 'Sklep nie wysyła lamp.' },
          },
          explanation: '10 × 79 zł = 790 zł brutto. Lampy są dostępne od ręki, odbiór tylko w sklepie.',
        },
      ],
    },
    {
      id: 'ai',
      label: 'Polecenie',
      title: 'Jak pisać polecenie dla AI',
      grouping: 'pair',
      intro: 'Narzędzie AI może przyspieszyć pisanie, jeśli dostanie dane i ograniczenia. Tekst zawsze sprawdza człowiek.',
      reading: {
        title: 'Dobre polecenie',
        paragraphs: [
          'Podaj zadanie, odbiorcę, dane wejściowe i ograniczenia: „używaj tylko tych danych”, „jeśli czegoś brakuje, zaznacz to w nawiasie”. Nie wklejaj danych osobowych klientów, umów ani informacji poufnych, jeśli nie wiesz, jak narzędzie je przetwarza.',
        ],
      },
      ...note(
        10,
        'Pary wybierają polecenie i zaznaczają dane, których nie wklejają. Jeśli masz narzędzie AI na projektorze, pokaż wynik dobrego polecenia.',
        'Co zrobić, gdy AI i tak dopisze coś, czego nie było w danych?',
        'Usunąć to zdanie. Każdy fakt w ofercie sprawdza człowiek przed wysłaniem.',
        'Wklejanie całej korespondencji z klientem z imionami i telefonami.',
        'Napisz polecenie dla AI do odpowiedzi na reklamację lampy.',
      ),
      activities: [
        choice(
          'q-polecenie',
          'Które polecenie dla AI jest najlepsze?',
          [
            'Napisz ofertę na 10 lamp L1 tylko z tych danych: [dane]. Brakujące zaznacz w nawiasie.',
            'Napisz atrakcyjną ofertę na lampy, żeby klient na pewno kupił i był zachwycony.',
            'Napisz ofertę na lampy dla biura rachunkowego, tak jak robią to najlepsze sklepy.',
            'Napisz ofertę. Dane klienta: [imiona i prywatne telefony wszystkich pracowników].',
          ],
          0,
          'Polecenie podaje dane i zabrania wymyślania. Zaznaczanie braków pomaga je uzupełnić.',
          [
            null,
            '„Atrakcyjna” i „na pewno kupi” zachęcają AI do przesady i wymyślania.',
            'Brak danych sklepu — AI wymyśli typowe warunki, jak w szkicu z etapu 2.',
            'Wklejasz dane osobowe, które do oferty nie są potrzebne.',
          ],
        ),
        {
          type: 'multi',
          id: 'q-dane',
          question: 'Czego nie wklejasz do ogólnodostępnego narzędzia AI?',
          options: [
            'Imion i prywatnych telefonów pracowników klienta',
            'Numeru umowy i warunków negocjowanych z hurtownią',
            'Ceny katalogowej lampy z cennika na stronie sklepu',
            'Danych z faktury klienta: nazwy firmy, NIP, kwot',
            'Ogólnego opisu lampy z publicznej karty produktu',
          ],
          correct: [0, 1, 3],
          explanation: 'Dane osobowe i poufne warunki handlowe zostają w firmie. Publiczne informacje z cennika i karty produktu można wykorzystać.',
          hint: 'Zastanów się, co jest publiczne, a co poufne.',
        },
      ],
    },
    {
      id: 'sprawdzenie',
      label: 'Sprawdzenie',
      title: 'Klient chce więcej',
      grouping: 'solo',
      intro: 'Po otrzymaniu oferty biuro odpisuje: „Wzięlibyśmy jednak 40 lamp”.',
      ...note(
        8,
        'Samodzielnie. Porównaj odpowiedzi: czy nikt nie obiecał 40 lamp od ręki?',
        'Jak odpowiedzieć, nie obiecując czegoś, czego nie masz?',
        'Potwierdzić 30 dostępnych od ręki i zapytać producenta o termin dla brakujących 10.',
        'Obiecywanie pełnej ilości „bo na pewno da się zamówić”.',
        'Napisz odpowiedź z dwiema opcjami dla klienta.',
      ),
      activities: [
        number('q-brak', 'Ilu lamp brakuje do 40 sztuk?', 10, 'W magazynie jest 30 sztuk. 40 − 30 = 10.', { unit: 'szt.' }),
        choice(
          'q-40',
          'Co odpowiadasz?',
          [
            '30 od ręki, termin dla 10 sprawdzę u producenta i dam znać',
            '40 lamp będzie gotowe do odbioru jutro rano, zapraszamy',
            'Nie mamy 40 lamp, więc proszę szukać w innym sklepie',
            '40 lamp, ale zamiast brakujących 10 dołożymy inny model',
          ],
          0,
          'Uczciwie mówisz, co jest dostępne, i obiecujesz tylko to, co możesz zrobić: sprawdzenie terminu.',
          [
            null,
            'Nie masz 40 lamp. Obietnica się nie spełni.',
            'Rezygnujesz z klienta, zamiast zaproponować rozwiązanie.',
            'Inny model to zmiana oferty — wymaga zgody klienta, a nie decyzji za niego.',
          ],
        ),
        text(
          'q-odpowiedz',
          'Napisz krótką odpowiedź do biura (2–3 zdania).',
          'Dziękujemy za informację. Od ręki mamy 30 lamp L1 — możemy je zarezerwować do odbioru w sklepie. O termin dla pozostałych 10 zapytam producenta i odpowiem do jutra do 12:00.',
          { criteria: ['Jest dostępna ilość.', 'Jest konkretny następny krok z terminem.', 'Brak obietnic bez pokrycia.'] },
        ),
        {
          type: 'resultCard',
          id: 'karta',
          badges: [
            { min: 0, name: 'Do powtórki', text: 'Wróć do szkicu AI i porównaj go z danymi.' },
            { min: 0.6, name: 'Sprawdzasz teksty', text: 'Powtórz dobre polecenie i dane, których nie wklejamy.' },
            { min: 0.85, name: 'AI pod kontrolą', text: 'Korzystasz z narzędzia, ale fakty i dane sprawdzasz sam(a).' },
          ],
        },
      ],
    },
  ],
  exitTicket: 'Klient: zapytanie i zamówienie. Sprzedawca: oferta, potwierdzenie, faktura. AI pisze płynnie, ale fakty sprawdza człowiek. Do narzędzia nie wklejamy danych osobowych i poufnych.',
};
