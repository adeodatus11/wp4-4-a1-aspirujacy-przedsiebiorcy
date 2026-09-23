# Program coachingowy dla aspirujących przedsiębiorców

Opracowanie merytoryczne materiałów źródłowych programu **WP4.4.A1** (*Consulting and coaching programme for aspiring entrepreneurs*) wraz z projektem wdrożenia dla pilotażu w Polsce.

Projekt Erasmus+ **WIN4SMEs CoVE**, COVE Polska.

## Co tu jest

Statyczna strona — 12 stron HTML, bez zależności zewnętrznych w przeglądarce.

| Strona | Zawartość |
|---|---|
| `analiza.html` | Wyniki przeglądu, mapa materiałów, status planu i rezultaty, ograniczenia |
| `index.html` | Przegląd: grupy docelowe, struktura modułu, lista modułów, kluczowe daty |
| `przeglad.html` | Pełny przegląd programu, cztery filary, checklista wdrożeniowa, literatura |
| `modul-1.html` … `modul-8.html` | Osiem modułów: treść merytoryczna, Coach Corner, scenariusz realizacji, wskazówki dla prowadzącego, materiały do przygotowania |
| `wdrozenie.html` | Projekt wdrożenia, harmonogram, analiza rekrutacji i weryfikacji grupy docelowej, szkielet raportu końcowego |

Każdy moduł ma tę samą strukturę: **cel i efekty uczenia się → treść merytoryczna ze studiami przypadków → Coach Corner → scenariusz realizacji z rozpiską czasową → wskazówki dla prowadzącego z tabelą typowych pułapek → checklista materiałów.**

## Moduły

| Nr | Moduł | Wymiar |
|---|---|---|
| 1 | Coaching — konsultacje indywidualne i w małych grupach | 6–8 h |
| 2 | Postawa przedsiębiorcza — samoświadomość i motywacja | 6–8 h |
| 3 | Walidacja pomysłu — dopasowanie problem–rozwiązanie | 6–8 h |
| 4 | Model biznesowy — Lean / Business Model Canvas | 6–8 h |
| 5 | Narzędzia cyfrowe — web, e-commerce, AI | 6–8 h |
| 6 | Marketing / PR — grupa docelowa, STP, komunikacja | 6–8 h |
| 7 | Zielona gospodarka — zrównoważony rozwój i ESG | 6–8 h |
| 8 | Pitch i pieniądze — finansowanie i inwestorzy | 6–8 h |

## Struktura repozytorium

```
.
├── index.html            strona główna
├── przeglad.html         przegląd programu
├── modul-1..8.html       moduły
├── wdrozenie.html        wdrożenie i rekrutacja
├── assets/
│   ├── site.css          arkusz stylów (jasny i ciemny motyw)
│   └── site.js           przełącznik motywu, zwijana nawigacja
├── src/                  źródła Markdown — tu wprowadza się zmiany treści
└── build.py              generator HTML
```

## Jak wprowadzać zmiany

Treść edytuje się **w plikach `src/*.md`**, nie w HTML. Potem:

```bash
python3 -m pip install -r requirements.txt
python3 build.py
```

Skrypt nadpisuje wszystkie strony poza `index.html`, którą utrzymuje się ręcznie.

## Do uzupełnienia

Braki odziedziczone po materiałach źródłowych, oznaczone w treści pomarańczowym paskiem:

- **Szablon Lean Canvas** (moduł 4) — w materiale źródłowym w miejscu szablonu autor zostawił notatkę roboczą.
- **Szablony finansowe i planowania cash flow** (moduł 4, odesłanie z modułu 8).
- **Prezentacje warsztatowe AI** (moduł 5): odczytane i opracowane 23.09.2026; przygotować polskie przykłady warsztatowe.
- **Lokalizacja przykładów** — materiały źródłowe są osadzone w kontekście węgierskim; lista miejsc do wymiany znajduje się w `wdrozenie.html`, sekcja 12.

## Źródła

Materiały źródłowe: dokument programowy *Consulting and coaching programme for aspiring entrepreneurs*, dokumenty modułowe, Coach Corner, nagrania wideo, `Fundamentals of Lean Thinking`, template raportowy WP4.4 A1.

Projekt wdrożenia: Wiesław Filipiak, Maciej Najwer, Zespół Szkół Zawodowych nr 5 we Wrocławiu, listopad 2025.

Okres testowania: **1.09.2025 – 28.02.2027**. Raport krajowy: **15.04.2027**.

## Licencja i finansowanie

Finansowane przez Unię Europejską. Wyrażone poglądy i opinie są jedynie opiniami autorów i niekoniecznie odzwierciedlają poglądy Unii Europejskiej lub Europejskiej Agencji Wykonawczej ds. Edukacji i Kultury (EACEA). Unia Europejska ani EACEA nie ponoszą za nie odpowiedzialności.

Materiał modułu 4 zawiera fragmenty programu Digital Coach (Ch. Prinz, B. Kuhlenkötter, Ruhr University Bochum, 2020) udostępnione na licencji CC BY 4.0.

## Przegląd 23.09.2026

Zakres i ustalenia: `analiza.html`. Nagrania zinwentaryzowano bez transkrypcji. Strona rozróżnia założenia programu od potwierdzonych wyników; brak wypełnionego raportu pilotażu w przejrzanych dokumentach. Scenariusze są propozycjami metodycznymi. Dokumenty źródłowe i filmy nie są publikowane w repozytorium.

## GitHub Pages

Publikacja z gałęzi `main`, katalog główny `/`. Po zmianie treści uruchom generator, dodaj wygenerowane HTML do commita i wykonaj push. Plik `.nojekyll` zapewnia publikację gotowych plików.
