"""Generator stron uczestnika i prowadzącego. Bez usług zewnętrznych w runtime."""
from pathlib import Path
import html
import json
import re
import zipfile
from xml.sax.saxutils import escape
from markdown_tools import render_md, split_front, postprocess

ROOT = Path(__file__).resolve().parent
SRC = ROOT / 'src'
COURSE = json.loads((SRC / 'course.json').read_text())
RESOURCES = json.loads((SRC / 'resources.json').read_text())
BY_ID = {r['id']: r for r in RESOURCES}
DATE = '18.10.2026'
AGENDA = [('Otwarcie i cel spotkania',10),('Trzy pojęcia w praktyce',20),('Polski przykład — analiza w parach',20),('Praca nad własną kartą',35),('Przerwa',15),('Test rozwiązania i informacja zwrotna',30),('Omówienie i quiz',20),('Plan działania i zamknięcie',15)]

def e(value): return html.escape(str(value), quote=True)
def write(path,content):
    p=ROOT/path
    p.parent.mkdir(parents=True,exist_ok=True)
    p.write_text(content,encoding='utf-8')
def md(text): return postprocess(render_md(text))[0]
def button(url,label,secondary=False,attrs=''):
    cls='button secondary' if secondary else 'button'
    return f'<a class="{cls}" href="{e(url)}" {attrs}>{e(label)}</a>'
def heading(kicker,title,text): return f'<header class="page-head"><p class="eyebrow">{e(kicker)}</p><h1>{e(title)}</h1><p class="lead">{e(text)}</p></header>'
def resource(r):
    warning=' · aktualność do sprawdzenia' if r['timeSensitive'] else ''
    return f'''<article class="resource-card" data-library-item data-kind="source" data-modules="{' '.join(map(str,r['modules']))}"><div class="resource-top"><span class="tag">{e(r['type'])}</span><span>{e(r['publisher'])}</span></div><h3><a href="{e(r['url'])}" target="_blank" rel="noopener noreferrer">{e(r['title'])} ↗<span class="sr-only"> (nowa karta)</span></a></h3><p>{e(r['description'])}</p><p class="small">Moduły {', '.join(map(str,r['modules']))} · sprawdzenie {DATE}{warning}</p><details><summary>Informacja o źródle</summary><p class="small">{e(r['verification'])} Materiał pozostaje w serwisie wydawcy.</p></details></article>'''

def shell(title,body,current='index.html',module=None,role='participant'):
    links=[('index.html','Twoja ścieżka','◫'),('moj-projekt.html','Mój projekt','▤'),('biblioteka.html','Biblioteka','▦'),('prowadzacy.html','Dla prowadzącego','↗')]
    nav=''.join(f'<a class="nav-link {"active" if url==current else ""}" href="{url}"'+(' aria-current="page"' if url==current else '')+f'>{icon}<span>{label}</span></a>' for url,label,icon in links)
    modules=''.join(f'<a class="module-nav {"active" if module==m["n"] else ""}" href="modul-{m["n"]}.html"'+(' aria-current="page"' if module==m['n'] else '')+f'><span>{m["n"]:02d}</span>{e(m["topic"])}<i data-status="{m["n"]}" aria-hidden="true"></i></a>' for m in COURSE)
    return f'''<!doctype html><html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="Osiem modułów przedsiębiorczości, polskie przykłady, ćwiczenia i materiały dla uczestnika oraz prowadzącego."><meta name="theme-color" content="#123d36"><title>{e(title)} · Pracownia przedsiębiorczości</title><link rel="icon" href="assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="assets/site.css"><script src="assets/course-data.js" defer></script><script src="assets/search-index.js" defer></script><script src="assets/core.js" defer></script><script src="assets/site.js" defer></script></head>
<body data-default-role="{role}" data-module="{module or ''}"><a class="skip" href="#main">Przejdź do treści</a><div class="layout"><aside class="sidebar"><a class="brand" href="index.html"><span class="brand-mark" aria-hidden="true">p.</span><span>pracownia<strong>przedsiębiorczości</strong></span></a><button class="mobile-toggle" aria-expanded="false" aria-controls="main-navigation">Menu <span aria-hidden="true">☰</span></button><div id="main-navigation" class="navigation"><p class="nav-label">TWOJA PRZESTRZEŃ</p><nav aria-label="Nawigacja główna">{nav}</nav><p class="nav-label">PROGRAM · 8 MODUŁÓW</p><nav class="module-list" aria-label="Moduły">{modules}</nav><div class="sidebar-bottom"><span class="small">WIN4SMEs CoVE · WP4.4.A1</span><a href="o-materialach.html">O materiałach i prywatności ↗</a></div></div></aside><div class="main-shell"><header class="topbar"><span class="breadcrumb">PROGRAM ROZWOJU PRZEDSIĘBIORCZOŚCI</span><div class="role-control"><label for="role-select">Widok</label><select id="role-select"><option value="participant">Uczestnik</option><option value="teacher">Prowadzący</option></select></div></header><div class="search-wrap"><form class="search-form" role="search"><label class="sr-only" for="site-search">Szukaj w materiałach</label><span aria-hidden="true">⌕</span><input type="search" id="site-search" placeholder="Szukaj tematu, ćwiczenia lub źródła…" autocomplete="off" aria-controls="search-results"><button type="submit">Szukaj</button></form><section id="search-results" class="search-results" hidden aria-label="Wyniki wyszukiwania"><div class="section-heading"><h2>Wyniki wyszukiwania</h2><button type="button" id="search-close" class="text-button">Zamknij</button></div><p id="search-count" role="status"></p><div id="search-items"></div></section></div><main id="main" tabindex="-1">{body}</main><footer class="footer"><p>Praktyka, refleksja, własny projekt.</p><p>WP4.4.A1 · WIN4SMEs CoVE · Finansowane przez Unię Europejską.</p><p class="small">Wyrażone poglądy i opinie są poglądami autorów i niekoniecznie odzwierciedlają stanowisko UE lub EACEA. UE ani EACEA nie ponoszą za nie odpowiedzialności.</p><a href="o-materialach.html">Źródła, zakres i prywatność</a></footer></div></div><div id="storage-warning" class="storage-warning" role="status" hidden>Zapis w tej przeglądarce jest niedostępny. Możesz pracować, ale przed wyjściem wyeksportuj projekt.</div><noscript><div class="storage-warning">Treść i pliki działają bez JavaScript. Postępy, notatki, quizy i wyszukiwarka wymagają jego włączenia.</div></noscript></body></html>'''

