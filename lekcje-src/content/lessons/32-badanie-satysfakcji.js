import { choice, methods, note, number, text } from '../schema.js';

const results = {
  type: 'info',
  tone: 'case',
  title: 'Wyniki ankiety po przeglądzie roweru (40 odpowiedzi)',
  table: {
    head: ['Pytanie', 'Wyniki'],
    rows: [
      ['Na ile prawdopodobne jest, że polecisz nas znajomym? (0–10)', '9–10: 18 osób · 7–8: 14 osób · 0–6: 8 osób'],
      ['Jak oceniasz czas oczekiwania na rower? (1–5)', '5: 10 osób · 4: 14 · 3: 8 · 2: 6 · 1: 2'],
      ['Co mamy poprawić? (najczęstsze odpowiedzi)', 'Czas oczekiwania (11 razy), informacja SMS o gotowym rowerze (7), parking (3)'],
    ],
  },
  paragraphs: ['Ankietę wysłano SMS-em do 160 klientów, którzy zrobili przegląd w kwietniu. Odpowiedziało 40.'],
};

export default {
  id: '32',
  order: 32,
  part: 'B',
  title: 'Badanie satysfakcji klienta',
  subtitle: 'Serwis rowerowy wysłał ankietę do 160 klientów, odpowiedziało 40. Jak zadać dobre pytania, policzyć wyniki i nie wyciągnąć zbyt daleko idących wniosków.',
  duration: 45,
  sessions: [45],
  han: ['HAN.02.6'],
  tags: ['ankieta', 'NPS', 'średnia ocen', 'próba'],
  realia: [],
  audience: {
    adults:
      'Dorośli prowadzący firmę mogą od razu przygotować trzy pytania do swoich klientów. Przypomnij, że krótka ankieta po usłudze i rozmowa ze stałym klientem często dają więcej niż długi formularz. Zbierając odpowiedzi, nie trzeba pytać o dane osobowe.',
  },
  format: {
    name: 'Projekt ankiety i analiza wyników',
    student:
      'Pomagasz serwisowi rowerowemu w Poznaniu. Poprawisz pytania ankiety, policzysz wskaźnik poleceń i średnią ocen, a potem zdecydujesz, co poprawić najpierw.',
    teacher:
      'Lekcja uczy dwóch rzeczy: jak pytać (bez sugestii, jedno pytanie o jedną sprawę) i jak czytać wyniki (z kim rozmawiamy, czego nie wiemy). NPS przedstawiamy jako popularny, prosty wskaźnik, a nie jedyną prawdę.',
    grouping: 'Etapy 1 i 5 samodzielnie, etapy 2–4 w parach.',
    methods: [methods.przypadek, methods.przyklady, methods.metapoznanie],
  },
  objectives: [
    'Rozpoznaję i poprawiam złe pytania w ankiecie.',
    'Liczę wskaźnik poleceń (NPS) i średnią ocen.',
    'Wyciągam wnioski z uwzględnieniem tego, kto odpowiedział.',
  ],
  materials: ['Urządzenie z przeglądarką', 'Kalkulator'],
  teacherGuide: {
    preparation: 'Możesz pokazać prawdziwą krótką ankietę po zakupie (np. z maila sklepu internetowego) i zapytać, ile osób ją wypełnia.',
    summary:
      'Dobre pytanie dotyczy jednej sprawy, nie podsuwa odpowiedzi i ma opisaną skalę. NPS = procent polecających (9–10) minus procent krytyków (0–6). Średnią ocen liczy się z ważonej sumy. Odpowiedziała tylko część klientów — wyniki pokazują ich zdanie, nie wszystkich. Najczęstsza skarga wskazuje, co poprawić najpierw.',
  },
  sections: [
    {
      id: 'start',
      label: 'Start',
      title: 'Pytanie z podpowiedzią',
      grouping: 'solo',
      intro: 'Właściciel serwisu zaczął pisać ankietę. Pierwsze pytanie brzmi: „Czy nasz świetny serwis spełnił Twoje oczekiwania?”.',
      ...note(
        5,
        'Każdy odpowiada sam. Poproś o przeredagowanie pytania na głos.',
        'Jak zapytać o to samo bez podpowiadania?',
        '„Jak oceniasz przegląd roweru w skali 1–5?” albo „Co podobało Ci się, a co nie?”',
        'Pytania z ocenami w treści („świetny”, „wygodny”).',
        'Napisz pytanie o cenę przeglądu, które niczego nie sugeruje.',
      ),
      activities: [
        choice(
          'q-sugerujace',
          'Co jest nie tak z tym pytaniem?',
          [
            'Słowo „świetny” podsuwa odpowiedź',
            'Jest za krótkie, by ktoś na nie odpowiedział',
            'Nie da się na nie odpowiedzieć w internecie',
            'Zwraca się do klienta per „Ty”',
          ],
          0,
          'Pytanie sugerujące zawyża wyniki — część osób odpowiada tak, jak „wypada”.',
          [
            null,
            'Długość jest w porządku. Problem to ocena wpisana w pytanie.',
            'Można na nie odpowiedzieć wszędzie, ale wynik będzie zawyżony.',
            'Forma „Ty” bywa stosowana w ankietach. To nie jest główny problem.',
          ],
        ),
      ],
    },
    {
      id: 'pytania',
      label: 'Pytania',
      title: 'Ankieta do poprawki',
      grouping: 'pair',
      intro: 'Sprawdź całą wersję roboczą ankiety.',
      reading: {
        title: 'Zasady dobrych pytań',
        paragraphs: [
          'Jedno pytanie dotyczy jednej sprawy. Nie zawiera oceny ani podpowiedzi. Skala jest opisana (1 — bardzo źle, 5 — bardzo dobrze). Ankieta jest krótka: 3–5 pytań. Na końcu jedno pytanie otwarte: „Co mamy poprawić?”. Nie pyta się o dane, które nie są potrzebne.',
        ],
      },
      ...note(
        12,
        'Pary zaznaczają złe pytania i poprawiają jedno z nich. Przeczytaj kilka poprawek.',
        'Dlaczego pytanie o czas i cenę naraz jest złe?',
        'Bo klient może być zadowolony z czasu, a niezadowolony z ceny. Odpowiedź „3” nic wtedy nie mówi.',
        'Długie ankiety z pytaniami, z których firma i tak nie skorzysta.',
        'Ułóż pięć pytań do ankiety dla sklepu, w którym robisz zakupy.',
      ),
      activities: [
        {
          type: 'spotErrors',
          id: 'q-ankieta',
          title: 'Ankieta — wersja robocza',
          context: 'Zaznacz pytania do poprawy.',
          lines: [
            { text: '1. Na ile prawdopodobne jest, że polecisz nas znajomym? (0 — wcale, 10 — na pewno)' },
            { text: '2. Jak oceniasz czas oczekiwania i cenę przeglądu? (1–5)', error: 'Dwie sprawy w jednym pytaniu. Rozdziel na dwa.' },
            { text: '3. Czy zgodzisz się, że nasi mechanicy są najlepsi w Poznaniu?', error: 'Pytanie sugerujące i niesprawdzalne.' },
            { text: '4. Podaj swój adres zamieszkania i datę urodzenia.', error: 'Dane niepotrzebne do oceny usługi.' },
            { text: '5. Co mamy poprawić?' },
          ],
          explanation: 'Trzy pytania do poprawy: podwójne, sugerujące i zbierające niepotrzebne dane.',
        },
      ],
    },
    {
      id: 'wyniki',
      label: 'Wyniki',
      title: 'Liczymy wyniki',
      grouping: 'pair',
      intro: 'Przyszło 40 odpowiedzi. Policz wskaźnik poleceń (NPS) i średnią ocenę czasu oczekiwania.',
      reading: {
        title: 'NPS i średnia',
        paragraphs: [
          'NPS (wskaźnik poleceń): procent osób, które dały 9–10 (polecający), minus procent osób, które dały 0–6 (krytycy). Osoby z ocenami 7–8 nie wchodzą do wyniku. Wynik może być od −100 do +100.',
          'Średnia ocena: suma (ocena × liczba osób) podzielona przez liczbę osób.',
        ],
      },
      ...note(
        15,
        'Pary liczą. Pokaż na tablicy obliczenie NPS krok po kroku, jeśli ktoś się pogubi.',
        'Czy NPS 25 to dobry wynik?',
        'Dodatni — więcej polecających niż krytyków. Najwięcej mówi porównanie z wcześniejszym wynikiem tej samej firmy.',
        'Liczenie średniej z samych ocen (1+2+3+4+5)/5 bez uwzględnienia liczby osób.',
        'Policz NPS, gdyby 4 krytyków zmieniło ocenę na 7–8 (35).',
      ),
      activities: [
        results,
        number('q-nps', 'Jaki jest wskaźnik poleceń (NPS)?', 25, 'Polecający: 18 ÷ 40 = 45%. Krytycy: 8 ÷ 40 = 20%. NPS = 45 − 20 = 25.', {
          mistakes: [
            { value: 10, text: 'To różnica liczby osób (18 − 8). Policz procenty od 40 odpowiedzi.' },
            { value: 45, text: 'To procent polecających. Odejmij procent krytyków.' },
          ],
        }),
        number('q-srednia', 'Jaka jest średnia ocena czasu oczekiwania? Podaj z jednym miejscem po przecinku.', 3.6, '(5 × 10 + 4 × 14 + 3 × 8 + 2 × 6 + 1 × 2) ÷ 40 = 144 ÷ 40 = 3,6.', {
          tolerance: 0.05,
          mistakes: [{ value: 3, text: 'To średnia samych wartości skali. Uwzględnij, ile osób dało każdą ocenę.' }],
        }),
      ],
    },
    {
      id: 'wnioski',
      label: 'Wnioski',
      title: 'Co z tego wynika',
      grouping: 'pair',
      intro: 'Na podstawie wyników właściciel chce zdecydować, co poprawić.',
      ...note(
        8,
        'Pary odpowiadają. Zapytaj, kto mógł nie odpowiedzieć na ankietę i dlaczego.',
        'Kto najczęściej odpowiada na takie ankiety?',
        'Osoby bardzo zadowolone i bardzo niezadowolone. Ci „pośrodku” często ignorują SMS. Wyniki mogą być przesunięte.',
        'Traktowanie 40 odpowiedzi jak opinii wszystkich 160 klientów.',
        'Zaproponuj, jak zwiększyć liczbę odpowiedzi (krótsza ankieta, pytanie przy odbiorze roweru).',
      ),
      activities: [
        results,
        choice(
          'q-proba',
          'Co trzeba pamiętać, czytając te wyniki?',
          [
            'To zdanie 40 z 160 osób, nie wszystkich',
            'Wyniki dotyczą wszystkich mieszkańców Poznania',
            'NPS 25 oznacza, że 25 osób poleci serwis',
            'Średnia 3,6 oznacza, że 36% klientów jest zadowolonych',
          ],
          0,
          'Odpowiedziała jedna czwarta klientów. Wyniki pokazują ich zdanie i mogą różnić się od zdania pozostałych.',
          [
            null,
            'Ankietę dostali klienci serwisu, nie mieszkańcy miasta.',
            'NPS to różnica procentów, a nie liczba osób.',
            'Średnia ocen na skali 1–5 to nie procent.',
          ],
        ),
        choice(
          'q-poprawa',
          'Co poprawić najpierw?',
          [
            'Czas oczekiwania i SMS o gotowym rowerze',
            'Parking przed serwisem, bo to łatwe do zmiany',
            'Logo serwisu, żeby wyglądało nowocześniej',
            'Nic, bo NPS jest dodatni i wszystko działa',
          ],
          0,
          'Czas oczekiwania ma najniższą ocenę i najwięcej uwag. SMS o gotowym rowerze to prosta zmiana, która go skraca w odczuciu klienta.',
          [
            null,
            'Parking wskazały 3 osoby, czas oczekiwania — 11.',
            'Nikt nie wspomniał o logo.',
            'Dodatni NPS nie zwalnia z poprawy najczęściej wskazywanego problemu.',
          ],
        ),
      ],
    },
    {
      id: 'sprawdzenie',
      label: 'Sprawdzenie',
      title: 'Twoje pytanie',
      grouping: 'solo',
      intro: 'Na koniec popraw jedno pytanie z ankiety.',
      ...note(
        5,
        'Samodzielnie. Przeczytaj kilka poprawionych pytań.',
        'Jak sprawdzić, czy pytanie jest dobre, zanim wyślesz ankietę?',
        'Dać je do przeczytania 2–3 osobom i zapytać, jak je rozumieją.',
        'Wysyłanie ankiety bez próbnego przeczytania.',
        'Napisz pytanie o informację SMS o gotowym rowerze.',
      ),
      activities: [
        text(
          'q-pytanie',
          'Rozdziel pytanie „Jak oceniasz czas oczekiwania i cenę przeglądu? (1–5)” na dwa dobre pytania.',
          'Jak oceniasz czas oczekiwania na rower? (1 — bardzo długo, 5 — bardzo szybko). Jak oceniasz cenę przeglądu? (1 — bardzo wysoka, 5 — bardzo dobra za to, co dostałem/dostałam).',
          { criteria: ['Dwa osobne pytania.', 'Opisana skala.', 'Brak sugestii.'] },
        ),
        {
          type: 'resultCard',
          id: 'karta',
          badges: [
            { min: 0, name: 'Do powtórki', text: 'Wróć do zasad dobrych pytań i obliczeń.' },
            { min: 0.6, name: 'Pytasz klientów', text: 'Powtórz wnioski z próby.' },
            { min: 0.85, name: 'Badanie bez błędów', text: 'Zadasz dobre pytania i uczciwie odczytasz wyniki.' },
          ],
        },
      ],
    },
  ],
  exitTicket: 'Dobre pytanie: jedna sprawa, bez sugestii, opisana skala. NPS = % polecających (9–10) − % krytyków (0–6). Średnia = suma (ocena × osoby) ÷ liczba osób. Wyniki mówią o tych, którzy odpowiedzieli.',
};
