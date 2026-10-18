import { choice } from '../schema.js';
import { int, pick, shuffle } from './helpers.js';

const reviews = [
  {
    review: '★☆☆☆☆ „Zamówiłam prezent na urodziny córki, przyszedł dzień po urodzinach. Na stronie było «wysyłka w 24 h».” — Marta',
    replies: [
      'Pani Marto, przepraszamy — paczka wyszła od nas dopiero po dwóch dniach, a obiecaliśmy 24 godziny. Napiszemy do Pani na e-mail z zamówienia z propozycją rekompensaty. Poprawiliśmy też informację o czasie wysyłki w okresie świątecznym.',
      'Wysłaliśmy zgodnie z regulaminem, opóźnienie to wina przewoźnika.',
      'Dziękujemy za opinię! Zapraszamy ponownie i życzymy miłego dnia!',
      'Pani Marto Kowalska, zamówienie nr 2231 na ul. Słoneczną wysłaliśmy w czwartek.',
    ],
    why: [null, 'Zrzucanie winy na przewoźnika brzmi jak wymówka, a obietnica „24 h” była Wasza.', 'Szablon bez odniesienia do problemu — inni klienci widzą, że nikt nie przeczytał opinii.', 'Publikujesz nazwisko, numer zamówienia i adres klientki.'],
  },
  {
    review: '★★☆☆☆ „Kawa dobra, ale w sobotę czekałem 20 minut na zamówienie, a obsługa nawet nie przeprosiła.” — Paweł',
    replies: [
      'Dziękujemy, że Pan napisał. W soboty rano mamy najwięcej gości i od tego tygodnia pracują wtedy dwie osoby za barem. Przepraszamy za czekanie i za brak słowa od nas. Następna kawa na nasz koszt — wystarczy pokazać tę odpowiedź.',
      'W soboty zawsze jest kolejka, trzeba przyjść wcześniej.',
      'Nasi baristowie są najlepsi w mieście, nie zgadzamy się z tą opinią.',
    ],
    why: [null, 'Pouczanie klienta w publicznej odpowiedzi zniechęca innych.', 'Kłótnia z opinią zamiast odniesienia się do problemu.'],
  },
  {
    review: '★☆☆☆☆ „Kurtka przemokła po pierwszym deszczu. Reklamację wysłałem tydzień temu, cisza.” — Tomek',
    replies: [
      'Panie Tomku, przepraszamy za tydzień ciszy. Reklamacja do nas dotarła — odpowiemy na nią e-mailem najpóźniej w piątek. Jeśli kurtka nie trzyma deklarowanej wodoodporności, zaproponujemy wymianę albo zwrot pieniędzy.',
      'Proszę czytać metki, kurtka nie jest przeznaczona na ulewę.',
      'Przykro nam. Pozdrawiamy serdecznie!',
      'Reklamacje rozpatrujemy do 30 dni, proszę cierpliwie czekać.',
    ],
    why: [null, 'Odpowiedź bez sprawdzenia reklamacji i z pretensją do klienta.', 'Brak odniesienia do sprawy i brak konkretu.', 'Na reklamację konsumenta odpowiada się w 14 dni, nie w 30.'],
  },
  {
    review: '★★★★★ „Pani Ania doradziła mi farbę do łazienki i dobrze, że nie wzięłam tej, którą chciałam. Polecam!” — Kasia',
    replies: [
      'Pani Kasiu, dziękujemy — przekażemy Ani! Cieszymy się, że łazienka gotowa. Gdyby po kilku tygodniach coś niepokoiło przy fugach, zapraszamy, doradzimy.',
      'Dziękujemy za opinię! Zapraszamy ponownie! Dziękujemy za opinię! Zapraszamy ponownie!',
      'Dziękujemy. Mamy też promocję na pędzle −20%, szczegóły na stronie.',
    ],
    why: [null, 'Ten sam szablon pod każdą opinią wygląda jak automat.', 'Reklama w odpowiedzi na podziękowanie wypada źle.'],
  },
];