def module_card(m):
    n=m['n']
    return f'''<article class="course-card"><div class="card-top"><span class="module-number">{n:02d}</span><span class="module-state" data-state="{n}">Do rozpoczęcia</span></div><span class="card-icon" aria-hidden="true">{m['icon']}</span><p class="eyebrow">{e(m['topic'])}</p><h3><a href="modul-{n}.html">{e(m['title'])}</a></h3><p>{e(m['subtitle'])}</p><div class="card-foot"><span>6,5 h · karta pracy · quiz</span><a href="modul-{n}.html" aria-label="Otwórz moduł {n}: {e(m['title'])}">↗</a></div></article>'''

def home():
    body=f'''<section class="home-hero"><div><p class="eyebrow">OD POMYSŁU DO WŁASNEGO SPOSOBU DZIAŁANIA</p><h1>Twój pomysł.<br>Twój następny <em>krok.</em></h1><p class="lead">Osiem praktycznych modułów, które pomogą Ci sprawdzić pomysł, ułożyć model firmy i zacząć działać w polskich realiach.</p><div class="actions">{button('modul-1.html','Zacznij od modułu 1 ↗',attrs='id="continue-learning"')}{button('moj-projekt.html','Otwórz mój projekt',True)}</div><div class="hero-stats"><span><strong>08</strong> modułów</span><span><strong>52 h</strong> pracy w programie</span><span><strong>01</strong> własny projekt</span></div></div><div class="hero-art" role="img" aria-label="Sprawdź problem i klienta, zbuduj model, zacznij działać"><div class="orbit"></div><span class="art-tag">MAŁE KROKI. REALNE DECYZJE.</span><div class="art-card c1"><span>01 / SPRAWDŹ</span><strong>Problem.<br>Klient.<br>Dowody.</strong><i>⌕</i></div><div class="art-card c2"><span>02 / ZBUDUJ</span><strong>Model, który<br>ma sens.</strong><i>▦</i></div><div class="art-card c3"><span>03 / DZIAŁAJ</span><strong>Jedna zmiana.<br>Potem kolejna.</strong><i>↗</i></div></div></section>
<section class="progress-panel" aria-label="Postęp programu"><div><p class="eyebrow">TWÓJ RYTM, TWOJA ŚCIEŻKA</p><h2><span data-completed-count>0</span> z 8 modułów ukończonych</h2><p>Postęp zostaje na tym urządzeniu. To Twoja samoocena, bez ocen i certyfikatów.</p></div><div class="progress-right"><progress id="course-progress" max="8" value="0" aria-label="Ukończone moduły">0 z 8</progress><a href="moj-projekt.html">Zobacz swój projekt →</a></div></section>
<section id="moduly" class="section"><div class="section-heading"><div><p class="eyebrow">PROGRAM</p><h2>Przejdź od refleksji do działania.</h2></div><a href="biblioteka.html">Wszystkie materiały ↗</a></div><p class="section-intro">Pracuj po kolei albo wróć do tematu, którego potrzebujesz. Każdy moduł kończysz konkretnym materiałem do własnej firmy.</p><div class="course-grid">{''.join(module_card(m) for m in COURSE)}</div></section>
<section class="two-col section"><article class="panel"><p class="eyebrow">DLA UCZESTNIKA</p><h2>Uczysz się na swoim pomyśle.</h2><p>Czytaj, sprawdzaj przykłady i uzupełniaj projekt. Karty możesz wypełnić online albo wydrukować. Nie potrzebujesz konta ani płatnych narzędzi.</p><ol class="steps"><li>Poznaj temat i polski przykład.</li><li>Wykonaj ćwiczenie na własnym projekcie.</li><li>Sprawdź rozumienie i zaplanuj działanie.</li></ol></article><article class="panel green"><p class="eyebrow">DLA PROWADZĄCEGO</p><h2>Wejdź na zajęcia z planem.</h2><p>Każdy moduł zawiera scenariusz na 165 minut, instrukcje, rubrykę informacji zwrotnej i odpowiedzi do quizu.</p>{button('prowadzacy.html','Otwórz warsztat prowadzącego ↗',True)}</article></section>
<details class="panel section"><summary>Jak pracować z programem?</summary><div class="prose"><p>Moduł to 90 minut przygotowania, 3 × 30 minut pracy w grupie, 165 minut warsztatu i 45 minut wdrożenia oraz refleksji: 6,5 godziny. Osiem modułów daje 52 godziny. Dodatkowy coaching jest opcjonalny i organizowany poza serwisem.</p><p>Pracujesz samodzielnie? Zastąp pracę grupową rozmową z partnerem projektu lub pisemną analizą według rubryki. Jeśli nie masz firmy, użyj pomysłu albo przykładu fikcyjnego.</p><p>Wybór widoku zmienia prezentację materiałów. Oba widoki są dostępne publicznie. Notatki i wyniki pozostają w tej przeglądarce. Regularnie eksportuj kopię projektu.</p></div></details>'''
    write('index.html',shell('Twoja ścieżka',body))

