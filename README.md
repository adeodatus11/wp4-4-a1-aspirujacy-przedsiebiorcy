# Pracownia przedsiębiorczości

Serwis programu WP4.4.A1 (WIN4SMEs CoVE) dla **uczestnika i prowadzącego**. Osiem modułów, polskie uzupełnienia, projekt uczestnika i komplet własnych materiałów warsztatowych. Statyczny HTML/CSS/JS, bez kont i backendu. Gotowe strony są wersjonowane i działają na GitHub Pages z katalogu głównego.

## Dla uczestnika

- Osiem modułów: coaching, postawa przedsiębiorcza, walidacja, model biznesowy i Lean, cyfryzacja i AI, marketing, ESG, pitch i finansowanie.
- Pełne wcześniejsze opracowania oraz nowe wprowadzenia, osiem polskich przypadków fikcyjnych i instrukcje ćwiczeń.
- 48 pól projektu, 24 pytania z wyjaśnieniami, lokalny zapis postępów.
- Eksport/import kopii JSON, notatki TXT, druk projektu i usuwanie danych.
- Karty pracy, Lean Canvas, kalkulator i arkusz cash flow XLSX, pakiet offline ZIP.
- Biblioteka 17 źródeł z wydawcą, sposobem i datą sprawdzenia; wyszukiwanie działa bez zewnętrznego API.

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
