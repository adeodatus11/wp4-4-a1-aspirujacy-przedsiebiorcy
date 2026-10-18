import { choice, number, text } from '../schema.js';

export default {
  id: 'm2',
  n: 2,
  topic: 'Postawa przedsiębiorcza',
  title: 'Przedsiębiorczość na własnych zasadach',
  subtitle: 'Po co Ci firma, ile czasu i pieniędzy możesz w nią włożyć, jaką rolę w niej pełnisz i co trzeba załatwić formalnie, zanim wystawisz pierwszy rachunek.',
  duration: 95,
  outcome: 'Mapa zasobów, jeden nawyk i lista spraw do sprawdzenia przed startem.',
  realia: ['nierejestrowana', 'ceidg', 'ulgaNaStart', 'zusEtapy', 'zdrowotna', 'formyOpodatkowania'],
  objectives: [
    'Nazywam, po co chcę prowadzić firmę i jaki koszt mogę ponieść.',
    'Opisuję swoje zasoby: czas, umiejętności, kontakty i pieniądze — w liczbach.',
    'Rozpoznaję, ile czasu spędzam jako specjalista, menedżer i przedsiębiorca.',
    'Wiem, czym różni się działalność nierejestrowana, jednoosobowa firma i spółka.',
    'Liczę, ile będą kosztować składki ZUS w pierwszych trzech latach firmy.',
  ],
  forGroup:
    'Na spotkanie weź podział swojego tygodnia na trzy role i listę pytań formalnych. W grupie porównacie, kto ile czasu poświęca na rozwój firmy, a pytania formalne zbierzecie w jedną listę do konsultacji z księgową albo w punkcie obsługi przedsiębiorców.',
  solo:
    'Bez grupy: przez tydzień zapisuj co wieczór, ile godzin było pracy „przy produkcie”, a ile organizowania i myślenia o kierunku. Z listą pytań formalnych umów się na bezpłatną konsultację — w urzędzie pracy, inkubatorze albo przez infolinię Biznes.gov.pl.',
  sections: [
    {
      id: 'po-co',
      label: 'Po co',
      title: 'Po co Ci firma',
      duration: 10,
      intro: 'Kuba przejmuje część obowiązków w rodzinnej stolarni w Oleśnicy. Chce sprzedawać meble przez internet, ale każdą cenę nadal zatwierdza jego ojciec, założyciel firmy. Kuba mówi: „Brakuje mi odwagi”.',
      reading: {
        paragraphs: [
          'Motywacja pomaga zacząć, ale nie zastąpi jasnych zasad. U Kuby problemem nie jest odwaga, tylko to, że nikt nie ustalił, o czym może decydować sam. Zanim zaczniesz szukać w sobie „postawy przedsiębiorczej”, sprawdź, czy przeszkoda jest w Tobie, czy w układzie, w którym działasz.',
          'Zapisz swoje powody prowadzenia firmy — i koszt, który możesz ponieść: ile miesięcy niższych dochodów, ile wieczorów w tygodniu, jakie ryzyko dla rodziny. Powód bez kosztu to marzenie. Powód z kosztem to decyzja.',
        ],
      },
      activities: [
        choice(
          'm2-kuba',
          'Co najbardziej pomoże Kubie?',
          [
            'Ustalić z ojcem, jakie zamówienia może wyceniać sam, np. według cennika, i sprawdzić to na pięciu zamówieniach',
            'Kurs asertywności, żeby śmielej rozmawiać z klientami',
            'Założyć własną firmę obok rodzinnej',
            'Poczekać, aż ojciec przejdzie na emeryturę',
          ],
          0,
          'Problem leży w podziale decyzji, nie w charakterze Kuby. Mały test na pięciu zamówieniach pokaże, czy ceny Kuby się sprawdzają, a ojcu da dowód zamiast obietnicy.',
          [
            null,
            'Śmiałość nie pomoże, jeśli i tak każdą cenę zatwierdza ktoś inny.',
            'Ucieczka od problemu, który można rozwiązać jedną rozmową.',
            'Czekanie nie zmienia zasad i odkłada naukę Kuby o lata.',
          ],
        ),
        {
          type: 'projectField',
          id: 'm2-pole-po-co',
          field: 'm2-0',
          label: 'Po co chcę prowadzić lub rozwijać firmę',
          prompt: 'Trzy powody i koszt, który możesz ponieść: czas, pieniądze, ryzyko.',
          example: 'Chcę sama decydować o godzinach pracy, robić meble na wymiar zamiast seryjnych i zarabiać więcej niż na etacie. Mogę przez pół roku żyć z oszczędności i pracować w soboty. Nie zaciągnę kredytu pod dom.',
        },
      ],
    },
    {
      id: 'zasoby',
      label: 'Zasoby',
      title: 'Co masz na start — w liczbach',
      duration: 12,
      intro: '„Mam trochę oszczędności i dużo zapału” nie pozwala niczego zaplanować. Zasoby trzeba policzyć.',
      reading: {
        paragraphs: [
          'Czas: ile godzin tygodniowo naprawdę możesz pracować w firmie, po odjęciu etatu, dzieci, dojazdów? Umiejętności: co umiesz zrobić dziś sam, a za co zapłacisz innym (księgowość, strona, transport)? Kontakty: kto może zostać pierwszym klientem, polecić Cię albo doradzić? Pieniądze: ile możesz włożyć bez zadłużania się.',
          'Z badań nad małymi firmami płynie prosta reguła: oddziel pieniądze firmy od prywatnych i miej poduszkę na koszty życia na kilka miesięcy. Pierwsze miesiące firmy rzadko dają pełny dochód.',
        ],
      },
      activities: [
        number('m2-poduszka', 'Twoje koszty życia (czynsz, jedzenie, rachunki, raty) to 3800 zł miesięcznie. Chcesz mieć poduszkę na 4 miesiące. Masz 9000 zł oszczędności. Ile brakuje do poduszki?', 6200, '3800 × 4 = 15 200 zł. Brakuje 15 200 − 9000 = 6200 zł.', {
          unit: 'zł',
          tolerance: 0,
          mistakes: [{ value: 15200, text: 'To cała poduszka. Odejmij oszczędności, które już masz.' }],
        }),
        choice(
          'm2-czas',
          'Ewa pracuje na etacie 40 godzin tygodniowo i chce otworzyć sklep internetowy z rękodziełem. Który plan czasu jest realny?',
          [
            '8 godzin tygodniowo: dwa wieczory po 2 godziny i 4 godziny w sobotę, przez pierwsze 3 miesiące',
            '30 godzin tygodniowo od pierwszego dnia, bo „jak się chce, to się da”',
            'Tyle, ile wyjdzie — nie warto planować czasu przy pasji',
          ],
          0,
          'Plan musi zmieścić się obok etatu i życia. Lepsze 8 pewnych godzin niż 30 obiecanych, które po miesiącu się sypią.',
          [null, '70 godzin pracy tygodniowo przez dłuższy czas kończy się zmęczeniem albo porzuceniem pomysłu.', 'Bez planu czas na firmę wypierają inne sprawy.'],
        ),
        {
          type: 'projectField',
          id: 'm2-pole-zasoby',
          field: 'm2-1',
          label: 'Moje zasoby: umiejętności, czas, kontakty, środki',
          example: 'Czas: 10 h tygodniowo. Umiem: stolarka, projekty w programie do rysowania. Nie umiem: księgowość, sklep internetowy. Kontakty: dwóch architektów wnętrz, grupa sąsiedzka. Pieniądze: 12 000 zł, poduszka na 3 miesiące.',
        },
        {
          type: 'projectField',
          id: 'm2-pole-ograniczenia',
          field: 'm2-2',
          label: 'Ograniczenia i sprawy poza moim wpływem',
          example: 'Mały warsztat (20 m²), brak samochodu dostawczego, sezonowość — zimą mniej zamówień. Nie wpływam na ceny drewna.',
        },
      ],
    },
    {
      id: 'role',
      label: 'Trzy role',
      title: 'Specjalista, menedżer, przedsiębiorca',
      duration: 14,
      intro: 'W małej firmie jedna osoba gra trzy role. Kłopot zaczyna się, gdy jedna zjada cały tydzień.',
      reading: {
        paragraphs: [
          'Specjalista wykonuje pracę: szyje, naprawia, piecze, programuje. Menedżer organizuje: planuje zamówienia, pilnuje terminów, rozlicza, ustala, kto co robi. Przedsiębiorca patrzy w przód: wybiera klientów, zmienia ofertę, szuka okazji. Ten podział opisał Michael Gerber w książce o małych firmach („Mit przedsiębiorczości”).',
          'Większość osób zakłada firmę, bo jest dobrym specjalistą — i zostaje nim na 90% czasu. Wtedy nikt nie pracuje nad firmą, tylko w firmie. Nie chodzi o to, żeby przestać robić swoją pracę, tylko żeby co tydzień zostało trochę czasu na dwie pozostałe role.',
        ],
      },
      activities: [
        {
          type: 'matching',
          id: 'm2-role',
          question: 'Która to rola?',
          options: ['Specjalista', 'Menedżer', 'Przedsiębiorca'],
          rows: [
            { label: 'Szlifuję i lakieruję komodę dla klientki', correct: 0 },
            { label: 'Układam grafik dostaw drewna na przyszły miesiąc', correct: 1 },
            { label: 'Sprawdzam, czy warto robić meble dla kawiarni zamiast dla domów', correct: 2 },
            { label: 'Wysyłam faktury i przypominam o płatnościach', correct: 1 },
            { label: 'Rozmawiam z architektem o stałej współpracy', correct: 2, explanation: 'Nowy kanał klientów to decyzja o kierunku firmy.' },
            { label: 'Naprawiam szufladę, która wróciła z reklamacji', correct: 0 },
          ],
          explanation: 'Specjalista robi, menedżer porządkuje, przedsiębiorca wybiera kierunek. Wszystkie trzy role są potrzebne.',
        },
        number('m2-procent', 'Kuba w zeszłym tygodniu przepracował 50 godzin: 41 przy meblach, 7 na zamówieniach i fakturach, 2 na rozmowach o nowych klientach. Jaki procent czasu był pracą przedsiębiorcy?', 4, '2 ÷ 50 = 0,04, czyli 4%.', {
          unit: '%',
          tolerance: 0.1,
          mistakes: [{ value: 82, text: 'To czas specjalisty (41 z 50). Pytanie dotyczy rozmów o nowych klientach.' }],
        }),
        choice(
          'm2-co-zmienic',
          'Co z tego wynika dla Kuby?',
          [
            'Zarezerwować np. 3 godziny w piątek na sprawy przedsiębiorcy i sprawdzić, co da się przekazać lub uprościć w pracy przy meblach',
            'Przestać robić meble i zostać tylko menedżerem',
            'Nic — w małej firmie właściciel zawsze jest głównie specjalistą',
          ],
          0,
          'Wystarczy mała, stała porcja czasu na kierunek firmy. Bez niej Kuba za rok będzie w tym samym miejscu, tylko bardziej zmęczony.',
          [null, 'Za duży skok — firma żyje z jego pracy przy meblach.', 'To prawda dla wielu firm, ale wtedy nikt nie decyduje, dokąd firma zmierza.'],
        ),
        {
          type: 'projectField',
          id: 'm2-pole-tydzien',
          field: 'm2-3',
          label: 'Podział tygodnia: specjalista / menedżer / przedsiębiorca',
          prompt: 'Rzeczywisty podział z ostatniego tygodnia, w godzinach albo procentach — razem 100%.',
          example: 'Specjalista 75% (30 h), menedżer 20% (8 h), przedsiębiorca 5% (2 h). Cel na miesiąc: przedsiębiorca 10% — piątek 14–18.',
        },
      ],
    },
    {
      id: 'nawyk',
      label: 'Nawyk',
      title: 'Jeden nawyk i jedna rzecz mniej',
      duration: 10,
      intro: 'Lista rzeczy do zrobienia rośnie sama. Lista rzeczy, których przestajesz robić, wymaga decyzji.',
      reading: {
        paragraphs: [
          'Nawyk trzyma się, gdy ma stałe miejsce w tygodniu, jasny początek i sposób sprawdzenia: „W piątek o 14:00 przy biurku przeglądam zamówienia z tygodnia i zapisuję jedną zmianę”. „Będę systematyczny” nie ma żadnej z tych cech.',
          'Do nowego nawyku dopisz jedną rzecz, z której rezygnujesz — żeby zrobić na niego miejsce. Na przykład: przestaję odpisywać na wiadomości w trakcie pracy przy meblach, odpisuję o 12:00 i 17:00.',
        ],
      },
      activities: [
        {
          type: 'spotErrors',
          id: 'm2-nawyki',
          title: 'Plany nawyków z poprzedniej grupy',
          context: 'Zaznacz te, które się nie utrzymają, bo brakuje im czasu, miejsca albo sposobu sprawdzenia.',
          lines: [
            { text: 'Codziennie o 7:30, przed otwarciem, wpisuję wczorajsze wpływy do arkusza.' },
            { text: 'Będę bardziej zorganizowana.', error: 'Brak konkretnego działania, czasu i sposobu sprawdzenia.' },
            { text: 'W poniedziałki o 9:00 dzwonię do jednego byłego klienta. Zapisuję, kto i co powiedział.' },
            { text: 'Od jutra zero mediów społecznościowych na zawsze.', error: 'Za duża zmiana naraz i bez planu, co w zamian. Lepiej: telefon w szufladzie do 12:00.' },
            { text: 'Postaram się częściej myśleć o strategii.', error: '„Postaram się” i „częściej” — nie wiadomo kiedy, gdzie ani po czym poznać wykonanie.' },
          ],
          explanation: 'Trzy plany do poprawy. Dobry nawyk ma porę, miejsce i ślad, po którym sprawdzisz, czy się odbył.',
        },
        {
          type: 'projectField',
          id: 'm2-pole-nawyk',
          field: 'm2-4',
          label: 'Jeden nawyk i jedna rzecz, z której rezygnuję',
          example: 'Nawyk: w piątek 14:00–15:00 przeglądam zamówienia i liczę marżę. Rezygnuję: z odbierania telefonów podczas cięcia — oddzwaniam o 12:00 i 16:00.',
        },
      ],
    },
    {
      id: 'forma',
      label: 'Forma firmy',
      title: 'Bez rejestracji, firma czy spółka?',
      duration: 14,
      intro: 'Pierwsza formalna decyzja to forma działalności. Dla większości osób zaczynających samodzielnie wybór jest między działalnością nierejestrowaną a jednoosobową firmą.',
      reading: {
        table: {
          head: ['Forma', 'Dla kogo', 'Na co uważać'],
          rows: [
            ['Działalność nierejestrowana', 'Mała sprzedaż na próbę: przychód do 10 813,50 zł w kwartale (2026)', 'Nie dla każdej branży; po przekroczeniu limitu 7 dni na wpis do CEIDG'],
            ['Jednoosobowa działalność (CEIDG)', 'Większość osób zaczynających samodzielnie', 'Odpowiadasz całym majątkiem; składki ZUS i podatek'],
            ['Spółka cywilna', 'Dwie lub więcej osób prowadzących wspólny biznes', 'Każdy wspólnik ma własną firmę w CEIDG; odpowiadacie solidarnie'],
            ['Spółka z o.o.', 'Większe ryzyko, wspólnicy, inwestor', 'Kapitał, KRS, pełna księgowość — droższe prowadzenie'],
          ],
        },
        paragraphs: [
          'Wpis do CEIDG jest bezpłatny i można go złożyć online. We wniosku wybierasz kody PKD (rodzaje działalności), formę opodatkowania i sposób opłacania ZUS. Przy płatnościach między firmami powyżej 15 000 zł potrzebny jest rachunek bankowy. Niektóre działalności wymagają koncesji, zezwolenia albo wpisu do rejestru — np. sprzedaż alkoholu czy produkcja żywności.',
        ],
      },
      activities: [
        {
          type: 'matching',
          id: 'm2-formy',
          question: 'Jaka forma pasuje na start?',
          options: ['Nierejestrowana', 'Jednoosobowa firma', 'Spółka cywilna', 'Spółka z o.o.'],
          rows: [
            { label: 'Ola chce sprawdzić, czy sprzeda kolczyki na trzech jarmarkach, ok. 2000 zł w kwartale', correct: 0 },
            { label: 'Paweł otwiera serwis rowerowy i planuje 8000 zł przychodu miesięcznie', correct: 1 },
            { label: 'Dwie kosmetyczki chcą razem prowadzić gabinet i dzielić koszty', correct: 2 },
            { label: 'Trzech wspólników buduje aplikację i rozmawia z inwestorem', correct: 3 },
          ],
          explanation: 'To punkt wyjścia do rozmowy z księgową, nie gotowa decyzja. Forma zależy też od ryzyka, branży i planów.',
        },
        choice(
          'm2-nierejestrowana',
          'Paweł z serwisem rowerowym (8000 zł miesięcznie) chce „na początek” działać bez rejestracji. Co mu powiesz?',
          [
            'To nie wystarczy: 24 000 zł w kwartale przekracza limit, firmę trzeba zarejestrować przed startem',
            'To dobry pomysł, bo pierwszy rok można zawsze działać bez rejestracji',
            'Może, jeśli będzie przyjmował płatności tylko gotówką',
          ],
          0,
          'Limit działalności nierejestrowanej to 10 813,50 zł w kwartale (2026). Przy 8000 zł miesięcznie Paweł przekroczy go w drugim miesiącu.',
          [null, 'Takiej zasady nie ma — liczy się limit przychodu.', 'Sposób płatności nie zmienia limitu, a ukrywanie przychodu to przestępstwo skarbowe.'],
        ),
      ],
    },
    {
      id: 'zus',
      label: 'ZUS i podatek',
      title: 'Ile kosztuje prowadzenie firmy',
      duration: 20,
      intro: 'Najczęstsze zaskoczenie po starcie: składki rosną skokami, a składka zdrowotna jest od pierwszego dnia.',
      reading: {
        table: {
          head: ['Okres', 'Składki społeczne (2026)', 'Składka zdrowotna'],
          rows: [
            ['Miesiące 1–6: ulga na start', '0 zł', 'tak, od początku'],
            ['Kolejne 24 miesiące: preferencyjny ZUS', '456,19 zł z chorobową, 420,86 zł bez', 'tak'],
            ['Potem: pełne składki', '1926,76 zł z chorobową', 'tak'],
          ],
        },
        paragraphs: [
          'Składka zdrowotna zależy od formy opodatkowania. Na skali podatkowej to 9% dochodu, ale nie mniej niż 432,54 zł miesięcznie. Na ryczałcie jest stała kwota zależna od przychodu w roku: 498,35 zł przy przychodzie do 60 000 zł. Przy niskich przychodach po okresie preferencyjnym można skorzystać z Małego ZUS Plus (składki od dochodu, jeśli przychód w poprzednim roku nie przekroczył 120 000 zł).',
          'Formę opodatkowania wybierasz na rok: skala (12% i 32% powyżej 120 000 zł dochodu, kwota wolna 30 000 zł), podatek liniowy (19% dochodu) albo ryczałt (procent od przychodu, bez kosztów; np. 8,5% dla wielu usług). Która się opłaca, zależy od Twoich przychodów i kosztów — policz to z księgową, zanim złożysz wniosek.',
        ],
      },
      activities: [
        {
          type: 'sequence',
          id: 'm2-etapy',
          question: 'Ułóż etapy składek społecznych od założenia firmy.',
          items: ['Ulga na start — bez składek społecznych', 'Preferencyjny ZUS przez 24 miesiące', 'Pełne składki (albo Mały ZUS Plus, jeśli przychody są niskie)'],
          explanation: '6 miesięcy ulgi, 24 miesiące preferencji, potem pełne składki. Składka zdrowotna jest przez cały czas.',
        },
        number('m2-miesiac-8', 'Paweł jest na skali podatkowej, ma niski dochód i płaci składkę zdrowotną w minimalnej wysokości. W 8. miesiącu firmy płaci preferencyjny ZUS z chorobową. Ile wynoszą jego składki w tym miesiącu razem?', 888.73, '456,19 zł (preferencyjne społeczne z chorobową) + 432,54 zł (zdrowotna minimalna) = 888,73 zł.', {
          unit: 'zł',
          mistakes: [
            { value: 456.19, text: 'To same składki społeczne. Doliczasz składkę zdrowotną.' },
            { value: 432.54, text: 'To sama zdrowotna. W 8. miesiącu nie ma już ulgi na start.' },
          ],
        }),
        number('m2-30-miesiecy', 'Ile Paweł zapłaci składek społecznych (z chorobową) przez pierwsze 30 miesięcy firmy, jeśli skorzysta z ulgi na start i preferencyjnego ZUS?', 10948.56, '6 × 0 zł + 24 × 456,19 zł = 10 948,56 zł.', {
          unit: 'zł',
          mistakes: [{ value: 13685.7, text: 'To 30 × 456,19 zł. Przez pierwsze 6 miesięcy składek społecznych nie ma.' }],
        }),
        choice(
          'm2-skok',
          'Co Paweł powinien uwzględnić w planie finansowym na trzeci rok firmy?',
          [
            'Wzrost składek społecznych z ok. 456 zł do ok. 1927 zł miesięcznie po 30 miesiącach',
            'Nic — składki są stałe przez cały czas prowadzenia firmy',
            'Że składka zdrowotna znika po dwóch latach',
            'Że po 30 miesiącach ZUS zwraca część wpłaconych składek',
          ],
          0,
          'Po okresie preferencyjnym koszt składek rośnie ponad czterokrotnie. Jeśli przychody są niskie, sprawdź warunki Małego ZUS Plus.',
          [null, 'Składki zmieniają się etapami i co roku z płacą minimalną i przeciętnym wynagrodzeniem.', 'Zdrowotną płaci się cały czas.', 'Nie ma takiego zwrotu.'],
        ),
      ],
    },
    {
      id: 'pytania',
      label: 'Pytania',
      title: 'Lista spraw do sprawdzenia przed startem',
      duration: 15,
      intro: 'Kurs nie zastąpi rozmowy z księgową ani przepisów Twojej branży. Da Ci za to listę pytań, z którą ta rozmowa trwa pół godziny, a nie trzy.',
      reading: {
        list: [
          'Biznes.gov.pl — rejestracja, przewodniki po branżach, infolinia dla przedsiębiorców.',
          'Księgowa lub biuro rachunkowe — forma opodatkowania, VAT, koszt obsługi.',
          'Powiatowy urząd pracy — dotacja na start dla osób bezrobotnych, szkolenia.',
          'Sanepid, inspekcje, samorząd — branże z wymaganiami (żywność, kosmetyki, przewóz osób).',
        ],
      },
      activities: [
        {
          type: 'multi',
          id: 'm2-stoisko',
          question: 'Ola chce sprzedawać domowe ciasta na sobotnim targu, ok. 4000 zł miesięcznie. Co musi sprawdzić przed startem?',
          options: [
            'Rejestrację firmy — przy tej kwocie przekroczy limit działalności nierejestrowanej',
            'Zgłoszenie do sanepidu i warunki produkcji żywności',
            'Zasady i opłaty targowiska',
            'Koncesję na sprzedaż ciast',
            'Kiedy będzie potrzebna kasa fiskalna',
          ],
          correct: [0, 1, 2, 4],
          explanation: 'Rejestracja, sanepid, targowisko i kasa (po przekroczeniu 20 000 zł sprzedaży osobom prywatnym w roku). Koncesji na ciasta nie ma.',
          hint: 'Jedna odpowiedź opisuje wymóg, który nie istnieje.',
        },
        text('m2-moja-branza', 'Jakie przepisy mogą dotyczyć Twojej branży lub pomysłu? Zapisz trzy, które sprawdzisz.', 'Na przykład: czy usługi kosmetyczne wymagają zgłoszenia do sanepidu; czy potrzebuję kasy fiskalnej od pierwszego dnia; czy muszę mieć regulamin sklepu internetowego.', { minLength: 20 }),
        {
          type: 'projectField',
          id: 'm2-pole-formalne',
          field: 'm2-5',
          label: 'Pytania formalne do sprawdzenia i termin konsultacji',
          example: '1) Ryczałt czy skala przy 6000 zł przychodu i 1500 zł kosztów miesięcznie? 2) Czy potrzebuję kasy od początku? 3) Kody PKD dla napraw i sprzedaży części. Konsultacja z księgową: 20 listopada.',
        },
      ],
    },
  ],
};