def fields(m,prefix='work'):
    return '<div class="workbook-fields">'+''.join(f'<label for="{prefix}-{m["n"]}-{i}"><span>{i+1:02d}. {e(label)}</span><textarea id="{prefix}-{m["n"]}-{i}" rows="4" data-note="m{m["n"]}-{i}" placeholder="Zapisz własne ustalenia…"></textarea></label>' for i,label in enumerate(m['fields']))+'</div>'

def quiz(m):
    result=[]
    for i,(question,options,correct,explanation) in enumerate(m['quiz']):
        opts=''.join(f'<label class="quiz-option"><input type="radio" name="q{m["n"]}-{i}" value="{j}" required><span>{e(opt)}</span></label>' for j,opt in enumerate(options))
        result.append(f'<fieldset><legend><span>{i+1:02d}</span> {e(question)}</legend>{opts}<p class="quiz-feedback" data-feedback="{i}" hidden></p></fieldset>')
    return f'<form class="quiz" data-quiz="{m["n"]}">{"".join(result)}<button class="button" type="submit">Sprawdź odpowiedzi</button><p class="quiz-result" role="status" aria-live="polite"></p></form>'

def teacher_body(m):
    agenda=''.join(f'<li><strong>{time} min</strong> — {e(label)}</li>' for label,time in AGENDA)
    answers=''.join(f'<li><strong>{e(q[0])}</strong><br>{e(q[1][q[2]])}. {e(q[3])}</li>' for q in m['quiz'])
    rubric=''.join(f'<li>{e(x)}</li>' for x in m['rubric'])
    return f'''<p><strong>Rezultat:</strong> {e(m['outcome'])}</p><p>{e(m['teacherFocus'])}</p><div class="two-col"><div><h3>Warsztat · 165 minut</h3><ol class="steps">{agenda}</ol></div><div><h3>Przygotuj</h3><ul><li>Kartę pracy, papier i pisaki lub komputer.</li><li>Polski przykład i źródła modułu.</li><li>Pary lub trójki, zasady poufności i wariant pracy na fikcyjnym projekcie.</li><li>W module 4: cash flow. W module 5: dane fikcyjne i wariant bez konta AI.</li></ul><h3>Informacja zwrotna</h3><p>Każde kryterium: 0 — jeszcze nie, 1 — częściowo, 2 — konkretnie i spójnie. Bez progu zaliczenia. Wskaż mocny punkt i następny krok.</p><ul>{rubric}</ul></div></div><details><summary>Przykładowe rozwiązanie polskiego przypadku</summary><p>{e(m['caseAnswer'])}</p></details><details><summary>Klucz quizu z uzasadnieniem</summary><ol>{answers}</ol></details>'''

