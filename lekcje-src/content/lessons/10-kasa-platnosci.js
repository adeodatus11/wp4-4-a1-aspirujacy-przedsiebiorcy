import { choice, methods, note, number, text } from '../schema.js';

export default {
  id: '10',
  order: 10,
  part: 'A',
  title: 'Kasa, paragon i płatności',
  subtitle: 'Reszta z dwustu złotych, paragon z błędem, klient, który „dał więcej”, i raport na koniec zmiany, w którym brakuje 10 zł.',
  duration: 90,
  sessions: [45, 45],
  han: ['HAN.01.4'],
  tags: ['kasa fiskalna', 'paragon', 'płatności', 'raport kasowy'],
  realia: ['paragonNip', 'kasaFiskalna', 'vatStawki'],
  audience: {
    adults:
      'Dla dorosłych, którzy otwierają działalność, dodaj kwestię, czy w ogóle potrzebują kasy fiskalnej (limit 20 000 zł i branże bez zwolnienia — sprawdzić w źródle). Osoby z doświadczeniem na kasie poproś o opowiedzenie, jak u nich wyglądało zamknięcie zmiany.',
  },
  format: {
    name: 'Praca przy kasie: sytuacje i dokument zmiany',
    student:
      'Pracujesz na kasie w sklepie spożywczym w Lublinie. Wydasz resztę, sprawdzisz paragon, obsłużysz różne płatności, spokojnie rozwiążesz spór o resztę, a na koniec zmiany rozliczysz kasę.',
    teacher:
      'Pierwsza lekcja: paragon, płatności i trudna sytuacja. Druga: raport zmiany, zwroty i korekty. Kluczowe nawyki: banknot klienta leży na wierzchu, dopóki nie wydasz reszty; gotówkę liczy się w obecności drugiej osoby; pomyłki się dokumentuje, a nie „naprawia po cichu”.',
    grouping: 'W parach kasjer i kontroler, po przerwie zamiana.',
    methods: [methods.przypadek, methods.jawne, methods.ksztaltujace],
  },
  objectives: [
    'Wydaję resztę i obsługuję płatność gotówką, kartą i dzieloną.',
    'Sprawdzam, co musi być na paragonie, i wiem, kiedy wystawić fakturę do paragonu.',
    'Rozwiązuję spór o resztę według procedury.',
    'Rozliczam gotówkę na koniec zmiany i wpisuję różnicę.',
  ],
  materials: ['Kalkulator', 'Jeśli to możliwe: prawdziwy paragon (dane osobowe zakryte)'],
  teacherGuide: {
    preparation:
      'Przynieś kilka paragonów z różnych sklepów. Przy paragonie uczniowie porównają je z paragonem z zadania. Przypomnij, że stawki VAT na paragonie bywają oznaczone literami (A, B, C), a ich znaczenie jest wydrukowane na dole.',
    summary:
      'Paragon zawiera dane sprzedawcy z NIP, numer i datę, towary z ilością, ceną i stawką VAT oraz sumę. Firma dostanie fakturę do paragonu tylko wtedy, gdy na paragonie jest jej NIP. Banknot klienta zostaje na wierzchu do wydania reszty. Na koniec zmiany gotówkę porównuje się ze stanem wynikającym z dokumentów, a różnicę wpisuje do raportu.',
  },
  sections: [
    {
      id: 'start',
      label: 'Reszta',
      title: 'Reszta',
      grouping: 'solo',
      intro: 'Klient płaci za zakupy 47,35 zł banknotem 200 zł.',
      ...note(
        5,
        'Każdy liczy w pamięci, potem sprawdza na platformie. Pokaż metodę „dopełniania”: od 47,35 do 50, potem do 100, potem do 200.',
        'Jak wydać resztę, żeby klient łatwo ją sprawdził?',
        'Głośno odliczać od kwoty zakupu do kwoty banknotu albo powiedzieć kwotę reszty i odliczać przy kliencie.',
        'Odejmowanie w pamięci z błędem przy groszach (np. 152,75).',
        'Jak wydać resztę, gdy w kasie brakuje drobnych? (Zapytać klienta o drobne, nie zaokrąglać na swoją korzyść.)',
      ),
      activities: [
        number('q-reszta', 'Ile reszty wydajesz?', 152.65, '200,00 − 47,35 = 152,65 zł. Dopełnianie: 47,35 + 2,65 = 50; + 50 = 100; + 100 = 200.', {
          unit: 'zł',
          mistakes: [
            { value: 152.75, text: 'Sprawdź grosze: 0,00 − 0,35 to 0,65 i przeniesienie złotówki.' },
            { value: 153.65, text: 'Sprawdź złotówki: 200 − 47 = 153, ale trzeba jeszcze oddać 35 groszy, więc 152,65.' },
          ],
        }),
      ],
    },
    {
      id: 'paragon',
      label: 'Paragon',
      title: 'Co musi być na paragonie',
      grouping: 'pair',
      intro: 'Paragon to dowód zakupu dla klienta i zapis sprzedaży dla urzędu skarbowego. Kasa online wysyła dane do Centralnego Repozytorium Kas.',
      reading: {
        title: 'Najważniejsze elementy paragonu',
        paragraphs: [
          'Nazwa i adres sprzedawcy oraz jego NIP, numer paragonu, data i godzina, nazwy towarów z ilością, ceną i wartością, stawka VAT przy każdym towarze, suma do zapłaty, numer kasy. Paragon trzeba wydać klientowi zawsze, nawet gdy o niego nie prosi.',
          'Stawki VAT przy żywności są niższe niż przy chemii: pieczywo i mleko mają 5%, płyn do naczyń 23%.',
        ],
      },
      ...note(
        12,
        'Pary sprawdzają paragon. Jeśli masz prawdziwe paragony, rozdaj je i poproś o odnalezienie NIP sprzedawcy i oznaczeń stawek VAT.',
        'Po co klientowi paragon, skoro zapłacił?',
        'To dowód zakupu przy reklamacji i zwrocie. Dla urzędu — zapis sprzedaży.',
        'Nieznajomość oznaczeń stawek na paragonie (litery i ich wyjaśnienie na dole).',
        'Na prawdziwym paragonie znajdźcie, ile VAT zawiera cała suma.',
      ),
      activities: [
        {
          type: 'spotErrors',
          id: 'q-paragon',
          title: 'Paragon do sprawdzenia',
          context: 'Kasa była właśnie przeprogramowana. Zaznacz wiersze z błędami.',
          monospace: true,
          lines: [
            { text: 'SKLEP SPOŻYWCZY POD LIPAMI, ul. Lipowa 12, 20-020 Lublin' },
            { text: 'NIP: brak', error: 'Na paragonie musi być NIP sprzedawcy.' },
            { text: 'PARAGON FISKALNY nr 4512   21.10.2026 17:42' },
            { text: 'Chleb żytni        1 × 6,49 = 6,49   VAT 23%', error: 'Pieczywo ma stawkę 5%, nie 23%.' },
            { text: 'Płyn do naczyń     1 × 6,99 = 6,99   VAT 23%' },
            { text: 'Mleko 2% 1 l       2 × 3,79 = 7,58   VAT 5%' },
            { text: 'SUMA PLN 21,16', error: '6,49 + 6,99 + 7,58 = 21,06 zł.' },
            { text: 'Kasa nr 2, numer unikatowy kasy' },
          ],
          explanation: 'Trzy błędy: brak NIP sprzedawcy, zła stawka VAT przy chlebie, zła suma. Taki paragon trzeba zgłosić kierownikowi i serwisowi kasy.',
        },
      ],
    },
    {
      id: 'platnosci',
      label: 'Płatności',
      title: 'Karta, gotówka, faktura',
      grouping: 'pair',
      intro: 'W ciągu godziny przy kasie zdarza się kilka różnych sytuacji.',
      ...note(
        8,
        'Dopasowanie w parach, potem płatność dzielona i faktura. Przy fakturze zapytaj, kto prosił w sklepie o „paragon z NIP-em”.',
        'Dlaczego kasjer pyta „paragon z NIP-em?”, zanim wydrukuje paragon?',
        'Bo jeśli firma chce fakturę, NIP musi być na paragonie. Po wydrukowaniu nie da się go dopisać.',
        'Wystawianie faktury dla firmy do paragonu bez NIP.',
        'Sprawdź, w jakim czasie można wystawić fakturę do paragonu dla osoby prywatnej (do 3 miesięcy, na jej żądanie).',
      ),
      activities: [
        {
          type: 'matching',
          id: 'q-platnosci',
          question: 'Jak reagujesz?',
          options: ['Przyjmujesz zwykle', 'Terminal poprosi o PIN', 'Sprawdzasz zabezpieczenia', 'Nie przyjmujesz'],
          rows: [
            { label: 'Karta zbliżeniowo, zakupy 64,20 zł', correct: 0 },
            { label: 'Karta zbliżeniowo, zakupy 182,40 zł', correct: 1, explanation: 'Powyżej 100 zł płatność zbliżeniowa zwykle wymaga PIN-u.' },
            { label: 'Banknot 200 zł, który wydaje się inny w dotyku', correct: 2, explanation: 'Znak wodny, nitka, farba zmienna optycznie. W razie wątpliwości — kierownik.' },
            { label: 'Euro w sklepie, który nie przyjmuje walut obcych', correct: 3 },
            { label: 'Zakupy za 12 zł, płatność banknotem 100 zł, w kasie są drobne', correct: 0 },
          ],
          explanation: 'Większość płatności przyjmujesz rutynowo. Uwaga przy podejrzanych banknotach i walutach.',
        },
        number('q-dzielona', 'Zakupy kosztują 86,40 zł. Klientka płaci 50 zł gotówką, a resztę kartą. Jaką kwotę wpisujesz na terminalu?', 36.4, '86,40 − 50,00 = 36,40 zł.', { unit: 'zł' }),
      ],
    },
    {
      id: 'faktura',
      label: 'Faktura',
      title: 'Faktura do paragonu',
      grouping: 'solo',
      intro: 'Tydzień po zakupach wraca klient z paragonem i prosi o fakturę na firmę.',
      ...note(
        5,
        'Każdy odpowiada sam. Zapytaj, kto słyszał przy kasie pytanie „czy NIP na paragon?” — teraz wiadomo, po co ono jest.',
        'Dlaczego kasjer pyta o NIP przed wydrukowaniem paragonu?',
        'Bo potem do paragonu bez NIP nie da się wystawić faktury dla firmy.',
        'Wystawianie faktury z NIP-em podanym po fakcie.',
        'Sprawdź, do jakiej kwoty paragon z NIP jest fakturą uproszczoną (450 zł brutto).',
      ),
      activities: [
        choice(
          'q-faktura',
          'Pracownik firmy przychodzi po tygodniu z paragonem na 320 zł i prosi o fakturę na firmę. Na paragonie nie ma NIP. Co odpowiadasz?',
          [
            'Że faktury na firmę nie mogę wystawić, bo na paragonie brak NIP',
            'Wystawiam fakturę z NIP-em, który mi podyktuje, bo to tylko formalność',
            'Wystawiam fakturę, ale tylko jeśli minęło mniej niż 3 miesiące od zakupu',
            'Proszę o drugi paragon na tę samą kwotę i wtedy wystawiam fakturę',
          ],
          0,
          'Firma dostanie fakturę do paragonu tylko wtedy, gdy na paragonie jest jej NIP. Bez niego faktura dla firmy jest niedozwolona.',
          [
            null,
            'To nie formalność — przepis wymaga NIP na paragonie. Za taką fakturę grozi sankcja.',
            'Termin 3 miesięcy dotyczy faktury dla osoby prywatnej. Dla firmy NIP musi być na paragonie.',
            'Drugi paragon oznaczałby drugą sprzedaż, której nie było.',
          ],
        ),
      ],
    },
    {
      id: 'spor',
      label: 'Spór o resztę',
      title: '„Dałem dwieście!”',
      grouping: 'pair',
      intro: 'Klient zapłacił, dostał resztę i po chwili wraca: twierdzi, że dał 200 zł, a reszta była wydana ze stu.',
      breakAfter: true,
      ...note(
        15,
        'Pary przechodzą rozmowę na platformie, potem odgrywają ją na żywo. Po przerwie zamiana ról kasjer–kontroler.',
        'Jaki nawyk przy kasie zapobiega takim sporom?',
        'Banknot klienta leży na wierzchu kasetki albo obok niej, dopóki nie wydasz reszty, i mówisz na głos: „ze dwustu”.',
        'Kłótnia z klientem albo dopłacanie z własnej kieszeni, „żeby był spokój”.',
        'Napiszcie krótką instrukcję dla nowej osoby na kasie: trzy zasady przy przyjmowaniu gotówki.',
      ),
      activities: [
        {
          type: 'dialog',
          id: 'q-spor',
          title: 'Rozmowa przy kasie',
          start: 'n1',
          nodes: {
            n1: {
              speaker: 'Klient',
              text: 'Przepraszam, dałem dwieście złotych, a dostałem resztę ze stu!',
              choices: [
                { text: 'Rozumiem. Pana banknot leży jeszcze na kasetce — to sto złotych, proszę spojrzeć.', next: 'n2', good: true, feedback: 'Banknot na wierzchu to najprostszy dowód. Mówisz spokojnie i pokazujesz.' },
                { text: 'Na pewno dał Pan sto, proszę nie wymyślać.', next: 'n2', good: false, feedback: 'Oskarżenie eskaluje spór, nawet jeśli masz rację.' },
                { text: 'Dobrze, oddam różnicę.', next: 'n2', good: false, feedback: 'Wydajesz 100 zł bez sprawdzenia. Na koniec zmiany w kasie zabraknie 100 zł.' },
              ],
            },
            n2: {
              speaker: 'Klient',
              text: 'Jestem pewien, że to była dwusetka. Może już ją schowano do szuflady.',
              choices: [
                { text: 'Proszę o chwilę — wezwę kierowniczkę. Po zamknięciu zmiany przeliczymy kasę i sprawdzimy nagranie. Jeśli będzie nadwyżka, oddamy ją. Zostawi Pan numer telefonu?', next: 'end', good: true, feedback: 'Procedura zamiast sporu: druga osoba, przeliczenie kasy, kontakt z klientem.' },
                { text: 'Nic nie mogę zrobić, proszę odejść od kasy, są kolejni klienci.', next: 'end', good: false, feedback: 'Klient zostaje z poczuciem krzywdy, a sprawa wraca jako skarga.' },
                { text: 'Oddam Panu sto złotych z własnego portfela.', next: 'end', good: false, feedback: 'Własne pieniądze w kasie mieszają rozliczenie. Sprawa nie jest wyjaśniona.' },
              ],
            },
            end: { end: true, text: 'Kierowniczka zapisała zgłoszenie. Po zmianie kasa się zgodziła, a klient dostał telefon z wyjaśnieniem. Spokój i procedura chronią klienta i Ciebie.' },
          },
        },
        choice(
          'q-nawyk',
          'Który nawyk najlepiej zapobiega takim sporom?',
          [
            'Banknot klienta zostaje na wierzchu do wydania reszty',
            'Szybkie chowanie banknotu do szuflady, żeby nikt go nie zabrał',
            'Wydawanie reszty bez mówienia kwoty, żeby nie przedłużać',
          ],
          0,
          'Banknot widoczny do końca transakcji i kwota powiedziana na głos („ze dwustu”) rozwiązują większość sporów od razu.',
          [
            null,
            'Banknot schowany przed wydaniem reszty to brak dowodu.',
            'Kwota powiedziana na głos pozwala klientowi zauważyć pomyłkę od razu.',
          ],
        ),
      ],
    },
    {
      id: 'raport',
      label: 'Raport zmiany',
      title: 'Zamknięcie zmiany',
      grouping: 'pair',
      intro: 'Zamiana ról. Jest 22:00, koniec zmiany. Rozlicz gotówkę w kasie nr 2.',
      reading: {
        title: 'Ile gotówki powinno być w szufladzie',
        paragraphs: [
          'Stan wynikający z dokumentów = gotówka na początek zmiany (pogotowie kasowe) + sprzedaż gotówkowa − wypłaty z kasy (np. zwroty) − wpłaty do sejfu w trakcie zmiany. Płatności kartą i BLIK-iem nie trafiają do szuflady, więc ich nie liczysz.',
          'Różnica = gotówka policzona − stan z dokumentów. Na minusie to niedobór, na plusie nadwyżka. Każdą różnicę wpisuje się do raportu i podpisuje.',
        ],
      },
      ...note(
        18,
        'Pary wypełniają raport. Zapytaj, kto doliczył płatności kartą — to najczęstszy błąd.',
        'Dlaczego nadwyżka w kasie też jest problemem?',
        'Bo oznacza, że któryś klient dostał za mało reszty albo coś nie zostało nabite. Kasa ma się zgadzać, a nie „być na plus”.',
        'Doliczanie sprzedaży kartą do gotówki. Pomijanie wpłaty do sejfu.',
        'Policz różnicę, gdyby kasjer zapomniał zapisać zwrot towaru za 48,99 zł.',
      ),
      activities: [
        {
          type: 'docForm',
          id: 'doc-raport',
          title: 'Raport zmiany — kasa nr 2, 21.10.2026',
          points: 4,
          doc: {
            title: 'Rozliczenie gotówki na koniec zmiany',
            table: {
              head: ['Pozycja', 'Kwota'],
              rows: [
                ['Pogotowie kasowe na początek zmiany', '400,00 zł'],
                ['Sprzedaż gotówkowa według raportu kasy', '3 286,45 zł'],
                ['Sprzedaż kartą i BLIK-iem', '5 912,30 zł'],
                ['Wypłata z kasy: zwrot towaru', '48,99 zł'],
                ['Wpłata do sejfu o 16:00', '2 000,00 zł'],
                ['Stan gotówki według dokumentów', { f: 'stan' }],
                ['Gotówka policzona w szufladzie', '1 627,46 zł'],
                ['Różnica (ze znakiem)', { f: 'roznica' }],
              ],
            },
            after: [['Rodzaj różnicy', { f: 'rodzaj' }], ['Podpis', { f: 'podpis' }]],
          },
          fields: {
            stan: { label: 'Stan gotówki według dokumentów', answer: 1637.46, hint: 'Pogotowie + sprzedaż gotówkowa − zwrot − wpłata do sejfu. Bez kart.' },
            roznica: { label: 'Różnica', answer: -10, hint: 'Różnica = policzona gotówka − stan według dokumentów.' },
            rodzaj: { label: 'Rodzaj różnicy', kind: 'select', options: ['niedobór', 'nadwyżka', 'brak różnicy'], answer: 'niedobór', hint: 'Różnica jest ujemna.' },
            podpis: { label: 'Kto podpisuje raport', kind: 'select', options: ['tylko kasjer', 'kasjer i osoba kontrolująca', 'klient'], answer: 'kasjer i osoba kontrolująca', hint: 'Gotówkę liczy się w obecności drugiej osoby.' },
          },
          explanation: '400 + 3286,45 − 48,99 − 2000 = 1637,46 zł. Policzono 1627,46 zł, więc brakuje 10 zł. Raport podpisują dwie osoby.',
        },
      ],
    },
    {
      id: 'korekty',
      label: 'Zwroty',
      title: 'Zwroty i pomyłki',
      grouping: 'trio',
      intro: 'Dwie sytuacje z popołudnia i kolejność zamknięcia zmiany.',
      ...note(
        20,
        'Pary odpowiadają. Przy zwrocie w sklepie stacjonarnym zapytaj, kto myślał, że 14 dni na zwrot przysługuje zawsze.',
        'Skąd bierze się przekonanie, że w każdym sklepie można zwrócić towar w 14 dni?',
        'Z zakupów przez internet, gdzie to prawo wynika z ustawy. W sklepie stacjonarnym to dobra wola sklepu.',
        'Mylenie zwrotu (towar dobry) z reklamacją (towar wadliwy).',
        'Znajdź regulamin zwrotów dużej sieci sklepów i sprawdź, ile dni daje na zwrot.',
      ),
      activities: [
        choice(
          'q-zwrot',
          'Klientka chce zwrócić nieotwarty płyn kupiony wczoraj w tym sklepie. Płyn nie ma wady, po prostu jej nie pasuje. Co z tym?',
          [
            'To zależy od zasad sklepu; prawo tego nie wymaga',
            'Sklep musi przyjąć zwrot, bo klient ma zawsze 14 dni',
            'Sklep musi przyjąć zwrot, jeśli klientka ma paragon',
          ],
          0,
          'W sklepie stacjonarnym zwrot towaru bez wady to dobrowolna usługa sklepu, opisana w jego zasadach.',
          [
            null,
            '14 dni na odstąpienie dotyczy zakupów przez internet i poza lokalem sklepu.',
            'Paragon jest potrzebny, ale nie tworzy prawa do zwrotu towaru bez wady.',
          ],
        ),
        choice(
          'q-korekta',
          'Ten sam jogurt został nabity dwa razy, a paragon jest już wydrukowany. Klientka zauważyła to od razu. Co robisz?',
          [
            'Zapisuję korektę w ewidencji z podpisem klientki',
            'Drukuję nowy paragon bez jogurtu, a stary wyrzucam do kosza',
            'Oddaję pieniądze za jogurt z kasy i niczego nie zapisuję',
            'Zapisuję pomyłkę w prywatnym zeszycie, a w kasie nic nie zmieniam',
          ],
          0,
          'Pomyłki po wydrukowaniu paragonu rozlicza się w ewidencji zwrotów i pomyłek, z dokumentem i podpisem. Inaczej kasa się nie zgodzi, a sprzedaż zostanie zawyżona.',
          [
            null,
            'Drugi paragon nie anuluje pierwszego. Sprzedaż w kasie byłaby podwójna.',
            'Bez zapisu w kasie zabraknie pieniędzy w rozliczeniu zmiany.',
            'Prywatny zeszyt nie jest dokumentem kasowym.',
          ],
        ),
        {
          type: 'sequence',
          id: 'q-zamkniecie',
          question: 'Ułóż czynności przy zamknięciu zmiany.',
          items: [
            'Zakończ obsługę klientów i zablokuj kasę',
            'Przelicz gotówkę w obecności drugiej osoby',
            'Porównaj z raportem zmiany',
            'Wpisz różnicę i podpiszcie raport',
            'Przekaż gotówkę do sejfu',
          ],
          explanation: 'Najpierw blokada i liczenie we dwoje, potem porównanie, podpisy i przekazanie gotówki.',
        },
      ],
    },
    {
      id: 'sprawdzenie',
      label: 'Nowa zmiana',
      title: 'Twoja zmiana',
      grouping: 'solo',
      intro: 'Inna kasa, inne kwoty. Policz różnicę samodzielnie.',
      ...note(
        7,
        'Samodzielnie. Po sprawdzeniu ułóżcie razem listę kontrolną otwarcia zmiany: co sprawdzasz, zanim obsłużysz pierwszego klienta.',
        'Co sprawdzasz na początku zmiany, zanim obsłużysz pierwszego klienta?',
        'Pogotowie kasowe (czy zgadza się kwota), papier w drukarce, terminal, drobne do wydawania.',
        'Rozpoczynanie pracy bez przeliczenia pogotowia — potem nie wiadomo, skąd różnica.',
        'Ułóż listę kontrolną otwarcia zmiany na kartkę A6 przy kasie.',
      ),
      activities: [
        number('q-nowa-roznica', 'Pogotowie 300 zł, sprzedaż gotówkowa 1 845,20 zł, zwrot 25,00 zł, wpłata do sejfu 1 000 zł. W szufladzie policzono 1 125,20 zł. Jaka jest różnica (ze znakiem)?', 5, 'Stan z dokumentów: 300 + 1845,20 − 25 − 1000 = 1120,20 zł. Różnica: 1125,20 − 1120,20 = +5 zł (nadwyżka).', {
          unit: 'zł',
          mistakes: [
            { value: -5, text: 'Odwrotny znak. Różnica = policzona gotówka − stan z dokumentów.' },
            { value: -20, text: 'Zwrot 25 zł też zmniejsza stan gotówki z dokumentów.' },
          ],
        }),
        {
          type: 'resultCard',
          id: 'karta',
          badges: [
            { min: 0, name: 'Do powtórki', text: 'Wróć do paragonu i do raportu zmiany.' },
            { min: 0.6, name: 'Pewna ręka przy kasie', text: 'Powtórz faktury do paragonu i korekty.' },
            { min: 0.85, name: 'Kasa się zgadza', text: 'Obsłużysz płatności, spór i rozliczenie zmiany.' },
          ],
        },
      ],
    },
  ],
  exitTicket: 'Paragon: NIP sprzedawcy, stawki VAT, suma. Faktura na firmę tylko do paragonu z NIP. Banknot na wierzchu do wydania reszty. Stan gotówki = pogotowie + sprzedaż gotówkowa − wypłaty − wpłaty do sejfu.',
};
