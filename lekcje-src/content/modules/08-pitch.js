import { choice, number, text } from '../schema.js';

export default {
  id: 'm8',
  n: 8,
  topic: 'Pitch i finansowanie',
  title: 'Opowiedz o firmie i policz potrzeby',
  subtitle: 'Sześć kart na trzy minuty, kwota wyliczona z planu wydatków zamiast okrągłej liczby i porównanie źródeł finansowania z ich konsekwencjami.',
  duration: 102,
  outcome: 'Pitch na trzy minuty, plan wykorzystania środków i porównanie finansowania.',
  realia: ['finansowanieZrodla', 'pupDotacja', 'bgkStart'],
  objectives: [
    'Dopasowuję akcenty pitcha do odbiorcy: banku, wspólnika, partnera, komisji.',
    'Układam sześć elementów prezentacji i zastępuję ogólniki dowodami.',
    'Liczę potrzebną kwotę z wydatków, luki gotówkowej, bufora i środków własnych.',
    'Porównuję dług, leasing, dotację, udziały i środki własne — koszt, ryzyko i wpływ na decyzje.',
    'Mieszczę pitch w trzech minutach i przygotowuję odpowiedzi na trudne pytania.',
  ],
  forGroup:
    'Na spotkanie przygotuj sześć kart i plan wydatków. W grupie każda osoba ma trzy minuty na pitch, a słuchacze grają wybranego odbiorcę — bank, wspólnika albo partnera — i zadają po jednym pytaniu z jego perspektywy. Ocenia się logikę i dowody, nie umiejętność występu.',
  solo:
    'Bez grupy: nagraj pitch telefonem i odsłuchaj go następnego dnia, sprawdzając czas i to, czy kwota wynika z planu. Pokaż plan wydatków doradcy w urzędzie pracy, funduszu pożyczkowym albo ośrodku wsparcia przedsiębiorczości — rozmowa jest bezpłatna i pokaże, o co zapyta prawdziwy odbiorca.',
  sections: [
    {
      id: 'odbiorca',
      label: 'Dla kogo',
      title: 'Ten sam projekt, różni odbiorcy',
      duration: 10,
      intro: 'Jola i Bartek prowadzą w Świdnicy pracownię renowacji mebli. Mają pierwsze płatne zlecenia i chcą przenieść się do większego lokalu. Przykład jest fikcyjny.',
      reading: {
        paragraphs: [
          'Pitch to krótka, uporządkowana prezentacja firmy: problem i klient, rozwiązanie i wartość, rynek i dowody zainteresowania, sposób zarabiania, zespół, potrzebna kwota i jej przeznaczenie. Elementy są stałe, akcenty zależą od tego, kto słucha.',
          'Bank pyta, czy spłacisz. Wspólnik lub inwestor udziałowy — ile firma może urosnąć i jaką będzie miał rolę. Lokalny partner — czy dotrzymasz terminu i ceny. Komisja przyznająca dotację — czy wydatki zgadzają się z wnioskiem i czy firma przetrwa wymagany okres.',
        ],
      },
      activities: [
        {
          type: 'matching',
          id: 'm8-odbiorcy',
          question: 'Kto najpewniej zada to pytanie?',
          options: ['Bank', 'Wspólnik lub inwestor udziałowy', 'Lokalny partner', 'Komisja przyznająca dotację'],
          rows: [
            { label: 'Czy wydatki zgadzają się z wnioskiem i czy firma będzie działać co najmniej 12 miesięcy?', correct: 3 },
            { label: 'Czy z nadwyżki spłacicie ratę także w słabszym miesiącu?', correct: 0 },
            { label: 'Czy odnowicie 40 krzeseł do restauracji w terminie i za uzgodnioną cenę?', correct: 2 },
            { label: 'Jak duża może być firma za pięć lat i jaki będę mieć wpływ na decyzje?', correct: 1 },
          ],
          explanation: 'Każdy odbiorca ocenia inne ryzyko. Ten sam pitch z innym akcentem: spłata, wzrost, terminowość, zgodność z wnioskiem.',
        },
      ],
    },
    {
      id: 'karty',
      label: 'Sześć kart',
      title: 'Sześć kart i zero ogólników',
      duration: 14,
      intro: 'Pierwsza wersja pitcha Joli i Bartka powstała w jeden wieczór. Brzmi z entuzjazmem, ale niewiele z niej wynika.',
      reading: {
        paragraphs: [
          'Na każdą kartę przypada około 30 sekund. Zacznij od problemu konkretnego klienta, nie od historii firmy. Każde zdanie, które da się zastąpić liczbą albo faktem, zastąp.',
          'Najczęstsze ogólniki w pitchach małych firm: „rynek wart miliardy” (zamiast rynku, który obsłużysz), „nie mamy konkurencji” (zawsze jest — choćby „nic nie robić”), „jesteśmy pasjonatami” (zamiast doświadczenia) i okrągła kwota bez planu wydatków.',
        ],
      },
      activities: [
        {
          type: 'sequence',
          id: 'm8-kolejnosc',
          question: 'Ułóż sześć kart pitcha w zalecanej kolejności.',
          items: [
            'Problem i klient',
            'Rozwiązanie i wartość dla klienta',
            'Rynek i dowody zainteresowania',
            'Jak firma zarabia',
            'Zespół i zdolność wykonania',
            'Kwota, przeznaczenie i terminy',
          ],
          explanation: 'Najpierw powód, dla którego firma istnieje, potem dowody, że działa, na końcu prośba. Kwota na początku brzmi jak żądanie bez uzasadnienia.',
        },
        {
          type: 'spotErrors',
          id: 'm8-szkic-pitcha',
          title: 'Pierwsza wersja pitcha pracowni',
          context: 'Zaznacz zdania, które są ogólnikiem albo nie dają odbiorcy podstawy do decyzji.',
          lines: [
            { text: 'Restauracje co kilka lat wyrzucają krzesła, choć konstrukcja jest dobra — zniszczone są tylko lakier i obicia.' },
            { text: 'Rynek mebli w Polsce jest wart dziesiątki miliardów złotych.', error: 'Liczba bez związku z firmą. Pokaż rynek, który obsłużycie: ilu klientów w zasięgu i ile zleceń.' },
            { text: 'Od stycznia mamy 14 płatnych zleceń, w tym 3 od tej samej restauracji.' },
            { text: 'Nie mamy konkurencji.', error: 'Konkurencją są inni stolarze, nowe meble i decyzja „nic nie robić”. Pokaż, czym się różnicie.' },
            { text: 'Jesteśmy pasjonatami starych mebli.', error: 'Pasja to nie zdolność wykonania. Pokaż doświadczenie: lata pracy, kursy, zrealizowane zlecenia.' },
            { text: 'Potrzebujemy 200 000 zł na rozwój.', error: 'Okrągła kwota bez planu wydatków i terminów. Odbiorca nie wie, na co i po co.' },
          ],
          explanation: 'Zostają problem i dowody płacenia. Rynek, konkurencję, zespół i kwotę trzeba przepisać na konkrety.',
        },
        {
          type: 'projectField',
          id: 'm8-pole-problem',
          field: 'm8-0',
          label: 'Problem, klient i rozwiązanie — po jednym zdaniu',
          example: 'Problem: restauracje i hotele wymieniają zniszczone krzesła i stoły, choć konstrukcja jest dobra. Klient: lokale gastronomiczne i hotele w promieniu 50 km od Świdnicy. Rozwiązanie: renowacja w 10 dni roboczych, o połowę taniej niż nowe meble, z odbiorem i dostawą.',
        },
      ],
    },
    {
      id: 'dowody',
      label: 'Dowody',
      title: 'Dowody, że ktoś za to płaci',
      duration: 12,
      intro: 'Odbiorca pitcha słyszał już wiele obietnic. Przekonuje go to, co klienci zrobili, a nie to, co powiedzieli.',
      reading: {
        paragraphs: [
          'Dowody mają różną siłę — od najsłabszych: polubienia i opinie znajomych, deklaracje w ankiecie, zapisy na listę, zaliczki i przedpłaty, płatne zlecenia, powtórne zlecenia od tych samych klientów. To ta sama zasada co w module 3: liczy się działanie, które coś klienta kosztuje.',
          'Sposób zarabiania opisz liczbami: średnia wartość zlecenia, marża, kiedy klient płaci. Zaliczka przy przyjęciu zlecenia jest jednocześnie dowodem popytu i ulgą dla gotówki.',
        ],
      },
      activities: [
        choice(
          'm8-dowod',
          'Który dowód popytu najmocniej przekona odbiorcę?',
          [
            '120 polubień profilu pracowni w mediach społecznościowych',
            '40 osób w ankiecie odpowiedziało, że chętnie skorzysta',
            '3 restauracje zleciły renowację drugi raz i wpłaciły zaliczkę na trzecie zlecenie',
            'List polecający od znajomego architekta wnętrz',
          ],
          2,
          'Powtórne zlecenie i zaliczka to pieniądze klienta, który już sprawdził jakość. Mocniejszego dowodu na tym etapie nie ma.',
          [
            'To widoczność. Polubienie nic klienta nie kosztuje.',
            'Deklaracje o przyszłości. Uprzejma odpowiedź w ankiecie to nie zakup.',
            null,
            'Miły gest, ale nie pokazuje, że ktoś płaci.',
          ],
        ),
        {
          type: 'projectField',
          id: 'm8-pole-dowody',
          field: 'm8-1',
          label: 'Dowody popytu i model zarabiania',
          example: 'Dowody: 14 płatnych zleceń od stycznia, 3 restauracje wróciły, jedna wpłaciła zaliczkę na kolejne. Model: zlecenie średnio 2400 zł, marża ok. 45%, zaliczka 30% przy przyjęciu.',
        },
      ],
    },
    {
      id: 'zespol',
      label: 'Zespół i rynek',
      title: 'Rynek, który obsłużysz, i zespół, który to wykona',
      duration: 10,
      intro: 'Zamiast liczby z raportu o rynku mebli Jola i Bartek liczą rynek od dołu: ilu klientów w zasięgu, ile zleceń, za ile.',
      reading: {
        paragraphs: [
          'Liczenie od dołu jest uczciwsze niż od góry. Policz klientów, do których realnie dotrzesz (np. z listy w promieniu dojazdu), przyjmij ostrożny odsetek, liczbę zleceń w roku i średnią wartość. Wynik będzie mniejszy, za to wiarygodny.',
          'O zespole mów przez to, co umiecie i co już zrobiliście: lata pracy w zawodzie, uprawnienia, zrealizowane zlecenia. Przewaga małej firmy bywa skromna — szybkość, dojazd, praca w nocy — i to wystarczy, jeśli jest prawdziwa.',
        ],
      },
      activities: [
        number('m8-rynek', 'W promieniu 50 km jest około 60 restauracji, hoteli i pracowni architektów, które odnawiają meble. Jeśli 25% z nich zleci pracowni 2 renowacje rocznie po średnio 2400 zł, jaki to przychód roczny?', 72000, '60 × 25% = 15 klientów. 15 × 2 × 2400 zł = 72 000 zł rocznie.', {
          unit: 'zł',
          tolerance: 0,
          mistakes: [
            { value: 288000, text: 'Tu przyjęto, że zamówią wszyscy. Ostrożne założenie to 25% klientów w zasięgu.' },
            { value: 36000, text: 'To wynik przy jednej renowacji rocznie. Założenie mówi o dwóch.' },
          ],
        }),
        {
          type: 'projectField',
          id: 'm8-pole-zespol',
          field: 'm8-2',
          label: 'Zespół, rynek i realna przewaga',
          example: 'Zespół: Jola — 8 lat w stolarni, wyceny i kontakt z klientami; Bartek — lakiernik po kursie renowacji. Rynek: ok. 60 lokali w promieniu 50 km, realnie ok. 72 000 zł rocznie od 15 stałych klientów. Przewaga: odbiór i montaż w nocy, bez zamykania lokalu.',
        },
      ],
    },
    {
      id: 'kwota',
      label: 'Kwota',
      title: 'Kwota, która wynika z planu',
      duration: 18,
      intro: 'Zamiast okrągłych 200 000 zł Jola i Bartek rozpisują, na co wydadzą pieniądze, i dodają to, o czym na początku zapomnieli: kaucję, przeprowadzkę i miesiące niższej sprzedaży.',
      reading: {
        paragraphs: [
          'Potrzebna kwota to suma wydatków inwestycyjnych i luki gotówkowej — pieniędzy, których zabraknie, zanim sprzedaż wróci do normy po zmianie — powiększona o bufor na nieprzewidziane koszty. Od tego odejmujesz środki własne. Lukę odczytasz z planu gotówki z modułu 4: to najniższe saldo w wariancie ostrożnym.',
          'Do kwoty dołącz kamienie milowe: co zrobicie, do kiedy i po czym odbiorca pozna, że pieniądze zadziałały.',
        ],
      },
      activities: [
        {
          type: 'docForm',
          id: 'm8-plan-wydatkow',
          title: 'Plan wykorzystania środków',
          points: 5,
          doc: {
            title: 'Pracownia renowacji — przeprowadzka do większego lokalu',
            table: {
              head: ['Pozycja', 'Kwota (zł)'],
              rows: [
                ['Sprzęt: szlifierki, odciąg pyłu, komora lakiernicza', '38 000'],
                ['Kaucja za lokal: 3 czynsze po 4 500 zł', { f: 'kaucja' }],
                ['Adaptacja: wentylacja i instalacja elektryczna', '12 000'],
                ['Przeprowadzka i tydzień przestoju', '4 000'],
                ['Luka gotówkowa: 3 miesiące niższej sprzedaży, po 6 000 zł', { f: 'luka' }],
                ['Razem wydatki', { f: 'razem' }],
                ['Bufor 15% od wydatków', { f: 'bufor' }],
                ['Minus środki własne', '20 000'],
                ['Potrzebne finansowanie', { f: 'potrzeba' }],
              ],
            },
            footer: 'Kwoty fikcyjne. Bufor liczony od sumy wydatków.',
          },
          fields: {
            kaucja: { label: 'Kaucja', answer: 13500, hint: '3 × 4 500 zł.' },
            luka: { label: 'Luka gotówkowa', answer: 18000, hint: '3 miesiące × 6 000 zł.' },
            razem: { label: 'Razem wydatki', answer: 85500, hint: 'Dodaj pięć pozycji wydatków.' },
            bufor: { label: 'Bufor 15%', answer: 12825, hint: '15% od sumy wydatków.' },
            potrzeba: { label: 'Potrzebne finansowanie', answer: 78325, hint: 'Wydatki + bufor − środki własne.' },
          },
          explanation: 'Wydatki 85 500 zł + bufor 12 825 zł − środki własne 20 000 zł = 78 325 zł. Kwota mniejsza niż 200 000 zł, ale każdy złoty ma przeznaczenie.',
        },
        choice(
          'm8-kamienie',
          'Który zapis kamieni milowych da odbiorcy podstawę do oceny?',
          [
            'Rozwój firmy i wzrost sprzedaży w ciągu roku',
            'Maj: przeprowadzka i sprzęt. Czerwiec: pierwsze zlecenie w komorze lakierniczej. Wrzesień: 12 zleceń miesięcznie i nadwyżka 3000 zł',
            'Jak najszybciej zwiększyć liczbę klientów',
          ],
          1,
          'Każdy punkt ma termin i coś, co da się sprawdzić. Odbiorca wie, kiedy zapytać o postęp.',
          ['Bez terminów i liczb. Nie da się sprawdzić, czy się udało.', null, 'Kierunek, nie kamień milowy — brak terminu i miary.'],
        ),
        {
          type: 'projectField',
          id: 'm8-pole-kwota',
          field: 'm8-3',
          label: 'Kwota, wydatki, kamienie milowe i terminy',
          prompt: 'Lukę gotówkową weź z planu gotówki z modułu 4 (najniższe saldo w wariancie ostrożnym).',
          example: 'Wydatki 85 500 zł + bufor 15% (12 825 zł) − środki własne 20 000 zł = 78 325 zł. Maj: przeprowadzka i sprzęt. Czerwiec: komora lakiernicza działa. Wrzesień: 12 zleceń miesięcznie, nadwyżka 3000 zł.',
        },
      ],
    },
    {
      id: 'zrodla',
      label: 'Źródła',
      title: 'Skąd pieniądze i co za nie oddajesz',
      duration: 16,
      intro: 'Każde źródło finansowania ma cenę. Czasem są to odsetki, czasem część firmy, czasem warunki, których trzeba dotrzymać latami.',
      reading: {
        paragraphs: [
          'Kredyt lub pożyczka (z banku albo funduszu pożyczkowego) to rata co miesiąc, niezależnie od sprzedaży. Leasing finansuje sprzęt, który do końca umowy należy do finansującego. Dotacja z urzędu pracy nie wymaga spłaty, ale ma warunki — m.in. wniosek przed rejestracją firmy i prowadzenie jej co najmniej 12 miesięcy.',
          'Wspólnik lub inwestor udziałowy nie chce raty, ale dostaje część firmy, zysku i decyzji — to oznacza spółkę i umowę (wróć do form z modułu 2). Środki własne nie tworzą zobowiązań wobec nikogo, ale ryzykujesz własne oszczędności. Warunki konkretnych programów sprawdzaj w ich dokumentach, bo zmieniają się z każdym naborem.',
        ],
      },
      activities: [
        {
          type: 'matching',
          id: 'm8-zrodla',
          question: 'Które źródło finansowania opisuje każde zdanie?',
          options: ['Kredyt lub pożyczka', 'Leasing', 'Dotacja z urzędu pracy', 'Wspólnik lub inwestor udziałowy', 'Środki własne'],
          rows: [
            { label: 'Sprzęt należy do finansującego do końca umowy', correct: 1 },
            { label: 'Oddajesz część firmy i część decyzji', correct: 3 },
            { label: 'Nikt nie pyta o plan, ale ryzykujesz swoje oszczędności', correct: 4 },
            { label: 'Rata co miesiąc, także w słabym miesiącu', correct: 0 },
            { label: 'Wniosek przed rejestracją firmy, potem co najmniej 12 miesięcy działalności', correct: 2 },
          ],
          explanation: 'Każde źródło ma inny koszt: odsetki, własność sprzętu, udział w firmie, warunki programu albo osobiste ryzyko.',
        },
        number('m8-koszt-pozyczki', 'Pożyczka 60 000 zł na 5 lat, rata 1 250 zł miesięcznie. Ile pracownia zapłaci ponad pożyczoną kwotę?', 15000, '1 250 zł × 60 rat = 75 000 zł. 75 000 − 60 000 = 15 000 zł kosztu pożyczki.', {
          unit: 'zł',
          tolerance: 0,
          mistakes: [
            { value: 75000, text: 'To suma wszystkich rat. Koszt to nadwyżka ponad pożyczone 60 000 zł.' },
            { value: 0, text: 'Pożyczka nie jest darmowa: suma rat jest większa od kwoty pożyczki.' },
          ],
        }),
        {
          type: 'multi',
          id: 'm8-udzialy',
          question: 'Znajomy przedsiębiorca proponuje 80 000 zł za 30% udziałów w spółce. Co trzeba ustalić na piśmie, zanim pracownia przyjmie pieniądze?',
          options: [
            'Kto podejmuje jakie decyzje i czy wspólnik ma prawo weta',
            'Kolor nowego logo',
            'Na jakich warunkach wspólnik może sprzedać udziały albo wyjść ze spółki',
            'Jak dzielony będzie zysk i czy wspólnik będzie pracować w firmie',
            'Ile zleceń pracownia wykona w pierwszym tygodniu',
            'Co się stanie, gdy firma będzie potrzebować kolejnych pieniędzy',
          ],
          correct: [0, 2, 3, 5],
          explanation: 'Decyzje, wyjście, zysk i kolejne pieniądze to cztery sprawy, o które spółki kłócą się najczęściej. Spisz je, zanim wpłynie pierwszy złoty.',
        },
        {
          type: 'projectField',
          id: 'm8-pole-zrodla',
          field: 'm8-4',
          label: 'Porównanie trzech źródeł finansowania i konsekwencji',
          example: 'Dla 78 325 zł: 1) pożyczka z funduszu pożyczkowego na całość — rata ok. 1650 zł, firma zostaje nasza; 2) leasing sprzętu 38 000 zł + pożyczka 40 000 zł — niższa rata na start, sprzęt nasz po spłacie; 3) wspólnik: 80 000 zł za 30% — bez raty, ale dzielimy decyzje i zysk. Wybór: wariant 2, sprawdzamy warunki w dwóch funduszach.',
        },
      ],
    },
    {
      id: 'bank',
      label: 'Bank i partner',
      title: 'Ten sam pitch dla banku i dla wspólnika',
      duration: 10,
      intro: 'Jola i Bartek idą na dwie rozmowy w jednym tygodniu: do funduszu pożyczkowego i do znajomego, który myśli o wejściu do spółki.',
      reading: {
        paragraphs: [
          'Bank i fundusz pożyczkowy patrzą na zdolność spłaty: ile zostaje co miesiąc po kosztach, ile razy ta nadwyżka pokrywa ratę, co się stanie przy słabszej sprzedaży i jakie jest zabezpieczenie. Wspólnik patrzy na potencjał wzrostu, rolę zespołu i to, jak będą wspólnie podejmowane decyzje.',
        ],
      },
      activities: [
        choice(
          'm8-bank',
          'Co pracownia powinna pokazać funduszowi pożyczkowemu w pierwszej kolejności?',
          [
            'Wizję sieci pracowni w pięciu miastach',
            'Zdjęcia odnowionych mebli przed i po',
            'Liczbę obserwujących profil pracowni',
            'Plan gotówki z ratą, najniższym saldem i wariantem słabszej sprzedaży',
          ],
          3,
          'Fundusz chce wiedzieć, czy rata zostanie spłacona także w gorszym miesiącu. Plan gotówki odpowiada na to wprost.',
          [
            'To opowieść dla wspólnika. Fundusz pyta o spłatę, nie o skalę.',
            'Pokazują jakość, ale nie zdolność spłaty.',
            'Widoczność nie mówi nic o spłacie raty.',
            null,
          ],
        ),
        number('m8-pokrycie', 'Po przeprowadzce plan pokazuje nadwyżkę 3000 zł miesięcznie przed spłatą długu. Rata wyniesie 1250 zł. Ile razy nadwyżka pokrywa ratę?', 2.4, '3000 ÷ 1250 = 2,4. Nawet gdy nadwyżka spadnie o połowę, rata jest pokryta.', {
          tolerance: 0.01,
          mistakes: [{ value: 1750, text: 'To różnica w złotych. Pytanie brzmi „ile razy” — podziel nadwyżkę przez ratę.' }],
        }),
      ],
    },
    {
      id: 'proba',
      label: 'Próba',
      title: 'Trzy minuty, trudne pytania i jedna poprawka',
      duration: 12,
      intro: 'Pitch, którego nikt nie słyszał na głos, zwykle trwa dwa razy dłużej, niż autor myśli.',
      reading: {
        paragraphs: [
          'Spokojnie mówiąc, mieścisz około 130 słów na minutę. Trzy minuty to mniej niż czterysta słów — po kilka zdań na kartę. Powiedz pitch na głos ze stoperem, a potem skreśl to, co nie jest dowodem ani liczbą.',
          'Przygotuj odpowiedzi na trzy pytania, których najbardziej się boisz. Po próbie popraw jeden, najsłabszy element — nie wszystko naraz. Pamiętaj: dobry pitch nie gwarantuje finansowania; o decyzji przesądzają warunki programu i liczby.',
        ],
      },
      activities: [
        number('m8-slowa', 'Mówisz spokojnie około 130 słów na minutę. Ile słów zmieści się w pitchu na trzy minuty?', 390, '130 × 3 = 390 słów, czyli około 65 słów na każdą z sześciu kart.', {
          unit: 'słów',
          tolerance: 0,
          mistakes: [{ value: 43, text: 'Tu podzielono przez 3. Trzy minuty to trzy razy więcej słów niż jedna.' }],
        }),
        text('m8-trudne-pytanie', 'Jakie pytanie odbiorcy Twojego pitcha najbardziej Cię niepokoi i jak na nie odpowiesz — jednym, dwoma zdaniami z liczbą lub faktem?', 'Na przykład: „Co, jeśli restauracje ograniczą zlecenia zimą?” — Mamy wariant −20% sprzedaży: najniższe saldo 4000 zł, rata dalej pokryta 1,9 raza; zimą bierzemy zlecenia od klientów prywatnych.', { minLength: 30 }),
        {
          type: 'checklist',
          id: 'm8-rubryka',
          question: 'Sprawdź swój pitch przed wystąpieniem. Zaznacz, co już jest.',
          items: [
            'Problem i klient w pierwszych 30 sekundach',
            'Co najmniej jeden dowód, że ktoś zapłacił',
            'Kwota z rozpisanymi wydatkami i terminami',
            'Wariant słabszej sprzedaży',
            'Jedno zdanie, czego oczekuję od słuchacza',
          ],
        },
        {
          type: 'projectField',
          id: 'm8-pole-pitch',
          field: 'm8-5',
          label: 'Szkic pitcha, pytania odbiorców i poprawki',
          example: 'Sześć kart, ok. 390 słów, 3 minuty. Pytania z próby: „Co, jeśli restauracje ograniczą zlecenia zimą?”, „Kto zastąpi Bartka w chorobie?”. Poprawka: dodany wariant −20% sprzedaży i plan zastępstwa.',
        },
      ],
    },
  ],
};
