// Polskie przepisy i kwoty używane w lekcjach. Jedno miejsce do corocznej aktualizacji.
// checked — data sprawdzenia; status — czy potwierdzono w źródle urzędowym.
// Test treści ostrzega, gdy od sprawdzenia minęło ponad 12 miesięcy.

export const realia = {
  vatStawki: {
    label: 'Stawki VAT',
    value: '23% (podstawowa), 8% i 5% (obniżone), 0% w szczególnych przypadkach',
    source: 'Ustawa o podatku od towarów i usług, art. 41 i 146ef',
    url: 'https://www.podatki.gov.pl/vat/',
    checked: '2026-10-18',
    status: 'potwierdzone w serwisach branżowych',
  },
  vatZwolnienie: {
    label: 'Zwolnienie podmiotowe z VAT',
    value: '240 000 zł sprzedaży netto w roku (od 1.01.2026; wcześniej 200 000 zł)',
    source: 'Ustawa o VAT, art. 113 ust. 1, zmiana z 24.06.2025',
    url: 'https://poradnikprzedsiebiorcy.pl/-limit-zwolnienia-podmiotowego-w-vat',
    checked: '2026-10-18',
    status: 'do potwierdzenia na podatki.gov.pl',
  },
  ksef: {
    label: 'Krajowy System e-Faktur (KSeF)',
    value: 'Obowiązkowe e-faktury: duże firmy od 1.02.2026, pozostałe od 1.04.2026, najmniejsze (sprzedaż do 10 000 zł miesięcznie) od 1.01.2027. Kary administracyjne od 2027 r.',
    source: 'Ustawa z 5.08.2025 o zmianie ustawy o VAT (Dz.U. 2025 poz. 1203)',
    url: 'https://ksef.podatki.gov.pl/',
    checked: '2026-10-18',
    status: 'do potwierdzenia na ksef.podatki.gov.pl',
  },
  kasaFiskalna: {
    label: 'Zwolnienie z kasy fiskalnej',
    value: 'do 20 000 zł rocznej sprzedaży dla osób prywatnych; niektóre branże (np. fryzjerzy, gastronomia) muszą mieć kasę od pierwszej sprzedaży',
    source: 'Ustawa o VAT, art. 111; rozporządzenie MF w sprawie zwolnień z kas rejestrujących',
    url: 'https://poradnikprzedsiebiorcy.pl/-limit-zwolnienia-z-kasy-fiskalnej',
    checked: '2026-10-18',
    status: 'do potwierdzenia w rozporządzeniu',
  },
  paragonNip: {
    label: 'Faktura do paragonu dla firmy',
    value: 'Firma dostanie fakturę do paragonu tylko wtedy, gdy na paragonie jest jej NIP',
    source: 'Ustawa o VAT, art. 106b ust. 5',
    url: 'https://www.podatki.gov.pl/',
    checked: '2026-10-18',
    status: 'potwierdzone w serwisach branżowych',
  },
  cenaJednostkowa: {
    label: 'Cena jednostkowa',
    value: 'Przy towarach w opakowaniach i sprzedawanych na wagę lub objętość podaje się obok ceny także cenę za jednostkę miary, zwykle 1 kg albo 1 l. Gdy cena na półce różni się od ceny w kasie, klient może żądać sprzedaży po cenie dla siebie korzystniejszej',
    source: 'Ustawa z 9.05.2014 o informowaniu o cenach towarów i usług; rozporządzenie MRiT',
    url: 'https://prawakonsumenta.uokik.gov.pl/',
    checked: '2026-10-18',
    status: 'potwierdzone',
  },
  omnibus: {
    label: 'Informacja o obniżce ceny',
    value: 'Przy każdej obniżce sprzedawca podaje najniższą cenę z 30 dni przed obniżką',
    source: 'Ustawa o informowaniu o cenach, art. 6a (od 1.01.2023, dyrektywa Omnibus)',
    url: 'https://uokik.gov.pl/',
    checked: '2026-10-18',
    status: 'potwierdzone',
  },
  niezgodnosc: {
    label: 'Reklamacja konsumencka',
    value: 'Od 1.01.2023 konsument reklamuje niezgodność towaru z umową. Sprzedawca odpowiada 2 lata od wydania towaru. Na reklamację odpowiada w 14 dni; brak odpowiedzi oznacza jej uznanie',
    source: 'Ustawa o prawach konsumenta, rozdz. 5a, art. 7a i 43a–43g',
    url: 'https://prawakonsumenta.uokik.gov.pl/reklamacja/',
    checked: '2026-10-18',
    status: 'potwierdzone (treść art. 7a)',
  },
  rekojmia: {
    label: 'Rękojmia między firmami',
    value: 'W sprzedaży firmie stosuje się rękojmię z kodeksu cywilnego; strony mogą ją w umowie ograniczyć lub wyłączyć',
    source: 'Kodeks cywilny, art. 556–576',
    url: 'https://isap.sejm.gov.pl/',
    checked: '2026-10-18',
    status: 'potwierdzone',
  },
  odstapienie: {
    label: 'Zwrot zakupu przez internet',
    value: 'Konsument może odstąpić od umowy zawartej przez internet w 14 dni bez podania przyczyny',
    source: 'Ustawa o prawach konsumenta, art. 27',
    url: 'https://prawakonsumenta.uokik.gov.pl/',
    checked: '2026-10-18',
    status: 'potwierdzone',
  },
  kaucja: {
    label: 'System kaucyjny',
    value: 'Od 1.10.2025: 0,50 zł za butelkę plastikową do 3 l i puszkę do 1 l, 1 zł za szklaną butelkę wielorazową do 1,5 l. Sklepy powyżej 200 m² muszą przyjmować opakowania i oddawać kaucję, także bez paragonu',
    source: 'Ustawa o gospodarce opakowaniami i odpadami opakowaniowymi; gov.pl',
    url: 'https://www.gov.pl/web/klimat/system-kaucyjny',
    checked: '2026-10-18',
    status: 'potwierdzone; zasady dla szkła mogą się jeszcze zmienić',
  },
  dzwiganie: {
    label: 'Normy ręcznego przenoszenia',
    value: 'Praca stała: kobiety 12 kg, mężczyźni 30 kg; praca dorywcza: 20 kg i 50 kg. Młodocianych i kobiety w ciąży obowiązują niższe limity',
    source: 'Rozporządzenie MRPiPS z 2017 r. o ręcznych pracach transportowych; Kodeks pracy, art. 176 i 204',
    url: 'https://www.pip.gov.pl/',
    checked: '2026-10-18',
    status: 'potwierdzone dla dorosłych; limity młodocianych sprawdzić w rozporządzeniu',
  },
  placaMinimalna: {
    label: 'Płaca minimalna 2026',
    value: '4806 zł brutto miesięcznie',
    source: 'Rozporządzenie Rady Ministrów w sprawie minimalnego wynagrodzenia na 2026 r.',
    url: 'https://www.gov.pl/',
    checked: '2026-10-18',
    status: 'potwierdzone w serwisach branżowych',
  },
  nierejestrowana: {
    label: 'Działalność nierejestrowana',
    value: 'Przychód do 225% płacy minimalnej w każdym kwartale, w 2026 r. 10 813,50 zł',
    source: 'Prawo przedsiębiorców, art. 5 (zmiana od 1.01.2026)',
    url: 'https://www.biznes.gov.pl/',
    checked: '2026-10-18',
    status: 'do potwierdzenia na biznes.gov.pl',
  },
};

export function realiaFor(keys = []) {
  return keys.map(key => {
    if (!realia[key]) throw new Error(`Brak wpisu realiów: ${key}`);
    return { key, ...realia[key] };
  });
}
