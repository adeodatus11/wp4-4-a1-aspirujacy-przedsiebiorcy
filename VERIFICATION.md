# Weryfikacja wersji 18.10.2026

Wszystkie zmiany dotyczą wyłącznie repozytorium wp4-4-a1-aspirujacy-przedsiebiorcy. Produkt ma dwie ścieżki: uczestnika i prowadzącego, bez kont i administracji.

## Sprawdzone

- Generator kończy się poprawnie: 8 modułów, 17 źródeł, materiały do druku, XLSX, ZIP.
- 38 dokumentów HTML serwisu: lokalne linki, kotwice, brak powtórzonych identyfikatorów, etykiety formularzy i jeden H1 na stronę modułu.
- Każdy moduł ma 6 pól projektu, 3 pytania z wyjaśnieniami, co najmniej 4 kroki ćwiczenia i 3 kryteria informacji zwrotnej. Poprawna odpowiedź w quizach nie stoi zawsze na tym samym miejscu (rozkład 8/8/8 na 24 pytania; walidator tego pilnuje).
- Scenariusze serwisu sumują się do 165 minut. Moduł ma 390 min, program 52 h. Dłuższe scenariusze wcześniejszego opracowania są oznaczone własnym rzeczywistym czasem.
- Odczyt XML arkusza XLSX i obliczenie wszystkich formuł na danych przykładowych: salda końcowe 1500, 0, 500, 3500, 7000, 11000 PLN.
- Pakiet offline zawiera wszystkie lokalne zasoby swoich stron; link do ponownego pobrania ZIP w samej paczce kieruje do instrukcji offline.
- Pięć testów logiki JS: obliczenia z zaokrągleniem, odrzucenie nieznanej wersji importu, filtrowanie pól i wartości, zachowanie kopii projektu, klucze quizów i normalizacja polskich znaków w wyszukiwaniu.
- Integracja z drzewem DOM (LinkeDOM): zapis między stronami, ukończenie i kontynuacja, wybór widoku, link do scenariusza, quiz i odtworzenie wyniku, filtry biblioteki, wyszukiwanie, kalkulator, import poprawnego/błędnego pliku, traktowanie importowanych znaczników jako tekstu, kasowanie i niedostępny localStorage.
- Kontrola składni JS, kompilacja modułów Pythona i git diff --check.

## Ograniczenia

Strony serwisu (poza lekcjami) testowano w DOM (LinkeDOM), bez przeglądarki. Nie zastępuje to wizualnej oceny responsywności, natywnego okna drukowania/PDF, czytnika ekranu ani otwarcia XLSX w Excelu lub LibreOffice. Audyt treści zanotował poziome przewijanie tabeli na cash-flow.html i ozdobnika na stronie głównej przy wąskim ekranie — do poprawy.

Publiczne źródła sprawdzono w zakresie opisanym w src/resources.json. Trzy strony Biznes.gov.pl potwierdzono przez indeks oficjalnego portalu, bez bezpośredniego odczytu (403). Nie przeprowadzono audytu prawnego. Aktualność przepisów i kwalifikowalność do finansowania trzeba ustalić dla konkretnego przypadku.

Oryginalne MP4, DOCX, PPTX i PDF programu nie występują w repozytorium. Pakiet obejmuje dostępne opracowania i nowe własne materiały, bez kopii tych oryginałów oraz bez kopii zewnętrznych kursów. Nie potwierdza realizacji ani wyników pilotażu.

Zmiany przygotowano na gałęzi roboczej; publiczny GitHub Pages wymaga osobnego scalenia/publikacji. Nie ma podglądu wdrożenia potwierdzonego przez narzędzie publikacyjne.

## Lekcje handlu HAN.01 / HAN.02 i trening

Dawne 10 tematów HAN zastąpiono aplikacją lekcje/: 29 lekcji (1665 min) i 5 treningów dla dorosłych. Tematy, które nie mają oparcia w jednostkach podstawy (sprzedaż internetowa i zwroty, opinie i wiadomości online, program lojalnościowy, ankieta satysfakcji, projekt „mój sklep”), przeszły do treningu. Mapa 27 efektów została; jej pole lessons wskazuje nowe numery, a walidator sprawdza, że jednostka efektu jest wpisana w każdej przypisanej lekcji i że strony modułów linkują do treningów.

Sprawdzane automatycznie (npm --prefix lekcje-src test):

