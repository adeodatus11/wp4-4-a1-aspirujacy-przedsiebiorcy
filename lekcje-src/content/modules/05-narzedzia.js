import { choice, number } from '../schema.js';

export default {
  id: 'm5',
  n: 5,
  topic: 'Cyfryzacja i AI',
  title: 'Narzędzia, które wykonują pracę',
  subtitle: 'Strona oferty, która odpowiada na pytania klienta, i mały eksperyment z AI: z pomiarem czasu, kontrolą błędów i decyzją.',
  duration: 85,
  outcome: 'Szkic strony oferty i karta małego eksperymentu AI.',
  realia: ['daneNaStronie', 'cookies', 'aiDane'],
  objectives: [
    'Piszę stronę oferty, z której klient w pół minuty wie, co dostanie i co zrobić dalej.',
    'Sprawdzam, co musi być na stronie, zanim zacznę przez nią przyjmować zamówienia.',
    'Piszę polecenie dla AI z zadaniem, kontekstem, danymi, ograniczeniami i formatem.',
    'Usuwam dane klientów z przykładów i ustalam, kiedy sprawę przejmuje człowiek.',
    'Liczę zysk z narzędzia razem z czasem sprawdzania i podejmuję decyzję na podstawie liczb.',
  ],
  forGroup:
    'Na spotkanie weź szkic strony oferty i swoje polecenie dla AI. W parach: jedna osoba czyta stronę drugiej przez 30 sekund i mówi, dla kogo jest oferta i jaki jest następny krok. Potem sprawdźcie swoje polecenia na tych samych pięciu zmyślonych zapytaniach i porównajcie, czyje szkice wymagały mniej poprawek.',
  solo:
    'Bez grupy: pokaż szkic strony osobie spoza branży i zapytaj, co zrobi po przeczytaniu. Jeśli nie wie — popraw wezwanie do działania. Eksperyment z AI prowadź przez dwa tygodnie, zapisując czas i błędy w tabelce, i dopiero wtedy zdecyduj o płatnym narzędziu.',
  sections: [
    {
      id: 'oferta',
      label: 'Strona oferty',
      title: 'Strona, która odpowiada na pytania klienta',
      duration: 15,
      intro: 'Ania prowadzi zakład krawiecki na wrocławskim Nadodrzu. Połowę dnia zajmują jej wiadomości z pytaniami, na które mogłaby odpowiedzieć strona. Przypadek jest fikcyjny.',
      reading: {
        paragraphs: [
          'Klient na stronie szuka odpowiedzi na cztery pytania: czy to dla mnie, co dokładnie dostanę, ile to kosztuje albo jak poznam cenę, co mam teraz zrobić. Nagłówek mówi, co robisz i dla kogo. Opis — jaki problem znika. Cena lub zasada wyceny. Na końcu jedna, konkretna czynność: zadzwoń, przyjdź w godzinach, wyślij zdjęcie.',
          'Zacznij od treści, nie od wyglądu. Kartka z tymi czterema odpowiedziami jest lepsza niż ładny szablon z hasłem „profesjonalizm i pasja”. Obiecuj tylko to, co możesz dotrzymać przy pełnym kalendarzu.',
        ],
      },
      activities: [
        {
          type: 'spotErrors',
          id: 'm5-szkic-strony',
          title: 'Pierwszy szkic strony Ani',
          context: 'Zaznacz zdania, które nie odpowiadają na pytania klienta albo obiecują coś na wyrost.',
          lines: [
            { text: 'Krawiectwo Ania — najwyższa jakość w mieście', error: 'Ogólnik bez dowodu. Lepiej: „Poprawki krawieckie na Nadodrzu — skracanie, zamki, zwężanie”.' },
            { text: 'Skracamy spodnie, wymieniamy zamki, zwężamy i poszerzamy odzież.' },
            { text: 'Wszystko gotowe w 24 godziny!', error: 'Obietnica nie do dotrzymania przy kolejce. Podaj typowy termin i że potwierdzasz go przy przyjęciu.' },
            { text: 'Skrócenie spodni od 35 zł, wymiana zamka w kurtce od 80 zł.' },
            { text: 'Napisz do nas, a odezwiemy się.', error: 'Brak konkretnego kroku. Lepiej: godziny pracowni, telefon i co przynieść albo przysłać (zdjęcie, wymiary).' },
            { text: 'ul. Przykładowa 5 (adres fikcyjny), pon.–pt. 10:00–18:00.' },
          ],
          explanation: 'Trzy poprawki: konkret zamiast ogólnika, uczciwy termin, jasny następny krok. Ceny i godziny już działają.',
        },
        {
          type: 'projectField',
          id: 'm5-pole-strona',
          field: 'm5-0',
          label: 'Zadanie klienta i treść mojej strony oferty',
          prompt: 'Zapisz: dla kogo, jaki problem, co klient dostaje, cena lub zasada wyceny, jeden następny krok.',
          example: 'Dla osób z okolicy, które kupiły ubranie, ale ono nie pasuje. Nagłówek: Poprawki krawieckie na Nadodrzu — zwykle w 5 dni roboczych. Ceny od 35 zł, przy sukienkach wycena po przymiarce. Następny krok: przyjdź pon.–pt. 10–18 albo wyślij zdjęcie i wymiary.',
        },
      ],
    },
    {
      id: 'obowiazki',
      label: 'Zanim ruszy',
      title: 'Co musi być na stronie, zanim przyjmiesz zamówienie',
      duration: 8,
      intro: 'Strona wizytówka to jeszcze nie sklep. Gdy dodajesz formularz zamówienia albo analitykę, dochodzą obowiązki.',
      reading: {
        paragraphs: [
          'Firma, która przyjmuje zamówienia przez stronę, podaje swoje dane i adres e-mail, a firma zarejestrowana — także NIP i numer w rejestrze. Formularz zbiera dane osobowe, więc klient musi wiedzieć, kto je przetwarza i po co. Narzędzia do statystyk i reklamy zapisują pliki na urządzeniu — na to potrzebna jest zgoda.',
          'Przy sprzedaży na odległość dochodzą obowiązki informacyjne wobec konsumentów, np. o prawie odstąpienia od umowy. Sprawdź je w poradniku UOKiK, zanim uruchomisz płatności online.',
        ],
      },
      activities: [
        {
          type: 'multi',
          id: 'm5-obowiazki',
          question: 'Ania (firma w CEIDG) dodaje formularz „Umów przymiarkę”. Co powinno być na stronie? Zaznacz wszystkie potrzebne elementy.',
          options: [
            'Zaświadczenie z urzędu skarbowego o niezaleganiu z podatkami',
            'Imię i nazwisko lub nazwa firmy, adres i e-mail',
            'Ceny wszystkich możliwych poprawek, bez wyjątków',
            'NIP i informacja o wpisie do CEIDG',
            'Informacja, kto i w jakim celu przetwarza dane z formularza',
          ],
          correct: [1, 3, 4],
          explanation: 'Dane firmy, NIP z wpisem i informacja o przetwarzaniu danych. Zaświadczenia z urzędu nikt na stronie nie wymaga, a ceny mogą być „od” albo „po wycenie”.',
          hint: 'Pomyśl: kto stoi za stroną i co dzieje się z danymi wpisanymi w formularz.',
        },
        choice(
          'm5-analityka',
          'Ania chce dodać na stronę statystyki odwiedzin i piksel reklamowy. Co powinna zrobić?',
          [
            'Nic — przy tak małej stronie te zasady nie obowiązują',
            'Wpisać w stopce „korzystając ze strony, akceptujesz cookies”',
            'Pokazać baner z wyborem „zgadzam się” i „odmawiam”, opisać cel i włączać te narzędzia dopiero po zgodzie',
          ],
          2,
          'Zgoda na pliki, które nie są niezbędne do działania strony, musi być wcześniejsza, dobrowolna i świadoma. Odmowa ma być równie łatwa jak zgoda.',
          ['Wielkość strony nie ma znaczenia — liczy się zapisywanie plików na urządzeniu użytkownika.', 'Samo wejście na stronę nie jest zgodą. Zgoda wymaga działania i wyboru.', null],
        ),
      ],
    },
    {
      id: 'zadanie',
      label: 'Zadanie dla AI',
      title: 'Jedno zadanie i pomiar bez AI',
      duration: 10,
      intro: 'Eksperyment zaczyna się od pomiaru. Bez liczby „przed” nie dowiesz się, czy narzędzie cokolwiek dało.',
      reading: {
        paragraphs: [
          'Dobre pierwsze zadanie dla AI jest powtarzalne, ma jasne dane wejściowe (cennik, godziny, opis usługi), a błąd da się łatwo wyłapać przed wysłaniem. Złe pierwsze zadanie wymaga oceny na oko, dotyczy pieniędzy lub prawa albo trafia do klienta bez kontroli.',
          'Zanim użyjesz narzędzia, zmierz przez tydzień, ile razy wykonujesz zadanie i ile średnio to trwa. Wystarczy kreska w zeszycie i stoper w telefonie przy kilku próbach.',
        ],
      },
      activities: [
        choice(
          'm5-wybor-zadania',
          'Które zadanie Ania powinna dać AI na pierwszy eksperyment?',
          [
            'Samodzielne odpisywanie klientom na Messengerze przez całą dobę',
            'Wycenę poprawek sukienki na podstawie zdjęcia',
            'Prowadzenie książki przychodów',
            'Szkice odpowiedzi na powtarzalne pytania o cenę, na podstawie cennika — wysyłane po sprawdzeniu przez Anię',
          ],
          3,
          'Powtarzalne, oparte na cenniku i z kontrolą przed wysłaniem. Jeśli szkic będzie zły, nic się nie stanie.',
          [
            'Bez kontroli AI zacznie obiecywać terminy i usługi, których Ania nie ma.',
            'Wycena sukienki wymaga przymiarki i oceny materiału. AI będzie zgadywać.',
            'Duża stawka błędu i przepisy podatkowe. To nie jest mały eksperyment.',
            null,
          ],
        ),
        number('m5-czas-przed', 'Ania dostaje tygodniowo około 40 zapytań. Odpowiedź na jedno zajmuje jej średnio 4 minuty (sprawdzenie cennika, napisanie, poprawki). Ile minut tygodniowo zajmują jej odpowiedzi?', 160, '40 × 4 = 160 minut, czyli prawie trzy godziny tygodniowo.', {
          unit: 'min',
          tolerance: 0,
          mistakes: [{ value: 44, text: 'Liczby trzeba pomnożyć, nie dodać: 40 zapytań po 4 minuty.' }],
        }),
        {
          type: 'projectField',
          id: 'm5-pole-zadanie',
          field: 'm5-1',
          label: 'Wybrane zadanie dla AI i obecny czas wykonania',
          example: 'Szkice odpowiedzi na pytania o cenę i termin poprawek. Dziś: ok. 40 zapytań tygodniowo × 4 min = 160 min. Odpowiedź zawsze wysyła człowiek.',
        },
      ],
    },
    {
      id: 'polecenie',
      label: 'Polecenie',
      title: 'Polecenie, które ogranicza zgadywanie',
      duration: 15,
      intro: 'AI pisze płynnie także wtedy, gdy nie zna odpowiedzi. Dobre polecenie mówi, z czego wolno korzystać, a czego nie wolno dopowiadać.',
      reading: {
        paragraphs: [
          'Polecenie ma pięć części: zadanie (co zrobić), kontekst (kim jesteś, kto jest odbiorcą), dane wejściowe (cennik, wiadomość klienta), ograniczenia (czego nie robić, co zrobić, gdy brakuje informacji) i format (długość, forma zwracania się, co na końcu).',
          'Najważniejsze są ograniczenia. „Podawaj tylko ceny z cennika” i „gdy czegoś nie wiesz, zadaj jedno pytanie” zmniejszają liczbę wymyślonych odpowiedzi bardziej niż długie opisy firmy.',
        ],
        table: {
          head: ['Cennik Ani (fikcyjny)', 'Cena'],
          rows: [
            ['Skrócenie spodni', '35 zł'],
            ['Skrócenie dżinsów z oryginalnym brzegiem', '45 zł'],
            ['Wymiana zamka w kurtce', '80–110 zł, zależnie od długości'],
            ['Zwężenie sukienki', 'od 60 zł, wycena po przymiarce'],
            ['Termin', 'zwykle 5 dni roboczych; ekspres 2 dni +50%, tylko po potwierdzeniu przez Anię'],
          ],
        },
      },
      activities: [
        {
          type: 'matching',
          id: 'm5-czesci-polecenia',
          question: 'Do której części polecenia należy każdy fragment?',
          options: ['Zadanie', 'Kontekst', 'Dane wejściowe', 'Ograniczenia', 'Format'],
          rows: [
            { label: 'Podawaj tylko ceny z cennika. Nie obiecuj terminu — napisz, że potwierdzę go przy przyjęciu.', correct: 3 },
            { label: 'Przygotuj szkic odpowiedzi na wiadomość klienta.', correct: 0 },
            { label: 'Do 60 słów, zwracaj się „Pani/Pan”, na końcu godziny pracowni.', correct: 4 },
            { label: 'Prowadzę małą pracownię krawiecką; klienci piszą krótko, często z telefonu.', correct: 1 },
            { label: 'Cennik jest poniżej. Wiadomość klienta: „Ile za skrócenie dżinsów?”', correct: 2 },
          ],
          explanation: 'Zadanie, kontekst, dane, ograniczenia, format. Gdy któregoś brakuje, AI uzupełnia lukę po swojemu.',
        },
        {
          type: 'projectField',
          id: 'm5-pole-polecenie',
          field: 'm5-2',
          label: 'Polecenie: zadanie, kontekst, ograniczenia, format',
          example: 'Przygotuj szkic odpowiedzi na wiadomość klienta pracowni krawieckiej. Korzystaj tylko z cennika poniżej. Nie podawaj terminu — napisz, że potwierdzę go przy przyjęciu. Gdy brakuje informacji (np. długość zamka), zadaj jedno pytanie. Do 60 słów, forma „Pani/Pan”, na końcu godziny pracowni.',
        },
      ],
    },
    {
      id: 'dane',
      label: 'Dane',
      title: 'Przykłady bez danych klientów',
      duration: 10,
      intro: 'Do eksperymentu potrzebujesz przykładowych zapytań. Najprościej skopiować prawdziwe wiadomości — i właśnie tego nie rób bez przygotowania.',
      reading: {
        paragraphs: [
          'Imię, telefon, adres, a nawet nietypowy szczegół („wesele siostry 14 marca”) pozwalają rozpoznać osobę. Wklejenie ich do narzędzia AI to przetwarzanie danych osobowych. Do testu wystarczą wiadomości zmyślone na wzór prawdziwych albo prawdziwe po usunięciu wszystkiego, co wskazuje na osobę.',
          'Zanim użyjesz narzędzia z prawdziwymi danymi, sprawdź w jego ustawieniach i regulaminie, czy rozmowy służą do trenowania modelu i czy dostawca podpisuje umowę powierzenia danych.',
        ],
      },
      activities: [
        {
          type: 'spotErrors',
          id: 'm5-anonimizacja',
          title: 'Wiadomość, którą Ania chce wkleić do testu',
          context: 'Zaznacz fragmenty, które trzeba usunąć albo zmienić przed wklejeniem.',
          lines: [
            { text: 'Od: Katarzyna Wójcik, tel. 601 234 567', error: 'Imię, nazwisko i telefon. Zamień na „Klientka A”, numer usuń.' },
            { text: 'Dzień dobry, ile kosztuje wymiana zamka w kurtce zimowej?' },
            { text: 'Kurtka jest męża, odbiorę ją po pracy, mieszkam na Roosevelta 12/4.', error: 'Adres — niepotrzebny do odpowiedzi i wskazuje osobę.' },
            { text: 'Zamek ma około 70 cm.' },
            { text: 'Zależy mi, żeby zdążyć przed weselem siostry 14 marca w Trzebnicy.', error: 'Szczegół, po którym można rozpoznać osobę. Do testu wystarczy „za 10 dni”.' },
          ],
          explanation: 'Zostaje treść potrzebna do odpowiedzi: usługa, długość zamka, orientacyjny termin. Reszta wypada.',
        },
        {
          type: 'projectField',
          id: 'm5-pole-dane',
          field: 'm5-3',
          label: 'Dane wejściowe i zasady ich użycia',
          example: 'Wejście: zatwierdzony cennik i treść pytania bez imion, telefonów, adresów i szczegółów rodzinnych. Do testu 20 zapytań zmyślonych na wzór prawdziwych. Nie wklejam zdjęć klientów. W ustawieniach narzędzia wyłączam użycie rozmów do trenowania.',
        },
      ],
    },
    {
      id: 'ocena',
      label: 'Sprawdzanie',
      title: 'Kryteria, błędy i moment, w którym przejmuje człowiek',
      duration: 14,
      intro: 'Szkic od AI brzmi pewnie. Dlatego sprawdzasz go według stałych kryteriów, a nie „na oko”.',
      reading: {
        paragraphs: [
          'Kryteria Ani: cena zgodna z cennikiem, żadnego terminu ani usługi spoza cennika, jasny następny krok, do 60 słów. Każdy szkic przechodzi przez te cztery pytania. Zapisujesz, ile szkiców wymagało poprawki i jakiego rodzaju — to pokaże, co poprawić w poleceniu.',
          'Część spraw w ogóle nie powinna trafiać do szkicu: reklamacje, nietypowe zlecenia, prośby o pilny termin. Tu odpowiada człowiek, bo liczy się ocena sytuacji i relacja z klientem.',
        ],
      },
      activities: [
        {
          type: 'spotErrors',
          id: 'm5-szkic-ai',
          title: 'Szkic odpowiedzi od AI',
          context: 'Klient pyta w środę: „Ile kosztuje skrócenie dżinsów z oryginalnym brzegiem i czy zdążą Państwo na sobotę?”. Porównaj szkic z cennikiem z poprzedniego etapu.',
          lines: [
            { text: 'Dzień dobry, dziękujemy za wiadomość.' },
            { text: 'Skrócenie dżinsów z oryginalnym brzegiem kosztuje 35 zł.', error: 'Zła cena. Według cennika 45 zł — 35 zł to zwykłe skrócenie spodni.' },
            { text: 'Oczywiście zdążymy na sobotę!', error: 'Wymyślony termin. Standard to 5 dni roboczych, ekspres tylko po potwierdzeniu przez Anię.' },
            { text: 'Możemy też odebrać spodnie spod Pana domu.', error: 'Usługa, której pracownia nie ma.' },
            { text: 'Zapraszamy pon.–pt. 10:00–18:00, przymiarka zajmuje kilka minut.' },
          ],
          explanation: 'Trzy błędy w jednym szkicu: cena, termin i usługa. Dlatego polecenie zabrania terminów, a każdy szkic sprawdza człowiek.',
        },
        {
          type: 'multi',
          id: 'm5-przejecie',
          question: 'Które wiadomości Ania powinna obsłużyć sama, bez szkicu od AI?',
          options: [
            'Pytanie o godziny otwarcia pracowni',
            'Reklamacja: „poprawiona sukienka dalej jest za szeroka”',
            'Prośba o skrócenie sukni ślubnej na pojutrze',
            'Pytanie o cenę skrócenia spodni',
            'Pytanie, czy pracownia przerobi płaszcz po babci na kurtkę',
          ],
          correct: [1, 2, 4],
          explanation: 'Reklamacja, pilny termin i nietypowe zlecenie wymagają oceny i rozmowy. Godziny i cena skrócenia są w cenniku — tu szkic oszczędza czas.',
        },
        {
          type: 'projectField',
          id: 'm5-pole-kryteria',
          field: 'm5-4',
          label: 'Kryteria jakości, błędy i czas sprawdzania',
          example: 'Kryteria: cena zgodna z cennikiem, brak terminu i usług spoza cennika, jasny następny krok, do 60 słów. W próbie: 3 z 40 szkiców ze złą ceną (dżinsy). Sprawdzenie: ok. 1,5 min na szkic. Bez AI: reklamacje, pilne terminy, nietypowe zlecenia.',
        },
      ],
    },
    {
      id: 'bilans',
      label: 'Bilans',
      title: 'Czy to się opłaca — razem ze sprawdzaniem',
      duration: 13,
      intro: 'Po dwóch tygodniach Ania ma liczby. Teraz czas na rachunek, który uwzględnia też czas kontroli i koszt narzędzia.',
      reading: {
        paragraphs: [
          'Oszczędność to czas bez narzędzia minus czas z narzędziem — a ten drugi obejmuje przygotowanie szkicu i jego sprawdzenie. Pominięcie sprawdzania to najczęstszy powód, dla którego eksperymenty z AI wyglądają lepiej na papierze niż w praktyce.',
          'Koszt zaoszczędzonej godziny porównaj z wartością Twojej godziny z modułu 4. Jeśli narzędzie kosztuje mniej niż godzina, którą odzyskujesz, i błędy nie docierają do klientów — warto. Decyzję zapisz z datą kolejnego pomiaru.',
        ],
      },
      activities: [
        number('m5-oszczednosc', 'Z AI szkic powstaje w pół minuty, a sprawdzenie i poprawka zajmują średnio 1,5 minuty. Ile minut tygodniowo Ania oszczędza przy 40 zapytaniach, w porównaniu ze 160 minutami bez AI?', 80, 'Z AI: 40 × (0,5 + 1,5) = 80 minut. Oszczędność: 160 − 80 = 80 minut tygodniowo.', {
          unit: 'min',
          tolerance: 0,
          mistakes: [{ value: 140, text: 'Tu policzono tylko pół minuty na szkic. Sprawdzanie to też czas pracy.' }],
        }),
        number('m5-koszt-godziny', 'Narzędzie kosztuje 90 zł miesięcznie. Przyjmij, że miesiąc to 4 tygodnie. Ile kosztuje jedna zaoszczędzona godzina? Zaokrąglij do groszy.', 16.88, '80 min × 4 = 320 min ≈ 5,33 godziny. 90 zł ÷ 5,33 h ≈ 16,88 zł za godzinę.', {
          unit: 'zł/h',
          tolerance: 0.05,
          mistakes: [
            { value: 0.28, text: 'To koszt jednej minuty. Pytanie dotyczy godziny — pomnóż przez 60.' },
            { value: 22.5, text: 'To koszt narzędzia na tydzień, a nie na zaoszczędzoną godzinę.' },
          ],
        }),
        choice(
          'm5-decyzja',
          'W próbie 3 z 40 szkiców miały złą cenę, ale Ania wyłapała je przy sprawdzaniu. Która decyzja jest najrozsądniejsza?',
          [
            'Używać dalej ze sprawdzaniem, dopisać do polecenia, że przy dżinsach są dwie ceny, i powtórzyć pomiar za dwa tygodnie',
            'Wyłączyć sprawdzanie, bo 37 z 40 szkiców było dobrych',
            'Zrezygnować z AI, bo popełnia błędy',
            'Kupić droższe narzędzie za 300 zł miesięcznie, które „mniej się myli”',
          ],
          0,
          'Błędy nie doszły do klientów, a czas spadł o połowę. Poprawka polecenia celuje w konkretny błąd, a powtórny pomiar pokaże, czy pomogła.',
          [
            null,
            'Trzy złe ceny tygodniowo to trzech rozczarowanych klientów. Sprawdzanie jest częścią kosztu.',
            'Z kontrolą błędy nie dotarły do klientów, a Ania odzyskała 80 minut tygodniowo.',
            'Nie wiadomo, czy droższe narzędzie myli się rzadziej, a koszt godziny wzrósłby do ok. 56 zł.',
          ],
        ),
        {
          type: 'projectField',
          id: 'm5-pole-decyzja',
          field: 'm5-5',
          label: 'Wynik eksperymentu i decyzja o dalszym użyciu',
          example: 'Wynik: 160 → 80 min tygodniowo, narzędzie 90 zł/mies., ok. 17 zł za zaoszczędzoną godzinę. Błędy: 3 z 40, wszystkie wyłapane. Decyzja: używam dalej ze sprawdzaniem, poprawiam polecenie dla dżinsów, kolejny pomiar 15 maja.',
        },
      ],
    },
  ],
};
