import { choice, methods, note, number, text } from '../schema.js';

const delivery = {
  type: 'info',
  tone: 'case',
  title: 'Dostawa do drogerii przy ul. Ozimskiej w Opolu, wtorek 7:15',
  paragraphs: ['Zamówienie ZAM/112/10 i dokument WZ 1184/10 z hurtowni mają te same ilości. Po rozpakowaniu kartonów okazało się, że rzeczywistość wygląda inaczej.'],
  table: {
    head: ['Towar', 'Cena netto', 'Na WZ', 'Co przyszło naprawdę'],
    rows: [
      ['Płyn do naczyń 1 l', '6,20 zł', '24 szt.', '24 szt., w tym 2 rozszczelnione i puste do połowy'],
      ['Proszek do prania 1,35 kg', '21,50 zł', '12 szt.', '10 szt.'],
      ['Papier toaletowy, 8 rolek', '14,90 zł', '30 opak.', '30 opak.'],
      ['Żel pod prysznic 400 ml', '7,80 zł', '18 szt.', '18 szt., ale pojemność 250 ml'],
      ['Worki na śmieci 60 l', '5,40 zł', '20 opak.', '22 opak.'],
    ],
  },
};

export default {
  id: '04',
  order: 4,
  part: 'A',
  title: 'Przyjęcie dostawy i rozbieżności',
  subtitle: 'Kierowca się spieszy, na WZ wszystko się zgadza, a w kartonach brakuje proszku i jest nie ten żel. Jak przyjąć dostawę, żeby sklep nie stracił.',
  duration: 90,
  sessions: [45, 45],
  han: ['HAN.01.3'],
  tags: ['dostawa', 'WZ', 'protokół rozbieżności', 'korekta faktury'],
  realia: [],
  audience: {
    adults:
      'Dorośli, którzy pracowali w sklepie lub magazynie, mają tu dużo do powiedzenia — zacznij od pytania o najgorszą dostawę, jaką przyjmowali. Osobom otwierającym sklep zwróć uwagę, że ustalenia z dostawcą warto potwierdzać mailem i trzymać protokoły, bo od nich zależy korekta faktury.',
  },
  format: {
    name: 'Przypadek z dokumentem i rozmową z dostawcą',
    student:
      'Przyjmujesz dostawę do drogerii. Sprawdzisz dokumenty, wypełnisz protokół rozbieżności, policzysz wartość braków i zadzwonisz do hurtowni, żeby ustalić, co dalej.',
    teacher:
      'Pierwsza część dotyczy dokumentów i kontroli przy kierowcy, druga — rozliczenia rozbieżności z dostawcą. Uczniowie pracują na jednym spójnym przypadku przez obie lekcje. Protokół na platformie jest uproszczonym wzorem, ale ma pola, które występują w protokołach używanych w sklepach.',
    grouping: 'Etapy 1, 2 i 7 samodzielnie. Etapy 3–6 w parach: „przyjmujący” i „kontrolujący”; w drugiej części zamiana ról.',
    methods: [methods.przypadek, methods.jawne, methods.feedback],
  },
  objectives: [
    'Rozróżniam zamówienie, WZ, fakturę, PZ i protokół rozbieżności.',
    'Wiem, co sprawdzić przy kierowcy, a co po rozpakowaniu.',
    'Wypełniam protokół rozbieżności i liczę wartość braków.',
    'Ustalam z dostawcą korektę, wymianę albo zwrot towaru.',
  ],
  materials: ['Urządzenie z przeglądarką', 'Kalkulator', 'Jeśli to możliwe: prawdziwy wydruk WZ albo protokołu ze sklepu, z zakrytymi danymi'],
  teacherGuide: {
    preparation:
      'Przed lekcją zapisz na tablicy łańcuch: zamówienie → WZ → przyjęcie → PZ → faktura (ew. korekta). W etapie 2 wracasz do niego. Zaplanuj zamianę ról w parach po przerwie.',
    summary:
      'Przy kierowcy liczysz opakowania zbiorcze i sprawdzasz ich stan, a widoczne braki i uszkodzenia wpisujesz na WZ przed podpisem. Po rozpakowaniu kontrolujesz ilość sztuk, asortyment i jakość, a rozbieżności spisujesz w protokole. Brak i uszkodzenia rozlicza korekta faktury od dostawcy, towar niezgodny z zamówieniem się zwraca albo wymienia, a nadwyżkę odsyła lub dopisuje do faktury.',
  },
  sections: [
    {
      id: 'start',
      label: 'Start',
      title: 'Kierowca się spieszy',
      grouping: 'solo',
      intro: 'Jest 7:15. Kierowca hurtowni zostawia sześć kartonów i prosi: „Proszę tylko podpisać WZ, mam jeszcze dziesięć sklepów”.',
      ...note(
        5,
        'Każdy decyduje sam. Potem krótka rozmowa: co ryzykuje sklep, gdy podpisze dokument bez sprawdzenia.',
        'Co sprawdzisz w dwie minuty, zanim kierowca odjedzie?',
        'Liczbę kartonów zgodną z WZ, czy kartony nie są rozerwane, zgniecione, mokre, czy plomby lub taśmy są całe.',
        'Przekonanie, że podpis kierowcy wystarczy, a rozliczy się „potem”.',
        'Dopytaj, co zrobić, gdy karton jest mokry albo rozerwany (adnotacja na WZ i zdjęcie przy kierowcy).',
      ),
      activities: [
        choice(
          'q-kierowca',
          'Co robisz?',
          [
            'Przy kierowcy liczę kartony, oglądam je i wpisuję uwagi na WZ',
            'Podpisuję WZ, bo hurtownia zawsze wysyła dokładnie to, co jest na dokumencie',
            'Nie podpisuję niczego, dopóki nie rozpakuję wszystkich kartonów i nie przeliczę sztuk',
            'Proszę kierowcę, żeby sam podpisał WZ w imieniu sklepu, a ja sprawdzę towar później',
          ],
          0,
          'Przy kierowcy sprawdzasz to, co da się zobaczyć od razu: liczbę i stan opakowań zbiorczych. Dokładna kontrola sztuk przychodzi po rozpakowaniu.',
          [
            null,
            'Podpis bez sprawdzenia oznacza, że sklep potwierdza odbiór wszystkiego. Trudniej potem udowodnić brak.',
            'Kierowca nie może czekać godzinę. Dlatego kontrola ma dwa etapy: przy kierowcy i po rozpakowaniu.',
            'Kierowca nie może potwierdzać przyjęcia w imieniu sklepu — to rola osoby przyjmującej.',
          ],
        ),
      ],
    },
    {
      id: 'dokumenty',
      label: 'Dokumenty',
      title: 'Kto wystawia który dokument',
      grouping: 'solo',
      intro: 'Przy jednej dostawie pojawia się pięć dokumentów. Każdy wystawia ktoś inny i każdy służy do czego innego.',
      reading: {
        title: 'Łańcuch dokumentów dostawy',
        paragraphs: [
          'Zamówienie wysyła sklep. WZ (wydanie zewnętrzne) wystawia hurtownia, gdy towar wyjeżdża z jej magazynu. Faktura od hurtowni jest podstawą zapłaty. PZ (przyjęcie zewnętrzne) wystawia sklep, gdy przyjmuje towar na swój stan.',
          'Gdy coś się nie zgadza, sklep spisuje protokół rozbieżności. Na jego podstawie hurtownia wystawia fakturę korygującą albo wymienia towar.',
        ],
      },
      ...note(
        12,
        'Wskaż na tablicy łańcuch dokumentów. Po dopasowaniu zapytaj, który dokument jest „lustrem” którego (WZ hurtowni i PZ sklepu).',
        'Dlaczego sklep wystawia PZ, skoro ma już WZ od hurtowni?',
        'WZ to dokument hurtowni o wydaniu. PZ to własny dokument sklepu o tym, co naprawdę przyjął na stan — może się różnić od WZ.',
        'Mylenie PZ z WZ i przekonanie, że faktura zastępuje dokument magazynowy.',
        'Ustal, jak nazywa się dokument przesunięcia towaru między dwoma sklepami tej samej firmy (MM).',
      ),
      activities: [
        {
          type: 'matching',
          id: 'q-dokumenty',
          question: 'Kto wystawia dokument?',
          options: ['Sklep', 'Hurtownia'],
          rows: [
            { label: 'Zamówienie ZAM/112/10', correct: 0 },
            { label: 'WZ 1184/10 — wydanie towaru z magazynu', correct: 1 },
            { label: 'Faktura za dostawę', correct: 1 },
            { label: 'PZ — przyjęcie towaru na stan', correct: 0 },
            { label: 'Protokół rozbieżności przy przyjęciu', correct: 0, explanation: 'Spisuje go sklep, najlepiej z podpisem kierowcy albo przedstawiciela dostawcy.' },
            { label: 'Faktura korygująca na brakujący towar', correct: 1, explanation: 'Korektę wystawia sprzedawca, czyli hurtownia.' },
          ],
          explanation: 'Sklep zamawia, przyjmuje i spisuje rozbieżności. Hurtownia wydaje towar i wystawia faktury, także korygujące.',
        },
      ],
    },
    {
      id: 'kontrola',
      label: 'Kontrola',
      title: 'Po rozpakowaniu',
      grouping: 'pair',
      intro: 'Kierowca odjechał. Rozpakowujesz kartony i porównujesz towar z WZ.',
      ...note(
        15,
        'Pary czytają tabelę i układają kolejność kontroli. Potem każda para mówi, ile rozbieżności znalazła i jakiego rodzaju.',
        'Jakie cztery rodzaje rozbieżności widzicie w tej dostawie?',
        'Brak (proszek), uszkodzenie (płyn), towar niezgodny z zamówieniem (żel 250 ml), nadwyżka (worki).',
        'Pomijanie nadwyżki („skoro jest więcej, to dobrze dla nas”) i uznawanie żelu 250 ml za zgodny, bo nazwa się zgadza.',
        'Zastanówcie się, co zrobić z towarem chłodzonym, który przyjechał zbyt ciepły.',
      ),
      activities: [
        delivery,
        {
          type: 'sequence',
          id: 'q-kontrola',
          question: 'Ułóż kroki przyjęcia dostawy w kolejności.',
          items: [
            'Przy kierowcy: policz kartony i sprawdź ich stan',
            'Podpisz WZ, dopisując widoczne uszkodzenia',
            'Rozpakuj i policz sztuki według WZ',
            'Sprawdź asortyment, pojemności i daty',
            'Spisz rozbieżności w protokole',
            'Wprowadź na stan tylko towar pełnowartościowy (PZ)',
          ],
          explanation: 'Najpierw kontrola przy kierowcy, potem dokładna kontrola i dokumenty. Na stan trafia tylko towar, który rzeczywiście przyjęto.',
        },
        {
          type: 'multi',
          id: 'q-rozbieznosci',
          question: 'Które pozycje tej dostawy wymagają wpisu do protokołu?',
          options: ['Płyn do naczyń', 'Proszek do prania', 'Papier toaletowy', 'Żel pod prysznic', 'Worki na śmieci'],
          correct: [0, 1, 3, 4],
          explanation: 'Tylko papier toaletowy zgadza się z WZ. Do protokołu trafia też nadwyżka worków.',
          hint: 'Sprawdź każdy wiersz: ilość, stan i pojemność.',
        },
      ],
    },
    {
      id: 'protokol',
      label: 'Protokół',
      title: 'Protokół rozbieżności',
      grouping: 'pair',
      intro: 'Wypełnij protokół. W kolumnie „Przyjęto” wpisz tylko sztuki pełnowartościowe i zgodne z zamówieniem.',
      breakAfter: true,
      ...note(
        13,
        'Pary wypełniają protokół. Gdy skończą, przypomnij, że po przerwie rozliczają rozbieżności z hurtownią. Praca jest zapisana na urządzeniu.',
        'Dlaczego przy żelu w kolumnie „Przyjęto” jest 0, skoro w kartonie leży 18 sztuk?',
        'Bo to inny towar niż zamówiony (250 ml zamiast 400 ml). Nie przyjmujemy go na stan, dopóki dostawca nie zdecyduje.',
        'Wpisywanie różnicy bez znaku albo ze złym znakiem. Wpisywanie 24 przyjętych płynów, choć 2 są uszkodzone.',
        'Dopisz do protokołu, kto był obecny przy przyjęciu i jak udokumentowano uszkodzenia (zdjęcia).',
      ),
      activities: [
        delivery,
        {
          type: 'docForm',
          id: 'doc-protokol',
          title: 'Protokół rozbieżności nr 3/10/2026',
          context: 'Różnicę wpisz ze znakiem: brak na minusie, nadwyżka na plusie.',
          points: 6,
          doc: {
            title: 'Protokół rozbieżności przy przyjęciu dostawy',
            meta: [
              ['Do dokumentu', 'WZ 1184/10'],
              ['Data', '20.10.2026'],
            ],
            table: {
              head: ['Towar', 'Na WZ', 'Przyjęto', 'Różnica', 'Rodzaj'],
              rows: [
                ['Płyn do naczyń 1 l', '24', { f: 'pp' }, { f: 'pr' }, { f: 'pk' }],
                ['Proszek do prania 1,35 kg', '12', { f: 'sp' }, { f: 'sr' }, { f: 'sk' }],
                ['Żel pod prysznic 400 ml', '18', { f: 'zp' }, { f: 'zr' }, { f: 'zk' }],
                ['Worki na śmieci 60 l', '20', { f: 'wp' }, { f: 'wr' }, { f: 'wk' }],
              ],
            },
            footer: 'Podpisy: osoba przyjmująca, kierownik zmiany.',
          },
          fields: {
            pp: { label: 'Płyn — przyjęto', answer: 22, hint: 'Uszkodzone butelki nie są przyjęte jako pełnowartościowe.' },
            pr: { label: 'Płyn — różnica', answer: -2, hint: 'Różnica = przyjęto − na WZ.' },
            pk: { label: 'Płyn — rodzaj', kind: 'select', options: ['brak', 'uszkodzenie', 'towar niezgodny', 'nadwyżka'], answer: 'uszkodzenie', hint: 'Sprawdź, co stało się z dwiema butelkami.' },
            sp: { label: 'Proszek — przyjęto', answer: 10, hint: 'Ile opakowań proszku było w kartonie?' },
            sr: { label: 'Proszek — różnica', answer: -2, hint: 'Różnica = przyjęto − na WZ.' },
            sk: { label: 'Proszek — rodzaj', kind: 'select', options: ['brak', 'uszkodzenie', 'towar niezgodny', 'nadwyżka'], answer: 'brak', hint: 'Proszku nie było w kartonie.' },
            zp: { label: 'Żel — przyjęto', answer: 0, hint: 'Żel 250 ml to inny towar niż zamówiony 400 ml.' },
            zr: { label: 'Żel — różnica', answer: -18, hint: 'Różnica = przyjęto − na WZ.' },
            zk: { label: 'Żel — rodzaj', kind: 'select', options: ['brak', 'uszkodzenie', 'towar niezgodny', 'nadwyżka'], answer: 'towar niezgodny', hint: 'Towar jest, ale nie taki, jak w zamówieniu.' },
            wp: { label: 'Worki — przyjęto', answer: 22, hint: 'Ile opakowań worków naprawdę przyszło?' },
            wr: { label: 'Worki — różnica', answer: 2, hint: 'Nadwyżka ma znak plus.' },
            wk: { label: 'Worki — rodzaj', kind: 'select', options: ['brak', 'uszkodzenie', 'towar niezgodny', 'nadwyżka'], answer: 'nadwyżka', hint: 'Przyszło więcej, niż jest na WZ.' },
          },
          explanation: 'Cztery rozbieżności, każda innego rodzaju. Na stan sklepu (PZ) wchodzi 22 płyny, 10 proszków, 30 papierów, 0 żeli 400 ml i — po uzgodnieniu z hurtownią — 22 worki.',
        },
      ],
    },
    {
      id: 'rozliczenie',
      label: 'Rozliczenie',
      title: 'Ile jest do odzyskania',
      grouping: 'pair',
      intro: 'Po przerwie: zamiana ról w parach. Faktura z hurtowni obejmuje pełne ilości z WZ. Policz, o ile hurtownia powinna ją skorygować.',
      ...note(
        15,
        'Zamiana ról. Obliczenia w parach, potem dwa pytania wyboru. Przy żelu zapytaj, czy ktoś przyjąłby go, gdyby hurtownia dała niższą cenę.',
        'Kiedy można przyjąć żel 250 ml?',
        'Jeśli sklep świadomie się zgodzi, a hurtownia skoryguje cenę i fakturę. Bez tego sklep płaci za 400 ml, a sprzedaje 250 ml.',
        'Doliczanie wartości żelu do braków — żel nie zginął, tylko trzeba go wymienić albo zwrócić.',
        'Policz, ile sklep straciłby na marży, gdyby sprzedał żel 250 ml w cenie 400 ml, a klient by to zauważył (utrata zaufania — nie da się policzyć).',
      ),
      activities: [
        delivery,
        number('q-braki', 'Jaka jest wartość netto brakującego proszku i uszkodzonego płynu razem?', 55.4, 'Proszek: 2 × 21,50 = 43,00 zł. Płyn: 2 × 6,20 = 12,40 zł. Razem 55,40 zł netto do korekty faktury.', {
          unit: 'zł',
          mistakes: [
            { value: 43, text: 'To tylko proszek. Dolicz 2 uszkodzone butelki płynu.' },
            { value: 195.8, text: 'Doliczasz też żel. Żel nie zaginął — będzie wymieniony albo zwrócony osobno.' },
          ],
        }),
        number('q-zel', 'Jaka jest wartość netto żelu, który trzeba wymienić albo zwrócić?', 140.4, '18 × 7,80 = 140,40 zł netto.', { unit: 'zł' }),
        choice(
          'q-korekta',
          'Kto wystawia dokument, który zmniejszy kwotę faktury o brakujący proszek?',
          ['Hurtownia — fakturę korygującą', 'Drogeria — fakturę korygującą', 'Drogeria — notę korygującą na kwotę', 'Kierowca — dopisek na fakturze'],
          0,
          'Fakturę korygującą wystawia sprzedawca. Podstawą jest protokół rozbieżności przesłany przez sklep.',
          [
            null,
            'Kupujący nie może wystawić faktury korygującej do cudzej faktury.',
            'Nota korygująca kupującego służy do poprawienia pomyłek, np. w nazwie czy adresie, ale nie kwot.',
            'Dopiski kierowcy nie zmieniają faktury. Ważny jest protokół i korekta od sprzedawcy.',
          ],
        ),
        choice(
          'q-nadwyzka',
          'Co zrobić z dwoma nadprogramowymi opakowaniami worków?',
          [
            'Zgłosić hurtowni: odesłać albo dopisać do faktury',
            'Zostawić bez zgłaszania, bo pomyłka jest po stronie hurtowni',
            'Rozdać pracownikom, żeby nie zakłócały stanu w sklepie',
            'Wyrzucić, bo nie ma ich na żadnym dokumencie dostawy',
          ],
          0,
          'Towar bez dokumentu to różnica przy inwentaryzacji i problem z dostawcą. Nadwyżkę się zgłasza.',
          [
            null,
            'Hurtownia też wykryje brak u siebie. Zatrzymanie towaru bez dokumentu psuje relację i stany.',
            'To nie jest towar sklepu, dopóki nie zostanie kupiony.',
            'Wyrzucenie cudzego towaru to strata dla hurtowni i problem dla sklepu.',
          ],
        ),
      ],
    },
    {
      id: 'rozmowa',
      label: 'Rozmowa',
      title: 'Telefon do hurtowni',
      grouping: 'pair',
      intro: 'Dzwonisz do opiekuna klienta w hurtowni, pana Marka. Masz przed sobą protokół.',
      ...note(
        15,
        'Pary prowadzą rozmowę na platformie, a potem odgrywają ją na głos bez czytania (jedna osoba sklep, druga hurtownia). Zwróć uwagę na precyzję: numery dokumentów, ilości, konkretna prośba.',
        'Co musi paść w pierwszych dwóch zdaniach rozmowy?',
        'Kim jestem, z jakiego sklepu, którego dokumentu dotyczy sprawa (numer WZ) i że mam konkretne rozbieżności.',
        'Pretensje zamiast faktów. Zgadzanie się na wszystko, „żeby nie robić problemu”.',
        'Napiszcie e-mail potwierdzający ustalenia z rozmowy (3–4 zdania).',
      ),
      activities: [
        {
          type: 'dialog',
          id: 'q-telefon',
          title: 'Rozmowa z hurtownią',
          you: 'Ty',
          start: 'n1',
          nodes: {
            n1: {
              speaker: 'Pan Marek',
              text: 'Hurtownia, Marek Wójcik, słucham.',
              choices: [
                { text: 'Dzień dobry, drogeria z Ozimskiej w Opolu. Dzwonię w sprawie dzisiejszej dostawy, WZ 1184/10. Mamy cztery rozbieżności — czy mogę je podać?', next: 'n2', good: true, feedback: 'Przedstawiasz się, podajesz numer dokumentu i cel rozmowy.' },
                { text: 'Znowu przysłaliście nam nie to, co trzeba!', next: 'n2', good: false, feedback: 'Pretensja na start sprawia, że rozmówca się broni, a nie szuka rozwiązania. I nie wie jeszcze, o który dokument chodzi.' },
                { text: 'Proszę mi wysłać korektę na całą dostawę.', next: 'n2', good: false, feedback: 'Rozmówca nie wie, o jaką dostawę i jakie pozycje chodzi. Zacznij od faktów.' },
              ],
            },
            n2: {
              speaker: 'Pan Marek',
              text: 'Proszę mówić, zapisuję.',
              choices: [
                { text: 'Brakuje 2 opakowań proszku 1,35 kg, 2 butelki płynu do naczyń przyszły rozszczelnione, zamiast żelu 400 ml dostaliśmy 18 sztuk 250 ml, a worków jest 22 zamiast 20. Wszystko jest w protokole, wyślę go mailem.', next: 'n3', good: true, feedback: 'Konkretne ilości i rodzaje rozbieżności, a do tego dokument na piśmie.' },
                { text: 'No coś tam brakowało i coś było nie takie, nie pamiętam dokładnie.', next: 'n3', good: false, feedback: 'Bez ilości i nazw hurtownia nie wystawi korekty. Masz protokół — czytaj z niego.' },
              ],
            },
            n3: {
              speaker: 'Pan Marek',
              text: 'Żel 250 ml mogę wam zostawić w tej samej cenie za sztukę, dobrze?',
              choices: [
                { text: 'Nie, to inny towar niż zamówiony. Proszę o odbiór żelu 250 ml przy następnej dostawie i dowiezienie 400 ml.', next: 'n4', good: true, feedback: 'Bronisz interesu sklepu i proponujesz rozwiązanie.' },
                { text: 'Dobrze, niech zostanie, nie chcę robić problemu.', next: 'n4', good: false, feedback: 'Sklep zapłaciłby 7,80 zł za mniejszą butelkę. Cena za litr dla klienta też byłaby zupełnie inna.' },
                { text: 'To niech pan wszystko zabierze, rezygnujemy z hurtowni.', next: 'n4', good: false, feedback: 'Jedna pomyłka to powód do wyjaśnienia, a nie do zrywania współpracy w rozmowie telefonicznej.' },
              ],
            },
            n4: {
              speaker: 'Pan Marek',
              text: 'A co z workami?',
              choices: [
                { text: 'Możemy je odesłać z kierowcą albo przyjąć, jeśli dopiszecie je do faktury. Co państwo wolą?', next: 'end', good: true, feedback: 'Uczciwie zgłaszasz nadwyżkę i dajesz wybór.' },
                { text: 'Jakie worki? Nic nie było.', next: 'end', good: false, feedback: 'Nadwyżka wyjdzie przy inwentaryzacji w obu firmach. Zatajenie niszczy zaufanie.' },
              ],
            },
            end: {
              end: true,
              text: 'Ustalenia: korekta faktury na 2 proszki i 2 płyny (55,40 zł netto), wymiana żelu przy czwartkowej dostawie, worki dopisane do faktury. Potwierdź to e-mailem i dołącz protokół.',
            },
          },
        },
      ],
    },
    {
      id: 'sprawdzenie',
      label: 'Sprawdzenie',
      title: 'Nowa dostawa, nowy problem',
      grouping: 'solo',
      intro: 'Sprawdzenie na nowym przypadku i krótka notatka. Pracuj samodzielnie.',
      ...note(
        15,
        'Samodzielnie. Notatkę e-mailową przeczytaj 2–3 osobom na głos i oceń według kryteriów z platformy.',
        'Dlaczego ustalenia z telefonu trzeba potwierdzić na piśmie?',
        'Bo rozmowy się zapomina, a e-mail jest dowodem ustaleń przy korekcie faktury i ewentualnym sporze.',
        'Pisanie e-maila bez numeru dokumentu i bez kwoty.',
        'Dopisz do e-maila termin, do którego oczekujesz korekty faktury.',
      ),
      activities: [
        choice(
          'q-chlodnia',
          'Przyjeżdża dostawa jogurtów. Termometr w samochodzie pokazuje 11°C, a na etykiecie jest „przechowywać w 2–6°C”. Co robisz?',
          [
            'Zapisuję temperaturę przy kierowcy i wstrzymuję przyjęcie do decyzji kierownika',
            'Przyjmuję, bo jogurty i tak od razu trafią do chłodni w sklepie',
            'Przyjmuję połowę, a drugą połowę oddaję kierowcy na wszelki wypadek',
            'Wkładam jogurty na godzinę do zamrażarki, żeby szybko je schłodzić do właściwej temperatury',
          ],
          0,
          'Przerwany łańcuch chłodniczy to ryzyko dla zdrowia klientów. Temperaturę zapisuje się na dokumencie przy kierowcy, a decyzję podejmuje osoba odpowiedzialna.',
          [
            null,
            'Chłodnia w sklepie nie cofnie tego, co działo się w ciepłym samochodzie.',
            'Połowa dostawy jest w tej samej temperaturze co druga połowa.',
            'Zamrożenie jogurtu zmienia produkt i nie usuwa skutków przechowywania w złej temperaturze.',
          ],
        ),
        text(
          'q-mail',
          'Napisz krótki e-mail do pana Marka potwierdzający ustalenia z rozmowy.',
          'Dzień dobry, potwierdzam ustalenia z dzisiejszej rozmowy dotyczące WZ 1184/10: 1) proszę o fakturę korygującą na 2 opakowania proszku 1,35 kg i 2 płyny do naczyń 1 l, razem 55,40 zł netto; 2) żel 250 ml (18 szt.) odbierzecie przy czwartkowej dostawie i dowieziecie 400 ml; 3) 2 opakowania worków 60 l dopisujecie do faktury. W załączniku protokół rozbieżności nr 3/10/2026. Pozdrawiam, drogeria przy Ozimskiej.',
          { minLength: 60, rows: 6, criteria: ['Jest numer dokumentu WZ.', 'Są ilości i kwota korekty.', 'Każda rozbieżność ma ustalone rozwiązanie.', 'Jest załącznik: protokół.'] },
        ),
        {
          type: 'resultCard',
          id: 'karta',
          badges: [
            { min: 0, name: 'Do powtórki', text: 'Wróć do łańcucha dokumentów i do protokołu.' },
            { min: 0.6, name: 'Przyjmujesz dostawy', text: 'Popraw jeszcze rozliczenie rozbieżności z dostawcą.' },
            { min: 0.85, name: 'Bez strat na dostawie', text: 'Wiesz, co sprawdzić, co spisać i jak to rozliczyć.' },
          ],
        },
      ],
    },
  ],
  exitTicket: 'Przy kierowcy: liczba i stan kartonów, uwagi na WZ. Po rozpakowaniu: sztuki, asortyment, daty, protokół. Brak i uszkodzenie — korekta od dostawcy. Towar niezgodny — wymiana albo zwrot. Nadwyżka — zgłoszenie.',
};
