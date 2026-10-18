import { choice, methods, note, number, text } from '../schema.js';

const campaign = {
  type: 'info',
  tone: 'case',
  title: 'Serwis rowerowy na Jeżycach w Poznaniu: kampania „Przegląd wiosenny”',
  paragraphs: ['Przegląd kosztuje klienta 50 zł netto. Czas mechanika i materiały kosztują serwis 35 zł, więc na jednym przeglądzie zostaje 15 zł.'],
  table: {
    head: ['', 'Plan', 'Wykonanie'],
    rows: [
      ['Wydatki na reklamę', '300 zł', '360 zł'],
      ['Liczba przeglądów z kampanii', '30', '24'],
      ['Przychód z przeglądów', '1500 zł', '1200 zł'],
    ],
  },
};

const channels = {
  type: 'info',
  tone: 'case',
  title: 'Kanały na kolejny test (budżet do 200 zł)',
  table: {
    head: ['Kanał', 'Koszt', 'Jak zmierzyć efekt'],
    rows: [
      ['Plakaty w 5 sklepach osiedlowych', '60 zł za druk', 'Kod „PLAKAT” przy zapisie na przegląd'],
      ['Reklama w mediach społecznościowych, zasięg do 3 km', '20 zł dziennie', 'Zapisy z linku w reklamie'],
      ['Benefit dla pracowników pobliskiej firmy: −5 zł na przegląd', '0 zł reklamy, 5 zł mniej z każdego przeglądu', 'Kod firmowy przy zapisie'],
    ],
  },
};