const draft = [
  ['Dziękujemy za opinię i przepraszamy za opóźnienie.'],
  ['Paczka powinna dotrzeć w 2 dni robocze, a dotarła po 5.'],
  ['We wtorek mieliśmy awarię centrali telefonicznej, już usuniętą.'],
  ['Prosimy o kontakt na sklep@przyklad.pl — sprawdzimy, co się stało z przesyłką.'],
  ['Panie Tomaszu Nowak, Pana zamówienie nr 4512 na ul. Lipową 7 wysłaliśmy zgodnie z procedurą.', 'Publiczna odpowiedź ujawnia nazwisko, numer zamówienia i adres.'],
  ['To wina firmy kurierskiej, nie nasza.', 'Dla klienta to Wasza dostawa. Obwinianie innych brzmi jak wymówka.'],
  ['Może trzeba było zamówić wcześniej.', 'Pouczanie klienta w publicznej odpowiedzi szkodzi firmie.'],
  ['Inni klienci nie mają z nami problemów.', 'Porównywanie z innymi lekceważy problem klienta.'],
];

const fakeCases = [
  {
    text: 'Znajomy proponuje: „Za 150 zł wrzucę ci 30 opinii pięciogwiazdkowych z różnych kont”. Co z tym zrobić?',
    options: ['Odmówić — zlecanie fałszywych opinii jest zakazane', 'Przyjąć, jeśli opinie będą dobrze napisane', 'Przyjąć, jeśli opinii będzie mniej niż 10'],
    correct: 0,
    explanation: 'Zamieszczanie i zlecanie fałszywych opinii to nieuczciwa praktyka rynkowa. UOKiK nakłada za to kary.',
    why: [null, 'Jakość tekstu nie ma znaczenia — opinie są fałszywe.', 'Liczba nie ma znaczenia — każda fałszywa opinia jest zakazana.'],
  },
  {
    text: 'Na stronie sklepu pokazujesz opinie klientów. Co musisz przy nich napisać?',
    options: ['Czy i jak sprawdzasz, że opinie pochodzą od osób, które kupiły produkt', 'Nic, opinie mówią same za siebie', 'Że opinie negatywne usuwasz po 30 dniach', 'Ile kosztowało zebranie opinii'],
    correct: 0,
    explanation: 'Od 2023 r. firma, która udostępnia opinie, informuje, czy i w jaki sposób sprawdza, że pochodzą od prawdziwych klientów.',
    why: [null, 'Taka informacja jest obowiązkowa.', 'Ukrywanie negatywnych opinii wprowadza klientów w błąd.', 'Tego prawo nie wymaga.'],
  },
  {
    text: 'Siostra chce wystawić Twojemu sklepowi opinię 5★, choć nic u Ciebie nie kupiła. Co odpowiadasz?',
    options: ['Żeby tego nie robiła — to byłaby fałszywa opinia', 'Że może, bo rodzina to też klienci', 'Że może, jeśli doda „polecam”'],
    correct: 0,
    explanation: 'Opinia osoby, która nie kupiła ani nie używała produktu, wprowadza w błąd innych klientów.',
    why: [null, 'Siostra nie była klientką.', 'Treść nie zmienia tego, że opinia jest nieprawdziwa.'],
  },
];

