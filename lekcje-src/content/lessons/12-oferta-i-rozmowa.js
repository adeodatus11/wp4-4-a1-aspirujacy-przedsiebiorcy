import { choice, methods, note, number, text } from '../schema.js';

const offerData = {
  type: 'info',
  tone: 'case',
  title: 'Piekarnia w Oławie: koszyki śniadaniowe dla firm',
  list: [
    'Koszyk: 2 bułki, rogal, masło, dżem, owoce. Cena 40 zł brutto za sztukę.',
    'Minimalne zamówienie: 10 koszyków. Maksymalnie 40 koszyków dziennie.',
    'Rabat 5% przy zamówieniu od 30 koszyków.',
    'Odbiór w piekarni w uzgodnionym dniu od 7:30. Piekarnia nie ma samochodu dostawczego.',
    'Płatność przelewem w 7 dni od odbioru.',
    'Zapytanie klienta: firma logistyczna organizuje szkolenie dla 30 osób, odbiór we wtorek o 8:30.',
  ],
};

export default {
  id: '12',
  order: 12,
  part: 'A',
  title: 'Oferta i rozmowa z klientem',
  subtitle: 'Firma chce 30 koszyków śniadaniowych na wtorek. Przygotuj ofertę, przedstaw ją w dwie minuty i wyjaśnij, że „odbiór” to nie „dostawa”.',
  duration: 45,
  sessions: [45],
  han: ['HAN.01.4', 'HAN.02.4', 'HAN.02.9'],
  tags: ['oferta handlowa', 'prezentacja', 'nieporozumienie', 'rabat'],
  realia: [],
  audience: {
    adults:
      'Dorośli, którzy prowadzą usługi dla firm (catering, sprzątanie, naprawy), mogą od razu przygotować ofertę dla własnego klienta. Zwróć uwagę na elementy, o których często się zapomina: termin ważności oferty, warunki płatności i to, czego oferta nie obejmuje.',
  },
  format: {
    name: 'Dokument, prezentacja i odgrywanie scenek',
    student:
      'Pracujesz w piekarni w Oławie, która sprzedaje firmom koszyki śniadaniowe. Przygotujesz ofertę na 30 koszyków, przedstawisz ją i wyjaśnisz nieporozumienie z klientem.',
    teacher:
      'Lekcja łączy dokument (oferta), wystąpienie (2 minuty) i rozmowę (wyjaśnienie nieporozumienia). Kluczowe: oferta zawiera tylko to, co firma naprawdę może zrobić, a rozmowa kończy się potwierdzeniem, że klient rozumie warunki.',
    grouping: 'Trójki: sprzedawca, klient, obserwator; zamiana ról.',
    methods: [methods.przypadek, methods.feedback, methods.dialogowe],
  },
  objectives: [
    'Przygotowuję ofertę z ceną, rabatem, warunkami i terminem ważności.',
    'Przedstawiam ofertę językiem korzyści, bez obietnic bez pokrycia.',
    'Rozpoznaję i wyjaśniam nieporozumienie w rozmowie.',
  ],
  materials: ['Kalkulator', 'Stoper w telefonie do 2-minutowych prezentacji'],
  teacherGuide: {
    preparation: 'Przygotuj kartki z dwiema rolami klienta: jeden rozumie „odbiór” poprawnie, drugi myśli, że piekarnia przywiezie koszyki do biura.',
    summary:
      'Oferta to propozycja warunków: co, ile, za ile, z jakim rabatem, jak odbiór lub dostawa, jak płatność i do kiedy oferta jest ważna. Prezentacja mówi o korzyściach dla tego klienta i nie obiecuje rzeczy, których firma nie robi. Nieporozumienia wychodzą w rozmowie — trzeba je nazwać i potwierdzić, że klient rozumie warunki.',
  },
  sections: [
    {
      id: 'start',
      label: 'Koszyki',
      title: 'Co to jest oferta?',
      grouping: 'solo',
      intro: 'Firma logistyczna pyta piekarnię o koszyki śniadaniowe na szkolenie. Piekarnia odpowiada ofertą.',
      ...note(
        3,
        'Każdy odpowiada sam. Krótko: zapytanie ofertowe wysyła klient, ofertę sprzedawca, zamówienie znowu klient.',
        'Kto pisze zapytanie ofertowe, kto ofertę, a kto zamówienie?',
        'Zapytanie — klient, oferta — sprzedawca, zamówienie — klient (przyjmuje ofertę).',
        'Mylenie oferty z reklamą albo z pitchem dla inwestora.',
        'Sprawdź, co to znaczy, że oferta jest „ważna do” określonej daty.',
      ),
      activities: [
        choice(
          'q-oferta',
          'Czym jest oferta handlowa?',
          [
            'Propozycją warunków sprzedaży dla klienta',
            'Reklamą firmy wysyłaną do wszystkich klientów naraz',
            'Prezentacją dla inwestora, który ma dać firmie pieniądze',
            'Zamówieniem, które klient wysyła po przyjęciu warunków',
            'Umową sprzedaży podpisaną przez obie strony',
          ],
          0,
          'Oferta mówi klientowi: co, za ile, na jakich warunkach i do kiedy.',
          [
            null,
            'Reklama jest do wielu osób i nie zawiera warunków dla konkretnego klienta.',
            'Pitch inwestorski przekonuje do zainwestowania w firmę, a nie do zakupu.',
            'Zamówienie wysyła klient. Oferta jest wcześniej i pochodzi od sprzedawcy.',
            'Umowa powstaje dopiero wtedy, gdy klient przyjmie ofertę.',
          ],
        ),
      ],
    },
    {
      id: 'dokument',
      label: 'Oferta',
      title: 'Oferta na 30 koszyków',
      grouping: 'trio',
      intro: 'Policz cenę z rabatem i uzupełnij ofertę.',
      reading: {
        title: 'Co musi być w ofercie',
        paragraphs: ['Odbiorca, przedmiot i ilość, cena jednostkowa i łączna, rabat, sposób odbioru lub dostawy, termin i forma płatności, termin ważności oferty, kontakt. Jeśli czegoś firma nie robi (np. dostawy), lepiej to napisać wprost.'],
      },
      ...note(
        14,
        'Trójki liczą i uzupełniają ofertę. Zapytaj, czy ktoś dopisałby „dostawa gratis”, żeby oferta była atrakcyjniejsza — i co by się stało we wtorek rano.',
        'Po co w ofercie napis „odbiór w piekarni”, skoro klient i tak przyjedzie?',
        'Bo klient może zakładać dostawę. Jasny zapis zapobiega nieporozumieniu.',
        'Liczenie rabatu od wartości wszystkich koszyków bez sprawdzenia progu 30 sztuk.',
        'Przygotuj wariant oferty na 20 koszyków (bez rabatu: 800 zł).',
      ),
      activities: [
        offerData,
        {
          type: 'docForm',
          id: 'doc-oferta',
          title: 'Oferta nr 14/10/2026',
          points: 4,
          doc: {
            title: 'Oferta: koszyki śniadaniowe',
            parties: [
              ['Sprzedawca', 'Piekarnia w Oławie'],
              ['Odbiorca', 'Firma logistyczna, dział kadr'],
            ],
            table: {
              head: ['Przedmiot', 'Ilość', 'Cena brutto/szt.', 'Rabat', 'Cena po rabacie/szt.', 'Wartość brutto'],
              rows: [['Koszyk śniadaniowy', '30', '40,00 zł', '5%', { f: 'cena' }, { f: 'wartosc' }]],
            },
            after: [
              ['Odbiór', { f: 'odbior' }],
              ['Płatność', 'przelew, 7 dni od odbioru'],
              ['Oferta ważna do', { f: 'waznosc' }],
            ],
          },
          fields: {
            cena: { label: 'Cena po rabacie za sztukę', answer: 38, hint: '40 zł × 0,95.' },
            wartosc: { label: 'Wartość brutto', answer: 1140, hint: 'Cena po rabacie × 30.' },
            odbior: { label: 'Odbiór', kind: 'select', options: ['W piekarni, wtorek od 7:30', 'Dostawa do biura we wtorek o 8:30', 'Do ustalenia'], answer: 'W piekarni, wtorek od 7:30', hint: 'Piekarnia nie ma samochodu dostawczego.' },
            waznosc: { label: 'Oferta ważna do', kind: 'select', options: ['Do piątku przed wtorkiem — potrzebny czas na zakupy', 'Bezterminowo', 'Do dnia odbioru'], answer: 'Do piątku przed wtorkiem — potrzebny czas na zakupy', hint: 'Piekarnia musi wiedzieć wcześniej, ile przygotować.' },
          },
          explanation: '40 × 0,95 = 38 zł, 30 × 38 = 1140 zł. Odbiór w piekarni, bo nie ma dostawy. Termin ważności daje piekarni czas na zamówienie składników.',
        },
        number('q-limit', 'Ile koszyków najwięcej piekarnia może przygotować na jeden dzień?', 40, 'Limit to 40 dziennie. Zamówienie na 30 się mieści.', { unit: 'szt.' }),
      ],
    },
    {
      id: 'prezentacja',
      label: 'Prezentacja',
      title: 'Dwie minuty dla klienta',
      grouping: 'trio',
      intro: 'Sprzedawca przedstawia ofertę w dwie minuty. Obserwator ocenia: korzyści, konkret, brak obietnic bez pokrycia.',
      ...note(
        10,
        'Trójki: jedna osoba prezentuje 2 minuty, obserwator zapisuje jedno dobre zdanie i jedną poprawkę. Platformowe zadania robią wszyscy.',
        'Które zdanie w prezentacji najbardziej przekonuje organizatora szkolenia?',
        'Takie, które odpowiada na jego problem: „30 osób dostanie śniadanie przed rozpoczęciem szkolenia, bez Pana pracy przy zakupach”.',
        'Wymienianie składników zamiast korzyści. Dodawanie obietnic, których nie ma w ofercie.',
        'Skróć prezentację do 30 sekund.',
      ),
      activities: [
        choice(
          'q-korzysc',
          'Które zdanie w prezentacji jest najlepsze dla organizatora szkolenia?',
          [
            'Uczestnicy zjedzą przed szkoleniem, bez Pana zakupów',
            'Nasze bułki pieczemy według tradycyjnej receptury od 1998 roku',
            'Koszyk zawiera dwie bułki, rogal, masło, dżem i świeże owoce',
            'Jesteśmy najlepszą piekarnią w całym powiecie oławskim',
          ],
          0,
          'Zdanie odpowiada na potrzebę klienta: wygodne śniadanie dla grupy bez dodatkowej pracy.',
          [
            null,
            'Historia piekarni jest miła, ale nie mówi, co zyska organizator.',
            'To lista składników, czyli cechy. Korzyść to „śniadanie bez zakupów”.',
            'Ogólnik, którego nie da się sprawdzić.',
          ],
        ),
        {
          type: 'spotErrors',
          id: 'q-prezentacja',
          title: 'Notatki do prezentacji nowego sprzedawcy',
          context: 'Zaznacz zdania, których nie wolno powiedzieć klientowi.',
          lines: [
            { text: 'Przygotujemy 30 koszyków na wtorek rano.' },
            { text: 'Przywieziemy je pod drzwi o 8:30, dostawa gratis.', error: 'Piekarnia nie ma samochodu. Oferta przewiduje odbiór w piekarni.' },
            { text: 'Przy 30 koszykach cena spada do 38 zł za sztukę.' },
            { text: 'Możemy też zrobić 60 koszyków, jeśli trzeba.', error: 'Limit to 40 koszyków dziennie.' },
            { text: 'Płatność przelewem w 7 dni od odbioru.' },
            { text: 'Wszystko jest bezglutenowe.', error: 'Bułki i rogale zawierają gluten. Taka obietnica może zaszkodzić zdrowiu uczestnika.' },
          ],
          explanation: 'Trzy obietnice bez pokrycia: dostawa, 60 koszyków, „bezglutenowe”. Każda wróciłaby jako problem we wtorek.',
        },
      ],
    },
    {
      id: 'rozmowa',
      label: 'Rozmowa',
      title: 'Odbiór to nie dostawa',
      grouping: 'trio',
      intro: 'Klient przeczytał ofertę i dzwoni z pytaniami. Okaże się, że inaczej rozumie słowo „odbiór”.',
      ...note(
        12,
        'Rozmowa na platformie, potem trójki odgrywają ją z kartką „klient myśli, że będzie dostawa”. Obserwator notuje moment, w którym nieporozumienie wyszło na jaw.',
        'Po czym poznać, że klient inaczej rozumie warunki?',
        'Pyta o rzeczy, które nie pasują do oferty: „o której przyjedziecie?”, „gdzie kierowca ma zaparkować?”.',
        'Udawanie, że wszystko jasne, albo obiecywanie dostawy, żeby nie stracić zamówienia.',
        'Zaproponuj rozwiązanie, gdy klient nie może odebrać koszyków (np. zamówienie taksówki bagażowej na koszt klienta — po uzgodnieniu).',
      ),
      activities: [
        offerData,
        {
          type: 'dialog',
          id: 'q-odbior',
          title: 'Telefon od klienta',
          start: 'n1',
          nodes: {
            n1: {
              speaker: 'Klient',
              text: 'Dzień dobry, mamy Państwa ofertę. O której kierowca będzie u nas we wtorek?',
              choices: [
                { text: 'Chyba zaszło nieporozumienie: w ofercie jest odbiór w piekarni, nie mamy dostawy. Koszyki będą gotowe od 7:30.', next: 'n2', good: true, feedback: 'Nazywasz nieporozumienie od razu i spokojnie przypominasz warunki.' },
                { text: 'Około 8:30, tak jak Pan chce.', next: 'n2', good: false, feedback: 'Obiecujesz dostawę, której piekarnia nie robi. We wtorek nikt nie przyjedzie.' },
                { text: 'Przecież w ofercie jest napisane, że nie dowozimy. Trzeba było przeczytać.', next: 'n2', good: false, feedback: 'Fakt jest dobry, forma — pouczająca. Klient poczuje się zbesztany.' },
              ],
            },
            n2: {
              speaker: 'Klient',
              text: 'Aha… myślałem, że odbiór znaczy, że Państwo je przywiozą. To komplikuje sprawę.',
              choices: [
                { text: 'Rozumiem. Czy ktoś z Państwa może przyjechać o 7:30? Spakujemy koszyki w skrzynki, żeby szybko je przewieźć.', next: 'n3', good: true, feedback: 'Pokazujesz zrozumienie i pomagasz znaleźć rozwiązanie w ramach warunków.' },
                { text: 'No dobrze, jakoś je przywiozę swoim samochodem.', next: 'n3', good: false, feedback: 'Obietnica „jakoś” bez uzgodnienia z szefem i bez pewności, że się da.' },
              ],
            },
            n3: {
              speaker: 'Klient',
              text: 'Dobrze, kolega przyjedzie o 7:30. Ile to wyjdzie?',
              choices: [
                { text: '30 koszyków z rabatem 5%, czyli 38 zł za sztukę — razem 1140 zł, przelew w 7 dni od odbioru. Potwierdzi Pan zamówienie mailem do piątku?', next: 'end', good: true, feedback: 'Podsumowujesz cenę i warunki oraz prosisz o potwierdzenie na piśmie.' },
                { text: 'Jakieś 1200 zł, dogadamy się przy odbiorze.', next: 'end', good: false, feedback: 'Niedokładna kwota i brak potwierdzenia warunków to prosta droga do sporu.' },
              ],
            },
            end: { end: true, text: 'Klient potwierdza mailem: 30 koszyków, odbiór we wtorek o 7:30, 1140 zł przelewem. Nieporozumienie wyszło przed wtorkiem, a nie we wtorek rano.' },
          },
        },
      ],
    },
    {
      id: 'sprawdzenie',
      label: '50 koszyków',
      title: 'Klient chce więcej',
      grouping: 'solo',
      intro: 'Inna firma pyta o 50 koszyków na ten sam dzień.',
      ...note(
        6,
        'Samodzielnie. Zbierz 2–3 odpowiedzi otwarte i porównaj z przykładową.',
        'Jak odmówić, nie tracąc klienta?',
        'Powiedzieć, czego nie możemy, i od razu zaproponować, co możemy: 40 w tym dniu, resztę następnego dnia, albo inny termin.',
        'Obiecywanie 50 koszyków „jakoś się uda”.',
        'Zaproponuj dwa warianty dla klienta z 50 koszykami.',
      ),
      activities: [
        choice(
          'q-50',
          'Co odpowiadasz?',
          [
            'Że zrobimy 40 i proponuję inny termin lub podział',
            'Że zrobimy 50, bo to duże i ważne zamówienie dla piekarni',
            'Że nie robimy zamówień powyżej 40 koszyków i kończę rozmowę',
          ],
          0,
          'Uczciwie mówisz o limicie i proponujesz rozwiązanie w jego granicach.',
          [
            null,
            'Piekarnia nie przygotuje więcej niż 40 dziennie. Obietnica się nie spełni.',
            'Odmowa bez propozycji traci klienta, który mógł przyjąć inny wariant.',
          ],
        ),
        text(
          'q-zdanie',
          'Napisz zdanie, którym potwierdzisz z klientem warunki odbioru.',
          'Potwierdzam: 30 koszyków do odbioru w naszej piekarni we wtorek od 7:30, 1140 zł przelewem w 7 dni — czy wszystko się zgadza?',
          { criteria: ['Jest ilość, miejsce i godzina odbioru.', 'Jest kwota i płatność.', 'Na końcu jest pytanie sprawdzające.'] },
        ),
        {
          type: 'resultCard',
          id: 'karta',
          badges: [
            { min: 0, name: 'Do powtórki', text: 'Wróć do elementów oferty i do rozmowy z klientem.' },
            { min: 0.6, name: 'Oferta gotowa', text: 'Powtórz prezentację bez obietnic bez pokrycia.' },
            { min: 0.85, name: 'Bez nieporozumień', text: 'Przygotujesz ofertę, przedstawisz ją i wyjaśnisz warunki.' },
          ],
        },
      ],
    },
  ],
  exitTicket: 'Oferta: co, ile, za ile, rabat, odbiór lub dostawa, płatność, ważność. Prezentacja: korzyść dla klienta, zero obietnic bez pokrycia. Nieporozumienie: nazwij je i potwierdź warunki.',
};