export default {
  id: '16',
  order: 16,
  part: 'B',
  title: 'Plan promocji i kontrola budżetu',
  subtitle: 'Kampania kosztowała więcej i przyniosła mniej klientów, niż planowano. Ile naprawdę zarobił serwis i jak zaplanować następny test za 200 zł.',
  duration: 90,
  sessions: [45, 45],
  han: ['HAN.02.3'],
  tags: ['budżet', 'odchylenie', 'koszt pozyskania klienta', 'plan promocji'],
  realia: [],
  audience: {
    adults:
      'Osoby prowadzące firmę zwykle wydają na reklamę „na wyczucie”. Ta lekcja pokazuje prosty rachunek: koszt pozyskania jednego klienta i wynik kampanii po kosztach usługi. Poproś, żeby policzyli to samo dla swojej ostatniej reklamy — nawet z przybliżonymi danymi.',
  },
  format: {
    name: 'Analiza planu i wykonania, potem plan testu',
    student:
      'Pomagasz serwisowi rowerowemu w Poznaniu ocenić wiosenną kampanię i zaplanować następną. Policzysz odchylenia od planu, koszt pozyskania klienta i wynik kampanii, a potem przygotujesz tygodniowy plan za 200 zł.',
    teacher:
      'Pierwsza lekcja to liczby: odchylenia, koszt pozyskania i wynik. Najważniejsze odkrycie: kampania przyniosła 1200 zł przychodu, ale serwis wyszedł na zero. Druga lekcja to plan: jeden kanał, jeden miernik, budżet i harmonogram.',
    grouping: 'Po przerwie zamiana par.',
    methods: [methods.przypadek, methods.przyklady, methods.metapoznanie],
  },
  objectives: [
    'Liczę odchylenie wykonania od planu w złotych i procentach.',
    'Liczę koszt pozyskania jednego klienta.',
    'Odróżniam przychód z kampanii od jej wyniku.',
    'Planuję test promocji: kanał, budżet, harmonogram i miernik.',
  ],
  materials: ['Kalkulator'],
  teacherGuide: {
    preparation: 'Zapisz na tablicy dwa wzory: odchylenie % = (wykonanie − plan) ÷ plan × 100%; koszt pozyskania = wydatki ÷ liczba klientów.',
    summary:
      'Procent odchylenia liczy się od planu. Koszt pozyskania klienta to wydatki na reklamę podzielone przez liczbę klientów z kampanii. Przychód to nie zysk: po odjęciu kosztu usługi i reklamy kampania może wyjść na zero. Dobry test zmienia jedną rzecz, ma budżet, harmonogram i sposób pomiaru.',
  },
  sections: [
    {
      id: 'start',
      label: 'Kampania',
      title: '1200 zł z kampanii',
      grouping: 'solo',
      intro: 'Właściciel serwisu mówi: „Kampania przyniosła 1200 zł, czyli zarobiliśmy 1200 zł”.',
      ...note(
        5,
        'Każdy odpowiada sam. Krótko: przychód to wpływy ze sprzedaży, zysk to przychód minus koszty.',
        'Jakie koszty trzeba odjąć od 1200 zł?',
        'Koszt wykonania przeglądów (czas mechanika, materiały) i koszt reklamy.',
        'Utożsamianie przychodu z zyskiem.',
        'Zgadnij, ile serwis naprawdę zarobił. Sprawdzimy to przy liczeniu wyniku.',
      ),
      activities: [
        choice(
          'q-przychod',
          'Czy właściciel ma rację?',
          [
            'Nie: od przychodu trzeba odjąć koszt usług i reklamy',
            'Tak, bo przychód to pieniądze, które wpłynęły do serwisu',
            'Tak, bo koszty reklamy zapłacono już wcześniej, przed kampanią',
          ],
          0,
          '1200 zł to przychód. Zarobek to przychód minus koszt wykonania przeglądów i reklamy.',
          [
            null,
            'Wpłynęło 1200 zł, ale część tych pieniędzy pokrywa koszty.',
            'Termin zapłaty nie zmienia tego, że reklama jest kosztem kampanii.',
          ],
        ),
      ],
    },
    {
      id: 'odchylenia',
      label: 'Odchylenia',
      title: 'Plan i wykonanie',
      grouping: 'pair',
      intro: 'Porównaj plan z wykonaniem. Procent liczysz zawsze od planu.',
      reading: {
        example: {
          question: 'O ile procent wydatki przekroczyły plan?',
          steps: ['Odchylenie w złotych: 360 − 300 = +60 zł.', 'Odchylenie w procentach: 60 ÷ 300 × 100% = +20%.', 'Znak plus: wykonanie wyższe niż plan.'],
          answer: '+60 zł, czyli +20%.',
        },
      },
      ...note(
        15,
        'Przykład razem, potem pary uzupełniają tabelę. Zapytaj, dlaczego przychód i liczba przeglądów spadły o ten sam procent.',
        'Dlaczego przychód spadł o tyle samo procent co liczba przeglądów?',
        'Bo każdy przegląd kosztuje tyle samo (50 zł). Przychód = liczba × cena.',
        'Dzielenie przez wykonanie zamiast przez plan. Pomijanie znaku minus.',
        'Policz odchylenie, gdyby wykonano 33 przeglądy (+10%).',
      ),
      activities: [
        campaign,
        {
          type: 'docForm',
          id: 'doc-odchylenia',
          title: 'Plan i wykonanie kampanii',
          context: 'Wpisuj wartości ze znakiem (+ lub −).',
          points: 6,
          doc: {
            title: 'Analiza odchyleń — kampania „Przegląd wiosenny”',
            table: {
              head: ['', 'Plan', 'Wykonanie', 'Odchylenie', 'Odchylenie %'],
              rows: [
                ['Wydatki na reklamę', '300 zł', '360 zł', { f: 'wz' }, { f: 'wp' }],
                ['Liczba przeglądów', '30', '24', { f: 'lz' }, { f: 'lp' }],
                ['Przychód', '1500 zł', '1200 zł', { f: 'pz' }, { f: 'pp' }],
              ],
            },
          },
          fields: {
            wz: { label: 'Wydatki — odchylenie', answer: 60, hint: 'Wykonanie − plan.' },
            wp: { label: 'Wydatki — odchylenie %', answer: 20, hint: 'Odchylenie ÷ plan × 100%.' },
            lz: { label: 'Przeglądy — odchylenie', answer: -6, hint: 'Wykonanie − plan; wynik ujemny.' },
            lp: { label: 'Przeglądy — odchylenie %', answer: -20, hint: 'Odchylenie ÷ plan × 100%, ze znakiem minus.' },
            pz: { label: 'Przychód — odchylenie', answer: -300, hint: 'Wykonanie − plan.' },
            pp: { label: 'Przychód — odchylenie %', answer: -20, hint: 'Odchylenie ÷ plan × 100%.' },
          },
          explanation: 'Wydatki +60 zł (+20%), przeglądy −6 (−20%), przychód −300 zł (−20%). Kampania kosztowała więcej i dała mniej.',
        },
      ],
    },
    {
      id: 'koszt-klienta',
      label: 'Koszt klienta',
      title: 'Ile kosztował jeden klient?',
      grouping: 'solo',
      intro: 'Koszt pozyskania klienta = wydatki na reklamę ÷ liczba klientów z kampanii.',
      ...note(
        12,
        'Pary liczą. Zapytaj: czy wzrost kosztu klienta z 10 do 15 zł to dużo, skoro przegląd kosztuje 50 zł?',
        'Kiedy koszt pozyskania klienta jest za wysoki?',
        'Gdy jest równy albo większy niż to, co serwis zarabia na kliencie (tu 15 zł). Wtedy kampania nie przynosi zarobku.',
        'Porównywanie kosztu pozyskania z ceną usługi (50 zł) zamiast z zarobkiem (15 zł).',
        'Policz, przy ilu przeglądach koszt pozyskania wyniósłby 12 zł (30).',
      ),
      activities: [
        campaign,
        number('q-cpa', 'Ile kosztowało pozyskanie jednego klienta w wykonaniu?', 15, '360 zł ÷ 24 przeglądy = 15 zł. W planie: 300 ÷ 30 = 10 zł.', {
          unit: 'zł',
          mistakes: [{ value: 10, text: 'To koszt z planu. Policz dla wykonania: 360 ÷ 24.' }],
        }),
        number('q-cpa-zmiana', 'O ile procent wzrósł koszt pozyskania klienta względem planu?', 50, '(15 − 10) ÷ 10 × 100% = 50%.', {
          unit: '%',
          mistakes: [{ value: 33.33, text: 'Dzielisz przez 15. Procent zmiany liczysz od planu, czyli 10 zł.' }],
        }),
        choice(
          'q-cpa-ocena',
          'Serwis zarabia 15 zł na przeglądzie. Co oznacza koszt pozyskania 15 zł?',
          [
            'Że cały zarobek z przeglądu poszedł na reklamę',
            'Że kampania była bardzo udana, bo przegląd kosztuje 50 zł',
            'Że koszt jest niski, bo jest mniejszy niż cena przeglądu',
          ],
          0,
          'Koszt klienta (15 zł) równa się zarobkowi na kliencie (15 zł). Kampania nic nie zarobiła.',
          [
            null,
            'Cena 50 zł to przychód. Liczy się zarobek po kosztach, czyli 15 zł.',
            'Porównuje się z zarobkiem, a nie z ceną.',
          ],
        ),
      ],
    },
    {
      id: 'wynik',
      label: 'Wynik',
      title: 'Ile zarobiła kampania?',
      grouping: 'pair',
      intro: 'Wynik kampanii = liczba przeglądów × zarobek na przeglądzie − wydatki na reklamę.',
      breakAfter: true,
      ...note(
        13,
        'Pary liczą wynik. Zapytaj, kto na początku zgadywał, że serwis zarobił 1200 zł. Po przerwie planujecie następny test.',
        'Czy wynik zero oznacza, że kampania była zupełnie bezwartościowa?',
        'Nie zarobiła, ale przyniosła 24 klientów, z których część może wrócić. Trzeba jednak poprawić koszt pozyskania.',
        'Odejmowanie reklamy od przychodu bez odjęcia kosztu usług (1200 − 360 = 840 zł).',
        'Policz wynik z planu (30 × 15 − 300 = 150 zł).',
      ),
      activities: [
        campaign,
        number('q-wynik', 'Ile zarobiła kampania w wykonaniu?', 0, '24 × 15 zł = 360 zł zarobku na przeglądach. Minus 360 zł reklamy = 0 zł.', {
          unit: 'zł',
          mistakes: [
            { value: 840, text: 'Od przychodu odjęto tylko reklamę. Trzeba też odjąć koszt wykonania przeglądów (35 zł za sztukę).' },
            { value: 360, text: 'To zarobek na przeglądach przed odjęciem wydatków na reklamę.' },
          ],
        }),
        choice(
          'q-wniosek',
          'Jaki wniosek dla następnej kampanii?',
          [
            'Obniżyć koszt pozyskania klienta: tańszy kanał lub lepszy przekaz',
            'Zwiększyć budżet reklamy, bo więcej reklamy to więcej klientów',
            'Zrezygnować z promocji, bo każda reklama się nie opłaca',
            'Zmienić naraz cenę, kanał, przekaz i grupę docelową',
          ],
          0,
          'Problemem jest koszt jednego klienta. Następny test powinien go obniżyć.',
          [
            null,
            'Więcej pieniędzy przy tym samym koszcie klienta nie da zarobku.',
            'Ta kampania wyszła na zero, a nie na minus. Warto testować dalej, taniej.',
            'Gdy zmienisz wszystko naraz, nie dowiesz się, co zadziałało.',
          ],
        ),
      ],
    },
    {
      id: 'kanaly',
      label: 'Kanał',
      title: 'Następny test za 200 zł',
      grouping: 'pair',
      intro: 'Serwis ma do 200 zł na tydzień testu w maju. Po przerwie zmieńcie pary.',
      ...note(
        15,
        'Pary wybierają kanał i układają kroki planu. Przy benefitach dla firmy zapytaj: czy rabat 5 zł to też koszt? (Tak — zmniejsza zarobek z 15 do 10 zł.)',
        'Dlaczego test ma mieć tylko jeden nowy kanał?',
        'Żeby wiedzieć, który kanał przyniósł klientów i ile każdy kosztował.',
        'Wybieranie wszystkich kanałów naraz bez sposobu pomiaru.',
        'Policz koszt pozyskania klienta przy benefitach dla firmy, jeśli przyjdzie 12 osób (rabat 5 zł × 12 = 60 zł, czyli 5 zł na klienta).',
      ),
      activities: [
        channels,
        choice(
          'q-kanal',
          'Który plan testu jest najlepszy?',
          [
            'Plakaty z kodem i 5 dni reklamy po 20 zł, osobno mierzone',
            'Reklama codziennie przez 10 dni, 20 zł dziennie, bez kodów',
            'Wszystkie trzy kanały naraz i liczenie klientów razem',
            'Plakaty w 5 sklepach bez kodu, żeby nie zniechęcać klientów',
          ],
          0,
          'Mieści się w budżecie (60 + 100 = 160 zł), a każdy kanał ma własny sposób pomiaru.',
          [
            null,
            '10 × 20 = 200 zł, ale bez kodu nie wiadomo, skąd przyszli klienci.',
            'Wszystko naraz bez rozdzielenia — nie wiadomo, co zadziałało.',
            'Bez kodu nie zmierzysz efektu plakatów.',
          ],
        ),
        {
          type: 'sequence',
          id: 'q-kroki',
          question: 'Ułóż kroki planowania promocji.',
          items: ['Cel: ilu klientów i w jakim czasie', 'Grupa docelowa', 'Kanał i przekaz', 'Budżet i harmonogram', 'Sposób pomiaru', 'Ocena po teście'],
          explanation: 'Od celu do oceny. Miernik ustala się przed startem, a nie po fakcie.',
        },
      ],
    },
    {
      id: 'harmonogram',
      label: 'Harmonogram',
      title: 'Tydzień testu',
      grouping: 'trio',
      intro: 'Uzupełnij harmonogram testu: plakaty w poniedziałek, reklama od środy do niedzieli po 20 zł dziennie.',
      ...note(
        15,
        'Pary uzupełniają harmonogram. Zapytaj, kiedy serwis powinien ocenić test (po tygodniu, według kodów).',
        'Co zapiszecie na koniec testu?',
        'Liczbę przeglądów z kodem PLAKAT i z linku, koszt każdego kanału, koszt pozyskania klienta dla każdego kanału.',
        'Brak daty oceny i osoby odpowiedzialnej.',
        'Dopisz osobę odpowiedzialną za każdą czynność.',
      ),
      activities: [
        {
          type: 'docForm',
          id: 'doc-harmonogram',
          title: 'Harmonogram testu, 11–17 maja',
          points: 3,
          doc: {
            title: 'Plan promocji — tydzień testu',
            table: {
              head: ['Dzień', 'Działanie', 'Koszt'],
              rows: [
                ['Poniedziałek', 'Druk plakatów z kodem PLAKAT', '60 zł'],
                ['Wtorek', 'Rozwieszenie w 5 sklepach', '0 zł'],
                ['Środa–niedziela', 'Reklama do 3 km, 20 zł dziennie', { f: 'reklama' }],
                ['Razem', '', { f: 'suma' }],
              ],
            },
            after: [['Czy mieści się w 200 zł?', { f: 'budzet' }]],
          },
          fields: {
            reklama: { label: 'Koszt reklamy środa–niedziela', answer: 100, hint: '5 dni × 20 zł.' },
            suma: { label: 'Koszt razem', answer: 160, hint: '60 + 0 + koszt reklamy.' },
            budzet: { label: 'Czy mieści się w budżecie', kind: 'select', options: ['tak, zostaje 40 zł rezerwy', 'nie, przekracza budżet', 'dokładnie 200 zł'], answer: 'tak, zostaje 40 zł rezerwy', hint: '200 − suma.' },
          },
          explanation: '5 × 20 = 100 zł reklamy, razem 160 zł. Zostaje 40 zł rezerwy, np. na dodruk plakatów.',
        },
      ],
    },
    {
      id: 'sprawdzenie',
      label: 'Po tygodniu',
      title: 'Wyniki testu',
      grouping: 'solo',
      intro: 'Po tygodniu: kod PLAKAT — 8 przeglądów, link z reklamy — 4 przeglądy. Plakaty kosztowały 60 zł, reklama 100 zł.',
      ...note(
        15,
        'Samodzielnie. Rekomendacje 2–3 osób przeczytaj na głos: czy opierają się na liczbach z testu?',
        'Który kanał wybierzecie na czerwiec i dlaczego?',
        'Plakaty: 60 zł ÷ 8 = 7,50 zł za klienta, mniej niż 15 zł zarobku. Reklama: 100 ÷ 4 = 25 zł za klienta — więcej, niż serwis zarabia.',
        'Ocenianie kanału po liczbie klientów, a nie po koszcie jednego klienta.',
        'Zaplanuj czerwcowy test z rezerwą 40 zł.',
      ),
      activities: [
        number('q-plakat', 'Ile kosztowało pozyskanie jednego klienta z plakatów?', 7.5, '60 zł ÷ 8 = 7,50 zł. To mniej niż 15 zł zarobku na przeglądzie.', { unit: 'zł' }),
        choice(
          'q-rekomendacja',
          'Co rekomendujesz na czerwiec?',
          [
            'Plakaty dalej; reklama w sieci tylko po zmianie przekazu',
            'Tylko reklama w sieci, bo ma większy zasięg niż plakaty',
            'Oba kanały po równo, bo każdy przyniósł jakichś klientów',
            'Zrezygnować z promocji, bo 12 klientów to za mało',
          ],
          0,
          'Plakaty: 7,50 zł za klienta (opłacalne). Reklama: 25 zł za klienta przy 15 zł zarobku (nieopłacalna w tej formie).',
          [
            null,
            'Zasięg nie jest celem. Każdy klient z reklamy kosztował 25 zł, a serwis zarabia 15 zł.',
            'Reklama przyniosła stratę na każdym kliencie. Nie warto dzielić budżetu po równo.',
            '8 klientów z plakatów to zarobek: 8 × 15 − 60 = 60 zł.',
          ],
        ),
        text(
          'q-tekst',
          'Napisz rekomendację dla właściciela serwisu (2–3 zdania, z liczbami).',
          'Rekomenduję w czerwcu dalsze plakaty z kodem: każdy klient kosztował 7,50 zł przy 15 zł zarobku na przeglądzie. Reklamy w sieci w obecnej formie nie warto powtarzać — klient kosztował 25 zł. Jeśli testujemy reklamę ponownie, to z nowym przekazem i budżetem do 40 zł.',
          { minLength: 60, criteria: ['Jest decyzja dla każdego kanału.', 'Są liczby: koszt klienta i zarobek.', 'Jest następny krok.'] },
        ),
        {
          type: 'resultCard',
          id: 'karta',
          badges: [
            { min: 0, name: 'Do powtórki', text: 'Wróć do odchyleń i kosztu pozyskania klienta.' },
            { min: 0.6, name: 'Liczysz kampanie', text: 'Powtórz wynik kampanii po kosztach i plan testu.' },
            { min: 0.85, name: 'Budżet pod kontrolą', text: 'Ocenisz kampanię liczbami i zaplanujesz rozsądny test.' },
          ],
        },
      ],
    },
  ],
  exitTicket: 'Odchylenie % = (wykonanie − plan) ÷ plan. Koszt pozyskania = reklama ÷ klienci. Wynik kampanii = klienci × zarobek na kliencie − reklama. Test: jeden kanał, budżet, harmonogram, miernik.',
};