def module_page(m):
    n=m['n']; raw=next(SRC.glob(f'{n:02d}_Modul*.md')).read_text();_,_,text=split_front(raw)
    concepts=''.join(f'<article class="concept"><span>{i+1:02d}</span><div><h3>{e(t)}</h3><p>{e(s)}</p></div></article>' for i,(t,s) in enumerate(m['concepts']))
    downloads=button(f'downloads/karta-modul-{n}.html','Karta pracy do druku / PDF ↗',True)
    if n==4: downloads+=button('downloads/lean-canvas.html','Lean Canvas ↗',True)+button('downloads/cash-flow.xlsx','Arkusz cash flow (.xlsx)',True,'download')+button('cash-flow.html','Kalkulator cash flow ↗',True)
    previous=button(f'modul-{n-1}.html' if n>1 else 'index.html','← Poprzedni moduł' if n>1 else '← Twoja ścieżka',True)
    following=button(f'modul-{n+1}.html' if n<8 else 'moj-projekt.html','Następny moduł →' if n<8 else 'Zobacz gotowy projekt →')
    body=f'''<div class="module-hero">{heading(f'MODUŁ {n:02d} / 08 · {m["topic"]}',m['title'],m['subtitle'])}<div class="pills"><span>6,5 godziny</span><span>Polski przykład</span><span>Ćwiczenie + quiz</span></div><div class="outcome"><span aria-hidden="true">↗</span><div><span class="eyebrow">WYJŚCIE Z MODUŁU</span><p>{e(m['outcome'])}</p></div></div></div><nav class="jump-nav" aria-label="Sekcje modułu"><a href="#sedno">Poznaj temat</a><a href="#przyklad">Polski przykład</a><a href="#cwiczenie">Ćwiczenie</a><a href="#projekt">Twój projekt</a><a href="#quiz">Quiz</a><a href="#zrodla">Źródła</a><a class="teacher-content" href="#dla-prowadzacego">Scenariusz</a></nav>
<section id="sedno" class="section"><p class="eyebrow">01 / POZNAJ TEMAT</p><h2>Trzy rzeczy, od których zacznij.</h2>{concepts}<details class="reference-material"><summary>Przeczytaj pełne opracowanie bazowe modułu</summary><p class="notice">Rozwinięcie materiałów programu, głównie z 2025 r. Przykłady zagraniczne i orientacyjne kwoty są kontekstem, nie aktualną instrukcją dla Polski. Bieżący warsztat prowadź według scenariusza 165 min w widoku prowadzącego.</p><div class="prose">{md(text)}</div></details></section>
<section id="przyklad" class="section local-case"><div class="case-label">POLSKI KONTEKST<br><span>Przypadek fikcyjny</span></div><div><p class="eyebrow">02 / ZOBACZ W PRAKTYCE</p><h2>{e(m['caseTitle'])}</h2><p>{e(m['caseText'])}</p><p><strong>Twoja decyzja:</strong> {e(m['caseTask'])}</p></div></section><section id="cwiczenie" class="section"><p class="eyebrow">03 / PRZETESTUJ</p><h2>Teraz Twój ruch.</h2><ol class="steps large">{''.join(f'<li>{e(s)}</li>' for s in m['steps'])}</ol><div class="actions">{downloads}</div></section>
<section id="projekt" class="section panel"><div class="section-heading"><div><p class="eyebrow">04 / ZAPISZ WŁASNE USTALENIA</p><h2>Dołącz do swojego projektu.</h2></div><span class="save-state" role="status">Zapis lokalny</span></div><p>Notatki zostają w tej przeglądarce. Nie wpisuj danych klientów ani informacji poufnych. Eksportuj kopię w „Moim projekcie”.</p>{fields(m)}<a href="moj-projekt.html">Wszystkie notatki i eksport projektu →</a></section>
<section id="quiz" class="section"><p class="eyebrow">05 / SPRAWDŹ ROZUMIENIE</p><h2>Trzy pytania na koniec.</h2><p>Możesz wracać do quizu. Wynik służy nauce; odpowiedzi nie są wysyłane prowadzącemu.</p>{quiz(m)}</section><section class="module-completion panel"><div><h2>Masz swój następny krok?</h2><p>Oznacz ukończenie po lekturze i ćwiczeniu. Możesz później zmienić oznaczenie.</p></div><label class="completion-toggle"><input type="checkbox" data-complete="{n}"><span>Moduł ukończony</span></label></section>
<section class="teacher-content panel green section" id="dla-prowadzacego"><p class="eyebrow">WARSZTAT PROWADZĄCEGO</p><h2>Poprowadź moduł {n}.</h2>{teacher_body(m)}<div class="actions">{button(f'downloads/prowadzacy-modul-{n}.html','Scenariusz do druku / PDF ↗',True)}</div></section><section id="zrodla" class="section"><p class="eyebrow">CZYTAJ DALEJ</p><h2>Sprawdzone punkty odniesienia.</h2><p>Ćwiczenia wykonasz bez kont zewnętrznych. Niektóre kursy uzupełniające wymagają zapisu.</p><div class="resource-grid">{''.join(resource(BY_ID[r]) for r in m['resources'])}</div></section><div class="page-navigation">{previous}{following}</div>'''
    write(f'modul-{n}.html',shell(m['title'],body,f'modul-{n}.html',n))

