import { choice, methods, note, number, text } from '../schema.js';

export default {
  id: '12',
  order: 12,
  part: 'A',
  title: 'Sprzedaż internetowa i prawa konsumenta',
  subtitle: 'Klientka chce oddać talerze po 10 dniach, ktoś inny kubek z imieniem, a regulamin sklepu obiecuje zwrot tylko w bonie.',
  duration: 45,
  sessions: [45],
  han: ['HAN.01.4'],
  tags: ['e-sklep', 'odstąpienie od umowy', 'zwrot', 'regulamin'],
  realia: ['odstapienie', 'niezgodnosc'],
  audience: {
    adults:
      'Dla osób, które sprzedają albo planują sprzedawać przez internet, to jedna z najważniejszych lekcji. Poproś, żeby po zajęciach przeczytali regulamin swojego sklepu (lub wzorcowy regulamin platformy) i sprawdzili cztery zapisy z etapu 4. Wzory pouczeń i formularzy publikuje UOKiK.',
  },
  format: {
    name: 'Przypadki zwrotów i kontrola regulaminu',
    student:
      'Pomagasz Agnieszce z Bolesławca, która sprzedaje ceramikę przez własny sklep internetowy. Policzysz terminy i kwoty zwrotów, rozpoznasz wyjątki i poprawisz regulamin.',
    teacher:
      'Kontynuacja przypadku z lekcji 02. Uczniowie poznają prawo odstąpienia od umowy zawartej na odległość: 14 dni bez podania przyczyny, zwrot pieniędzy, koszt najtańszej dostawy, wyjątki. Ważne rozróżnienie na koniec: odstąpienie (towar dobry) i reklamacja (towar wadliwy).',
    grouping: 'Etapy 1 i 5 samodzielnie, etapy 2–4 w parach.',
    methods: [methods.przypadek, methods.jawne],
  },
  objectives: [
    'Liczę 14-dniowy termin na odstąpienie od umowy zawartej przez internet.',
    'Rozpoznaję towary, których nie można zwrócić bez podania przyczyny.',
    'Liczę kwotę zwrotu z kosztem dostawy.',
    'Znajduję w regulaminie zapisy niezgodne z prawem konsumenta.',
  ],
  materials: ['Urządzenie z przeglądarką', 'Kalendarz (np. w telefonie)'],
  teacherGuide: {
    preparation: 'Warto mieć pod ręką kalendarz na listopad 2026, żeby policzyć terminy. Możesz pokazać stronę UOKiK z prawami konsumenta.',
    summary:
      'Konsument może odstąpić od umowy zawartej przez internet w 14 dni od otrzymania towaru, bez podania przyczyny. Sklep zwraca pieniądze z kosztem najtańszej oferowanej dostawy. Koszt odesłania pokrywa konsument, jeśli został o tym poinformowany. Wyjątki: m.in. rzeczy robione na zamówienie według wskazań klienta. Wadliwy towar to reklamacja, a nie odstąpienie.',
  },
  sections: [
    {
      id: 'start',
      label: 'Start',
      title: 'Zwrot bez powodu?',
      grouping: 'solo',
      intro: 'Klientka kupiła w sklepie Agnieszki komplet talerzy. Po 10 dniach od dostawy pisze: „Kolor mi nie pasuje do kuchni, chcę oddać”.',
      ...note(
        5,
        'Każdy odpowiada sam. Zapytaj, kto zwracał coś kupionego w internecie i czy musiał podawać powód.',
        'Dlaczego przy zakupach w internecie przysługuje zwrot bez powodu, a w sklepie stacjonarnym nie?',
        'W internecie klient nie może obejrzeć i dotknąć towaru przed zakupem. Prawo daje mu czas, żeby zrobić to w domu.',
        'Przekonanie, że sklep może żądać powodu albo odmówić, bo „towar jest dobry”.',
        'Sprawdź, czy prawo odstąpienia dotyczy też zakupów od osoby prywatnej na portalu ogłoszeniowym (nie — dotyczy umów z przedsiębiorcą).',
      ),
      activities: [
        choice(
          'q-bez-powodu',
          'Czy klientka może oddać talerze?',
          [
            'Tak, ma 14 dni od otrzymania na odstąpienie',
            'Nie, bo talerze nie mają wady',
            'Tak, ale tylko jeśli poda pisemny powód zwrotu',
            'Nie, bo zwrot dotyczy tylko ubrań i obuwia',
          ],
          0,
          'Przy umowie zawartej przez internet konsument może odstąpić od niej w 14 dni bez podania przyczyny.',
          [
            null,
            'Wada nie jest potrzebna. Odstąpienie dotyczy towaru dobrego.',
            'Prawo nie wymaga podania przyczyny.',
            'Prawo dotyczy wszystkich towarów kupionych na odległość, poza wyjątkami z ustawy.',
          ],
        ),
      ],
    },
    {
      id: 'zasady',
      label: 'Zasady',
      title: 'Terminy i wyjątki',
      grouping: 'pair',
      intro: 'Agnieszka chce wiedzieć, co dokładnie musi przyjąć i do kiedy.',
      reading: {
        title: 'Odstąpienie od umowy zawartej przez internet',
        paragraphs: [
          'Konsument ma 14 dni od otrzymania towaru. Wystarczy, że w tym terminie wyśle oświadczenie, na przykład e-mailem. Towar odsyła w kolejnych 14 dniach. Sklep zwraca pieniądze w 14 dni od otrzymania oświadczenia, ale może poczekać, aż dostanie towar albo dowód jego odesłania.',
          'Prawo to nie dotyczy m.in. rzeczy zrobionych według wskazań klienta (kubek z imieniem), towarów szybko psujących się oraz zapieczętowanych ze względów higienicznych, gdy klient otworzył opakowanie.',
        ],
        example: {
          question: 'Talerze dostarczono w piątek 6 listopada. Do kiedy klientka może wysłać oświadczenie?',
          steps: ['14 dni liczy się od dnia po otrzymaniu towaru: pierwszy dzień to 7 listopada.', '7 listopada + 13 dni = 20 listopada.', 'Liczą się dni kalendarzowe, nie robocze.'],
          answer: 'Do 20 listopada włącznie.',
        },
      },
      ...note(
        12,
        'Przejdźcie przykład z kalendarzem. Potem dopasowanie wyjątków. Przy kubku z imieniem zapytaj, czy zwykły kubek ze wzorem z katalogu to też „według wskazań klienta” (nie).',
        'Dlaczego kubek z imieniem nie podlega zwrotowi, a kubek z katalogu tak?',
        'Bo kubek z imieniem zrobiono specjalnie dla tej osoby — sklep nie sprzeda go nikomu innemu.',
        'Liczenie 14 dni od zamówienia albo od wysłania towaru zamiast od otrzymania.',
        'Policz termin, gdy towar przyszedł 24 grudnia (do 7 stycznia).',
      ),
      activities: [
        choice(
          'q-termin',
          'Kubki dostarczono w poniedziałek 9 listopada. Do kiedy klient może wysłać oświadczenie o odstąpieniu?',
          ['23 listopada', '22 listopada', '20 listopada', '27 listopada'],
          0,
          'Pierwszy dzień terminu to 10 listopada, czternasty — 23 listopada.',
          [
            null,
            'To 13 dni po dostawie. Liczysz od dnia następnego, więc ostatni dzień to 23 listopada.',
            'To 10 dni roboczych. Termin liczy się w dniach kalendarzowych.',
            'To 14 dni roboczych. Termin liczy się w dniach kalendarzowych.',
          ],
        ),
        {
          type: 'matching',
          id: 'q-wyjatki',
          question: 'Czy klient może oddać towar bez podania przyczyny?',
          options: ['Tak', 'Nie'],
          rows: [
            { label: 'Komplet talerzy z katalogu sklepu', correct: 0 },
            { label: 'Kubek z imieniem „Zosia” zamówiony przez klienta', correct: 1, explanation: 'Rzecz wykonana według wskazań klienta.' },
            { label: 'Dzbanek ze standardowym wzorem, odpakowany i obejrzany', correct: 0, explanation: 'Otwarcie opakowania nie odbiera prawa do zwrotu.' },
            { label: 'Ciasto domowe zamówione na weekend', correct: 1, explanation: 'Towar szybko się psuje.' },
            { label: 'Miska z promocji „−30%”', correct: 0, explanation: 'Promocja nie zmienia prawa do odstąpienia.' },
          ],
          explanation: 'Zasadą jest prawo do zwrotu. Wyjątki są wymienione w ustawie i trzeba je znać, a nie dopisywać własne.',
        },
      ],
    },
    {
      id: 'kwota',
      label: 'Kwota zwrotu',
      title: 'Ile oddać?',
      grouping: 'pair',
      intro: 'Klientka zapłaciła 189 zł za talerze i 24,99 zł za dostawę kurierem ekspresowym. Najtańsza dostawa w sklepie to paczkomat za 14,99 zł. Odesłanie talerzy kosztowało klientkę 18 zł — regulamin informował, że koszt odesłania pokrywa kupujący.',
      ...note(
        10,
        'Pary liczą. Zapytaj, dlaczego sklep nie oddaje całych 24,99 zł za dostawę.',
        'Dlaczego sklep zwraca tylko 14,99 zł za dostawę?',
        'Bo klientka sama wybrała droższą dostawę. Sklep musi oddać koszt najtańszej oferowanej.',
        'Doliczanie kosztu odesłania, mimo że sklep o nim poinformował.',
        'Policz zwrot, gdyby regulamin nie informował o koszcie odesłania (221,99 zł — sklep pokrywa też 18 zł).',
      ),
      activities: [
        number('q-zwrot', 'Ile Agnieszka musi zwrócić klientce?', 203.99, '189 zł za towar + 14,99 zł (koszt najtańszej dostawy) = 203,99 zł. Ekspres i odesłanie pokrywa klientka.', {
          unit: 'zł',
          mistakes: [
            { value: 213.99, text: 'Sklep zwraca koszt najtańszej dostawy (14,99 zł), a nie ekspresowej.' },
            { value: 189, text: 'Sklep oddaje też koszt dostawy do klienta — najtańszej oferowanej.' },
            { value: 221.99, text: 'Koszt odesłania pokrywa klientka, bo regulamin ją o tym informował.' },
          ],
        }),
        choice(
          'q-kiedy',
          'Agnieszka dostała oświadczenie 12 listopada, a talerze dotarły do niej 18 listopada. Do kiedy najpóźniej musi oddać pieniądze?',
          ['26 listopada', '18 listopada', '2 grudnia', '12 grudnia'],
          0,
          '14 dni od otrzymania oświadczenia (12 listopada) to 26 listopada. Sklep może wstrzymać zwrot do otrzymania towaru, ale talerze przyszły wcześniej, 18 listopada.',
          [
            null,
            'Tego dnia przyszły talerze, ale termin na zwrot pieniędzy liczy się od oświadczenia.',
            'To 14 dni od otrzymania talerzy. Termin liczy się od oświadczenia.',
            'To 30 dni. Ustawowy termin to 14 dni.',
          ],
        ),
      ],
    },
    {
      id: 'regulamin',
      label: 'Regulamin',
      title: 'Regulamin do poprawy',
      grouping: 'pair',
      intro: 'Agnieszka skopiowała fragmenty regulaminu z innego sklepu. Sprawdź, czy wszystko jest zgodne z prawem konsumenta.',
      ...note(
        10,
        'Pary zaznaczają zapisy. Przy „oryginalnym opakowaniu” zapytaj: co klient może zrobić z towarem, zanim go odeśle?',
        'Co klient może zrobić z towarem w czasie 14 dni?',
        'Sprawdzić go tak, jak w sklepie stacjonarnym. Jeśli zużyje go ponad to, sklep może obniżyć zwrot o utratę wartości.',
        'Uznawanie, że sklep może dowolnie skracać terminy, jeśli „klient zaakceptował regulamin”.',
        'Napisz poprawioną wersję zapisu o zwrocie pieniędzy.',
      ),
      activities: [
        {
          type: 'spotErrors',
          id: 'q-regulamin',
          title: 'Regulamin sklepu — fragment o zwrotach',
          context: 'Zaznacz zapisy niezgodne z prawem konsumenta.',
          lines: [
            { text: '§ 7.1. Konsument może odstąpić od umowy w terminie 7 dni od otrzymania towaru.', error: 'Ustawowy termin to 14 dni. Krótszy zapis jest nieważny.' },
            { text: '§ 7.2. Kubki z imieniem wykonujemy na zamówienie — nie podlegają zwrotowi bez podania przyczyny.' },
            { text: '§ 7.3. Koszt odesłania towaru przy odstąpieniu od umowy pokrywa kupujący.' },
            { text: '§ 7.4. Zwracamy pieniądze wyłącznie w formie bonu na kolejne zakupy.', error: 'Zwrot w bonie tylko za zgodą klienta. Domyślnie tą samą metodą płatności.' },
            { text: '§ 7.5. Zwrot możliwy tylko w oryginalnym, nieotwartym opakowaniu.', error: 'Klient może otworzyć opakowanie i obejrzeć towar. Nie można wymagać nieotwartego opakowania.' },
            { text: '§ 8.1. Reklamacje rozpatrujemy w terminie 30 dni.', error: 'Na reklamację konsumenta sklep odpowiada w 14 dni. Brak odpowiedzi oznacza jej uznanie.' },
            { text: '§ 9. Sprzedawca: Agnieszka Nowak Ceramika, Bolesław­iec, NIP i adres e-mail do kontaktu.' },
          ],
          explanation: 'Cztery zapisy do poprawy. Zapisy gorsze dla konsumenta niż ustawa są nieważne, a mogą narazić sklep na kontrolę UOKiK.',
        },
      ],
    },
    {
      id: 'sprawdzenie',
      label: 'Sprawdzenie',
      title: 'Pęknięty talerz',
      grouping: 'solo',
      intro: 'Inny klient pisze: „Jeden talerz przyszedł pęknięty”. Załącza zdjęcie.',
      ...note(
        8,
        'Samodzielnie. Po karcie wyniku porównaj odstąpienie i reklamację na tablicy w dwóch kolumnach.',
        'Czym różni się odstąpienie od reklamacji?',
        'Odstąpienie: towar dobry, 14 dni, bez powodu. Reklamacja: towar niezgodny z umową (wada), 2 lata, sklep naprawia, wymienia, obniża cenę albo zwraca pieniądze.',
        'Traktowanie pękniętego talerza jak zwykłego zwrotu, za który klient płaci odesłanie.',
        'Napisz krótką odpowiedź do klienta z pękniętym talerzem.',
      ),
      activities: [
        choice(
          'q-pekniety',
          'Jak potraktować zgłoszenie?',
          [
            'Jako reklamację: towar niezgodny z umową',
            'Jako odstąpienie: klient płaci za odesłanie',
            'Jako reklamację, ale tylko jeśli klient ma paragon papierowy',
            'Jako winę firmy kurierskiej, więc sklep nie odpowiada',
          ],
          0,
          'Pęknięty talerz to niezgodność z umową. Odpowiada sprzedawca — także za uszkodzenia w transporcie do konsumenta. Odpowiedź w 14 dni.',
          [
            null,
            'Odstąpienie dotyczy towaru dobrego. Przy wadzie klient nie ponosi kosztu odesłania.',
            'Dowodem zakupu może być potwierdzenie zamówienia czy przelewu, nie tylko paragon.',
            'Wobec konsumenta odpowiada sprzedawca. Ze sklepem rozlicza się później kurier.',
          ],
        ),
        text(
          'q-odpowiedz',
          'Napisz krótką odpowiedź do klienta z pękniętym talerzem.',
          'Dzień dobry, bardzo przepraszamy za pęknięty talerz. Przyjmujemy reklamację — wyślemy nowy talerz w ciągu 3 dni roboczych na nasz koszt. Uszkodzonego nie trzeba odsyłać, wystarczy zdjęcie, które Pan przysłał. Pozdrawiam, Agnieszka.',
          { criteria: ['Jest przyjęcie reklamacji.', 'Jest konkretne rozwiązanie i termin.', 'Klient nie ponosi kosztów.'] },
        ),
        {
          type: 'resultCard',
          id: 'karta',
          badges: [
            { min: 0, name: 'Do powtórki', text: 'Wróć do zasad odstąpienia i do przykładu z terminem.' },
            { min: 0.6, name: 'Znasz prawa klienta', text: 'Powtórz kwotę zwrotu i regulamin.' },
            { min: 0.85, name: 'Bezpieczny e-sklep', text: 'Obsłużysz zwrot zgodnie z prawem i poprawisz regulamin.' },
          ],
        },
      ],
    },
  ],
  exitTicket: 'Internet: 14 dni od otrzymania towaru na odstąpienie, bez powodu. Zwrot ceny i najtańszej dostawy w 14 dni od oświadczenia. Wyjątki m.in. rzeczy na indywidualne zamówienie. Wada = reklamacja.',
};
