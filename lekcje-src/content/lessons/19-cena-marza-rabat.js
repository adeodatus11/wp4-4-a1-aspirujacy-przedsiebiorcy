import { choice, methods, note, number, text } from '../schema.js';

export default {
  id: '19',
  order: 19,
  part: 'B',
  title: 'Cena, marża i rabat',
  subtitle: 'Ile sklep naprawdę zarabia na kurtce za 246 zł i przy jakim rabacie zaczyna dokładać.',
  duration: 45,
  sessions: [45],
  han: ['HAN.02.3'],
  tags: ['marża', 'narzut', 'VAT', 'rabat', 'Black Week'],
  realia: ['vatStawki', 'omnibus', 'niezgodnosc'],
  audience: {
    adults:
      'Zacznij od tego samego pytania o kurtkę — dorośli też najczęściej odpowiadają 86 zł. Osoby, które planują sklep albo sprzedaż przez internet, niech po etapie 3 policzą jeden własny towar: cenę zakupu, narzut i cenę brutto. Pytanie o rabat warto połączyć z ich doświadczeniem z wyprzedaży.',
  },
  format: {
    name: 'Przykład rozwiązany i ćwiczenia z natychmiastową informacją zwrotną',
    student:
      'Ustalasz ceny w sklepie sportowym po dostawie z hurtowni. Policzysz ceny trzech towarów, sprawdzisz wywieszkę na Black Week i zobaczysz, przy jakim rabacie sklep sprzedaje bez zysku.',
    teacher:
      'Lekcja zaczyna się od pytania, na które większość grupy odpowiada błędnie (86 zł zamiast 40 zł). Ten błąd jest punktem wyjścia do wyjaśnienia netto/brutto i podstawy procentu. Potem jeden przykład rozwiązany wspólnie, ćwiczenie w parach z dokumentem kalkulacji, rabat i wywieszka promocyjna, a na końcu samodzielne zadanie na nowych danych.',
    grouping:
      'Etapy 1, 2 i 5: cała grupa albo samodzielnie. Etapy 3 i 4: w parach — jedna osoba liczy, druga sprawdza wzór; przy kolejnym towarze zamiana. Osoba bez pary pracuje sama, platforma sprawdza każde pole.',
    methods: [methods.przyklady, methods.retrieval, methods.ksztaltujace],
  },
  objectives: [
    'Liczę cenę sprzedaży z ceny zakupu przy narzucie i przy marży.',
    'Przeliczam cenę netto na brutto i z powrotem.',
    'Sprawdzam, ile sklep zarobi po rabacie i przy jakim rabacie przestaje zarabiać.',
    'Znajduję błędy na wywieszce promocyjnej.',
  ],
  materials: [
    'Telefon, tablet albo komputer z przeglądarką (jedno urządzenie na parę wystarczy)',
    'Kalkulator, może być w telefonie',
    'Projektor do wspólnego przykładu (nie jest konieczny)',
  ],
  teacherGuide: {
    preparation:
      'Nic nie drukujesz. Wyświetl etap 1 i poproś o odpowiedź z głowy, bez kalkulatora. Zapisz na tablicy wszystkie wyniki, które padną — zwykle 86 zł, 46 zł i 40 zł. Wrócisz do nich w etapie 2. Przygotuj pary przed etapem 3.',
    summary:
      'Narzut liczy się od ceny zakupu, marżę od ceny sprzedaży. Sklep, który płaci VAT, liczy zysk na towarze w cenach netto. Rabat obniża cenę, ale nie koszt zakupu: przy marży 20% rabat 20% oznacza sprzedaż bez zysku. Przy każdej obniżce podaje się najniższą cenę z 30 dni przed obniżką.',
  },
  sections: [
    {
      id: 'start',
      label: 'Start',
      title: 'Ile sklep zarabia na kurtce?',
      grouping: 'class',
      intro:
        'Sklep sportowy w Lesznie kupił w hurtowni kurtki softshell po 160 zł netto. Na metce jest 246 zł. Policz w pamięci albo na kartce: ile zostaje sklepowi z jednej sprzedanej kurtki?',
      ...note(
        5,
        'Daj 60 sekund na odpowiedź bez kalkulatora. Zbierz na tablicy wszystkie wyniki i jeszcze ich nie oceniaj. Potem uczniowie wpisują swoją odpowiedź na platformie i czytają informację zwrotną.',
        'Skąd wzięło się 86 zł, a skąd 40 zł?',
        '86 zł to 246 minus 160, czyli pominięty VAT. 40 zł to 200 minus 160 — porównanie cen netto.',
        'Odejmowanie ceny zakupu netto od ceny brutto. Traktowanie całej różnicy jako zysku firmy, choć z niej sklep płaci jeszcze czynsz i pensje.',
        'Zapytaj, kto pracował dorywczo w sklepie i czy wie, ile z ceny towaru zostaje sklepowi.',
      ),
      activities: [
        number('q-hook', 'Ile sklep zarabia na jednej kurtce, zanim zapłaci czynsz, pensje i rachunki?', 40, '246 zł to cena brutto. VAT sklep oddaje do urzędu skarbowego: 246 ÷ 1,23 = 200 zł netto. Kurtka kosztowała 160 zł netto, więc zostaje 40 zł. Z tych pieniędzy sklep pokrywa jeszcze czynsz, pensje i prąd.', {
          unit: 'zł',
          mistakes: [
            { value: 86, text: '246 zł to cena z VAT. Najpierw odejmij VAT: 246 ÷ 1,23. Dopiero potem porównaj z ceną zakupu netto.' },
            { value: 46, text: '46 zł to VAT zawarty w cenie kurtki. Tę kwotę sklep oddaje do urzędu skarbowego.' },
            { value: 49.2, text: 'Porównujesz ceny brutto. Sklep odlicza VAT z faktury zakupu, więc swój zarobek liczy w cenach netto.' },
          ],
          hint: 'Która z tych cen zawiera VAT, a która nie?',
        }),
      ],
    },
    {
      id: 'narzut-marza',
      label: 'Wyjaśnienie',
      title: 'Procent od czego?',
      grouping: 'class',
      intro: 'Te same 40 zł na kurtce to 25% albo 20%. Oba procenty są poprawne, bo są liczone od różnych kwot.',
      reading: {
        title: 'Narzut i marża',
        paragraphs: [
          'Narzut liczysz od ceny zakupu: 40 zł to 25% ze 160 zł. Marżę liczysz od ceny sprzedaży: 40 zł to 20% z 200 zł. Gdy ktoś mówi „mamy 30% na tym towarze”, dopytaj, od czego jest ten procent.',
          'Sklep, który jest płatnikiem VAT, odlicza VAT z faktury zakupu i oddaje VAT doliczony do ceny sprzedaży. Dlatego zarobek na towarze liczy się z cen netto.',
        ],
        table: {
          head: ['Co liczysz', 'Wzór', 'Kurtka'],
          rows: [
            ['Cena sprzedaży netto przy narzucie 25%', 'zakup × (1 + narzut)', '160 × 1,25 = 200 zł'],
            ['Cena sprzedaży netto przy marży 20%', 'zakup ÷ (1 − marża)', '160 ÷ 0,80 = 200 zł'],
            ['Cena brutto (VAT 23%)', 'netto × 1,23', '200 × 1,23 = 246 zł'],
          ],
        },
        example: {
          question: 'Buty kosztują w hurtowni 220 zł netto. Właścicielka chce mieć 30% marży. Jaka będzie cena na metce?',
          steps: [
            'Marża jest liczona od ceny sprzedaży. Jeśli 30% ceny to marża, to cena zakupu stanowi pozostałe 70%.',
            'Cena sprzedaży netto: 220 ÷ 0,70 = 314,29 zł.',
            'Sprawdzenie: 30% z 314,29 zł to 94,29 zł; 314,29 − 94,29 = 220 zł. Zgadza się.',
            'Cena brutto: 314,29 × 1,23 = 386,58 zł.',
            'Na metce sklep zwykle zaokrągla, np. do 389,99 zł. Każde zaokrąglenie zmienia marżę — w górę ją podnosi, w dół obniża.',
          ],
          answer: '386,58 zł brutto przed zaokrągleniem.',
        },
      },
      ...note(
        10,
        'Pokaż tabelę na projektorze. Przykład z butami przejdź krok po kroku: przed każdym kliknięciem „Następny krok” zapytaj grupę, co będzie dalej. Pytanie o plecak każdy rozwiązuje sam; dopiero potem omawiacie.',
        'Hurtownik mówi: „Na tych plecakach macie 50%”. O co dopytasz?',
        'Czy to procent od ceny zakupu (narzut), czy od ceny sprzedaży (marża), i czy chodzi o ceny netto.',
        'Mnożenie przez 1,30 zamiast dzielenia przez 0,70 przy marży. Dzielenie zysku przez cenę zakupu, gdy pytanie dotyczy marży.',
        'Policz, jaki narzut odpowiada marży 50% (odpowiedź: 100%).',
      ),
      activities: [
        choice(
          'q-podstawa',
          'Plecak kosztuje w hurtowni 80 zł netto, a w sklepie 120 zł netto. Co jest prawdą?',
          [
            'Narzut wynosi 50%, a marża około 33%.',
            'Marża wynosi 50%, a narzut około 33%.',
            'Narzut i marża wynoszą po 50%, bo różnica to 40 zł.',
            'Marża wynosi 40%, bo sklep zarabia 40 zł.',
          ],
          0,
          'Narzut: 40 ÷ 80 = 50%. Marża: 40 ÷ 120 ≈ 33,3%. Ta sama kwota, inne podstawy.',
          [
            null,
            'Podstawy są odwrócone. Narzut liczysz od zakupu (40 z 80), marżę od sprzedaży (40 ze 120).',
            'Kwota jest ta sama, ale dzielisz ją przez różne ceny, więc procenty są różne.',
            '40 zł to marża w złotych. Procent otrzymasz, dzieląc 40 przez cenę sprzedaży, czyli 120.',
          ],
        ),
      ],
    },
    {
      id: 'kalkulacja',
      label: 'Kalkulacja',
      title: 'Ceny po dostawie',
      grouping: 'pair',
      intro: 'Przyszła dostawa. Kierowniczka prosi o ceny na metki. Najpierw jedno zadanie z marżą, potem cała tabela z narzutami.',
      ...note(
        12,
        'Pary: jedna osoba liczy kurtkę i bluzę, druga sprawdza wzór; przy skarpetach zamiana. Platforma oznaczy błędne pola na czerwono i podpowie wzór. Po 8 minutach zapytaj, przy którym polu było najwięcej poprawek.',
        'Dlaczego czapka przy marży 40% kosztuje 60 zł, a nie 50,40 zł?',
        '50,40 zł to narzut 40% od ceny zakupu. Przy marży 40% zakup stanowi 60% ceny sprzedaży: 36 ÷ 0,6 = 60 zł.',
        'Liczenie VAT od ceny zakupu zamiast od ceny sprzedaży. Zaokrąglanie w trakcie obliczeń zamiast na końcu.',
        'Zaokrąglij ceny brutto do końcówki ,99 w górę i policz, jak zmieni się marża na bluzie.',
      ),
      activities: [
        number('q-czapka', 'Czapka kosztuje w hurtowni 36 zł netto. Marża ma wynosić 40% ceny sprzedaży. Jaka jest cena sprzedaży netto?', 60, 'Zakup to 60% ceny sprzedaży: 36 ÷ 0,60 = 60 zł netto. Sprawdzenie: 40% z 60 zł to 24 zł, a 60 − 24 = 36 zł.', {
          unit: 'zł netto',
          mistakes: [
            { value: 50.4, text: 'To jest narzut 40% od ceny zakupu (36 × 1,4). Marżę liczysz od ceny sprzedaży: 36 ÷ (1 − 0,4).' },
            { value: 73.8, text: 'To cena brutto. Pytanie dotyczy ceny netto, bez VAT.' },
            { value: 90, text: 'Tu dzielisz przez 0,4. Zakup to nie 40%, tylko 60% ceny sprzedaży.' },
          ],
        }),
        {
          type: 'docForm',
          id: 'doc-kalkulacja',
          title: 'Kalkulacja cen do dostawy',
          context: 'Uzupełnij puste pola. Kwoty wpisuj z groszami, VAT 23%.',
          points: 6,
          doc: {
            title: 'Kalkulacja cen sprzedaży — dostawa z 14.10.2026',
            meta: [
              ['Dostawca', 'Hurtownia odzieży sportowej, Poznań'],
              ['Sporządził(a)', 'zmiana poranna'],
            ],
            table: {
              head: ['Towar', 'Zakup netto', 'Narzut', 'Sprzedaż netto', 'VAT 23%', 'Cena brutto'],
              rows: [
                ['Kurtka softshell', '160,00', '25%', { f: 'kn' }, { f: 'kv' }, { f: 'kb' }],
                ['Bluza z kapturem', '64,00', '50%', { f: 'bn' }, { f: 'bv' }, { f: 'bb' }],
                ['Skarpety, 3 pary', '12,00', '75%', { f: 'sn' }, { f: 'sv' }, { f: 'sb' }],
              ],
            },
            footer: 'Ceny brutto przed zaokrągleniem na metkach.',
          },
          fields: {
            kn: { label: 'Kurtka — sprzedaż netto', answer: 200, hint: 'Sprzedaż netto = zakup × (1 + narzut).' },
            kv: { label: 'Kurtka — VAT', answer: 46, hint: 'VAT = sprzedaż netto × 0,23 (nie zakup × 0,23).' },
            kb: { label: 'Kurtka — brutto', answer: 246, hint: 'Brutto = sprzedaż netto + VAT.' },
            bn: { label: 'Bluza — sprzedaż netto', answer: 96, hint: 'Sprzedaż netto = zakup × (1 + narzut).' },
            bv: { label: 'Bluza — VAT', answer: 22.08, hint: 'VAT = sprzedaż netto × 0,23 (nie zakup × 0,23).' },
            bb: { label: 'Bluza — brutto', answer: 118.08, hint: 'Brutto = sprzedaż netto + VAT.' },
            sn: { label: 'Skarpety — sprzedaż netto', answer: 21, hint: 'Sprzedaż netto = zakup × (1 + narzut).' },
            sv: { label: 'Skarpety — VAT', answer: 4.83, hint: 'VAT = sprzedaż netto × 0,23 (nie zakup × 0,23).' },
            sb: { label: 'Skarpety — brutto', answer: 25.83, hint: 'Brutto = sprzedaż netto + VAT.' },
          },
          explanation: 'Kurtka 200 + 46 = 246 zł, bluza 96 + 22,08 = 118,08 zł, skarpety 21 + 4,83 = 25,83 zł. W prawdziwym sklepie te same wzory wpisuje się raz do arkusza i przelicza całą dostawę.',
        },
      ],
    },
    {
      id: 'rabat',
      label: 'Rabat',
      title: 'Black Week: ile zostaje po obniżce?',
      grouping: 'pair',
      intro: 'W listopadzie sklep planuje Black Week. Zanim zawiśnie wywieszka, policz, ile sklep zarobi po obniżce.',
      reading: {
        title: 'Rabat obniża cenę, a nie koszt zakupu',
        paragraphs: [
          'Kurtka za 246 zł po rabacie 20% kosztuje 196,80 zł brutto, czyli 160 zł netto — dokładnie tyle, ile sklep zapłacił w hurtowni. Rabat 20% zabrał całe 40 zł marży.',
          'Przy każdej obniżce sklep musi podać najniższą cenę z 30 dni przed obniżką. Dotyczy to sklepów stacjonarnych i internetowych.',
        ],
      },
      ...note(
        10,
        'Najpierw obliczenie bluzy, potem pytanie o największy rabat. Wywieszkę pary sprawdzają razem: jedna osoba czyta wiersz na głos, druga decyduje. Omów wiersz o reklamacji — ten błąd zdarza się w prawdziwych sklepach.',
        'Dlaczego sklepy czasem dają rabat większy niż ich marża?',
        'Żeby sprzedać towar sezonowy przed końcem sezonu, odzyskać pieniądze zamrożone w zapasie albo ściągnąć klientów, którzy kupią coś jeszcze. To świadoma strata na jednym towarze.',
        'Odejmowanie procentów od siebie (20% marży − 15% rabatu = 5%). Przekonanie, że na przecenione towary nie przysługuje reklamacja.',
        'Policz, ile kurtek po rabacie 30% trzeba sprzedać, żeby stracić tyle, ile sklep zarabia na jednej kurtce bez rabatu. Odpowiedź: 2 (po 20 zł straty).',
      ),
      activities: [
        number('q-bluza', 'Bluza kosztuje 118,08 zł brutto, zakup 64 zł netto. W Black Week rabat wynosi 15%. Ile sklep zarobi na jednej bluzie (netto)?', 17.6, 'Po rabacie: 118,08 × 0,85 = 100,37 zł brutto. Netto: 100,37 ÷ 1,23 = 81,60 zł. Zarobek: 81,60 − 64 = 17,60 zł. Bez rabatu było 32 zł, więc rabat 15% zabrał prawie połowę zarobku.', {
          unit: 'zł',
          tolerance: 0.02,
          mistakes: [
            { value: 32, text: 'To zarobek bez rabatu (96 − 64). Uwzględnij obniżkę 15%.' },
            { value: 36.37, text: 'Od ceny brutto po rabacie odejmujesz cenę zakupu netto. Najpierw usuń VAT: 100,37 ÷ 1,23.' },
          ],
        }),
        choice(
          'q-maxrabat',
          'Kurtka: zakup 160 zł netto, cena 246 zł brutto. Przy jakim największym rabacie sklep jeszcze nie traci?',
          ['20%', '25%', '23%', '40%'],
          0,
          'Marża to 40 zł z 200 zł netto, czyli 20%. Rabat 20% obniża cenę netto do 160 zł — sklep wychodzi na zero. Każdy większy rabat to sprzedaż poniżej ceny zakupu.',
          [
            null,
            '25% to narzut liczony od ceny zakupu. Rabat obniża cenę sprzedaży, więc porównaj go z marżą: 40 zł z 200 zł.',
            '23% to stawka VAT. Rabat obniża cenę netto i brutto o ten sam procent, więc VAT nie zmienia odpowiedzi.',
            '40 to marża w złotych, nie w procentach.',
          ],
        ),
        {
          type: 'spotErrors',
          id: 'q-wywieszka',
          title: 'Wywieszka przygotowana przez nowego pracownika',
          context: 'Zaznacz wiersze, które trzeba poprawić przed powieszeniem w sklepie.',
          lines: [
            { text: 'KURTKA SOFTSHELL MĘSKA, rozmiary S–XXL' },
            { text: 'Cena regularna: 246,00 zł' },
            { text: 'BLACK WEEK −30%: 172,20 zł', ok: '246 × 0,7 = 172,20 zł.' },
            { text: 'Najniższa cena z 30 dni przed obniżką: —', error: 'Brakuje najniższej ceny z 30 dni przed obniżką. To obowiązek przy każdej obniżce.' },
            { text: 'Oszczędzasz 86 zł!', error: 'Oszczędność to 246,00 − 172,20 = 73,80 zł.' },
            { text: 'Promocja 23–30.11.2026 lub do wyczerpania zapasów' },
            { text: 'Towar przeceniony — reklamacji nie uwzględniamy', error: 'Przecena nie odbiera prawa do reklamacji niezgodności towaru z umową. Wyjątek: wada, o której klient wiedział, bo była opisana przy cenie.' },
          ],
          explanation: 'Przy rabacie 30% sklep sprzedaje kurtkę za 140 zł netto, czyli 20 zł poniżej ceny zakupu. To może być świadoma decyzja, ale trzeba ją podjąć po policzeniu, a nie przy wieszaniu wywieszki.',
        },
      ],
    },
    {
      id: 'sprawdzenie',
      label: 'Sprawdzenie',
      title: 'Nowa cena z hurtowni',
      grouping: 'solo',
      intro: 'Ostatnie zadanie jest na nowych danych. Rozwiąż je samodzielnie, bez pomocy pary.',
      ...note(
        8,
        'Każdy pracuje sam. Po 4 minutach poproś o przejście do karty wyniku. Za zgodą przeczytaj na głos 2–3 odpowiedzi z pytania otwartego i porównaj z przykładową.',
        'Dlaczego przy podwyżce w hurtowni o 16 zł nie wystarczy dodać 16 zł do ceny na metce?',
        'Bo cena brutto zawiera VAT, więc podwyżka na metce jest większa niż podwyżka netto. A jeśli sklep chce zachować ten sam procent marży, musi przeliczyć cenę od nowa.',
        'Zachowanie tej samej kwoty marży (40 zł) zamiast tego samego procentu.',
        'Policz cenę brutto przy zachowaniu tej samej kwoty marży 40 zł i sprawdź, jaki to procent (216 zł netto, 265,68 zł brutto, marża około 18,5%).',
      ),
      activities: [
        choice(
          'q-podwyzka',
          'Hurtownia podniosła cenę kurtki ze 160 zł do 176 zł netto. Sklep chce zachować marżę 20%. Jaka powinna być nowa cena brutto?',
          ['270,60 zł', '259,78 zł', '265,68 zł', '262,00 zł'],
          0,
          '176 ÷ 0,80 = 220 zł netto; 220 × 1,23 = 270,60 zł brutto.',
          [
            null,
            'To wynik dla narzutu 20% (176 × 1,2 × 1,23). Marżę liczysz od ceny sprzedaży: 176 ÷ 0,8.',
            'Tu sklep zachowuje te same 40 zł, a nie te same 20%. Marża spada wtedy do około 18,5%.',
            'Tu do ceny brutto dodano 16 zł. Podwyżka netto też musi dostać VAT, a do tego trzeba zachować procent marży.',
          ],
        ),
        text(
          'q-wyjasnij',
          'Wyjaśnij w dwóch zdaniach komuś z pracy, czym różni się narzut od marży. Użyj przykładu z tej lekcji.',
          'Narzut to procent liczony od ceny zakupu, a marża to procent liczony od ceny sprzedaży. Kurtka kupiona za 160 zł i sprzedana za 200 zł netto daje 40 zł, czyli 25% narzutu albo 20% marży.',
          { criteria: ['Obie podstawy procentu są nazwane.', 'Jest przykład z liczbami.', 'Liczby się zgadzają.'] },
        ),
        {
          type: 'resultCard',
          id: 'karta',
          badges: [
            { min: 0, name: 'Do powtórki', text: 'Wróć do etapu 2 i przejdź przykład z butami jeszcze raz. Potem rozwiąż tabelę w etapie 3.' },
            { min: 0.6, name: 'Liczysz ceny', text: 'Większość obliczeń jest dobrze. Sprawdź pola, które trzeba było poprawiać — zwykle chodzi o podstawę procentu albo VAT.' },
            { min: 0.85, name: 'Gotowe do metkowania', text: 'Możesz ustalać ceny po dostawie i sprawdzać promocje przed ich ogłoszeniem.' },
          ],
        },
      ],
    },
  ],
  exitTicket: 'Kurtka: zakup 160 zł netto, sprzedaż 246 zł brutto. Narzut 25%, marża 20%, zarobek 40 zł netto na sztuce. Rabat 20% zabiera cały zarobek.',
};