def print_shell(title,body):
    return f'''<!doctype html><html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{e(title)}</title><link rel="stylesheet" href="../assets/print.css"></head><body><div class="print-toolbar"><a href="../biblioteka.html">← Biblioteka</a><button type="button" id="print-document">Drukuj / zapisz PDF</button><span>W oknie drukowania wybierz „Zapisz jako PDF”.</span></div><header><p>PRACOWNIA PRZEDSIĘBIORCZOŚCI · WP4.4.A1</p><h1>{e(title)}</h1><p>Materiały warsztatowe · wersja {DATE}</p></header>{body}<footer><p>WIN4SMEs CoVE · Finansowane przez Unię Europejską. Poglądy autorów nie muszą odzwierciedlać stanowiska UE lub EACEA. UE i EACEA nie ponoszą za nie odpowiedzialności.</p><p>Autorskie ćwiczenia uzupełniające opracowanie programu. Wypełniaj na własnym lub fikcyjnym projekcie.</p></footer><script src="../assets/print.js"></script></body></html>'''

def worksheet(m):
    return f'<p><strong>Rezultat:</strong> {e(m["outcome"])}</p><p>Projekt: ____________________ &nbsp; Data: ______________</p><h2>Instrukcja</h2><ol>'+''.join(f'<li>{e(s)}</li>' for s in m['steps'])+'</ol>'+''.join(f'<section class="write-box"><h2>{i+1}. {e(t)}</h2><div class="write-lines"></div></section>' for i,t in enumerate(m['fields']))

def downloads():
    workbook=[];guide=[]
    for m in COURSE:
        n=m['n']; body=worksheet(m);teacher=teacher_body(m)
        # Dokument drukowany ma wszystkie szczegóły rozwinięte.
        teacher=teacher.replace('<details>','<details open>')
        case=f'<h2>{e(m["caseTitle"])} — przykład fikcyjny</h2><p>{e(m["caseText"])}</p><p>{e(m["caseTask"])}</p>'
        prep='<p>Przed warsztatem: 90 min pracy własnej i 3 × 30 min w grupach (pitch, wymiana, feedback). Po warsztacie: 45 min wdrożenia i refleksji. Razem 390 min = 6,5 h. Coaching jest dodatkowy.</p>'
        write(f'downloads/karta-modul-{n}.html',print_shell(f'Moduł {n}. {m["title"]} — karta pracy',body))
        write(f'downloads/prowadzacy-modul-{n}.html',print_shell(f'Moduł {n} — scenariusz prowadzącego',prep+case+body+teacher))
        workbook.append(f'<section class="new-page"><h1>Moduł {n}. {e(m["title"])}</h1>{body}</section>')
        guide.append(f'<section class="new-page"><h1>Moduł {n}. {e(m["topic"])}</h1>{prep}{case}{body}{teacher}</section>')
    write('downloads/zeszyt-uczestnika.html',print_shell('Zeszyt uczestnika — osiem modułów',''.join(workbook)))
    write('downloads/podrecznik-prowadzacego.html',print_shell('Podręcznik prowadzącego',''.join(guide)))
    canvas=['Problem i obecne alternatywy','Segmenty i pierwsi klienci','Unikalna propozycja wartości','Rozwiązanie','Kanały dotarcia','Strumienie przychodów','Struktura kosztów','Kluczowe wskaźniki','Przewaga trudna do skopiowania']
    body='<p>Projekt: ____________________ Data: __________ Wersja: _____</p><p>Zacznij od problemu i klienta. Oznacz: F — fakt z dowodem, H — hipoteza. Wybierz hipotezę do testu. Układ jest autorską kartą ćwiczeniową; koncepcja Lean Canvas: Ash Maurya.</p><div class="canvas-grid">'+''.join(f'<section class="write-box"><h2>{i+1}. {e(t)}</h2><div class="write-lines"></div></section>' for i,t in enumerate(canvas))+'</div><h2>Najbardziej ryzykowna hipoteza i następny test</h2><div class="write-lines"></div>'
    write('downloads/lean-canvas.html',print_shell('Lean Canvas — karta modelu biznesowego',body))
    write('downloads/README.txt','Rozpakuj ZIP i otwórz index.html.\nDokumenty HTML: przycisk Drukuj / zapisz PDF.\nXLSX: edytuj B2 i B3:G9; pozostałe pola mają formuły.\nPrzy otwieraniu z dysku zapis lokalny zależy od przeglądarki. Eksportuj JSON.\nLinki zewnętrzne wymagają internetu.\nOryginalne MP4/DOCX/PPTX nie są dostępne w repozytorium ani pakiecie.\n')