- kontrakt każdej lekcji: pola, suma minut etapów 45/90, przerwa po 45 min w lekcjach 90 min, 2–5 celów, karta wyjścia, wyjaśnienie każdej błędnej odpowiedzi, co najmniej 5 zadań z punktami na 45 min, najwyżej 650 słów czytania na 45 min;
- schematy (patterns.test.mjs): liczba etapów nie jest stała (żadna wartość ponad 45% lekcji), nazwy pierwszego i ostatniego etapu się nie powtarzają, różne czasy i układy pracy, pytania z różną liczbą odpowiedzi, równy rozkład liter poprawnej odpowiedzi i brak trzech takich samych z rzędu, różne zakończenia, różne początki wstępów, różne kształty zadań „znajdź błędy”, brak odwołań do numerów etapów;
- treningi: każde zadanie z puli buduje się poprawnie dla 40 ziaren losowania, bez NaN i powtórzonych odpowiedzi, z wyjaśnieniem każdej błędnej odpowiedzi; co najmniej 1/3 zadań ma zmienne dane; dobór serii (najpierw błędne, potem nowe), zapis historii i rytm powtórek;
- język: zakazane zwroty typowe dla tekstów generowanych, brak form rodzajowych („-łeś/-łaś”);
- realia: każdy fakt ma datę sprawdzenia nie starszą niż rok.

Playwright w Chromium (npm --prefix lekcje-src run test:e2e, 42 testy): każda lekcja rozwiązana kluczem daje maksymalny wynik; każdy trening rozwiązany kluczem na wylosowanej serii daje komplet punktów, zapisuje wynik i termin; błędne zadanie wraca w powtórce; wszystkie etapy i zadania na 390 px bez poziomego przewijania; zapis i reset; tryb prowadzącego; axe bez naruszeń na katalogu, lekcji, planie, stronie „Jak korzystać” i treningu.

Nowe fakty w treningu (limit i 7 dni przy działalności nierejestrowanej, ulga na start, zwolnienie z KSeF do 10 000 zł miesięcznie, proporcjonalny limit VAT, składki pracodawcy 5790,28 zł przy płacy minimalnej, zakaz fałszywych opinii) potwierdzono w wyszukiwarce w portalach branżowych; serwisy gov.pl były niedostępne z sieci środowiska. Przed zajęciami warto sprawdzić bieżące kwoty.

Ograniczenia: brak pilotażu z uczniami i dorosłymi; czasy etapów i rytm powtórek są założeniem autorskim. Lekcje nie zastępują programu magazynowo-sprzedażowego używanego na egzaminie ani obsługi prawdziwej kasy.

## Ścieżki pracy własnej do modułów

Osiem ścieżek (lekcje/index.html#/moduly, łącznie 1497 min, 120 etapów, 319 zadań) realizuje całe opracowania modułów z src/0N_*.md: każdy rozdział treści (poza celem, scenariuszem, wskazówkami dla prowadzącego, materiałami, literaturą i podsumowaniem) oraz Coach Corner ma etap z wyjaśnieniem i ćwiczeniem; przykłady węgierskie zastąpiono polskimi przypadkami fikcyjnymi, a wątpliwe lub nieaktualne liczby z opracowań pominięto albo opisano ostrożnie. Wszystkie 48 pól projektu jest wypełnianych w ścieżkach i zapisywanych w „Moim projekcie”. Moduł kończy podsumowanie bez punktacji.

Sprawdzane automatycznie (tests/modules.test.mjs): każdy wymagany rozdział opracowania ma wpis w source.covers wskazujący istniejący etap, tytuł zgodny ze stroną modułu, suma minut etapów, 75–240 min na ścieżkę, co najmniej 8 zadań z informacją zwrotną, wyjaśnienie każdej błędnej odpowiedzi, każde pole projektu dokładnie raz i z nazwą jak w src/course.json, brak karty oceny, limit tekstu do czytania, brak form rodzajowych i łatania tekstu w kodzie, istniejące wpisy realiów. Playwright: każda ścieżka przechodzona etapami, podsumowanie liczy pola, wpis widać w moj-projekt.html, 390 px bez poziomego przewijania i z widocznym bieżącym etapem w pasku, lista wszystkich ścieżek, axe na wybranych etapach modułów 1, 6 i 8.

Nowe realia (lekcje-src/content/realia.js, sprawdzone 18.10.2026): dane firmy na stronie, cookies, dane klientów w narzędziach AI, zgody na marketing e-mail/SMS/telefon, VSME, hasła ekologiczne (dyrektywa 2024/825 — stan wdrożenia w Polsce do potwierdzenia), źródła finansowania. Nie przeprowadzono audytu prawnego.
