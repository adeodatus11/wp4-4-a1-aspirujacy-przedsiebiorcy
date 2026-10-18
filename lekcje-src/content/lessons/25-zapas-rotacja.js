import { choice, methods, note, number } from '../schema.js';

export default {
  id: '25',
  order: 25,
  part: 'B',
  title: 'Zapas, punkt zamówienia i rotacja',
  subtitle: 'Kiedy zamówić wodę, żeby nie zabrakło jej w upał, i dlaczego kawa za 2400 zł leży na półce cały miesiąc.',
  duration: 45,
  sessions: [45],
  han: ['HAN.02.5'],
  tags: ['zapas', 'punkt zamówienia', 'rotacja', 'zamrożona gotówka'],
  realia: [],
  audience: {
    adults:
      'Dla właścicieli sklepów to jedna z najbardziej praktycznych lekcji: zbyt duży zapas to zamrożona gotówka, zbyt mały — puste półki. Poproś, żeby policzyli rotację w dniach dla trzech swoich towarów na podstawie przybliżonych danych.',
  },
  format: {
    name: 'Obliczenia na danych sklepu i decyzje',
    student:
      'Pracujesz w sklepie osiedlowym w Rzeszowie. Ustalisz, kiedy zamawiać wodę, policzysz, jak szybko sprzedają się nabiał i kawa, i zdecydujesz, co zrobić z zapasami.',
    teacher:
      'Dwa narzędzia: punkt ponownego zamówienia (kiedy zamawiać) i wskaźnik rotacji w dniach (jak długo towar leży). Oba da się policzyć bez programu. Najważniejszy wniosek: zapas to pieniądze, które czekają na sprzedaż.',
    methods: [methods.przyklady, methods.przypadek],
  },
  objectives: [
    'Liczę punkt ponownego zamówienia z zapasem bezpieczeństwa.',
    'Liczę przeciętny zapas i rotację w dniach.',
    'Oceniam, który towar zamraża gotówkę, i proponuję działanie.',
  ],
  materials: ['Kalkulator'],
  teacherGuide: {
    preparation: 'Zapisz na tablicy dwa wzory: punkt zamówienia = sprzedaż dzienna × czas dostawy + zapas bezpieczeństwa; rotacja w dniach = przeciętny zapas ÷ sprzedaż w okresie × liczba dni.',
    summary:
      'Zamówienie składa się, gdy zapas spada do punktu zamówienia: tyle, ile sprzeda się w czasie dostawy, plus zapas bezpieczeństwa. Rotacja w dniach mówi, ile dni średnio towar leży w sklepie. Długa rotacja to zamrożona gotówka i ryzyko przeterminowania, zbyt krótka może oznaczać braki.',
  },
  sections: [
    {
      id: 'start',
      label: 'Pełne półki',
      title: 'Za dużo czy za mało?',
      grouping: 'solo',
      intro: 'Właściciel sklepu mówi: „Wolę mieć dużo towaru, żeby nigdy niczego nie brakowało”.',
      ...note(
        7,
        'Każdy odpowiada sam. Zbierz na tablicy skutki za dużego i za małego zapasu.',
        'Co tracisz, mając za dużo towaru?',
        'Gotówkę zamrożoną w zapasie, miejsce na zapleczu, towar może się przeterminować albo wyjść z mody.',
        'Myślenie, że duży zapas jest zawsze bezpieczny.',
        'Podaj przykład towaru, którego zapas może stracić wartość (sezonowe, z datą, elektronika).',
      ),
      activities: [
        choice(
          'q-zapas',
          'Jaki jest główny koszt zbyt dużego zapasu?',
          [
            'Pieniądze leżą na półce zamiast na koncie',
            'Klienci widzą pełne półki i kupują mniej',
            'Hurtownia daje mniejszy rabat przy dużych zamówieniach',
          ],
          0,
          'Zapas to gotówka, która czeka na sprzedaż. Do tego ryzyko przeterminowania i zajęte miejsce.',
          [
            null,
            'Pełne półki zwykle pomagają sprzedaży. Problem jest w zapasie, który długo się nie sprzedaje.',
            'Przy dużych zamówieniach rabaty są raczej większe.',
          ],
        ),
      ],
    },
    {
      id: 'punkt',
      label: 'Kiedy zamówić',
      title: 'Kiedy zamówić wodę?',
      grouping: 'pair',
      intro: 'W lipcu sklep sprzedaje średnio 40 zgrzewek wody dziennie. Hurtownia dostarcza wodę 3 dni po zamówieniu. Na wypadek upału sklep chce mieć zapas bezpieczeństwa 60 zgrzewek.',
      reading: {
        example: {
          question: 'Przy jakim stanie zapasu trzeba zamówić wodę?',
          steps: [
            'W czasie dostawy (3 dni) sklep sprzeda 40 × 3 = 120 zgrzewek.',
            'Do tego zapas bezpieczeństwa: 60 zgrzewek.',
            'Punkt zamówienia: 120 + 60 = 180 zgrzewek.',
          ],
          answer: 'Gdy na stanie zostaje 180 zgrzewek, składasz zamówienie.',
        },
      },
      ...note(
        10,
        'Przykład razem, potem pary liczą dla innego towaru. Zapytaj, co się stanie, gdy dostawa się spóźni o dzień.',
        'Po co zapas bezpieczeństwa?',
        'Na nieprzewidziane sytuacje: upał, spóźnioną dostawę, większy ruch. Bez niego półka może być pusta przed dostawą.',
        'Pomijanie zapasu bezpieczeństwa albo liczenie tylko jednego dnia sprzedaży.',
        'Policz, na ile dni wystarczy zapas bezpieczeństwa wody (1,5 dnia).',
      ),
      activities: [
        number('q-punkt', 'Mleko: sprzedaż 30 litrów dziennie, dostawa 2 dni po zamówieniu, zapas bezpieczeństwa 20 litrów. Jaki jest punkt zamówienia?', 80, '30 × 2 + 20 = 80 litrów.', {
          unit: 'l',
          mistakes: [
            { value: 60, text: 'Dodaj zapas bezpieczeństwa (20 litrów).' },
            { value: 50, text: 'W czasie dostawy minie 2 dni, nie jeden: 30 × 2.' },
          ],
        }),
        number('q-dni', 'Na stanie jest 260 zgrzewek wody, sprzedaż 40 dziennie. Na ile dni wystarczy ten zapas?', 6.5, '260 ÷ 40 = 6,5 dnia.', { unit: 'dni' }),
      ],
    },
    {
      id: 'rotacja',
      label: 'Rotacja',
      title: 'Jak długo towar leży?',
      grouping: 'pair',
      intro: 'Wskaźnik rotacji w dniach mówi, ile dni średnio towar czeka w sklepie na sprzedaż. Wartości liczymy w cenach zakupu.',
      reading: {
        title: 'Wzory',
        paragraphs: [
          'Przeciętny zapas = (zapas na początek + zapas na koniec) ÷ 2. Rotacja w dniach = przeciętny zapas ÷ sprzedaż w okresie × liczba dni okresu.',
        ],
        example: {
          question: 'Nabiał w październiku (30 dni): zapas na początek 900 zł, na koniec 1100 zł, sprzedaż 6000 zł.',
          steps: ['Przeciętny zapas: (900 + 1100) ÷ 2 = 1000 zł.', 'Rotacja: 1000 ÷ 6000 × 30 = 5 dni.'],
          answer: 'Nabiał leży w sklepie średnio 5 dni.',
        },
      },
      ...note(
        15,
        'Przykład z nabiałem razem, potem pary liczą kawę. Zapytaj, dlaczego 30 dni dla kawy może być w porządku, a 30 dni dla nabiału byłoby katastrofą.',
        'Kiedy długa rotacja jest problemem, a kiedy nie?',
        'Gdy towar ma krótką datę ważności albo zamraża dużo pieniędzy. Kawa z długą datą może leżeć dłużej, nabiał nie.',
        'Porównywanie rotacji różnych towarów bez uwzględnienia ich trwałości.',
        'Policz rotację w razach dla nabiału (6000 ÷ 1000 = 6 razy w miesiącu).',
      ),
      activities: [
        number('q-przecietny', 'Kawa: zapas na początek października 2600 zł, na koniec 2200 zł. Jaki jest przeciętny zapas?', 2400, '(2600 + 2200) ÷ 2 = 2400 zł.', { unit: 'zł' }),
        number('q-rotacja-kawa', 'Sprzedaż kawy w październiku (30 dni) wyniosła 2400 zł w cenach zakupu. Jaka jest rotacja w dniach?', 30, '2400 ÷ 2400 × 30 = 30 dni. Kawa leży w sklepie średnio miesiąc.', {
          unit: 'dni',
          mistakes: [{ value: 1, text: 'To rotacja w razach (raz w miesiącu). Pomnóż przez liczbę dni okresu.' }],
        }),
        choice(
          'q-porownanie',
          'Nabiał rotuje w 5 dni, kawa w 30 dni. Co z tego wynika?',
          [
            'W kawie jest zamrożone więcej gotówki na dłużej',
            'Nabiał sprzedaje się źle, bo rotacja jest krótka',
            'Trzeba zamawiać więcej nabiału, żeby wydłużyć rotację',
            'Kawa sprzedaje się lepiej, bo jej rotacja jest dłuższa',
          ],
          0,
          'Krótka rotacja oznacza szybki obrót. Kawa leży długo — w zapasie czeka 2400 zł.',
          [
            null,
            'Krótka rotacja oznacza, że towar szybko się sprzedaje.',
            'Dłuższa rotacja nabiału zwiększyłaby ryzyko przeterminowania.',
            'Dłuższa rotacja oznacza wolniejszą sprzedaż względem zapasu.',
          ],
        ),
      ],
    },
    {
      id: 'sprawdzenie',
      label: 'Pieczywo',
      title: 'Nowy towar',
      grouping: 'solo',
      intro: 'Bochenki, które jutro są już czerstwe. Ile ich zamawiać?',
      ...note(
        5,
        'Samodzielnie. Na koniec przypomnij oba wzory.',
        'Czego potrzebujesz, żeby policzyć punkt zamówienia dla nowego towaru?',
        'Średniej sprzedaży dziennej, czasu dostawy i decyzji o zapasie bezpieczeństwa.',
        'Ustalanie zamówień „na oko” bez danych o sprzedaży.',
        'Policz punkt zamówienia dla lodów w upał: 25 opakowań dziennie, dostawa 2 dni, zapas 15 (65).',
      ),
      activities: [
        choice(
          'q-chleb',
          'Pieczywo: sprzedaż 120 bochenków dziennie, dostawa codziennie rano, data ważności 2 dni. Co jest rozsądne?',
          [
            'Codzienne zamówienie na dzień, mały zapas',
            'Zamawianie raz w tygodniu po 840 bochenków',
            'Zapas bezpieczeństwa 500 bochenków na zapleczu',
            'Zamawianie co drugi dzień po 240 bochenków',
          ],
          0,
          'Krótka data i codzienne dostawy: zamawiasz na bieżąco, prawie bez zapasu.',
          [
            null,
            'Pieczywo z tygodniowego zamówienia przekroczy datę po 2 dniach.',
            'Taki zapas się przeterminuje.',
            'Część pieczywa byłaby dzień przed końcem daty — gorzej się sprzedaje. Przy codziennych dostawach lepiej zamawiać codziennie.',
          ],
        ),
      ],
    },
    {
      id: 'decyzje',
      label: 'Decyzje',
      title: 'Co zrobić z zapasem?',
      grouping: 'class',
      intro: 'Na podstawie danych z kilku towarów właściciel prosi o decyzje.',
      ...note(
        8,
        'Pary dopasowują. Przy kawie zapytaj, jak zmniejszyć zapas bez strat (mniejsze, częstsze zamówienia).',
        'Jak zmniejszyć zapas kawy, nie tracąc klientów?',
        'Zamawiać mniejsze ilości częściej, ograniczyć liczbę rodzajów, które się słabo sprzedają.',
        'Przecenianie wszystkiego, co ma długą rotację.',
        'Zaproponuj decyzję dla towaru z rotacją 60 dni i datą ważności za 45 dni.',
      ),
      activities: [
        {
          type: 'matching',
          id: 'q-decyzje',
          question: 'Jaka decyzja?',
          options: ['Zamów teraz', 'Wstrzymaj zamówienia', 'Przeceń przed końcem daty'],
          rows: [
            { label: 'Woda: na stanie 170 zgrzewek, punkt zamówienia 180', correct: 0 },
            { label: 'Kawa: rotacja 30 dni, zapas 2200 zł, data ważności za rok', correct: 1 },
            { label: 'Jogurty owocowe: data za 2 dni, na stanie 40 sztuk, sprzedaż 8 dziennie', correct: 2, explanation: 'W 2 dni sprzeda się około 16 sztuk — reszta przekroczy datę.' },
            { label: 'Mleko: na stanie 75 litrów, punkt zamówienia 80', correct: 0 },
          ],
          explanation: 'Punkt zamówienia mówi, kiedy zamawiać. Długa rotacja trwałego towaru — kiedy wstrzymać. Krótka data i za duży zapas — kiedy przecenić.',
        },
        {
          type: 'resultCard',
          id: 'karta',
          badges: [
            { min: 0, name: 'Do powtórki', text: 'Wróć do przykładów z wodą i nabiałem.' },
            { min: 0.6, name: 'Liczysz zapasy', text: 'Powtórz decyzje o zapasie.' },
            { min: 0.85, name: 'Zapas pod kontrolą', text: 'Wiesz, kiedy zamawiać, i widzisz zamrożoną gotówkę.' },
          ],
        },
      ],
    },
  ],
  exitTicket: 'Punkt zamówienia = sprzedaż dzienna × czas dostawy + zapas bezpieczeństwa. Rotacja w dniach = przeciętny zapas ÷ sprzedaż × liczba dni. Długa rotacja to zamrożona gotówka.',
};
