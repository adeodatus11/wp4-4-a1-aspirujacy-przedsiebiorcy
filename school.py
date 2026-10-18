"""Mapa efektów HAN.01/HAN.02 i autorskie materiały do zwykłych lekcji."""
import csv
import io
import json
from portal import SRC, ROOT, COURSE, e, write, shell, heading, button, print_shell

CURRICULUM=json.loads((SRC/'curriculum.json').read_text())
LESSONS=json.loads((SRC/'lessons.json').read_text())
SOURCES={s['id']:s for s in CURRICULUM['sources']}
MAP=CURRICULUM['mappings']

def effect_code(row): return f'{row["unit"]}.{row["effect"]}'
def lesson_url(id): return f'lekcja-han-{int(id[1:]):02d}.html'
def source_link(row):
    source=SOURCES[row['source']]
    pages=', '.join(map(str,row['pages']))
    return f'<a href="{e(source["url"])}#page={row["pages"][0]}" target="_blank" rel="noopener">PDF ORE, s. {pages} ↗</a>'

def mapping_detail(row):
    criteria=', '.join(map(str,row['criteria']))
    return f'''<p><strong>{effect_code(row)}</strong> · kryteria {criteria}<br>{e(row['summary'])}</p><p class="small">Wybrane kryteria — skrót autorski: {e(row['criteriaSummary'])}</p><p class="small"><strong>Zakres powiązania:</strong> {e(row['relation'])}. {e(row['limit'])}</p><p class="small">{source_link(row)}. Numeracja stron pliku od 1.</p>'''

def module_bridge(n):
    rows=[r for r in MAP if n in r['modules']]
    lessons=[l for l in LESSONS if n in l['modules']]
    chips=' '.join(f'<a class="tag" href="szkola.html#{r["id"]}">{effect_code(r)}</a>' for r in rows)
    links=''.join(f'<li><a href="{lesson_url(l["id"])}">{e(l["title"])}</a> · {l["minutes"]} min</li>' for l in lessons)
    return f'''<div class="school-bridge"><h3>Ten moduł na lekcji zawodowej</h3><p>Wybierz materiał 45/90 min dla HAN.01 lub HAN.02. To adaptacja wybranych efektów; sprawdź kryteria i zakres powiązania.</p><div class="mapping-chips">{chips}</div><ul>{links}</ul><a href="szkola.html">Mapa podstawy programowej i cały pakiet →</a></div>'''

def mapping_table(prefix=""):
    rows=[]
    for r in MAP:
        lessons=''.join(f'<a href="{prefix}{lesson_url(id)}">{id}</a> ' for id in r['lessons'])
        modules=' '.join(f'<a href="{prefix}modul-{n}.html#dla-prowadzacego">M{n}</a>' for n in r['modules'])
        rows.append(f'''<tr id="{r['id']}" data-mapping data-qualification="{r['qualification']}" data-modules="{' '.join(map(str,r['modules']))}"><td><strong>{effect_code(r)}</strong><br><span class="small">Jednostka {r['unit']}<br>Efekt {r['effect']} · kryteria {', '.join(map(str,r['criteria']))}</span></td><td><strong>{e(r['summary'])}</strong><p>{e(r['criteriaSummary'])}</p><details><summary>Zakres i źródło</summary><p>{e(r['limit'])}</p><p>{source_link(r)}</p></details></td><td><span class="tag">{e(r['relation'])}</span><p class="small">Proponowany obszar: {e(r['subject'])}</p>{modules}<br>{lessons}</td></tr>''')
    return '<div class="tablewrap"><table class="mapping-table"><caption>Wybrane efekty i kryteria — autorskie opisy, numeracja według źródła MEN/ORE</caption><thead><tr><th>Efekt i kryteria</th><th>Zakres pracy</th><th>Moduły i lekcje</th></tr></thead><tbody>'+''.join(rows)+'</tbody></table></div>'

def source_cards():
    return '<div class="resource-grid">'+''.join(f'<article class="resource-card"><span class="tag">{e(s["publisher"])}</span><h3><a href="{e(s["url"])}" target="_blank" rel="noopener">{e(s["title"])} ↗</a></h3><p>{e(s["edition"])}</p><p class="small">{e(s["status"])} Sprawdzenie: 18.10.2026.</p></article>' for s in SOURCES.values())+'</div>'

