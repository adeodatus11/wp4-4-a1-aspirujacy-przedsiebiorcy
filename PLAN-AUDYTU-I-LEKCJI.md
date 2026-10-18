# Plan audytu i rozbudowy lekcji HAN.01 / HAN.02

Stan na 18.10.2026. Dotyczy gałęzi `codex/serwis-uczestnik-prowadzacy`. Wzorzec formy: repozytorium `informatyka2026_2027`.

---

## 1. Co jest w repozytorium

| Gałąź | Zawartość | Publicznie widoczne? |
|---|---|---|
| `main` | Pierwsze opracowanie: 12 stron HTML (przegląd, 8 modułów, wdrożenie, analiza) | Tak (GitHub Pages) |
| `codex/serwis-uczestnik-prowadzacy` | 3 commity z 18.10.2026, 119 plików, +5236 wierszy. Pełny serwis: 8 modułów, „Mój projekt”, biblioteka 17 źródeł, kalkulator i XLSX cash flow, mapa 27 odniesień do HAN, **10 lekcji HAN (7 × 45 + 3 × 90 min = 13 jednostek)**, 50 pytań lekcyjnych, sesje z zegarem, karta oceny, tryb offline | **Nie.** Nic z tej pracy nie jest jeszcze opublikowane |

### Szybki przegląd wstępny (wykonany 18.10.2026)

| Sprawdzenie | Wynik |
|---|---|
| `python3 build.py`, potem `git status` | ✅ Generator deterministyczny, zero zmian po przebudowie |
| `python3 tests/validate.py` | ✅ 71 dokumentów, linki, etykiety, 74 pytania, XLSX, offline |
| `npm test` (logika + DOM w LinkeDOM) | ✅ 7 testów jednostkowych, 17 scenariuszy interfejsu |
| Prawdziwa przeglądarka (Chromium): 29 stron × szerokość 1280 i 390 px | ✅ Brak błędów konsoli i brakujących plików |
| Ręczne przeliczenie kluczy L05 (cena/marża) i L07 (gotówka/wskaźniki) | ✅ Wszystkie poprawne |
| Poziome przewijanie strony | ❌ `cash-flow.html`: tabela rozpycha stronę (1175 px przy ekranie 390, 1467 px przy 1280). `index.html`: element `.orbit` wystaje (1375 px przy 1280) |
| Pokrycie jednostek HAN w mapie | ⚠️ Brak jakiejkolwiek lekcji dla HAN.01.1 (BHP), HAN.01.5 i HAN.02.8 (język obcy), **HAN.02.5 (gospodarka magazynowa)** i **HAN.02.6 (działania posprzedażowe)** |
| Język | ⚠️ Przykład: L02 „W rozmowach wygodnego doboru” to kalka z „convenience sample”, niezrozumiała dla ucznia |

### Główna luka: forma lekcji

Obecna lekcja HAN to **karta pracy z testem**: jeden blok danych, 4–5 pól tekstowych, 5 pytań na końcu i zegar. Lekcja 90-minutowa ma ten sam układ co 45-minutowa. Lekcja z informatyki to **przeprowadzenie przez kolejne etapy**. Porównanie:

| Element | Informatyka | HAN (obecnie) |
|---|---|---|
| Etapy z czasem, sumujące się do 45/90 min | ✅ 4–6 etapów | ❌ Rozpiska minut tylko w scenariuszu nauczyciela |
| Powtórka na start z informacją zwrotną | ✅ | ❌ |
| Krótkie wyjaśnienie na platformie + przykład rozwiązany | ✅ `reading {title, paragraphs, example}` | ❌ Tylko „Przygotowanie: pojęcia…” |
| Ćwiczenia interaktywne z natychmiastową informacją zwrotną | ✅ quiz, dopasowanie, kolejność, ~30 symulatorów | ❌ Tylko pola tekstowe. Wyjaśnienia dopiero na karcie po zakończeniu |
| Notatki nauczyciela przy każdym etapie (pytanie do klasy, oczekiwana odpowiedź, typowe błędy, rozszerzenie, co pominąć) | ✅ | ❌ Jedna tabela minut, po jednym zdaniu |
| Tryb prowadzenia przy projektorze | ✅ | ❌ |
| Metody COVE z linkami | ✅ | ❌ |
| Karta wyniku z odznaką i samooceną celów | ✅ | ⚠️ Karta oceny jest, ale bez samooceny celów |
| 90 min = 2 × 45 z przerwą i punktem zapisu | ✅ `sessions: [45,45]` | ⚠️ Tylko pauza zegara |
| **Trwały zapis, wznowienie, karta do pobrania, ocena ręczna, offline** | ❌ Postęp znika po odświeżeniu | ✅ **To przewaga HAN. Trzeba ją zachować** |

---

## 2. Plan audytu: cztery ścieżki

Każda usterka trafia do jednej tabeli z priorytetem: **P0** (blokuje użycie na lekcji), **P1** (błąd treści lub działania), **P2** (jakość, wygląd).

### A. Działanie techniczne (automatycznie, Playwright + Chromium)

| # | Test | Co sprawdza |
|---|---|---|
| A1 | `e2e/strony.spec` | Każda strona × 390 / 768 / 1280 px: błędy konsoli, 404, poziomy scroll, zrzut ekranu do przeglądu, reguły dostępności axe-core |
| A2 | `e2e/lekcja-uczen.spec` | Dla **każdej** lekcji: start → wypełnienie pól → pauza → odświeżenie → wznowienie → test (poprawnie, błędnie, przecinek, brak odpowiedzi) → zakończenie → karta → pobranie HTML → `wyniki-lekcji.html` |
| A3 | `e2e/lekcja-nauczyciel.spec` | Przełączenie widoku, wczytanie kopii ucznia, ocena praktyczna, eksport kopii, wydruk PDF kart ucznia i nauczyciela (podział stron, czytelność) |
| A4 | `e2e/offline.spec` | Prawdziwy service worker: pierwsze wejście, potem tryb offline, nawigacja i zapis. Rozpakowany ZIP otwarty z dysku (`file://`) |
| A5 | XLSX | Otwarcie `cash-flow.xlsx` w LibreOffice bez interfejsu i przeliczenie formuł |
| A6 | Linki zewnętrzne | Status HTTP 26 źródeł (17 bibliotecznych i 9 formalnych). Zapis daty sprawdzenia |
| A7 | Ręcznie | Firefox, Safari/iPhone, Android, tablica interaktywna/projektor, czytnik ekranu. Lista kontrolna w raporcie |

### B. Poprawność merytoryczna

Wyniki audytu treści (kompletność, polskie realia, styl, testy): `AUDYT-TRESCI.md`.

| # | Zakres | Metoda |
|---|---|---|
| B1 | 50 pytań lekcyjnych | Niezależny skrypt przelicza każdy klucz liczbowy z danych lekcji. Ręczna ocena: jednoznaczność, wiarygodność błędnych odpowiedzi, poziom |
| B2 | 24 pytania modułowe | Jak wyżej |
| B3 | Mapa 27 odniesień HAN | 100% porównanie z PDF ORE: numer efektu, kryterium, strona, nazwa jednostki |
| B4 | Terminologia handlowa | Marża a narzut, netto/brutto/VAT, wynik a przepływ gotówki, płynność, dokumenty. Zgodność z językiem podręczników i egzaminu CKE |
| B5 | Aktualność prawa (stan 2026) | Prawa konsumenta i reklamacje, informowanie o cenach (Omnibus), VAT i KSeF, opakowania i BDO, ESG/VSME |
| B6 | Spójność liczb | Agendy = `minutes`; 6,5 h na moduł, 52 h na program; liczby w README, VERIFICATION i na stronach |
| B7 | Język | Polszczyzna, kalki z angielskiego, długość zdań. Tekst dla ucznia 15–18 lat ma być zrozumiały bez nauczyciela |

