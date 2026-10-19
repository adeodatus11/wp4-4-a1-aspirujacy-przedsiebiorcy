import { choice, number, text } from '../schema.js';

export default {
  id: 'm1',
  n: 1,
  topic: 'Coaching',
  title: 'Od celu do działania',
  subtitle: 'Jak samemu dojść do decyzji, kogo pytać o radę i jak zaplanować pierwszy krok, który zależy tylko od Ciebie.',
  duration: 110,
  realia: ['przezywalnosc', 'bur'],
  objectives: [
    'Odróżniam coaching od mentoringu, doradztwa i szkolenia i wiem, gdzie szukać każdego z nich.',
    'Zadaję pytania, które pomagają drugiej osobie myśleć, zamiast podsuwać jej odpowiedź.',
    'Prowadzę rozmowę według GROW: cel, sytuacja, możliwości, decyzja.',
    'Zapisuję cel na 14 dni, który zależy ode mnie i da się sprawdzić.',
    'Daję informację zwrotną, opisując zachowanie, a nie osobę.',
    'Wiem, czego nauczę się w kolejnych modułach, i oceniam narzędzie z zewnątrz na liczbach, zanim je wprowadzę.',
  ],
  outcome: 'Kontrakt rozwojowy i plan działania na 14 dni.',
  forGroup:
    'Na spotkaniu w grupie przydadzą się trzy rzeczy z tej ścieżki: dwuminutowe przedstawienie siebie i swojego pomysłu, jedna przeszkoda, o której chcesz porozmawiać (tylko jeśli chcesz), i jedno zdanie o zmianie, którą wprowadzisz w ciągu 14 dni.',
  solo:
    'Bez grupy: przeprowadź rozmowę GROW z zaufaną osobą, która obieca tylko pytać, a nie radzić. Albo odpowiedz na pytania GROW na piśmie, odłóż kartkę na dzień i przeczytaj ją jeszcze raz. Po 14 dniach porównaj plan z tym, co udało się zrobić.',
  source: {
    file: '01_Modul_1_Coaching.md',
    covers: [
      ['2. Treść merytoryczna', 'pierwszy-rok'],
      ['2. Treść merytoryczna', 'wsparcie'],
      ['2. Treść merytoryczna', 'program'],
      ['3. Studium przypadku', 'przypadek'],
      ['4. Coach Corner', 'coach-corner'],
    ],
  },
  sections: [
    {
      id: 'pierwszy-rok',
      label: 'Pierwszy rok',
      title: 'Dlaczego pierwsze lata są trudne',
      duration: 8,
      intro: 'Ten moduł nie uczy żadnej branży. Uczy czegoś, co przydaje się w każdej: jak dojść do dobrej decyzji, kiedy nikt nie poda gotowej odpowiedzi.',
      reading: {
        paragraphs: [
          'Z firm, które ruszyły w Polsce w 2024 r., pierwszy rok przetrwało 68,4% — mniej więcej siedem na dziesięć (PARP, 2026). Nieudany start rzadko wynika z samego pomysłu. Częściej właściciel robi wszystko sam, nie ma z kim porozmawiać o decyzjach i działa bez planu, który dałoby się sprawdzić.',
          'Część trudności przychodzi z zewnątrz: podwyżka czynszu, nowy konkurent, zmiana przepisów. Na nie masz mały wpływ. Inne są po Twojej stronie: jak planujesz dzień, czy liczysz pieniądze, czy odkładasz trudne rozmowy. Od tych drugich warto zacząć, bo tam każdy krok zależy od Ciebie.',
        ],
      },
      activities: [
        {
          type: 'multi',
          id: 'm1-wewnetrzne',
          question: 'Które trudności są po stronie właściciela firmy, czyli może je zmienić sam?',
          options: [
            'W trakcie pracy odbieram każdy telefon i nie kończę zleceń na czas',
            'Właściciel lokalu podniósł czynsz o 15%',
            'Nie wiem, ile zarabiam na jednej usłudze',
            'Na osiedlu otworzył się drugi serwis',
            'Od miesiąca odkładam rozmowę z klientem, który nie płaci',
          ],
          correct: [0, 2, 4],
          explanation: 'Telefony, liczenie zarobku i trudna rozmowa zależą od Ciebie. Na czynsz i konkurencję możesz tylko reagować — i to też jest decyzja po Twojej stronie.',
          hint: 'Zapytaj o każdą: czy mogę to zmienić od jutra bez niczyjej zgody?',
        },
        {
          type: 'checklist',
          id: 'm1-u-mnie',
          question: 'Co z tego dotyczy Ciebie? Nikt tego nie zobaczy — to dla Ciebie na dalszą część modułu.',
          items: [
            'Wiele spraw zaczynam i mało kończę',
            'Nie mam z kim porozmawiać o decyzjach w firmie',
            'Nie wiem, czy to, co robię, przynosi efekt',
            'Odkładam decyzje, bo boję się błędu',
            'Biorę na siebie wszystko, nawet to, co mógłby zrobić ktoś inny',
          ],
        },
      ],
    },
    {
      id: 'wsparcie',
      label: 'Kto pomoże',
      title: 'Coach, mentor, doradca czy szkolenie?',
      duration: 12,
      intro: 'Każdy z nich pomaga inaczej. Gdy wiesz, czego potrzebujesz, nie płacisz za rozmowę, która nie odpowie na Twoje pytanie.',
      reading: {
        table: {
          head: ['Rodzaj wsparcia', 'Kto mówi więcej', 'Co dostajesz', 'Typowe pytanie'],
          rows: [
            ['Coaching', 'Ty', 'Pytania, które porządkują myślenie; decyzja zostaje Twoja', '„Co właściwie chcę zmienić i od czego zacznę?”'],
            ['Mentoring', 'Mentor', 'Doświadczenie kogoś, kto prowadził podobną firmę', '„Skąd wzięli się Twoi pierwsi klienci?”'],
            ['Doradztwo', 'Doradca', 'Konkretne rozwiązanie w jego specjalności', '„Ryczałt czy skala podatkowa przy moich przychodach?”'],
            ['Szkolenie', 'Prowadzący', 'Wiedza i umiejętność, ta sama dla całej grupy', '„Jak wystawić fakturę w KSeF?”'],
          ],
        },
        paragraphs: [
          'Podatki, ZUS i umowy to sprawy dla doradcy podatkowego, biura rachunkowego albo prawnika. Coach nie powinien w nich doradzać. Może natomiast pomóc ustalić, o co zapytać specjalistę.',
          'Gdzie szukać: szkolenia i usługi doradcze, w tym coaching i mentoring, są w Bazie Usług Rozwojowych PARP (uslugirozwojowe.parp.gov.pl). Część z nich ma dofinansowanie, zwykle 50–80%, zależnie od naboru w Twoim województwie. Mentorów mają też inkubatory przedsiębiorczości i izby gospodarcze.',
        ],
      },
      activities: [
        {
          type: 'matching',
          id: 'm1-kto',
          question: 'Do kogo z tym pójść?',
          options: ['Coach', 'Mentor', 'Doradca lub specjalista', 'Szkolenie'],
          rows: [
            { label: 'Nie wiem, czy w ogóle chcę rozwijać firmę, czy wrócić na etat', correct: 0, explanation: 'Odpowiedź znasz tylko Ty. Coach pomoże ją usłyszeć.' },
            { label: 'Czy umowa z hurtownią pozwala jej podnieść ceny w trakcie roku?', correct: 2, explanation: 'Interpretacja umowy to zadanie dla prawnika.' },
            { label: 'Jak inni fryzjerzy przetrwali pierwszą zimę bez klientów?', correct: 1, explanation: 'Doświadczenie kogoś z branży — mentor.' },
            { label: 'Chcę nauczyć się obsługi arkusza kalkulacyjnego od podstaw', correct: 3, explanation: 'Konkretna umiejętność, ta sama dla wielu osób — szkolenie.' },
            { label: 'Ciągle odkładam podniesienie cen i nie wiem dlaczego', correct: 0, explanation: 'Przeszkoda jest w Tobie, nie w wiedzy — praca dla coacha.' },
          ],
          explanation: 'Najpierw nazwij rodzaj problemu: decyzja, doświadczenie, wiedza specjalistyczna czy umiejętność. Od tego zależy, kogo szukasz.',
        },
        choice(
          'm1-ryczalt',
          'Ania na sesji coachingowej pyta: „Ryczałt czy skala podatkowa — co mam wybrać?”. Co powinien zrobić coach?',
          [
            'Pomóc Ani spisać dane i pytania, z którymi pójdzie do księgowej lub doradcy podatkowego',
            'Polecić ryczałt, bo jest najprostszy dla małych firm',
            'Zapytać, co Ania czuje, gdy myśli o podatkach, i na tym skończyć temat',
          ],
          0,
          'Forma opodatkowania zależy od przychodów, kosztów i branży — to decyzja na liczbach, z doradcą. Coach pomaga przygotować się do tej rozmowy.',
          [
            null,
            'Coach nie doradza w podatkach. Ryczałt nie dla każdego jest korzystny.',
            'Emocje bywają ważne, ale Ania potrzebuje też konkretnej odpowiedzi — od specjalisty.',
          ],
        ),
      ],
    },
    {
      id: 'program',
      label: 'Mapa programu',
      title: 'Czego możesz się spodziewać w tym programie',
      duration: 10,
      intro: 'Zanim zaczniesz, zobacz całą drogę. Program ma osiem modułów, a każdy odpowiada na jedno pytanie, które zadaje sobie osoba zakładająca albo prowadząca małą firmę.',
      reading: {
        paragraphs: [
          'Program jest bezpłatny i nie wymaga wcześniejszej wiedzy z zarządzania. Pracujesz we własnym tempie, na przykładach z małych firm. Jest uporządkowany, ale elastyczny: możesz iść po kolei albo zacząć od modułu, którego najbardziej potrzebujesz. Nie dostaniesz gotowych odpowiedzi. Dostaniesz narzędzia i pytania, dzięki którym znajdziesz własne.',
          'Najwięcej skorzystają osoby, które zaczynają działalność, właściciele rosnących firm, którzy zaczynają zarządzać ludźmi, osoby przejmujące firmę rodzinną i ci, którzy po wcześniejszym niepowodzeniu chcą zacząć jeszcze raz — tym razem z planem.',
        ],
        table: {
          head: ['Moduł', 'Pytanie przewodnie'],
          rows: [
            ['1. Od celu do działania', 'Jak jaśniej widzieć cele i podejmować decyzje?'],
            ['2. Przedsiębiorczość', 'Dlaczego to Ty jesteś najważniejszym zasobem firmy?'],
            ['3. Walidacja', 'Czy ktoś naprawdę zapłaci za to, co chcesz oferować?'],
            ['4. Model biznesowy', 'Jak zamienić pomysł w firmę, która się utrzyma?'],
            ['5. Narzędzia i AI', 'Które narzędzia oszczędzą Ci czas, a które tylko kosztują?'],
            ['6. Marketing', 'Jak znaleźć klientów przy małym budżecie?'],
            ['7. ESG', 'Jak mniejsze straty mogą stać się przewagą firmy?'],
            ['8. Pitch i finansowanie', 'Jak przekonać innych do wsparcia i ile pieniędzy potrzebujesz?'],
          ],
        },
      },
      activities: [
        {
          type: 'matching',
          id: 'm1-mapa',
          question: 'Który moduł odpowie na pytanie tej osoby?',
          options: ['2. Przedsiębiorczość', '3. Walidacja', '4. Model biznesowy', '5. Narzędzia i AI', '6. Marketing', '8. Pitch i finansowanie'],
          rows: [
            { label: 'Mam pomysł na catering dla biur, ale nie wiem, czy ktoś go kupi', correct: 1 },
            { label: 'Sprzedaję dużo, a na koncie ciągle brakuje pieniędzy', correct: 2 },
            { label: 'Fundusz pożyczkowy prosi o prezentację firmy w 10 minut', correct: 5 },
            { label: 'Robię wszystko sama w firmie i nie wiem, w czym jestem naprawdę dobra', correct: 0 },
            { label: 'Odpisuję na te same pytania klientów po kilkanaście razy dziennie', correct: 3 },
            { label: 'Ulotki rozdaję wszystkim, a klientów nie przybywa', correct: 4 },
          ],
          explanation: 'Każdy moduł zaczyna się od konkretnego kłopotu. Jeśli któryś z nich jest Twój, możesz zacząć od tego modułu.',
        },
        {
          type: 'checklist',
          id: 'm1-dla-kogo',
          question: 'Która sytuacja jest najbliższa Twojej? Zaznacz dla siebie.',
          items: [
            'Dopiero zaczynam albo planuję firmę',
            'Prowadzę firmę i zaczynam zatrudniać ludzi',
            'Przejmuję firmę rodzinną',
            'Po wcześniejszym niepowodzeniu zaczynam od nowa',
            'Chcę świadomie rozwijać się jako szefowa lub szef',
          ],
        },
      ],
    },
    {
      id: 'pytania',
      label: 'Dobre pytania',
      title: 'Pytanie, które pomaga myśleć',
      duration: 12,
      intro: 'Najszybciej uczysz się coachingu, gdy słuchasz siebie w rozmowie ze znajomym, który ma problem. Większość z nas od razu radzi.',
      reading: {
        paragraphs: [
          'Pytanie otwarte zaczyna się od „co”, „jak”, „kiedy”, „po czym poznasz”. Daje rozmówcy miejsce na własną odpowiedź. Pytanie zamknięte („czy…?”) przydaje się do potwierdzenia ustaleń. Pytanie sugerujące podpowiada odpowiedź („Nie uważasz, że powinnaś…?”).',
          'Najczęstsza pułapka to rada w przebraniu pytania: „A może po prostu zatrudnisz kogoś?”. Brzmi jak pytanie, ale jest gotowym rozwiązaniem. Uważaj też na „dlaczego” — „Dlaczego nie zadzwonisz do tego klienta?” łatwo usłyszeć jak zarzut. Lepiej: „Co Cię powstrzymuje przed tym telefonem?”.',
        ],
      },
      activities: [
        {
          type: 'matching',
          id: 'm1-rodzaje',
          question: 'Jakie to pytanie?',
          options: ['Otwarte', 'Zamknięte', 'Sugerujące lub rada'],
          rows: [
            { label: 'Co do tej pory robisz z telefonami w trakcie pracy?', correct: 0 },
            { label: 'Czy mogę zapisać, że zaczynasz w poniedziałek?', correct: 1 },
            { label: 'A może po prostu wyłączysz telefon do 14:00?', correct: 2, explanation: 'Gotowe rozwiązanie podane jako pytanie.' },
            { label: 'Po czym poznasz, że zmiana działa?', correct: 0 },
            { label: 'Nie uważasz, że powinnaś podnieść ceny?', correct: 2, explanation: 'Pytanie podsuwa odpowiedź, której oczekuje pytający.' },
            { label: 'Czy to jest dla Ciebie najważniejsze na te dwa tygodnie?', correct: 1, explanation: 'Zamknięte, ale tu dobre: potwierdza wybór rozmówcy.' },
          ],
          explanation: 'Zamknięte pytania nie są złe — służą do potwierdzania. Kłopot zaczyna się, gdy pytający przemyca w pytaniu swoje rozwiązanie.',
        },
        {
          type: 'spotErrors',
          id: 'm1-rozmowa',
          title: 'Kuba „coachuje” znajomą, która prowadzi kwiaciarnię',
          context: 'Zaznacz wypowiedzi Kuby, w których zamiast pytać, podsuwa rozwiązanie albo ocenia.',
          lines: [
            { text: 'Kuba: Co chcesz zmienić w ciągu najbliższego miesiąca?' },
            { text: 'Ola: Mam za mało czasu na zamówienia ślubne.' },
            { text: 'Kuba: Dlaczego jeszcze nikogo nie zatrudniasz do pomocy?', error: 'Ocena i gotowe rozwiązanie naraz. „Dlaczego nie…” brzmi jak zarzut.' },
            { text: 'Kuba: Na co teraz idzie najwięcej Twojego czasu?' },
            { text: 'Ola: Na wiązanki „od ręki” i rozmowy z dostawcami.' },
            { text: 'Kuba: Ślubne są bardziej opłacalne, więc pewnie powinnaś skupić się na nich, prawda?', error: 'Pytanie sugerujące. Kuba zakłada, co jest opłacalne, i podaje wniosek.' },
            { text: 'Kuba: Jakie masz możliwości, żeby odzyskać kilka godzin w tygodniu?' },
          ],
          explanation: 'Dwie wypowiedzi do poprawy. Zamiast „Dlaczego nikogo nie zatrudniasz…?” — „Co do tej pory pomagało Ci odzyskać czas?”. Zamiast sugestii — „Które zamówienia dają Ci najwięcej, a które zabierają najwięcej czasu?”.',
        },
        choice(
          'm1-nie-mam-czasu',
          'Rozmówca mówi: „Nie mam czasu na nic”. Które pytanie najlepiej pomaga mu pójść dalej?',
          [
            'Na co poszło najwięcej czasu w ostatnim tygodniu?',
            'Czy nie warto wstawać godzinę wcześniej?',
            'Dlaczego tak źle organizujesz sobie dzień?',
            'Wszyscy przedsiębiorcy tak mają, prawda?',
          ],
          0,
          'Pytanie o konkretny, niedawny tydzień daje fakty. Z faktów łatwiej znaleźć miejsce na zmianę.',
          [
            null,
            'To rada w przebraniu pytania.',
            '„Dlaczego tak źle…” ocenia osobę i zamyka rozmowę.',
            'Pytanie sugerujące — i zdejmuje odpowiedzialność, zamiast pomóc.',
          ],
        ),
      ],
    },
    {
      id: 'grow',
      label: 'GROW',
      title: 'Rozmowa w czterech krokach',
      duration: 15,
      intro: 'Marta sama prowadzi serwis rowerowy we Wrocławiu. W sezonie kończy pracę po 20:00 i mówi: „Potrzebuję więcej klientów”. Zobacz, jak rozmowa GROW zmienia ten problem.',
      reading: {
        title: 'GROW',
        paragraphs: [
          'Goal — cel: co konkretnie chcesz osiągnąć w tym czasie? Reality — sytuacja: co dzieje się teraz, jakie masz fakty i liczby? Options — możliwości: jakie są co najmniej trzy różne drogi? Will — decyzja: co zrobisz, do kiedy i po czym poznasz, że to zrobione?',
          'Kolejność ma znaczenie. Kto przeskakuje od celu od razu do rozwiązania, zwykle rozwiązuje niewłaściwy problem — tak jak Marta, zanim policzyła swój dzień.',
        ],
        example: {
          question: 'Jak wygląda dzień Marty w liczbach?',
          steps: [
            'Marta przez tydzień zapisuje przerwy. W sezonie odbiera średnio 22 telefony dziennie.',
            'Rozmowa trwa około 4 minut, a powrót do przerwanej naprawy zajmuje kolejne 3 minuty.',
            'Klientów nie brakuje. Brakuje czasu na naprawy, które już ma.',
          ],
          answer: 'Prawdziwy problem to przerywana praca, a nie liczba klientów.',
        },
      },
      activities: [
        number('m1-minuty', 'Ile minut dziennie Marta traci przez telefony (rozmowa i powrót do pracy)?', 154, '22 × (4 + 3) = 154 minuty, czyli ponad dwie i pół godziny dziennie.', {
          unit: 'min',
          tolerance: 0,
          mistakes: [
            { value: 88, text: 'To same rozmowy (22 × 4). Doliczasz też 3 minuty powrotu do naprawy.' },
            { value: 66, text: 'To sam powrót do pracy (22 × 3). Doliczasz też czas rozmowy.' },
          ],
        }),
        {
          type: 'matching',
          id: 'm1-etapy',
          question: 'Do którego kroku GROW należy pytanie?',
          options: ['Goal', 'Reality', 'Options', 'Will'],
          rows: [
            { label: 'Co chcesz, żeby się zmieniło do końca miesiąca?', correct: 0 },
            { label: 'Ile telefonów było wczoraj podczas napraw?', correct: 1 },
            { label: 'Co da się zrobić inaczej z telefonami — wymień trzy sposoby', correct: 2 },
            { label: 'Od kiedy zaczynasz i kto o tym musi wiedzieć?', correct: 3 },
            { label: 'Co już raz pomogło ograniczyć przerwy?', correct: 1, explanation: 'Dotychczasowe doświadczenie to też fakt o sytuacji.' },
          ],
          explanation: 'Pytania o przeszłość i fakty należą do Reality; o warianty — do Options; o termin i pierwszy ruch — do Will.',
        },
        choice(
          'm1-opcje',
          'Który zestaw to naprawdę „Options”?',
          [
            'Godziny telefonów 8–9 i 16–17; zapisy przez formularz; automatyczna wiadomość z terminem odbioru',
            'Wyłączyć telefon w trakcie napraw',
            'Więcej reklamy, żeby było więcej klientów',
            'Zatrudnić kogoś, bo inaczej się nie da',
          ],
          0,
          'Opcje to kilka różnych dróg do wyboru. Jedna droga, nawet dobra, to już decyzja — a decyzja przychodzi w kroku Will.',
          [
            null,
            'To jedna opcja, nie zestaw. Bez porównania trudno ocenić, czy najlepsza.',
            'Reklama odpowiada na problem, którego Marta nie ma.',
            'Jedno rozwiązanie podane jako konieczność zamyka myślenie.',
          ],
        ),
        {
          type: 'sequence',
          id: 'm1-kolejnosc',
          question: 'Ułóż pytania do Marty w kolejności rozmowy GROW.',
          items: [
            'Co chcesz mieć inaczej za dwa tygodnie?',
            'Jak wyglądał wczorajszy dzień — ile było przerw?',
            'Jakie widzisz sposoby, żeby telefony nie przerywały napraw?',
            'Który sposób sprawdzasz od poniedziałku i po czym poznasz, że działa?',
          ],
          explanation: 'Cel, sytuacja, możliwości, decyzja. Marta wybiera godziny telefonów 8–9 i 16–17 i przez 10 dni zapisuje, o której kończy pracę.',
        },
      ],
    },
    {
      id: 'cel',
      label: 'Cel',
      title: 'Cel, na który masz wpływ',
      duration: 11,
      intro: 'Dobry cel na 14 dni opisuje, co Ty zrobisz — nie to, co zrobią klienci, konkurencja czy urząd.',
      reading: {
        paragraphs: [
          'Sprawdź cel czterema pytaniami. Czy zależy tylko ode mnie? Czy opisuje działanie, które ktoś mógłby zobaczyć? Czy ma miarę — liczbę albo sposób sprawdzenia? Czy ma termin?',
          '„Chcę mieć więcej klientów” nie przechodzi żadnego pytania. „Przez 14 dni po każdej naprawie poproszę klienta o opinię w mapach i zapiszę, ile osób to zrobiło” przechodzi wszystkie cztery. Liczba opinii nie zależy od Ciebie — prośba już tak.',
        ],
      },
      activities: [
        {
          type: 'spotErrors',
          id: 'm1-cele',
          title: 'Cele zapisane przez uczestników po pierwszym spotkaniu',
          context: 'Zaznacz cele, które trzeba przepisać.',
          lines: [
            { text: 'Klienci zaczną płacić faktury w terminie.', error: 'Zależy od klientów. Lepiej: „Do piątku ustawię przypomnienie o płatności 3 dni przed terminem dla każdej faktury”.' },
            { text: 'Przez dwa tygodnie codziennie o 17:00 zapiszę przychody z dnia w arkuszu.' },
            { text: 'Będę lepiej zarządzać czasem.', error: 'Bez działania, miary i terminu. Co konkretnie zrobisz inaczej?' },
            { text: 'Do 30 listopada zadzwonię do pięciu byłych klientów z pytaniem, czego im brakowało.' },
            { text: 'Konkurencja przestanie zaniżać ceny.', error: 'Nie masz na to wpływu. Możesz zmienić swoją ofertę albo sposób, w jaki mówisz o cenie.' },
          ],
          explanation: 'Trzy cele do poprawy: zależny od klientów, ogólnikowy i zależny od konkurencji. Dwa pozostałe mają działanie, miarę i termin.',
        },
        choice(
          'm1-wiecej-klientow',
          'Jak przepisać cel „Chcę więcej klientów” na cel na 14 dni?',
          [
            'Do końca miesiąca zdobędę 20 nowych klientów',
            'Przez 14 dni po każdej naprawie poproszę o opinię w mapach i zapiszę, ile osób to zrobiło',
            'Będę częściej publikować w mediach społecznościowych',
          ],
          1,
          'Prośbę o opinię możesz zrobić zawsze, a zapis pokaże, czy działa. Liczba nowych klientów zależy też od nich.',
          ['Liczba nowych klientów nie zależy tylko od Ciebie — i nie wiadomo, co masz zrobić, żeby ich było 20.', null, 'Brak konkretnego działania, miary i terminu.'],
        ),
        {
          type: 'projectField',
          id: 'm1-pole-cel',
          field: 'm1-0',
          label: 'Mój cel na 14 dni — zachowanie i miernik',
          prompt: 'Jeśli nie prowadzisz firmy, wybierz cel związany z pomysłem albo z nauką, np. pięć rozmów z potencjalnymi klientami.',
          example: 'Przez 14 dni odbieram telefony tylko w godzinach 8–9 i 16–17. Codziennie zapisuję, o której skończyłam ostatnią naprawę.',
        },
      ],
    },
    {
      id: 'informacja-zwrotna',
      label: 'Feedback',
      title: 'Informacja zwrotna, która pomaga',
      duration: 10,
      intro: 'W grupie będziesz słuchać pomysłów innych i mówić, co o nich myślisz. Sposób, w jaki to powiesz, decyduje, czy ktoś coś z tego weźmie.',
      reading: {
        paragraphs: [
          'Obserwacja opisuje, co widać albo słychać: „W prezentacji trzy razy padło słowo «innowacyjny», a nie padła cena”. Interpretacja to wniosek o osobie: „Jesteś chaotyczny”. Z obserwacją można coś zrobić, z oceną — tylko się bronić.',
          'Prosta kolejność: zapytaj, czy ktoś chce informację zwrotną. Opisz, co widać lub słychać. Powiedz, jaki to ma skutek dla słuchacza. Zapytaj, co ta osoba z tym zrobi.',
        ],
      },
      activities: [
        {
          type: 'matching',
          id: 'm1-obserwacja',
          question: 'Obserwacja czy interpretacja?',
          options: ['Obserwacja', 'Interpretacja'],
          rows: [
            { label: 'Wypowiedź trwała 4 minuty, a mieliśmy 2', correct: 0 },
            { label: 'Nie szanujesz cudzego czasu', correct: 1 },
            { label: 'Nie padło, ile kosztuje usługa', correct: 0 },
            { label: 'Twój pomysł jest mało przemyślany', correct: 1 },
            { label: 'Na slajdzie było 9 punktów', correct: 0 },
          ],
          explanation: 'Obserwację można sprawdzić — zegarkiem, nagraniem, slajdem. Interpretacja mówi o osobie i łatwo ją odrzucić.',
        },
        {
          type: 'dialog',
          id: 'm1-feedback',
          title: 'Informacja zwrotna po pitchu Kuby',
          context: 'Kuba przedstawił swój pomysł na mobilną naprawę rowerów. Mówił długo, nie podał ceny. Teraz Twoja kolej.',
          start: 'n1',
          nodes: {
            n1: {
              speaker: 'Kuba',
              text: 'No i jak wypadłem?',
              choices: [
                { text: 'Szczerze? Słabo, za długo.', next: 'n2', good: false, feedback: 'Ocena bez konkretu. Kuba nie wie, co dokładnie zmienić.' },
                { text: 'Mogę powiedzieć, co widzę i co było dla mnie niejasne?', next: 'n2', good: true, feedback: 'Pytasz o zgodę — Kuba jest gotowy słuchać.' },
                { text: 'Super, nic bym nie zmieniał!', next: 'n2', good: false, feedback: 'Miłe, ale Kuba nic z tego nie wyniesie.' },
              ],
            },
            n2: {
              speaker: 'Kuba',
              text: 'Jasne, mów.',
              choices: [
                { text: 'Wypowiedź trwała około czterech minut i nie padła cena za przegląd. Jako klient nie wiem, czy mnie stać.', next: 'n3', good: true, feedback: 'Obserwacja i skutek dla słuchacza. Konkretne i do sprawdzenia.' },
                { text: 'Widać, że nie masz jeszcze przemyślanego biznesu.', next: 'n3', good: false, feedback: 'Interpretacja o osobie. Kuba będzie się bronił.' },
              ],
            },
            n3: {
              speaker: 'Kuba',
              text: 'Faktycznie, o cenie zapomniałem.',
              choices: [
                { text: 'To dopisz cenę i skróć o połowę.', next: 'end', good: false, feedback: 'Gotowa rada. Lepiej, żeby Kuba sam zdecydował, co zmieni.' },
                { text: 'Co zmienisz przed następnym razem?', next: 'end', good: true, feedback: 'Decyzja zostaje u Kuby — tak jak w kroku Will.' },
              ],
            },
            end: { end: true, text: 'Kuba postanawia zacząć od ceny i jednego zdania o tym, dla kogo jest usługa. Następny pitch mieści się w 90 sekundach.' },
          },
        },
      ],
    },
    {
      id: 'przypadek',
      label: 'Przypadek',
      title: 'Narzędzie z zewnątrz — użyte z głową',
      duration: 10,
      intro: 'Coaching pomaga podejmować własne decyzje. Podobnie działa dobrze dobrane narzędzie z zewnątrz: nie decyduje za Ciebie, ale zdejmuje część niepewności. Przypadek jest fikcyjny.',
      reading: {
        paragraphs: [
          'Kasia prowadzi z Poznania sklep internetowy z kosmetykami dla salonów fryzjerskich. Salony chcą płacić przelewem za 30 dni, a Kasia płaci hurtowni od razu. Im lepiej idzie sprzedaż, tym mniej gotówki ma na koncie. Wymaganie przedpłaty odstrasza salony, a czekanie 30 dni na każdą fakturę blokuje zakupy towaru.',
          'Kasia sprawdza usługę odroczonej płatności dla firm (działa podobnie jak faktoring): firma zewnętrzna płaci jej za fakturę od razu, potrąca prowizję, a salon spłaca fakturę po 30 dniach. Zanim podpisze umowę, Kasia liczy, ile prowizja zabierze z marży, i ustala, że wróci do tej decyzji po trzech miesiącach. To decyzja strategiczna, a nie reakcja na pusty rachunek.',
          'Z tego przypadku płyną cztery wnioski: firma może rosnąć bez dodatkowego długu, narzędzie z zewnątrz pomaga podjąć konkretną decyzję, innowację wprowadza się z planem, a nie w panice, i rozwój idzie krok po kroku.',
        ],
      },
      activities: [
        number('m1-prowizja', 'Salon zamawia towar za 4000 zł. Marża Kasi to 25% (1000 zł), a prowizja za odroczoną płatność — 2% wartości faktury. Ile zostanie Kasi z marży po prowizji?', 920, 'Prowizja: 2% × 4000 = 80 zł. Z marży zostaje 1000 − 80 = 920 zł, ale pieniądze są na koncie od razu.', {
          unit: 'zł',
          tolerance: 0,
          mistakes: [
            { value: 3920, text: 'To kwota, którą Kasia dostanie za całą fakturę. Pytanie dotyczy tego, co zostaje z marży.' },
            { value: 980, text: 'Tu prowizję policzono od marży. Liczy się ją od wartości faktury: 2% × 4000 zł.' },
          ],
        }),
        choice(
          'm1-strategicznie',
          'Kiedy wprowadzenie takiego narzędzia jest decyzją strategiczną, a nie reakcją na kłopot?',
          [
            'Gdy na koncie zostało 200 zł, a jutro trzeba zapłacić hurtowni',
            'Gdy Kasia policzyła prowizję wobec marży, sprawdziła warunki umowy i wyznaczyła termin oceny efektu',
            'Gdy konkurencja już z niego korzysta, więc trzeba szybko zrobić to samo',
          ],
          1,
          'Decyzja strategiczna ma liczby, warunki i datę sprawdzenia. Narzędzie służy celowi, który Kasia sama ustaliła.',
          [
            'To reakcja pod presją. Umowę podpisuje się wtedy bez porównania warunków.',
            null,
            'Naśladowanie to nie strategia. U Kasi marża i klienci mogą wyglądać inaczej.',
          ],
        ),
      ],
    },
    {
      id: 'coach-corner',
      label: 'Coach Corner',
      title: 'Pięć pytań do siebie',
      duration: 12,
      intro: 'Nie musisz jeszcze znać odpowiedzi. Liczy się, że zapiszesz to, co wiesz dziś. Do tych pytań wrócisz w kolejnych modułach. Odpowiedzi zostają tylko w tej przeglądarce.',
      activities: [
        text('m1-cc-zmiana', 'Jaka jedna zmiana, którą możesz wprowadzić od jutra, przybliży Twoją firmę lub pomysł do stabilnego rozwoju?', 'Na przykład: przestanę odbierać telefony podczas napraw i ustawię dwie stałe godziny na rozmowy.', { minLength: 15 }),
        text('m1-cc-przeszkoda', 'Co Cię powstrzymuje przed niektórymi decyzjami? Strach, brak czasu, brak informacji, czyjaś opinia?', 'Na przykład: boję się, że gdy podniosę ceny, stali klienci odejdą — a nie sprawdziłam, ilu ich naprawdę jest.', { minLength: 15 }),
        text('m1-cc-zasoby', 'Gdyby nie brakowało Ci żadnych zasobów, jaki byłby pierwszy krok? Który kawałek tego kroku możesz zrobić już teraz?', 'Na przykład: pierwszy krok to osobny warsztat. Teraz mogę policzyć, ile godzin tygodniowo tracę na dojazdy z rowerami.', { minLength: 15 }),
        text('m1-cc-wlasne', 'Po czym poznasz, że realizujesz własne rozwiązania, a nie oczekiwania innych?', 'Na przykład: po tym, że potrafię wyjaśnić, dlaczego wybrałam tę drogę, bez powoływania się na to, co „wypada”.', { minLength: 15 }),
        text('m1-cc-wsparcie', 'Jakie wsparcie z zewnątrz byłoby teraz najcenniejsze? Od kogo możesz je dostać?', 'Na przykład: rozmowa z kimś, kto prowadzi serwis od kilku lat — zapytam w cechu rzemiosł, czy mają mentora.', { minLength: 15 }),
      ],
    },
    {
      id: 'plan',
      label: 'Plan',
      title: 'Twój plan na 14 dni',
      duration: 10,
      intro: 'Złóż to, co już masz, w krótki kontrakt ze sobą. Pola zapisują się w „Moim projekcie”, skąd możesz je wydrukować albo wyeksportować.',
      activities: [
        { type: 'projectField', id: 'm1-pole-sytuacja', field: 'm1-1', label: 'Sytuacja dzisiaj — fakty, ograniczenia, zasoby', example: 'Sezon: 22 telefony dziennie, kończę po 20:00. Mam stałych klientów i dobre opinie. Nie mam pracownika ani recepcji.' },
        { type: 'projectField', id: 'm1-pole-opcje', field: 'm1-2', label: 'Trzy możliwe sposoby działania', example: '1) Stałe godziny telefonów. 2) Zapisy przez formularz na stronie. 3) Automatyczna wiadomość z terminem odbioru.' },
        { type: 'projectField', id: 'm1-pole-krok', field: 'm1-3', label: 'Wybrany pierwszy krok i termin', example: 'Od poniedziałku telefony tylko 8–9 i 16–17. Informacja na drzwiach i na stronie do niedzieli.' },
        { type: 'projectField', id: 'm1-pole-wsparcie', field: 'm1-4', label: 'Potrzebne wsparcie i zasady poufności', example: 'Partner odbiera telefony w sobotę. W grupie mówię o godzinach pracy, nie o zarobkach.' },
        { type: 'projectField', id: 'm1-pole-sprawdzenie', field: 'm1-5', label: 'Data sprawdzenia efektu i pytanie do coacha', example: 'Sprawdzam 15 listopada: o której kończyłam pracę? Pytanie: co zrobić, gdy klient dzwoni poza godzinami?' },
      ],
    },
  ],
};
