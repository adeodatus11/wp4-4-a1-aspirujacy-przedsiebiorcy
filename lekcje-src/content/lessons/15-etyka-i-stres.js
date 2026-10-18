import { choice, methods, note, text } from '../schema.js';

export default {
  id: '15',
  order: 15,
  part: 'A',
  title: 'Granice, etyka i stres w pracy przy ladzie',
  subtitle: 'Piwo „dla brata”, nowe daty na starych wędlinach i dziesiąta godzina przy kasie przed świętami.',
  duration: 45,
  sessions: [45],
  han: ['HAN.01.6'],
  tags: ['etyka', 'sprzedaż alkoholu', 'stres', 'mobbing'],
  realia: ['alkohol'],
  audience: {
    adults:
      'Z dorosłymi warto rozmawiać na przykładach z ich pracy, bez oceniania. Osobom, które będą zatrudniać ludzi, przypomnij o ich obowiązkach: szkolenie z zasad sprzedaży alkoholu i wyrobów tytoniowych oraz reagowanie na zgłoszenia nękania w zespole.',
  },
  format: {
    name: 'Dylematy, przepisy i rozmowa o granicach',
    student:
      'Pracujesz w markecie w Kielcach. Zdecydujesz, komu sprzedać alkohol i napój energetyczny, co zrobić, gdy przełożony prosi o coś nieuczciwego, i jak dbać o siebie w stresującej pracy.',
    teacher:
      'Lekcja łączy przepisy (wiek, nietrzeźwość) z etyką (fałszowanie dat) i dbaniem o siebie (stres, mobbing). Nie oceniaj osobistych historii uczniów; pracuj na przypadkach z platformy. Wskaż, gdzie szukać pomocy: przełożony, dział kadr, Państwowa Inspekcja Pracy.',
    grouping: 'Etapy 1 i 5 samodzielnie, etapy 2–4 w parach.',
    methods: [methods.dialogowe, methods.przypadek],
  },
  objectives: [
    'Wiem, komu nie wolno sprzedać alkoholu, wyrobów tytoniowych i napojów energetycznych.',
    'Odmawiam sprzedaży uprzejmie i stanowczo.',
    'Rozpoznaję polecenie nieuczciwe lub niezgodne z prawem i wiem, gdzie je zgłosić.',
    'Znam sposoby radzenia sobie ze stresem w pracy z klientami.',
  ],
  materials: ['Urządzenie z przeglądarką'],
  teacherGuide: {
    preparation: 'Sprawdź, jakie zasady sprzedaży alkoholu obowiązują w zakładzie praktyk uczniów (np. „pytamy o dowód każdego, kto wygląda na mniej niż 25 lat”).',
    summary:
      'Alkoholu i papierosów nie sprzedaje się osobom poniżej 18 lat, alkoholu także nietrzeźwym, a napojów energetycznych od 2024 r. — osobom poniżej 18 lat. Sprzedawca może poprosić o dokument i odmówić sprzedaży. Polecenie niezgodne z prawem (np. przeklejanie dat ważności) można i trzeba zgłosić. Stres w handlu jest normalny, ale długotrwałe nękanie to mobbing — sprawa dla pracodawcy i PIP.',
  },
  sections: [
    {
      id: 'start',
      label: 'Start',
      title: 'Ile on ma lat?',
      grouping: 'solo',
      intro: 'Do kasy podchodzi chłopak z czteropakiem piwa. Wygląda na 17–19 lat.',
      ...note(
        5,
        'Każdy decyduje sam. Zapytaj, czy ktoś był proszony w sklepie o dowód i jak się wtedy czuł.',
        'Dlaczego lepiej zapytać o dowód dziesięć razy niepotrzebnie niż raz za mało?',
        'Bo sprzedaż alkoholu niepełnoletniemu to przestępstwo lub wykroczenie, a sklep może stracić koncesję. Pytanie o dowód nikomu nie szkodzi.',
        'Ocenianie wieku „na oko” albo wstyd przed zapytaniem.',
        'Ułóż zdanie, którym grzecznie poprosisz o dowód.',
      ),
      activities: [
        choice(
          'q-dowod',
          'Co robisz?',
          [
            'Proszę o dokument potwierdzający wiek',
            'Sprzedaję, bo wygląda raczej na pełnoletniego',
            'Sprzedaję, bo to tylko piwo, a nie wódka czy whisky',
            'Odmawiam bez słowa i obsługuję następną osobę w kolejce',
          ],
          0,
          'Przy wątpliwościach co do wieku pytasz o dokument. Bez niego nie sprzedajesz.',
          [
            null,
            '„Raczej” nie wystarczy. Sprzedaż osobie poniżej 18 lat jest zakazana.',
            'Zakaz dotyczy każdego alkoholu, także piwa.',
            'Masz prawo odmówić, ale warto powiedzieć dlaczego i zaproponować pokazanie dowodu.',
          ],
        ),
      ],
    },
    {
      id: 'przepisy',
      label: 'Przepisy',
      title: 'Komu nie sprzedajemy',
      grouping: 'pair',
      intro: 'Kilka sytuacji z jednego wieczoru przy kasie.',
      reading: {
        title: 'Zakazy sprzedaży',
        paragraphs: [
          'Alkoholu nie sprzedaje się osobom poniżej 18 lat i osobom nietrzeźwym. Wyrobów tytoniowych i papierosów elektronicznych — osobom poniżej 18 lat. Od 1 stycznia 2024 r. także napojów energetycznych (z kofeiną lub tauryną) osobom poniżej 18 lat.',
          'Sprzedawca może żądać dokumentu ze zdjęciem i datą urodzenia. Jeśli widzi, że dorosły kupuje alkohol dla nieletniego, też powinien odmówić.',
        ],
      },
      ...note(
        12,
        'Pary dopasowują. Przy napoju energetycznym zapytaj, kto wiedział o tym zakazie — wiele osób nie wie.',
        'Co jest trudniejsze: odmówić nastolatkowi czy dorosłemu, który kupuje dla nastolatka?',
        'Zwykle dorosłemu, bo „przecież jest pełnoletni”. Ale sprzedawca nie powinien sprzedawać, gdy widzi, dla kogo jest alkohol.',
        'Przekonanie, że zakaz dotyczy tylko mocnego alkoholu. Nieznajomość zakazu dla napojów energetycznych.',
        'Napiszcie krótką instrukcję dla nowego pracownika: kiedy prosić o dowód.',
      ),
      activities: [
        {
          type: 'matching',
          id: 'q-sytuacje',
          question: 'Jak postępujesz?',
          options: ['Sprzedajesz', 'Prosisz o dokument', 'Odmawiasz'],
          rows: [
            { label: 'Kobieta około pięćdziesiątki kupuje butelkę wina', correct: 0 },
            { label: 'Chłopak wyglądający na 16 lat kupuje napój energetyczny', correct: 1 },
            { label: 'Mężczyzna chwieje się i bełkocze, kupuje wódkę', correct: 2, explanation: 'Osobie nietrzeźwej nie sprzedaje się alkoholu, nawet z dowodem.' },
            { label: 'Dorosły kupuje piwo i od razu podaje je 15-latkowi stojącemu obok', correct: 2 },
            { label: 'Dziewczyna wyglądająca na 18–20 lat kupuje papierosy', correct: 1 },
            { label: 'Ta sama dziewczyna pokazuje legitymację z datą urodzenia sprzed 17 lat', correct: 2 },
          ],
          explanation: 'Wiek sprawdzasz dokumentem, nietrzeźwości nie usprawiedliwia żaden dokument, a sprzedaż „przez pośrednika” też jest zakazana.',
        },
      ],
    },
    {
      id: 'odmowa',
      label: 'Odmowa',
      title: '„To dla brata”',
      grouping: 'pair',
      intro: 'Nastolatek bez dowodu próbuje kupić piwo. Odmów tak, żeby nie było awantury.',
      ...note(
        12,
        'Rozmowa na platformie, potem odgrywanie w parach. Zwróć uwagę na ton: stanowczo, bez obrażania.',
        'Jak odmówić, żeby klient nie poczuł się upokorzony?',
        'Mówić o zasadach, nie o osobie: „Bez dowodu nie mogę sprzedać alkoholu nikomu”.',
        'Tłumaczenie się, wdawanie w dyskusję albo uleganie presji kolejki.',
        'Co zrobisz, jeśli klient wróci z kolegą, który ma dowód, i to on kupi piwo?',
      ),
      activities: [
        {
          type: 'dialog',
          id: 'q-brat',
          title: 'Rozmowa przy kasie',
          start: 'n1',
          nodes: {
            n1: {
              speaker: 'Klient',
              text: 'Poproszę to piwo.',
              choices: [
                { text: 'Poproszę o dowód osobisty albo inny dokument z datą urodzenia.', next: 'n2', good: true, feedback: 'Krótko i rzeczowo, bez komentarzy o wyglądzie.' },
                { text: 'A ty masz w ogóle osiemnaście lat, dzieciaku?', next: 'n2', good: false, feedback: 'Ton zaczepny i „dzieciaku” prowokują awanturę.' },
              ],
            },
            n2: {
              speaker: 'Klient',
              text: 'Nie mam przy sobie. To nie dla mnie, tylko dla brata, on ma 25 lat.',
              choices: [
                { text: 'Rozumiem, ale bez dokumentu nie mogę sprzedać alkoholu. Brat może przyjść sam.', next: 'n3', good: true, feedback: 'Stanowczo, uprzejmie i z wyjaśnieniem, co można zrobić.' },
                { text: 'No dobra, skoro dla brata, to sprzedam.', next: 'n3', good: false, feedback: 'Sprzedajesz osobie, której wieku nie znasz. Odpowiedzialność spada na Ciebie i sklep.' },
                { text: 'Kłamiesz, wszyscy tak mówią.', next: 'n3', good: false, feedback: 'Oskarżenie nic nie daje i zaostrza rozmowę.' },
              ],
            },
            n3: {
              speaker: 'Klient',
              text: 'Serio? Przecież wszyscy w innych sklepach sprzedają!',
              choices: [
                { text: 'U nas takie są zasady i przepisy. Mogę skasować pozostałe zakupy?', next: 'end', good: true, feedback: 'Nie wdajesz się w dyskusję i wracasz do obsługi.' },
                { text: 'To idź do innego sklepu i mi nie zawracaj głowy.', next: 'end', good: false, feedback: 'Niegrzecznie. Kolejka patrzy, jak obsługujesz klientów.' },
              ],
            },
            end: { end: true, text: 'Klient płaci za chipsy i wychodzi. Odmowa była stanowcza i bez awantury.' },
          },
        },
        choice(
          'q-daty',
          'Kierownik prosi, żebyś przykleił(a) nowe etykiety z późniejszą datą na wędliny, którym jutro mija termin. Co robisz?',
          [
            'Odmawiam i zgłaszam to wyżej lub do inspekcji',
            'Robię to, bo to polecenie przełożonego',
            'Robię to, ale tylko na wędlinach, które jeszcze dobrze wyglądają',
            'Robię to, a potem ostrzegam znajomych, żeby ich nie kupowali',
          ],
          0,
          'Zmiana dat to oszukiwanie klientów i zagrożenie dla zdrowia. Polecenia niezgodnego z prawem się nie wykonuje. Zgłoszenie: właściciel, dział jakości, sanepid albo Inspekcja Handlowa.',
          [
            null,
            'Polecenie przełożonego nie zwalnia z odpowiedzialności za oszukiwanie klientów.',
            'Wygląd nie mówi, czy wędlina jest bezpieczna. Data jest po to, żeby nie zgadywać.',
            'Inni klienci dalej są narażeni. To nie rozwiązuje problemu.',
          ],
        ),
      ],
    },
    {
      id: 'stres',
      label: 'Stres',
      title: 'Dziesiąta godzina przed świętami',
      grouping: 'pair',
      intro: '23 grudnia. Długie kolejki, zdenerwowani klienci, brak przerwy od czterech godzin.',
      reading: {
        title: 'Stres i granice',
        paragraphs: [
          'Stres w handlu jest częsty: kolejki, pośpiech, trudni klienci. Pomagają proste rzeczy: przerwy (należą się z Kodeksu pracy), kilka spokojnych oddechów między klientami, rozmowa z kimś z zespołu po trudnej sytuacji i nieprzenoszenie złości klienta na siebie.',
          'Pojedyncza kłótnia to nie mobbing. Mobbing to długotrwałe, powtarzające się nękanie albo zastraszanie pracownika. Wtedy zgłaszasz sprawę pracodawcy, a jeśli to nie pomaga — Państwowej Inspekcji Pracy.',
        ],
      },
      ...note(
        10,
        'Pary zaznaczają zdrowe sposoby. Rozmowa o mobbingu — tylko na przypadkach z platformy, bez wywoływania osobistych historii.',
        'Co różni zły dzień od mobbingu?',
        'Mobbing trwa długo, powtarza się i ma na celu poniżenie albo wyeliminowanie pracownika. Zły dzień jest jednorazowy.',
        'Nazywanie mobbingiem każdej krytyki albo odwrotnie — znoszenie nękania, „bo tak jest w handlu”.',
        'Sprawdź, ile przerwy przysługuje przy 8-godzinnej zmianie (co najmniej 15 minut wliczanych do czasu pracy).',
      ),
      activities: [
        {
          type: 'multi',
          id: 'q-stres',
          question: 'Co pomoże przetrwać trudną zmianę? Zaznacz wszystkie zdrowe sposoby.',
          options: [
            'Kilka spokojnych oddechów między klientami',
            'Upomnienie się o należną przerwę',
            'Pięć napojów energetycznych w ciągu zmiany',
            'Krótka rozmowa z koleżanką z zespołu po trudnym kliencie',
            'Odpowiadanie klientom tym samym tonem',
            'Przypominanie sobie, że złość klienta zwykle nie dotyczy mnie osobiście',
          ],
          correct: [0, 1, 3, 5],
          explanation: 'Oddech, przerwa, wsparcie zespołu i dystans do emocji klientów. Kofeina w dużych ilościach i odpowiadanie złością tylko pogarszają sprawę.',
          hint: 'Szukaj sposobów, które nie szkodzą Tobie ani innym.',
        },
        choice(
          'q-mobbing',
          'Który przypadek najbardziej przypomina mobbing?',
          [
            'Kierownik od pół roku ośmiesza jedną kasjerkę',
            'Kierownik raz podniósł głos, gdy kasa się nie zgodziła',
            'Kierowniczka zwróciła uwagę, że ktoś spóźnia się trzeci raz',
            'Klient był niemiły i powiedział, że obsługa jest za wolna',
          ],
          0,
          'Długotrwałe, powtarzające się poniżanie jednej osoby — to cechy mobbingu.',
          [
            null,
            'To jednorazowe zdarzenie. Nieprzyjemne, ale nie mobbing.',
            'Uwaga dotycząca obowiązków to normalna część pracy przełożonego.',
            'Klient nie jest pracodawcą. To trudna sytuacja, ale nie mobbing.',
          ],
        ),
      ],
    },
    {
      id: 'sprawdzenie',
      label: 'Sprawdzenie',
      title: 'Twoje zdanie',
      grouping: 'solo',
      intro: 'Ostatnia decyzja i jedno zdanie, które przyda się przy kasie.',
      ...note(
        6,
        'Samodzielnie. Na koniec wskaż, gdzie w szkole lub w zakładzie praktyk można zgłosić problem.',
        'Do kogo zgłosisz nękanie w miejscu praktyk?',
        'Do opiekuna praktyk w zakładzie, do nauczyciela praktycznej nauki zawodu w szkole, do pedagoga.',
        'Przekonanie, że uczeń na praktyce „nie ma nic do powiedzenia”.',
        'Zapisz numer i adres najbliższego oddziału PIP.',
      ),
      activities: [
        choice(
          'q-energetyk',
          'Matka z 13-letnim synem kupuje dwa napoje energetyczne. Syn mówi: „Jeden dla mnie”. Co robisz?',
          [
            'Sprzedaję jeden napój matce, drugiego nie',
            'Sprzedaję oba, bo płaci dorosła osoba',
            'Sprzedaję oba, bo zakaz dotyczy tylko alkoholu',
            'Proszę matkę o dowód i sprzedaję oba po jego sprawdzeniu',
          ],
          0,
          'Wiesz, że napój jest dla 13-latka. Zakaz sprzedaży napojów energetycznych osobom poniżej 18 lat obowiązuje od 2024 r.',
          [
            null,
            'Liczy się, dla kogo jest napój. Sam klient mówi, że jeden napój jest dla dziecka.',
            'Od 2024 r. zakaz obejmuje też napoje energetyczne.',
            'Dowód matki nie zmienia faktu, że napój jest dla syna.',
          ],
        ),
        text(
          'q-zdanie',
          'Napisz zdanie, którym odmówisz sprzedaży alkoholu osobie bez dokumentu.',
          'Przepraszam, bez dokumentu potwierdzającego wiek nie mogę sprzedać alkoholu — takie są przepisy. Czy mogę skasować resztę zakupów?',
          { criteria: ['Jest odmowa i powód (przepisy).', 'Ton jest uprzejmy.', 'Jest propozycja dalszej obsługi.'] },
        ),
        {
          type: 'resultCard',
          id: 'karta',
          badges: [
            { min: 0, name: 'Do powtórki', text: 'Wróć do zakazów sprzedaży i rozmowy przy kasie.' },
            { min: 0.6, name: 'Znasz granice', text: 'Powtórz rozróżnienie: stres a mobbing.' },
            { min: 0.85, name: 'Stanowczo i uprzejmie', text: 'Wiesz, komu nie sprzedać, czego nie robić i gdzie szukać pomocy.' },
          ],
        },
      ],
    },
  ],
  exitTicket: 'Poniżej 18 lat: bez alkoholu, papierosów i napojów energetycznych. Nietrzeźwym: bez alkoholu. Przy wątpliwości — dowód. Polecenie niezgodne z prawem: odmów i zgłoś. Mobbing: długotrwałe nękanie — pracodawca, PIP.',
};
