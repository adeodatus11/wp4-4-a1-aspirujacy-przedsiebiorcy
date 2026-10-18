import { choice, methods, note, number, text } from '../schema.js';

export default {
  id: '31',
  order: 31,
  part: 'B',
  title: 'Stali klienci i obsługa po sprzedaży',
  subtitle: 'Karta lojalnościowa drogerii: ile kosztuje 5% zwrotu w punktach, jakie zgody wolno zebrać i co zrobić, żeby klientka wróciła po miesiącu.',
  duration: 45,
  sessions: [45],
  han: ['HAN.02.6'],
  tags: ['program lojalnościowy', 'RODO', 'zgody marketingowe', 'obsługa posprzedażowa'],
  realia: [],
  audience: {
    adults:
      'Osoby prowadzące mały sklep często myślą o karcie lojalnościowej. Ta lekcja pokazuje jej koszt w marży i zasady zbierania danych. Zachęć, żeby zaczęli od prostych działań po sprzedaży (podziękowanie, przypomnienie), które nic nie kosztują.',
  },
  format: {
    name: 'Przypadek z obliczeniami i formularzem',
    student:
      'Pracujesz w drogerii w Opolu, która wprowadza kartę z punktami. Policzysz, ile kosztuje program, sprawdzisz formularz przystąpienia pod kątem danych osobowych i zaplanujesz kontakt z klientem po zakupie.',
    teacher:
      'Lekcja łączy liczby (koszt programu w marży), prawo (zgody marketingowe, minimalizacja danych) i obsługę po sprzedaży. Kluczowe: zgoda na marketing jest osobna, dobrowolna i nie może być zaznaczona z góry.',
    grouping: 'Etapy 1 i 5 samodzielnie, etapy 2–4 w parach.',
    methods: [methods.przypadek, methods.przyklady],
  },
  objectives: [
    'Liczę wartość i koszt programu lojalnościowego.',
    'Sprawdzam formularz przystąpienia: zgody i zakres danych.',
    'Planuję kontakt z klientem po sprzedaży.',
  ],
  materials: ['Urządzenie z przeglądarką', 'Kalkulator', 'Regulamin dowolnej karty lojalnościowej (nie jest konieczny)'],
  teacherGuide: {
    preparation: 'Możesz poprosić uczniów, żeby sprawdzili w telefonie, w ilu programach lojalnościowych są i jakie zgody zaznaczyli.',
    summary:
      'Program z punktami to rabat odroczony: przy 1 punkcie za 1 zł i bonie 10 zł za 200 punktów klient odzyskuje 5% wydatków. Przy marży 25% to piąta część marży. Zgoda na marketing musi być osobna, dobrowolna, niezaznaczona z góry i możliwa do wycofania. Zbiera się tylko dane potrzebne do programu. Obsługa po sprzedaży to podziękowanie, pytanie o opinię i przypomnienie w odpowiednim czasie.',
  },
  sections: [
    {
      id: 'start',
      label: 'Start',
      title: 'Po co stali klienci?',
      grouping: 'solo',
      intro: 'Właścicielka drogerii pyta: „Czy warto inwestować w stałych klientów, skoro codziennie przychodzą nowi?”.',
      ...note(
        5,
        'Każdy odpowiada sam. Zapytaj, do jakiego sklepu wracają i dlaczego.',
        'Dlaczego wracacie do tego samego sklepu?',
        'Blisko, znają mnie, mają to, czego szukam, dobra obsługa, punkty.',
        'Przekonanie, że lojalność buduje się tylko rabatami.',
        'Wymień dwie rzeczy, które sprawiają, że wracasz do sklepu, a nie są rabatem.',
      ),
      activities: [
        choice(
          'q-stali',
          'Co stali klienci dają sklepowi?',
          [
            'Regularną sprzedaż i polecenia bez kosztu reklamy',
            'Prawo do wyższych cen, bo i tak przyjdą',
            'Zwolnienie z obowiązku prowadzenia promocji',
            'Gwarancję, że sklep nie będzie miał konkurencji',
          ],
          0,
          'Stały klient kupuje regularnie i poleca sklep znajomym. Pozyskanie nowego zwykle wymaga reklamy.',
          [
            null,
            'Wyższe ceny bez powodu zniechęcają także stałych klientów.',
            'Promocje nadal są potrzebne, np. dla nowych klientów.',
            'Konkurencja istnieje niezależnie od lojalności klientów.',
          ],
        ),
      ],
    },
    {
      id: 'koszt',
      label: 'Koszt',
      title: 'Ile kosztuje 5%?',
      grouping: 'pair',
      intro: 'Program: 1 punkt za każdą wydaną złotówkę, 200 punktów to bon 10 zł. Średnia marża drogerii to 25% ceny sprzedaży.',
      reading: {
        example: {
          question: 'Ile procent wydatków klient odzyskuje w bonach?',
          steps: ['200 punktów = 200 zł zakupów.', 'Za 200 zł zakupów klient dostaje bon 10 zł.', '10 ÷ 200 = 0,05, czyli 5%.'],
          answer: '5% wydatków wraca do klienta w bonach.',
        },
      },
      ...note(
        12,
        'Przykład razem, potem pary liczą. Zapytaj, czy 5% to dużo dla sklepu z marżą 25%.',
        'Jaka część marży drogerii idzie na program?',
        '5 punktów procentowych z 25, czyli jedna piąta marży — o ile wszyscy klienci wykorzystają bony.',
        'Porównywanie 5% z 25% jak z kwotami, bez zrozumienia, że chodzi o część marży.',
        'Policz koszt programu, jeśli tylko 60% punktów zostaje wykorzystanych (3% obrotu).',
      ),
      activities: [
        number('q-klientka', 'Klientka wydaje w drogerii średnio 300 zł miesięcznie. Ile złotych w bonach dostanie w ciągu roku?', 180, 'Rocznie 3600 zł zakupów = 3600 punktów = 18 bonów po 10 zł = 180 zł.', {
          unit: 'zł',
          mistakes: [
            { value: 15, text: 'To bony z jednego miesiąca. Pytanie dotyczy całego roku.' },
            { value: 360, text: '3600 punktów to 18 bonów (200 punktów na bon), nie 36.' },
          ],
        }),
        number('q-marza', 'Jaką część marży (w procentach) program oddaje klientom, jeśli wszyscy wykorzystują punkty?', 20, '5% ÷ 25% = 0,2, czyli 20% marży.', {
          unit: '%',
          mistakes: [{ value: 5, text: '5% to część ceny. Pytanie dotyczy części marży: 5 ÷ 25.' }],
        }),
      ],
    },
    {
      id: 'zgody',
      label: 'Zgody',
      title: 'Formularz przystąpienia',
      grouping: 'pair',
      intro: 'Agencja przygotowała formularz karty. Sprawdź, czy jest zgodny z zasadami ochrony danych.',
      reading: {
        title: 'Dane i zgody',
        paragraphs: [
          'Do programu zbiera się tylko dane, które są do niego potrzebne. Zgoda na newsletter czy SMS-y z ofertami musi być osobna, dobrowolna, niezaznaczona z góry i możliwa do wycofania w każdej chwili. Nie można uzależniać przystąpienia do programu od zgody na marketing, jeśli nie jest on do programu konieczny.',
        ],
      },
      ...note(
        10,
        'Pary zaznaczają błędy. Zapytaj, po co drogerii PESEL — i czy jest jej potrzebny.',
        'Jakie dane naprawdę są potrzebne do karty z punktami?',
        'Numer karty i sposób kontaktu do odzyskania punktów (e-mail lub telefon). Imię dla wygody. PESEL, adres zamieszkania czy data urodzenia z rokiem nie są potrzebne.',
        'Zaznaczanie zgód marketingowych z góry „dla wygody klienta”.',
        'Napisz treść zgody marketingowej prostym językiem (jedno zdanie).',
      ),
      activities: [
        {
          type: 'spotErrors',
          id: 'q-formularz',
          title: 'Formularz karty „Drogeria Plus”',
          context: 'Zaznacz elementy do poprawy.',
          lines: [
            { text: 'Imię: ________' },
            { text: 'E-mail lub telefon (do odzyskania punktów): ________' },
            { text: 'PESEL: ________ (pole obowiązkowe)', error: 'PESEL nie jest potrzebny do zbierania punktów. To nadmiar danych.' },
            { text: '[✓] Zgadzam się na otrzymywanie ofert SMS i e-mailem (zaznaczone domyślnie)', error: 'Zgoda nie może być zaznaczona z góry.' },
            { text: 'Bez zgody na oferty nie wydajemy karty.', error: 'Przystąpienie do programu nie może zależeć od zgody na marketing.' },
            { text: 'Zgodę możesz wycofać w każdej chwili w aplikacji lub w sklepie.' },
          ],
          explanation: 'Trzy poprawki: bez PESEL, zgoda niezaznaczona, karta niezależna od zgody na marketing.',
        },
      ],
    },
    {
      id: 'po-sprzedazy',
      label: 'Po sprzedaży',
      title: 'Kontakt po zakupie',
      grouping: 'pair',
      intro: 'Klientka (ze zgodą na kontakt) kupiła dzbanek filtrujący z wkładem na miesiąc i krem przeciwsłoneczny przed urlopem.',
      ...note(
        10,
        'Pary dopasowują. Zapytaj, który kontakt byłby dla nich przydatny, a który irytujący.',
        'Kiedy wiadomość od sklepu jest pomocna, a kiedy denerwuje?',
        'Pomocna, gdy dotyczy tego, co kupiłem, i przychodzi w odpowiednim momencie. Denerwuje, gdy jest codziennie i o wszystkim.',
        'Wysyłanie wszystkich wiadomości od razu albo codziennie.',
        'Zaplanuj kontakt po zakupie dla klienta, który kupił szczoteczkę elektryczną.',
      ),
      activities: [
        {
          type: 'matching',
          id: 'q-kiedy',
          question: 'Kiedy wysłać wiadomość?',
          options: ['Od razu', 'Po kilku dniach', 'Po około miesiącu'],
          rows: [
            { label: 'Podziękowanie i elektroniczny paragon', correct: 0 },
            { label: 'Pytanie, czy krem sprawdził się na urlopie', correct: 1 },
            { label: 'Przypomnienie o wymianie wkładu w dzbanku', correct: 2 },
          ],
          explanation: 'Każda wiadomość w momencie, w którym jest przydatna dla klientki.',
        },
        choice(
          'q-czestotliwosc',
          'Ile wiadomości z ofertami wysyłać klientom ze zgodą?',
          [
            'Rzadko i tylko z ofertami związanymi z ich zakupami',
            'Codziennie, bo przecież wyrazili zgodę na kontakt',
            'Tyle, ile się da, bo im więcej, tym więcej sprzedaży',
            'Żadnych, bo każda oferta narusza prywatność klienta',
          ],
          0,
          'Zgoda nie oznacza zgody na zasypywanie wiadomościami. Za częste wiadomości kończą się wycofaniem zgody.',
          [
            null,
            'Codzienne oferty zwykle prowadzą do wycofania zgody.',
            'Zbyt dużo wiadomości działa odwrotnie — klienci przestają czytać.',
            'Oferty dla osób, które wyraziły zgodę, są dozwolone.',
          ],
        ),
      ],
    },
    {
      id: 'sprawdzenie',
      label: 'Sprawdzenie',
      title: 'Twoja propozycja',
      grouping: 'solo',
      intro: 'Sprawdzenie i krótka propozycja dla właścicielki.',
      ...note(
        8,
        'Samodzielnie. Przeczytaj 2–3 propozycje: czy są tanie i realne?',
        'Co można zrobić dla stałych klientów bez kosztów w marży?',
        'Zapamiętywać ich potrzeby, odkładać towar, informować o dostawie ulubionego produktu, dobrze doradzać.',
        'Propozycje oparte wyłącznie na rabatach.',
        'Przygotuj prosty plan kontaktu po sprzedaży na jeden miesiąc.',
      ),
      activities: [
        choice(
          'q-wycofanie',
          'Klientka prosi przy kasie: „Proszę mi już nie wysyłać SMS-ów”. Co robisz?',
          [
            'Wycofuję zgodę w systemie od razu',
            'Mówię, że musi napisać pismo do centrali',
            'Mówię, że bez SMS-ów straci punkty',
            'Obiecuję, że od przyszłego roku przestaną przychodzić',
          ],
          0,
          'Wycofanie zgody ma być tak łatwe jak jej wyrażenie. Punkty nie zależą od zgody na marketing.',
          [
            null,
            'Wycofanie nie może być trudniejsze niż wyrażenie zgody.',
            'Program nie może być uzależniony od zgody na marketing.',
            'Zgodę wycofuje się od razu, nie od przyszłego roku.',
          ],
        ),
        text(
          'q-propozycja',
          'Zaproponuj właścicielce dwa działania dla stałych klientów, które nie są rabatem.',
          'Po pierwsze: przypomnienie SMS o kończącym się kosmetyku po około miesiącu od zakupu (tylko dla osób ze zgodą). Po drugie: możliwość odłożenia ulubionego produktu przy nowej dostawie i informacja, gdy przyjdzie.',
          { criteria: ['Dwa działania.', 'Żadne nie jest rabatem.', 'Działania są realne do wprowadzenia.'] },
        ),
        {
          type: 'resultCard',
          id: 'karta',
          badges: [
            { min: 0, name: 'Do powtórki', text: 'Wróć do kosztu programu i zgód.' },
            { min: 0.6, name: 'Dbasz o klientów', text: 'Powtórz kontakt po sprzedaży.' },
            { min: 0.85, name: 'Klienci wracają', text: 'Policzysz program i zbudujesz kontakt zgodny z zasadami.' },
          ],
        },
      ],
    },
  ],
  exitTicket: 'Punkty to odroczony rabat: 1 zł = 1 pkt, 200 pkt = 10 zł → 5% obrotu, przy marży 25% to jej piąta część. Zgoda na marketing: osobna, dobrowolna, niezaznaczona, łatwa do wycofania. Dane — tylko potrzebne.',
};
