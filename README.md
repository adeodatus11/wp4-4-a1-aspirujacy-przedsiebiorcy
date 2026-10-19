# Pracownia przedsiębiorczości

Samodzielna platforma programu WP4.4.A1 (WIN4SMEs CoVE) dla **uczestnika i prowadzącego**. Osiem modułów, polskie uzupełnienia, projekt uczestnika i komplet własnych materiałów warsztatowych. Statyczny HTML/CSS/JS, bez kont i backendu. Gotowe strony są wersjonowane i działają na GitHub Pages z katalogu głównego.

## Dla uczestnika

- Osiem modułów: coaching, postawa przedsiębiorcza, walidacja, model biznesowy i Lean, cyfryzacja i AI, marketing, ESG, pitch i finansowanie.
- Pełne wcześniejsze opracowania oraz nowe wprowadzenia, osiem polskich przypadków fikcyjnych i instrukcje ćwiczeń.
- 48 pól projektu, 24 pytania z wyjaśnieniami, lokalny zapis postępów.
- Do każdego modułu ścieżka pracy własnej (lekcje/index.html#/moduly, 110–240 min, razem ok. 25 h): 10–22 etapy, które przerabiają całe opracowanie modułu (każdy rozdział ma swój etap; mapę rozdział → etap widać w stopce ścieżki), z wyjaśnieniem, polskim przypadkiem, zadaniami z informacją zwrotną, Coach Corner i wszystkimi sześcioma polami projektu. Wpisy trafiają do „Mojego projektu”. Na końcu nie ma karty oceny — jest podsumowanie: rezultat modułu, uzupełnione pola, co przygotować na spotkanie w grupie i jak pracować bez grupy.
- Eksport/import kopii JSON, notatki TXT, druk projektu i usuwanie danych.
- Karty pracy, Lean Canvas, kalkulator i arkusz cash flow XLSX, pakiet offline ZIP.
- Biblioteka 17 źródeł z wydawcą, sposobem i datą sprawdzenia; wyszukiwanie działa bez zewnętrznego API.

## Lekcje handlu (HAN.01 / HAN.02) i trening dla dorosłych

Katalog lekcje/ to osobna aplikacja z dwiema częściami.

**Lekcje HAN** — 29 interaktywnych lekcji po polsku (20 × 45 min i 9 × 90 min, razem 1665 min = 37 jednostek po 45 min) dla technikum, szkoły branżowej i kwalifikacyjnych kursów zawodowych. Część A (01–13) dotyczy HAN.01, część B (14–29) — HAN.02. W lekcjach są tylko tematy z jednostek podstawy: BHP, towar, przyjęcie dostawy, ekspozycja, ceny, kasa, rozmowa z klientem, marketing, ceny i marża, oferta, korespondencja, dostawcy, faktura, dokumenty magazynowe, FIFO/FEFO, inwentaryzacja, zapas, prognoza, wynik i wskaźniki, reklamacje, zespół.

Lekcje różnią się budową: 3–8 etapów nazwanych od treści, różne zakończenia, pytania z 2–5 odpowiedziami. Poprawna odpowiedź jest losowana raz dla całego katalogu z wyrównaniem liter, bez trzech takich samych z rzędu w lekcji; odpowiedzi w rozmowach też są tasowane. Test lekcje-src/tests/patterns.test.mjs pilnuje, żeby lekcje nie wróciły do jednego szablonu. Tryb „Prowadzę zajęcia” dodaje notatki do każdego etapu i plan lekcji na A4; w lekcjach 90 min zaznaczona jest przerwa po 45 min.

**Trening dla dorosłych** (#/trening) — pięć krótkich serii do modułów programu dla aspirujących przedsiębiorców, bez odniesień do HAN: zwroty w sklepie internetowym (moduł 5), opinie i wiadomości od klientów (6, 5), ankieta, NPS i program punktowy (3, 6), liczby mojego sklepu (4, 8), formalności małego handlu 2026 (2, 8). Seria to ściąga i 6–7 zadań na 10–12 minut. Kwoty, daty i przypadki są losowane przy każdym podejściu, zadania z błędem wracają w kolejnej serii, a po serii aplikacja proponuje termin powrotu (jutro, za 3 dni albo za tydzień). Strony modułów mają blok „Trening do tego modułu”.

Fakty o polskich realiach (VAT i zwolnienie 240 000 zł, KSeF, kasa fiskalna, paragon z NIP, Omnibus, niezgodność towaru z umową, zwrot w 14 dni, kaucja, dźwiganie, alkohol i napoje energetyczne, płaca minimalna 2026, działalność nierejestrowana, ulga na start, składki pracodawcy, fałszywe opinie) są w jednym pliku lekcje-src/content/realia.js z datą sprawdzenia; test pilnuje, by nie były starsze niż rok.

Strona szkola.html pokazuje katalog lekcji z filtrami, pokrycie jednostek HAN.01/HAN.02 i mapę 27 wybranych efektów: moduł → jednostka, numer efektu, osobno numery kryteriów, strona oficjalnego PDF MEN/ORE i zakres powiązania. Z modułami programu łączy się 10 lekcji (przez tę mapę); pozostałe są czysto zawodowe. Nazwy przedmiotów są propozycjami. Powiązanie nie oznacza pełnego pokrycia efektu lub kwalifikacji. Lekcje nie zastępują programu magazynowo-sprzedażowego, prawdziwej kasy, praktyk zawodowych ani języka obcego zawodowego. Wynik na karcie nie jest wynikiem egzaminu CKE.

## Materiały offline

manifest.webmanifest i sw.js pozwalają zapisać lokalne materiały przy pierwszym otwarciu przez HTTPS lub localhost. Cache materiałów jest oddzielny od wyników w localStorage. Worker działa wyłącznie w katalogu tego serwisu, nie przechwytuje innych projektów i źródeł zewnętrznych. Nowy cache ma wersję wynikającą z treści plików. W sieci pliki są aktualizowane, a przy braku sieci odczytywane lokalnie. Pełny ZIP pobierz przy połączeniu z internetem; sam ZIP nie jest precachowany. Wersja z plików na dysku nadal działa bez workera.

## Dla prowadzącego

Scenariusze 165 minut, instrukcje, przykładowe rozwiązania, klucze quizów i rubryki informacji zwrotnej. Cały moduł w programie z grupą: 90 min przygotowania + 90 min małych grup + 165 min warsztatu + 45 min wdrożenia = **6,5 h**, pełny cykl **52 h**. Sama strona modułu to praca własna na około godzinę (wprowadzenie, przykład, ćwiczenie, notatki do projektu, quiz) plus opcjonalne opracowanie bazowe; strona pokazuje oba czasy osobno, a szacunek liczy portal.py (page_minutes, reading_minutes). Dodatkowy coaching organizowany poza serwisem.

Widok zmienia prezentację, nie stanowi autoryzacji: oba widoki są publiczne. Prowadzący nie otrzymuje zdalnego dostępu do danych uczestników. Ocenę lekcji wpisuje na tym samym urządzeniu lub po świadomym przekazaniu kopii przez uczestnika. Brak funkcji administracyjnych, rekrutacyjnych i certyfikacji.

## Uruchomienie i zmiany

Wymagane Python 3.10+ i zależność z requirements.txt, a do zmian w lekcjach Node 20+:

```sh
python3 -m pip install -r requirements.txt
npm --prefix lekcje-src ci
npm --prefix lekcje-src run build   # buduje lekcje/, src/lekcje.json, src/trening.json i src/moduly.json
python3 build.py                    # strony serwisu, mapa, XLSX, ZIP, cache offline
python3 -m http.server 8000
```

Otwórz http://localhost:8000. Kolejność ma znaczenie: build.py czyta katalog lekcji z src/lekcje.json i pakuje lekcje/ do ZIP. Nie edytuj wygenerowanych HTML ani lekcje/ bezpośrednio. Aplikacja lekcji jest jednym skryptem bez modułów ES, więc działa także po otwarciu lekcje/index.html z dysku.

| Źródło | Zastosowanie |
|---|---|
| src/course.json | nowe treści ośmiu modułów, ćwiczenia, pola projektu, quizy i rubryki |
| lekcje-src/content/lessons/NN-*.js | treść 29 lekcji: etapy, wyjaśnienia, zadania, klucze, notatki prowadzącego |
| lekcje-src/content/trainings/*.js | pięć treningów: ściąga i pula zadań z generatorami danych |
| lekcje-src/content/modules/NN-*.js | ścieżki pracy własnej do ośmiu modułów; nazwy pól projektu jak w src/course.json, pole source.covers wiąże rozdziały src/0N_*.md z etapami |
| lekcje-src/content/realia.js | polskie fakty prawne i liczbowe z datą sprawdzenia |
| lekcje-src/app, components, lib | aplikacja lekcji (React + Vite), punktacja i zapis |
| src/curriculum.json | formalna mapa odniesień; pole lessons wskazuje numery lekcji 01–34 |
| src/lekcje.json, src/trening.json, src/moduly.json | katalogi lekcji, treningów i ścieżek modułów generowane przez build w lekcje-src |
| offline.py | generowanie manifestu oraz cache materiałów (z lekcje/) |
| school.py | strona szkola.html, mapa CSV i wpisy wyszukiwarki dla lekcji |
| src/resources.json | źródła zewnętrzne i metadane weryfikacji |
| src/01…08*.md | pełne opracowania bazowe modułów |
| src/00*, 09*, 10* | dokumentacja wcześniejszego przeglądu, zachowana jako archiwum |
| portal.py, product_extras.py | szablony i generowanie serwisu oraz narzędzi |
| markdown_tools.py | konwersja Markdown |
| assets/core.js | logika formatu projektu, wyszukiwania, quizów i kalkulacji |
| assets/site.js | obsługa interfejsu, zapisu, eksportu i importu |
| assets/site.css, print.css | układ responsywny i druk |

Arkusz i pakiet offline są generowane deterministycznie. ZIP jest śledzony pomimo reguły ignorowania plików ZIP; przy pierwszym dodaniu użyj git add -f downloads/pakiet-offline.zip.

## Sprawdzenie

```sh
python3 tests/validate.py
npm ci
npm test
npm --prefix lekcje-src test             # kontrakt treści, schematy, treningi i punktacja
npm --prefix lekcje-src run test:e2e     # Playwright + axe w Chromium
```

Zależności npm w katalogu głównym służą wyłącznie testom. Opublikowana strona nie potrzebuje Node ani bibliotek z CDN. Kontrola Pythona sprawdza linki, kotwice, etykiety, treści, czasy, formuły XLSX i zawartość offline. Testy JS sprawdzają obliczenia, import/eksport, wyszukiwanie i zachowanie interfejsu w DOM. Szczegóły i ograniczenia: VERIFICATION.md.

## Dane i prywatność

localStorage pod kluczem pracownia-project-v1 przechowuje notatki, odpowiedzi, postęp, dane kalkulatora i wybrany widok. Lekcje handlu i treningi zapisują odpowiedzi, wyniki i historię serii pod osobnym kluczem pracownia-lekcje-v1. Starsze kopie JSON z polem lessons (dawne sesje HAN) da się wczytać; to pole jest pomijane. Brak wysyłania danych i analityki. Kopia JSON zawiera te same dane. Przy wspólnym profilu przeglądarki mogą być widoczne innym osobom. Gdy zapis jest zablokowany, interfejs ostrzega i utrzymuje stan sesji do eksportu. Nie wpisuj danych klientów i informacji poufnych. Przy plikach otwieranych z dysku zachowanie storage zależy od przeglądarki; zalecany HTTP(S).

## Zakres materiałów i aktualność

W repozytorium nie ma oryginalnych MP4, DOCX, PPTX i PDF przywołanych w opracowaniach. Produkt nie udostępnia ich kopii; można przejść program z materiałami tekstowymi i własnymi ćwiczeniami. Kursy i dokumenty PARP, PFR i pozostałych instytucji to opcjonalne odnośniki, z zachowaniem praw wydawców.

Polskie uzupełnienia i katalog źródeł: 18.10.2026. Strony Biznes.gov.pl potwierdzono w indeksie oficjalnego portalu, ponieważ bezpośredni odczyt zwracał 403. Aktualność warunków prawnych, finansowania i standardów ESG wymaga sprawdzenia przed ich zastosowaniem do konkretnej firmy. Nie przenosimy dawnych węgierskich progów do polskiej instrukcji. Starsze kwoty i przykłady zagraniczne są kontekstem historycznym. Brak potwierdzonych wyników pilotażu.

## Autorstwo i finansowanie

Baza: Consulting and coaching programme for aspiring entrepreneurs, materiały modułowe, Coach Corner. Projekt wdrożenia: Wiesław Filipiak, Maciej Najwer, ZSZ nr 5 we Wrocławiu, listopad 2025. Polskie przypadki, quizy, karty i scenariusze 165 min są nowymi propozycjami dydaktycznymi. Materiał modułu 4 zawiera fragmenty Digital Coach (Ch. Prinz, B. Kuhlenkötter, Ruhr University Bochum, 2020), CC BY 4.0. Lean Canvas: koncepcja Ash Maurya; własny układ karty.

Finansowane przez Unię Europejską. Poglądy i opinie są poglądami autorów i niekoniecznie odzwierciedlają stanowisko UE lub EACEA. UE ani EACEA nie ponoszą za nie odpowiedzialności.

## Publikacja

Zachowano istniejący model GitHub Pages: gałąź main, katalog /. Zmiany w gałęzi roboczej nie zmieniają publicznego serwisu. Po przejrzeniu i scaleniu należy publikować gotowe HTML razem z assets, downloads i lekcje. Plik .nojekyll pozostaje w repozytorium.