### C. Przydatność dydaktyczna

Każda lekcja dostaje ocenę 0–2 w każdym z punktów. Kryteria pochodzą z `docs/lesson-blueprint.md` w repozytorium informatyki:

1. Konkretny problem, odbiorca i rezultat; cele językiem ucznia.
2. Powtórka potrzebnej wiedzy z informacją zwrotną.
3. Wyjaśnienie pojęć i pokazanie decyzji (przykład rozwiązany).
4. Zadanie samodzielne z danymi, kontrolą wyniku i pomocą przy błędzie.
5. Przeniesienie na zmieniony przypadek, ocena koleżeńska lub poprawa.
6. Sprawdzenie wiedzy, ocena produktu według jawnych kryteriów, refleksja.
7. **Wykonalność w czasie.** Czy 45 minut wystarcza realnie, a nie tylko w tabeli?
8. **Praca samodzielna.** Czy uczeń nieobecny na lekcji przejdzie ją sam w domu?
9. Różnicowanie: wsparcie i rozszerzenie.

Do tego **pilotaż**: dwie lekcje (jedna 45, jedna 90) z prawdziwą klasą. Obserwacja według listy, 3-pytaniowa ankieta dla uczniów i notatka nauczyciela.

### D. Zgodność z formą informatyki

Lista kontrolna z tabeli w punkcie 1, sprawdzana dla każdej lekcji po przebudowie.

---

## 3. Docelowa forma lekcji HAN

### Kontrakt treści (jak w informatyce)

Każda lekcja to plik danych z polami:

- `id`, `title`, `subtitle`, `duration` (45 lub 90), `sessions` (`[45]` albo `[45,45]`), `qualification`, `unit`, `effects`;
- `format`: `student`, `teacher`, `grouping`, `methods` (linki do metodyka.covepolska.pl);
- `objectives` językiem ucznia, `materials`, `teacherGuide`;
- `sections[]`: `id`, `label`, `title`, `intro`, `duration`, `reading {title, paragraphs, example}`, `teacherNotes`, `askStudents`, `expectedAnswers`, `commonMistakes`, `optionalExtension`, `skipIfShortOnTime`, `activities[]`;
- `exitTicket` i `resultCard` (źródła punktów, odznaki, samoocena celów).

### Rytm lekcji

**45 min:** Start i powtórka (5) → Wyjaśnienie z przykładem rozwiązanym (8–10) → Ćwiczenie interaktywne (10) → Zadanie na danych firmy (12–15) → Sprawdzenie i karta wyniku (5).

**90 min:** dwie części po 45 min. Po pierwszej części jest jawna przerwa i punkt zapisu. Druga część zaczyna się powtórką z pierwszej.

### Dwa tryby jednej lekcji

- **Prowadzona.** Nauczyciel wyświetla etap na projektorze. Panel nauczyciela pokazuje notatki, pytanie do klasy, oczekiwaną odpowiedź i typowe błędy.
- **Samodzielna.** Uczeń sam, z podpowiedziami i natychmiastową informacją zwrotną. Zapis w przeglądarce, wznowienie i karta wyniku to obecny mechanizm, który zostaje.
- Obecna „sesja z zegarem i kartą oceny” zostaje jako opcja **sprawdzianu** na końcu lekcji.

### Biblioteka ćwiczeń dla handlu

To odpowiednik symulatorów informatyki. Każde ćwiczenie wykorzystujemy w kilku lekcjach.

