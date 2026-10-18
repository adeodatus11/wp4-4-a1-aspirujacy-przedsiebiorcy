import { choice, number } from '../schema.js';

export default {
  id: 'm4',
  n: 4,
  topic: 'Model biznesowy i Lean',
  title: 'Zbuduj model, który się spina',
  subtitle: 'Lean Canvas, ile naprawdę kosztuje Twoja godzina, przy jakiej sprzedaży firma zarabia, dlaczego zysk to jeszcze nie gotówka i jak opisać jeden proces.',
  duration: 100,
  outcome: 'Lean Canvas, opis jednego procesu i prognoza przepływów na sześć miesięcy.',
  realia: ['zusEtapy', 'zdrowotna', 'formyOpodatkowania'],
  objectives: [
    'Wypełniam Lean Canvas i oznaczam, co jest założeniem.',
    'Liczę stawkę za godzinę z dochodem, składkami, podatkiem i czasem, którego nie fakturuję.',
    'Liczę próg rentowności: ile muszę sprzedać, żeby pokryć koszty stałe.',
    'Odróżniam zysk od gotówki i liczę najniższe saldo w planie.',
    'Opisuję jeden powtarzalny proces tak, żeby ktoś inny mógł go wykonać.',
  ],
  forGroup:
    'Na spotkanie weź swój Lean Canvas z zaznaczonymi założeniami i najniższe saldo z planu gotówki. W grupie każdy pokaże jedno założenie, które najbardziej go niepokoi — reszta zada pytania, jak je sprawdzić tanio i szybko.',
  solo:
    'Bez grupy: daj opis swojego procesu osobie, która go nie zna, i poproś, żeby wykonała go krok po kroku albo opowiedziała, co zrobi. Każde jej pytanie to brakujący krok. Plan gotówki pokaż księgowej albo komuś, kto prowadzi firmę.',
  sections: [
    {
      id: 'canvas',
      label: 'Lean Canvas',
      title: 'Dziewięć pól na jednej kartce',
      duration: 12,
      intro: 'Piekarnia osiedlowa w Oławie sprzedaje pieczywo i chce wprowadzić koszyki śniadaniowe dla biur. Zanim kupi opakowania, właścicielka rozpisuje pomysł na jednej kartce.',
      reading: {
        paragraphs: [
          'Lean Canvas (Ash Maurya) to uproszczony model biznesowy w dziewięciu polach: problem, segment klientów, propozycja wartości, rozwiązanie, kanały, przychody, koszty, kluczowy miernik i przewaga trudna do skopiowania. Zaczynasz od problemu i klienta, nie od produktu.',
          'Przy każdym zdaniu zaznacz: wiem (mam dowód) albo zakładam. Większość pól na początku to założenia — i to jest w porządku, jeśli wiesz, które sprawdzić najpierw.',
        ],
      },
      activities: [
        {
          type: 'matching',
          id: 'm4-pola',
          question: 'Do którego pola Lean Canvas pasuje zdanie o koszykach śniadaniowych?',
          options: ['Problem', 'Segment', 'Propozycja wartości', 'Kanały', 'Przychody i koszty'],
          rows: [
            { label: 'Organizator spotkania musi rano jechać po zakupy i i tak nie wie, ile kupić', correct: 0 },
            { label: 'Biura do 20 osób w Oławie i okolicy', correct: 1 },
            { label: 'Śniadanie na miejscu o 8:30, zamówione jednym telefonem dzień wcześniej', correct: 2 },
            { label: 'Rozmowa z recepcjami biur i polecenia od stałych klientów piekarni', correct: 3 },
            { label: '45 zł za koszyk; opakowanie 6 zł, produkty 21 zł', correct: 4 },
          ],
          explanation: 'Problem i segment opisują klienta, propozycja wartości — co zyskuje, kanały — jak do niego dotrzesz, przychody i koszty — czy to się opłaca.',
        },
      ],
    },
    {
      id: 'wartosc',
      label: 'Wartość',
      title: 'Klient, alternatywa, najmniejsze rozwiązanie',
      duration: 12,
      intro: 'Twój klient już jakoś radzi sobie z problemem. Twoja oferta konkuruje z tym sposobem — czasem z „nic nie robię”.',
      reading: {
        paragraphs: [
          'Obecne alternatywy dla koszyków: zakupy w markecie przed spotkaniem, catering z dużego miasta, ciastka z kawiarni obok. Propozycja wartości mówi, co klient zyskuje w porównaniu z tym, co robi dziś — jednym zdaniem, bez przymiotników typu „najlepszy”.',
          'Najmniejsze rozwiązanie to wersja, którą możesz sprzedać już teraz, żeby sprawdzić model: jeden rodzaj koszyka, dostawa tylko we wtorki i czwartki, zamówienie telefonem. Aplikację i pięć wariantów zostaw na później.',
        ],
      },
      activities: [
        choice(
          'm4-minimum',
          'Który start koszyków to „najmniejsze rozwiązanie”?',
          [
            'Sklep internetowy z wyborem 12 produktów i płatnością online',
            'Jeden koszyk dla 10 osób, dostawa wt. i czw., zamówienie telefonem do 14:00 dnia wcześniej',
            'Samochód dostawczy z logo i trzy rodzaje koszyków od pierwszego dnia',
          ],
          1,
          'Jeden wariant, dwa dni w tygodniu i telefon wystarczą, żeby sprawdzić, czy biura zamówią drugi raz. Reszta to koszty, zanim wiadomo, czy jest popyt.',
          ['Dużo pracy i kosztów przed pierwszym zamówieniem.', null, 'Inwestycja, zanim wiadomo, czy biura zamówią drugi raz.'],
        ),
        {
          type: 'projectField',
          id: 'm4-pole-problem',
          field: 'm4-0',
          label: 'Problem, segment i obecne alternatywy',
          example: 'Biura do 20 osób w Oławie: organizator spotkania musi rano kupić śniadanie i nie wie, ile. Dziś: zakupy w markecie albo catering z Wrocławia (drogi, z minimum zamówienia).',
        },
        {
          type: 'projectField',
          id: 'm4-pole-wartosc',
          field: 'm4-1',
          label: 'Propozycja wartości i najmniejsze rozwiązanie',
          example: 'Śniadanie dla 10 osób na stole o 8:30, zamówione jednym telefonem dzień wcześniej. Start: jeden koszyk, dostawa wtorki i czwartki.',
        },
      ],
    },
    {
      id: 'stawka',
      label: 'Twoja godzina',
      title: 'Ile kosztuje Twoja godzina',
      duration: 16,
      intro: 'Większość osób zaczynających usługi liczy cenę z głowy: „inni biorą 50 zł za godzinę”. Potem okazuje się, że po składkach, podatku i dojazdach zostaje mniej niż na etacie.',
      reading: {
        paragraphs: [
          'Policz od końca. Ile chcesz mieć na rękę miesięcznie? Dodaj składki ZUS i zdrowotną, koszty firmy (telefon, paliwo, księgowość, narzędzia) i podatek. Wyjdzie przychód, którego potrzebujesz.',
          'Potem uczciwie policz godziny, za które ktoś zapłaci. Z 160 godzin pracy w miesiącu sporo zajmują dojazdy, wyceny, telefony, faktury i nauka. Często tylko 50–70% to czas, który możesz wpisać na rachunek. Stawkę liczysz od tych godzin.',
        ],
        example: {
          question: 'Ile przychodu potrzebuje Marta, żeby mieć 5000 zł na rękę?',
          steps: [
            'Składki w 8. miesiącu firmy: 456,19 zł preferencyjny ZUS + 432,54 zł zdrowotna = 888,73 zł.',
            'Koszty firmy: 900 zł miesięcznie (księgowość, telefon, paliwo, części drobne).',
            'Ryczałt 8,5% od przychodu, w uproszczeniu: przychód = (5000 + 888,73 + 900) ÷ (1 − 0,085).',
          ],
          answer: 'Policz wynik w pierwszym zadaniu poniżej.',
        },
      },
      activities: [
        number('m4-przychod', 'Ile wynosi potrzebny przychód Marty miesięcznie? Zaokrąglij do groszy.', 7419.38, '(5000 + 888,73 + 900) ÷ 0,915 = 6788,73 ÷ 0,915 = 7419,38 zł.', {
          unit: 'zł',
          tolerance: 1,
          mistakes: [
            { value: 6788.73, text: 'To kwota przed podatkiem. Ryczałt liczy się od przychodu, więc dzielisz przez 0,915.' },
            { value: 5000, text: 'To tylko to, co Marta chce mieć na rękę. Doliczasz składki, koszty i podatek.' },
          ],
        }),
        number('m4-stawka', 'Marta pracuje 160 godzin w miesiącu, ale za 60% z nich ktoś płaci. Jaka powinna być jej stawka za godzinę, żeby uzyskać 7419,38 zł?', 77.29, '160 × 0,6 = 96 godzin fakturowanych. 7419,38 ÷ 96 = 77,29 zł za godzinę.', {
          unit: 'zł/h',
          tolerance: 0.05,
          mistakes: [{ value: 46.37, text: 'Tu przychód podzielono przez wszystkie 160 godzin. Klienci płacą tylko za 96 z nich.' }],
        }),
        choice(
          'm4-50zl',
          'Konkurencja bierze 50 zł za godzinę. Co z tego wynika dla Marty?',
          [
            'Że przy 50 zł i 96 płatnych godzinach jej przychód (4800 zł) nie pokryje celu — musi zmienić cenę, liczbę płatnych godzin albo cel',
            'Że musi brać 50 zł, bo inaczej nikt do niej nie przyjdzie',
            'Że konkurencja źle liczy i wkrótce zbankrutuje',
          ],
          0,
          'Cena konkurencji to informacja, nie wyrok. Marta może podnieść cenę za wartość (dojazd, szybki termin), zwiększyć udział płatnych godzin albo obniżyć cel na pierwszy rok — ale musi to wiedzieć z liczb.',
          [null, 'Wtedy pracuje poniżej celu. Klienci wybierają też szybkość, dojazd i zaufanie, nie tylko cenę.', 'Konkurencja może mieć inne koszty albo dorabiać inaczej — nie wiadomo.'],
        ),
      ],
    },
    {
      id: 'prog',
      label: 'Próg',
      title: 'Ile trzeba sprzedać, żeby zarabiać',
      duration: 10,
      intro: 'Koszty zmienne rosną z każdą sztuką (produkty, opakowanie). Koszty stałe są co miesiąc, nawet bez sprzedaży (czynsz, abonament, ZUS). Próg rentowności mówi, ile sztuk pokrywa koszty stałe.',
      reading: {
        paragraphs: ['Na każdym koszyku zostaje cena minus koszt zmienny. Koszty stałe dzielisz przez tę kwotę. Wynik zaokrąglasz w górę — pół koszyka się nie sprzeda.'],
      },
      activities: [
        number('m4-marza-koszyka', 'Koszyk kosztuje 45 zł. Produkty to 21 zł, opakowanie 6 zł. Ile zostaje na jednym koszyku na pokrycie kosztów stałych?', 18, '45 − 21 − 6 = 18 zł.', { unit: 'zł', tolerance: 0, mistakes: [{ value: 24, text: 'Odejmij też opakowanie (6 zł).' }] }),
        number('m4-prog', 'Koszyki dokładają piekarni 1800 zł kosztów stałych miesięcznie (część etatu, paliwo, ubezpieczenie). Ile koszyków miesięcznie trzeba sprzedać, żeby je pokryć?', 100, '1800 ÷ 18 = 100 koszyków miesięcznie — przy dostawie dwa razy w tygodniu to ok. 12 koszyków na dostawę.', {
          unit: 'szt.',
          tolerance: 0,
          mistakes: [{ value: 40, text: 'Tu koszty stałe podzielono przez cenę (45 zł). Dzielisz przez to, co zostaje na koszyku (18 zł).' }],
        }),
        {
          type: 'projectField',
          id: 'm4-pole-przychody',
          field: 'm4-2',
          label: 'Kanały, przychody oraz koszty',
          example: 'Kanały: telefon do recepcji biur, polecenia stałych klientów. Cena 45 zł, koszt zmienny 27 zł, zostaje 18 zł. Koszty stałe koszyków 1800 zł → próg 100 koszyków miesięcznie.',
        },
      ],
    },
    {
      id: 'gotowka',
      label: 'Gotówka',
      title: 'Zysk na papierze, pusto na koncie',
      duration: 16,
      intro: 'Zamówienia koszyków rosną, ale biura płacą fakturą po 30 dniach, a opakowania i produkty trzeba kupić z góry. Właścicielka widzi wzrost sprzedaży — i brak pieniędzy na zakupy.',
      reading: {
        paragraphs: [
          'Zysk mówi, czy sprzedaż pokrywa koszty. Gotówka mówi, czy masz z czego zapłacić dzisiaj. Gdy płacisz dostawcom od razu, a klienci płacą później, rosnąca sprzedaż może opróżnić konto.',
          'Plan gotówki: dla każdego miesiąca saldo na początek + wpływy (pieniądze, które naprawdę wpłyną) − wydatki (pieniądze, które naprawdę wypłyniesz) = saldo na koniec. Saldo na koniec przenosisz na następny miesiąc. Najniższe saldo w planie to kwota, którą musisz mieć w zapasie.',
        ],
      },
      activities: [
        {
          type: 'docForm',
          id: 'm4-cashflow',
          title: 'Plan gotówki koszyków na trzy miesiące',
          points: 4,
          doc: {
            title: 'Gotówka — koszyki śniadaniowe',
            table: {
              head: ['Miesiąc', 'Saldo na początek', 'Wpływy', 'Wydatki', 'Saldo na koniec'],
              rows: [
                ['Marzec', '8000', '3000', '9500', { f: 's1' }],
                ['Kwiecień', { f: 'p2' }, '9000', '8000', { f: 's2' }],
                ['Maj', '2500', '12000', '9000', { f: 's3' }],
              ],
            },
            footer: 'W marcu wpływy są niskie, bo biura płacą za marcowe koszyki dopiero w kwietniu.',
          },
          fields: {
            s1: { label: 'Marzec — saldo na koniec', answer: 1500, hint: 'Saldo na początek + wpływy − wydatki.' },
            p2: { label: 'Kwiecień — saldo na początek', answer: 1500, hint: 'To saldo na koniec marca.' },
            s2: { label: 'Kwiecień — saldo na koniec', answer: 2500, hint: 'Saldo na początek + wpływy − wydatki.' },
            s3: { label: 'Maj — saldo na koniec', answer: 5500, hint: 'Saldo na początek + wpływy − wydatki.' },
          },
          explanation: 'Salda: 1500, 2500, 5500 zł. Najtrudniejszy jest marzec — zakupy już są, pieniędzy od biur jeszcze nie ma.',
        },
        {
          type: 'multi',
          id: 'm4-reakcje',
          question: 'Co piekarnia może zrobić, żeby marzec nie był tak ciasny? Zaznacz rozsądne działania.',
          options: [
            'Poprosić biura o płatność w 7 dni zamiast 30',
            'Przedpłata za pierwsze zamówienie od nowych biur',
            'Zacząć od mniejszej liczby biur i rosnąć co miesiąc',
            'Kupić opakowania na pół roku z góry, bo hurtownia daje rabat',
            'Ukryć koszyki w kosztach pieczywa, żeby nie psuły wyniku',
          ],
          correct: [0, 1, 2],
          explanation: 'Krótszy termin płatności, przedpłata i spokojniejszy start poprawiają gotówkę. Zapas opakowań na pół roku zamraża pieniądze dokładnie wtedy, gdy ich brakuje.',
          hint: 'Szukaj działań, które przyspieszają wpływy albo zmniejszają wydatki na starcie.',
        },
      ],
    },
    {
      id: 'wariant',
      label: 'Gorszy wariant',
      title: 'Co, jeśli sprzedaż będzie niższa?',
      duration: 8,
      intro: 'Plan, który działa tylko wtedy, gdy wszystko pójdzie zgodnie z założeniami, nie jest planem. Policz wariant słabszy.',
      activities: [
        number('m4-gorszy', 'Wpływy są niższe o 20% we wszystkich trzech miesiącach (2400, 7200, 9600 zł), wydatki bez zmian (9500, 8000, 9000 zł). Saldo na start 8000 zł. Ile wynosi najniższe saldo na koniec miesiąca?', 100, 'Marzec: 8000 + 2400 − 9500 = 900. Kwiecień: 900 + 7200 − 8000 = 100. Maj: 100 + 9600 − 9000 = 700. Najniższe: 100 zł w kwietniu.', {
          unit: 'zł',
          tolerance: 0,
          mistakes: [{ value: 900, text: 'To saldo po marcu. W kwietniu spada jeszcze niżej — licz narastająco.' }],
        }),
        {
          type: 'projectField',
          id: 'm4-pole-gotowka',
          field: 'm4-5',
          label: 'Gotówka: wpływy, wydatki, najniższe saldo i reakcja',
          prompt: 'Możesz skorzystać z kalkulatora cash flow w serwisie (sześć miesięcy) i przepisać tu wynik.',
          example: 'Plan bazowy: najniższe saldo 1500 zł (marzec). Wariant −20%: 100 zł (kwiecień). Reakcja: przedpłata od nowych biur i płatność w 7 dni; bufor 3000 zł z oszczędności.',
        },
      ],
    },
    {
      id: 'proces',
      label: 'Proces',
      title: 'Jeden proces, który ktoś inny wykona',
      duration: 14,
      intro: 'Firma zależy od Ciebie tak długo, jak wszystko masz w głowie. Pierwszy krok do zmiany: opisać jedną powtarzalną czynność.',
      reading: {
        paragraphs: [
          'Opis procesu ma początek (co go uruchamia), 5–7 kroków, właściciela (kto odpowiada) i kontrolę (po czym poznać, że zrobione dobrze). Dobry test: daj opis osobie, która tego nie robiła. Każde jej pytanie to brakujący krok.',
          'W podejściu Lean szukasz w procesie strat: czekania, poprawek po błędach, zbędnego chodzenia i przenoszenia, robienia na zapas. Automatyzuj dopiero proces, który działa — inaczej szybciej robisz błędy.',
        ],
      },
      activities: [
        {
          type: 'sequence',
          id: 'm4-proces',
          question: 'Ułóż proces przyjęcia zamówienia na koszyk.',
          items: [
            'Telefon od biura do 14:00 dnia przed dostawą',
            'Zapis w zeszycie zamówień: firma, liczba osób, godzina, osoba kontaktowa',
            'Potwierdzenie SMS-em: liczba koszyków, godzina, cena',
            'Kompletowanie koszyków o 7:00 według zeszytu',
            'Dostawa i podpis odbioru na dokumencie',
            'Faktura tego samego dnia, termin płatności 7 dni',
          ],
          explanation: 'Każdy krok ma ślad: zeszyt, SMS, podpis, faktura. Dzięki temu proces może przejąć inna osoba.',
        },
        {
          type: 'spotErrors',
          id: 'm4-straty',
          title: 'Notatki właścicielki z tygodnia',
          context: 'Zaznacz miejsca, gdzie proces traci czas albo pieniądze (straty w sensie Lean).',
          lines: [
            { text: 'Kierowca czeka 20 minut, aż koszyki będą gotowe, bo kompletowanie zaczyna się o 7:30.', error: 'Czekanie. Kompletowanie od 7:00 albo wcześniejszy plan dnia.' },
            { text: 'Zamówienia są zapisywane w jednym zeszycie przy telefonie.' },
            { text: 'Dwa razy w tygodniu ktoś wraca do biura, bo zapomniał dżemu.', error: 'Poprawki po błędach. Lista kontrolna przy kompletowaniu.' },
            { text: 'Codziennie robimy 5 koszyków „na zapas”, choć zamówień nie ma.', error: 'Nadprodukcja — część trafia do kosza.' },
            { text: 'Faktura jest wystawiana w dniu dostawy.' },
          ],
          explanation: 'Trzy straty: czekanie, poprawki i robienie na zapas. Każda ma proste rozwiązanie bez nowego sprzętu.',
        },
        {
          type: 'projectField',
          id: 'm4-pole-proces',
          field: 'm4-4',
          label: 'Proces: początek, kroki, właściciel, kontrola',
          example: 'Przyjęcie zamówienia na koszyk. Początek: telefon do 14:00. Kroki: zapis w zeszycie, SMS z potwierdzeniem, kompletowanie o 7:00 z listą, dostawa z podpisem, faktura. Właściciel: Ania. Kontrola: lista koszyków odhaczona przed wyjazdem.',
        },
      ],
    },
    {
      id: 'miernik',
      label: 'Miernik',
      title: 'Jedna liczba na tydzień i uczciwa przewaga',
      duration: 12,
      intro: 'Na koniec dwa pola Lean Canvas, które najczęściej wypełnia się na wyrost.',
      reading: {
        paragraphs: [
          'Kluczowy miernik to jedna liczba, którą sprawdzasz co tydzień i która mówi, czy model działa. Dla koszyków: ile biur zamówiło drugi raz. Liczba polubień czy odwiedzin strony mówi o widoczności, nie o tym, czy ktoś wraca.',
          'Przewaga trudna do skopiowania na starcie często jest skromna: znajomość okolicy, relacje z klientami, szybkość. „Najwyższa jakość” i „pasja” to nie przewaga — każdy tak pisze. Jeśli przewagi jeszcze nie ma, wpisz to szczerze i zapisz, jak chcesz ją zbudować.',
        ],
      },
      activities: [
        choice(
          'm4-miernik',
          'Który miernik najlepiej pokaże, czy koszyki mają sens?',
          ['Liczba obserwujących profil piekarni', 'Odsetek biur, które zamówiły drugi raz w ciągu miesiąca', 'Liczba wydrukowanych ulotek', 'Liczba telefonów z pytaniem o cenę'],
          1,
          'Ponowne zamówienie znaczy, że biuro jest zadowolone i płaci. To jest model, który się spina.',
          ['Widoczność, nie sprzedaż.', null, 'To Twój wysiłek, nie reakcja klientów.', 'Zainteresowanie — dobre na start, ale słabsze niż powtórne zamówienie.'],
        ),
        {
          type: 'projectField',
          id: 'm4-pole-miernik',
          field: 'm4-3',
          label: 'Kluczowy miernik i przewaga — dowody lub założenia',
          example: 'Miernik: odsetek biur, które zamawiają drugi raz w miesiącu (cel: 50%). Przewaga (założenie): pieczywo z nocy, 5 minut od biur, znam właścicieli. Dowód na razie: 3 biura zamówiły dwa razy.',
        },
      ],
    },
  ],
};
