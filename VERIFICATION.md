# Weryfikacja wersji 18.10.2026

Wszystkie zmiany dotyczą wyłącznie repozytorium wp4-4-a1-aspirujacy-przedsiebiorcy. Produkt ma dwie ścieżki: uczestnika i prowadzącego, bez kont i administracji.

## Sprawdzone

- Generator kończy się poprawnie: 8 modułów, 17 źródeł, materiały do druku, XLSX, ZIP.
- 38 dokumentów HTML serwisu: lokalne linki, kotwice, brak powtórzonych identyfikatorów, etykiety formularzy i jeden H1 na stronę modułu.
- Każdy moduł ma 6 pól projektu, 3 pytania z wyjaśnieniami, co najmniej 4 kroki ćwiczenia i 3 kryteria informacji zwrotnej.
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

## Lekcje handlu HAN.01 / HAN.02

Dawne 10 tematów HAN (585 min, sesje z zegarem i ręczną kartą oceny) zastąpiono aplikacją lekcje/ z 34 lekcjami (1935 min). Mapa 27 efektów została; jej pole lessons wskazuje nowe numery lekcji, a walidator sprawdza, że jednostka efektu jest wpisana w każdej przypisanej lekcji.

Sprawdzane automatycznie (npm --prefix lekcje-src test):

- kontrakt każdej lekcji: pola, suma minut etapów równa 45/90, przerwa po 45 min w lekcjach 90 min, 2–5 celów, karta wyjścia;
- każde pytanie wyboru ma 4 odpowiedzi i wyjaśnienie każdej błędnej; co najmniej 5 punktowanych zadań na 45 min; najwyżej 650 słów czytania na 45 min;
- w całym katalogu poprawna odpowiedź jest najdłuższa najwyżej w 40% pytań i żadna pozycja (A–D) nie przeważa ponad 40%;
- język: lista zakazanych zwrotów typowych dla tekstów generowanych, brak form rodzajowych („zrobiłeś/zrobiłaś”) w poleceniach, najwyżej jedno „fikcyjny” w lekcji;
- realia: każdy fakt ma datę sprawdzenia nie starszą niż rok;
- punktacja: pełne punkty za pierwszą próbę, połowa po poprawie, zadania wieloelementowe liczone proporcjonalnie.

Playwright w Chromium (npm --prefix lekcje-src run test:e2e): każda z 34 lekcji rozwiązana według klucza daje maksymalny wynik; wszystkie etapy na szerokości 390 px bez poziomego przewijania; zapis i reset postępu; szuflada i plan prowadzącego; filtry katalogu; axe bez naruszeń na katalogu, lekcji, planie i stronie „Jak korzystać”. Otwarcie lekcje/index.html z dysku (file://) sprawdzono ręcznie skryptem Playwright: bez błędów konsoli, ze stylami.

Liczby w zadaniach przeliczono ręcznie podczas pisania lekcji. Faktów prawnych nie dało się sprawdzić bezpośrednio na gov.pl (polityka sieci środowiska blokowała odczyt); potwierdzono je w wyszukiwarce i zapisano z datą. Przed zajęciami warto sprawdzić bieżące kwoty (płaca minimalna, progi VAT, terminy KSeF).

Ograniczenia: brak pilotażu z uczniami i dorosłymi; czas etapów jest szacunkiem autorskim. Lekcje nie zastępują programu magazynowo-sprzedażowego używanego na egzaminie ani obsługi prawdziwej kasy.
