# Pracownia przedsiębiorczości

Serwis programu WP4.4.A1 (WIN4SMEs CoVE) dla **uczestnika i prowadzącego**. Osiem modułów, polskie uzupełnienia, projekt uczestnika i komplet własnych materiałów warsztatowych. Statyczny HTML/CSS/JS, bez kont i backendu. Gotowe strony są wersjonowane i działają na GitHub Pages z katalogu głównego.

## Dla uczestnika

- Osiem modułów: coaching, postawa przedsiębiorcza, walidacja, model biznesowy i Lean, cyfryzacja i AI, marketing, ESG, pitch i finansowanie.
- Pełne wcześniejsze opracowania oraz nowe wprowadzenia, osiem polskich przypadków fikcyjnych i instrukcje ćwiczeń.
- 48 pól projektu, 24 pytania z wyjaśnieniami, lokalny zapis postępów.
- Eksport/import kopii JSON, notatki TXT, druk projektu i usuwanie danych.
- Karty pracy, Lean Canvas, kalkulator i arkusz cash flow XLSX, pakiet offline ZIP.
- Biblioteka 17 źródeł z wydawcą, sposobem i datą sprawdzenia; wyszukiwanie działa bez zewnętrznego API.

## HAN.01 / HAN.02 w zwykłym cyklu szkolnym

Strona szkola.html łączy program z 27 wybranymi efektami kwalifikacji HAN.01 i HAN.02. Każde odniesienie podaje jednostkę, numer efektu, osobno numery kryteriów, stronę oficjalnego PDF MEN/ORE i zakres powiązania. Opisy efektów są skrótami autorskimi. Zapis kwalifikacji i strukturę potwierdzono również w portalu MEN i ZPE. Mapa bazuje na wskazanym tekście podstawy 2019; nauczyciel dobiera ją do rocznika i programu szkoły.

Pakiet zawiera 10 tematów (7 × 45 min oraz 3 × 90 min, razem 13 lekcji = 585 min): potrzeby klienta, segmentacja i SWOT, 4P, promocja i budżet, ceny i marże, oferta cyfrowa, wynik/gotówka/wskaźniki, plan zespołu, opakowania i rozmowa ofertowa. Każdy ma gotowe dane fikcyjne, kartę ucznia, scenariusz nauczyciela, klucz, rubrykę, wariant wsparcia i rozszerzenia. Przerwa między lekcjami nie jest wliczona w 90 minut pracy. Karty drukują się do PDF; mapa jest też w CSV. Wszystko trafia do paczki offline.

Nazwy przedmiotów są propozycjami. Powiązanie nie oznacza pełnego pokrycia efektu lub kwalifikacji. AI, Lean Canvas, VSME i pitch inwestorski są narzędziami/rozszerzeniami, nie literalnymi obowiązkami podstawy. Pakiet nie zastępuje obsługi kasy, wszystkich czynności magazynowych, księgowości, BHP i języka zawodowego.

## Dla prowadzącego

Scenariusze 165 minut, instrukcje, przykładowe rozwiązania, klucze quizów i rubryki informacji zwrotnej. Cały moduł: 90 min przygotowania + 90 min małych grup + 165 min warsztatu + 45 min wdrożenia = **6,5 h**, pełny cykl **52 h**. Dodatkowy coaching organizowany poza serwisem.

Widok zmienia prezentację, nie stanowi autoryzacji: oba widoki są publiczne. Prowadzący nie otrzymuje dostępu do notatek ani wyników uczestników. Brak funkcji administracyjnych, rekrutacyjnych i certyfikacji.

## Uruchomienie i zmiany

Wymagane Python 3.10+ i zależność z requirements.txt:

```sh
python3 -m pip install -r requirements.txt
python3 build.py
python3 -m http.server 8000
```

Otwórz http://localhost:8000. Generator odtwarza wszystkie strony, dane wyszukiwarki, dokumenty do druku, XLSX i ZIP. Nie edytuj wygenerowanych HTML bezpośrednio.

| Źródło | Zastosowanie |
|---|---|
| src/course.json | nowe treści ośmiu modułów, ćwiczenia, pola projektu, quizy i rubryki |
| src/curriculum.json, src/lessons.json | formalna mapa odniesień i autorskie lekcje 45/90 min |
| school.py | generowanie mapy, lekcji i pakietów HAN.01/HAN.02 |
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
```

Zależność npm służy wyłącznie testom. Strona nie potrzebuje Node ani bibliotek z CDN. Kontrola Pythona sprawdza linki, kotwice, etykiety, treści, czasy, formuły XLSX i zawartość offline. Testy JS sprawdzają obliczenia, import/eksport, wyszukiwanie i zachowanie interfejsu w DOM. Szczegóły i ograniczenia: VERIFICATION.md.

## Dane i prywatność

localStorage pod kluczem pracownia-project-v1 przechowuje notatki, odpowiedzi, postęp, dane kalkulatora i wybrany widok. Brak wysyłania danych i analityki. Kopia JSON zawiera te same dane. Przy wspólnym profilu przeglądarki mogą być widoczne innym osobom. Gdy zapis jest zablokowany, interfejs ostrzega i utrzymuje stan sesji do eksportu. Nie wpisuj danych klientów i informacji poufnych. Przy plikach otwieranych z dysku zachowanie storage zależy od przeglądarki; zalecany HTTP(S).

## Zakres materiałów i aktualność

W repozytorium nie ma oryginalnych MP4, DOCX, PPTX i PDF przywołanych w opracowaniach. Produkt nie udostępnia ich kopii; można przejść program z materiałami tekstowymi i własnymi ćwiczeniami. Kursy i dokumenty PARP, PFR i pozostałych instytucji to opcjonalne odnośniki, z zachowaniem praw wydawców.

Polskie uzupełnienia i katalog źródeł: 18.10.2026. Strony Biznes.gov.pl potwierdzono w indeksie oficjalnego portalu, ponieważ bezpośredni odczyt zwracał 403. Aktualność warunków prawnych, finansowania i standardów ESG wymaga sprawdzenia przed ich zastosowaniem do konkretnej firmy. Nie przenosimy dawnych węgierskich progów do polskiej instrukcji. Starsze kwoty i przykłady zagraniczne są kontekstem historycznym. Brak potwierdzonych wyników pilotażu.

## Autorstwo i finansowanie

Baza: Consulting and coaching programme for aspiring entrepreneurs, materiały modułowe, Coach Corner. Projekt wdrożenia: Wiesław Filipiak, Maciej Najwer, ZSZ nr 5 we Wrocławiu, listopad 2025. Polskie przypadki, quizy, karty i scenariusze 165 min są nowymi propozycjami dydaktycznymi. Materiał modułu 4 zawiera fragmenty Digital Coach (Ch. Prinz, B. Kuhlenkötter, Ruhr University Bochum, 2020), CC BY 4.0. Lean Canvas: koncepcja Ash Maurya; własny układ karty.

Finansowane przez Unię Europejską. Poglądy i opinie są poglądami autorów i niekoniecznie odzwierciedlają stanowisko UE lub EACEA. UE ani EACEA nie ponoszą za nie odpowiedzialności.

## Publikacja

Zachowano istniejący model GitHub Pages: gałąź main, katalog /. Zmiany w gałęzi roboczej nie zmieniają publicznego serwisu. Po przejrzeniu i scaleniu należy publikować gotowe HTML razem z assets i downloads. Plik .nojekyll pozostaje w repozytorium.
