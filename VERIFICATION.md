# Weryfikacja wersji 18.10.2026

Wszystkie zmiany dotyczą wyłącznie repozytorium wp4-4-a1-aspirujacy-przedsiebiorcy. Produkt ma dwie ścieżki: uczestnika i prowadzącego, bez kont i administracji.

## Sprawdzone

- Generator kończy się poprawnie: 8 modułów, 17 źródeł, materiały do druku, XLSX, ZIP.
- 71 dokumentów HTML: lokalne linki, kotwice, brak powtórzonych identyfikatorów, etykiety formularzy i jeden H1 na stronę modułu.
- Każdy moduł ma 6 pól projektu, 3 pytania z wyjaśnieniami, co najmniej 4 kroki ćwiczenia i 3 kryteria informacji zwrotnej.
- Scenariusze serwisu sumują się do 165 minut. Moduł ma 390 min, program 52 h. Dłuższe scenariusze wcześniejszego opracowania są oznaczone własnym rzeczywistym czasem.
- Odczyt XML arkusza XLSX i obliczenie wszystkich formuł na danych przykładowych: salda końcowe 1500, 0, 500, 3500, 7000, 11000 PLN.
- Pakiet offline zawiera wszystkie lokalne zasoby swoich stron; link do ponownego pobrania ZIP w samej paczce kieruje do instrukcji offline.
- Pięć testów logiki JS: obliczenia z zaokrągleniem, odrzucenie nieznanej wersji importu, filtrowanie pól i wartości, zachowanie kopii projektu, klucze quizów i normalizacja polskich znaków w wyszukiwaniu.
- Integracja z drzewem DOM (LinkeDOM): zapis między stronami, ukończenie i kontynuacja, wybór widoku, link do scenariusza, quiz i odtworzenie wyniku, filtry biblioteki, wyszukiwanie, kalkulator, import poprawnego/błędnego pliku, traktowanie importowanych znaczników jako tekstu, kasowanie i niedostępny localStorage.
- Kontrola składni JS, kompilacja modułów Pythona i git diff --check.

## Ograniczenia

Nie było dostępnej przeglądarki testowej. Testy DOM nie zastępują wizualnej oceny responsywności, natywnego okna drukowania/PDF, czytnika ekranu ani otwarcia XLSX w Excelu lub LibreOffice. CSS zawiera układy mobilne i reguły druku, ale nie są one potwierdzone screenshotami.

Publiczne źródła sprawdzono w zakresie opisanym w src/resources.json. Trzy strony Biznes.gov.pl potwierdzono przez indeks oficjalnego portalu, bez bezpośredniego odczytu (403). Nie przeprowadzono audytu prawnego. Aktualność przepisów i kwalifikowalność do finansowania trzeba ustalić dla konkretnego przypadku.

Oryginalne MP4, DOCX, PPTX i PDF programu nie występują w repozytorium. Pakiet obejmuje dostępne opracowania i nowe własne materiały, bez kopii tych oryginałów oraz bez kopii zewnętrznych kursów. Nie potwierdza realizacji ani wyników pilotażu.

Zmiany przygotowano na gałęzi roboczej; publiczny GitHub Pages wymaga osobnego scalenia/publikacji. Nie ma podglądu wdrożenia potwierdzonego przez narzędzie publikacyjne.

## Uzupełnienie HAN.01 / HAN.02

Mapa ma 27 odniesień do wybranych efektów i kryteriów, z 9 źródłami formalnymi i pomocniczymi. Źródłem dokładnej numeracji są odczytane PDF MEN/ORE. Aktualny portal MEN odsyła do tej podstawy; ZPE potwierdza strukturę w widoku oznaczonym 2025/2026. CKE potwierdzono w oficjalnym katalogu, ale pełny odczyt informatora nie był dostępny, więc nie wykorzystano go do ustalenia numerów kryteriów.

Sprawdzono sumy czasu i powiązania wszystkich 10 lekcji oraz pliki ucznia/nauczyciela. 7 × 45 + 3 × 90 = 585 minut (13 jednostek po 45 min); przerwy między lekcjami nie są wliczone. Karty mają komplet fikcyjnych danych, zadania, wzorcowe omówienia i własne rubryki. To adaptacja wybranych efektów, bez deklaracji kompletnego programu lub oficjalnej akceptacji CKE.

## Lokalne sesje i karty oceny

Dodano 50 pytań lekcyjnych (po 5 w każdej sesji) obok 24 pytań modułowych. Każdy test ma 10 pkt, a trzy ręczne kryteria pracy 6 pkt. Testy sprawdzają polskie formaty liczb, tolerancję, brak odpowiedzi oraz wstrzymanie wyniku łącznego do chwili oceny wszystkich kryteriów.

Dodatkowe testy logiki i DOM obejmują: start, pauzę, wznowienie, odświeżenie, powrót po upływie czasu, koniec ręczny i automatyczny, historię trzech prób, zachowanie historycznego klucza i danych zadania, wpis oceny praktycznej, odtworzenie karty, bezpieczny HTML do pobrania, kopię wstrzymującą aktywną sesję, import starego formatu oraz pracę bez localStorage.

Test workera w izolowanym środowisku JS sprawdza precache, aktualizację wyłącznie własnego cache, pobieranie sieciowe i fallback bez sieci, odnośniki z parametrem próby, kod 503 dla niepobranego materiału oraz brak przechwytywania zewnętrznych domen, innych katalogów i żądań POST. Manifest i każdy lokalny plik precache mają kontrolę w walidatorze. To nie zastępuje uruchomienia prawdziwego service workera w przeglądarce: instalacja, obsługa natywnej pamięci, responsywność i druk nadal wymagają oceny w realnej przeglądarce.