| Ćwiczenie | Użycie |
|---|---|
| Wybór, wielokrotny wybór, dopasowanie, kolejność, liczba z tolerancją | Wszędzie |
| **Kalkulator ceny**: netto/brutto/VAT, marża a narzut, rabat | Ceny, marże, oferty |
| **Rozmowa z klientem** (drzewo dialogu z oceną pytań) | Potrzeby, zastrzeżenia, reklamacje, język obcy |
| **Tablica SWOT / 4P** (przeciąganie, alternatywnie kliknięcie) | Marketing |
| **Znajdź błędy w dokumencie**: paragon, faktura, PZ/WZ, etykieta ceny | Dokumentacja, oznaczanie cen |
| **Przyjęcie dostawy**: zamówienie, dokument dostawy i stan faktyczny | Magazyn |
| **Planogram**: rozmieszczenie towaru na półce | Merchandising |
| **Kasa**: płatność, reszta, zwrot, korekta | Obsługa kasy |
| **Inwentaryzacja**: niedobory i nadwyżki | Magazyn |
| **Mini cash flow i wskaźniki** | Budżet, plan sprzedaży |
| **Znajdź zagrożenia** na zapleczu (obraz z punktami) | BHP |

---

## 4. Katalog lekcji (propozycja do zatwierdzenia)

Obecne lekcje L01–L10 zostają **przebudowane** do nowej formy. Nowe lekcje (N) wypełniają luki w jednostkach. Każde przypisanie do efektu trzeba potwierdzić z PDF ORE w ramach audytu B3, zanim powstanie treść.

| Jednostka | Lekcje |
|---|---|
| HAN.01.1 BHP | N01 Bezpieczne stanowisko sprzedawcy: ergonomia, zagrożenia, ochrona przeciwpożarowa (45) |
| HAN.01.2 Podstawy handlu | N02 Formy handlu i kanały sprzedaży (45) · N03 Towar: klasyfikacja, oznakowanie, przechowywanie, daty trwałości (45) |
| HAN.01.3 Organizowanie sprzedaży | N04 Przyjęcie dostawy i rozbieżności (90) · N05 Ekspozycja i planogram (45) · N06 Oznaczanie cen, cena jednostkowa, najniższa cena z 30 dni (45) · **L09** Opakowania |
| HAN.01.4 Sprzedaż towarów | **L01** Potrzeby klienta · N07 Prezentacja: cecha → korzyść (45) · N08 Obsługa kasy i płatności (90) · N09 Zastrzeżenia i trudny klient (45) · N10 Sprzedaż internetowa i prawa konsumenta (45) · **L10** Rozmowa ofertowa |
| HAN.01.5 Język obcy | N11 Rozmowa sprzedażowa po angielsku (45) |
| HAN.01.6 Kompetencje | N12 Stres, etyka i granice w obsłudze (45) |
| HAN.02.3 Planowanie i budżet | **L04** Promocja i budżet · **L05** Cena i marża · **L07** Wynik i gotówka · N13 Prognoza sprzedaży i plan zakupów (90) |
| HAN.02.4 Zarządzanie działaniami | **L02** Segment i SWOT · **L03** 4P · N14 Zamówienie i warunki dostawcy (45) · N15 Badanie satysfakcji klienta (45) |
| HAN.02.5 Magazyn | N16 Przyjęcie i wydanie, FIFO/FEFO (45) · N17 Inwentaryzacja (90) · N18 Zapas i rotacja (45) |
| HAN.02.6 Posprzedaż | N19 Reklamacja: niezgodność towaru z umową (konsument), rękojmia (firmy), gwarancja (90) · N20 Lojalność i obsługa po sprzedaży (45) |
| HAN.02.7 Dokumentacja | N21 Faktura i KSeF (45) · N22 Dokumenty magazynowe (45) · **L06** Oferta cyfrowa |
| HAN.02.8 Język obcy | N23 Korespondencja handlowa po angielsku (45) |
| HAN.02.10 Zespół | **L08** Plan zadania w zespole |
| Projekt końcowy | N24 „Mój sklep”: projekt łączący oba działy (2 × 45) |