def library():
    local=[('Zeszyt uczestnika','Osiem kart pracy w jednym dokumencie. Do druku lub zapisania jako PDF.','downloads/zeszyt-uczestnika.html'),('Podręcznik prowadzącego','Scenariusze, przykładowe rozwiązania i rubryki całego programu.','downloads/podrecznik-prowadzacego.html'),('Lean Canvas','Dziewięć pól modelu i wybór hipotezy do testu.','downloads/lean-canvas.html'),('Cash flow — arkusz XLSX','Sześć miesięcy, formuły sald, dane przykładowe i instrukcja.','downloads/cash-flow.xlsx'),('Cash flow — kalkulator','Wpisz kwoty, zobacz salda i pobierz CSV.','cash-flow.html'),('Pakiet offline','Moduły, karty, scenariusze i quizy. ZIP do rozpakowania.','downloads/pakiet-offline.zip')]
    cards=''.join(f'<article class="resource-card" data-library-item data-kind="download" data-modules="1 2 3 4 5 6 7 8"><span class="tag">Materiał własny</span><h3><a href="{url}" '+('download' if url.endswith(('.xlsx','.zip')) else '')+f'>{e(title)} ↗</a></h3><p>{e(desc)}</p></article>' for title,desc,url in local)
    cards+=''.join(f'<article class="resource-card" data-library-item data-kind="download" data-modules="{m["n"]}"><span class="tag">Moduł {m["n"]}</span><h3><a href="downloads/karta-modul-{m["n"]}.html">Karta: {e(m["topic"])} ↗</a></h3><p>{e(m["outcome"])}</p><a href="downloads/prowadzacy-modul-{m["n"]}.html">Scenariusz i odpowiedzi →</a></article>' for m in COURSE)
    cards+=''.join(resource(r) for r in RESOURCES)
    options=''.join(f'<option value="{m["n"]}">{m["n"]}. {e(m["topic"])}</option>' for m in COURSE)
    body=heading('MATERIAŁY POD RĘKĄ','Twoja biblioteka.','Karty pracy, gotowe scenariusze i polskie punkty odniesienia.')+f'<div class="library-filters"><label for="library-search">Szukaj w bibliotece<input type="search" id="library-search" placeholder="np. cash flow, GUS, marketing"></label><label for="library-module">Moduł<select id="library-module"><option value="">Wszystkie moduły</option>{options}</select></label><label for="library-kind">Rodzaj<select id="library-kind"><option value="">Wszystkie materiały</option><option value="download">Materiały własne</option><option value="source">Źródła zewnętrzne</option></select></label></div><p id="library-count" role="status"></p><div class="resource-grid" id="library-grid">{cards}</div><p class="notice section">Pełne opracowania są na stronach modułów. Serwis nie zawiera oryginalnych MP4, DOCX i PPTX wymienionych w opracowaniach — nie ma ich w repozytorium. Program możesz przejść z materiałami tekstowymi i ćwiczeniami dostępnymi tutaj. Kursy i pliki instytucji zewnętrznych pozostają w ich serwisach.</p>'
    write('biblioteka.html',shell('Biblioteka',body,'biblioteka.html'))