def lesson_card(l):
    quals=sorted({r['qualification'] for r in MAP if l['id'] in r['lessons']})
    return f'''<article class="resource-card" data-lesson="{l['id']}" data-qualifications="{' '.join(quals)}" data-minutes="{l['minutes']}"><div class="resource-top"><span class="tag">{l['id']} · {l['minutes']} min</span><span>{' / '.join(quals)}</span></div><h3><a href="{lesson_url(l['id'])}">{e(l['title'])} ↗</a></h3><p>{e(l['goal'])}</p><p class="small">Proponowane przedmioty: {e(' / '.join(l['subjects']))}</p><p class="small">Moduły: {', '.join('M'+str(n) for n in l['modules'])}</p><a href="downloads/han-{l['id'].lower()}-uczen.html">Karta ucznia ↗</a> · <a href="downloads/han-{l['id'].lower()}-nauczyciel.html">Scenariusz i odpowiedzi ↗</a></article>'''

def school_page():
    qualifications=''
    for q in CURRICULUM['qualifications']:
        qualifications+=f'<article class="panel"><p class="eyebrow">{q["id"]}</p><h2>{e(q["name"])}</h2><p>{e(" · ".join(q["occupations"]))}</p><details><summary>Jednostki efektów kształcenia</summary><ol>'+''.join(f'<li><strong>{q["id"]}.{i+1}</strong> {e(unit)}</li>' for i,unit in enumerate(q['units']))+'</ol></details></article>'
    options=''.join(f'<option value="{n}">{n}. {e(m["topic"])}</option>' for n,m in enumerate(COURSE,1))
    extensions=''.join(f'<li><strong>{e(x["title"])}</strong> — {e(x["note"])}</li>' for x in CURRICULUM['extensions'])
    body=heading('WARSZTAT PROWADZĄCEGO · KSZTAŁCENIE ZAWODOWE','Z programu do zwykłej lekcji.','HAN.01 i HAN.02: sprawdź powiązania z podstawą, wybierz temat i wejdź na lekcję z kartą ucznia oraz scenariuszem.')+f'''<div class="actions">{button('wyniki-lekcji.html','Moje wyniki lekcji ↗')}{button('downloads/lekcje-han-uczen.html','Cały zeszyt ucznia do druku ↗')}{button('downloads/lekcje-han-nauczyciel.html','Cały pakiet nauczyciela ↗',True)}{button('downloads/mapa-han.csv','Pobierz mapę efektów CSV',True,'download')}</div><section class="section two-col">{qualifications}</section><section class="section panel"><h2>Jedna baza, dwa sposoby wykorzystania.</h2><p>Program przedsiębiorczości pozostaje pełnym cyklem 52 godzin. Poniższe materiały to niezależne adaptacje do zwykłych zajęć: 10 tematów, łącznie 13 lekcji po 45 minut (585 min). Możesz wybrać pojedynczy temat; nie dodawaj automatycznie tego wymiaru do programu modułowego.</p><p>Nazwy przedmiotów są propozycją dopasowania do szkolnego programu nauczania, a nie listą narzuconą podstawą. Dobierz klasę, kolejność i ocenianie do przygotowania uczniów oraz programu obowiązującego w szkole.</p><p>HAN.01 jest wspólna dla sprzedawcy, technika handlowca i technika księgarstwa. Technik księgarstwa ma także HAN.03; ta dodatkowa kwalifikacja nie została tu szczegółowo zmapowana. HAN.02 odnosi się do technika handlowca.</p></section><section id="lekcje" class="section"><p class="eyebrow">GOTOWE DO WYKORZYSTANIA</p><h2>Wybierz lekcję 45 lub 90 minut.</h2><p>Każda lekcja ma zadania online, test i końcową kartę wyniku. Pracę i postęp zapisujesz lokalnie w przeglądarce. Nie trzeba zakładać firmy, kontaktować się z klientami ani używać płatnych narzędzi.</p><div class="lesson-filters"><label for="lesson-qualification">Kwalifikacja<select id="lesson-qualification"><option value="">Obie kwalifikacje</option><option value="HAN.01">HAN.01</option><option value="HAN.02">HAN.02</option></select></label><label for="lesson-minutes">Czas<select id="lesson-minutes"><option value="">45 i 90 min</option><option value="45">45 min</option><option value="90">90 min</option></select></label></div><p id="lesson-count" role="status"></p><div class="resource-grid">{''.join(lesson_card(l) for l in LESSONS)}</div></section><section id="mapa" class="section"><p class="eyebrow">PUNKTY ODNIESIENIA</p><h2>Moduł → efekt → materiał lekcyjny.</h2><p>{e(CURRICULUM['method'])}</p><p class="small">Zapis HAN.02.3.1 oznacza jednostkę HAN.02.3, efekt 1. Kryteria podajemy osobno. „Bezpośrednie” oznacza pracę nad wskazanymi kryteriami, nie realizację całego efektu lub kwalifikacji.</p><div class="library-filters"><label for="mapping-search">Szukaj efektu lub tematu<input id="mapping-search" type="search" placeholder="np. HAN.02.3, marketing, cena"></label><label for="mapping-qualification">Kwalifikacja<select id="mapping-qualification"><option value="">Obie kwalifikacje</option><option value="HAN.01">HAN.01</option><option value="HAN.02">HAN.02</option></select></label><label for="mapping-module">Moduł<select id="mapping-module"><option value="">Wszystkie moduły</option>{options}</select></label></div><p id="mapping-count" role="status"></p>{mapping_table()}</section><section class="section panel"><h2>Powiązanie nie oznacza pełnego pokrycia podstawy.</h2><p>Pakiet obejmuje wybrane efekty. Nie zastępuje praktycznej obsługi kasy i systemu sprzedażowego, przyjmowania dostaw, pełnej gospodarki magazynowej, dokumentacji i ewidencji księgowej, całego BHP, języka obcego zawodowego ani pozostałych wymagań kwalifikacji. Ukończenie modułu i quiz nie są potwierdzeniem osiągnięcia wszystkich efektów ani zdania egzaminu.</p><h3>Narzędzia i rozszerzenia autorskie</h3><ul>{extensions}</ul><p>W arkuszu oceny stosujemy własną rubrykę: 0 — jeszcze nie, 1 — częściowo, 2 — konkretnie i poprawnie. Nie jest to skala egzaminacyjna CKE ani automatyczna ocena szkolna.</p></section><section class="section" id="zrodla-han"><p class="eyebrow">ŹRÓDŁA I WERSJA MAPY</p><h2>Sprawdź punkt odniesienia.</h2><p>Dokumenty MEN/ORE są podstawą numeracji. ZPE pomaga dobrać dodatkowe materiały. Informator CKE potwierdzono w katalogu; niedostępny pełny odczyt nie służył do szczegółowego mapowania.</p>{source_cards()}</section>'''
    write('szkola.html',shell('Lekcje HAN.01 i HAN.02',body,'szkola.html'))