export default {
  id: 'opinie',
  order: 2,
  title: 'Opinie i wiadomości od klientów',
  subtitle: 'Odpowiedź na jedną gwiazdkę, e-mail bez numeru zamówienia, telefon, na który nie znasz odpowiedzi.',
  who: 'Dla osób prowadzących sklep, punkt usługowy albo profil firmy w mapach i mediach społecznościowych.',
  minutes: 10,
  round: 6,
  modules: [6, 5],
  realia: ['opinie'],
  brief: [
    'Odpowiedź na opinię czytają przyszli klienci, nie tylko autor. Podziękuj, odnieś się do faktów, przeproś za to, co naprawdę poszło źle, i zaproponuj kontakt.',
    'Nie podawaj danych klienta (nazwiska, adresu, numeru zamówienia). Nie kłóć się i nie zrzucaj winy na kuriera czy pracownika.',
    'Fałszywe opinie są zakazane: nie kupujesz ich i nie prosisz o nie rodziny. Jeśli pokazujesz opinie na stronie, piszesz, jak sprawdzasz, że są od klientów.',
    'Wiadomość bez danych: poproś krótko o to, czego potrzebujesz, i powiedz, co zrobisz dalej.',
    'Telefon: nazwa firmy i imię. Zapisz, kto dzwoni, w jakiej sprawie, do kiedy i numer. Obiecuj tylko to, co sprawdzisz.',
  ],
  pool: [
    {
      id: 'odpowiedz',
      skill: 'opinia',
      make(r) {
        const c = pick(r, reviews);
        return choice('odpowiedz', `Opinia w mapach: ${c.review} Którą odpowiedź publikujesz?`, c.replies, 0, 'Konkret, przeprosiny za to, co faktycznie poszło źle, i następny krok. Bez danych klienta i bez kłótni.', c.why);
      },
    },
    {
      id: 'szkic',
      skill: 'opinia',
      make(r) {
        const bad = shuffle(r, draft.filter(x => x[1])).slice(0, int(r, 1, 3));
        const good = draft.filter(x => !x[1]);
        return {
          type: 'spotErrors',
          id: 'szkic',
          title: 'Szkic odpowiedzi na opinię „Paczka szła 5 dni, nikt nie odbierał telefonu”',
          context: 'Zaznacz zdania, które trzeba usunąć.',
          lines: shuffle(r, [...good, ...bad]).map(([text, error]) => (error ? { text, error } : { text })),
          explanation: `Do usunięcia: ${bad.length}. Reszta to rzeczowa, uprzejma odpowiedź.`,
        };
      },
    },
    {
      id: 'uklad',
      skill: 'opinia',
      make(r) {
        const items = pick(r, [
          [
            'Dziękujemy, że Pani o tym napisała.',
            'Zamówienie powinno dotrzeć w 2 dni, a szło 5 — przepraszamy.',
            'Od poniedziałku paczki wysyłamy dwa razy dziennie.',
            'Prosimy o wiadomość na sklep@przyklad.pl, zaproponujemy rabat na kolejne zakupy.',
          ],
          [
            'Dziękujemy za szczerą opinię.',
            'Ma Pan rację: w sobotę czekał Pan na kawę 20 minut i nikt tego nie wyjaśnił.',
            'Od tego tygodnia w soboty rano za barem pracują dwie osoby.',
            'Następna kawa na nasz koszt — wystarczy pokazać tę odpowiedź przy barze.',
          ],
        ]);
        return {
          type: 'sequence',
          id: 'uklad',
          question: 'Ułóż odpowiedź na negatywną opinię w kolejności.',
          items,
          explanation: 'Podziękowanie, fakty z przeprosinami, co zmieniacie, następny krok dla klienta. Taka kolejność zamyka sprawę, a nie otwiera dyskusji.',
        };
      },
    },
    {
      id: 'falszywe',
      skill: 'prawo',
      make(r) {
        const c = pick(r, fakeCases);
        return choice('falszywe', c.text, c.options, c.correct, c.explanation, c.why);
      },
    },
    {
      id: 'mail',
      skill: 'wiadomość',
      make(r) {
        const [message, ask] = pick(r, [
          ['„Gdzie jest moja paczka???”', 'numer zamówienia albo e-mail i datę zakupu'],
          ['„Proszę o fakturę za zakupy z zeszłego tygodnia.”', 'numer zamówienia, NIP i dane firmy do faktury'],
          ['„Towar odesłany tydzień temu, kiedy będą pieniądze?”', 'numer zamówienia albo numer przesyłki zwrotnej'],
        ]);
        return choice(
          'mail',
          `Przychodzi e-mail: ${message} Bez podpisu i bez numeru zamówienia. Co odpisujesz?`,
          [
            'Że bez danych nie da się nic sprawdzić',
            `Prośbę o ${ask}, z obietnicą sprawdzenia od razu`,
            'Że wszystko idzie zgodnie z regulaminem, więc wystarczy poczekać',
            'Nic — wiadomość bez podpisu może być spamem',
          ],
          1,
          'Prosisz o konkretne dane i mówisz, co zrobisz dalej. Klient dostaje odpowiedź, a nie odmowę.',
          ['To zamyka rozmowę, zamiast poprosić o dane.', null, 'Uspokajasz bez sprawdzenia.', 'Brak odpowiedzi tylko zwiększy złość klienta.'],
        );
      },
    },
    {
      id: 'ton',
      skill: 'wiadomość',
      make: () =>
        choice(
          'ton',
          'Klient pisze wielkimi literami: „TO JUŻ TRZECI MAIL!!! ODDAJCIE PIENIĄDZE!!!”. Zwrot został zlecony wczoraj — przelew dojdzie jutro. Co odpisujesz?',
          [
            'Przepraszam, że musiał Pan pisać trzy razy. Zwrot 189 zł zleciliśmy wczoraj, pieniądze będą na koncie jutro. Potwierdzenie przelewu w załączniku.',
            'Prosimy o kulturalny ton, wtedy odpowiemy.',
            'Zwrot w toku.',
          ],
          0,
          'Przeprosiny za to, co poszło źle (trzy maile bez odpowiedzi), konkretna kwota, termin i dowód. Ton klienta zostawiasz bez komentarza.',
          [null, 'Pouczanie o tonie zaostrza rozmowę, a klient ma rację, że czekał.', 'Za mało: brakuje kwoty, terminu i przeprosin.'],
        ),
    },
    {
      id: 'telefon',
      skill: 'telefon',
      make: () => ({
        type: 'dialog',
        id: 'telefon',
        title: 'Dzwoni klientka z pytaniem o termin',
        context: 'Prowadzisz sklep z artykułami papierniczymi. Telefon odbierasz o 9:40.',
        start: 'n1',
        nodes: {
          n1: {
            speaker: 'Klientka',
            text: 'Dzień dobry, dzwonię ze szkoły. Zdążycie dowieźć 200 zeszytów na poniedziałek?',
            choices: [
              { text: 'Na pewno zdążymy, zeszyty zawsze mamy.', next: 'n2', good: false, feedback: 'Obietnica bez sprawdzenia. Jeśli zabraknie towaru, szkoła zostanie bez zeszytów.' },
              { text: 'Sprawdzę stan w magazynie i oddzwonię do 12:00. Pasuje?', next: 'n2', good: true, feedback: 'Nie zgadujesz i podajesz konkretną godzinę.' },
              { text: 'Nie wiem, proszę zadzwonić jutro.', next: 'n2', good: false, feedback: 'Przerzucasz pracę na klientkę.' },
            ],
          },
          n2: {
            speaker: 'Klientka',
            text: 'Dobrze. Zapisze Pan lub Pani numer?',
            choices: [
              { text: 'Numer się wyświetla, nie trzeba.', next: 'n3', good: false, feedback: 'Na wyświetlaczu bywa numer centrali albo numer ukryty.' },
              { text: 'Tak: 56 622 14 08. Powtórzę: 56 622 14 08 — zgadza się?', next: 'n3', good: true, feedback: 'Powtórzenie numeru chroni przed pomyłką w jednej cyfrze.' },
            ],
          },
          n3: {
            speaker: 'Klientka',
            text: 'Zgadza się. Czekam na telefon.',
            choices: [
              { text: 'Dobrze, pa.', next: 'end', good: false, feedback: 'Zbyt potocznie i bez podsumowania.' },
              { text: 'Podsumuję: 200 zeszytów A5 w kratkę na poniedziałek, oddzwonię do 12:00. Do usłyszenia.', next: 'end', good: true, feedback: 'Podsumowanie zamyka rozmowę bez nieporozumień.' },
            ],
          },
          end: { end: true, text: 'Sprawdzasz magazyn i oddzwaniasz o 11:30: zeszyty są, dostawa w poniedziałek rano.' },
        },
      }),
    },
    {
      id: 'notatka',
      skill: 'telefon',
      make: () => ({
        type: 'docForm',
        id: 'notatka',
        title: 'Notatka z rozmowy dla osoby, która przejmie sprawę',
        context: 'Rozmowa: „Dzień dobry, tu Iwona Mazur z sekretariatu Szkoły Podstawowej nr 12. Potrzebujemy 200 zeszytów A5, 32 kartki, w kratkę, na poniedziałek. Proszę o odpowiedź do 14:00, numer 56 622 14 08.”',
        points: 4,
        doc: {
          title: 'Notatka z rozmowy — wtorek, 9:40',
          meta: [
            ['Kto dzwonił', { f: 'kto' }],
            ['Sprawa', { f: 'sprawa' }],
            ['Termin odpowiedzi', { f: 'termin' }],
            ['Telefon', { f: 'telefon' }],
          ],
        },
        fields: {
          kto: { label: 'Kto dzwonił', kind: 'select', options: ['Iwona Mazur, sekretariat SP 12', 'Szkoła', 'Nie podano'], answer: 'Iwona Mazur, sekretariat SP 12', hint: 'Klientka przedstawiła się na początku.' },
          sprawa: { label: 'Sprawa', kind: 'select', options: ['Zeszyty dla szkoły', '200 zeszytów A5, 32 kartki, kratka, na poniedziałek', 'Reklamacja zeszytów'], answer: '200 zeszytów A5, 32 kartki, kratka, na poniedziałek', hint: 'Osoba, która przejmie sprawę, musi wiedzieć, jaki dokładnie towar przygotować.' },
          termin: { label: 'Termin odpowiedzi', kind: 'select', options: ['Jutro rano', 'Dziś do 14:00', 'Nie ustalono'], answer: 'Dziś do 14:00', hint: 'Klientka podała godzinę.' },
          telefon: { label: 'Telefon', kind: 'text', answer: '56 622 14 08', accept: ['566221408', '56-622-14-08'], hint: 'Przepisz numer z rozmowy.' },
        },
        explanation: 'Dobra notatka pozwala komuś innemu załatwić sprawę bez dzwonienia do Ciebie: kto, co dokładnie, do kiedy, numer.',
      }),
    },
    {
      id: 'kiedy',
      skill: 'opinia',
      make: () =>
        choice(
          'kiedy',
          'Kiedy odpowiedzieć na negatywną opinię?',
          ['Od razu, w ciągu kilku minut', 'W ciągu dnia lub dwóch, po sprawdzeniu, co się stało', 'Wcale — odpowiedź przyciąga uwagę', 'Po miesiącu, gdy emocje opadną'],
          1,
          'Szybko, ale nie w emocjach i nie bez sprawdzenia faktów.',
          ['W pośpiechu łatwo o odpowiedź bez faktów albo w złości.', null, 'Brak odpowiedzi wygląda tak, jakby firmie nie zależało.', 'Po miesiącu odpowiedź nikomu już nie pomoże.'],
        ),
    },
    {
      id: 'zgloszenie',
      skill: 'prawo',
      make: () =>
        choice(
          'zgloszenie',
          'Pod wizytówką pojawiła się opinia 1★ z konta, które w tym samym dniu oceniło 40 firm w całej Polsce. W Twoim sklepie nikt taki nie kupował. Co robisz?',
          [
            'Zgłaszasz opinię do serwisu jako niezgodną z zasadami i odpowiadasz krótko, że nie znajdujesz takiego zakupu',
            'Prosisz znajomych o 10 opinii 5★, żeby ją przykryć',
            'Odpowiadasz, że to na pewno konkurencja, i podajesz nazwę podejrzanej firmy',
          ],
          0,
          'Opinię usuwa serwis, jeśli narusza jego zasady. Spokojna odpowiedź pokazuje innym, że sprawdzasz zgłoszenia.',
          [null, 'To byłyby fałszywe opinie — zakazane.', 'Oskarżenie bez dowodów może skończyć się sporem o naruszenie dóbr osobistych.'],
        ),
    },
  ],
};