def project():
    sections=''.join(f'<details class="project-module" '+('open' if m['n']==1 else '')+f'><summary><span>{m["n"]:02d}</span>{e(m["topic"])}</summary><p>{e(m["outcome"])}</p>{fields(m,"project")}<a href="modul-{m["n"]}.html">Wróć do modułu →</a></details>' for m in COURSE)
    body=heading('TWÓJ WARSZTAT','Jeden projekt. Osiem perspektyw.','Zbierz ustalenia z całego programu. Wracaj do nich, gdy zmienia się pomysł, klient lub plan.')+f'''<section class="panel project-meta"><label for="project-name">Nazwa projektu<input id="project-name" data-note="project-name" maxlength="150" placeholder="np. Mobilny serwis rowerowy"></label><label for="project-description">Jedno zdanie o projekcie<textarea id="project-description" data-note="project-description" rows="2" placeholder="Komu i w czym pomagasz?"></textarea></label><span class="save-state" role="status">Zapis lokalny</span></section><section class="project-tools panel"><h2>Kopia Twojej pracy</h2><p>Notatki, ukończenia i wyniki zapisują się wyłącznie w tej przeglądarce. JSON przenosi projekt na inne urządzenie. Plik tekstowy pozwala przeczytać lub samodzielnie udostępnić ustalenia.</p><div class="actions"><button class="button" id="export-project">Eksportuj kopię (.json)</button><button class="button secondary" id="export-text">Pobierz notatki (.txt)</button><label class="button secondary" for="import-project">Wczytaj kopię<input class="file-input" type="file" id="import-project" accept=".json,application/json"></label><button class="text-button" id="print-project">Drukuj notatki</button></div><p id="project-message" role="status"></p><p class="small">Wczytanie kopii zastępuje projekt po potwierdzeniu. Nie przesyłamy plików na serwer.</p></section><section class="section">{sections}</section><details class="panel"><summary>Usuń dane tego programu z przeglądarki</summary><p>Najpierw pobierz kopię, jeśli chcesz zachować pracę.</p><button class="danger-button" id="reset-project">Usuń mój projekt lokalny</button></details>'''
    write('moj-projekt.html',shell('Mój projekt',body,'moj-projekt.html'))

def teacher():
    rows=''.join(f'<tr><td>{m["n"]:02d}</td><td><a href="modul-{m["n"]}.html#dla-prowadzacego">{e(m["topic"])}</a><br><span class="small">{e(m["outcome"])}</span></td><td><a href="downloads/karta-modul-{m["n"]}.html">Karta pracy ↗</a><br><a href="downloads/prowadzacy-modul-{m["n"]}.html">Scenariusz ↗</a></td></tr>' for m in COURSE)
    body=heading('PRZESTRZEŃ PROWADZĄCEGO','Mniej przygotowań. Więcej dobrej pracy.','Plan spotkania, ćwiczenia, materiały do druku i konkretna informacja zwrotna.')+f'''<div class="actions">{button('downloads/podrecznik-prowadzacego.html','Cały podręcznik do druku / PDF ↗')}{button('downloads/zeszyt-uczestnika.html','Zeszyt dla uczestnika ↗',True)}</div><section class="section two-col"><article class="panel"><p class="eyebrow">KONSTRUKCJA MODUŁU</p><h2>6,5 godziny, cztery etapy.</h2><ol class="steps"><li><strong>90 min</strong> — lektura, przykład, notatki.</li><li><strong>3 × 30 min</strong> — prezentacja, wymiana, feedback w grupach.</li><li><strong>165 min</strong> — warsztat z 15 min przerwy.</li><li><strong>45 min</strong> — wdrożenie i refleksja.</li></ol><p>Pełny cykl: 52 godziny. Dodatkowy coaching ustalasz poza serwisem.</p></article><article class="panel green"><p class="eyebrow">PRZED SPOTKANIEM</p><h2>Ustal wspólne zasady.</h2><ul class="checklist"><li>Wyślij moduł i kartę 3–5 dni wcześniej.</li><li>Ustal poufność i możliwość użycia fikcyjnego projektu.</li><li>Zapewnij wariant papierowy i pracę bez kont płatnych.</li><li>Przygotuj pary lub trójki.</li><li>Sprawdź bieżące źródła prawne, finansowe i ESG.</li></ul></article></section><section class="section"><p class="eyebrow">CAŁY PROGRAM</p><h2>Wybierz spotkanie.</h2><div class="tablewrap"><table><thead><tr><th>Moduł</th><th>Temat i rezultat</th><th>Materiały</th></tr></thead><tbody>{rows}</tbody></table></div></section><section class="section panel"><h2>Oceniaj pracę, wspieraj decyzję.</h2><p>Każdy moduł ma trzy kryteria: 0 — jeszcze nie, 1 — częściowo, 2 — konkretnie i spójnie. Wskaż mocny punkt i następny krok, bez certyfikacji.</p><p>Quiz jest formatywny. Uczestnik może poprawiać odpowiedzi. Serwis nie zbiera wyników grupy i nie udostępnia prowadzącemu notatek uczestników. Uczestnik sam decyduje o przekazaniu swoich ustaleń.</p><h3>Domknięcie cyklu</h3><p>Poproś o krótki pitch, kartę modelu, cash flow i plan na 30 dni. Nazwijcie zmianę względem startu, dowody i najważniejszą niewiadomą.</p></section>'''
    write('prowadzacy.html',shell('Dla prowadzącego',body,'prowadzacy.html',role='teacher'))

