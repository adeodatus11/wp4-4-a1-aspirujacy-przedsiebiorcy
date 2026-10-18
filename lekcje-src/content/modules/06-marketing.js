import { choice, number } from '../schema.js';

export default {
  id: 'm6',
  n: 6,
  topic: 'Marketing i komunikacja',
  title: 'Dotrzyj do właściwych ludzi',
  subtitle: 'Wybierz jedną grupę klientów, napisz obietnicę, którą możesz udowodnić, i zaplanuj dwutygodniowy test z miernikiem sprzedaży.',
  duration: 93,
  outcome: 'Karta STP i plan dwutygodniowego testu komunikacji.',
  realia: ['zgodyMarketing', 'opinie', 'omnibus'],
  objectives: [
    'Opisuję segment przez potrzebę i zachowanie, a nie tylko wiek czy miejsce zamieszkania.',
    'Wybieram grupę, do której dotrę i którą obsłużę, i umiem uzasadnić wybór.',
    'Piszę pozycjonowanie w jednym zdaniu i obietnicę z dowodem.',
    'Wybieram kanał zgodny z zasadami zgód na kontakt.',
    'Planuję test, w którym zmieniam jedną rzecz, i ustalam próg decyzji przed startem.',
  ],
  forGroup:
    'Na spotkanie weź pozycjonowanie w jednym zdaniu i plan testu. W grupie przeczytaj zdanie na głos — pozostałe osoby mówią, kogo widzą jako klienta i co mu obiecujesz. Jeśli odpowiedzi się rozjeżdżają, zdanie jest za ogólne. Plan testu sprawdźcie pod kątem jednej zmiany i progu zapisanego przed startem.',
  solo:
    'Bez grupy: pokaż swoje zdanie trzem osobom z wybranej grupy klientów i zapytaj, co zrozumiały. Test przeprowadź naprawdę — 14 dni z zeszytem: data, kontakt, reakcja, zamówienie. Po teście wpisz wynik w pole projektu i porównaj z progiem.',
  sections: [
    {
      id: 'segmenty',
      label: 'Segmenty',
      title: 'Kto ma problem, który rozwiązujesz',
      duration: 12,
      intro: 'Piekarnia z Oławy, którą znasz z modułu 4, promuje się hasłem „pieczywo dla każdego”. Dla koszyków śniadaniowych to hasło nie działa: nikt nie czuje, że chodzi o niego.',
      reading: {
        paragraphs: [
          'Segment to grupa ludzi podobnych pod względem potrzeby, sytuacji i zachowania: czego potrzebują, kiedy i jak dziś sobie radzą. Wiek i adres pomagają znaleźć tych ludzi, ale nie mówią, dlaczego mieliby kupić.',
          'Rozpisz trzy różne segmenty. Dla każdego zapisz: potrzeba, sytuacja (kiedy się pojawia), zachowanie (co robią teraz). Dopiero mając trzy, możesz uczciwie wybrać jeden.',
        ],
      },
      activities: [
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
      id: 'wybor',
      label: 'Wybór grupy',
      title: 'Który segment wybrać na początek',
      duration: 14,
      intro: 'Najbardziej kusi segment z największym problemem. Ale wybierasz taki, do którego dotrzesz i który obsłużysz dobrze już teraz.',
      reading: {
        paragraphs: [
          'Oceń każdy segment w skali 1–5 według trzech pytań. Dostępność: czy łatwo do tych ludzi dotrzeć i porozmawiać? Pilność: jak bardzo i jak często boli ich problem? Zdolność obsługi: czy masz ludzi, czas i sprzęt, żeby dotrzymać obietnicy?',
          'Najniższa ocena często ważniejsza jest niż suma. Segment z pilnym problemem, którego nie obsłużysz, przyniesie skargi zamiast stałych klientów.',
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
              head: ['Segment', 'Dostępność', 'Pilność', 'Zdolność obsługi', 'Razem'],
              rows: [
                ['Biura do 20 osób', '4', '4', '5', { f: 'r1' }],
                ['Pensjonaty w okolicy', '2', '5', '2', { f: 'r2' }],
                ['Urodziny dzieci', '3', '2', '3', { f: 'r3' }],
              ],
            },
            footer: 'Pensjonaty potrzebują dostaw codziennie przed 7:00, w kilku miejscowościach. Piekarnia ma jedno auto.',
          },
          fields: {
            r1: { label: 'Biura — razem', answer: 13, hint: 'Dodaj trzy oceny w wierszu.' },
            r2: { label: 'Pensjonaty — razem', answer: 9, hint: 'Dodaj trzy oceny w wierszu.' },
            r3: { label: 'Urodziny — razem', answer: 8, hint: 'Dodaj trzy oceny w wierszu.' },
          },
          explanation: 'Biura 13, pensjonaty 9, urodziny 8. Biura wygrywają nie najwyższą pilnością, ale tym, że żadna ocena nie jest niska.',
        },
        choice(
          'm6-pensjonaty',
          'Pensjonaty mają najpilniejszy problem (5). Dlaczego piekarnia mimo to zaczyna od biur?',
          [
            'Bo pilność problemu nie ma znaczenia',
            'Bo biura na pewno zapłacą więcej',
            'Bo dostaw codziennie przed 7:00 w kilku miejscowościach nie obsłuży jednym autem — obietnica byłaby bez pokrycia',
          ],
          2,
          'Zdolność obsługi 2 oznacza, że pierwsze spóźnienia zniszczyłyby opinię. Pensjonaty mogą wrócić, gdy piekarnia będzie miała drugie auto.',
          ['Ma duże znaczenie — ale nie wystarczy, gdy nie możesz dotrzymać obietnicy.', 'W tabeli nie ma nic o cenie. To założenie, nie powód.', null],
        ),
        {
          type: 'projectField',
          id: 'm6-pole-wybor',
          field: 'm6-1',
          label: 'Wybrana grupa i powód wyboru',
          example: 'Biura do 20 osób: 13 z 15 punktów. Łatwo do nich dotrzeć (centrum, 5 minut), problem wraca co tydzień, dostawę na 8:30 obsłużymy jednym autem. Pensjonaty odkładamy: nie mamy ludzi na dostawy przed 7:00.',
        },
      ],
    },
    {
      id: 'pozycja',
      label: 'Pozycjonowanie',
      title: 'Dlaczego mają wybrać Ciebie — w jednym zdaniu',
      duration: 12,
      intro: 'Pozycjonowanie to nie hasło reklamowe. To zdanie, z którego wynika każdy komunikat, ulotka i rozmowa.',
      reading: {
        paragraphs: [
          'Prosty wzór: dla [kogo], w [jakiej sytuacji], [co dostają], w przeciwieństwie do [obecnej alternatywy]. Alternatywą jest to, co klient robi dziś — w przypadku biur: zakupy w markecie albo drogi catering z Wrocławia.',
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
      id: 'kanal',
      label: 'Kanał',
      title: 'Kanał, który dociera do tej jednej osoby',
      duration: 14,
      intro: 'W biurze o śniadaniu decyduje zwykle jedna osoba: recepcja, asystentka zarządu, kierownik. Kanał wybierasz pod nią, nie pod „zasięg”.',
      reading: {
        paragraphs: [
          'Post w mediach społecznościowych zobaczy wiele osób, ale rzadko tę, która zamawia śniadania. Osobista wizyta z próbką trwa dłużej, za to trafia prosto do decydującej osoby i daje rozmowę.',
          'Uwaga na zgody: na ofertę wysłaną e-mailem lub SMS-em i na telefon z ofertą potrzebujesz wcześniejszej zgody odbiorcy — także firmy. Adres e-mail biura na jego stronie nie jest zgodą. Wizyta osobista i kartka zostawiona w recepcji takiej zgody nie wymagają.',
        ],
      },
      activities: [
        {
          type: 'multi',
          id: 'm6-zgody',
          question: 'Które działania wymagają wcześniejszej zgody odbiorcy?',
          options: [
            'Oferta wysłana e-mailem na adres biura ze strony internetowej',
            'Osobista wizyta w recepcji z próbką',
            'SMS z promocją na numer z wizytówki',
            'Telefon do biura z ofertą koszyków',
            'Kartka z ofertą zostawiona w recepcji',
          ],
          correct: [0, 2, 3],
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
