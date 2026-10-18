import { choice, number } from '../schema.js';
import { addDays, dateLabel, int, pick, shuffle, workdayWithDeadline, zl } from './helpers.js';

const exceptions = [
  ['Komplet talerzy z katalogu sklepu', 0, 'Zwykły towar z oferty — klient może go oddać bez podania przyczyny.'],
  ['Kubek z imieniem „Zosia” zrobiony na zamówienie', 1, 'Rzecz wykonana według wskazań klienta.'],
  ['Sweter odpakowany i przymierzony w domu', 0, 'Otwarcie opakowania i przymierzenie nie odbiera prawa do zwrotu.'],
  ['Tort zamówiony na sobotę', 1, 'Towar szybko się psuje.'],
  ['Lampa kupiona w promocji „−40%”', 0, 'Promocja nie zmienia prawa do odstąpienia.'],
  ['Szczoteczka do zębów, opakowanie otwarte', 1, 'Towar zapieczętowany ze względów higienicznych, otwarty po dostawie.'],
  ['Zasłony uszyte na wymiar okna klienta', 1, 'Rzecz wykonana według wskazań klienta.'],
  ['Buty w rozmiarze, który okazał się za mały', 0, 'Zły rozmiar to typowy powód zwrotu — i nie trzeba go nawet podawać.'],
  ['Puzzle 1000 elementów, folia zdjęta', 0, 'Puzzle nie są towarem higienicznym. Klient może je obejrzeć i oddać.'],
];

const rules = [
  ['§ 4. Konsument może odstąpić od umowy w terminie 14 dni od otrzymania towaru, bez podania przyczyny.'],
  ['§ 4. Konsument może odstąpić od umowy w terminie 7 dni od otrzymania towaru.', 'Ustawowy termin to 14 dni. Zapis krótszy dla konsumenta jest nieważny.'],
  ['§ 5. Koszt odesłania towaru przy odstąpieniu od umowy pokrywa kupujący.'],
  ['§ 5. Zwracamy pieniądze wyłącznie w formie bonu na kolejne zakupy.', 'Bon tylko za zgodą klienta. Zwrot idzie tą metodą, którą klient zapłacił.'],
  ['§ 5. Zwracamy pieniądze w ciągu 14 dni od otrzymania oświadczenia, tą samą metodą płatności.'],
  ['§ 6. Zwrot przyjmujemy tylko w oryginalnym, nieotwartym opakowaniu.', 'Klient może otworzyć opakowanie i obejrzeć towar. Nie można wymagać nieotwartego opakowania.'],
  ['§ 6. Towary wykonane na indywidualne zamówienie (np. z nadrukiem imienia) nie podlegają zwrotowi bez podania przyczyny.'],
  ['§ 7. Na reklamacje odpowiadamy w ciągu 30 dni.', 'Na reklamację konsumenta odpowiada się w 14 dni. Brak odpowiedzi oznacza jej uznanie.'],
  ['§ 7. Za towar uszkodzony w transporcie odpowiada firma kurierska, nie sklep.', 'Wobec konsumenta odpowiada sprzedawca. Z kurierem rozlicza się sam.'],
  ['§ 8. Dane sprzedawcy: imię i nazwisko, adres, NIP, e-mail i telefon do kontaktu.'],
];

const professional = [
  {
    text: 'Fryzjerka z jednoosobową firmą kupuje w Twoim sklepie suszarkę do salonu, na fakturę z NIP. Po tygodniu chce ją oddać bez podania przyczyny.',
    answer: 1,
    explanation: 'Suszarka do salonu ma dla fryzjerki charakter zawodowy (to jej branża). Ochrona jak dla konsumenta jej nie obejmuje — zwrot zależy od Twojego regulaminu.',
  },
  {
    text: 'Księgowa z jednoosobową firmą kupuje na fakturę ekspres do kawy do biura. Po tygodniu chce go oddać bez podania przyczyny.',
    answer: 0,
    explanation: 'Ekspres nie ma dla księgowej charakteru zawodowego (to nie jej branża). Osoba fizyczna z firmą ma wtedy prawo odstąpienia jak konsument.',
  },
  {
    text: 'Spółka z o.o. prowadząca kawiarnię kupuje 20 kubków i po tygodniu chce je oddać bez podania przyczyny.',
    answer: 1,
    explanation: 'Spółka nie jest konsumentem ani osobą fizyczną z firmą. Zwrot bez podania przyczyny nie wynika z ustawy, tylko z regulaminu.',
  },
];