def archive_pages():
    for source,out in [('00_README_przeglad_programu.md','przeglad.html'),('09_Wdrozenie_i_rekrutacja.md','wdrozenie.html'),('10_Wyniki_przegladu.md','analiza.html')]:
        title,meta,body=split_front((SRC/source).read_text())
        text=heading('DOKUMENTACJA BAZOWA · ARCHIWUM',title,'Materiał referencyjny wcześniejszego opracowania.')+'<p class="notice">Zapis historyczny z przeglądu 23.09.2026. Wskazane braki szablonów uzupełniono w bieżącej bibliotece. Założenia pilotażu nie są wynikami realizacji.</p><article class="prose panel">'+md(body)+'</article>'
        write(out,shell(title,text,out))

def search_index():
    entries=[]
    for m in COURSE:
        raw=next(SRC.glob(f'{m["n"]:02d}_Modul*.md')).read_text()
        text=' '.join([m['subtitle'],m['outcome'],m['caseText']]+[t+' '+s for t,s in m['concepts']]+m['fields'])
        entries.append({'title':f'{m["n"]}. {m["topic"]}','url':f'modul-{m["n"]}.html','text':text+' '+re.sub('<[^>]+>',' ',raw),'type':'Moduł'})
    entries.extend({'title':r['title'],'url':r['url'],'text':r['publisher']+' '+r['description'],'type':'Źródło zewnętrzne'} for r in RESOURCES)
    entries.extend([{'title':'Kalkulator i arkusz cash flow','url':'cash-flow.html','text':'gotówka płynność saldo wpływy wydatki','type':'Narzędzie'},{'title':'Lean Canvas — karta modelu','url':'downloads/lean-canvas.html','text':'model biznesowy dziewięć pól hipoteza','type':'Karta pracy'},{'title':'Podręcznik prowadzącego','url':'prowadzacy.html','text':'scenariusze rubryki odpowiedzi druk','type':'Prowadzący'}])
    write('assets/search-index.js','window.COURSE_SEARCH = '+json.dumps(entries,ensure_ascii=False).replace('<','\\u003c')+';\n')
    data=[{'n':m['n'],'topic':m['topic'],'fields':m['fields'],'quiz':m['quiz']} for m in COURSE]
    write('assets/course-data.js','window.COURSE_DATA = '+json.dumps(data,ensure_ascii=False).replace('<','\\u003c')+';\n')

def package():
    paths=sorted(p for p in ROOT.rglob('*') if p.is_file() and (p.parent==ROOT and p.suffix=='.html' or p.parts[len(ROOT.parts)] in ('assets','downloads')) and p.suffix!='.zip')
    with zipfile.ZipFile(ROOT/'downloads/pakiet-offline.zip','w',zipfile.ZIP_DEFLATED) as z:
        for p in paths:
            info=zipfile.ZipInfo(str(p.relative_to(ROOT)),(2026,10,18,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED
            payload=p.read_bytes()
            if p.name=='biblioteka.html':
                payload=payload.replace('href="downloads/pakiet-offline.zip" download>Pakiet offline ↗'.encode(),'href="downloads/README.txt">Informacje o pakiecie offline ↗'.encode())
            z.writestr(info,payload)

def build():
    from product_extras import about, cash_flow
    assert sum(t for _,t in AGENDA)==165
    for m in COURSE: module_page(m)
    home();downloads();library();project();teacher();about();archive_pages();search_index();cash_flow();package()
    print(f'Gotowe: {len(COURSE)} modułów, {len(RESOURCES)} źródeł, karty, scenariusze, XLSX i pakiet offline.')
