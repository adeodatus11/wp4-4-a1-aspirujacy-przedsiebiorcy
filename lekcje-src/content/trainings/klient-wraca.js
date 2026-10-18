import { choice, number } from '../schema.js';
import { formatNumber } from '../../lib/scoring.js';
import { int, pick, shuffle } from './helpers.js';

const questions = [
  ['Na ile prawdopodobne jest, że polecisz nas znajomym? (0 — wcale, 10 — na pewno)'],
  ['Jak oceniasz czas oczekiwania na naprawę? (1 — bardzo źle, 5 — bardzo dobrze)'],
  ['Co mamy poprawić?'],
  ['Skąd wiesz o naszym serwisie?'],
  ['Jak oceniasz czas oczekiwania i cenę? (1–5)', 'Dwie sprawy w jednym pytaniu. Klient zadowolony z czasu, a nie z ceny, nie wie, co zaznaczyć.'],
  ['Czy zgodzisz się, że nasi mechanicy są najlepsi w mieście?', 'Pytanie podsuwa odpowiedź i nic nie mierzy.'],
  ['Podaj adres zamieszkania i datę urodzenia.', 'Dane niepotrzebne do oceny usługi.'],
  ['Czy nasz świetny serwis spełnił Twoje oczekiwania?', '„Świetny” w treści pytania zawyża wyniki.'],
  ['Jak często i za ile kupujesz rowery, części i akcesoria w ciągu roku u nas i u konkurencji?', 'Za długie i za szerokie — nikt nie odpowie rzetelnie.'],
];

const form = [
  ['Imię (nieobowiązkowe): ________'],
  ['E-mail lub telefon — do odzyskania punktów: ________'],
  ['[ ] Chcę dostawać oferty e-mailem (możesz zrezygnować w każdej chwili)'],
  ['Zgodę wycofasz w aplikacji albo przy kasie.'],
  ['PESEL (pole obowiązkowe): ________', 'PESEL nie jest potrzebny do zbierania punktów.'],
  ['[✓] Zgadzam się na oferty SMS i e-mail (zaznaczone z góry)', 'Zgoda nie może być zaznaczona z góry.'],
  ['Bez zgody na oferty nie wydajemy karty.', 'Karta nie może zależeć od zgody na marketing.'],
  ['Adres zamieszkania (obowiązkowy): ________', 'Adres nie jest potrzebny do programu punktowego.'],
];

const timing = [
  ['Podziękowanie i paragon elektroniczny', 0],
  ['Pytanie, czy krem sprawdził się na urlopie', 1],
  ['Przypomnienie o wymianie wkładu filtra w dzbanku', 2],
  ['Instrukcja pierwszego ładowania hulajnogi', 0],
  ['Pytanie, jak sprawdzają się nowe buty do biegania', 1],
  ['Przypomnienie o przeglądzie roweru po pierwszych 200 km', 2],
];

const better = [
  {
    bad: ['Czy nasza wspaniała obsługa spełniła Twoje oczekiwania?', 'Czy obsługa i cena były w porządku?'],
    good: 'Jak oceniasz obsługę przy kasie? (1 — bardzo źle, 5 — bardzo dobrze)',
  },
  {
    bad: ['Dlaczego nie polecasz nas znajomym?', 'Czy polecasz nas znajomym, bo jesteśmy najtańsi?'],
    good: 'Na ile prawdopodobne jest, że polecisz nas znajomym? (0–10)',
  },
  {
    bad: ['Czy dostawa i pakowanie były szybkie i ładne?', 'Czy nie było problemów z dostawą?'],
    good: 'Ile dni czekasz zwykle na paczkę od nas?',
  },
];