def student_body(l):
    tasks=''.join(f'<li>{e(t)}</li>' for t in l['tasks'])
    boxes=''.join(f'<section class="write-box"><h2>{i+1}. {e(t)}</h2><div class="write-lines"></div></section>' for i,t in enumerate(l['worksheet']))
    return f'<p><strong>Cel:</strong> {e(l["goal"])}</p><p><strong>Czas:</strong> {l["minutes"]} min. Projekt / osoba: ___________________ Data: __________</p><h2>Dane zadania — fikcyjne</h2><p>{e(l["input"])}</p><h2>Twoja praca</h2><ol>{tasks}</ol>{boxes}<h2>Bilet wyjścia</h2><p>{e(l["exit"])}</p><div class="write-lines"></div>'

def teacher_body(l):
    rows=[r for r in MAP if l['id'] in r['lessons']]
    return f'<h2>Scenariusz — {l["minutes"]} minut</h2><p>Przy 90 min są to dwie lekcje po 45 min. Przerwa między lekcjami według planu szkoły, poza podanym czasem pracy.</p><p><strong>Przygotowanie ucznia:</strong> {e(l["prerequisites"])}</p><p><strong>Materiały i organizacja:</strong> {e(l["materials"])}</p><ol class="steps">'+''.join(f'<li><strong>{t} min</strong> — {e(label)}</li>' for t,label in l['agenda'])+f'</ol><h2>Przykładowe rozwiązanie i omówienie</h2><p>{e(l["answer"])}</p><h2>Kryteria informacji zwrotnej</h2><p>Autorska rubryka: 0 — jeszcze nie, 1 — częściowo, 2 — konkretnie i poprawnie. Bez automatycznej oceny lub progu egzaminacyjnego.</p><ul>'+''.join(f'<li>{e(r)}</li>' for r in l['rubric'])+f'</ul><h3>Wsparcie</h3><p>{e(l["support"])}</p><h3>Rozszerzenie dla chętnych</h3><p>{e(l["extension"])}</p><h2>Podstawa i zakres powiązania</h2><p>Opisy poniżej są skrótami autorskimi. Kryteria i źródła wskazują zakres pracy; nie oznaczają pełnego pokrycia kwalifikacji.</p>'+''.join(mapping_detail(r) for r in rows)

