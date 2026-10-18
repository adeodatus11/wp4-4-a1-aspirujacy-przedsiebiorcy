import { choice, methods, note } from '../schema.js';

export default {
  id: '21',
  order: 21,
  part: 'B',
  title: 'Faktura VAT i KSeF',
  subtitle: 'Księgarnia sprzedaje szkole atlasy i zeszyty. Dwie stawki VAT na jednej fakturze i nowy obowiązek: faktura w Krajowym Systemie e-Faktur.',
  duration: 45,
  sessions: [45],
  han: ['HAN.02.7'],
  tags: ['faktura', 'VAT', 'KSeF', 'dokumenty sprzedaży'],
  realia: ['ksef', 'vatStawki'],
  audience: {
    adults:
      'Dla osób prowadzących firmę najważniejszy jest etap 4: od kiedy ich firma musi wystawiać faktury w KSeF i co to zmienia w codziennej pracy. Daty i progi sprawdźcie na ksef.podatki.gov.pl — podane w lekcji są stanem z października 2026 r.',
  },
  format: {
    name: 'Wypełnianie faktury i kontrola dokumentu',
    student:
      'Pracujesz w księgarni w Toruniu. Wystawisz fakturę dla szkoły z dwiema stawkami VAT, znajdziesz błędy w cudzej fakturze i dowiesz się, jak działa KSeF.',
    teacher:
      'Lekcja jest przydatna także dla technika księgarstwa. Uczniowie liczą wartości netto, VAT i brutto osobno dla każdej stawki. Druga część to KSeF: od 2026 r. faktury między firmami wystawia się w państwowym systemie, a faktura dostaje numer KSeF.',
    grouping: 'Etapy 1 i 5 samodzielnie, etapy 2–4 w parach.',
    methods: [methods.przyklady, methods.jawne],
  },
  objectives: [
    'Wymieniam obowiązkowe elementy faktury VAT.',
    'Liczę wartość netto, VAT i brutto przy dwóch stawkach.',
    'Znajduję błędy w fakturze.',
    'Wiem, czym jest KSeF i od kiedy obowiązuje.',
  ],
  materials: ['Urządzenie z przeglądarką', 'Kalkulator', 'Wydruk lub zdjęcie prawdziwej faktury (dane zakryte) — nie jest konieczny'],
  teacherGuide: {
    preparation: 'Jeśli możesz, pokaż wizualizację faktury z KSeF (wzór ze strony Ministerstwa Finansów). Uczniowie zobaczą numer KSeF i kod QR.',
    summary:
      'Faktura ma: numer, datę wystawienia i sprzedaży, dane i NIP sprzedawcy i nabywcy, nazwę towaru, ilość, cenę netto, wartość netto, stawkę i kwotę VAT, wartość brutto i sumy dla każdej stawki. Książki drukowane mają 5% VAT, zeszyty 23%. Od 2026 r. firmy wystawiają faktury dla innych firm w KSeF; konsument dostaje fakturę w uzgodnionej formie, np. PDF.',
  },
  sections: [
    {
      id: 'start',
      label: 'Start',
      title: 'Jaka stawka VAT?',
      grouping: 'solo',
      intro: 'Szkoła Podstawowa nr 12 kupuje w księgarni 30 atlasów geograficznych i 30 zeszytów A4.',
      ...note(
        5,
        'Każdy odpowiada sam. Krótko przypomnij, że różne towary mają różne stawki VAT, a na fakturze sumuje się je osobno.',
        'Dlaczego książki mają niższy VAT niż zeszyty?',
        'Ustawodawca uznał książki za towar, którego cenę warto obniżać — dla kultury i edukacji. Zeszyty to zwykły towar z 23% VAT.',
        'Stosowanie jednej stawki do całej faktury.',
        'Sprawdź, jaką stawkę mają e-booki (też 5%, jeśli mają ISBN).',
      ),
      activities: [
        choice(
          'q-stawka',
          'Jaka stawka VAT obowiązuje przy sprzedaży drukowanego atlasu?',
          ['5%', '23%', '8%', '0%'],
          0,
          'Książki drukowane (z numerem ISBN) mają obniżoną stawkę 5%.',
          [
            null,
            '23% to stawka podstawowa, np. dla zeszytów i długopisów.',
            '8% obowiązuje m.in. przy niektórych usługach i towarach, ale nie przy książkach.',
            '0% stosuje się np. przy eksporcie, nie przy sprzedaży książki w kraju.',
          ],
        ),
      ],
    },
    {
      id: 'elementy',
      label: 'Elementy',
      title: 'Co musi być na fakturze',
      grouping: 'pair',
      intro: 'Faktura jest dowodem sprzedaży dla obu firm. Brak jednego elementu może oznaczać korektę.',
      reading: {
        title: 'Obowiązkowe elementy faktury VAT',
        paragraphs: [
          'Numer faktury, data wystawienia, data sprzedaży (jeśli inna), nazwa i adres sprzedawcy oraz nabywcy z numerami NIP, nazwa towaru lub usługi, ilość i jednostka, cena jednostkowa netto, wartość netto, stawka VAT, kwota VAT, wartość brutto, sumy według stawek. Podpis i pieczątka nie są obowiązkowe.',
        ],
      },
      ...note(
        10,
        'Pary zaznaczają elementy. Zapytaj, kto widział fakturę z podpisem i pieczątką — dlaczego firmy je dodają, skoro nie muszą?',
        'Po co nabywcy NIP na fakturze?',
        'Żeby urząd skarbowy mógł połączyć zakup z firmą nabywcy, a nabywca mógł odliczyć VAT.',
        'Uznawanie podpisu i pieczątki za obowiązkowe.',
        'Znajdź na prawdziwej fakturze wszystkie obowiązkowe elementy.',
      ),
      activities: [
        {
          type: 'multi',
          id: 'q-elementy',
          question: 'Zaznacz elementy, które muszą być na fakturze VAT.',
          options: ['NIP sprzedawcy i nabywcy', 'Stawka i kwota VAT', 'Podpis osoby wystawiającej', 'Numer faktury i data wystawienia', 'Pieczątka firmy', 'Ilość i cena jednostkowa netto'],
          correct: [0, 1, 3, 5],
          explanation: 'Podpis i pieczątka nie są obowiązkowe. Obowiązkowe są dane stron, numer, daty, towar, ilość, ceny, VAT.',
          hint: 'Dwie odpowiedzi to zwyczaj, a nie wymóg.',
        },
      ],
    },
    {
      id: 'faktura',
      label: 'Faktura',
      title: 'Faktura dla szkoły',
      grouping: 'pair',
      intro: 'Uzupełnij fakturę. Licz osobno dla każdej pozycji: wartość netto = ilość × cena netto, VAT = wartość netto × stawka, brutto = netto + VAT.',
      reading: {
        example: {
          question: 'Atlas: 30 sztuk po 32,00 zł netto, VAT 5%.',
          steps: ['Wartość netto: 30 × 32,00 = 960,00 zł.', 'VAT: 960,00 × 0,05 = 48,00 zł.', 'Wartość brutto: 960,00 + 48,00 = 1008,00 zł.'],
          answer: '960,00 zł netto, 48,00 zł VAT, 1008,00 zł brutto.',
        },
      },
      ...note(
        15,
        'Przykład z atlasem razem, potem pary liczą zeszyty i sumy. Zwróć uwagę, że suma VAT to suma kwot, a nie jakiś średni procent.',
        'Dlaczego nie można policzyć VAT od sumy netto jedną stawką?',
        'Bo towary mają różne stawki. VAT liczy się dla każdej stawki osobno i dopiero potem sumuje.',
        'Liczenie VAT 23% od całej sumy netto.',
        'Dopisz do faktury 30 długopisów po 1,50 zł netto (23%) i policz nowe sumy.',
      ),
      activities: [
        {
          type: 'docForm',
          id: 'doc-faktura',
          title: 'Faktura VAT nr FV/112/10/2026',
          context: 'Kwoty z groszami.',
          points: 6,
          doc: {
            title: 'Faktura VAT nr FV/112/10/2026',
            meta: [
              ['Data wystawienia', '22.10.2026'],
              ['Data sprzedaży', '22.10.2026'],
            ],
            parties: [
              ['Sprzedawca', 'Księgarnia „Na Starówce”\nul. Szeroka 20, 87-100 Toruń\nNIP 956-111-22-33'],
              ['Nabywca', 'Szkoła Podstawowa nr 12\nul. Grudziądzka 30, 87-100 Toruń\nNIP 956-444-55-66'],
            ],
            table: {
              head: ['Towar', 'Ilość', 'Cena netto', 'Wartość netto', 'VAT', 'Kwota VAT', 'Brutto'],
              rows: [
                ['Atlas geograficzny', '30 szt.', '32,00', '960,00', '5%', '48,00', '1008,00'],
                ['Zeszyt A4, 60 kartek', '30 szt.', '4,00', { f: 'zn' }, '23%', { f: 'zv' }, { f: 'zb' }],
              ],
            },
            after: [
              ['Razem netto', { f: 'sn' }],
              ['Razem VAT', { f: 'sv' }],
              ['Do zapłaty brutto', { f: 'sb' }],
            ],
            footer: 'Płatność: przelew w 14 dni.',
          },
          fields: {
            zn: { label: 'Zeszyty — wartość netto', answer: 120, hint: '30 × 4,00.' },
            zv: { label: 'Zeszyty — kwota VAT', answer: 27.6, hint: 'Wartość netto zeszytów × 0,23.' },
            zb: { label: 'Zeszyty — brutto', answer: 147.6, hint: 'Netto + VAT.' },
            sn: { label: 'Razem netto', answer: 1080, hint: '960,00 + netto zeszytów.' },
            sv: { label: 'Razem VAT', answer: 75.6, hint: '48,00 + VAT zeszytów.' },
            sb: { label: 'Do zapłaty brutto', answer: 1155.6, hint: 'Razem netto + razem VAT.' },
          },
          explanation: 'Zeszyty: 120,00 netto, 27,60 VAT, 147,60 brutto. Razem: 1080,00 netto, 75,60 VAT, 1155,60 zł do zapłaty.',
        },
      ],
    },
    {
      id: 'ksef',
      label: 'KSeF',
      title: 'Krajowy System e-Faktur',
      grouping: 'pair',
      intro: 'Od 2026 r. faktury między firmami wystawia się w państwowym systemie KSeF. Sprawdź też fakturę wystawioną przez nowego pracownika.',
      reading: {
        title: 'KSeF w skrócie',
        paragraphs: [
          'Faktura w KSeF ma ustaloną strukturę danych, trafia do systemu Ministerstwa Finansów i dostaje numer KSeF. Nabywca odbiera ją z systemu. Obowiązek wszedł etapami: największe firmy od 1 lutego 2026 r., pozostałe od 1 kwietnia 2026 r., najmniejsze (sprzedaż do 10 000 zł miesięcznie) od 1 stycznia 2027 r.',
          'Konsument nie musi korzystać z KSeF — fakturę dostaje w formie uzgodnionej ze sprzedawcą, np. PDF albo wydruk.',
        ],
      },
      ...note(
        10,
        'Pary odpowiadają i szukają błędów. Jeśli masz wzór wizualizacji faktury z KSeF, pokaż numer KSeF i kod QR.',
        'Co zmienia KSeF dla pracownika księgarni?',
        'Fakturę dla firmy wystawia w programie połączonym z KSeF, a nie drukuje i wysyła mailem. Nabywca pobiera ją z systemu.',
        'Przekonanie, że KSeF dotyczy tylko dużych firm.',
        'Sprawdź na ksef.podatki.gov.pl, czy daty z lekcji są nadal aktualne.',
      ),
      activities: [
        choice(
          'q-ksef',
          'Księgarnia sprzedaje miesięcznie za około 60 000 zł. Od kiedy wystawia faktury dla firm w KSeF?',
          ['Od 1 kwietnia 2026 r.', 'Od 1 lutego 2026 r.', 'Od 1 stycznia 2027 r.', 'Nigdy, bo sprzedaje głównie klientom prywatnym'],
          0,
          'Firmy, które nie są największymi podatnikami i sprzedają więcej niż 10 000 zł miesięcznie, mają obowiązek od 1 kwietnia 2026 r.',
          [
            null,
            '1 lutego 2026 r. to termin dla największych firm.',
            '1 stycznia 2027 r. to termin dla najmniejszych, ze sprzedażą do 10 000 zł miesięcznie.',
            'Obowiązek dotyczy faktur dla firm — a księgarnia sprzedaje też szkołom i firmom.',
          ],
        ),
        {
          type: 'spotErrors',
          id: 'q-bledy',
          title: 'Faktura wystawiona przez nowego pracownika',
          context: 'Zaznacz wiersze z błędami.',
          lines: [
            { text: 'Faktura VAT nr FV/113/10/2026, data wystawienia 22.10.2026' },
            { text: 'Nabywca: Przedszkole Miejskie nr 5, Toruń, NIP: —', error: 'Brakuje NIP nabywcy. Przedszkole jako jednostka ma swój NIP.' },
            { text: 'Słownik ortograficzny — 10 szt. × 25,00 zł = 250,00 zł netto, VAT 23%', error: 'Książka drukowana ma stawkę 5%, nie 23%.' },
            { text: 'Kredki 12 kolorów — 20 szt. × 6,00 zł = 120,00 zł netto, VAT 23%' },
            { text: 'Razem netto: 370,00 zł' },
            { text: 'Do zapłaty: 480,00 zł', error: 'Przy poprawnych stawkach: 250 × 1,05 + 120 × 1,23 = 262,50 + 147,60 = 410,10 zł.' },
          ],
          explanation: 'Trzy błędy: brak NIP nabywcy, zła stawka VAT przy książce, zła kwota do zapłaty. Taką fakturę trzeba skorygować.',
        },
      ],
    },
    {
      id: 'sprawdzenie',
      label: 'Sprawdzenie',
      title: 'Klient prywatny',
      grouping: 'solo',
      intro: 'Mama ucznia kupuje atlas i prosi o fakturę na swoje nazwisko, bez NIP.',
      ...note(
        5,
        'Samodzielnie. Krótko podsumuj różnicę: faktura dla firmy w KSeF, dla konsumenta w uzgodnionej formie.',
        'Czym różni się faktura dla konsumenta od faktury dla firmy?',
        'Nie ma NIP nabywcy, a konsument nie odbiera jej z KSeF — dostaje ją np. jako PDF.',
        'Odmawianie faktury osobie prywatnej, bo „nie ma NIP”.',
        'Sprawdź, w jakim terminie osoba prywatna może poprosić o fakturę do paragonu (3 miesiące).',
      ),
      activities: [
        choice(
          'q-prywatna',
          'Co robisz?',
          [
            'Wystawiam fakturę bez NIP i daję wydruk lub PDF',
            'Odmawiam, bo faktura jest tylko dla firm z NIP',
            'Mówię, że musi założyć konto w KSeF, żeby ją odebrać',
            'Wystawiam fakturę na NIP księgarni, bo pole nie może być puste',
          ],
          0,
          'Osoba prywatna może dostać fakturę bez NIP. Nie musi korzystać z KSeF — dostaje fakturę w uzgodnionej formie.',
          [
            null,
            'Faktura przysługuje też konsumentowi, jeśli o nią poprosi.',
            'Konsument nie musi korzystać z KSeF.',
            'NIP sprzedawcy w polu nabywcy to błąd w dokumencie.',
          ],
        ),
        {
          type: 'resultCard',
          id: 'karta',
          badges: [
            { min: 0, name: 'Do powtórki', text: 'Wróć do przykładu z atlasem i do elementów faktury.' },
            { min: 0.6, name: 'Wystawiasz faktury', text: 'Powtórz KSeF i kontrolę błędów.' },
            { min: 0.85, name: 'Faktura bez korekty', text: 'Liczysz dwie stawki VAT i znasz zasady KSeF.' },
          ],
        },
      ],
    },
  ],
  exitTicket: 'Faktura: numer, daty, strony z NIP, towar, ilość, cena netto, VAT według stawek, brutto. Książki 5%, zeszyty 23%. KSeF: faktury dla firm w systemie MF od 2026 r.; konsument dostaje fakturę w uzgodnionej formie.',
};
