import { choice, methods, note, text } from '../schema.js';

export default {
  id: '08',
  order: 8,
  part: 'A',
  title: 'Od pytania do potrzeby klienta',
  subtitle: 'Klient mówi „szukam plecaka”. Zanim cokolwiek pokażesz, dowiedz się, do czego mu jest potrzebny.',
  duration: 45,
  sessions: [45],
  han: ['HAN.01.4', 'HAN.02.3'],
  tags: ['rozmowa sprzedażowa', 'pytania otwarte', 'potrzeba klienta'],
  realia: [],
  audience: {
    adults:
      'Dorośli często mają doświadczenie z drugiej strony lady. Zapytaj, co ich zniechęca u sprzedawców. Osoby, które sprzedają usługi (np. fryzjerstwo, naprawy), niech zamiast plecaków przećwiczą rozmowę o własnej usłudze: te same pytania o sytuację, wcześniejsze problemy i ograniczenia.',
  },
  format: {
    name: 'Symulacja rozmowy i ćwiczenie w trójkach',
    student:
      'Jesteś sprzedawcą lub sprzedawczynią w sklepie turystycznym. Ułożysz pytania, przeprowadzisz rozmowę z klientem i dobierzesz plecak do jego potrzeby — z argumentem opartym na tym, co powiedział.',
    teacher:
      'Na platformie uczniowie najpierw ćwiczą rodzaje pytań i przechodzą symulowaną rozmowę. Potem, jeśli jest czas, odgrywają ją w trójkach: klient, sprzedawca, obserwator. Najważniejsze: propozycja ma wynikać z wypowiedzi klienta, a nie z ceny czy wyglądu.',
    grouping: 'Trójki: klient, sprzedawca, obserwator. Bez trójki — samodzielnie na platformie.',
    methods: [methods.przypadek, methods.feedback, methods.dialogowe],
  },
  objectives: [
    'Rozróżniam pytania otwarte, zamknięte i sugerujące.',
    'Prowadzę rozmowę od sytuacji klienta do jego potrzeby.',
    'Dobieram towar i argument do tego, co powiedział klient.',
  ],
  materials: ['Kartki z rolami do odgrywania (klient A, B, C) — można zapisać na tablicy'],
  teacherGuide: {
    preparation:
      'Przygotuj trzy karteczki z potrzebami klientów: A — dojeżdża rowerem z laptopem, B — szuka lekkiego plecaka na krótkie spacery, C — planuje całodniowe wycieczki w góry, budżet do 150 zł. Osoba grająca klienta zdradza potrzebę dopiero, gdy padną dobre pytania.',
    summary:
      'Rozmowa zaczyna się od pytań otwartych o sytuację, potem dopytuje o wcześniejsze problemy i ograniczenia (budżet, waga). Propozycja odwołuje się do tego, co klient powiedział, i uczciwie mówi o ograniczeniach towaru. Pytania sugerujące i zgadywanie potrzeby po wyglądzie psują rozmowę.',
  },
  sections: [
    {
      id: 'pytania',
      label: 'Trzy plecaki',
      title: 'Pierwsze pytanie i lejek pytań',
      grouping: 'solo',
      intro: 'Sklep turystyczny w Krakowie ma trzy plecaki: Miejski (99 zł, lekki, bez osłony przeciwdeszczowej), Dojazd (149 zł, przegroda na laptop, pokrowiec przeciwdeszczowy) i Trek (219 zł, duży, z pasem biodrowym). Wchodzi klientka i mówi: „Szukam plecaka”. Pytanie otwarte zaczyna się zwykle od „jak”, „do czego”, „co”, „kiedy”; zamknięte daje odpowiedź „tak” albo „nie”; sugerujące podpowiada odpowiedź.',
      reading: {
        title: 'Lejek pytań',
        paragraphs: [
          'Zaczynasz od pytań otwartych o sytuację („Jak zwykle Pani podróżuje?”). Potem pytasz o wcześniejsze doświadczenia („Co przeszkadzało w poprzednim plecaku?”) i ograniczenia („Co jest ważniejsze: waga czy pojemność?”). Pytania zamknięte przydają się na końcu, do potwierdzenia: „Czyli najważniejsza jest ochrona laptopa przed deszczem?”.',
        ],
      },
      ...note(
        15,
        'Najpierw każdy sam wybiera pierwsze pytanie do klientki, potem lektura o lejku pytań. Lektura i dopasowanie. Przy pytaniu „Ten będzie najlepszy, prawda?” poproś o przerobienie go na otwarte.',
        'Jak zamienić pytanie „Lubi Pani chodzić po górach?” na otwarte?',
        '„Gdzie najczęściej Pani chodzi albo jeździ?”, „Jak wygląda Pani typowa wycieczka?”',
        'Uznawanie każdego pytania z „czy” za złe. Zamknięte są dobre do potwierdzenia.',
        'Ułóż trzy pytania otwarte dla klienta, który kupuje buty do biegania.',
      ),
      activities: [
        choice(
          'q-pierwsze',
          'Które pytanie najlepiej otwiera rozmowę?',
          [
            'Do czego będzie Pani używać plecaka?',
            'Szuka Pani czegoś raczej taniego czy markowego na dłużej?',
            'Podoba się Pani ten czerwony model z wystawy przy wejściu?',
            'Ile może Pani dziś wydać na nowy plecak w naszym sklepie?',
            'Czy mogę w czymś pomóc?',
          ],
          0,
          'Pytanie otwarte o sytuację pozwala klientce opowiedzieć o potrzebie. Budżet i model przyjdą później.',
          [
            null,
            'To pytanie zamknięte z sugestią — klientka wybiera z dwóch opcji, które podsunął sprzedawca.',
            'Pokazujesz produkt, zanim wiesz, do czego ma służyć.',
            'Budżet jest ważny, ale na start zawęża rozmowę do ceny.',
            'Na takie pytanie zwykle pada „nie, dziękuję, tylko się rozglądam” i rozmowa się kończy.',
          ],
        ),
        {
          type: 'matching',
          id: 'q-rodzaje',
          question: 'Jakie to pytanie?',
          options: ['Otwarte', 'Zamknięte', 'Sugerujące'],
          rows: [
            { label: 'Co zwykle zabiera Pani ze sobą?', correct: 0 },
            { label: 'Czy plecak ma mieć przegrodę na laptop?', correct: 1 },
            { label: 'Ten będzie najlepszy, prawda?', correct: 2 },
            { label: 'Jak wygląda Pani zwykły dzień z plecakiem?', correct: 0 },
            { label: 'Woli Pani pewnie coś droższego, ale porządnego?', correct: 2 },
            { label: 'Czyli ważniejsza jest waga niż pojemność?', correct: 1, explanation: 'Zamknięte pytanie podsumowujące — dobre na koniec rozmowy.' },
          ],
          explanation: 'Otwarte zbierają informacje, zamknięte je potwierdzają, sugerujące podsuwają gotową odpowiedź.',
        },
      ],
    },
    {
      id: 'rozmowa',
      label: 'Rozmowa',
      title: 'Klient z rowerem',
      grouping: 'trio',
      intro: 'Przeprowadź rozmowę z klientem. Wybieraj odpowiedzi tak, jak w prawdziwej rozmowie — najpierw rozpoznanie, potem propozycja.',
      ...note(
        15,
        'Najpierw rozmowa na platformie (5 minut). Potem trójki odgrywają ją na żywo z kartkami A, B i C: każda runda 3 minuty, obserwator zapisuje jedno dobre pytanie i jedną poprawkę, zamiana ról.',
        'Które pytanie w rozmowie dało najwięcej informacji?',
        'Pytanie o to, co przeszkadzało w poprzednim plecaku — ujawnia problem (laptop obijał się, zamókł).',
        'Proponowanie najdroższego plecaka „bo największy”. Obiecywanie cech, których produkt nie ma (wodoodporność).',
        'Klient zmienia budżet po prezentacji. Jak zmienić propozycję, nie obiecując rabatu?',
      ),
      activities: [
        {
          type: 'dialog',
          id: 'q-rozmowa',
          title: 'Rozmowa przy regale z plecakami',
          start: 'n1',
          nodes: {
            n1: {
              speaker: 'Klient',
              text: 'Dzień dobry, szukam plecaka.',
              choices: [
                { text: 'Dzień dobry. Do czego będzie go Pan najczęściej używał?', next: 'n2', good: true, feedback: 'Pytanie otwarte o sytuację.' },
                { text: 'Mamy promocję na Trek, 219 zł, świetny model!', next: 'n2', good: false, feedback: 'Proponujesz produkt, zanim wiesz, do czego ma służyć.' },
                { text: 'Duży czy mały?', next: 'n2', good: false, feedback: 'Zamknięte pytanie na start ogranicza rozmowę do jednej cechy.' },
              ],
            },
            n2: {
              speaker: 'Klient',
              text: 'Codziennie dojeżdżam rowerem do pracy.',
              choices: [
                { text: 'Co zwykle Pan ze sobą zabiera?', next: 'n3', good: true, feedback: 'Dopytujesz o szczegóły zamiast zgadywać.' },
                { text: 'To na pewno lekki Miejski, rowerzyści lubią lekkie.', next: 'n3', good: false, feedback: 'Zgadujesz potrzebę na podstawie stereotypu.' },
              ],
            },
            n3: {
              speaker: 'Klient',
              text: 'Laptop, drugie śniadanie, czasem kurtkę.',
              choices: [
                { text: 'A co przeszkadzało Panu w poprzednim plecaku?', next: 'n4', good: true, feedback: 'Pytanie o wcześniejsze doświadczenie ujawnia problem.' },
                { text: 'Laptop? To Trek, jest największy.', next: 'n4', good: false, feedback: 'Pojemność to nie wszystko. Nie wiesz jeszcze, czego klientowi brakowało.' },
              ],
            },
            n4: {
              speaker: 'Klient',
              text: 'Laptop obijał się o plecy, a raz cały plecak zamókł w deszczu.',
              choices: [
                { text: 'Czyli ważne są ochrona laptopa i deszcz. Proponuję Dojazd: ma przegrodę na laptop i pokrowiec przeciwdeszczowy.', next: 'n5', good: true, feedback: 'Podsumowujesz potrzebę i dobierasz argumenty do niej.' },
                { text: 'Wszystkie nasze plecaki są wodoodporne, proszę wybrać dowolny.', next: 'n5', good: false, feedback: 'To nieprawda — Miejski nie ma osłony przeciwdeszczowej. Obietnica bez pokrycia wróci jako reklamacja.' },
              ],
            },
            n5: {
              speaker: 'Klient',
              text: '149 zł… trochę dużo.',
              choices: [
                { text: 'Miejski kosztuje 99 zł, ale nie ma przegrody ani pokrowca, więc problem z deszczem by wrócił. Może Pan porównać oba.', next: 'end', good: true, feedback: 'Pokazujesz tańszą opcję uczciwie, z jej ograniczeniem. Decyzja zostaje przy kliencie.' },
                { text: 'Dam Panu 30% rabatu, żeby Pan nie wychodził.', next: 'end', good: false, feedback: 'Rabat bez uprawnień i bez powodu obniża marżę sklepu. Klient nie dowiedział się, za co płaci.' },
                { text: 'To niech Pan poszuka taniej w internecie.', next: 'end', good: false, feedback: 'Kończysz rozmowę, zamiast pokazać wartość albo alternatywę.' },
              ],
            },
            end: { end: true, text: 'Klient przymierza Dojazd i pyta o pokrowiec. Propozycja wynikała z tego, co powiedział, a nie z ceny czy wyglądu.' },
          },
        },
        choice(
          'q-klient-b',
          'Klientka B mówi: „Chodzę na krótkie spacery z psem, plecak ma być jak najlżejszy”. Co proponujesz?',
          ['Miejski', 'Dojazd', 'Trek'],
          0,
          'Miejski jest najlżejszy. Klientka nie wspomniała o deszczu ani o laptopie.',
          [
            null,
            'Dojazd ma przegrodę na laptop i pokrowiec — tego klientka nie potrzebuje, a płaci więcej i nosi większą wagę.',
            'Trek jest duży i cięższy. Klientka mówi, że waga jest najważniejsza.',
          ],
        ),
      ],
    },
    {
      id: 'argument',
      label: 'Argument',
      title: 'Potrzeba, dowód, propozycja',
      grouping: 'trio',
      intro: 'Dobry argument ma trzy części: potrzebę, dowód z wypowiedzi klienta i cechę produktu, która na tę potrzebę odpowiada.',
      ...note(
        8,
        'Obserwatorzy z trójek czytają zapisane argumenty. Grupa ocenia: czy jest dowód z wypowiedzi klienta?',
        'Czym różni się „ten plecak jest świetny” od „pokrowiec ochroni laptop w deszczu, o którym Pan mówił”?',
        'Pierwsze to ogólnik. Drugie odwołuje się do problemu klienta i konkretnej cechy.',
        'Mieszanie faktów z domysłami („pewnie jeździ Pan szybko”).',
        'Dodaj do argumentu jedno uczciwe ograniczenie produktu.',
      ),
      activities: [
        choice(
          'q-dowod',
          'Które zdanie opiera się na tym, co powiedział klient A?',
          [
            'Pokrowiec osłoni laptop przed deszczem',
            'Ten plecak jest bestsellerem, kupuje go wielu klientów',
            'Wygląda Pan na kogoś, kto lubi solidne i drogie rzeczy',
            'To najlepszy plecak na rynku w tej cenie',
          ],
          0,
          'Argument odwołuje się do problemu, o którym klient sam opowiedział.',
          [
            null,
            'Popularność nie mówi, czy plecak rozwiąże problem tego klienta.',
            'To domysł na podstawie wyglądu, nie dowód z rozmowy.',
            'Ogólnik bez związku z potrzebą klienta i bez możliwości sprawdzenia.',
          ],
        ),
        text(
          'q-zapis',
          'Zapisz dla klienta A: potrzebę, dowód z jego wypowiedzi i propozycję z jednym ograniczeniem.',
          'Potrzeba: ochrona laptopa w drodze rowerem, także w deszczu. Dowód: „laptop obijał się o plecy, a raz plecak zamókł”. Propozycja: Dojazd — przegroda na laptop i pokrowiec przeciwdeszczowy. Ograniczenie: sam plecak bez pokrowca nie jest wodoodporny, pokrowiec trzeba założyć.',
          { minLength: 40, criteria: ['Potrzeba jest nazwana.', 'Jest cytat lub fakt z rozmowy.', 'Jest uczciwe ograniczenie.'] },
        ),
      ],
    },
    {
      id: 'sprawdzenie',
      label: 'Klient C',
      title: 'Klient C',
      grouping: 'solo',
      intro: 'Klient C planuje całodniowe wycieczki w góry. Ma budżet do 150 zł.',
      ...note(
        7,
        'Samodzielnie. Zapytaj na koniec, kto zaproponowałby Trek mimo budżetu i jak by to powiedział.',
        'Co jest uczciwsze: sprzedać Dojazd w budżecie czy pokazać Trek i powiedzieć, czemu kosztuje więcej?',
        'Pokazać Trek z uzasadnieniem i Dojazd jako alternatywę w budżecie, z jego ograniczeniami. Decyzja należy do klienta.',
        'Wciskanie najdroższego produktu albo przemilczanie, że tańszy nie pasuje do potrzeby.',
        'Ułóż jedno zdanie, którym przedstawisz klientowi obie opcje.',
      ),
      activities: [
        choice(
          'q-klient-c',
          'Co robisz?',
          [
            'Pokazuję Trek z uzasadnieniem dopłaty i Dojazd z jego ograniczeniami',
            'Proponuję tylko Dojazd, bo mieści się w budżecie, i nie wspominam o Treku',
            'Sprzedaję Trek, bo w górach klient i tak zrozumie, że było warto dopłacić',
            'Daję rabat na Trek, żeby zmieścił się w budżecie, bez pytania kierownika',
          ],
          0,
          'Uczciwie pokazujesz, co najlepiej pasuje do potrzeby i ile kosztuje, oraz najlepszą opcję w budżecie. Klient decyduje.',
          [
            null,
            'Przemilczasz, że Dojazd nie ma pasa biodrowego i mniejszej pojemności na cały dzień w górach.',
            'Ignorujesz budżet, który klient sam podał.',
            'Rabatu nie dajesz bez uprawnień.',
          ],
        ),
        {
          type: 'resultCard',
          id: 'karta',
          badges: [
            { min: 0, name: 'Do powtórki', text: 'Wróć do rodzajów pytań i przejdź rozmowę jeszcze raz.' },
            { min: 0.6, name: 'Słuchasz klienta', text: 'Powtórz budowanie argumentu z dowodem.' },
            { min: 0.85, name: 'Doradca przy półce', text: 'Rozpoznajesz potrzebę i dobierasz do niej towar.' },
          ],
        },
      ],
    },
  ],
  exitTicket: 'Najpierw pytania otwarte o sytuację, potem o wcześniejsze problemy i ograniczenia. Propozycja = potrzeba + dowód z rozmowy + cecha produktu + uczciwe ograniczenie.',
};