**Razem 34 tematy, około 41 jednostek po 45 minut** (obecnie 10 tematów i 13 jednostek).

---

## 5. Kolejność prac

| Faza | Zakres | Wynik do akceptacji |
|---|---|---|
| 0 | Decyzje z punktu 7. Gałąź robocza od `codex/serwis-uczestnik-prowadzacy` | — |
| 1 | Audyt A + B (automaty, przeliczenia, porównanie z ORE) | Raport usterek P0–P2 i poprawki P0/P1 |
| 2 | Silnik etapów + 4 podstawowe ćwiczenia + **jedna lekcja wzorcowa (L05 Cena i marża)** w obu trybach | **Ty oceniasz wzorzec przed dalszą pracą** |
| 3 | Przebudowa L01–L04 i L06–L10 według wzorca + nowe ćwiczenia | 10 lekcji w nowej formie |
| 4 | Nowe lekcje N01–N24 partiami po 4–6, każda partia z testami | Kolejne partie |
| 5 | Audyt C (dydaktyka) + pilotaż w klasie + poprawki | Wersja do publikacji |
| 6 | Pull request do `main` i publikacja na GitHub Pages | Publiczny serwis |

### Kiedy lekcja jest gotowa

- [ ] Etapy sumują się do `duration`. Lekcja 90 min ma `sessions: [45,45]` i punkt zapisu.
- [ ] Każdy etap ma wyjaśnienie na platformie oraz komplet notatek nauczyciela.
- [ ] Co najmniej 3 ćwiczenia z natychmiastową informacją zwrotną, w tym jedno ćwiczenie handlowe z biblioteki.
- [ ] Dane fikcyjne, jawnie oznaczone. Klucze przeliczone skryptem.
- [ ] Odniesienie do efektu i kryterium potwierdzone z PDF ORE.
- [ ] Test e2e: przejście poprawne, błędne z poprawą, odświeżenie, widok 390 px, wydruk.
- [ ] Brak błędów axe. Karta ucznia i nauczyciela drukuje się czytelnie.

---

## 6. Testy do dopisania

- `tests/e2e/*.spec.cjs`: Playwright z zainstalowanym Chromium, ścieżki A1–A4.
- `tests/keys.py`: niezależne przeliczenie wszystkich kluczy liczbowych.
- `tests/content.py`: kontrakt lekcji (pola, sumy minut, unikalne ID, odniesienia HAN, metody COVE).
- `tests/exercises/*.cjs`: logika każdego ćwiczenia (kalkulator ceny, kasa, inwentaryzacja…).
- Skrypt `npm run test:all`, który uruchamia build, walidację, testy jednostkowe i e2e.

---

## 7. Decyzje

1. **Technologia lekcji.**
   - (a) Zostajemy przy obecnym generatorze Python z czystym JS i dopisujemy silnik etapów. Mniejsze ryzyko, offline działa bez zmian.
   - (b) Przenosimy silnik lekcji z informatyki (React/Vite) do podkatalogu `/lekcje/` i podłączamy obecny trwały zapis oraz kartę oceny. Forma byłaby niemal identyczna z informatyką, a ~20 gotowych komponentów i testy e2e dałoby się użyć ponownie. Koszt: krok budowania w Node.
   - *Rekomendacja: (b), jeśli forma ma być „bardzo podobna” do informatyki.*
2. **Zakres katalogu.** Pełne 34 tematy czy najpierw przebudowa 10 istniejących?
3. **Odbiorca.** Lekcje tylko dla technikum (technik handlowiec, HAN.01 + HAN.02) czy też dla szkoły branżowej (sprzedawca, tylko HAN.01)?
4. **Język obcy.** Lekcje N11 i N23 robimy po angielsku czy pomijamy?
5. **Publikacja.** Czy scalić obecną gałąź `codex/…` do `main` po fazie 1, żeby szkoła miała już działający serwis, czy czekać na nowe lekcje?
