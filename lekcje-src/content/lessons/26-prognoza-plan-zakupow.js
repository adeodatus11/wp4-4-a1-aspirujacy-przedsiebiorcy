import { choice, methods, note, number, text } from '../schema.js';

const history = {
  type: 'info',
  tone: 'case',
  title: 'Sklep papierniczy w Kaliszu: sprzedaż w 2025 roku (sztuki)',
  table: {
    head: ['Towar', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik'],
    rows: [
      ['Zeszyt A5, 32 kartki', '300', '1100', '1500', '450'],
      ['Papier do drukarki, ryza', '210', '190', '200', '205'],
      ['Długopis niebieski', '150', '480', '570', '200'],
    ],
  },
  paragraphs: ['W 2026 roku sprzedaż zeszytów i długopisów rośnie o około 5% rok do roku (więcej uczniów w nowym osiedlu). Papier sprzedaje się równo przez cały rok.'],
};

export default {
  id: '26',
  order: 26,
  part: 'B',
  title: 'Prognoza sprzedaży i plan zakupów',
  subtitle: 'Ile zeszytów zamówić na wrzesień? Za mało — klienci pójdą gdzie indziej. Za dużo — pieniądze utkną w kartonach do następnego roku.',
  duration: 90,
  sessions: [45, 45],
  han: ['HAN.02.3'],
  tags: ['prognoza', 'sezonowość', 'plan zakupów', 'budżet'],
  realia: [],
  audience: {
    adults:
      'Dla prowadzących sklep to codzienna decyzja: ile zamówić. Lekcja daje prosty, ręczny sposób prognozy bez programów. Poproś dorosłych, żeby przenieśli go na swój towar sezonowy (np. znicze, ogród, prezenty) i porównali z tym, ile zamówili w zeszłym roku.',
  },
  format: {
    name: 'Prognoza na danych historycznych i plan zakupów',
    student:
      'Planujesz zakupy sklepu papierniczego w Kaliszu na wrzesień. Wybierzesz metodę prognozy dla każdego towaru, policzysz prognozy, przygotujesz plan zakupów i zmieścisz go w budżecie.',
    teacher:
      'Prognozowanie zapotrzebowania pojawia się w zadaniach egzaminacyjnych HAN.02. Uczniowie poznają trzy proste metody i uczą się wybierać je do rodzaju towaru. Druga lekcja: plan zakupów (prognoza + zapas końcowy − zapas początkowy) i ograniczenie budżetu.',
    grouping: 'Po przerwie zamiana par.',
    methods: [methods.przyklady, methods.przypadek, methods.metapoznanie],
  },
  objectives: [
    'Dobieram metodę prognozy do rodzaju towaru (stały, sezonowy).',
    'Liczę prognozę sprzedaży na podstawie danych historycznych.',
    'Liczę ilość do zakupu z uwzględnieniem zapasów.',
    'Dopasowuję plan zakupów do dostępnego budżetu.',
  ],
  materials: ['Kalkulator'],
  teacherGuide: {
    preparation: 'Narysuj na tablicy wykres słupkowy sprzedaży zeszytów z tabeli (lipiec–październik) — skok we wrześniu będzie widoczny od razu.',
    summary:
      'Dla towarów stałych prognoza to średnia z ostatnich miesięcy. Dla sezonowych — ten sam miesiąc rok wcześniej, skorygowany o zmianę (np. +5%). Ilość do zakupu = prognoza sprzedaży + planowany zapas na koniec − zapas na początek. Gdy budżet nie wystarcza, ustala się priorytety i rozkłada zakupy w czasie albo negocjuje termin płatności.',
  },
  sections: [
    {
      id: 'metody',
      label: 'Wrzesień',
      title: 'Na czym oprzeć prognozę?',
      grouping: 'pair',
      intro: 'Stażysta proponuje: „Na wrzesień zamówmy tyle zeszytów, ile sprzedaliśmy w sierpniu”. Do różnych towarów pasują różne metody prognozy.',
      reading: {
        title: 'Jak prognozować bez programu',
        paragraphs: [
          'Prognoza naiwna: „będzie tak jak ostatnio” — dla towarów bardzo stabilnych i na krótki okres. Średnia z kilku ostatnich miesięcy — dla towarów sprzedających się równo, wygładza przypadkowe wahania. Ten sam miesiąc rok wcześniej plus zmiana — dla towarów sezonowych.',
        ],
      },
      ...note(
        17,
        'Zacznij od propozycji stażysty: każdy sam decyduje, na czym oprzeć prognozę zeszytów. Potem Pary dopasowują metody. Zapytaj, dlaczego średnia z 3 miesięcy jest lepsza dla papieru niż sam ostatni miesiąc.',
        'Po co średnia, skoro papier sprzedaje się równo?',
        'Bo nawet przy równej sprzedaży są drobne wahania (190, 200, 205). Średnia je wygładza.',
        'Używanie średniej rocznej dla towaru z wyraźnym sezonem.',
        'Dobierz metodę dla zniczy przed 1 listopada.',
      ),
      activities: [
        history,
        choice(
          'q-metoda',
          'Na czym oprzeć prognozę zeszytów na wrzesień 2026?',
          [
            'Na wrześniu 2025, skorygowanym o zmianę',
            'Na sierpniu 2025, bo to ostatni miesiąc przed wrześniem',
            'Na średniej z lipca, sierpnia i października 2025',
            'Na październiku 2025, bo to najnowsze dane',
          ],
          0,
          'Zeszyty są sezonowe. Najlepiej porównać ten sam miesiąc rok wcześniej i uwzględnić zmianę.',
          [
            null,
            'Sierpień ma inną sprzedaż niż wrzesień — szczyt jest później.',
            'Średnia z innych miesięcy rozmywa szczyt wrześniowy.',
            'Październik jest już po szczycie sezonu.',
          ],
        ),
        {
          type: 'matching',
          id: 'q-metody',
          question: 'Jaką metodę wybierzesz?',
          options: ['Średnia z ostatnich miesięcy', 'Ten sam miesiąc rok wcześniej + zmiana'],
          rows: [
            { label: 'Papier do drukarki', correct: 0 },
            { label: 'Zeszyty na wrzesień', correct: 1 },
            { label: 'Znicze na koniec października', correct: 1 },
            { label: 'Kawa w biurowym sklepiku', correct: 0 },
            { label: 'Długopisy na wrzesień', correct: 1 },
          ],
          explanation: 'Towar stały — średnia. Towar sezonowy — ten sam okres rok wcześniej, z korektą.',
        },
      ],
    },
    {
      id: 'prognozy',
      label: 'Prognozy',
      title: 'Liczymy prognozy',
      grouping: 'solo',
      intro: 'Policz prognozy sprzedaży na wrzesień 2026.',
      reading: {
        example: {
          question: 'Długopisy: wrzesień 2025 — 570 sztuk, wzrost o 5%.',
          steps: ['Wrzesień 2025: 570 sztuk.', 'Wzrost 5%: 570 × 1,05 = 598,5.', 'Zaokrąglasz do pełnych sztuk w górę: 599. W praktyce do opakowania zbiorczego, np. 600.'],
          answer: 'Około 600 długopisów.',
        },
      },
      ...note(
        15,
        'Przykład z długopisami razem, potem pary liczą zeszyty i papier. Zapytaj, dlaczego zaokrągla się w górę.',
        'Dlaczego zaokrąglamy prognozę w górę i do opakowań?',
        'Bo nie kupuje się połowy długopisu, a hurtownia sprzedaje w opakowaniach zbiorczych.',
        'Liczenie średniej dla zeszytów i wzrostu dla papieru (odwrotnie).',
        'Policz prognozę zeszytów, gdyby wzrost wynosił 10% (1650).',
      ),
      activities: [
        history,
        number('q-zeszyty', 'Jaka jest prognoza sprzedaży zeszytów na wrzesień 2026?', 1575, '1500 × 1,05 = 1575 sztuk.', {
          unit: 'szt.',
          mistakes: [
            { value: 1155, text: 'To sierpień 2025 + 5%. Dla września weź wrzesień rok wcześniej.' },
            { value: 1500, text: 'To wrzesień 2025. Uwzględnij wzrost o 5%.' },
          ],
        }),
        number('q-papier', 'Jaka jest prognoza sprzedaży papieru na wrzesień 2026 jako średnia z lipca, sierpnia i września 2025?', 200, '(210 + 190 + 200) ÷ 3 = 200 ryz.', { unit: 'ryz' }),
      ],
    },
    {
      id: 'ryzyko',
      label: 'Ryzyko',
      title: 'Co może pójść inaczej',
      grouping: 'pair',
      intro: 'Prognoza to najlepsze przypuszczenie, a nie pewność. Warto wiedzieć, co może ją zmienić.',
      breakAfter: true,
      ...note(
        13,
        'Pary zaznaczają czynniki i odpowiadają. Po przerwie robicie plan zakupów.',
        'Która pomyłka jest gorsza dla sklepu papierniczego we wrześniu: za dużo czy za mało zeszytów?',
        'Za mało — w szczycie sezonu klienci pójdą do konkurencji i kupią tam całą wyprawkę. Nadmiar zeszytów sprzeda się w kolejnych miesiącach.',
        'Ignorowanie zmian w otoczeniu (nowe osiedle, nowa konkurencja).',
        'Ustal, kiedy we wrześniu sprawdzisz, czy prognoza się sprawdza (np. po pierwszym tygodniu).',
      ),
      activities: [
        {
          type: 'multi',
          id: 'q-czynniki',
          question: 'Co może zmienić sprzedaż zeszytów we wrześniu? Zaznacz wszystkie realne czynniki.',
          options: [
            'Otwarcie nowej szkoły w okolicy',
            'Promocja zeszytów w markecie obok',
            'Zmiana koloru logo sklepu',
            'Zmiana listy podręczników i zeszytów wymaganych w szkołach',
            'Data imienin właściciela sklepu',
          ],
          correct: [0, 1, 3],
          explanation: 'Na sprzedaż wpływają klienci (szkoły), konkurencja i wymagania szkół. Logo i imieniny — nie.',
          hint: 'Szukaj czynników, które zmieniają liczbę klientów albo ich wybory.',
        },
        choice(
          'q-pomylka',
          'Prognoza zeszytów okazała się za niska. Co jest najbardziej prawdopodobnym skutkiem?',
          [
            'Klienci kupią całą wyprawkę u konkurencji',
            'Sklep zarobi więcej, bo mniej wydał na towar',
            'Klienci poczekają do października na nową dostawę',
          ],
          0,
          'W szczycie sezonu brak towaru oznacza utratę klienta i jego całego koszyka.',
          [
            null,
            'Mniejszy zakup to też mniejsza sprzedaż, a do tego utrata klientów.',
            'Uczniowie potrzebują zeszytów na początku września.',
          ],
        ),
      ],
    },
    {
      id: 'plan',
      label: 'Plan i budżet',
      title: 'Ile kupić?',
      grouping: 'pair',
      intro: 'Ilość do zakupu zależy nie tylko od prognozy, ale też od tego, co już jest w magazynie, i ile chcesz mieć na koniec miesiąca. Po przerwie zmieńcie pary.',
      reading: {
        title: 'Wzór na zakup',
        paragraphs: ['Zakup = prognoza sprzedaży + planowany zapas na koniec okresu − zapas na początek okresu.'],
        example: {
          question: 'Zeszyty: prognoza 1575, zapas na 1 września 350, na koniec września chcesz mieć 200.',
          steps: ['1575 + 200 = 1775 — tyle potrzebujesz razem na sprzedaż i zapas końcowy.', 'Masz już 350: 1775 − 350 = 1425.'],
          answer: 'Zakup: 1425 zeszytów.',
        },
      },
      ...note(
        30,
        'Najpierw plan zakupów, potem zderzenie z budżetem: na koncie jest 4000 zł, a plan kosztuje 5616 zł. Przykład razem, potem pary uzupełniają plan. Zapytaj, po co zapas na koniec miesiąca.',
        'Po co planować zapas na koniec września?',
        'Żeby na początku października nie było pustej półki, zanim przyjdzie kolejna dostawa.',
        'Pomijanie zapasu początkowego i kupowanie całej prognozy.',
        'Policz zakup zeszytów, gdyby zapas początkowy wynosił 500 (1275).',
      ),
      activities: [
        {
          type: 'docForm',
          id: 'doc-plan',
          title: 'Plan zakupów na wrzesień 2026',
          points: 6,
          doc: {
            title: 'Plan zakupów — wrzesień 2026',
            table: {
              head: ['Towar', 'Prognoza', 'Zapas końcowy', 'Zapas początkowy', 'Zakup (szt.)', 'Cena zakupu', 'Wartość zakupu'],
              rows: [
                ['Zeszyt A5', '1575', '200', '350', '1425', '1,40', { f: 'zw' }],
                ['Papier, ryza', '200', '50', '80', { f: 'pz' }, '18,00', { f: 'pw' }],
                ['Długopis', '600', '100', '40', { f: 'dz' }, '0,85', { f: 'dw' }],
              ],
            },
            after: [['Razem wartość zakupu', { f: 'razem' }]],
          },
          fields: {
            zw: { label: 'Zeszyty — wartość zakupu', answer: 1995, hint: '1425 × 1,40.' },
            pz: { label: 'Papier — zakup', answer: 170, hint: 'Prognoza + zapas końcowy − zapas początkowy.' },
            pw: { label: 'Papier — wartość zakupu', answer: 3060, hint: 'Zakup × 18,00.' },
            dz: { label: 'Długopisy — zakup', answer: 660, hint: 'Prognoza + zapas końcowy − zapas początkowy.' },
            dw: { label: 'Długopisy — wartość zakupu', answer: 561, hint: 'Zakup × 0,85.' },
            razem: { label: 'Razem wartość zakupu', answer: 5616, hint: 'Suma trzech wartości.' },
          },
          explanation: 'Zeszyty 1995 zł, papier 170 ryz za 3060 zł, długopisy 660 sztuk za 561 zł. Razem 5616 zł netto.',
        },
        number('q-brak', 'O ile plan zakupów przekracza budżet?', 1616, '5616 − 4000 = 1616 zł.', { unit: 'zł' }),
        choice(
          'q-rozwiazanie',
          'Co zrobić z brakującymi 1616 zł?',
          [
            'Część papieru kupić później lub z terminem płatności',
            'Zmniejszyć zakup zeszytów o połowę, bo są najdroższe',
            'Zrezygnować z długopisów, bo to tani towar',
            'Kupić wszystko i zapłacić hurtowni, gdy zostaną pieniądze',
          ],
          0,
          'Papier sprzedaje się równo — można go rozłożyć na dwie dostawy. Towary sezonowe muszą być na początku września. Termin płatności daje czas na sprzedaż.',
          [
            null,
            'Zeszyty to główna sprzedaż września. Zmniejszenie ich zakupu oznacza utracone klienty.',
            'Długopisy to część wyprawki. Ich brak wypycha klienta do konkurencji, a kosztują tylko 561 zł.',
            'Termin zapłaty trzeba uzgodnić z hurtownią przed zakupem, a nie po.',
          ],
        ),
      ],
    },
    {
      id: 'sprawdzenie',
      label: 'Znicze',
      title: 'Nowy sezon',
      grouping: 'solo',
      intro: 'Listopad i znicze: nowe dane i krótka rekomendacja dla właściciela.',
      ...note(
        15,
        'Samodzielnie. Przeczytaj 2–3 rekomendacje: czy mają liczby i priorytety?',
        'Co powinno znaleźć się w rekomendacji zakupowej?',
        'Prognozy, ilości do zakupu, koszt, decyzję o priorytetach przy ograniczonym budżecie i termin sprawdzenia, czy prognoza się sprawdza.',
        'Rekomendacje bez liczb albo z pominięciem budżetu.',
        'Przygotuj podobny plan na grudzień dla kalendarzy.',
      ),
      activities: [
        text(
          'q-rekomendacja',
          'Napisz rekomendację zakupów na wrzesień dla właściciela sklepu (2–3 zdania z liczbami).',
          'Rekomenduję zakup 1425 zeszytów (1995 zł) i 660 długopisów (561 zł) przed 1 września — to towary sezonowe. Papier kupujemy w dwóch dostawach: 80 ryz teraz, 90 ryz w połowie września, żeby zmieścić się w budżecie 4000 zł. Po pierwszym tygodniu września sprawdzimy sprzedaż zeszytów i ewentualnie domówimy.',
          { minLength: 80, criteria: ['Są ilości i wartości zakupów.', 'Jest decyzja, jak zmieścić się w budżecie.', 'Jest termin sprawdzenia prognozy.'] },
        ),
        number('q-znicze', 'Kwiaciarnia sprzedała w październiku 2025 roku 800 zniczy. W tym roku spodziewa się spadku o 10%. Ma 120 zniczy, a na koniec października chce mieć 30. Ile kupić?', 630, 'Prognoza: 800 × 0,9 = 720. Zakup: 720 + 30 − 120 = 630 zniczy.', {
          unit: 'szt.',
          mistakes: [
            { value: 720, text: 'To prognoza sprzedaży. Uwzględnij zapasy: + 30 − 120.' },
            { value: 790, text: 'Prognoza po spadku to 800 × 0,9, a nie 800 − 10.' },
          ],
        }),
        {
          type: 'resultCard',
          id: 'karta',
          badges: [
            { min: 0, name: 'Do powtórki', text: 'Wróć do metod prognozy i wzoru na zakup.' },
            { min: 0.6, name: 'Prognozujesz', text: 'Powtórz plan zakupów i budżet.' },
            { min: 0.85, name: 'Planista zakupów', text: 'Przewidzisz sprzedaż sezonu i zmieścisz zakupy w budżecie.' },
          ],
        },
      ],
    },
  ],
  exitTicket: 'Towar stały — średnia z ostatnich miesięcy. Sezonowy — ten sam miesiąc rok temu ± zmiana. Zakup = prognoza + zapas końcowy − zapas początkowy. Brak budżetu — priorytety, rozłożenie w czasie, termin płatności.',
};
