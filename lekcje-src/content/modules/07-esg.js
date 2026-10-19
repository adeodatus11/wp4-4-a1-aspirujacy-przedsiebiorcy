import { choice, number, text } from '../schema.js';

export default {
  id: 'm7',
  n: 7,
  topic: 'Zrównoważony rozwój i ESG',
  title: 'Mniej strat, więcej wartości',
  subtitle: 'Dlaczego ESG dotyczy też małych firm, co obejmują E, S i G, czym VSME różni się od obowiązkowych standardów — i sześć kroków na przykładzie kawiarni: ocena sytuacji, pomiar, cel, działanie, raport i uczciwy komunikat.',
  duration: 210,
  outcome: 'Plan jednego działania ESG z wartością bazową i miernikiem.',
  realia: ['vsme', 'greenwashing'],
  objectives: [
    'Wyjaśniam, dlaczego ESG dociera do małych firm przez łańcuch dostaw, i odróżniam CSRD, ESRS, CSDDD i VSME.',
    'Rozpoznaję tematy E, S i G i widzę, co moja firma już robi.',
    'Wiem, jakie dane obejmuje raport i skąd je wziąć w małej firmie.',
    'Przeprowadzam prostą ocenę sytuacji: trzy mocne i trzy słabe strony.',
    'Robię pomiar bazowy, wybieram jeden mierzalny cel i plan z osobą odpowiedzialną.',
    'Porównuję wynik absolutny i wynik na jednostkę działalności.',
    'Przygotowuję uproszczony raport i komunikat bez ogólnych haseł ekologicznych.',
  ],
  forGroup:
    'Na spotkanie weź trzy mocne i trzy słabe strony z oceny sytuacji oraz swój pomiar bazowy: liczbę, jednostkę, okres i źródło. Zacznijcie od wymiany: kto już coś wdrożył i ile to kosztowało albo zaoszczędziło. Potem każda osoba mówi w jednym zdaniu, co zmierzy i jak — pozostali szukają, co może zniekształcić porównanie. Na koniec przeczytajcie swoje komunikaty i wykreślcie każde słowo, którego nie da się sprawdzić.',
  solo:
    'Bez grupy: zbierz z faktur zużycie prądu, wody i odpadów za ostatni rok, a potem zrób pomiar bazowy przez tydzień, zanim cokolwiek zmienisz — to najczęściej pomijany krok. Wynik zapisuj codziennie w tej samej kartce. Komunikat pokaż komuś spoza firmy i zapytaj, co ta osoba z niego zrozumiała. Jeśli usłyszysz „że jesteście eko”, komunikat jest za ogólny.',
  source: {
    file: '07_Modul_7_ESG_zrownowazony_rozwoj.md',
    covers: [
      ['2. Kontekst regulacyjny', 'dlaczego'],
      ['3. ESG i trzy filary', 'obszary'],
      ['3. ESG i trzy filary', 'esrs-vsme'],
      ['4. ESG w wersji uproszczonej', 'esrs-vsme'],
      ['4. ESG w wersji uproszczonej', 'kontrahent'],
      ['5. Co konkretnie firma musi raportować', 'wskazniki'],
      ['6. Studia przypadków', 'przypadki'],
      ['7. Jak MŚP może zacząć', 'kroki'],
      ['7. Jak MŚP może zacząć', 'screening'],
      ['7. Jak MŚP może zacząć', 'cel'],
      ['7. Jak MŚP może zacząć', 'dzialanie'],
      ['7. Jak MŚP może zacząć', 'raport'],
      ['7. Jak MŚP może zacząć', 'komunikat'],
      ['8. Jak ustalić sytuację własnej firmy w Polsce', 'twoja-firma'],
    ],
  },
  sections: [
    {
      id: 'dlaczego',
      label: 'Dlaczego teraz',
      title: 'Dlaczego ESG dotyczy także małych firm',
      duration: 14,
      intro: 'Dwa przekonania często zamykają temat, zanim się zacznie: „ESG to sprawa korporacji” i „to tylko koszt i biurokracja”. Ten moduł pokazuje, dlaczego oba są mylące — i jak zacząć małymi krokami.',
      reading: {
        paragraphs: [
          'Zrównoważony rozwój to temat od lat 90., ale dziś trudno go ominąć. Gospodarka zużywa za dużo zasobów, wytwarza ogromne ilości odpadów, zanieczyszcza powietrze, wodę i glebę, a skutki zmian klimatu i nierówności widać coraz wyraźniej. Odpowiedzią są kolejne ramy: Cele Zrównoważonego Rozwoju ONZ (2015), Europejski Zielony Ład (ogłoszony pod koniec 2019 r.) i unijne przepisy o raportowaniu.',
          'Te przepisy to kilka różnych rzeczy. CSRD to dyrektywa o raportowaniu zrównoważonego rozwoju przez duże firmy, ESRS — szczegółowe standardy takiego raportu, a CSDDD — dyrektywa o należytej staranności w łańcuchu dostaw. Ich zakres UE zawęziła pakietem Omnibus, a stan na dziś trzeba sprawdzać na bieżąco. Mikro- i małe firmy co do zasady nie są objęte obowiązkiem raportowania.',
          'Mimo to temat do nich dociera — przez łańcuch dostaw. Duży klient, bank albo sieć handlowa musi zebrać dane od dostawców, więc pyta także małą firmę. A większość działań, od których się zaczyna (mniej prądu, papieru, odpadów), od razu obniża koszty.',
        ],
      },
      activities: [
        {
          type: 'matching',
          id: 'm7-instrumenty',
          question: 'Co oznacza każdy skrót lub nazwa?',
          options: ['Cele ONZ (SDG)', 'Europejski Zielony Ład', 'CSRD', 'ESRS', 'CSDDD'],
          rows: [
            { label: 'Szczegółowe standardy, według których duża firma przygotowuje raport', correct: 3 },
            { label: '17 globalnych celów rozwojowych przyjętych w 2015 r.', correct: 0 },
            { label: 'Dyrektywa o należytej staranności wobec ludzi i środowiska w łańcuchu dostaw', correct: 4 },
            { label: 'Strategia UE na rzecz neutralnej klimatycznie Europy', correct: 1 },
            { label: 'Dyrektywa o raportowaniu zrównoważonego rozwoju przez duże firmy', correct: 2 },
          ],
          explanation: 'To różne instrumenty: cele globalne, strategia UE, dwie dyrektywy i standard raportowania. Żaden z nich nie nakłada na każdą małą firmę obowiązku pełnego raportu.',
        },
        choice(
          'm7-mit',
          'Właściciel warsztatu mówi: „ESG? To nie dla mnie, to dla korporacji”. Co jest najbliższe prawdy?',
          [
            'Ma rację — małej firmy ten temat w ogóle nie dotyczy',
            'Każda mała firma musi od tego roku publikować raport ESG',
            'Duzi klienci i banki zbierają dane od dostawców, więc pytania trafią i do niego; a wiele działań obniża koszty',
            'To wyłącznie koszt, który warto odkładać jak najdłużej',
          ],
          2,
          'Obowiązku pełnego raportu zwykle nie ma, ale pytania z łańcucha dostaw — tak. Pierwsze kroki to często oszczędności, nie wydatki.',
          [
            'Temat dociera przez klientów, banki i partnerów, nawet bez obowiązku ustawowego.',
            'Nieprawda. Mikro- i małe firmy co do zasady nie są objęte obowiązkiem raportowania według CSRD.',
            null,
            'Mniej prądu, papieru i odpadów to niższe rachunki. Odkładanie tematu może też kosztować klienta, który pyta o dane.',
          ],
        ),
      ],
    },
    {
      id: 'obszary',
      label: 'E, S, G',
      title: 'Trzy obszary — wybierz jeden, na który masz wpływ',
      duration: 16,
      intro: 'Mała kawiarnia we Wrocławiu codziennie wyrzuca niesprzedane wypieki. Właścicielka chce to zmienić, ale nie od kupowania nowego sprzętu. Przykład jest fikcyjny.',
      reading: {
        paragraphs: [
          'Trzy litery ESG to trzy wymiary zrównoważonego rozwoju. E (środowisko): zużycie energii, zmiany klimatu, odpady i gospodarka o obiegu zamkniętym, zanieczyszczenia, woda, bioróżnorodność. S (ludzie): prawa pracownicze, różnorodność, godzenie pracy z życiem prywatnym, prawa człowieka, relacje ze społecznością lokalną. G (zarządzanie): przejrzyste prowadzenie firmy, etyczne praktyki, przeciwdziałanie korupcji, sprawdzanie osób na stanowiskach kierowniczych i to, kto podejmuje decyzje.',
          'W małej firmie te tematy wyglądają zwyczajnie: rachunek za prąd, segregacja śmieci, szkolenie nowej osoby, umowa spisana na piśmie, zasada, kto zatwierdza wydatki. Większość firm część z tego już robi — tylko tego nie nazywa ani nie mierzy.',
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
          type: 'checklist',
          id: 'm7-juz-robie',
          question: 'Co z tego Twoja firma (albo Ty jako przyszła firma) już robi? Zaznacz dla siebie — to punkt wyjścia, nie ocena.',
          items: [
            'E: segregujemy odpady',
            'E: wiemy, ile płacimy za prąd i wodę w miesiącu',
            'S: nowe osoby dostają instruktaż stanowiskowy',
            'S: pomagamy w lokalnych inicjatywach',
            'G: umowy z klientami i dostawcami są na piśmie',
            'G: jest jasne, kto zatwierdza większe wydatki',
          ],
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
      id: 'esrs-vsme',
      label: 'ESRS a VSME',
      title: 'Pełny raport a uproszczony standard dla MŚP',
      duration: 14,
      intro: 'Duża firma objęta przepisami przygotowuje raport według ESRS. Mała może skorzystać z dobrowolnego VSME. Różnica jest ogromna.',
      reading: {
        paragraphs: [
          'Firma objęta obowiązkiem musi mieć strategię ESG: ocenić sytuację, ustalić cele, zaplanować działania i opublikować raport według ESRS — z analizą istotności, ryzyk, rozmowami z interesariuszami i setkami wskaźników, a do tego z weryfikacją zewnętrzną. To praca na miesiące i dla zespołu.',
          'VSME to dobrowolny standard EFRAG (tej samej organizacji, która przygotowała ESRS) dla firm nienotowanych na giełdzie. Jest ustandaryzowany, prostszy i skalowalny: ma moduł podstawowy (Basic) z minimum danych i moduł rozszerzony (Comprehensive) z informacjami, o które pytają banki, inwestorzy i partnerzy.',
          'Zaczynaj od modułu podstawowego, i to dopiero wtedy, gdy ktoś pyta o dane albo sama firma chce je mieć. Do rozszerzonego przechodzi się, gdy wymaga tego finansowanie lub konkretny partner. Start od pełnego zakresu to najczęstszy sposób na zniechęcenie małej firmy.',
        ],
      },
      activities: [
        {
          type: 'matching',
          id: 'm7-standardy',
          question: 'Do czego pasuje każdy opis?',
          options: ['ESRS', 'VSME — moduł podstawowy', 'VSME — moduł rozszerzony'],
          rows: [
            { label: 'Minimum danych dla małej firmy, od którego warto zacząć', correct: 1 },
            { label: 'Setki wskaźników i analiza istotności w firmie objętej obowiązkiem', correct: 0 },
            { label: 'Dodatkowe dane, o które pytają banki i inwestorzy', correct: 2 },
            { label: 'Raport z obowiązkową weryfikacją zewnętrzną', correct: 0 },
            { label: 'Pierwszy raport firmy, która dopiero zaczyna zbierać dane', correct: 1 },
          ],
          explanation: 'ESRS to obowiązkowy, bardzo szeroki standard dla firm objętych przepisami. VSME jest dobrowolny i dwustopniowy: najpierw podstawowy, rozszerzony wtedy, gdy ktoś go potrzebuje.',
        },
        choice(
          'm7-od-czego',
          'Hurtownia, której kawiarnia jest klientem i dostawcą, prosi o „dane ESG”. Od czego zacząć?',
          [
            'Od pełnego raportu według ESRS — żeby mieć wszystko',
            'Od razu od modułu rozszerzonego VSME, bo jest bardziej profesjonalny',
            'Od niczego — poczekać, aż pojawi się przepis',
            'Od modułu podstawowego VSME w zakresie, o który hurtownia faktycznie prosi',
          ],
          3,
          'Moduł podstawowy to minimum, które zwykle wystarcza w łańcuchu dostaw. Zakres ustal z hurtownią.',
          [
            'Nieproporcjonalny wysiłek: ESRS powstał dla dużych firm objętych obowiązkiem.',
            'Za szeroko na start. Do rozszerzonego przechodzi się, gdy wymaga go bank lub partner.',
            'Prośba klienta to sprawa handlowa, nie prawna. Czekanie może kosztować klienta.',
            null,
          ],
        ),
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
      id: 'twoja-firma',
      label: 'Twoja firma',
      title: 'Jak ustalić sytuację własnej firmy w Polsce',
      duration: 12,
      intro: 'Zanim zaczniesz cokolwiek raportować, ustal, czego naprawdę dotyczą Twoje obowiązki, a czego oczekują partnerzy.',
      reading: {
        paragraphs: [
          'Opisz formę, wielkość i rolę firmy w łańcuchu dostaw: komu sprzedajesz, kto od Ciebie kupuje. Oddziel trzy rzeczy: obowiązek ustawowy, dobrowolne raportowanie i warunki współpracy z kontrahentem (np. zapis w umowie). Aktualne wymagania sprawdzaj w materiałach PARP i w przepisach, a przy wątpliwościach — u specjalisty.',
          'Gdy partner prosi o dane, ustal zakres, cel, okres i podstawę prośby. Nie zakładaj od razu, że potrzebny jest pełny raport. I pamiętaj: dobrowolny VSME nie znosi innych obowiązków firmy, np. ewidencji odpadów czy przepisów BHP. Opracowanie bazowe opisywało progi i terminy innego kraju — w Polsce ich nie stosuj.',
        ],
      },
      activities: [
        {
          type: 'multi',
          id: 'm7-pytania-partnera',
          question: 'Kontrahent prosi o dane ESG. O co warto go zapytać, zanim zaczniesz je zbierać?',
          options: [
            'Jakich dokładnie danych potrzebuje',
            'W jakim celu ich użyje',
            'Ile zarabia jego zarząd',
            'Za jaki okres mają być dane',
            'Czy prośba wynika z przepisu, umowy czy wewnętrznej polityki',
            'Czy może przygotować raport za Ciebie',
          ],
          correct: [0, 1, 3, 4],
          explanation: 'Zakres, cel, okres i podstawa prośby pozwolą przygotować dokładnie to, czego potrzeba — zamiast pełnego raportu na zapas.',
        },
        text(
          'm7-moja-sytuacja',
          'Opisz swoją firmę w czterech punktach: forma i wielkość, komu sprzedajesz, kto już pytał (albo może zapytać) o dane środowiskowe lub społeczne, gdzie podejrzewasz największe marnotrawstwo.',
          'Na przykład: JDG, 2 osoby na umowę zlecenia. Sprzedaję wypieki kawiarniom i hotelowi. Hotel przysłał w zeszłym roku ankietę o energii i odpadach. Największe marnotrawstwo: niesprzedane wypieki i piec włączony od rana.',
          { minLength: 30 },
        ),
      ],
    },
    {
      id: 'wskazniki',
      label: 'Wskaźniki',
      title: 'Co konkretnie się mierzy i skąd wziąć dane',
      duration: 16,
      intro: 'Raport ESG to w praktyce zestaw liczb i krótkich opisów. W małej firmie większość z nich jest na fakturach i w dokumentach, które już masz.',
      reading: {
        paragraphs: [
          'Środowisko: zużycie i rodzaj energii (także odnawialnej — panele, umowa na zieloną energię), emisje gazów cieplarnianych i zanieczyszczeń, zużycie wody, ilość odpadów i ich segregacja, zrównoważone zakupy (lokalne surowce, opakowania). Emisje małej firmy zwykle się szacuje — z zużycia prądu, gazu i paliwa przemnożonego przez wskaźniki emisji publikowane w Polsce przez KOBiZE.',
          'Ludzie: bezpieczeństwo i zdrowie w pracy, wynagrodzenia i rozwój, równe szanse i rozwiązania przyjazne rodzinie, relacje ze społecznością. Zarządzanie: regularna rachunkowość i jasne decyzje, zasady antykorupcyjne lub kodeks etyczny, plan długoterminowy i zarządzanie ryzykiem.',
          'Przykłady z opracowania: piekarnia z odzyskiem ciepła z pieca zużywa o 20% mniej energii; firma usługowa daje pracownikom jeden dzień w miesiącu na wolontariat; mała firma IT publikuje kodeks etyczny i prosi dostawców o jego podpisanie.',
        ],
      },
      activities: [
        {
          type: 'matching',
          id: 'm7-zrodla-danych',
          question: 'Skąd mała firma najprościej weźmie każdą z tych danych?',
          options: ['Faktury za energię', 'Faktury za wodę', 'Umowa i dokumenty wywozu odpadów', 'Dokumentacja BHP', 'Księgowość i zasady w firmie'],
          rows: [
            { label: 'Liczba wypadków przy pracy w roku', correct: 3 },
            { label: 'Zużycie prądu w kWh za ostatni rok', correct: 0 },
            { label: 'Ilość i rodzaje odpadów', correct: 2 },
            { label: 'Kto zatwierdza wydatki i jak prowadzona jest rachunkowość', correct: 4 },
            { label: 'Pobór wody w m³', correct: 1 },
          ],
          explanation: 'Na start nie potrzeba nowych systemów. Faktury, umowy i dokumentacja BHP dają większość danych modułu podstawowego.',
        },
        number('m7-piekarnia', 'Piekarnia płaci za energię pieca 2500 zł miesięcznie. Odzysk ciepła zmniejsza zużycie o 20%. Ile piekarnia oszczędza w ciągu roku?', 6000, '2500 × 20% = 500 zł miesięcznie, × 12 = 6000 zł rocznie.', {
          unit: 'zł',
          tolerance: 0,
          mistakes: [
            { value: 500, text: 'To oszczędność miesięczna. Pytanie dotyczy roku.' },
            { value: 24000, text: 'To roczny koszt energii po zmianie, a nie oszczędność.' },
          ],
        }),
      ],
    },
    {
      id: 'przypadki',
      label: 'Trzy przypadki',
      title: 'Trzy przypadki: korzyść dla środowiska i dla firmy',
      duration: 18,
      intro: 'Opracowanie modułu pokazuje trzy małe firmy. W każdej korzyść środowiskowa idzie w parze z oszczędnością.',
      reading: {
        paragraphs: [
          'Zielone biuro: biuro rachunkowe przeszło na faktury i archiwum w formie elektronicznej i włączyło w to klientów. Zużycie papieru spadło o 70%, a z nim zakupy, miejsce na segregatory, odpady i koszty przesyłek.',
          'Efektywność energetyczna: mały zakład produkcyjny wymienił oświetlenie na LED z czujnikami ruchu. Zużycie prądu spadło w rok o 30% — mniejsze rachunki i mniejsze emisje.',
          'Relacje ze społecznością: restauracja oddaje niewykorzystaną żywność lokalnej organizacji, która pomaga osobom w potrzebie. Mniej odpadów i lepsza opinia w okolicy. W Polsce takie przekazanie warto ustalić z organizacją na piśmie, łącznie z zasadami bezpieczeństwa żywności.',
        ],
      },
      activities: [
        number('m7-papier', 'Biuro kupowało 30 ryz papieru miesięcznie po 22 zł. Po przejściu na dokumenty elektroniczne zużywa o 70% mniej. Ile oszczędza na samym papierze w ciągu roku?', 5544, '30 × 22 = 660 zł miesięcznie, × 12 = 7920 zł rocznie. 70% z tego to 5544 zł.', {
          unit: 'zł',
          tolerance: 1,
          mistakes: [
            { value: 7920, text: 'To cały roczny koszt papieru przed zmianą. Oszczędność to 70% tej kwoty.' },
            { value: 462, text: 'To oszczędność miesięczna. Pomnóż przez 12.' },
          ],
        }),
        number('m7-led', 'Zakład płacił za prąd 36 000 zł rocznie. Po wymianie oświetlenia na LED z czujnikami rachunek spadł o 30%. Wymiana kosztowała 21 600 zł. Po ilu latach inwestycja się zwróci?', 2, 'Oszczędność: 36 000 × 30% = 10 800 zł rocznie. 21 600 ÷ 10 800 = 2 lata.', {
          unit: 'lata',
          tolerance: 0.01,
          mistakes: [
            { value: 0.5, text: 'Tu podzielono oszczędność przez koszt. Okres zwrotu to koszt ÷ roczna oszczędność.' },
            { value: 0.6, text: 'Tu podzielono koszt przez cały rachunek, a nie przez oszczędność.' },
          ],
        }),
        choice(
          'm7-wspolne',
          'Co łączy trzy przypadki?',
          [
            'Każdy wymagał dużej inwestycji i dotacji',
            'W każdym korzyść środowiskowa idzie razem z ekonomiczną lub wizerunkową',
            'Każdy dotyczy wyłącznie obszaru G',
            'Każdy wymagał pełnego raportu ESG przed startem',
          ],
          1,
          'ESG w małej firmie to najczęściej optymalizacja: mniej zużytych zasobów to niższe koszty. Od tego warto zaczynać rozmowę.',
          [
            'Wymiana papieru na pliki i oddawanie żywności prawie nic nie kosztują. LED zwraca się w ok. 2 lata.',
            null,
            'Papier i prąd to E, oddawanie żywności to E i S.',
            'Żadna z firm nie zaczynała od raportu — zaczynały od działania.',
          ],
        ),
      ],
    },
    {
      id: 'kroki',
      label: 'Sześć kroków',
      title: 'Sześć kroków na własnym poziomie',
      duration: 10,
      intro: 'Opracowanie proponuje drogę w sześciu krokach. Mała firma przechodzi ją na swoją skalę — dalsza część modułu ćwiczy każdy krok na przykładzie kawiarni.',
      reading: {
        paragraphs: [
          'Ocena sytuacji (screening), cele, plan działania z osobą odpowiedzialną, zaangażowanie pracowników, zbieranie danych i uproszczony raport, komunikacja wyników. Kolejność ma znaczenie: najczęstszy błąd to zaczynanie od raportu albo od ogłoszenia, zanim cokolwiek się zmieniło.',
        ],
      },
      activities: [
        {
          type: 'sequence',
          id: 'm7-szesc-krokow',
          question: 'Ułóż sześć kroków w kolejności z opracowania.',
          items: [
            'Ocena sytuacji: mocne i słabe strony w E, S i G',
            'Wybór 1–2 mierzalnych celów na krótki czas',
            'Plan działania: co, kto, do kiedy',
            'Zaangażowanie pracowników',
            'Zbieranie danych i uproszczony raport',
            'Komunikacja celów i wyników',
          ],
          explanation: 'Najpierw wiedza o sobie, potem cel i działanie, dopiero na końcu raport i komunikat. Odwrócona kolejność kończy się deklaracjami bez pokrycia.',
        },
      ],
    },
    {
      id: 'screening',
      label: 'Screening',
      title: 'Ocena sytuacji: mocne i słabe strony',
      duration: 16,
      intro: 'Krok 1. Zanim zmierzysz cokolwiek dokładnie, przejdź się po firmie i zapisz, gdzie zużywasz zasoby i gdzie jest ryzyko.',
      reading: {
        paragraphs: [
          'Eco-mapping to prosty plan lokalu, na którym zaznaczasz: gdzie zużywa się prąd i ciepło, gdzie woda, gdzie powstają odpady, gdzie są hałas, zapachy, ryzyko dla ludzi. Macierz wpływu to tabela: działanie firmy, jaki ma wpływ, jak duży, czy masz na niego wpływ.',
          'Z obu narzędzi wypisz trzy mocne i trzy słabe strony w E, S i G. Słabe strony to kandydaci na pierwszy cel — wybierz tę, która kosztuje najwięcej albo najłatwiej ją zmierzyć.',
        ],
      },
      activities: [
        {
          type: 'multi',
          id: 'm7-eco-mapa',
          question: 'Notatki z obchodu kawiarni. Które z nich to słabe strony, od których warto zacząć?',
          options: [
            'Piec i ekspres włączone od 6:00, choć pierwsi klienci przychodzą o 8:00',
            'Odpady segregowane w trzech pojemnikach',
            'Kran przy zmywaku cieknie od miesiąca',
            'Nowe osoby nie mają instruktażu obsługi pieca',
            'Umowy z dostawcami spisane na piśmie',
          ],
          correct: [0, 2, 3],
          explanation: 'Dwie straty (prąd i woda) i jedno ryzyko dla ludzi. Segregacja i spisane umowy to mocne strony — warto je zapisać, bo to też dane do raportu.',
        },
        text(
          'm7-moj-screening',
          'Wypisz trzy mocne i trzy słabe strony swojej firmy (albo pomysłu) w obszarach E, S i G.',
          'Na przykład: mocne — segregujemy odpady (E), każda nowa osoba ma instruktaż (S), umowy na piśmie (G). Słabe — piec grzeje od 6:00 (E), wyrzucamy wypieki codziennie (E), brak zasady, kto zatwierdza zakupy powyżej 1000 zł (G).',
          { minLength: 40 },
        ),
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
      id: 'cel',
      label: 'Cel i koszt',
      title: 'Cel na 30 dni i ile to kosztuje',
      duration: 13,
      intro: 'Cel w tej samej jednostce co pomiar bazowy pozwoli po miesiącu odpowiedzieć „tak” albo „nie”, bez dyskusji.',
      reading: {
        paragraphs: [
          'Krok 2 z sześciu: wybierz jeden, najwyżej dwa cele — konkretne, osiągalne w krótkim czasie i mierzalne. Przykłady z opracowania: o połowę mniej papieru, rachunek za energię niższy o 10%, szkolenie dla zespołu. Lista dziesięciu celów zwykle kończy się tym, że nie powstaje żaden.',
        ],
      },
      activities: [
        choice(
          'm7-dobry-cel',
          'Który cel kawiarni spełnia warunki: jeden, krótkoterminowy, mierzalny?',
          [
            'Być bardziej ekologiczną kawiarnią',
            'Zmniejszyć odpady wypieków z 1,5 do 1,05 kg na 100 zamówień do 9 kwietnia',
            'Osiągnąć neutralność klimatyczną w tym roku',
            'Wdrożyć naraz dziesięć działań ESG z listy z internetu',
          ],
          1,
          'Jest wartość wyjściowa, wartość docelowa, jednostka i termin. Po miesiącu wiadomo, czy się udało.',
          [
            'Brak liczby i terminu — nie da się sprawdzić, czy cel osiągnięto.',
            null,
            'Cel poza zasięgiem małej firmy w rok i bez pomiaru emisji na start.',
            'Rozproszenie. Opracowanie wprost: 1–2 cele, zacznij od małych kroków.',
          ],
        ),
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
      id: 'dzialanie',
      label: 'Działanie',
      title: 'Jedno działanie i jedna osoba odpowiedzialna',
      duration: 15,
      intro: 'Z kartki pomiarów widać, że najwięcej zostaje z wypieków pieczonych po południu. To wskazówka, gdzie zmienić sposób pracy.',
      reading: {
        paragraphs: [
          'Dobre pierwsze działanie jest tanie, odwracalne i ma właściciela — konkretną osobę, która je wykonuje i pilnuje pomiaru. „Wszyscy bardziej uważamy” to nie działanie, bo nikt za nie nie odpowiada i nie da się go sprawdzić.',
          'Inwestycja w sprzęt może przyjść później, gdy wiesz już, gdzie powstaje strata. Kupienie urządzenia przed pomiarem często rozwiązuje nie ten problem.',
          'Krok 3 i 4: plan mówi, co robicie, kto odpowiada i do kiedy. Włącz w niego zespół — zapytaj ludzi, skąd biorą się straty i co proponują. To nie formalność: osoby przy piecu wiedzą najwięcej, a udział w decyzjach to także działanie z obszaru S.',
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
        choice(
          'm7-zespol',
          'Jak najlepiej włączyć zespół w zmianę?',
          [
            'Wysłać mailem nową zasadę: od jutra mniejsze partie',
            'Za każdy wyrzucony wypiek potrącać premię zmianie popołudniowej',
            'Pokazać zespołowi wyniki ważenia i zapytać zmianę popołudniową, skąd biorą się resztki i co proponuje',
            'Nie mówić nic, żeby nie robić zamieszania',
          ],
          2,
          'Ludzie przy piecu znają przyczyny strat. Gdy sami zaproponują rozwiązanie, chętniej go pilnują.',
          [
            'Zasada bez wyjaśnienia i bez pytania o zdanie — łatwo ją obejść.',
            'Kara sprawi, że odpady zaczną znikać z kartki, a nie z kosza.',
            null,
            'Bez zespołu nikt nie zmieni sposobu pieczenia ani nie zważy odpadów.',
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
      id: 'raport',
      label: 'Raport',
      title: 'Uproszczony raport i weryfikacja danych',
      duration: 12,
      intro: 'Krok 5. Hotel z początku modułu wciąż czeka na dane. Kawiarnia ma teraz pomiar, działanie i wynik — może przygotować krótki raport.',
      reading: {
        paragraphs: [
          'Uproszczony raport może mieć jedną, dwie strony albo kilka slajdów: okres i źródła danych, wartości bazowe, działania i osoby odpowiedzialne, wyniki, ograniczenia pomiaru. Układ warto oprzeć na module podstawowym VSME — wtedy łatwo go potem rozbudować.',
          'Wiarygodność rośnie, gdy dane sprawdzi ktoś z zewnątrz: księgowa porówna liczby z fakturami, doradca albo organizacja branżowa przejrzy raport. Raport pokaż też własnemu zespołowi — to jego praca.',
        ],
      },
      activities: [
        {
          type: 'multi',
          id: 'm7-raport-tresc',
          question: 'Co powinno się znaleźć w krótkim raporcie kawiarni dla hotelu?',
          options: [
            'Okres pomiaru i źródła danych',
            'Hasło „Jesteśmy kawiarnią eko”',
            'Wartość bazowa i wynik po zmianie',
            'Imiona i telefony stałych klientów',
            'Podjęte działanie i osoba odpowiedzialna',
            'Ograniczenia pomiaru',
          ],
          correct: [0, 2, 4, 5],
          explanation: 'Liczby z okresem i źródłem, działanie, wynik i uczciwe ograniczenia. Hasła i dane osobowe klientów nie mają tu miejsca.',
        },
        choice(
          'm7-weryfikacja',
          'Jak mała firma może zwiększyć wiarygodność swoich danych?',
          [
            'Napisać w raporcie, że dane są zweryfikowane',
            'Poprosić księgową o porównanie liczb z fakturami i kartami pomiarów',
            'Zaokrąglić wyniki tak, żeby wyglądały lepiej',
            'Pominąć źródła danych, żeby raport był krótszy',
          ],
          1,
          'Sprawdzenie przez osobę spoza zespołu to najprostsza forma weryfikacji zewnętrznej, dostępna dla każdej firmy.',
          [
            'Deklaracja bez sprawdzenia to ryzyko większe niż brak raportu.',
            null,
            'Upiększanie danych to wprowadzanie w błąd — i łatwo je wykryć przy porównaniu z fakturami.',
            'Bez źródeł nikt nie sprawdzi liczb, więc raport traci wartość.',
          ],
        ),
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
