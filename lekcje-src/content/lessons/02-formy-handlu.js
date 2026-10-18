import { choice, methods, note, number, text } from '../schema.js';

export default {
  id: '02',
  order: 2,
  part: 'A',
  title: 'Formy handlu i kanały sprzedaży',
  subtitle: 'Ceramiczka z Bolesławca może sprzedawać kubki na targu, przez platformę, we własnym sklepie internetowym albo hurtowo. Każda droga kosztuje coś innego.',
  duration: 45,
  sessions: [45],
  han: ['HAN.01.2'],
  tags: ['hurt', 'detal', 'e-commerce', 'franczyza', 'prowizja'],
  realia: ['vatZwolnienie'],
  audience: {
    adults:
      'To dobra lekcja dla osób, które dopiero wybierają, gdzie sprzedawać. Zamiast kubków Agnieszki niech policzą próg opłacalności dla własnego produktu: swoją cenę, prowizję wybranej platformy i abonament sklepu internetowego. Prowizje i abonamenty sprawdźcie w aktualnych cennikach.',
  },
  format: {
    name: 'Przypadek z obliczeniami',
    student:
      'Agnieszka robi kubki ceramiczne w Bolesławcu i szuka, gdzie je sprzedawać. Rozpoznasz formy handlu, policzysz koszt platformy i własnego sklepu, a na koniec porównasz sprzedaż hurtową z detaliczną.',
    teacher:
      'Najpierw porządkujemy pojęcia (hurt, detal, stacjonarnie, internet, franczyza), potem liczymy. Najważniejszy moment to próg 1320 zł: uczniowie widzą, że „lepszy kanał” zależy od skali sprzedaży.',
    grouping: 'Etapy 1, 2 i 5 samodzielnie. Etapy 3 i 4 w parach: jedna osoba liczy, druga sprawdza wzór.',
    methods: [methods.przypadek, methods.przyklady],
  },
  objectives: [
    'Odróżniam handel hurtowy od detalicznego i rozpoznaję franczyzę.',
    'Liczę koszt sprzedaży przez platformę i przez własny sklep internetowy.',
    'Wskazuję, przy jakiej sprzedaży opłaca się zmienić kanał.',
  ],
  materials: ['Urządzenie z przeglądarką', 'Kalkulator'],
  teacherGuide: {
    preparation: 'Nie trzeba nic drukować. Jeśli ktoś z grupy sprzedaje przez internet, poproś go wcześniej o krótką relację w etapie 3.',
    summary:
      'Hurt to sprzedaż firmom do dalszej odsprzedaży, detal — konsumentom. Platforma pobiera prowizję od każdej sprzedaży, własny sklep kosztuje głównie stały abonament. Przy małej sprzedaży tańsza jest platforma, przy dużej własny sklep. Sprzedaż hurtowa daje mniej na sztuce, ale dużo naraz i bez wysyłek.',
  },
  sections: [
    {
      id: 'start',
      label: 'Start',
      title: 'Hurt czy detal?',
      grouping: 'solo',
      intro: 'Sklep z pamiątkami w Karpaczu zamawia u Agnieszki 150 kubków, żeby sprzedawać je turystom.',
      ...note(
        5,
        'Każdy odpowiada sam. Po sprawdzeniu zapytaj, kto ostatnio kupił coś w hurtowni jako osoba prywatna.',
        'Czy hurtownia może sprzedać coś osobie prywatnej?',
        'Może. O formie decyduje cel zakupu i odbiorca: hurt to sprzedaż do dalszej odsprzedaży albo na potrzeby firmy.',
        'Mylenie hurtu z „dużą ilością”. Klient detaliczny też może kupić dużo.',
        'Zapytaj, czy cash and carry to hurt, czy detal.',
      ),
      activities: [
        choice(
          'q-hurt',
          'Agnieszka sprzedaje 150 kubków sklepowi, który odsprzeda je turystom. Jaka to forma handlu?',
          ['Handel hurtowy', 'Handel detaliczny', 'Sprzedaż komisowa', 'Franczyza'],
          0,
          'Kupujący to firma, która odsprzeda towar dalej. To handel hurtowy.',
          [
            null,
            'Detal to sprzedaż ostatecznemu konsumentowi. Sklep z pamiątkami nie używa kubków, tylko je odsprzedaje.',
            'Przy komisie właścicielem towaru zostaje Agnieszka, a sklep dostaje prowizję. Tu sklep kupuje kubki na własność.',
            'Franczyza to umowa o prowadzenie firmy pod cudzą marką i według jej zasad. Tu jest zwykła sprzedaż.',
          ],
        ),
      ],
    },
    {
      id: 'formy',
      label: 'Formy',
      title: 'Gdzie i komu sprzedajemy',
      grouping: 'solo',
      intro: 'Formy handlu różnią się odbiorcą (firma czy konsument) i miejscem (sklep czy internet).',
      reading: {
        title: 'Formy handlu w skrócie',
        paragraphs: [
          'Handel hurtowy: sprzedaż firmom do dalszej odsprzedaży — hurtownie, także internetowe dla firm. Handel detaliczny: sprzedaż konsumentom — w sklepie, na targu, przez internet. W internecie sklep może działać na własnej stronie albo na platformie, gdzie wielu sprzedawców wystawia towar obok siebie.',
          'Franczyza to umowa, w której przedsiębiorca prowadzi własny sklep pod marką sieci. Sieć dostarcza towar, szyld, system i szkolenia, a franczyzobiorca płaci opłaty i trzyma się jej zasad. Wiele małych sklepów spożywczych w Polsce działa w ten sposób.',
        ],
      },
      ...note(
        10,
        'Czytanie 3 minuty, potem dopasowanie. Przy omówieniu zatrzymaj się na sklepie pod szyldem sieci: dlaczego to nie jest sklep sieci, tylko osobna firma?',
        'Czym różni się sklep sieci od sklepu franczyzowego pod tym samym szyldem?',
        'Sklep franczyzowy to osobna firma z własnym właścicielem, który ponosi ryzyko. Sieć ustala zasady i pobiera opłaty.',
        'Uznawanie każdej sprzedaży przez internet za hurt albo każdej dużej sprzedaży za hurt.',
        'Wymieńcie trzy sieci franczyzowe działające w waszej okolicy i jedną zaletę dla franczyzobiorcy.',
      ),
      activities: [
        {
          type: 'matching',
          id: 'q-formy',
          question: 'Przyporządkuj formę handlu.',
          options: ['Hurt', 'Detal stacjonarny', 'Detal w internecie', 'Franczyza'],
          rows: [
            { label: 'Hurtownia spożywcza w Kaliszu sprzedaje towar sklepom osiedlowym', correct: 0 },
            { label: 'Kwiaciarnia przy cmentarzu sprzedaje znicze i wiązanki', correct: 1 },
            { label: 'Agnieszka sprzedaje kubki przez własną stronę z wysyłką do paczkomatu', correct: 2 },
            { label: 'Pan Tomasz prowadzi sklep pod szyldem sieci, płaci jej opłaty i bierze od niej towar', correct: 3 },
            { label: 'Hurtownia papiernicza przyjmuje zamówienia od szkół przez panel internetowy dla firm', correct: 0, explanation: 'Kanał jest internetowy, ale odbiorcy to firmy i instytucje — hurt.' },
            { label: 'Stoisko z miodem na sobotnim targu', correct: 1 },
          ],
          explanation: 'O formie decyduje przede wszystkim odbiorca (firma czy konsument), a dopiero potem miejsce sprzedaży.',
        },
      ],
    },
    {
      id: 'kanaly',
      label: 'Koszty',
      title: 'Platforma czy własny sklep?',
      grouping: 'pair',
      intro: 'Platforma pobiera od Agnieszki 9% od każdej sprzedaży. Własny sklep internetowy kosztuje 99 zł abonamentu miesięcznie plus 1,5% od każdej płatności. Agnieszka nie jest płatnikiem VAT, więc liczymy kwoty bez VAT.',
      reading: {
        example: {
          question: 'Przy jakiej miesięcznej sprzedaży oba kanały kosztują tyle samo?',
          steps: [
            'Platforma kosztuje 9% sprzedaży. Własny sklep kosztuje 99 zł plus 1,5% sprzedaży.',
            'Różnica w procentach: 9% − 1,5% = 7,5%. Własny sklep „odrabia” 7,5% od każdej sprzedanej złotówki.',
            'Abonament 99 zł zwraca się, gdy 7,5% sprzedaży równa się 99 zł: 99 ÷ 0,075 = 1320 zł.',
            'Sprawdzenie: platforma 1320 × 0,09 = 118,80 zł; własny sklep 99 + 1320 × 0,015 = 118,80 zł.',
          ],
          answer: 'Przy 1320 zł sprzedaży miesięcznie koszty są równe. Poniżej taniej wychodzi platforma, powyżej własny sklep.',
        },
      },
      ...note(
        12,
        'Najpierw obliczenie prowizji, potem przykład rozwiązany na projektorze, potem pytanie o 800 zł. Jeśli ktoś w grupie sprzedaje w internecie, poproś o 1-minutową relację: ile płaci i za co.',
        'Co poza prowizją przemawia za platformą, a co za własnym sklepem?',
        'Platforma: klienci już tam są, łatwy start. Własny sklep: własna marka, kontakt z klientem, niezależność od zasad platformy, ale trzeba samemu ściągnąć ruch.',
        'Porównywanie samego abonamentu (99 zł) z samą prowizją procentową bez przeliczenia na kwotę.',
        'Dolicz do własnego sklepu 150 zł miesięcznie na reklamę i policz nowy próg (3320 zł).',
      ),
      activities: [
        number('q-prowizja', 'W październiku Agnieszka sprzedała przez platformę kubki za 2400 zł. Ile zapłaci platformie?', 216, '2400 × 0,09 = 216 zł.', {
          unit: 'zł',
          mistakes: [{ value: 21.6, text: 'Przesunięty przecinek: 9% to 0,09, a nie 0,009.' }],
        }),
        number('q-prog', 'Sprawdź rachunek z przykładu: ile wyniosłaby prowizja platformy przy sprzedaży 1320 zł?', 118.8, '1320 × 0,09 = 118,80 zł. Własny sklep przy tej sprzedaży: 99 + 19,80 = 118,80 zł. Koszty są równe.', {
          unit: 'zł',
        }),
        choice(
          'q-800',
          'W listopadzie Agnieszka planuje sprzedaż za 800 zł. Który kanał będzie tańszy?',
          ['Platforma: 72 zł wobec 111 zł', 'Własny sklep: 111 zł wobec 72 zł', 'Oba kosztują 118,80 zł', 'Własny sklep: 12 zł wobec 72 zł'],
          0,
          'Platforma: 800 × 0,09 = 72 zł. Własny sklep: 99 + 800 × 0,015 = 111 zł. Poniżej progu 1320 zł platforma jest tańsza.',
          [
            null,
            'Kwoty się zgadzają, ale niższa jest prowizja platformy (72 zł).',
            '118,80 zł to koszt przy sprzedaży 1320 zł, a nie 800 zł.',
            '12 zł to tylko opłata za płatności. Do własnego sklepu trzeba doliczyć abonament 99 zł.',
          ],
        ),
      ],
    },
    {
      id: 'hurt-detal',
      label: 'Hurt i detal',
      title: '150 kubków do Karpacza czy pojedynczo w internecie?',
      grouping: 'pair',
      intro: 'Kubek kosztuje Agnieszkę 14 zł (glina, szkliwo, wypał). W internecie sprzedaje go za 49 zł, płaci 9% prowizji i 6 zł za opakowanie i wysyłkę. Sklep z pamiątkami chce 150 kubków po 28 zł.',
      ...note(
        10,
        'Pary liczą oba warianty. Przy pytaniu o zalety hurtu poproś o argumenty spoza liczb: czas, ryzyko, pewność zapłaty.',
        'Ile godzin pracy przy pakowaniu i wysyłce oszczędza jedno zamówienie hurtowe?',
        'Pakowanie 150 paczek to nawet kilkanaście godzin. W hurcie jest jedno pakowanie i jeden odbiór.',
        'Porównywanie tylko zarobku na sztuce. Zapominanie o kosztach wysyłki przy sprzedaży internetowej.',
        'Policz, ile kubków trzeba sprzedać w internecie, żeby zarobić tyle samo co na zamówieniu hurtowym (86 kubków).',
      ),
      activities: [
        number('q-netto-internet', 'Ile Agnieszka zarabia na jednym kubku sprzedanym przez platformę?', 24.59, '49 − 4,41 (prowizja 9%) − 6 (wysyłka) − 14 (koszt kubka) = 24,59 zł.', {
          unit: 'zł',
          mistakes: [
            { value: 35, text: 'To 49 − 14. Odejmij jeszcze prowizję platformy i koszt wysyłki.' },
            { value: 30.59, text: 'Brakuje kosztu opakowania i wysyłki (6 zł).' },
          ],
        }),
        number('q-hurt-zysk', 'Ile Agnieszka zarobi na całym zamówieniu hurtowym 150 kubków?', 2100, '150 × (28 − 14) = 2100 zł. Na sztuce mniej niż w internecie, ale za jednym razem i bez 150 wysyłek.', {
          unit: 'zł',
          mistakes: [{ value: 4200, text: '4200 zł to cała zapłata od sklepu. Odejmij koszt wykonania 150 kubków (2100 zł).' }],
        }),
        choice(
          'q-dlaczego-hurt',
          'Dlaczego Agnieszka może przyjąć zamówienie hurtowe, choć na sztuce zarabia mniej?',
          [
            'Bo sprzedaje dużo naraz i nie wysyła 150 paczek',
            'Bo w hurcie nie musi płacić za materiały do produkcji kubków',
            'Bo sklep hurtowy zawsze płaci z góry za cały towar',
            'Bo w hurcie kubek kosztuje ją mniej niż przy sprzedaży w internecie',
          ],
          0,
          'Mniejszy zarobek na sztuce równoważą skala, oszczędność czasu i jedna transakcja zamiast stu pięćdziesięciu.',
          [
            null,
            'Koszt materiałów jest taki sam bez względu na kanał sprzedaży.',
            'Termin płatności ustala się w umowie. Sklepy często płacą z odroczeniem, np. 14 lub 30 dni.',
            'Koszt wykonania kubka (14 zł) nie zależy od tego, komu go sprzedaje.',
          ],
        ),
      ],
    },
    {
      id: 'sprawdzenie',
      label: 'Sprawdzenie',
      title: 'Nowa sytuacja',
      grouping: 'solo',
      intro: 'Pan Tomasz z Nowego Tomyśla ma 60 tys. zł oszczędności i chce otworzyć sklep spożywczy. Nie pracował wcześniej w handlu.',
      ...note(
        8,
        'Samodzielnie. Odpowiedzi otwarte przeczytaj 2–3 na głos: czy kanał wybrany dla Agnieszki wynika z liczb?',
        'Komu franczyza się nie opłaci?',
        'Komuś, kto ma doświadczenie, własną markę i chce sam decydować o asortymencie i cenach.',
        'Przekonanie, że franczyza gwarantuje zysk.',
        'Wyszukajcie w internecie warunki jednej sieci franczyzowej i porównajcie opłaty.',
      ),
      activities: [
        choice(
          'q-franczyza',
          'Co pan Tomasz zyska, otwierając sklep w franczyzie zamiast całkiem samodzielnie?',
          [
            'Gotowy system, dostawy i szkolenia — za opłaty i na zasadach sieci',
            'Pewny zysk, bo sieć pokrywa straty sklepów franczyzowych',
            'Pełną swobodę w wyborze towaru, cen i wyglądu sklepu',
            'Zwolnienie z obowiązku prowadzenia własnej działalności gospodarczej i księgowości',
          ],
          0,
          'Franczyza zmniejsza ryzyko startu, ale nie usuwa go. Franczyzobiorca jest przedsiębiorcą i ponosi straty.',
          [
            null,
            'Sieć nie gwarantuje zysku. Ryzyko ponosi franczyzobiorca.',
            'W franczyzie asortyment, ceny i wygląd w dużej części narzuca sieć.',
            'Franczyzobiorca prowadzi własną firmę i ma wszystkie obowiązki przedsiębiorcy.',
          ],
        ),
        text(
          'q-kanal',
          'Który kanał polecasz Agnieszce na początek, przy sprzedaży około 800 zł miesięcznie? Uzasadnij liczbami.',
          'Na początek platforma: przy 800 zł miesięcznie prowizja to 72 zł, a własny sklep kosztowałby 111 zł. Gdy sprzedaż przekroczy około 1320 zł miesięcznie, warto otworzyć własny sklep. Zamówienia hurtowe może przyjmować równolegle.',
          { criteria: ['Wybór jest uzasadniony kosztem przy 800 zł.', 'Pada próg zmiany kanału.'] },
        ),
        {
          type: 'resultCard',
          id: 'karta',
          badges: [
            { min: 0, name: 'Do powtórki', text: 'Wróć do etapu 2 i do przykładu z progiem 1320 zł.' },
            { min: 0.6, name: 'Rozróżniasz kanały', text: 'Popraw jeszcze obliczenia w etapie 4.' },
            { min: 0.85, name: 'Doradca sprzedaży', text: 'Umiesz dobrać kanał do skali sprzedaży i policzyć jego koszt.' },
          ],
        },
      ],
    },
  ],
  exitTicket: 'Hurt: firmom do odsprzedaży. Detal: konsumentom. Platforma: prowizja od sprzedaży; własny sklep: abonament. Próg w przykładzie: 1320 zł miesięcznie.',
};