export default {
  id: 'klient-wraca',
  order: 3,
  title: 'Klient wraca: ankieta, NPS i program punktowy',
  subtitle: 'Liczysz wskaźnik poleceń i koszt programu, poprawiasz ankietę i formularz zgód. Liczby za każdym razem inne.',
  who: 'Dla osób, które chcą sprawdzić, co klienci myślą o ich sklepie lub usłudze, i zatrzymać tych, którzy już kupili.',
  minutes: 12,
  round: 7,
  modules: [3, 6],
  realia: [],
  brief: [
    'Jedno pytanie — jedna sprawa. Bez podpowiedzi w treści („nasz świetny…”), z opisaną skalą. W ankiecie 3–5 pytań i jedno otwarte: „Co mamy poprawić?”.',
    'NPS (wskaźnik poleceń): procent ocen 9–10 minus procent ocen 0–6. Oceny 7–8 liczą się tylko do wszystkich odpowiedzi.',
    'Średnia ocen: suma (ocena × liczba osób) ÷ liczba osób.',
    'Odpowiadają zwykle najbardziej zadowoleni i najbardziej rozczarowani. Wynik to zdanie tych, którzy odpowiedzieli.',
    'Program punktowy kosztuje: wartość bonu ÷ zakupy potrzebne do bonu = część obrotu, którą oddajesz. Porównaj ją z marżą.',
    'Zgoda na oferty: osobna, niezaznaczona z góry, do wycofania. Karta nie może zależeć od zgody na marketing.',
  ],
  pool: [
    {
      id: 'nps',
      skill: 'liczby',
      make(r) {
        const total = pick(r, [20, 25, 40, 50]);
        const step = 100 / total;
        let promoters, detractors;
        do {
          promoters = int(r, Math.round(total * 0.25), Math.round(total * 0.6));
          detractors = int(r, Math.round(total * 0.05), Math.round(total * 0.35));
        } while (promoters + detractors > total - 2);
        const passive = total - promoters - detractors;
        const answer = Math.round((promoters - detractors) * step);
        const mistakes = [{ value: Math.round(promoters * step), text: 'To procent polecających. Odejmij procent krytyków (0–6).' }];
        if (promoters - detractors !== answer) mistakes.push({ value: promoters - detractors, text: `To różnica liczby osób. Przelicz na procenty z ${total} odpowiedzi.` });
        return number(
          'nps',
          `Ankieta po zakupie: ${total} odpowiedzi. Oceny 9–10: ${promoters} osób, 7–8: ${passive}, 0–6: ${detractors}. Jaki jest NPS?`,
          answer,
          `Polecający: ${formatNumber(promoters * step, 1)}%. Krytycy: ${formatNumber(detractors * step, 1)}%. NPS = ${answer}.`,
          { mistakes, tolerance: 0.5 },
        );
      },
    },
    {
      id: 'srednia',
      skill: 'liczby',
      make(r) {
        const counts = [int(r, 4, 14), int(r, 5, 15), int(r, 2, 9), int(r, 1, 6), int(r, 0, 3)];
        const total = counts.reduce((a, b) => a + b, 0);
        const sum = counts.reduce((s, c, i) => s + c * (5 - i), 0);
        const answer = Math.round((sum / total) * 10) / 10;
        return number(
          'srednia',
          `Ocena czasu obsługi (1–5). Ocena 5: ${counts[0]} osób, 4: ${counts[1]}, 3: ${counts[2]}, 2: ${counts[3]}, 1: ${counts[4]}. Jaka jest średnia? Podaj z jednym miejscem po przecinku.`,
          answer,
          `Suma: 5 × ${counts[0]} + 4 × ${counts[1]} + 3 × ${counts[2]} + 2 × ${counts[3]} + 1 × ${counts[4]} = ${sum}. ${sum} ÷ ${total} = ${formatNumber(answer, 1)}.`,
          { tolerance: 0.05, mistakes: [{ value: 3, text: 'To średnia samej skali (1–5). Uwzględnij, ile osób dało każdą ocenę.' }] },
        );
      },
    },
    {
      id: 'koszt',
      skill: 'program',
      make(r) {
        const [needed, bonus] = pick(r, [
          [200, 10],
          [250, 10],
          [400, 20],
          [500, 15],
          [300, 12],
        ]);
        const answer = Math.round((bonus / needed) * 1000) / 10;
        return number(
          'koszt',
          `1 punkt za każdą złotówkę. ${needed} punktów to bon na ${bonus} zł. Jaką część obrotu (w %) oddajesz w bonach, jeśli klienci wykorzystają wszystkie punkty?`,
          answer,
          `${bonus} ÷ ${needed} = ${formatNumber(answer / 100, 3)}, czyli ${formatNumber(answer, 1)}% obrotu.`,
          { unit: '%', tolerance: 0.05, mistakes: [{ value: Math.round((needed / bonus) * 10) / 10, text: 'Dzielenie jest odwrotne. Wartość bonu dzielisz przez zakupy potrzebne do bonu.' }] },
        );
      },
    },
    {
      id: 'marza',
      skill: 'program',
      make(r) {
        const [cost, margin] = pick(r, [
          [5, 25],
          [4, 20],
          [3, 30],
          [5, 40],
          [6, 24],
        ]);
        const answer = Math.round((cost / margin) * 1000) / 10;
        return number(
          'marza',
          `Program punktowy oddaje klientom ${cost}% obrotu. Średnia marża sklepu to ${margin}% ceny sprzedaży. Jaka część marży (w %) idzie na program?`,
          answer,
          `${cost} ÷ ${margin} = ${formatNumber(answer / 100, 3)}, czyli ${formatNumber(answer, 1)}% marży.`,
          { unit: '%', tolerance: 0.05, mistakes: [{ value: cost, text: `${cost}% to część obrotu. Pytanie dotyczy części marży: ${cost} ÷ ${margin}.` }] },
        );
      },
    },
    {
      id: 'rocznie',
      skill: 'program',
      make(r) {
        const needed = pick(r, [200, 250, 300]);
        const bonus = pick(r, [10, 15]);
        const monthly = pick(r, [150, 200, 250, 300, 400]);
        const vouchers = Math.floor((monthly * 12) / needed);
        const answer = vouchers * bonus;
        return number(
          'rocznie',
          `Program: 1 punkt za złotówkę, ${needed} punktów = bon ${bonus} zł. Klientka wydaje u Ciebie średnio ${monthly} zł miesięcznie. Ile złotych w bonach dostanie w ciągu roku?`,
          answer,
          `${monthly} × 12 = ${monthly * 12} punktów. To ${vouchers} pełnych bonów po ${bonus} zł = ${answer} zł.`,
          { unit: 'zł', mistakes: [{ value: Math.floor(monthly / needed) * bonus, text: 'To bony z jednego miesiąca. Pytanie dotyczy roku.' }] },
        );
      },
    },
    {
      id: 'ankieta',
      skill: 'ankieta',
      make(r) {
        const bad = shuffle(r, questions.filter(q => q[1])).slice(0, int(r, 2, 3));
        const good = shuffle(r, questions.filter(q => !q[1])).slice(0, int(r, 2, 3));
        return {
          type: 'spotErrors',
          id: 'ankieta',
          title: 'Ankieta po naprawie roweru — wersja robocza',
          context: 'Zaznacz pytania do poprawy.',
          lines: shuffle(r, [...good, ...bad]).map(([text, error]) => (error ? { text, error } : { text })),
          explanation: `Do poprawy: ${bad.length}. Dobre pytanie dotyczy jednej sprawy, niczego nie sugeruje i pyta tylko o to, co firma wykorzysta.`,
        };
      },
    },
    {
      id: 'formularz',
      skill: 'zgody',
      make(r) {
        const bad = shuffle(r, form.filter(q => q[1])).slice(0, int(r, 1, 3));
        const good = shuffle(r, form.filter(q => !q[1])).slice(0, int(r, 2, 4));
        return {
          type: 'spotErrors',
          id: 'formularz',
          title: 'Formularz karty stałego klienta',
          context: 'Zaznacz elementy do poprawy.',
          lines: shuffle(r, [...good, ...bad]).map(([text, error]) => (error ? { text, error } : { text })),
          explanation: `Do poprawy: ${bad.length}. Zbierasz tylko dane potrzebne do programu, a zgoda na oferty jest osobna i dobrowolna.`,
        };
      },
    },
    {
      id: 'kiedy',
      skill: 'kontakt',
      make(r) {
        const rows = shuffle(r, timing).slice(0, int(r, 3, 4));
        return {
          type: 'matching',
          id: 'kiedy',
          question: 'Kiedy wysłać wiadomość do klienta, który zgodził się na kontakt?',
          options: ['Od razu', 'Po kilku dniach', 'Po kilku tygodniach'],
          rows: rows.map(([label, correct]) => ({ label, correct })),
          explanation: 'Każda wiadomość w chwili, w której jest przydatna. Wtedy klient jej nie traktuje jak spamu.',
        };
      },
    },
    {
      id: 'kto-odpowiedzial',
      skill: 'wnioski',
      make: () =>
        choice(
          'kto-odpowiedzial',
          'Ankietę wysłano do 600 klientów, odpowiedziało 42. Średnia ocena: 4,6 na 5. Co można powiedzieć?',
          [
            'Że 42 osoby, które odpowiedziały, są w większości zadowolone — o pozostałych wiemy niewiele',
            'Że prawie wszyscy klienci są zadowoleni',
            'Że ankieta się nie udała i trzeba ją wyrzucić',
            'Że 4,6 to wynik wszystkich 600 klientów',
          ],
          0,
          'Odpowiedziało 7% klientów. Wynik mówi o nich, a odpowiadają częściej osoby z mocnym zdaniem.',
          [null, 'Nie wiemy, co myśli 558 osób, które nie odpowiedziały.', '42 odpowiedzi to wciąż informacja, tylko o części klientów.', 'Średnia dotyczy tylko tych, którzy odpowiedzieli.'],
        ),
    },
    {
      id: 'lepsze',
      skill: 'ankieta',
      make(r) {
        const c = pick(r, better);
        return choice('lepsze', 'Które pytanie wpisać do ankiety?', [c.good, ...c.bad], 0, 'Jedno pytanie o jedną rzecz, bez sugestii, z jasną skalą albo konkretną liczbą.', [null, 'To pytanie coś podsuwa albo dotyczy dwóch spraw naraz.', 'To pytanie coś podsuwa albo dotyczy dwóch spraw naraz.']);
      },
    },
    {
      id: 'czestotliwosc',
      skill: 'kontakt',
      make: () =>
        choice(
          'czestotliwosc',
          'Masz 300 klientów ze zgodą na oferty e-mailem. Jak często pisać?',
          ['Codziennie — przecież się zgodzili', 'Rzadko, z ofertą związaną z tym, co kupili', 'Wcale — każda oferta to naruszenie prywatności'],
          1,
          'Zgoda nie oznacza zgody na zasypywanie. Zbyt częste maile kończą się wycofaniem zgody.',
          ['Codzienne oferty zwykle kończą się wypisaniem.', null, 'Oferty dla osób ze zgodą są dozwolone.'],
        ),
    },
  ],
};
