import { choice, methods, note, number, text } from '../schema.js';

export default {
  id: '05',
  order: 5,
  part: 'A',
  title: 'Ekspozycja towaru i planogram',
  subtitle: 'Dlaczego mleko stoi w głębi sklepu, guma do żucia przy kasie, a nowa kawa na wysokości oczu.',
  duration: 45,
  sessions: [45],
  han: ['HAN.01.3'],
  tags: ['ekspozycja', 'planogram', 'facing', 'merchandising'],
  realia: [],
  audience: {
    adults:
      'Dorośli od razu przenoszą tę lekcję na swoje zakupy — zacznij od pytania, gdzie w ich sklepie stoi chleb i dlaczego. Osobom z małym sklepem lub stoiskiem zaproponuj, żeby na koniec narysowali plan swojej półki z liczbą facingów dla trzech najlepiej sprzedających się towarów.',
  },
  format: {
    name: 'Ścieżka klienta i plan półki',
    student:
      'Pracujesz w sklepie osiedlowym w Rzeszowie. Ustalisz, gdzie stawiać towary, policzysz miejsce na półce i sprawdzisz półkę po zmianie popołudniowej.',
    teacher:
      'Uczniowie najpierw poznają strefy sklepu i wysokości półek, potem liczą facingi według sprzedaży, a na końcu wyszukują błędy na półce. Dobrze działa krótka obserwacja: uczniowie przypominają sobie układ sklepu, w którym robią zakupy.',
    methods: [methods.jawne, methods.przypadek],
  },
  objectives: [
    'Wskazuję, gdzie w sklepie i na jakiej wysokości postawić towar.',
    'Liczę facingi i dzielę półkę według sprzedaży.',
    'Znajduję błędy na półce: ceny, daty, luki, uszkodzone opakowania.',
  ],
  materials: ['Kartka do szkicu półki (nie jest konieczna)'],
  teacherGuide: {
    preparation: 'Jeśli możesz, zrób zdjęcie jednej półki w pobliskim sklepie (bez ludzi) i pokaż je przy planogramie. Wystarczy też opis z platformy.',
    summary:
      'Towary codziennej potrzeby stoją w głębi sklepu, żeby klient przeszedł obok innych. Przy kasie — drobne zakupy impulsowe. Na wysokości oczu — towary, które sklep chce sprzedać najbardziej, na dole — ciężkie i duże. Liczba facingów powinna odpowiadać sprzedaży. Półkę sprawdza się codziennie: ceny, daty, luki, uszkodzenia.',
  },
  sections: [
    {
      id: 'strefy',
      label: 'Strefy',
      title: 'Gdzie stoi mleko, a gdzie gumy do żucia',
      grouping: 'class',
      intro: 'Pomyśl o sklepie, w którym najczęściej robisz zakupy. Gdzie stoją mleko i pieczywo? Każde miejsce w sklepie sprzedaje inaczej — tak samo każda półka w regale.',
      reading: {
        title: 'Gdzie co stawiać',
        paragraphs: [
          'Przy wejściu klient zwalnia i rozgląda się — dobre miejsce na towary sezonowe i owoce. W głębi sklepu stoją towary codziennej potrzeby. Przy kasie — drobne zakupy z impulsu: gumy, baterie, napoje.',
          'Na regale najlepiej sprzedaje się półka na wysokości oczu: tam stawia się nowości i towary z wyższą marżą. Niżej, na wysokości rąk — popularne marki. Na dole — ciężkie i duże opakowania. Na górze — lekkie towary i zapas.',
        ],
      },
      ...note(
        15,
        'Zacznij od rozmowy z całą grupą: ile regałów mijacie, zanim dojdziecie do mleka? Potem pytanie o mleko, lektura i dopasowanie. Przy omówieniu zapytaj o wodę: dlaczego dół, skoro to towar popularny?',
        'Dlaczego dzieci widzą słodycze, a dorośli kawę?',
        'Bo sklep stawia towary na wysokości oczu osoby, która ma je kupić — półki z produktami dla dzieci bywają niżej.',
        'Stawianie ciężkich towarów wysoko, bo „tam było wolne miejsce”.',
        'Zaproponuj miejsce dla parasoli w deszczowy dzień (przy wejściu).',
      ),
      activities: [
        choice(
          'q-mleko',
          'Dlaczego w wielu sklepach mleko i pieczywo stoją w głębi sali?',
          [
            'Klient idzie po nie obok innych towarów',
            'Tam jest najchłodniej w całym sklepie, więc nie trzeba lodówek',
            'Dostawcy nabiału płacą za miejsce jak najdalej od kasy w sklepie',
          ],
          0,
          'To towary, po które przychodzi prawie każdy. Gdy stoją w głębi, klient po drodze widzi inne produkty.',
          [
            null,
            'Nabiał i tak stoi w lodówkach. Miejsce wynika z drogi klienta.',
            'Dostawcy płacą raczej za lepsze miejsca, np. na wysokości oczu, a nie za gorsze.',
          ],
        ),
        {
          type: 'matching',
          id: 'q-miejsce',
          question: 'Gdzie postawisz towar?',
          options: ['Przy kasie', 'Na wysokości oczu', 'Dolna półka', 'W głębi sklepu'],
          rows: [
            { label: 'Gumy do żucia i baterie', correct: 0 },
            { label: 'Nowa kawa z wyższą marżą', correct: 1 },
            { label: 'Zgrzewki wody 6 × 1,5 l', correct: 2 },
            { label: 'Mleko i chleb', correct: 3 },
            { label: 'Worki ziemniaków 5 kg', correct: 2 },
          ],
          explanation: 'Impulsowe przy kasie, priorytetowe na wysokości oczu, ciężkie na dole, codzienne w głębi.',
        },
      ],
    },
    {
      id: 'planogram',
      label: 'Planogram',
      title: 'Ile miejsca dla płatków?',
      grouping: 'pair',
      intro: 'Planogram to rysunek półki: gdzie stoi który towar i ile ma frontów (facingów). Facing to jedno opakowanie ustawione przodem do klienta.',
      reading: {
        paragraphs: [
          'Towar, który sprzedaje się szybciej, dostaje więcej facingów — rzadziej się kończy i łatwiej go znaleźć. Towary powiązane stoją obok siebie: makaron przy sosach, chipsy przy napojach.',
        ],
        example: {
          question: 'Półka ma 120 cm. Opakowanie herbaty ma 15 cm szerokości. Ile facingów zmieści się w rzędzie?',
          steps: ['Dzielisz szerokość półki przez szerokość opakowania: 120 ÷ 15 = 8.', 'Jeśli wynik nie jest całkowity, zaokrąglasz w dół — połowa opakowania się nie zmieści.'],
          answer: '8 facingów.',
        },
      },
      ...note(
        12,
        'Pary liczą. Przy podziale 6 : 2 zapytaj, co by się stało, gdyby oba rodzaje dostały po 4 facingi.',
        'Co się dzieje, gdy szybko sprzedający się towar ma za mało miejsca?',
        'Szybko znika z półki, klient go nie znajduje, kupuje gdzie indziej. Sklep traci sprzedaż.',
        'Dzielenie półki po równo między produkty bez względu na sprzedaż.',
        'Policz podział, gdyby płatki A sprzedawały się 2 razy szybciej (5 i 3, po zaokrągleniu).',
      ),
      activities: [
        number('q-facingi', 'Półka ma 160 cm, opakowanie płatków — 20 cm szerokości. Ile facingów zmieści się w rzędzie?', 8, '160 ÷ 20 = 8 facingów.', { unit: 'szt.' }),
        number('q-podzial', 'Płatki A sprzedają się 3 razy szybciej niż płatki B. Ile z 8 facingów dasz płatkom A, jeśli dzielisz miejsce według sprzedaży?', 6, 'Sprzedaż A : B = 3 : 1, czyli 4 części. Jedna część to 8 ÷ 4 = 2 facingi. A dostaje 3 × 2 = 6, B dostaje 2.', {
          unit: 'facingów',
          mistakes: [
            { value: 4, text: 'To podział po równo. Sprzedaż jest w proporcji 3 : 1.' },
            { value: 3, text: 'Proporcja 3 : 1 oznacza 4 części po 2 facingi. A dostaje 3 części, czyli 6.' },
          ],
        }),
        choice(
          'q-obok',
          'Co postawisz obok makaronu spaghetti?',
          ['Sos pomidorowy w słoiku', 'Proszek do pieczenia', 'Płyn do naczyń w promocji', 'Karmę dla kota', 'Pieluchy, bo mają wysoką marżę'],
          0,
          'Towary powiązane obok siebie podpowiadają klientowi drugi zakup.',
          ['', 'Proszek do pieczenia pasuje do mąki i dodatków do ciast.', 'Chemia stoi osobno od żywności.', 'Karma dla zwierząt ma swój dział i nie łączy się z makaronem.', 'Sama marża nie wystarczy. Obok siebie stoją towary, które kupuje się razem.'],
        ),
      ],
    },
    {
      id: 'kontrola',
      label: 'Kontrola',
      title: 'Półka po zmianie popołudniowej',
      grouping: 'pair',
      intro: 'O 18:00 kierowniczka prosi o sprawdzenie regału z kawą i herbatą przed szczytem wieczornym.',
      ...note(
        10,
        'Pary sprawdzają opis półki. Przy omówieniu zatrzymaj się na wierszu o luce zasłoniętej innym towarem.',
        'Dlaczego zasłonięcie pustego miejsca innym towarem jest problemem, skoro półka wygląda na pełną?',
        'Bo towar jest na zapleczu, a klient myśli, że go nie ma. Sklep traci sprzedaż i nie wie, że trzeba uzupełnić.',
        'Pomijanie ceny pod niewłaściwym towarem — dla klienta to wprowadzenie w błąd.',
        'Zaproponuj, jak oznaczyć brak towaru na półce, gdy dostawa jest jutro.',
      ),
      activities: [
        {
          type: 'spotErrors',
          id: 'q-polka',
          title: 'Notatki z kontroli regału',
          context: 'Zaznacz to, co trzeba poprawić.',
          lines: [
            { text: 'Kawy mielone 500 g stoją na dolnej półce, mniejsze opakowania wyżej.' },
            { text: 'Etykieta z ceną herbaty zielonej jest pod herbatą czarną.', error: 'Cena musi być przy właściwym towarze. Klient może żądać ceny korzystniejszej dla siebie.' },
            { text: 'Kawy z datą do listopada stoją z tyłu, za kawami z datą do marca.', error: 'Krótsza data idzie do przodu (FEFO).' },
            { text: 'Puste miejsce po kawie rozpuszczalnej zasłonięto herbatą, choć na zapleczu są 2 kartony kawy.', error: 'Towar jest na zapleczu — trzeba uzupełnić półkę, a nie ją maskować.' },
            { text: 'Przy kawie są ceny za kilogram.' },
            { text: 'W pierwszym rzędzie stoi pudełko herbaty z rozdartą folią.', error: 'Uszkodzone opakowanie zdejmij z półki i odłóż do sprawdzenia.' },
            { text: 'Nowa kawa w promocji stoi na wysokości oczu.' },
          ],
          explanation: 'Cztery poprawki: cena przy właściwym towarze, kolejność dat, uzupełnienie z zaplecza, usunięcie uszkodzonego opakowania.',
        },
      ],
    },
    {
      id: 'sprawdzenie',
      label: 'Drogeria',
      title: 'Drogeria zamiast sklepu spożywczego',
      grouping: 'solo',
      intro: 'Te same zasady działają w drogerii, aptece i sklepie z narzędziami. Najpierw krem, potem sklep, który znasz.',
      ...note(
        8,
        'Samodzielnie. Odpowiedzi otwarte omów krótko: czy zmiana jest wykonalna w jeden dzień?',
        'Co zmienisz jako pierwsze w sklepie, który znasz?',
        'Konkret: przesunąć towar, dołożyć facingi, poprawić ceny, uporządkować strefę przy kasie.',
        'Ogólniki typu „żeby było ładniej”.',
        'Narysuj planogram jednej półki z tego sklepu.',
      ),
      activities: [
        choice(
          'q-drogeria',
          'Drogeria wprowadza nowy krem z wysoką marżą. Gdzie go postawić na regale?',
          ['Na wysokości oczu', 'Na najniższej półce, przy zapasach', 'Na samej górze, żeby się wyróżniał', 'W kartonie na zapleczu do zapytania'],
          0,
          'Na wysokości oczu towar sprzedaje się najlepiej. Tam stawia się nowości i towary z wyższą marżą.',
          ['', 'Na dole klient szuka zwykle dużych i ciężkich opakowań.', 'Górna półka jest najmniej widoczna i trudna do sięgnięcia.', 'Towaru, którego klient nie widzi, nie kupi.'],
        ),
        text(
          'q-zmiana',
          'Opisz jedną zmianę ekspozycji w sklepie, który znasz. Gdzie, co i dlaczego?',
          'W sklepie osiedlowym baterie leżą w głębi przy chemii. Warto przenieść je przy kasę, bo to zakup z impulsu i klienci często o nich zapominają. Zwolnione miejsce można dać płynowi do naczyń, który często się kończy.',
          { criteria: ['Zmiana jest konkretna.', 'Uzasadnienie wynika z zasad ekspozycji.'] },
        ),
        {
          type: 'resultCard',
          id: 'karta',
          badges: [
            { min: 0, name: 'Do powtórki', text: 'Wróć do stref sklepu i do przykładu z herbatą.' },
            { min: 0.6, name: 'Układasz półki', text: 'Powtórz jeszcze kontrolę półki.' },
            { min: 0.85, name: 'Planogram w małym palcu', text: 'Wiesz, gdzie co postawić i jak to sprawdzić.' },
          ],
        },
      ],
    },
  ],
  exitTicket: 'Codzienne w głębi, impulsowe przy kasie, priorytetowe na wysokości oczu, ciężkie na dole. Facingi według sprzedaży. Kontrola półki: cena, data, luka, uszkodzenie.',
};
