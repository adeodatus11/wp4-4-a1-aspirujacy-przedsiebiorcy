import { choice, methods, note, number, text } from '../schema.js';

const data = {
  type: 'info',
  tone: 'case',
  title: 'Sklep rowerowy w Gdańsku: pierwszy kwartał sezonu',
  paragraphs: [
    'W marcu sklep sprzedał 6 rowerów firmie kurierskiej z terminem płatności 30 dni, a w kwietniu i maju klienci płacili głównie od razu. Liczby są uproszczone: pomijamy VAT, amortyzację i podatek dochodowy. Na start sklep miał 3000 zł gotówki.',
  ],
  table: {
    head: ['Miesiąc', 'Przychody', 'Koszty', 'Wpływy gotówki', 'Wydatki gotówki'],
    rows: [
      ['Marzec', '8000 zł', '6000 zł', '2000 zł', '6000 zł'],
      ['Kwiecień', '10000 zł', '7500 zł', '8000 zł', '7500 zł'],
      ['Maj', '11000 zł', '8000 zł', '11000 zł', '8000 zł'],
    ],
  },
};

export default {
  id: '29',
  order: 29,
  part: 'B',
  title: 'Wynik, gotówka i wskaźniki',
  subtitle: 'Sklep rowerowy ma zysk w każdym miesiącu, a w marcu brakuje mu pieniędzy na czynsz. Jak to możliwe i co pokażą wskaźniki?',
  duration: 90,
  sessions: [45, 45],
  han: ['HAN.01.4', 'HAN.02.3', 'HAN.02.7'],
  tags: ['wynik finansowy', 'przepływy gotówki', 'płynność', 'rentowność'],
  realia: [],
  audience: {
    adults:
      'To najważniejsza lekcja dla każdego, kto prowadzi firmę: zysk na papierze to nie pieniądze na koncie. Poproś dorosłych, żeby rozpisali trzy najbliższe miesiące swojej działalności w tych samych czterech kolumnach. Wskaźniki traktuj jako narzędzie rozmowy z bankiem i księgową, nie jako cel.',
  },
  format: {
    name: 'Tabela przepływów, wskaźniki i interpretacja',
    student:
      'Analizujesz pierwszy kwartał sezonu w sklepie rowerowym w Gdańsku. Rozdzielisz wynik od gotówki, policzysz salda, porównasz wykonanie z planem i obliczysz dwa wskaźniki.',
    teacher:
      'Pierwsza lekcja: wynik a gotówka (przychód ≠ wpływ). Najważniejszy moment: marzec ma zysk 2000 zł i ujemne saldo −1000 zł. Druga lekcja: plan, płynność bieżąca i rentowność sprzedaży, z naciskiem na ograniczenia interpretacji.',
    grouping: 'Etapy 1 i 7 samodzielnie, pozostałe w parach; po przerwie zamiana par.',
    methods: [methods.przyklady, methods.przypadek, methods.ksztaltujace],
  },
  objectives: [
    'Odróżniam przychód i koszt od wpływu i wydatku gotówki.',
    'Liczę wynik i saldo gotówki z przeniesieniem między miesiącami.',
    'Liczę odchylenie od planu, płynność bieżącą i rentowność sprzedaży.',
    'Wyjaśniam, dlaczego firma z zyskiem może nie mieć gotówki.',
  ],
  materials: ['Urządzenie z przeglądarką', 'Kalkulator', 'Arkusz cash flow w serwisie programu (nie jest konieczny)'],
  teacherGuide: {
    preparation: 'Przygotuj na tablicy tabelę z sześcioma kolumnami: miesiąc, przychody, koszty, wynik, wpływy, wydatki, saldo. Wypełniacie ją w etapie 3.',
    summary:
      'Przychód i koszt opisują wynik (zysk lub strata), wpływy i wydatki — gotówkę. Gdy klienci płacą później, a firma płaci od razu, zysk może iść w parze z brakiem pieniędzy. Saldo na koniec miesiąca przechodzi na początek następnego. Płynność bieżąca = aktywa obrotowe ÷ zobowiązania krótkoterminowe; rentowność sprzedaży = wynik ÷ przychody × 100%.',
  },
  sections: [
    {
      id: 'start',
      label: 'Start',
      title: 'Zysk, a nie ma na czynsz',
      grouping: 'solo',
      intro: 'Właścicielka sklepu mówi: „W marcu zarobiliśmy 2000 zł, a 10 kwietnia nie miałam z czego zapłacić czynszu”.',
      ...note(
        5,
        'Każdy odpowiada sam. Nie tłumacz jeszcze — wrócicie do tego w etapie 3.',
        'Jak to możliwe, że firma ma zysk, a nie ma pieniędzy?',
        'Bo część przychodów to faktury, za które klienci jeszcze nie zapłacili, a wydatki trzeba było pokryć od razu.',
        'Utożsamianie zysku z pieniędzmi na koncie.',
        'Podaj przykład z życia: kiedy „masz” pieniądze, ale nie możesz ich wydać.',
      ),
      activities: [
        choice(
          'q-zysk',
          'Co najprawdopodobniej się stało?',
          [
            'Klient jeszcze nie zapłacił za część sprzedaży',
            'Księgowa źle policzyła zysk za marzec',
            'Sklep miał stratę, a nie zysk',
            'Czynsz w kwietniu był wyższy niż zwykle',
          ],
          0,
          'Przychód powstał przy sprzedaży, ale pieniądze przyjdą po terminie płatności. Do tego czasu brakuje gotówki.',
          [
            null,
            'Zysk może być policzony dobrze — problem dotyczy terminu wpływu pieniędzy.',
            'Przychody (8000 zł) były wyższe niż koszty (6000 zł).',
            'Czynsz jest stały. Brakuje wpływu za sprzedaż z odroczoną płatnością.',
          ],
        ),
      ],
    },
    {
      id: 'pojecia',
      label: 'Pojęcia',
      title: 'Wynik i gotówka',
      grouping: 'pair',
      intro: 'Te same zdarzenia można opisać na dwa sposoby: jako wynik albo jako ruch gotówki.',
      reading: {
        title: 'Dwie różne miary',
        paragraphs: [
          'Przychód powstaje, gdy sklep sprzedaje — także na fakturę z terminem płatności. Koszt powstaje, gdy sklep zużywa towar, pracę, lokal. Wynik = przychody − koszty.',
          'Wpływ to pieniądze, które naprawdę przyszły na konto lub do kasy. Wydatek to pieniądze, które naprawdę wyszły. Saldo na koniec miesiąca = saldo na początek + wpływy − wydatki. Saldo końcowe jednego miesiąca jest saldem początkowym następnego.',
        ],
      },
      ...note(
        12,
        'Pary dopasowują. Przy fakturze z terminem 30 dni zapytaj: kiedy przychód, a kiedy wpływ?',
        'Sklep sprzedał rowery na fakturę z terminem 30 dni. Kiedy jest przychód, a kiedy wpływ?',
        'Przychód w dniu sprzedaży (marzec). Wpływ po zapłacie (kwiecień).',
        'Traktowanie każdej sprzedaży jako wpływu tego samego dnia.',
        'Wymyśl sytuację, w której wydatek jest przed kosztem (np. zakup towaru na zapas).',
      ),
      activities: [
        {
          type: 'matching',
          id: 'q-pojecia',
          question: 'Co to jest dla sklepu w marcu?',
          options: ['Przychód bez wpływu', 'Przychód i wpływ', 'Wydatek', 'Wpływ bez przychodu'],
          rows: [
            { label: 'Sprzedaż 6 rowerów firmie kurierskiej z terminem płatności 30 dni', correct: 0 },
            { label: 'Klient płaci kartą za rower w sklepie', correct: 1 },
            { label: 'Przelew czynszu za lokal', correct: 2 },
            { label: 'Firma kurierska płaci w kwietniu za marcowe rowery', correct: 3, explanation: 'Przychód był w marcu. W kwietniu przychodzi sam wpływ.' },
          ],
          explanation: 'Przychód i wpływ mogą być w różnych miesiącach. Stąd różnica między zyskiem a gotówką.',
        },
      ],
    },
    {
      id: 'tabela',
      label: 'Tabela',
      title: 'Wynik i saldo w trzech miesiącach',
      grouping: 'pair',
      intro: 'Uzupełnij wyniki i salda gotówki. Saldo z marca przenieś na kwiecień, z kwietnia na maj.',
      reading: {
        example: {
          question: 'Marzec: start 3000 zł, wpływy 2000 zł, wydatki 6000 zł.',
          steps: ['Saldo na koniec marca: 3000 + 2000 − 6000 = −1000 zł.', 'Wynik marca: 8000 − 6000 = 2000 zł.', 'Zysk 2000 zł i saldo −1000 zł w tym samym miesiącu.'],
          answer: 'Wynik +2000 zł, saldo −1000 zł.',
        },
      },
      ...note(
        15,
        'Przykład z marcem razem, potem pary uzupełniają tabelę. Zapytaj, w którym miesiącu sklep wychodzi „na plus” w gotówce.',
        'Co musiałaby zrobić właścicielka w marcu, żeby zapłacić czynsz?',
        'Mieć rezerwę albo krótkoterminowe finansowanie (np. limit w koncie) na czas oczekiwania na zapłatę, albo uzgodnić krótszy termin z klientem.',
        'Nieprzenoszenie salda na kolejny miesiąc.',
        'Przesuń 2000 zł wpływu z kwietnia na marzec i policz salda (1000, −500, 2500).',
      ),
      activities: [
        data,
        {
          type: 'docForm',
          id: 'doc-tabela',
          title: 'Wynik i gotówka — marzec–maj',
          points: 6,
          doc: {
            title: 'Wynik i saldo gotówki',
            table: {
              head: ['Miesiąc', 'Wynik', 'Saldo na początek', 'Saldo na koniec'],
              rows: [
                ['Marzec', '2000', '3000', '−1000'],
                ['Kwiecień', { f: 'w2' }, '−1000', { f: 's2' }],
                ['Maj', { f: 'w3' }, { f: 'p3' }, { f: 's3' }],
              ],
            },
            after: [['Wynik za trzy miesiące', { f: 'suma' }]],
          },
          fields: {
            w2: { label: 'Kwiecień — wynik', answer: 2500, hint: 'Przychody − koszty.' },
            s2: { label: 'Kwiecień — saldo na koniec', answer: -500, hint: 'Saldo na początek + wpływy − wydatki.' },
            w3: { label: 'Maj — wynik', answer: 3000, hint: 'Przychody − koszty.' },
            p3: { label: 'Maj — saldo na początek', answer: -500, hint: 'To saldo na koniec kwietnia.' },
            s3: { label: 'Maj — saldo na koniec', answer: 2500, hint: 'Saldo na początek + wpływy − wydatki.' },
            suma: { label: 'Wynik za trzy miesiące', answer: 7500, hint: 'Suma wyników.' },
          },
          explanation: 'Wyniki: 2000, 2500, 3000 zł (razem 7500 zł). Salda: −1000, −500, 2500 zł. Zysk przez cały kwartał, a gotówka „na plus” dopiero w maju.',
        },
      ],
    },
    {
      id: 'wniosek',
      label: 'Wniosek',
      title: 'Rentowna, a bez gotówki',
      grouping: 'pair',
      intro: 'Zapisz wniosek z tabeli i sprawdź, co sklep mógł zrobić inaczej.',
      breakAfter: true,
      ...note(
        13,
        'Pary odpowiadają. Po przerwie: plan i wskaźniki.',
        'Jakie dwie zmiany zmniejszyłyby problem marca?',
        'Krótszy termin płatności dla firmy (np. 14 dni) albo zaliczka; zakupy towaru rozłożone w czasie; rezerwa gotówki na start.',
        'Proponowanie tylko kredytu, bez zmian w terminach płatności.',
        'Policz, jaki termin płatności pozwoliłby uniknąć ujemnego salda w marcu (wpływ ze sprzedaży firmie jeszcze w marcu).',
      ),
      activities: [
        choice(
          'q-wniosek',
          'Co pokazuje tabela?',
          [
            'Sklep jest rentowny, ale ma kłopot z płynnością na starcie',
            'Sklep jest nierentowny, bo w marcu ma ujemne saldo',
            'Sklep ma kłopot z rentownością, bo koszty rosną co miesiąc',
            'Sklep nie ma żadnego problemu, bo zarabia co miesiąc',
          ],
          0,
          'Zysk w każdym miesiącu (rentowność), a ujemne saldo w marcu i kwietniu (płynność).',
          [
            null,
            'Ujemne saldo to problem z gotówką, a nie z rentownością.',
            'Koszty rosną razem z przychodami, a wynik też rośnie.',
            'Przez dwa miesiące brakuje gotówki — to realny problem, np. z czynszem.',
          ],
        ),
        {
          type: 'multi',
          id: 'q-reakcje',
          question: 'Co mogło pomóc w marcu? Zaznacz rozsądne działania.',
          options: [
            'Krótszy termin płatności lub zaliczka od firmy kurierskiej',
            'Rezerwa gotówki na start większa o 1000 zł',
            'Zakup towaru na cały sezon z góry w marcu',
            'Uzgodnienie przesunięcia części płatności za towar u dostawcy',
            'Rezygnacja ze sprzedaży firmom z odroczoną płatnością na zawsze',
          ],
          correct: [0, 1, 3],
          explanation: 'Pomaga zbliżenie wpływów do wydatków albo bufor gotówki. Zakup na zapas pogłębiłby problem, a rezygnacja z klientów firmowych zabrałaby przychód.',
          hint: 'Szukaj działań, które zbliżają w czasie wpływy i wydatki albo dają zapas gotówki.',
        },
      ],
    },
    {
      id: 'plan',
      label: 'Plan',
      title: 'Plan i wykonanie',
      grouping: 'pair',
      intro: 'Po przerwie — nowe pary. Na kwartał sklep planował przychody 30 000 zł.',
      ...note(
        15,
        'Pary liczą. Zapytaj, czy −3,33% to dużo — od czego to zależy?',
        'Czy przychód niższy o 3,33% od planu to powód do niepokoju?',
        'Niewielkie odchylenie. Ważniejsze, czy wynik i gotówka są zgodne z planem, i czy przyczyna jest jednorazowa.',
        'Liczenie procentu od wykonania zamiast od planu.',
        'Policz odchylenie wyniku, jeśli plan zakładał 8000 zł (−6,25%).',
      ),
      activities: [
        data,
        number('q-przychody', 'Ile wyniosły przychody za trzy miesiące?', 29000, '8000 + 10000 + 11000 = 29000 zł.', { unit: 'zł' }),
        number('q-odchylenie', 'Jakie jest procentowe odchylenie przychodów od planu 30 000 zł? Wpisz ze znakiem.', -3.33, '(29000 − 30000) ÷ 30000 × 100% ≈ −3,33%.', {
          unit: '%',
          tolerance: 0.02,
          mistakes: [
            { value: 3.33, text: 'Wartość dobra, ale przychody są niższe od planu — znak minus.' },
            { value: -3.45, text: 'Dzielisz przez wykonanie. Procent odchylenia liczysz od planu.' },
          ],
        }),
      ],
    },
    {
      id: 'wskazniki',
      label: 'Wskaźniki',
      title: 'Płynność i rentowność',
      grouping: 'pair',
      intro: 'Na koniec maja: aktywa obrotowe (towar w magazynie, należności, gotówka) 30 000 zł, zobowiązania krótkoterminowe (do zapłaty w ciągu roku) 20 000 zł.',
      reading: {
        title: 'Dwa wskaźniki',
        paragraphs: [
          'Płynność bieżąca = aktywa obrotowe ÷ zobowiązania krótkoterminowe. Pokazuje, ile razy majątek obrotowy pokrywa bieżące długi. Rentowność sprzedaży = wynik ÷ przychody × 100%. Pokazuje, ile groszy zysku zostaje z każdej złotówki sprzedaży.',
          'Wskaźnik to sygnał, nie wyrok. Aktywa obrotowe to też towar i należności, których nie da się od razu wydać.',
        ],
      },
      ...note(
        15,
        'Pary liczą oba wskaźniki. Zatrzymaj się przy pytaniu, dlaczego płynność 1,5 nie oznacza pieniędzy na rachunku.',
        'Dlaczego płynność 1,5 nie gwarantuje gotówki na czynsz?',
        'Bo w aktywach obrotowych jest towar w magazynie i należności od klientów — tych pieniędzy jeszcze nie ma.',
        'Uznawanie rentowności 25,86% za realny zysk netto firmy (pominięto m.in. podatek i amortyzację).',
        'Sprawdź, jak zmieni się płynność, gdy sklep spłaci 5000 zł zobowiązań gotówką (25000 ÷ 15000 ≈ 1,67).',
      ),
      activities: [
        number('q-plynnosc', 'Jaki jest wskaźnik płynności bieżącej?', 1.5, '30000 ÷ 20000 = 1,5.', {
          tolerance: 0.01,
          mistakes: [{ value: 0.67, text: 'Dzielisz odwrotnie. Aktywa obrotowe przez zobowiązania.' }],
        }),
        number('q-rentownosc', 'Jaka jest rentowność sprzedaży za kwartał (wynik 7500 zł, przychody 29 000 zł)? Podaj w procentach.', 25.86, '7500 ÷ 29000 × 100% ≈ 25,86%. W uproszczeniu — bez podatku i amortyzacji.', {
          unit: '%',
          tolerance: 0.02,
          mistakes: [{ value: 25, text: 'Podzielono przez plan (30 000 zł). Rentowność liczysz od rzeczywistych przychodów.' }],
        }),
        choice(
          'q-plynnosc-gotowka',
          'Dlaczego płynność 1,5 nie gwarantuje pieniędzy na rachunku?',
          [
            'Bo w aktywach obrotowych są też towar i należności',
            'Bo wszystkie aktywa obrotowe to gotówka na rachunku',
            'Bo płynność liczy się tylko raz w roku, na koniec grudnia',
            'Bo płynność dotyczy tylko firm, które mają kredyt w banku',
          ],
          0,
          'Towar trzeba sprzedać, a należności ściągnąć, zanim staną się gotówką.',
          [
            null,
            'Gotówka to tylko część aktywów obrotowych.',
            'Wskaźnik można liczyć dla dowolnego dnia, np. na koniec miesiąca.',
            'Płynność dotyczy każdej firmy, która ma bieżące zobowiązania.',
          ],
        ),
      ],
    },
    {
      id: 'sprawdzenie',
      label: 'Sprawdzenie',
      title: 'Wniosek dla właścicielki',
      grouping: 'solo',
      intro: 'Sprawdzenie na nowych danych i krótki wniosek.',
      ...note(
        15,
        'Samodzielnie. Przeczytaj 2–3 wnioski: czy łączą wynik, gotówkę i konkretne działanie?',
        'Czego powinna dowiedzieć się właścicielka z jednego akapitu?',
        'Że sklep zarabia, ale potrzebuje bufora gotówki albo krótszych terminów płatności na starcie sezonu.',
        'Wnioski, które mówią tylko „jest zysk” albo tylko „brakuje pieniędzy”.',
        'Przygotuj podobną tabelę dla czerwca–sierpnia, zakładając sezon szczytowy.',
      ),
      activities: [
        number('q-saldo', 'Czerwiec: saldo na początek 2500 zł, wpływy 12 000 zł, wydatki 13 500 zł (zakup towaru na lato). Jakie jest saldo na koniec czerwca?', 1000, '2500 + 12000 − 13500 = 1000 zł.', {
          unit: 'zł',
          mistakes: [{ value: -1500, text: 'Uwzględnij saldo na początek miesiąca (2500 zł).' }],
        }),
        text(
          'q-wniosek-tekst',
          'Napisz wniosek dla właścicielki sklepu (2–3 zdania, z liczbami).',
          'Sklep jest rentowny: za marzec–maj wynik wyniósł 7500 zł, czyli około 26% przychodów. Problemem jest gotówka na starcie sezonu — w marcu saldo spadło do −1000 zł, bo firma kurierska płaciła po 30 dniach. Na przyszły sezon warto mieć rezerwę co najmniej 1000 zł albo uzgodnić krótszy termin płatności lub zaliczkę.',
          { minLength: 80, criteria: ['Jest wynik lub rentowność.', 'Jest problem z gotówką i jego przyczyna.', 'Jest konkretne działanie.'] },
        ),
        {
          type: 'resultCard',
          id: 'karta',
          badges: [
            { min: 0, name: 'Do powtórki', text: 'Wróć do przykładu z marcem i tabeli wyniku i gotówki.' },
            { min: 0.6, name: 'Widzisz różnicę', text: 'Powtórz wskaźniki i ich ograniczenia.' },
            { min: 0.85, name: 'Finanse pod kontrolą', text: 'Rozumiesz, dlaczego zysk to nie gotówka, i czytasz wskaźniki.' },
          ],
        },
      ],
    },
  ],
  exitTicket: 'Wynik = przychody − koszty. Saldo = saldo początkowe + wpływy − wydatki, przenoszone na kolejny miesiąc. Zysk nie oznacza gotówki. Płynność bieżąca = aktywa obrotowe ÷ zobowiązania krótkoterminowe. Rentowność = wynik ÷ przychody.',
};
