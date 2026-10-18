import { choice, methods, note, number, text } from '../schema.js';

export default {
  id: '17',
  order: 17,
  part: 'B',
  title: 'Marketing mix: produkt, cena, miejsce, promocja',
  subtitle: 'Pudełko na lunch, bidon i torba. Jak z trzech zwykłych rzeczy zrobić ofertę dla osób, które codziennie zabierają jedzenie do pracy.',
  duration: 45,
  sessions: [45],
  han: ['HAN.02.4'],
  tags: ['4P', 'zestaw', 'promocja', 'spójność oferty'],
  realia: [],
  audience: {
    adults:
      'Dla dorosłych z pomysłem na firmę 4P to szybki test spójności: czy produkt, cena, kanał i komunikat mówią do tej samej osoby? Poproś, żeby na koniec wypełnili kartę 4P dla własnej oferty i zaznaczyli, czego jeszcze nie wiedzą (np. kosztów).',
  },
  format: {
    name: 'Karta 4P na przypadku',
    student:
      'Sklep z artykułami domowymi w Lublinie chce sprzedawać zestaw „lunch do pracy”. Przyporządkujesz decyzje do 4P, ustalisz cenę zestawu i sprawdzisz, czy komunikat nie obiecuje za dużo.',
    teacher:
      'Lekcja ćwiczy spójność: każda decyzja 4P ma odpowiadać temu samemu segmentowi. Uważaj na komunikaty ekologiczne — „wielokrotnego użytku” to fakt, „w 100% ekologiczny” to przesada bez dowodów.',
    grouping: 'Etapy 1 i 5 samodzielnie, etapy 2–4 w parach.',
    methods: [methods.przypadek, methods.jawne],
  },
  objectives: [
    'Przyporządkowuję decyzje do produktu, ceny, miejsca i promocji.',
    'Ustalam cenę zestawu i liczę rabat.',
    'Sprawdzam, czy wszystkie decyzje pasują do jednego segmentu.',
    'Piszę komunikat oparty na faktach o produkcie.',
  ],
  materials: ['Urządzenie z przeglądarką', 'Kalkulator'],
  teacherGuide: {
    preparation: 'Przygotuj na tablicy cztery kolumny: Produkt, Cena, Miejsce, Promocja. W etapie 2 uczniowie dopisują do nich decyzje.',
    summary:
      'Produkt: co dokładnie oferujemy (zestaw, wariant, opakowanie). Cena: ile i na jakich warunkach (zestaw, rabat). Miejsce: gdzie i jak klient kupuje i odbiera. Promocja: jak klient się dowie. Wszystkie cztery decyzje odpowiadają temu samemu segmentowi. Komunikat opiera się na potwierdzonych cechach.',
  },
  sections: [
    {
      id: 'start',
      label: 'Start',
      title: 'Która to decyzja?',
      grouping: 'solo',
      intro: 'Sklep postanawia: „Zamówienia z internetu można odebrać w sklepie od 7:30, przed pracą”.',
      ...note(
        5,
        'Każdy wybiera sam. Wytłumacz, że „miejsce” to nie tylko adres sklepu, ale cały sposób, w jaki klient kupuje i odbiera.',
        'Dlaczego godzina odbioru to decyzja o „miejscu”?',
        'Bo dotyczy tego, jak i kiedy towar trafia do klienta — czyli dystrybucji.',
        'Uznawanie każdej decyzji „dla wygody klienta” za promocję.',
        'Wymyśl inną decyzję o miejscu dla tego zestawu (np. paczkomat).',
      ),
      activities: [
        choice(
          'q-p',
          'Do którego z 4P należy ta decyzja?',
          ['Miejsce', 'Promocja', 'Produkt', 'Cena'],
          0,
          'Miejsce (dystrybucja) to sposób, w jaki klient kupuje i odbiera towar: sklep, internet, odbiór, dostawa, godziny.',
          [
            null,
            'Promocja to sposób informowania klienta, np. reklama czy wystawa.',
            'Produkt to sam towar i jego wersje, nie sposób odbioru.',
            'Cena to kwota i warunki płatności.',
          ],
        ),
      ],
    },
    {
      id: '4p',
      label: '4P',
      title: 'Cztery decyzje',
      grouping: 'pair',
      intro: 'Sklep sprzedaje pudełko na lunch (35 zł), bidon (30 zł) i torbę termiczną (15 zł). Wybrany segment: osoby, które codziennie zabierają posiłek do pracy.',
      reading: {
        title: 'Marketing mix',
        paragraphs: [
          'Produkt: co dokładnie sprzedajesz — wersja, zestaw, opakowanie, gwarancja. Cena: kwota, rabaty, zestawy, płatność. Miejsce: gdzie i jak klient kupuje i dostaje towar. Promocja: jak klient się o ofercie dowie i co usłyszy.',
        ],
      },
      ...note(
        10,
        'Pary dopasowują, potem dopisujecie decyzje na tablicy w czterech kolumnach.',
        'Która decyzja jest najsłabiej dopasowana do segmentu?',
        'Każda, która nie pasuje do porannego trybu dnia osoby pracującej, np. odbiór tylko od 10:00.',
        'Mieszanie promocji (komunikat) z ceną promocyjną (rabat).',
        'Dopisz po jednej decyzji do każdego P dla segmentu „studenci”.',
      ),
      activities: [
        {
          type: 'matching',
          id: 'q-decyzje',
          question: 'Do którego P należy decyzja?',
          options: ['Produkt', 'Cena', 'Miejsce', 'Promocja'],
          rows: [
            { label: 'Zestaw: pudełko, bidon i torba w jednym opakowaniu', correct: 0 },
            { label: 'Zestaw kosztuje 72 zł zamiast 80 zł', correct: 1 },
            { label: 'Odbiór zamówień internetowych od 7:30', correct: 2 },
            { label: 'Stoisko z zestawami przy wejściu do sklepu', correct: 3, explanation: 'Ekspozycja w sklepie to forma promocji — pokazuje ofertę klientom.' },
            { label: 'Post w lokalnej grupie osiedlowej', correct: 3 },
            { label: 'Dwa kolory pudełka do wyboru', correct: 0 },
          ],
          explanation: 'Produkt: co. Cena: za ile. Miejsce: gdzie i jak odebrać. Promocja: jak się dowiedzieć.',
        },
      ],
    },
    {
      id: 'cena',
      label: 'Cena',
      title: 'Ile za zestaw?',
      grouping: 'pair',
      intro: 'Kupione osobno: 35 + 30 + 15 zł. Sklep chce, żeby zestaw był tańszy niż suma, ale nie wie jeszcze, jaką ma marżę.',
      ...note(
        15,
        'Pary liczą i decydują. Przy pytaniu o marżę wróć do lekcji 19: bez ceny zakupu nie wiadomo, czy zestaw jest opłacalny.',
        'Czego brakuje, żeby wiedzieć, czy zestaw za 72 zł się opłaca?',
        'Cen zakupu (kosztu) towarów. Bez nich nie wiadomo, ile zostanie po rabacie.',
        'Ustalanie ceny zestawu „na oko”, bez sprawdzenia marży.',
        'Załóż, że koszt zakupu całego zestawu to 48 zł netto. Policz marżę przy cenie 72 zł brutto (72 ÷ 1,23 = 58,54 zł netto; marża 10,54 zł, około 18%).',
      ),
      activities: [
        number('q-suma', 'Ile kosztują trzy produkty kupione osobno?', 80, '35 + 30 + 15 = 80 zł.', { unit: 'zł' }),
        number('q-rabat', 'Zestaw kosztuje 72 zł. Jaki to rabat w procentach względem zakupu osobno?', 10, '(80 − 72) ÷ 80 × 100% = 10%.', {
          unit: '%',
          mistakes: [
            { value: 8, text: '8 to rabat w złotych. Procent liczysz od 80 zł.' },
            { value: 11.11, text: 'Dzielisz przez 72. Rabat liczy się od ceny przed obniżką, czyli 80 zł.' },
          ],
        }),
        choice(
          'q-spojnosc',
          'Która decyzja NIE pasuje do segmentu „osoby zabierające posiłek do pracy”?',
          [
            'Odbiór zamówień tylko w soboty od 12:00',
            'Odbiór zamówień w dni robocze od 7:30',
            'Zestaw z torbą termiczną zamiast samego pudełka',
            'Post w grupie pracowników pobliskiego biurowca',
          ],
          0,
          'Osoba pracująca odbiera rano przed pracą albo po pracy. Sobota w południe to rzadka okazja.',
          [
            null,
            'Ta decyzja pasuje — rano przed pracą.',
            'Torba termiczna odpowiada potrzebie: posiłek zabierany na cały dzień.',
            'Dociera tam, gdzie są osoby z tego segmentu.',
          ],
        ),
      ],
    },
    {
      id: 'komunikat',
      label: 'Komunikat',
      title: 'Co napisać na plakacie',
      grouping: 'pair',
      intro: 'Kierowniczka przygotowała hasła na plakat przy stoisku. Producent podaje, że pudełko jest wielokrotnego użytku i można je myć w zmywarce. Nie ma danych o śladzie węglowym ani recyklingu.',
      ...note(
        8,
        'Pary sprawdzają hasła. Zapytaj, które hasło najlepiej mówi o korzyści dla klienta, a nie o sklepie.',
        'Jak napisać hasło ekologiczne bez przesady?',
        'Podać fakt, który można sprawdzić: „Wielokrotnego użytku — mniej jednorazowych opakowań”.',
        'Hasła typu „najbardziej ekologiczny”, „zero śladu węglowego” bez danych.',
        'Napisz hasło dla segmentu „studenci”.',
      ),
      activities: [
        {
          type: 'spotErrors',
          id: 'q-hasla',
          title: 'Hasła na plakat',
          context: 'Zaznacz hasła, które obiecują więcej, niż wiemy.',
          lines: [
            { text: 'Lunch do pracy w jednym zestawie — 72 zł zamiast 80 zł.' },
            { text: 'Najbardziej ekologiczny zestaw na świecie!', error: 'Brak jakichkolwiek danych porównawczych. To przesada.' },
            { text: 'Pudełko wielokrotnego użytku, można myć w zmywarce.' },
            { text: 'Zero śladu węglowego.', error: 'Każdy produkt ma ślad węglowy. Brak danych od producenta.' },
            { text: 'Odbierz rano przed pracą, od 7:30.' },
          ],
          explanation: 'Dwa hasła do usunięcia. Pozostałe opierają się na faktach i mówią o korzyści dla klienta.',
        },
      ],
    },
    {
      id: 'sprawdzenie',
      label: 'Sprawdzenie',
      title: 'Inny segment',
      grouping: 'solo',
      intro: 'Latem sklep chce sprzedawać zestaw turystom, którzy jadą nad Zalew Zemborzycki.',
      ...note(
        7,
        'Samodzielnie. Porównaj kilka kart 4P: czy wszystkie cztery decyzje mówią do tego samego klienta?',
        'Które P zmieniają się najbardziej, gdy zmienia się segment?',
        'Zwykle miejsce (gdzie turysta kupi) i promocja (gdzie go znaleźć), czasem też produkt (większy bidon).',
        'Zmienianie tylko promocji, przy tym samym miejscu i godzinach.',
        'Zaproponuj wersję produktu dla turystów.',
      ),
      activities: [
        choice(
          'q-turysci',
          'Co zmienisz w pierwszej kolejności dla turystów?',
          [
            'Miejsce i promocję: stoisko blisko plaży, informacja tam',
            'Tylko cenę: zestaw tańszy o 5 zł dla wszystkich klientów',
            'Nic, bo zestaw jest dobry dla każdego, kto je poza domem',
            'Tylko kolor pudełka na bardziej wakacyjny, np. żółty',
          ],
          0,
          'Turysta nie przyjdzie do sklepu na osiedlu rano. Trzeba dotrzeć tam, gdzie jest, i powiedzieć mu o ofercie na miejscu.',
          [
            null,
            'Cena nie sprawi, że turysta dowie się o ofercie i trafi do sklepu.',
            'Inny segment ma inne potrzeby i inne miejsca zakupu.',
            'Kolor to drobna zmiana produktu. Największy problem to dotarcie do turysty.',
          ],
        ),
        text(
          'q-karta',
          'Wypełnij krótką kartę 4P dla osób zabierających lunch do pracy.',
          'Produkt: zestaw pudełko + bidon + torba termiczna, dwa kolory. Cena: 72 zł za zestaw (10% taniej niż osobno) — do sprawdzenia marża. Miejsce: sklep i zamówienia internetowe z odbiorem od 7:30. Promocja: stoisko przy wejściu i post w grupie pracowników biurowca, hasło „Lunch do pracy w jednym zestawie”.',
          { minLength: 60, rows: 5, criteria: ['Są wszystkie cztery P.', 'Decyzje pasują do jednego segmentu.', 'Jest zaznaczone, czego nie wiemy (marża).'] },
        ),
        {
          type: 'resultCard',
          id: 'karta',
          badges: [
            { min: 0, name: 'Do powtórki', text: 'Wróć do przyporządkowania decyzji do 4P.' },
            { min: 0.6, name: 'Myślisz w 4P', text: 'Powtórz spójność decyzji i uczciwy komunikat.' },
            { min: 0.85, name: 'Spójna oferta', text: 'Wszystkie cztery decyzje mówią do tego samego klienta.' },
          ],
        },
      ],
    },
  ],
  exitTicket: 'Produkt, cena, miejsce, promocja — każda decyzja dla tego samego segmentu. Rabat zestawu liczy się od sumy cen osobno. Komunikat tylko z faktów.',
};