def lesson_page(l):
    from lesson_sessions import session_section
    n=int(l['id'][1:]);rows=[r for r in MAP if l['id'] in r['lessons']]
    qualifications=' / '.join(sorted({r['qualification'] for r in rows}))
    codes=' · '.join(effect_code(r) for r in rows)
    modules=''.join(button(f'modul-{m}.html',f'Moduł {m}: {COURSE[m-1]["topic"]}',True) for m in l['modules'])
    student=student_body(l)
    body=heading(f'{l["id"]} · LEKCJA ZAWODOWA · {l["minutes"]} MIN',l['title'],l['goal'])+f'''<div class="pills"><span>{l['minutes']//45} × 45 min</span><span>{qualifications}</span><span>Praca na fikcyjnych danych</span></div><p class="small">Proponowane przedmioty: {e(' / '.join(l['subjects']))}. Dobór do szkolnego programu ustala nauczyciel.</p><div class="actions">{button('#sesja','Przejdź do sesji lekcyjnej ↓')}{button(f'downloads/han-{l["id"].lower()}-uczen.html','Karta papierowa ↗',True)}{button('szkola.html#lekcje','Wszystkie lekcje',True)}</div>{session_section(l)}<section class="section teacher-content panel green"><p class="eyebrow">DLA PROWADZĄCEGO</p>{teacher_body(l)}<div class="actions">{button(f'downloads/han-{l["id"].lower()}-nauczyciel.html','Scenariusz i odpowiedzi do druku ↗',True)}</div></section><section class="section"><h2>Wróć do pełnych modułów.</h2><div class="actions">{modules}</div><p class="small">Powiązania: {e(codes)}. <a href="szkola.html#mapa">Sprawdź pełną mapę i ograniczenia →</a></p></section>'''
    write(lesson_url(l['id']),shell(l['title'],body,'szkola.html'))
    write(f'downloads/han-{l["id"].lower()}-uczen.html',print_shell(f'{l["id"]}. {l["title"]} — karta ucznia',student))
    write(f'downloads/han-{l["id"].lower()}-nauczyciel.html',print_shell(f'{l["id"]}. {l["title"]} — scenariusz nauczyciela',student+teacher_body(l)))

def rewrite_worksheet(text):
    # Pola do wypełnienia są na osobnej karcie do druku; strona daje instrukcję.
    import re
    return re.sub(r'<div class="write-lines"></div>','<p class="small">Zapisz odpowiedź na karcie pracy lub we własnych notatkach.</p>',text)

def export_map():
    output=io.StringIO(newline='');writer=csv.writer(output,delimiter=';',lineterminator='\n')
    writer.writerow(['Kwalifikacja','Jednostka','Efekt','Kryteria','Skrót autorski','Opis kryteriów — skrót','Moduły','Lekcje','Proponowany przedmiot','Powiązanie','Zakres i ograniczenie','Źródło','Strony PDF od 1','Sprawdzenie'])
    for r in MAP:writer.writerow([r['qualification'],r['unit'],r['effect'],','.join(map(str,r['criteria'])),r['summary'],r['criteriaSummary'],','.join(map(str,r['modules'])),','.join(r['lessons']),r['subject'],r['relation'],r['limit'],SOURCES[r['source']]['url'],','.join(map(str,r['pages'])),'2026-10-18'])
    write('downloads/mapa-han.csv','\ufeff'+output.getvalue())
    write('downloads/mapa-han.html',print_shell('HAN.01 i HAN.02 — mapa odniesień','<p>'+e(CURRICULUM['method'])+'</p>'+mapping_table('../')))

def search_entries():
    result=[{'title':'HAN.01 i HAN.02 — mapa podstawy i lekcje','url':'szkola.html','type':'Kształcenie zawodowe','text':'kwalifikacje sprzedawca technik handlowiec marketing podstawa programowa kryteria przedmioty'}]
    for l in LESSONS:
        rows=[r for r in MAP if l['id'] in r['lessons']]
        text=' '.join([l['goal'],l['input']]+l['subjects']+[effect_code(r)+' '+r['criteriaSummary'] for r in rows])
        result.append({'title':l['title'],'url':lesson_url(l['id']),'type':f'Lekcja {l["minutes"]} min','text':text})
    return result

def build_school():
    school_page();export_map()
    for l in LESSONS:lesson_page(l)
    student=''.join(f'<section class="new-page"><h1>{l["id"]}. {e(l["title"])}</h1>{student_body(l)}</section>' for l in LESSONS)
    teacher=''.join(f'<section class="new-page"><h1>{l["id"]}. {e(l["title"])}</h1>{student_body(l)}{teacher_body(l)}</section>' for l in LESSONS)
    write('downloads/lekcje-han-uczen.html',print_shell('HAN.01 / HAN.02 — zeszyt ucznia',student))
    write('downloads/lekcje-han-nauczyciel.html',print_shell('HAN.01 / HAN.02 — pakiet nauczyciela',teacher))
