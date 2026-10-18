import { choice, methods, note, number, text } from '../schema.js';

const washers = {
  type: 'info',
  tone: 'case',
  title: 'Dwie pralki w sklepie RTV-AGD w Bydgoszczy',
  table: {
    head: ['', 'Pralka X', 'Pralka Y (slim)'],
    rows: [
      ['Cena', '2149 zł', '1499 zł'],
      ['Wsad', '8 kg', '6 kg'],
      ['Klasa energetyczna', 'A (49 kWh na 100 cykli)', 'D (72 kWh na 100 cykli)'],
      ['Wirowanie', '1400 obr./min', '1000 obr./min'],
      ['Głośność wirowania', '72 dB', '79 dB'],
      ['Głębokość', '55 cm', '45 cm'],
      ['Opóźniony start', 'tak, do 24 h', 'nie'],
      ['Gwarancja', '2 lata, na silnik 10 lat', '2 lata'],
    ],
  },
};

export default {
  id: '09',
  order: 9,
  part: 'A',
  title: 'Prezentacja towaru: cecha i korzyść',
  subtitle: '„8 kg wsadu” nic klientce nie mówi. „Pranie dla czterech osób w jednym cyklu” — już tak.',
  duration: 45,
  sessions: [45],
  han: ['HAN.01.4'],
  tags: ['cecha', 'korzyść', 'prezentacja', 'etykieta energetyczna'],
  realia: [],
  audience: {
    adults:
      'Z dorosłymi warto zacząć od ich ostatniego dużego zakupu: co przekonało ich do wyboru? Osobom, które sprzedają własne usługi lub produkty, zaproponuj zamianę pralek na własną ofertę: trzy cechy i trzy korzyści dla dwóch różnych klientów. Ceny prądu przyjęte w zadaniu są przykładowe.',
  },
  format: {
    name: 'Prezentacja oparta na potrzebie i liczbach',
    student:
      'Doradzasz w sklepie RTV-AGD. Zamienisz cechy pralek na korzyści dla konkretnej klientki, policzysz oszczędność na prądzie i sprawdzisz, co w prezentacji kolegi jest przesadą.',
    teacher:
      'Lekcja uczy przekładu danych technicznych na korzyści i uczciwości w argumentach. Ważny moment: oszczędność na prądzie jest prawdziwa, ale „zwrot w rok” nie — zwrot różnicy w cenie trwa ponad 11 lat. To dobra okazja, żeby porozmawiać o przesadzie w sprzedaży.',
    grouping: 'W parach jedna osoba gra klientkę, druga doradza.',
    methods: [methods.przypadek, methods.przyklady, methods.feedback],
  },
  objectives: [
    'Odróżniam cechę produktu od korzyści dla klienta.',
    'Dobieram korzyści do potrzeb konkretnej osoby.',
    'Liczę oszczędność energii i uczciwie mówię o czasie zwrotu.',
    'Rozpoznaję przesadzone i nieprawdziwe argumenty.',
  ],
  materials: ['Kalkulator'],
  teacherGuide: {
    preparation: 'Jeśli możesz, pokaż zdjęcie prawdziwej etykiety energetycznej pralki — uczniowie odszukają na niej zużycie na 100 cykli.',
    summary:
      'Cecha to fakt o produkcie (8 kg, 1400 obr./min). Korzyść to to, co ten fakt daje konkretnemu klientowi (mniej prań, szybsze schnięcie). Ta sama cecha może być ważna dla jednego klienta, a obojętna dla drugiego. Liczby wzmacniają argument, ale tylko gdy są uczciwe — oszczędność 56 zł rocznie nie oznacza zwrotu 650 zł w rok.',
  },
  sections: [
    {
      id: 'start',
      label: 'Pani Ewa',
      title: 'Cecha czy korzyść?',
      grouping: 'solo',
      intro: 'Pani Ewa ma czteroosobową rodzinę, mieszka w bloku i ma w łazience wnękę o głębokości 60 cm. Prąd w nocy ma tańszy (taryfa dwustrefowa).',
      ...note(
        6,
        'Każdy wybiera sam. Zapytaj, które zdanie łatwiej zapamiętać klientce.',
        'Dlaczego klientki nie interesuje liczba kilogramów?',
        'Bo nie wie, co z niej wynika. Interesuje ją, ile razy w tygodniu będzie prać.',
        'Uznawanie liczby za korzyść tylko dlatego, że brzmi technicznie.',
        'Zamień „1400 obr./min” na korzyść dla pani Ewy.',
      ),
      activities: [
        choice(
          'q-korzysc',
          'Które zdanie mówi o korzyści dla pani Ewy?',
          [
            'Wypierze Pani rzeczy całej rodziny w jednym cyklu',
            'Ta pralka ma pojemność bębna 8 kilogramów',
            'Pralka X ma klasę energetyczną A według nowej etykiety',
            'Pralka X wiruje z prędkością 1400 obrotów na minutę',
          ],
          0,
          'To skutek pojemności 8 kg opisany językiem klientki: mniej prań, mniej czasu.',
          [
            null,
            'To cecha. Klientka nie wie jeszcze, co z niej ma.',
            'Klasa energetyczna to cecha. Korzyść to niższy rachunek za prąd.',
            'Prędkość wirowania to cecha. Korzyść to szybciej schnące pranie.',
          ],
        ),
      ],
    },
    {
      id: 'korzysci',
      label: 'Korzyści',
      title: 'Od cechy do korzyści',
      grouping: 'pair',
      intro: 'Sprawdź dane obu pralek i przełóż cechy na korzyści dla pani Ewy.',
      reading: {
        title: 'Cecha → korzyść',
        paragraphs: [
          'Zadaj sobie pytanie „i co z tego dla tej osoby?”. 1400 obr./min → pranie jest bardziej odwirowane → szybciej schnie na suszarce w mieszkaniu. Ta sama cecha nie jest ważna dla kogoś, kto ma suszarkę bębnową.',
        ],
      },
      ...note(
        9,
        'Pary dopasowują korzyści. Potem jedna osoba w parze mówi klientce jedną korzyść w jednym zdaniu, druga ocenia: czy to korzyść, czy znowu cecha?',
        'Która cecha pralki X jest dla pani Ewy obojętna?',
        'Np. głośność — jeśli pierze w nocy i śpi w innym pokoju, może być ważna; a jeśli w dzień, to mniej. Zależy od rozmowy.',
        'Powtarzanie liczb z etykiety zamiast mówienia o skutkach.',
        'Dobierz korzyści pralki Y dla studenta w kawalerce z płytką wnęką.',
      ),
      activities: [
        washers,
        {
          type: 'matching',
          id: 'q-cechy',
          question: 'Jaką korzyść daje pani Ewie ta cecha pralki X?',
          options: ['Mniej prań w tygodniu', 'Szybciej schnie w mieszkaniu', 'Pranie w tańszej taryfie nocnej', 'Niższy rachunek za prąd'],
          rows: [
            { label: 'Wsad 8 kg', correct: 0 },
            { label: 'Wirowanie 1400 obr./min', correct: 1 },
            { label: 'Opóźniony start do 24 h', correct: 2 },
            { label: 'Klasa A, 49 kWh na 100 cykli', correct: 3 },
          ],
          explanation: 'Każda cecha zamieniona na skutek, który pani Ewa odczuje na co dzień.',
        },
      ],
    },
    {
      id: 'liczby',
      label: 'Liczby',
      title: 'Ile naprawdę oszczędzi?',
      grouping: 'pair',
      intro: 'Pani Ewa robi około 220 prań w roku. Przyjmij cenę prądu 1,10 zł za kWh.',
      reading: {
        example: {
          question: 'Ile kWh rocznie zużyje pralka X?',
          steps: ['Etykieta podaje zużycie na 100 cykli: 49 kWh.', 'Jeden cykl: 49 ÷ 100 = 0,49 kWh.', 'Rocznie: 0,49 × 220 = 107,8 kWh.', 'Koszt: 107,8 × 1,10 = 118,58 zł.'],
          answer: 'Około 108 kWh, czyli około 119 zł rocznie.',
        },
      },
      ...note(
        12,
        'Pary liczą oszczędność i czas zwrotu. Zatrzymaj się przy pytaniu o „zwrot w rok”: co zrobi klientka, gdy po roku policzy rachunki?',
        'Jak uczciwie powiedzieć o oszczędności?',
        '„Pralka X zużyje rocznie o około 56 zł mniej prądu. Różnicy w cenie nie odzyska Pani szybko, ale dostaje Pani też większy wsad, szybsze schnięcie i pranie w nocnej taryfie.”',
        'Mnożenie przez 220 zużycia na 100 cykli (bez dzielenia przez 100).',
        'Policz oszczędność, gdyby pani Ewa prała w taryfie nocnej po 0,70 zł/kWh (35,42 zł).',
      ),
      activities: [
        washers,
        number('q-oszczednosc', 'O ile złotych rocznie mniej zapłaci pani Ewa za prąd z pralką X niż z pralką Y?', 55.66, 'Różnica na 100 cykli: 72 − 49 = 23 kWh. Na rok: 23 ÷ 100 × 220 = 50,6 kWh. Koszt: 50,6 × 1,10 = 55,66 zł.', {
          unit: 'zł',
          tolerance: 0.05,
          mistakes: [
            { value: 5566, text: 'Zużycie na etykiecie jest na 100 cykli. Podziel różnicę przez 100.' },
            { value: 50.6, text: 'To różnica w kWh. Pomnóż ją przez cenę 1,10 zł.' },
          ],
        }),
        number('q-zwrot', 'Pralka X jest droższa o 650 zł. Po ilu latach oszczędność na prądzie pokryje tę różnicę? Zaokrąglij do jednego miejsca po przecinku.', 11.7, '650 ÷ 55,66 ≈ 11,7 roku. Sama oszczędność energii nie uzasadnia dopłaty w krótkim czasie.', {
          unit: 'lat',
          tolerance: 0.1,
          mistakes: [{ value: 0.1, text: 'Dzielisz odwrotnie. Różnicę w cenie (650 zł) dzielisz przez roczną oszczędność.' }],
        }),
        choice(
          'q-uczciwie',
          'Kolega mówi klientce: „Ta pralka zwróci się Pani w rok na rachunkach”. Co o tym sądzisz?',
          [
            'To nieprawda: przy tych danych zwrot trwa około 12 lat',
            'To prawda, bo klasa A jest najlepsza i dużo oszczędza',
            'Nie da się tego policzyć, więc kolega może tak powiedzieć',
          ],
          0,
          'Oszczędność około 56 zł rocznie przy dopłacie 650 zł. Przesadzona obietnica wróci jako pretensja klientki.',
          [
            null,
            'Klasa A oszczędza, ale 56 zł rocznie, nie 650 zł.',
            'Da się policzyć — zrobiliśmy to przed chwilą. Jeśli nie wiesz, nie obiecuj.',
          ],
        ),
      ],
    },
    {
      id: 'prezentacja',
      label: 'Prezentacja',
      title: 'Prezentacja kolegi',
      grouping: 'trio',
      intro: 'Nowy sprzedawca przygotował, co powie klientom o pralce X. Sprawdź, co jest prawdą, a co przesadą.',
      ...note(
        10,
        'Pary sprawdzają. Potem jedna osoba prezentuje pralkę X pani Ewie w 60 sekund, bez przesady. Druga osoba ocenia: korzyści, liczby, uczciwość.',
        'Co zrobisz, gdy klientka zapyta o coś, czego nie wiesz?',
        'Powiem, że sprawdzę w karcie produktu albo u producenta. Nie zgaduję.',
        'Zostawianie zdań typu „najcichsza na rynku”, bo „wszyscy tak mówią”.',
        'Przygotuj prezentację pralki Y dla studenta z płytką wnęką.',
      ),
      activities: [
        washers,
        {
          type: 'spotErrors',
          id: 'q-pitch',
          title: 'Notatki do prezentacji pralki X',
          context: 'Zaznacz zdania nieprawdziwe albo przesadzone.',
          lines: [
            { text: 'Wypierze Pani rzeczy całej rodziny w jednym cyklu — bęben mieści 8 kg.' },
            { text: 'To najcichsza pralka na rynku.', error: 'Nie ma danych porównujących wszystkie pralki na rynku. 72 dB to po prostu ciszej niż pralka Y.' },
            { text: 'Ma klasę A — zużyje mniej prądu niż model obok.' },
            { text: 'W nocy nie zużywa prądu wcale.', error: 'Pralka zużywa prąd zawsze. W nocy prąd bywa tańszy w taryfie dwustrefowej.' },
            { text: 'Gwarancja 10 lat na całą pralkę.', error: '10 lat dotyczy tylko silnika. Na całą pralkę są 2 lata.' },
            { text: 'Zmieści się w każdej łazience.', error: 'Pralka ma 55 cm głębokości. Przed zakupem trzeba zmierzyć wnękę.' },
            { text: 'Opóźniony start pozwoli uruchomić pranie w nocy, gdy prąd jest tańszy.' },
          ],
          explanation: 'Cztery zdania do usunięcia lub poprawienia. Prezentacja ma opierać się na danych z karty produktu.',
        },
      ],
    },
    {
      id: 'sprawdzenie',
      label: 'Kawalerka',
      title: 'Drugi klient',
      grouping: 'solo',
      intro: 'Student wynajmuje kawalerkę. Wnęka na pralkę ma 47 cm głębokości. Pierze dwa razy w tygodniu, budżet ma ograniczony.',
      ...note(
        8,
        'Samodzielnie. Odpowiedzi otwarte omów: czy są w nich korzyści, a nie same cechy?',
        'Która cecha przesądziła o wyborze?',
        'Głębokość: pralka X po prostu się nie zmieści. To pytanie trzeba zadać na początku rozmowy.',
        'Polecanie „lepszej” pralki bez sprawdzenia, czy pasuje do miejsca.',
        'Ułóż pytanie, które zadasz każdemu klientowi kupującemu pralkę na początku rozmowy.',
      ),
      activities: [
        choice(
          'q-student',
          'Którą pralkę proponujesz?',
          ['Pralkę Y', 'Pralkę X, bo ma lepszą klasę energetyczną', 'Pralkę X, bo ma dłuższą gwarancję na silnik', 'Żadną, bo obie są za duże'],
          0,
          'Pralka X ma 55 cm głębokości i nie zmieści się we wnęce 47 cm. Pralka Y (45 cm) pasuje i mieści się w budżecie.',
          [
            null,
            'Klasa A nie pomoże, jeśli pralka się nie zmieści.',
            'Gwarancja nie ma znaczenia, gdy pralka nie wejdzie do wnęki.',
            'Pralka Y ma 45 cm i zmieści się w 47 cm.',
          ],
        ),
        text(
          'q-korzysci-studenta',
          'Zapisz dwie korzyści pralki Y dla studenta (nie cechy!).',
          'Zmieści się w Twojej wnęce bez przeróbek łazienki. Przy dwóch praniach tygodniowo mniejszy bęben wystarczy, a płacisz 650 zł mniej niż za większy model.',
          { criteria: ['Obie korzyści dotyczą sytuacji studenta.', 'Nie ma samych liczb z karty produktu.'] },
        ),
        {
          type: 'resultCard',
          id: 'karta',
          badges: [
            { min: 0, name: 'Do powtórki', text: 'Wróć do zamiany cech na korzyści i do obliczeń prądu.' },
            { min: 0.6, name: 'Mówisz językiem klienta', text: 'Powtórz uczciwe liczby i wyłapywanie przesady.' },
            { min: 0.85, name: 'Prezentacja bez przesady', text: 'Dobierasz korzyści do osoby i opierasz je na faktach.' },
          ],
        },
      ],
    },
  ],
  exitTicket: 'Cecha to fakt, korzyść to skutek dla tej osoby. Liczby wzmacniają argument, gdy są uczciwe: 56 zł rocznie, a nie „zwrot w rok”. Najpierw zmierz wnękę.',
};
