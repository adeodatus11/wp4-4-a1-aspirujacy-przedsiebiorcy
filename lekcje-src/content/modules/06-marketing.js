import { choice, number, text } from '../schema.js';

export default {
  id: 'm6',
  n: 6,
  topic: 'Marketing i komunikacja',
  title: 'Dotrzyj do właściwych ludzi',
  subtitle: 'Od podstaw marketingu i modelu STP — segmentacja, wybór rynku, pozycjonowanie — przez miks promocyjny i kanały cyfrowe do dwutygodniowego testu z miernikiem sprzedaży.',
  duration: 177,
  outcome: 'Karta STP i plan dwutygodniowego testu komunikacji.',
  realia: ['zgodyMarketing', 'opinie', 'omnibus'],
  source: {
    file: '06_Modul_6_Marketing_STP.md',
    covers: [
      ['2. Marketing', 'podstawy'],
      ['3. Model STP', 'stp'],
      ['4. Segmentacja rynku', 'segmenty'],
      ['4. Segmentacja rynku', 'warunki'],
      ['5. Wybór rynku docelowego', 'strategie'],
      ['5. Wybór rynku docelowego', 'wybor'],
      ['6. Pozycjonowanie', 'pozycja'],
      ['6. Pozycjonowanie', 'wyrozniki'],
      ['7. Komunikacja marketingowa', 'komunikacja'],
      ['7. Komunikacja marketingowa', 'kanal'],
      ['8. Cyfrowa komunikacja', 'cyfrowe'],
    ],
  },
  objectives: [
    'Odróżniam potrzebę, pragnienie i popyt i opisuję ofertę jako propozycję wartości w ujęciu 7P.',
    'Wyjaśniam, dlaczego model STP zastąpił marketing masowy i jak wybór grupy zmienia cały marketing mix.',
    'Dzielę rynek na segmenty według czterech kategorii i sprawdzam każdy segment pięcioma warunkami.',
    'Wybieram strategię i grupę docelową na podstawie atrakcyjności, konkurencji, zdolności firmy i trwałości.',
    'Piszę pozycjonowanie w jednym zdaniu, wskazuję wyróżnik i obietnicę z dowodem.',
    'Dobieram narzędzia miksu promocyjnego i kanały cyfrowe zgodnie z zasadami zgód na kontakt.',
    'Planuję test, w którym zmieniam jedną rzecz, i ustalam próg decyzji przed startem.',
  ],
  forGroup:
    'Na spotkanie weź trzy segmenty sprawdzone pięcioma warunkami, pozycjonowanie w jednym zdaniu i plan testu. W grupie przeczytaj zdanie na głos — pozostałe osoby mówią, kogo widzą jako klienta i co mu obiecujesz. Jeśli odpowiedzi się rozjeżdżają, zdanie jest za ogólne. Plan testu sprawdźcie pod kątem jednej zmiany i progu zapisanego przed startem.',
  solo:
    'Bez grupy: pokaż swoje zdanie trzem osobom z wybranej grupy klientów i zapytaj, co z niego zrozumiały. Odpowiedz na piśmie na pytania refleksyjne z tej ścieżki i wróć do nich po teście. Test przeprowadź naprawdę — 14 dni z zeszytem: data, kontakt, reakcja, zamówienie. Po teście wpisz wynik w pole projektu i porównaj z progiem.',
  sections: [
    {
      id: 'podstawy',
      label: 'Pojęcia',
      title: 'Marketing zaczyna się od potrzeby, nie od reklamy',
      duration: 14,
      intro: 'Na początku XX wieku marketing oznaczał głównie techniki sprzedaży. Potem w centrum stanęło zrozumienie i zaspokojenie potrzeb klientów: firma trwa długo, jeśli dostarcza ludziom to, czego potrzebują i chcą.',
      reading: {
        paragraphs: [
          'Potrzeba to podstawowe ludzkie pragnienie (głód). Pragnienie to jej forma ukształtowana przez kulturę i otoczenie (świeża bułka z masłem na śniadanie). Popyt pojawia się, gdy za pragnieniem stoją pieniądze. Produktem jest nie tylko rzecz — także usługa, doświadczenie, idea. Propozycja wartości to cały pakiet, który klient dostaje w zamian za pieniądze. Klient porównuje wartości różnych ofert, a zadowolony jest wtedy, gdy to, czego się spodziewał, zgadza się z tym, co dostał.',
          'Marketing działa jak most: na zewnątrz łączy firmę z potrzebami klientów i partnerów, do wewnątrz porządkuje wykorzystanie zasobów firmy. Klasyczny model 4P (produkt, cena, miejsce, promocja) w usługach rozszerza się do 7P: dochodzą ludzie (personel i jego kompetencje), proces (jak przebiega obsługa) i otoczenie fizyczne (namacalne dowody jakości).',
          'Holistyczna propozycja wartości: osiedlowa kawiarnia sprzedaje nie tylko kawę, ale miłą obsługę, szybki internet i przyjemne miejsce — dlatego klienci wracają. Stacje paliw w Polsce od lat sprzedają też kawę, przekąski i świeże jedzenie: wartość wykracza poza sam produkt.',
        ],
        table: {
          head: ['7P', 'Koszyki śniadaniowe piekarni z Oławy'],
          rows: [
            ['Produkt', 'Koszyk dla 10 osób: pieczywo, masło, sery, wędlina, warzywa, dżem'],
            ['Cena', '45 zł, faktura z terminem 7 dni'],
            ['Miejsce', 'Dostawa do biura na 8:30'],
            ['Promocja', 'Wizyta w recepcji z próbką i kartką z ofertą'],
            ['Ludzie', 'Kierowca, który ustawi koszyk i zabierze opakowania'],
            ['Proces', 'Zamówienie telefonem do 14:00, SMS z potwierdzeniem'],
            ['Otoczenie fizyczne', 'Czysty kosz z logo, karteczka ze składem i datą wypieku'],
          ],
        },
      },
      activities: [
        {
          type: 'matching',
          id: 'm6-pojecia',
          question: 'Które pojęcie opisuje każde zdanie z życia piekarni?',
          options: ['Potrzeba', 'Pragnienie', 'Popyt', 'Satysfakcja'],
          rows: [
            { label: 'Biuro zamawia i płaci za 12 koszyków na wtorek', correct: 2 },
            { label: 'Ludzie na porannym spotkaniu są głodni', correct: 0 },
            { label: 'Koszyk dotarł o 8:25, pieczywo było ciepłe — tak, jak obiecano', correct: 3 },
            { label: 'Zespół chce na spotkaniu świeżych rogali i dobrej kawy', correct: 1 },
          ],
          explanation: 'Głód to potrzeba, rogale i kawa to pragnienie, zamówienie z płatnością to popyt, a zgodność obietnicy z tym, co przyjechało, daje satysfakcję.',
        },
        choice(
          'm6-7p',
          'Kierowca piekarni zostawia koszyki na podłodze w recepcji i odjeżdża bez słowa. Którego elementu 7P to dotyczy przede wszystkim?',
          ['Ceny', 'Ludzi i procesu obsługi', 'Produktu', 'Promocji'],
          1,
          'W usługach doświadczenie klienta tworzą ludzie i przebieg obsługi. Ten sam koszyk podany z uśmiechem i ustawiony na stole to inna wartość.',
          ['Cena się nie zmieniła — zmieniło się doświadczenie klienta.', null, 'Zawartość koszyka jest ta sama. Problem leży w obsłudze.', 'Promocja to komunikacja przed zakupem, a tu chodzi o samą dostawę.'],
        ),
        text('m6-wartosc', 'Co oznacza dla Ciebie „tworzenie wartości dla klienta” w codziennej pracy Twojej firmy lub pomysłu? Podaj jeden konkretny element spoza samego produktu (ludzie, proces, otoczenie).', 'Na przykład: klient dostaje koszyk na stole, a nie w recepcji, a kierowca zabiera puste kosze następnego dnia — nie trzeba o nic prosić.', { minLength: 25 }),
      ],
    },
    {
      id: 'stp',
      label: 'Od masy do STP',
      title: 'Właściwy komunikat do właściwej grupy we właściwy sposób',
      duration: 10,
      intro: 'Kiedyś firmy próbowały sprzedać wszystkim to samo. Gdy rosła konkurencja i różnicowały się potrzeby, opłacało się coraz bardziej dzielić rynek i mówić do każdej grupy osobno.',
      reading: {
        paragraphs: [
          'Model STP (Kotler i Keller) to trzy kroki. Segmentacja: dzielisz rynek na grupy o podobnych potrzebach i zachowaniach. Targetowanie: decydujesz, na których grupach skupisz pieniądze i czas. Pozycjonowanie: sprawiasz, że wybrana grupa widzi Twoją ofertę jako wyraźnie inną niż konkurencja. Przykład: operator telefonii ma osobne pakiety dla młodzieży, rodzin i firm — każdy z innym komunikatem.',
          'STP poprzedza marketing mix. Wybrana grupa i pozycjonowanie decydują o produkcie, cenie, kanałach i komunikacji. Dane i narzędzia AI pozwalają dziś na mikrosegmentację, ale mała firma zwykle zaczyna od jednej dobrze opisanej grupy.',
        ],
      },
      activities: [
        {
          type: 'multi',
          id: 'm6-mix-po-wyborze',
          question: 'Piekarnia wybrała jako grupę osoby organizujące spotkania w biurach. Co w marketing mix wynika z tego wyboru? Zaznacz wszystkie trafne zmiany.',
          options: [
            'Koszyk dla 10 osób zamiast pojedynczych bułek (produkt)',
            'Faktura z terminem płatności zamiast paragonu (cena i warunki)',
            'Nowy przepis na chleb żytni',
            'Dostawa na 8:30 do biura (miejsce)',
            'Wizyta w recepcji zamiast plakatu w oknie piekarni (promocja)',
          ],
          correct: [0, 1, 3, 4],
          explanation: 'Wybór grupy zmienia wszystkie cztery P: wielkość produktu, warunki płatności, miejsce dostawy i sposób dotarcia. Nowy przepis może być dobrym pomysłem, ale nie wynika z wyboru grupy.',
        },
        text('m6-od-zera', 'Gdyby Twoja firma zaczynała dziś od zera, czy rynek docelowy byłby ten sam? Odpowiedz zdaniem: „wybieram ten sam, bo…” albo „zmieniam na…, bo…”.', 'Na przykład: zmieniam z „wszyscy mieszkańcy” na biura do 20 osób, bo tam problem wraca co tydzień, a jedno zamówienie to 45 zł, a nie 4 zł.', { minLength: 25 }),
      ],
    },
    {
      id: 'segmenty',
      label: 'Segmenty',
      title: 'Cztery sposoby dzielenia rynku',
      duration: 14,
      intro: 'Piekarnia z Oławy, którą znasz z modułu 4, promuje się hasłem „pieczywo dla każdego”. Dla koszyków śniadaniowych to hasło nie działa: nikt nie czuje, że chodzi o niego.',
      reading: {
        paragraphs: [
          'Segmentacja dzieli niejednorodny rynek na grupy podobne pod względem potrzeb, preferencji i nawyków zakupowych. Bez niej zostaje marketing masowy: drogi i mało skuteczny. Cztery główne kategorie: demograficzna (wiek, dochód, wykształcenie), geograficzna (region, miasto, typ miejscowości), psychograficzna (styl życia, wartości) i behawioralna (nawyki zakupowe, lojalność, sposób użycia). Coraz częściej dochodzi technograficzna: jak ludzie korzystają z urządzeń cyfrowych.',
          'Najlepsze segmenty łączą kilka kategorii, ale zaczynają od potrzeby i zachowania: czego ludzie potrzebują, kiedy i jak dziś sobie radzą. Wiek i adres pomagają tych ludzi znaleźć, ale nie mówią, dlaczego mieliby kupić.',
        ],
      },
      activities: [
        {
          type: 'matching',
          id: 'm6-kategorie',
          question: 'Do której kategorii segmentacji należy każdy opis klientów piekarni?',
          options: ['Demograficzna', 'Geograficzna', 'Psychograficzna', 'Behawioralna', 'Technograficzna'],
          rows: [
            { label: 'Osoby, które zamawiają wyłącznie przez aplikację w telefonie', correct: 4 },
            { label: 'Emeryci z dochodem do 3000 zł', correct: 0 },
            { label: 'Klienci, którzy kupują codziennie o 7:00 w drodze do pracy', correct: 3 },
            { label: 'Mieszkańcy Oławy i wsi w promieniu 10 km', correct: 1 },
            { label: 'Osoby, które świadomie wybierają chleb na zakwasie i czytają składy', correct: 2 },
          ],
          explanation: 'Dochód i wiek to demografia, miejsce — geografia, wartości i styl życia — psychografia, nawyki zakupowe — zachowanie, korzystanie z aplikacji — technografia.',
        },
        choice(
          'm6-segment',
          'Który opis to segment, do którego da się napisać komunikat?',
          [
            'Kobiety 25–45 lat z Oławy',
            'Wszyscy mieszkańcy, bo każdy je pieczywo',
            'Firmy',
            'Osoby, które raz w tygodniu organizują spotkanie w biurze i rano kupują wszystkim śniadanie',
          ],
          3,
          'Potrzeba (śniadanie dla grupy), sytuacja (spotkanie raz w tygodniu) i zachowanie (rano robią zakupy). Do tej osoby wiesz, co powiedzieć.',
          [
            'Demografia. Nie mówi, czego te osoby potrzebują ani kiedy kupują.',
            'Za szeroko. Komunikat do wszystkich nie trafia do nikogo.',
            'Zbyt ogólnie: zakład z kantyną i biuro rachunkowe mają zupełnie inne potrzeby.',
            null,
          ],
        ),
        {
          type: 'projectField',
          id: 'm6-pole-segmenty',
          field: 'm6-0',
          label: 'Segment: potrzeba, sytuacja, zachowanie',
          prompt: 'Rozpisz trzy segmenty — każdy w jednym, dwóch zdaniach.',
          example: '1) Osoby organizujące spotkania w biurach do 20 osób: raz w tygodniu lub miesiącu kupują śniadanie, dziś jeżdżą rano do marketu. 2) Pensjonaty w okolicy: codziennie potrzebują pieczywa przed 7:00. 3) Rodzice organizujący urodziny dzieci: kilka razy w roku, w weekend.',
        },
      ],
    },
    {
      id: 'warunki',
      label: 'Pięć warunków',
      title: 'Czy Twój segment przejdzie pięć testów',
      duration: 12,
      intro: 'Segment może brzmieć elegancko, a mimo to nie nadawać się do pracy: nie da się go policzyć, nie stać Cię na dotarcie do niego albo jest za mały.',
      reading: {
        paragraphs: [
          'Pięć warunków skutecznej segmentacji. Mierzalność: wielkość i siłę nabywczą segmentu da się policzyć. Dostępność: dotrzesz do niego kanałami, na które Cię stać. Wymagana wielkość: jest dość duży, żeby obsługa się opłacała. Odrębność: jego potrzeby różnią się od innych grup. Orientacja na działanie: wiesz, jaki konkretny program marketingowy z tego wynika.',
          'Każdy segment przepuść przez wszystkie pięć pytań. Wystarczy jedno „nie”, żeby segment wymagał poprawki — zwykle zawężenia albo dopisania zachowania.',
        ],
      },
      activities: [
        {
          type: 'matching',
          id: 'm6-warunki',
          question: 'Który warunek segmentacji nie jest spełniony w każdym pomyśle piekarni?',
          options: ['Mierzalność', 'Dostępność', 'Wymagana wielkość', 'Odrębność', 'Orientacja na działanie'],
          rows: [
            { label: 'Duże korporacje w Warszawie — piekarnia ma jedno auto i jest 350 km dalej', correct: 1 },
            { label: 'Osoby, które „lubią dobre jedzenie” — nie wiadomo, ile ich jest ani gdzie są', correct: 0 },
            { label: 'Trzy biura w jednym budynku przy rynku', correct: 2 },
            { label: 'Biura i szkoły jako jedna grupa, choć szkoły zamawiają raz w roku na festyn, a biura co tydzień', correct: 3 },
            { label: 'Klienci 30–40 lat — tylko że nie wiadomo, co im zaproponować inaczej niż reszcie', correct: 4 },
          ],
          explanation: 'Każdy pomysł odpada na innym pytaniu. Dlatego sprawdzasz wszystkie pięć, a nie tylko to, które przychodzi do głowy.',
        },
        number('m6-wielkosc', 'Przyjmij (dane fikcyjne), że w Oławie i okolicy działa około 120 biur zatrudniających 5–20 osób. Jeśli co czwarte organizuje spotkanie ze śniadaniem raz w tygodniu, ile koszyków tygodniowo to potencjalnie oznacza? (Przyjmij jeden koszyk na spotkanie.)', 30, '120 ÷ 4 = 30 biur, każde raz w tygodniu — 30 koszyków. Przy 45 zł to 1350 zł tygodniowo: segment jest mierzalny i wystarczająco duży na start.', {
          unit: 'koszyków',
          tolerance: 0,
          mistakes: [{ value: 480, text: 'Tu pomnożono 120 przez 4. Co czwarte biuro to 120 podzielone przez 4.' }],
        }),
      ],
    },
    {
      id: 'strategie',
      label: 'Strategie',
      title: 'Wszyscy, kilka grup czy jedna nisza',
      duration: 10,
      intro: 'Po segmentacji przychodzi decyzja: firma nie próbuje zadowolić wszystkich, tylko skupia zasoby tam, gdzie może mieć przewagę.',
      reading: {
        paragraphs: [
          'Trzy strategie podstawowe. Marketing niezróżnicowany: jedna oferta dla całego rynku — działa przy produktach standardowych, jak podstawowa żywność, ale rzadko na długo. Marketing zróżnicowany: osobna oferta dla kilku segmentów, jak producent samochodów z modelami dla młodych, rodzin i klientów premium. Marketing skoncentrowany, czyli niszowy: jeden segment i wyraźna pozycja w nim — najczęstszy wybór małych firm bez dużych zasobów.',
          'Rośnie też znaczenie mikromarketingu: oferty dopasowane do lokalnej społeczności, a nawet do jednego klienta. To naturalne pole dla małej lokalnej firmy, która zna swoich klientów z imienia. Wybór niszy łączy się z koncepcją jeża z modułu 2: w czym możesz być najlepszy i gdzie skupić siły.',
        ],
      },
      activities: [
        {
          type: 'matching',
          id: 'm6-strategie',
          question: 'Jaką strategię stosuje każda firma?',
          options: ['Niezróżnicowana', 'Zróżnicowana', 'Skoncentrowana (nisza)'],
          rows: [
            { label: 'Pracownia tortów robi tylko torty bezglutenowe na zamówienie dla osób z celiakią', correct: 2 },
            { label: 'Duży młyn sprzedaje jedną mąkę typ 450 we wszystkich sklepach', correct: 0 },
            { label: 'Piekarnia ma osobną ofertę dla biur, pensjonatów i klientów sklepu', correct: 1 },
            { label: 'Kawiarnia przy uczelni ma ofertę tylko dla studentów w sesji', correct: 2 },
          ],
          explanation: 'Jedna oferta dla wszystkich, kilka ofert dla kilku grup albo jedna grupa i pełne skupienie na niej.',
        },
        choice(
          'm6-strategia-start',
          'Piekarnia ma jedno auto, dwie osoby w produkcji i chce zacząć koszyki. Którą strategię wybrać na start?',
          [
            'Zróżnicowaną: od razu biura, pensjonaty, urodziny i catering weselny',
            'Niezróżnicowaną: jedna ulotka o koszykach do wszystkich skrzynek w mieście',
            'Skoncentrowaną: jedna grupa, jeden koszyk, dopracowana obsługa',
          ],
          2,
          'Przy małych zasobach jedna dobrze obsłużona grupa daje więcej niż cztery obsłużone byle jak. Kolejne segmenty można dodawać, gdy pierwszy działa.',
          ['Cztery oferty to cztery procesy, ceny i komunikaty naraz — za dużo na dwie osoby i jedno auto.', 'Ulotka do wszystkich to marketing masowy: drogi, a koszyk interesuje mały ułamek odbiorców.', null],
        ),
      ],
    },
    {
      id: 'wybor',
      label: 'Wybór grupy',
      title: 'Który segment wybrać na początek',
      duration: 14,
      intro: 'Najbardziej kusi segment z największym problemem. Ale wybierasz taki, który jest atrakcyjny i który obsłużysz dobrze już teraz.',
      reading: {
        paragraphs: [
          'Cztery czynniki wyboru rynku docelowego. Atrakcyjność segmentu: wielkość, wzrost, rentowność, pilność problemu. Sytuacja konkurencyjna: ilu jest konkurentów i jak są silni — im słabsza konkurencja, tym wyższa ocena. Zdolności firmy: czy masz ludzi, czas, sprzęt i umiejętności, żeby dotrzymać obietnicy. Trwałość: czy segment będzie istniał za kilka lat i pasuje do celów firmy.',
          'Oceń każdy segment w skali 1–5. Najniższa ocena często jest ważniejsza niż suma. Segment atrakcyjny, którego nie obsłużysz, przyniesie skargi zamiast stałych klientów.',
        ],
      },
      activities: [
        {
          type: 'docForm',
          id: 'm6-ocena-segmentow',
          title: 'Ocena trzech segmentów',
          points: 3,
          doc: {
            title: 'Piekarnia — wybór grupy na koszyki',
            table: {
              head: ['Segment', 'Atrakcyjność', 'Konkurencja', 'Zdolności firmy', 'Trwałość', 'Razem'],
              rows: [
                ['Biura do 20 osób', '4', '4', '5', '4', { f: 'r1' }],
                ['Pensjonaty w okolicy', '5', '3', '2', '3', { f: 'r2' }],
                ['Urodziny dzieci', '2', '3', '3', '2', { f: 'r3' }],
              ],
            },
            footer: 'Pensjonaty potrzebują dostaw codziennie przed 7:00, w kilku miejscowościach. Piekarnia ma jedno auto.',
          },
          fields: {
            r1: { label: 'Biura — razem', answer: 17, hint: 'Dodaj cztery oceny w wierszu.' },
            r2: { label: 'Pensjonaty — razem', answer: 13, hint: 'Dodaj cztery oceny w wierszu.' },
            r3: { label: 'Urodziny — razem', answer: 10, hint: 'Dodaj cztery oceny w wierszu.' },
          },
          explanation: 'Biura 17, pensjonaty 13, urodziny 10. Biura wygrywają nie najwyższą atrakcyjnością, ale tym, że żadna ocena nie jest niska.',
        },
        choice(
          'm6-pensjonaty',
          'Pensjonaty to najbardziej atrakcyjny segment (5). Dlaczego piekarnia mimo to zaczyna od biur?',
          [
            'Bo atrakcyjność segmentu nie ma znaczenia',
            'Bo biura na pewno zapłacą więcej',
            'Bo dostaw codziennie przed 7:00 w kilku miejscowościach nie obsłuży jednym autem — obietnica byłaby bez pokrycia',
          ],
          2,
          'Zdolności firmy na poziomie 2 oznaczają, że pierwsze spóźnienia zniszczyłyby opinię. Pensjonaty mogą wrócić, gdy piekarnia będzie miała drugie auto.',
          ['Ma duże znaczenie — ale nie wystarczy, gdy nie możesz dotrzymać obietnicy.', 'W tabeli nie ma nic o cenie. To założenie, nie powód.', null],
        ),
        {
          type: 'projectField',
          id: 'm6-pole-wybor',
          field: 'm6-1',
          label: 'Wybrana grupa i powód wyboru',
          example: 'Biura do 20 osób: 17 z 20 punktów. Problem wraca co tydzień, konkurencja to market i drogi catering z Wrocławia, dostawę na 8:30 obsłużymy jednym autem. Strategia skoncentrowana. Pensjonaty odkładamy: nie mamy ludzi na dostawy przed 7:00.',
        },
      ],
    },
    {
      id: 'pozycja',
      label: 'Pozycjonowanie',
      title: 'Dlaczego mają wybrać Ciebie — w jednym zdaniu',
      duration: 12,
      intro: 'Segmentacja i wybór grupy dzieją się w Twojej analizie. Pozycjonowanie dzieje się w głowie klienta: to obraz, który zostaje, gdy myśli o Twojej ofercie.',
      reading: {
        paragraphs: [
          'Pozycjonowanie ma wyjaśnić klientowi trzy rzeczy: jaką potrzebę zaspokajasz, czym różnisz się od konkurencji i dlaczego warto Cię wybrać. Marka nie może być „wszystkim dla wszystkich”. Prosty wzór: dla [kogo], w [jakiej sytuacji], [co dostają], w przeciwieństwie do [obecnej alternatywy]. Alternatywą jest to, co klient robi dziś — w przypadku biur: zakupy w markecie albo drogi catering z Wrocławia.',
          'Sprawdzian: przeczytaj zdanie komuś z wybranej grupy. Jeśli powie „to o mnie” i powtórzy korzyść własnymi słowami — działa.',
        ],
      },
      activities: [
        choice(
          'm6-pozycjonowanie',
          'Które zdanie to pozycjonowanie, z którego da się zrobić komunikat?',
          [
            'Dla osób organizujących spotkania w małych biurach w Oławie: śniadanie na stole o 8:30, zamówione jednym telefonem dzień wcześniej — bez porannych zakupów w markecie',
            'Piekarnia z Oławy — pieczywo dla każdego, z pasją od 1998 roku',
            'Najlepsze koszyki śniadaniowe na Dolnym Śląsku',
            'Taniej niż catering z Wrocławia',
          ],
          0,
          'Jest odbiorca, sytuacja, korzyść i alternatywa. Każde słowo da się sprawdzić.',
          [
            null,
            'Nie ma odbiorcy, sytuacji ani korzyści. Tradycja to miły dodatek, nie powód zakupu koszyka.',
            'Ogólnik, którego nie da się udowodnić, bez odbiorcy i sytuacji.',
            'Sama cena to słabe wyróżnienie: wystarczy, że ktoś obniży swoją.',
          ],
        ),
        {
          type: 'projectField',
          id: 'm6-pole-pozycjonowanie',
          field: 'm6-2',
          label: 'Pozycjonowanie w jednym zdaniu',
          example: 'Dla osób organizujących spotkania w małych biurach w Oławie: śniadanie na stole o 8:30, zamówione jednym telefonem dzień wcześniej — bez porannych zakupów i zgadywania, ile kupić.',
        },
      ],
    },
    {
      id: 'wyrozniki',
      label: 'Wyróżniki',
      title: 'Pięć wymiarów, pięć wyróżników i typowe błędy',
      duration: 12,
      intro: 'Pozycję można budować na różnych osiach. Warto wiedzieć, na której stoisz, żeby wszystkie komunikaty ciągnęły w tę samą stronę.',
      reading: {
        paragraphs: [
          'Pięć wymiarów pozycjonowania: cechy i korzyści produktu (pasta „wybiela” albo „chroni dziąsła”), sytuacja użycia („na trening”), kategoria klienta („dla rodzin”), porównanie z konkurencją (młodsza alternatywa dla lidera) oraz relacja ceny do jakości (tani przewoźnik albo marka premium). Ceramika z Bolesławca jest przykładem pozycji opartej na rzemiośle i regionie.',
          'Pięć źródeł różnicowania: produkt (jakość, wygląd, funkcje), usługa (szybkość, niezawodność, opieka), kanał (nietypowy sposób sprzedaży lub dostawy), ludzie (kompetentny, życzliwy personel) i wizerunek marki (symbole, historia, wartości). Pozycję można narysować na mapie percepcji: dwie osie, np. cena i wygoda, i kropki dla Ciebie i konkurentów.',
          'Błędy pozycjonowania: zbyt niejasne (klient nie wie, o co chodzi), zbyt wąskie (odstraszasz ludzi, którzy by kupili), zbyt szerokie (nikt nie czuje, że to dla niego), sprzeczne (komunikaty mówią co innego).',
        ],
      },
      activities: [
        {
          type: 'matching',
          id: 'm6-wymiary',
          question: 'Na którym wymiarze pozycjonowania opiera się każde hasło?',
          options: ['Cechy i korzyści produktu', 'Sytuacja użycia', 'Kategoria klienta', 'Porównanie z konkurencją', 'Cena i jakość'],
          rows: [
            { label: '„Śniadanie na poranne spotkanie zespołu”', correct: 1 },
            { label: '„Chleb na zakwasie bez polepszaczy”', correct: 0 },
            { label: '„Dla małych biur”', correct: 2 },
            { label: '„Taniej i bliżej niż catering z Wrocławia”', correct: 3 },
            { label: '„Droższe niż w markecie, bo pieczone tej nocy”', correct: 4 },
          ],
          explanation: 'Jedna oferta może mówić na różnych osiach. Wybierz jedną główną, a pozostałe niech ją wspierają.',
        },
        {
          type: 'matching',
          id: 'm6-bledy',
          question: 'Jaki błąd pozycjonowania ma każde hasło?',
          options: ['Zbyt niejasne', 'Zbyt wąskie', 'Zbyt szerokie', 'Sprzeczne'],
          rows: [
            { label: '„Koszyki dla każdego, na każdą okazję, w każdym mieście”', correct: 2 },
            { label: 'Ulotka „luksusowe śniadania premium”, a w środku „najtaniej w Oławie”', correct: 3 },
            { label: '„Śniadania tylko dla biur rachunkowych na parterze”', correct: 1 },
            { label: '„Inaczej. Po naszemu. Smacznie.”', correct: 0 },
          ],
          explanation: 'Za ogólnie i za wąsko odcinają klientów z dwóch stron, niejasność ich gubi, a sprzeczność odbiera wiarygodność.',
        },
        text('m6-wyroznik', 'Czym Twoja oferta różni się od oferty największego konkurenta lub od tego, co klient robi dziś? Który z pięciu wyróżników (produkt, usługa, kanał, ludzie, wizerunek) jest u Ciebie najmocniejszy?', 'Na przykład: wyróżnik usługowy — koszyk na stole o 8:30 i zamówienie jednym telefonem; catering z Wrocławia wymaga zamówienia dwa dni wcześniej.', { minLength: 25 }),
      ],
    },
    {
      id: 'dowod',
      label: 'Obietnica',
      title: 'Obietnica, za którą stoi dowód',
      duration: 12,
      intro: 'Każdy pisze „najwyższa jakość”. Klient wierzy temu, co może sprawdzić.',
      reading: {
        paragraphs: [
          'Dowodem jest konkret: liczba („24 z 24 koszyków dowiezione przed 8:30”), próbka do spróbowania, odległość („5 minut od Twojego biura”), prawdziwa opinia z imieniem i datą. Zamieniaj przymiotniki na fakty.',
          'Opinie muszą pochodzić od prawdziwych klientów, a firma informuje, jak je sprawdza. Przy promocji podajesz najniższą cenę z 30 dni przed obniżką. To nie formalność — UOKiK nakłada za to kary także na małe firmy.',
        ],
      },
      activities: [
        {
          type: 'spotErrors',
          id: 'm6-ulotka',
          title: 'Kartka z ofertą, którą piekarnia chce zostawiać w biurach',
          context: 'Zaznacz zdania, które obiecują bez dowodu albo łamią zasady.',
          lines: [
            { text: 'Najlepsze pieczywo w Oławie!', error: 'Ogólnik bez dowodu. Zamiast tego: „Pieczemy w nocy, 5 minut od Twojego biura”.' },
            { text: 'Koszyk dla 10 osób: pieczywo, masło, sery, wędlina, warzywa i dżem — 45 zł.' },
            { text: 'Na stole o 8:30, zamówienie do 14:00 dnia wcześniej.' },
            { text: '★★★★★ „Rewelacja!” — opinie napisane przez rodzinę na dobry początek.', error: 'Opinie nie od klientów. To zakazana praktyka. Pokaż prawdziwe opinie i napisz, jak je sprawdzasz.' },
            { text: '−30% na pierwszy koszyk: 31,50 zł (najniższa cena z ostatnich 30 dni: 45 zł).' },
            { text: 'Gwarantujemy, że wszystkim będzie smakować.', error: 'Obietnica, której nie da się dotrzymać ani sprawdzić. Lepiej: „Jeśli coś nie będzie świeże, wymienimy przy następnej dostawie”.' },
          ],
          explanation: 'Trzy poprawki: fakt zamiast ogólnika, prawdziwe opinie, gwarancja, którą da się spełnić. Informacja o obniżce jest zapisana poprawnie.',
        },
        {
          type: 'projectField',
          id: 'm6-pole-obietnica',
          field: 'm6-3',
          label: 'Obietnica i dowód, który mogę pokazać',
          example: 'Obietnica: koszyk na stole o 8:30. Dowody: piekarnia 5 minut od biur, próbka do spróbowania, 3 opinie prawdziwych klientów z datą zamówienia, od lipca 24 z 24 koszyków dowiezione przed 8:30.',
        },
      ],
    },
    {
      id: 'komunikacja',
      label: 'Komunikacja',
      title: 'Komunikacja to rozmowa, nie ogłoszenie',
      duration: 12,
      intro: 'Komunikacja marketingowa przedstawia propozycję wartości, buduje markę i pomaga podjąć decyzję o zakupie. Działa w dwie strony: firma mówi, klienci odpowiadają.',
      reading: {
        paragraphs: [
          'Proces komunikacji ma cztery wymiary. Kodowanie: jak formułujesz komunikat. Kanał: którędy go wysyłasz (rozmowa, ulotka, media społecznościowe). Dekodowanie: jak klient go rozumie — nie zawsze tak, jak chcesz. Sprzężenie zwrotne: reakcja klienta, czyli pytanie, zakup, opinia albo cisza.',
          'Miks promocyjny według Belch i Belch: reklama (płatna komunikacja przez media), sprzedaż osobista (bezpośrednia rozmowa z kupującym), promocja sprzedaży (krótkie zachęty: kupon, oferta na start), PR i sponsoring (reputacja i wizerunek w otoczeniu) oraz komunikacja cyfrowa. Dobra komunikacja zwiększa rozpoznawalność, wspiera decyzję o zakupie, buduje lojalność i wizerunek. Przykładem budowania zaufania jest znak „Produkt polski” na opakowaniach żywności.',
        ],
      },
      activities: [
        {
          type: 'matching',
          id: 'm6-proces',
          question: 'Który wymiar procesu komunikacji widać w każdej sytuacji z kampanii piekarni?',
          options: ['Kodowanie', 'Kanał', 'Dekodowanie', 'Sprzężenie zwrotne'],
          rows: [
            { label: 'Recepcjonistka myśli, że „koszyk” to kosz prezentowy na święta', correct: 2 },
            { label: 'Właścicielka wybiera zdanie „na stole o 8:30” zamiast „świeże pieczywo”', correct: 0 },
            { label: 'Biuro dzwoni z pytaniem, czy koszyk może być bez wędliny', correct: 3 },
            { label: 'Oferta trafia do biur przez osobistą wizytę z próbką', correct: 1 },
          ],
          explanation: 'Gdy klient źle zrozumie komunikat (dekodowanie), poprawiasz kodowanie: „śniadanie dla zespołu w koszu” mówi więcej niż sam „koszyk”.',
        },
        {
          type: 'matching',
          id: 'm6-miks',
          question: 'Które narzędzie miksu promocyjnego to każde działanie piekarni?',
          options: ['Reklama', 'Sprzedaż osobista', 'Promocja sprzedaży', 'PR i sponsoring', 'Komunikacja cyfrowa'],
          rows: [
            { label: 'Koszyki na lokalny bieg charytatywny z logo piekarni', correct: 3 },
            { label: '−30% na pierwszy koszyk dla nowego biura', correct: 2 },
            { label: 'Płatne ogłoszenie w lokalnym tygodniku', correct: 0 },
            { label: 'Rozmowa z recepcjonistką i próbka do spróbowania', correct: 1 },
            { label: 'Wpis na profilu piekarni ze zdjęciem koszyka', correct: 4 },
          ],
          explanation: 'Mała firma nie musi używać wszystkich pięciu narzędzi. W segmencie biur najmocniejsza jest sprzedaż osobista, wspierana jedną promocją na start.',
        },
        text('m6-zaufanie', 'Jak włączasz informację zwrotną od klientów do swojej komunikacji? Opisz jedną reakcję klienta, która zmieniła (albo mogłaby zmienić) to, co mówisz o ofercie.', 'Na przykład: dwa biura pytały o koszyk bez mięsa, więc na kartce dopisaliśmy wariant wegetariański — teraz to pierwsze pytanie, które zadajemy w recepcji.', { minLength: 25 }),
      ],
    },
    {
      id: 'kanal',
      label: 'Kanał',
      title: 'Kanał, który dociera do tej jednej osoby',
      duration: 14,
      intro: 'W biurze o śniadaniu decyduje zwykle jedna osoba: recepcja, asystentka zarządu, kierownik. Kanał wybierasz pod nią, nie pod „zasięg”.',
      reading: {
        paragraphs: [
          'Post w mediach społecznościowych zobaczy wiele osób, ale rzadko tę, która zamawia śniadania. Osobista wizyta z próbką trwa dłużej, za to trafia prosto do decydującej osoby i daje rozmowę — to sprzedaż osobista z miksu promocyjnego.',
          'Uwaga na zgody: na ofertę wysłaną e-mailem lub SMS-em i na telefon z ofertą potrzebujesz wcześniejszej zgody odbiorcy — także firmy. Adres e-mail biura na jego stronie nie jest zgodą. Wizyta osobista i kartka zostawiona w recepcji takiej zgody nie wymagają.',
        ],
      },
      activities: [
        {
          type: 'multi',
          id: 'm6-zgody',
          question: 'Które działania wymagają wcześniejszej zgody odbiorcy?',
          options: [
            'Osobista wizyta w recepcji z próbką',
            'Oferta wysłana e-mailem na adres biura ze strony internetowej',
            'Kartka z ofertą zostawiona w recepcji',
            'SMS z promocją na numer z wizytówki',
            'Telefon do biura z ofertą koszyków',
          ],
          correct: [1, 3, 4],
          explanation: 'E-mail, SMS i telefon z ofertą wymagają zgody wyrażonej wcześniej. Dlatego piekarnia zaczyna od wizyt i podczas rozmowy prosi o zgodę na kontakt.',
          hint: 'Zastanów się, które działania korzystają z telefonu albo poczty elektronicznej.',
        },
        {
          type: 'dialog',
          id: 'm6-wizyta',
          title: 'Wizyta w biurze rachunkowym',
          context: 'Biuro rachunkowe, 15 osób, dwie ulice od piekarni. Masz ze sobą próbkę i kartkę z ofertą.',
          start: 'n1',
          nodes: {
            n1: {
              speaker: 'Pani Beata, recepcja',
              text: 'Dzień dobry, w czym mogę pomóc?',
              choices: [
                { text: 'Dzień dobry, jestem z piekarni przy Rynku. Kto u Państwa zajmuje się śniadaniami na spotkania?', next: 'n2', good: true, feedback: 'Krótko i od razu do osoby, która ma problem.' },
                { text: 'Mamy najlepsze pieczywo w Oławie, chcieliby Państwo spróbować?', next: 'n2', good: false, feedback: 'Ogólnik o produkcie. Recepcja nie wie, po co ma Cię słuchać.' },
                { text: 'Czy mogę zostawić ulotki dla wszystkich pracowników?', next: 'n2', good: false, feedback: 'Ulotka dla wszystkich nie trafia do nikogo. Szukasz osoby, która organizuje spotkania.' },
              ],
            },
            n2: {
              speaker: 'Pani Beata, recepcja',
              text: 'Ja. Raz w miesiącu mamy szkolenie dla klientów i rano jeżdżę do marketu.',
              choices: [
                { text: 'To nasze koszyki rozwiążą wszystkie Pani kłopoty!', next: 'n3', good: false, feedback: 'Obietnica, zanim wiesz, jaki to kłopot. Najpierw zapytaj.' },
                { text: 'Ile osób bywa na szkoleniu i co w tych zakupach jest najbardziej kłopotliwe?', next: 'n3', good: true, feedback: 'Pytasz o liczby i o problem — z odpowiedzi dobierzesz koszyk i argument.' },
              ],
            },
            n3: {
              speaker: 'Pani Beata, recepcja',
              text: 'Około dwunastu. Najgorzej, że nigdy nie wiem, ile kupić, i przez to spóźniam się do pracy.',
              choices: [
                { text: 'Dopiszę Panią do naszej listy SMS z promocjami.', next: 'end', good: false, feedback: 'Bez wcześniejszej zgody nie wolno wysyłać ofert SMS-em. Zapytaj o zgodę wprost.' },
                { text: 'Mamy koszyk na 10–12 osób, na stole o 8:30, 45 zł. Zostawię próbkę i kartkę. Czy mogę zadzwonić przed następnym szkoleniem z pytaniem o zamówienie?', next: 'end', good: true, feedback: 'Odpowiedź na jej problem, dowód w ręku i prośba o zgodę na kontakt — wszystko w jednym zdaniu.' },
              ],
            },
            end: { end: true, text: 'Pani Beata zgadza się na telefon 10. dnia miesiąca. W zeszycie testu: biuro rachunkowe, 12 osób, szkolenie raz w miesiącu, zgoda na kontakt.' },
          },
        },
      ],
    },
    {
      id: 'cyfrowe',
      label: 'Kanały cyfrowe',
      title: 'Komunikacja cyfrowa: dialog, dane i opinie',
      duration: 12,
      intro: 'Internet i telefon w kieszeni zmieniły komunikację z jednokierunkowej w rozmowę. Dla małej firmy to szansa, ale też ryzyko rozproszenia się na zbyt wiele kanałów.',
      reading: {
        paragraphs: [
          'Cztery różnice względem kanałów tradycyjnych (Kotler i in.): interaktywność (klienci komentują i udostępniają), personalizacja (dane z CRM, plików cookies, AI pozwalają dopasować przekaz), mierzalność w czasie rzeczywistym (od razu widzisz kliknięcia i zamówienia) oraz wpływ społeczny (opinie, recenzje, polecenia).',
          'Kanały cyfrowe według Chaffeya i Ellis-Chadwick: media społecznościowe, marketing w wyszukiwarkach (SEO i płatne reklamy), e-mail marketing, content marketing (poradniki, wideo, podcasty), influencer marketing i reklama programatyczna kupowana automatycznie. Dwa podstawowe wskaźniki: CTR, czyli odsetek osób, które kliknęły po zobaczeniu reklamy, i konwersja, czyli odsetek tych, które zrobiły to, o co chodziło — np. zamówiły.',
        ],
      },
      activities: [
        number('m6-ctr', 'Reklama koszyków w wyszukiwarce wyświetliła się 2000 razy, a kliknęło w nią 30 osób. Ile wynosi CTR w procentach?', 1.5, '30 ÷ 2000 × 100 = 1,5%.', {
          unit: '%',
          tolerance: 0.01,
          mistakes: [{ value: 0.015, text: 'To wynik jako ułamek. Pomnóż przez 100, żeby dostać procent.' }],
        }),
        number('m6-konwersja', 'Z 30 osób, które kliknęły, 3 zamówiły koszyk. Ile wynosi konwersja w procentach?', 10, '3 ÷ 30 × 100 = 10%. Liczysz od kliknięć, nie od wyświetleń.', {
          unit: '%',
          tolerance: 0.01,
          mistakes: [{ value: 0.15, text: 'Tu podzielono przez 2000 wyświetleń. Konwersję liczysz od osób, które kliknęły.' }],
        }),
        choice(
          'm6-kanal-cyfrowy',
          'Który kanał cyfrowy najlepiej wspiera wizyty w biurach, przy zasadach zgód na kontakt?',
          [
            'Mailing z ofertą do wszystkich biur z bazy kupionej w internecie',
            'Wizytówka firmy w mapach i wyszukiwarce z opiniami klientów i godzinami zamówień — tam trafia ktoś, kto szuka „śniadanie do biura Oława”',
            'Reklama programatyczna na portalach ogólnopolskich',
            'Współpraca z influencerem kulinarnym z Warszawy',
          ],
          1,
          'Ktoś, kto sam szuka, ma już problem. Widoczność w lokalnym wyszukiwaniu i prawdziwe opinie wspierają to, co mówisz w recepcji.',
          [
            'Bez wcześniejszej zgody nie wolno wysyłać ofert e-mailem — także do firm. Kupiona baza tego nie zmienia.',
            null,
            'Szeroki zasięg, mało osób z Oławy, które zamawiają śniadania do biura.',
            'Zasięg w niewłaściwym mieście i wśród niewłaściwych osób.',
          ],
        ),
        text('m6-pomiar-cyfrowy', 'Które kanały cyfrowe przynoszą Ci dziś (albo mogą przynieść) najwięcej zamówień i jak często sprawdzasz ich wynik — nie zasięg, tylko zapytania i zamówienia?', 'Na przykład: wizytówka w mapach daje ok. 2 telefony tygodniowo; sprawdzam w poniedziałki, ile z nich skończyło się zamówieniem. Profil na Instagramie daje polubienia, ale zamówień z niego nie widzę.', { minLength: 25 }),
      ],
    },
    {
      id: 'test',
      label: 'Test 14 dni',
      title: 'Test, w którym zmieniasz jedną rzecz',
      duration: 15,
      intro: 'Piekarnia ma dwa pomysły na zdanie na kartce. Zamiast się kłócić, który lepszy, sprawdza oba przez dwa tygodnie.',
      reading: {
        paragraphs: [
          'Test ma sens, gdy porównujesz podobne grupy i zmieniasz jedną rzecz: komunikat albo cenę, albo kanał. Gdy zmienisz wszystko naraz, nie dowiesz się, co zadziałało.',
          'Zapisz przed startem: kanał, oba komunikaty, budżet, daty i próg decyzji. Przy małych liczbach (po 10 biur) różnica jednego, dwóch zamówień może być przypadkiem — traktuj ją jako sygnał, nie dowód.',
        ],
      },
      activities: [
        choice(
          'm6-projekt-testu',
          'Który test pokaże, które zdanie na kartce działa lepiej?',
          [
            'Tydzień 1: zdanie A na Facebooku do wszystkich; tydzień 2: zdanie B z rabatem w wizytach w biurach',
            '20 podobnych biur losowo na dwie grupy po 10; ta sama próbka i cena, różni się tylko zdanie: „bez porannych zakupów” albo „na stole o 8:30”',
            'Zdanie A do biur, zdanie B do pensjonatów',
          ],
          1,
          'Ta sama grupa, ten sam kanał i cena — różnica w wynikach może wynikać tylko ze zdania.',
          ['Zmieniają się kanał, odbiorcy i cena naraz. Nie wiadomo, co zadziałało.', null, 'Różne segmenty — nie wiadomo, czy zadziałało zdanie, czy grupa.'],
        ),
        number('m6-budzet', 'Piekarnia odwiedza 20 biur. Każde dostaje próbkę (koszt 8 zł) i kartkę z ofertą (0,50 zł). Paliwo na objazd kosztuje 25 zł. Ile kosztuje test?', 195, '20 × (8 + 0,50) = 170 zł, plus 25 zł paliwa = 195 zł.', {
          unit: 'zł',
          tolerance: 0,
          mistakes: [
            { value: 170, text: 'Brakuje paliwa na objazd — to też koszt testu.' },
            { value: 33.5, text: 'Próbkę i kartkę trzeba pomnożyć przez 20 biur.' },
          ],
        }),
        {
          type: 'projectField',
          id: 'm6-pole-test',
          field: 'm6-4',
          label: 'Kanał, komunikat, budżet i harmonogram testu',
          example: 'Kanał: osobista wizyta w recepcji z próbką. Zdanie A: „bez porannych zakupów”, zdanie B: „na stole o 8:30”, po 10 biur. Budżet: 195 zł. Termin: 3–16 marca. Telefon tylko do biur, które się zgodziły.',
        },
      ],
    },
    {
      id: 'miernik',
      label: 'Miernik',
      title: 'Liczby, które mówią o sprzedaży',
      duration: 14,
      intro: 'Po dwóch tygodniach łatwo pochwalić się liczbą wyświetleń. Decyzję podejmujesz jednak na podstawie zamówień i kosztu ich zdobycia.',
      reading: {
        paragraphs: [
          'Mierniki układają się w lejek: widoczność (ile osób zobaczyło), zainteresowanie (ile zapytało, zgodziło się na kontakt), sprzedaż (ile zamówiło i zapłaciło, ile wróciło). Tylko ostatni poziom płaci rachunki.',
          'Koszt pozyskania klienta to koszt testu podzielony przez liczbę klientów, którzy zamówili. Porównaj go z tym, ile zarobisz na kliencie: przy marży 18 zł na koszyku klient za 65 zł zwraca się po czterech zamówieniach.',
        ],
      },
      activities: [
        {
          type: 'matching',
          id: 'm6-lejek',
          question: 'Na którym poziomie lejka jest każda liczba z zeszytu testu?',
          options: ['Widoczność', 'Zainteresowanie', 'Sprzedaż'],
          rows: [
            { label: 'Drugie zamówienie tego samego biura', correct: 2 },
            { label: 'Liczba osób, które zobaczyły post piekarni', correct: 0 },
            { label: 'Zgoda na telefon przed szkoleniem', correct: 1 },
            { label: 'Opłacona faktura za koszyk', correct: 2 },
            { label: 'Polubienia zdjęcia koszyka', correct: 0 },
            { label: 'Telefon z pytaniem o wolny termin', correct: 1 },
          ],
          explanation: 'Wyświetlenia i polubienia to widoczność. Zgody i pytania to zainteresowanie. Zamówienia i płatności — sprzedaż.',
        },
        number('m6-koszt-klienta', 'Z 20 biur 8 zgodziło się na telefon, a 3 zamówiły koszyk. Test kosztował 195 zł. Ile kosztowało pozyskanie jednego zamawiającego biura?', 65, '195 zł ÷ 3 biura = 65 zł.', {
          unit: 'zł',
          tolerance: 0,
          mistakes: [
            { value: 24.38, text: 'Tu podzielono przez 8 zgód. Zgoda to zainteresowanie, nie zamówienie.' },
            { value: 9.75, text: 'Tu podzielono przez wszystkie 20 biur. Liczysz koszt klienta, który zamówił.' },
          ],
        }),
        choice(
          'm6-prog',
          'Próg zapisany przed testem: co najmniej 3 zamówienia z 20 biur i koszt pozyskania poniżej 72 zł (cztery koszyki po 18 zł marży). Wynik: 3 zamówienia, 65 zł. Zdanie A dało 1 zamówienie, B — 2. Co dalej?',
          [
            'Uznać, że zdanie B wygrało, i wyrzucić A',
            'Uznać, że koszyki się nie sprawdziły, bo zamówiło tylko 15% biur',
            'Powtórzyć test na kolejnych 20 biurach i sprawdzić, ile z trzech biur zamówi drugi raz',
            'Od razu zmienić cenę, skład koszyka i kanał, żeby było więcej zamówień',
          ],
          2,
          'Próg osiągnięty, więc test ma sens dalej. Przewaga jednego zamówienia to za mało, by wybrać zdanie, a drugie zamówienie pokaże, czy klient się zwraca.',
          [
            'Różnica jednego zamówienia przy 10 biurach może być przypadkiem.',
            'Próg ustalony przed testem został osiągnięty — zmiana zdania po fakcie to decyzja pod nastrój.',
            null,
            'Przy kilku zmianach naraz nie dowiesz się, co zadziałało.',
          ],
        ),
        {
          type: 'projectField',
          id: 'm6-pole-miernik',
          field: 'm6-5',
          label: 'Miernik wyniku, próg decyzji i wnioski',
          example: 'Miernik: zamówienia i koszt pozyskania biura. Próg: co najmniej 3 zamówienia z 20 biur, koszt poniżej 72 zł. Wynik: 3 zamówienia, 65 zł; zdanie A — 1, B — 2, za mało, by wybrać. Dalej: kolejne 20 biur, liczymy drugie zamówienia.',
        },
      ],
    },
  ],
};
