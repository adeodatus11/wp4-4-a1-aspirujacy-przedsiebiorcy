import { choice, number } from '../schema.js';

export default {
  id: 'm7',
  n: 7,
  topic: 'Zrównoważony rozwój i ESG',
  title: 'Mniej strat, więcej wartości',
  subtitle: 'Jedno małe usprawnienie zamiast deklaracji „eko”: pomiar bazowy, działanie z osobą odpowiedzialną, wynik na jednostkę i uczciwy komunikat.',
  duration: 88,
  outcome: 'Plan jednego działania ESG z wartością bazową i miernikiem.',
  realia: ['vsme', 'greenwashing'],
  objectives: [
    'Rozróżniam obszary E, S i G i wybieram jeden, na który mam wpływ.',
    'Odróżniam pytanie kontrahenta o dane od obowiązku prawnego.',
    'Robię pomiar bazowy z jednostką, okresem i źródłem danych.',
    'Porównuję wynik absolutny i wynik na jednostkę działalności.',
    'Piszę komunikat o wyniku bez ogólnych haseł ekologicznych.',
  ],
  forGroup:
    'Na spotkanie weź swój pomiar bazowy: liczbę, jednostkę, okres i źródło. W grupie każda osoba mówi w jednym zdaniu, co zmierzy i jak — pozostali szukają, co może zniekształcić porównanie. Na koniec przeczytajcie swoje komunikaty i wykreślcie każde słowo, którego nie da się sprawdzić.',
  solo:
    'Bez grupy: zrób pomiar bazowy przez tydzień, zanim cokolwiek zmienisz — to najczęściej pomijany krok. Wynik zapisuj codziennie w tej samej kartce. Komunikat pokaż komuś spoza firmy i zapytaj, co ta osoba z niego zrozumiała. Jeśli usłyszysz „że jesteście eko”, komunikat jest za ogólny.',
  sections: [
    {
      id: 'obszary',
      label: 'E, S, G',
      title: 'Trzy obszary — wybierz jeden, na który masz wpływ',
      duration: 12,
      intro: 'Mała kawiarnia we Wrocławiu codziennie wyrzuca niesprzedane wypieki. Właścicielka chce to zmienić, ale nie od kupowania nowego sprzętu. Przykład jest fikcyjny.',
      reading: {
        paragraphs: [
          'E (środowisko) to energia, woda, odpady, transport. S (ludzie) to warunki i bezpieczeństwo pracy, dostępność dla klientów, relacje z otoczeniem. G (zarządzanie) to zasady w firmie: kto za co odpowiada, jak zawierasz umowy, jak zapobiegasz nadużyciom.',
          'Na start wybierz jeden problem, który jest istotny dla Twojej działalności i na który masz wpływ od jutra. W kawiarni to często odpady żywności: strata jedzenia jest jednocześnie stratą pieniędzy.',
        ],
      },
      activities: [
        {
          type: 'matching',
          id: 'm7-esg',
          question: 'Do którego obszaru należy każde działanie lub dane?',
          options: ['E — środowisko', 'S — ludzie', 'G — zarządzanie'],
          rows: [
            { label: 'Szkolenie z bezpiecznej obsługi pieca dla nowych osób', correct: 1 },
            { label: 'Zużycie prądu przez ekspres i piec', correct: 0 },
            { label: 'Dwa podpisy przy przelewach powyżej 2000 zł', correct: 2 },
            { label: 'Kilogramy niesprzedanych wypieków', correct: 0 },
            { label: 'Podjazd dla wózka przy wejściu', correct: 1 },
            { label: 'Umowy z dostawcami spisane na piśmie', correct: 2 },
          ],
          explanation: 'Prąd i odpady to E. Bezpieczeństwo pracy i dostępność to S. Podpisy i umowy to G — zasady, które chronią firmę przed błędami i nadużyciami.',
        },
        {
          type: 'projectField',
          id: 'm7-pole-obszar',
          field: 'm7-0',
          label: 'Obszar E / S / G i powód wyboru',
          example: 'E — odpady żywności. Codziennie wyrzucamy niesprzedane wypieki: to strata pieniędzy i jedzenia. Mamy na to wpływ od jutra, bez inwestycji.',
        },
      ],
    },
    {
      id: 'kontrahent',
      label: 'Kontrahent',
      title: 'Ankieta od klienta to nie obowiązek ustawowy',
      duration: 10,
      intro: 'Hotel, który kupuje od kawiarni ciasta, przysłał ankietę o energii i odpadach. Właścicielka się przestraszyła: czy teraz musi pisać raport ESG?',
      reading: {
        paragraphs: [
          'Większe firmy coraz częściej pytają dostawców o dane środowiskowe i pracownicze, bo same muszą je raportować albo chcą je pokazać bankom. Dla małych firm powstał dobrowolny standard VSME: moduł podstawowy obejmuje m.in. energię, emisje, wodę, odpady i pracowników.',
          'Pytanie kontrahenta nie oznacza, że firma jest objęta obowiązkiem pełnego raportowania. Zapytaj, jakich danych i za jaki okres naprawdę potrzebuje, i podaj te, które masz. Zakres obowiązków zależy od aktualnych przepisów i sytuacji firmy — nie przenoś na Polskę progów i terminów z innych krajów ani starych harmonogramów.',
        ],
      },
      activities: [
        choice(
          'm7-ankieta',
          'Co oznacza ankieta od hotelu dla kawiarni?',
          [
            'Warto zapytać hotel, jakich dokładnie danych i za jaki okres potrzebuje, i podać te, które kawiarnia ma — np. według modułu podstawowego VSME',
            'Kawiarnia musi teraz przygotować pełny raport zrównoważonego rozwoju według przepisów',
            'Kawiarnia może zignorować ankietę, bo to nic nie zmienia',
          ],
          0,
          'Ankieta to prośba klienta, nie przepis. Odpowiedź z konkretnymi danymi to szansa, żeby zostać dostawcą, z którym łatwo się współpracuje.',
          [
            null,
            'Prośba kontrahenta nie tworzy obowiązku ustawowego. Mała firma co do zasady nie jest objęta obowiązkiem raportowania według dyrektywy CSRD.',
            'Prawnie jest dobrowolna, ale hotel może wybierać dostawców, którzy dane podają. Zignorowanie ankiety może kosztować klienta.',
          ],
        ),
        {
          type: 'checklist',
          id: 'm7-dane-pod-reka',
          question: 'Które dane masz już dziś w swojej firmie lub możesz zebrać w tydzień? Zaznacz dla siebie.',
          items: [
            'Zużycie prądu z faktur za ostatnie 12 miesięcy',
            'Faktury za wywóz odpadów i ich rodzaje',
            'Zużycie wody z faktur',
            'Liczba osób pracujących i rodzaje umów',
            'Liczba wypadków i drobnych urazów przy pracy',
          ],
        },
      ],
    },
    {
      id: 'baza',
      label: 'Pomiar bazowy',
      title: 'Tydzień pomiaru, zanim cokolwiek zmienisz',
      duration: 14,
      intro: 'Bez wartości bazowej każdy wynik po zmianie jest opowieścią. Kawiarnia najpierw przez tydzień waży odpady, pracując tak jak zawsze.',
      reading: {
        paragraphs: [
          'Wartość bazowa ma cztery elementy: liczbę, jednostkę (kg, kWh, liczba zdarzeń), okres (np. 3–9 marca) i źródło (waga kuchenna, faktura, raport z kasy). Zapisz też, co się w tym czasie działo: święto, zmiana menu, choroba w zespole.',
          'Masa odpadów rośnie, gdy rośnie sprzedaż. Dlatego obok liczby całkowitej licz wynik na jednostkę działalności — w kawiarni na 100 zamówień. Jeśli wybierasz obszar S lub G, zasada jest ta sama: np. drobne urazy na miesiąc albo odsetek umów spisanych na piśmie.',
        ],
      },
      activities: [
        {
          type: 'sequence',
          id: 'm7-pomiar',
          question: 'Ułóż kroki tygodniowego pomiaru bazowego.',
          items: [
            'Ustalić jednostki: kg niesprzedanych wypieków i liczba zamówień z kasy',
            'Postawić wagę i kartkę przy pojemniku na odpady żywności',
            'Przez 7 dni ważyć odpady na koniec dnia, bez zmiany sposobu pracy',
            'Codziennie dopisać liczbę zamówień z raportu kasy',
            'Po tygodniu policzyć kg na 100 zamówień',
          ],
          explanation: 'Najpierw jednostki i narzędzie, potem pomiar bez zmian, na końcu wynik. Kolejność chroni przed mierzeniem „przy okazji” zmiany.',
        },
        number('m7-baza', 'W tygodniu pomiaru kawiarnia wyrzuciła 18,9 kg wypieków, a kasa pokazała 1260 zamówień. Ile kg odpadów przypada na 100 zamówień?', 1.5, '18,9 ÷ 1260 × 100 = 1,5 kg na 100 zamówień.', {
          unit: 'kg',
          tolerance: 0.01,
          mistakes: [
            { value: 0.015, text: 'To wynik na jedno zamówienie. Pomnóż przez 100.' },
            { value: 15, text: 'To wynik na 1000 zamówień, nie na 100.' },
          ],
        }),
        {
          type: 'projectField',
          id: 'm7-pole-baza',
          field: 'm7-1',
          label: 'Wartość bazowa, jednostka, okres i źródło danych',
          example: 'Bazowo: 18,9 kg w tygodniu 3–9 marca przy 1260 zamówieniach, czyli 1,5 kg na 100 zamówień. Źródło: ważenie na koniec dnia (waga kuchenna) i raport z kasy. Bez świąt i zmian w menu.',
        },
      ],
    },
    {
      id: 'dzialanie',
      label: 'Działanie',
      title: 'Jedno działanie i jedna osoba odpowiedzialna',
      duration: 12,
      intro: 'Z kartki pomiarów widać, że najwięcej zostaje z wypieków pieczonych po południu. To wskazówka, gdzie zmienić sposób pracy.',
      reading: {
        paragraphs: [
          'Dobre pierwsze działanie jest tanie, odwracalne i ma właściciela — konkretną osobę, która je wykonuje i pilnuje pomiaru. „Wszyscy bardziej uważamy” to nie działanie, bo nikt za nie nie odpowiada i nie da się go sprawdzić.',
          'Inwestycja w sprzęt może przyjść później, gdy wiesz już, gdzie powstaje strata. Kupienie urządzenia przed pomiarem często rozwiązuje nie ten problem.',
        ],
      },
      activities: [
        choice(
          'm7-dzialanie',
          'Które działanie najlepiej nadaje się na pierwszy krok?',
          [
            'Kupić piec konwekcyjny z programatorem za 12 000 zł',
            'Po 14:00 piec mniejsze partie według sprzedaży z poprzednich takich samych dni tygodnia; odpowiada Kasia ze zmiany popołudniowej',
            'Ogłosić w mediach społecznościowych, że kawiarnia jest od dziś „zero waste”',
            'Poprosić zespół, żeby wszyscy bardziej uważali',
          ],
          1,
          'Tanie, odwracalne, celuje w miejsce, gdzie powstaje strata, i ma właściciela.',
          [
            'Duży koszt, zanim wiadomo, czy piec jest przyczyną. Pomiar wskazuje raczej na wielkość partii.',
            null,
            'To deklaracja, nie działanie — i ogólne hasło ekologiczne bez dowodu.',
            'Nikt nie odpowiada i nie wiadomo, co konkretnie się zmienia. Nie da się tego zmierzyć.',
          ],
        ),
        {
          type: 'projectField',
          id: 'm7-pole-dzialanie',
          field: 'm7-2',
          label: 'Działanie i osoba odpowiedzialna',
          example: 'Po 14:00 pieczemy mniejsze partie według sprzedaży z trzech poprzednich takich samych dni tygodnia. Odpowiada Kasia (zmiana popołudniowa); ważenie na koniec dnia — osoba zamykająca.',
        },
      ],
    },
    {
      id: 'cel',
      label: 'Cel i koszt',
      title: 'Cel na 30 dni i ile to kosztuje',
      duration: 10,
      intro: 'Cel w tej samej jednostce co pomiar bazowy pozwoli po miesiącu odpowiedzieć „tak” albo „nie”, bez dyskusji.',
      activities: [
        number('m7-koszt-odpadow', 'Średni koszt surowca i pracy w kilogramie wypieków to 22 zł. Ile kosztowały kawiarnię odpady z tygodnia bazowego (18,9 kg)?', 415.8, '18,9 × 22 = 415,80 zł tygodniowo, czyli ponad 1600 zł miesięcznie.', {
          unit: 'zł',
          tolerance: 0.1,
          mistakes: [{ value: 33, text: 'Tu pomnożono wynik na 100 zamówień (1,5 kg). Koszt liczysz od całej masy odpadów.' }],
        }),
        number('m7-cel', 'Kawiarnia chce w 30 dni zmniejszyć wynik 1,5 kg na 100 zamówień o 30%. Jaki to cel?', 1.05, '1,5 × (1 − 0,3) = 1,05 kg na 100 zamówień.', {
          unit: 'kg',
          tolerance: 0.01,
          mistakes: [{ value: 1.2, text: 'Tu odjęto 0,3 kg zamiast 30%. Trzydzieści procent z 1,5 to 0,45.' }],
        }),
        {
          type: 'projectField',
          id: 'm7-pole-cel',
          field: 'm7-3',
          label: 'Cel na 30 dni i koszt wdrożenia',
          example: 'Cel: z 1,5 do 1,05 kg na 100 zamówień (−30%) do 9 kwietnia. Koszt wdrożenia: 0 zł sprzętu, ok. 10 minut dziennie na ważenie i plan partii. Odpady kosztują dziś ok. 416 zł tygodniowo.',
        },
      ],
    },
    {
      id: 'wynik',
      label: 'Wynik',
      title: 'Wynik absolutny i wynik na jednostkę',
      duration: 16,
      intro: 'Po czterech tygodniach kawiarnia znów waży odpady przez tydzień. W tym czasie na pobliskim placu był festiwal i ruch wyraźnie wzrósł.',
      reading: {
        paragraphs: [
          'Pokaż oba wyniki. Absolutny mówi, ile mniej odpadów trafiło do kosza. Na jednostkę mówi, czy proces działa lepiej — niezależnie od tego, czy sprzedaż wzrosła, czy spadła. Gdy sprzedaż rośnie, odpady całkowite mogą spaść niewiele albo nawet wzrosnąć, choć na zamówienie maleją.',
          'Zapisz, co mogło zniekształcić porównanie, i nie ukrywaj tego. Tydzień po zmianie to sygnał, nie dowód trwałego efektu.',
        ],
      },
      activities: [
        number('m7-po', 'W tygodniu 7–13 kwietnia kawiarnia wyrzuciła 17,6 kg wypieków przy 1600 zamówieniach. Ile kg przypada na 100 zamówień?', 1.1, '17,6 ÷ 1600 × 100 = 1,1 kg na 100 zamówień.', {
          unit: 'kg',
          tolerance: 0.01,
          mistakes: [{ value: 1.4, text: 'Tu wzięto liczbę zamówień z marca (1260). W kwietniu było ich 1600.' }],
        }),
        number('m7-zmiana', 'O ile procent spadł wynik na 100 zamówień (z 1,5 do 1,1 kg)? Podaj z dokładnością do jednego miejsca po przecinku.', 26.7, '(1,5 − 1,1) ÷ 1,5 × 100 = 26,7%. Masa całkowita spadła tylko o 6,9% (18,9 → 17,6 kg), bo sprzedaż wzrosła.', {
          unit: '%',
          tolerance: 0.1,
          mistakes: [
            { value: 6.9, text: 'To spadek całkowitej masy odpadów (18,9 → 17,6 kg), nie wyniku na 100 zamówień.' },
            { value: 36.4, text: 'Tu dzielono przez nową wartość (1,1). Zmianę procentową liczysz od wartości bazowej 1,5.' },
            { value: 0.4, text: 'To różnica w kilogramach. Pytanie dotyczy procentu.' },
          ],
        }),
        {
          type: 'multi',
          id: 'm7-znieksztalcenia',
          question: 'Co mogło zniekształcić porównanie marca i kwietnia? Zaznacz wszystkie realne powody.',
          options: [
            'Festiwal na placu — więcej zamówień niż zwykle',
            'Kawiarnia zmieniła kolor serwetek',
            'Z menu zniknęła szarlotka, która najczęściej zostawała',
            'W marcu ważono też fusy z kawy, a w kwietniu już nie',
            'Pomiar robiła ta sama osoba na tej samej wadze',
          ],
          correct: [0, 2, 3],
          explanation: 'Festiwal, zmiana menu i inny sposób ważenia mogą same zmienić wynik. Ta sama osoba i waga to dobra praktyka, nie zniekształcenie.',
        },
        {
          type: 'projectField',
          id: 'm7-pole-wynik',
          field: 'm7-4',
          label: 'Wynik absolutny oraz wynik na jednostkę działalności',
          example: 'Tydzień 7–13 kwietnia: 17,6 kg przy 1600 zamówieniach. Absolutnie −7% (18,9 → 17,6 kg), na 100 zamówień −27% (1,5 → 1,1 kg). Cel 1,05 prawie osiągnięty. W tym tygodniu był festiwal.',
        },
      ],
    },
    {
      id: 'komunikat',
      label: 'Komunikat',
      title: 'Uczciwy komunikat o wyniku',
      duration: 14,
      intro: 'Właścicielka chce pochwalić się wynikiem w mediach społecznościowych. Pierwsza wersja posta brzmi bardzo zielono.',
      reading: {
        paragraphs: [
          'Uczciwy komunikat mówi, co konkretnie zmieniono, w jakim okresie, jaki był wynik i czego jeszcze nie wiadomo. Ogólne hasła — „eko”, „zero waste”, „przyjazny planecie” — bez dowodów mogą zostać uznane za wprowadzające w błąd, a nowe przepisy UE ich wprost zakazują.',
          'Konkret jest też lepszą reklamą: „wyrzucamy o jedną czwartą mniej jedzenia” zapamiętuje się łatwiej niż kolejne zielone hasło.',
        ],
      },
      activities: [
        {
          type: 'spotErrors',
          id: 'm7-post',
          title: 'Pierwsza wersja posta kawiarni',
          context: 'Zaznacz zdania, które są ogólnym hasłem albo obiecują więcej, niż pokazuje pomiar.',
          lines: [
            { text: 'Jesteśmy kawiarnią zero waste!', error: 'Kawiarnia dalej wyrzuca 17,6 kg tygodniowo. Hasło jest nieprawdziwe.' },
            { text: 'Od marca po południu pieczemy mniejsze partie, dopasowane do sprzedaży.' },
            { text: 'W kwietniu wyrzuciliśmy 1,1 kg jedzenia na 100 zamówień, w marcu — 1,5 kg.' },
            { text: 'Z każdą kawą ratujesz planetę.', error: 'Ogólne twierdzenie ekologiczne bez żadnego dowodu.' },
            { text: 'Nasze kubki są w 100% ekologiczne.', error: 'Ogólnik bez wskazania, co to znaczy i czym to potwierdzić — i nie dotyczy testu.' },
            { text: 'Mierzymy dopiero od kilku tygodni i będziemy sprawdzać dalej.' },
          ],
          explanation: 'Zostaje to, co da się sprawdzić: zmiana, liczby, okres i uczciwe zastrzeżenie. Trzy hasła wypadają.',
        },
        {
          type: 'projectField',
          id: 'm7-pole-komunikat',
          field: 'm7-5',
          label: 'Wniosek, ograniczenia i treść uczciwego komunikatu',
          example: 'Wniosek: mniejsze partie działają, zostajemy przy nich i mierzymy co miesiąc. Ograniczenia: jeden tydzień po zmianie, w tym tygodniu festiwal. Komunikat: „Od marca po południu pieczemy mniejsze partie. W kwietniu wyrzuciliśmy 1,1 kg jedzenia na 100 zamówień zamiast 1,5 kg. Mierzymy dalej”.',
        },
      ],
    },
  ],
};