export default {
  id: 'zwroty',
  order: 1,
  title: 'Zwroty w sklepie internetowym',
  subtitle: 'Terminy, kwota zwrotu, wyjątki i regulamin. Każda seria ma inne daty i kwoty.',
  who: 'Dla osób, które sprzedają albo chcą sprzedawać przez własny sklep internetowy, platformę lub media społecznościowe.',
  minutes: 10,
  round: 7,
  modules: [5],
  realia: ['odstapienie', 'niezgodnosc'],
  brief: [
    'Konsument ma 14 dni na odstąpienie od umowy zawartej przez internet, bez podania przyczyny. Liczysz od dnia po otrzymaniu towaru, w dniach kalendarzowych. Liczy się wysłanie oświadczenia, a nie paczki.',
    'Klient odsyła towar w 14 dni od oświadczenia. Ty oddajesz pieniądze w 14 dni od oświadczenia, ale możesz poczekać, aż dostaniesz towar albo dowód jego nadania.',
    'Oddajesz cenę i koszt najtańszej dostawy z Twojej oferty. Odesłanie opłaca klient, jeśli regulamin go o tym informował.',
    'Pieniądze wracają tą metodą, którą klient zapłacił. Bon zamiast pieniędzy — tylko gdy klient się zgodzi.',
    'Bez podania przyczyny nie oddaje się m.in. rzeczy zrobionych według wskazań klienta, szybko psujących się i rozpieczętowanych towarów higienicznych.',
    'Towar z wadą to nie zwrot, tylko reklamacja: odpowiadasz 2 lata, na zgłoszenie odpowiadasz w 14 dni.',
  ],
  pool: [
    {
      id: 'termin',
      skill: 'termin',
      make(r) {
        const delivery = workdayWithDeadline(r, 14);
        const last = addDays(delivery, 14);
        return choice(
          'termin',
          `Paczka dotarła do klientki w ${dateLabel(delivery)}. Jaki jest ostatni dzień na wysłanie oświadczenia o odstąpieniu?`,
          [dateLabel(last), dateLabel(addDays(delivery, 13)), dateLabel(addDays(delivery, 30)), dateLabel(addDays(delivery, 7))],
          0,
          `Pierwszy dzień terminu to dzień po dostawie (${dateLabel(addDays(delivery, 1))}), czternasty — ${dateLabel(last)}.`,
          [null, 'Tu dzień dostawy liczy się jako pierwszy. Termin zaczyna się dzień później.', 'Ustawa daje 14 dni, nie 30.', 'To 7 dni — tyle bywa w starych regulaminach, ale ustawowy termin to 14 dni.'],
        );
      },
    },
    {
      id: 'zdazyl',
      skill: 'termin',
      make(r) {
        const after = int(r, 9, 16);
        const late = int(r, 6, 12);
        const ok = after <= 14;
        return choice(
          'zdazyl',
          `Klient dostał paczkę, a po ${after} dniach wysłał e-mail, że odstępuje od umowy. Towar odesłał później — dotarł do sklepu ${late} dni po e-mailu. Czy odstąpienie jest skuteczne?`,
          ['Tak', 'Nie — minęło więcej niż 14 dni od dostawy', 'Nie — paczka wróciła do sklepu po terminie'],
          ok ? 0 : 1,
          ok
            ? 'Liczy się wysłanie oświadczenia w 14 dni. Klient ma kolejne 14 dni na odesłanie towaru.'
            : `Oświadczenie wysłano po ${after} dniach, czyli po terminie. Sklep może przyjąć zwrot dobrowolnie, ale nie musi.`,
          ok
            ? [null, `${after} dni mieści się w 14 dniach.`, 'Na odesłanie klient ma 14 dni od oświadczenia — zdążył.']
            : ['Oświadczenie przyszło po 14 dniach od dostawy.', null, 'Problemem nie jest paczka, tylko spóźnione oświadczenie.'],
        );
      },
    },
    {
      id: 'kwota',
      skill: 'kwota',
      make(r) {
        const price = pick(r, [79, 119, 149, 189, 239, 349]);
        const cheapest = pick(r, [9.99, 12.99, 14.99]);
        const chosen = pick(r, [19.99, 24.99, 29.99]);
        const back = pick(r, [13.5, 16, 18]);
        const informed = r() < 0.65;
        const answer = Math.round((price + cheapest + (informed ? 0 : back)) * 100) / 100;
        const mistakes = [
          { value: Math.round((price + chosen) * 100) / 100, text: `Sklep oddaje koszt najtańszej dostawy (${zl(cheapest)}), a nie tej, którą wybrał klient.` },
          { value: price, text: 'Sklep oddaje też koszt dostawy do klienta — najtańszej z oferty.' },
        ];
        if (informed) mistakes.push({ value: Math.round((price + cheapest + back) * 100) / 100, text: 'Odesłanie opłaca klient, bo regulamin go o tym informował.' });
        else mistakes.push({ value: Math.round((price + cheapest) * 100) / 100, text: 'Regulamin nie informował, że odesłanie opłaca klient — wtedy ten koszt ponosi sklep.' });
        return number(
          'kwota',
          `Klient zapłacił ${zl(price)} za towar i ${zl(chosen)} za kuriera. Najtańsza dostawa w sklepie to paczkomat za ${zl(cheapest)}. Odesłanie kosztowało go ${zl(back)}. ${informed ? 'Regulamin informował, że koszt odesłania pokrywa kupujący.' : 'Regulamin nic nie mówi o koszcie odesłania.'} Ile sklep musi oddać?`,
          answer,
          informed
            ? `${zl(price)} + ${zl(cheapest)} = ${zl(answer)}. Droższą dostawę i odesłanie pokrywa klient.`
            : `${zl(price)} + ${zl(cheapest)} + ${zl(back)} = ${zl(answer)}. Bez informacji w regulaminie odesłanie też idzie na koszt sklepu.`,
          { unit: 'zł', mistakes },
        );
      },
    },
    {
      id: 'wyjatki',
      skill: 'wyjątki',
      make(r) {
        const rows = shuffle(r, exceptions).slice(0, int(r, 4, 6));
        return {
          type: 'matching',
          id: 'wyjatki',
          question: 'Czy klient może oddać ten towar bez podania przyczyny?',
          options: ['Tak', 'Nie'],
          rows: rows.map(([label, correct, explanation]) => ({ label, correct, explanation })),
          explanation: 'Zasadą jest prawo do zwrotu. Wyjątki wymienia ustawa — nie dopisuje się własnych.',
        };
      },
    },
    {
      id: 'regulamin',
      skill: 'regulamin',
      make(r) {
        const bad = shuffle(r, rules.filter(x => x[1])).slice(0, int(r, 1, 3));
        const good = shuffle(r, rules.filter(x => !x[1])).slice(0, int(r, 3, 4));
        const lines = shuffle(r, [...bad, ...good]).map(([text, error]) => (error ? { text, error } : { text }));
        return {
          type: 'spotErrors',
          id: 'regulamin',
          title: 'Fragment regulaminu do sprawdzenia',
          context: 'Zaznacz zapisy niezgodne z prawami konsumenta. Może ich być mniej, niż się spodziewasz.',
          lines,
          explanation: `Do poprawy: ${bad.length}. Zapis gorszy dla konsumenta niż ustawa jest nieważny, a może skończyć się kontrolą UOKiK.`,
        };
      },
    },
    {
      id: 'pieniadze',
      skill: 'kwota',
      make(r) {
        const statement = workdayWithDeadline(r, 14);
        const arrived = addDays(statement, int(r, 3, 9));
        const last = addDays(statement, 14);
        return choice(
          'pieniadze',
          `Oświadczenie o odstąpieniu przyszło w ${dateLabel(statement)}, a towar wrócił do Ciebie w ${dateLabel(arrived)}. Do kiedy najpóźniej oddajesz pieniądze?`,
          [dateLabel(last), dateLabel(addDays(arrived, 14)), dateLabel(arrived), dateLabel(addDays(statement, 30))],
          0,
          `14 dni liczysz od oświadczenia: do ${dateLabel(last)}. Można było czekać na towar, ale wrócił wcześniej.`,
          [null, 'Termin liczy się od oświadczenia, nie od zwrotu towaru.', 'Możesz oddać pieniądze tego dnia, ale termin jest dłuższy.', 'Ustawa daje 14 dni, nie 30.'],
        );
      },
    },
    {
      id: 'bon',
      skill: 'zasady',
      make: () =>
        choice(
          'bon',
          'Klientka odstąpiła od umowy w terminie. Zapłaciła BLIK-iem. Chcesz oddać jej bon na 200 zł zamiast pieniędzy. Co możesz zrobić?',
          ['Zaproponować bon, ale oddać pieniądze, jeśli klientka się nie zgodzi', 'Wysłać bon, bo tak stanowi regulamin', 'Oddać pieniądze gotówką przy odbiorze osobistym'],
          0,
          'Zwrot idzie tą samą metodą płatności. Bon wolno dać tylko za wyraźną zgodą klientki.',
          [null, 'Zapis o zwrocie wyłącznie w bonie jest nieważny.', 'Klientka płaciła BLIK-iem, więc zwrot idzie na jej konto, chyba że sama wybierze inaczej.'],
        ),
    },
    {
      id: 'pekniety',
      skill: 'reklamacja',
      make: () =>
        choice(
          'pekniety',
          'Klient pisze: „Jeden z talerzy przyszedł pęknięty”, i dołącza zdjęcie. Jak to traktujesz?',
          [
            'Jako odstąpienie od umowy — klient płaci za odesłanie',
            'Jako reklamację — towar jest niezgodny z umową',
            'Jako szkodę kuriera — klient ma się zwrócić do firmy kurierskiej',
            'Jako reklamację, ale tylko z paragonem papierowym',
          ],
          1,
          'Pęknięty talerz to niezgodność z umową. Odpowiada sprzedawca, także za uszkodzenie w drodze do konsumenta. Odpowiedź w 14 dni.',
          [
            'Odstąpienie dotyczy towaru dobrego. Przy wadzie klient nie ponosi kosztu odesłania.',
            null,
            'Wobec konsumenta odpowiada sprzedawca. Z kurierem rozlicza się sklep.',
            'Dowodem zakupu jest też potwierdzenie zamówienia albo przelewu.',
          ],
        ),
    },
    {
      id: 'firma',
      skill: 'kto',
      make(r) {
        const c = pick(r, professional);
        return choice('firma', `${c.text} Czy musisz przyjąć zwrot?`, ['Tak', 'Nie'], c.answer, c.explanation, c.answer === 0 ? [null, 'Ten zakup nie ma charakteru zawodowego dla tej osoby.'] : ['Ten zakup jest związany z zawodem albo kupuje spółka.', null]);
      },
    },
    {
      id: 'uzywane',
      skill: 'zasady',
      make: () =>
        choice(
          'uzywane',
          'Klient odsyła w terminie buty do biegania. Podeszwy są brudne, buty były noszone kilka dni na dworze. Co możesz zrobić?',
          [
            'Przyjąć zwrot i oddać mniej pieniędzy — o tyle, ile buty straciły na wartości',
            'Odmówić przyjęcia zwrotu, bo towar był używany',
            'Przyjąć zwrot i oddać całą kwotę, bo nic więcej nie wolno',
            'Odesłać buty klientowi na jego koszt bez żadnej decyzji',
          ],
          0,
          'Klient może sprawdzić towar tak jak w sklepie. Za używanie ponad to odpowiada: możesz obniżyć zwrot o utratę wartości. Prawa do odstąpienia nie traci.',
          [null, 'Prawo do odstąpienia zostaje. Możesz tylko obniżyć kwotę zwrotu.', 'Możesz obniżyć zwrot o utratę wartości, jeśli umiesz ją uzasadnić.', 'Musisz rozpatrzyć zwrot — klient odstąpił w terminie.'],
        ),
    },
    {
      id: 'prywatnie',
      skill: 'kto',
      make: () =>
        choice(
          'prywatnie',
          'Sprzedajesz prywatnie swój używany rower przez portal ogłoszeniowy. Nie prowadzisz firmy i nie handlujesz rowerami. Kupujący po tygodniu chce go oddać bez powodu. Czy musisz?',
          ['Nie — 14 dni bez podania przyczyny dotyczy zakupów od firmy', 'Tak — każda sprzedaż przez internet daje 14 dni', 'Tak — jeśli kupujący zapłacił przez portal'],
          0,
          'Prawo odstąpienia dotyczy umów konsumenta z przedsiębiorcą. Kto regularnie kupuje i sprzedaje dla zarobku, może jednak zostać uznany za przedsiębiorcę.',
          [null, 'Ustawa o prawach konsumenta dotyczy umów z przedsiębiorcą.', 'Sposób płatności nie zmienia tego, kim jest sprzedawca.'],
        ),
    },
  ],
};
