"""Mapa efektów HAN.01/HAN.02 i katalog interaktywnych lekcji handlu (lekcje/)."""
import csv
import io
import json
from portal import SRC, COURSE, e, write, shell, heading, button, print_shell

CURRICULUM=json.loads((SRC/'curriculum.json').read_text())
# Katalog eksportuje lekcje-src (npm run build) z plików treści lekcji.
LESSONS=json.loads((SRC/'lekcje.json').read_text())
BY_ID={l['id']:l for l in LESSONS}
SOURCES={s['id']:s for s in CURRICULUM['sources']}
MAP=CURRICULUM['mappings']
PARTS={'A':'Sprzedaż (HAN.01)','B':'Działania handlowe (HAN.02)'}

def effect_code(row): return f'{row["unit"]}.{row["effect"]}'
def lesson_url(id,prefix=''): return f'{prefix}lekcje/index.html#/lekcja/{id}'
def plan_url(id,prefix=''): return f'{prefix}lekcje/index.html#/plan/{id}'
def qualifications(l): return sorted({u[:6] for u in l['han']})
def source_link(row):
    source=SOURCES[row['source']]
    pages=', '.join(map(str,row['pages']))
    return f'<a href="{e(source["url"])}#page={row["pages"][0]}" target="_blank" rel="noopener">PDF ORE, s. {pages} ↗</a>'

def module_bridge(n):
    rows=[r for r in MAP if n in r['modules']]
    ids=sorted({id for r in rows for id in r['lessons']})
    chips=' '.join(f'<a class="tag" href="szkola.html#{r["id"]}">{effect_code(r)}</a>' for r in rows)
    links=''.join(f'<li><a href="{lesson_url(id)}">{id}. {e(BY_ID[id]["title"])}</a> · {BY_ID[id]["duration"]} min</li>' for id in ids)
    return f'''<div class="school-bridge"><h3>Ten moduł na lekcji zawodowej</h3><p>Interaktywne lekcje 45/90 min powiązane z tym modułem. Każda działa w trybie samodzielnym i w trybie prowadzącego, z planem do druku.</p><div class="mapping-chips">{chips}</div><ul>{links}</ul><a href="szkola.html">Mapa podstawy programowej i wszystkie lekcje →</a></div>'''

def mapping_table(prefix=""):
    rows=[]
    for r in MAP:
        lessons=''.join(f'<a href="{lesson_url(id,prefix)}">{id}</a> ' for id in r['lessons'])
        modules=' '.join(f'<a href="{prefix}modul-{n}.html#dla-prowadzacego">M{n}</a>' for n in r['modules'])
        rows.append(f'''<tr id="{r['id']}" data-mapping data-qualification="{r['qualification']}" data-modules="{' '.join(map(str,r['modules']))}"><td><strong>{effect_code(r)}</strong><br><span class="small">Jednostka {r['unit']}<br>Efekt {r['effect']} · kryteria {', '.join(map(str,r['criteria']))}</span></td><td><strong>{e(r['summary'])}</strong><p>{e(r['criteriaSummary'])}</p><details><summary>Zakres i źródło</summary><p>{e(r['limit'])}</p><p>{source_link(r)}</p></details></td><td><span class="tag">{e(r['relation'])}</span><p class="small">Proponowany obszar: {e(r['subject'])}</p>{modules}<br>Lekcje: {lessons}</td></tr>''')
    return '<div class="tablewrap"><table class="mapping-table"><caption>Wybrane efekty i kryteria — autorskie opisy, numeracja według źródła MEN/ORE</caption><thead><tr><th>Efekt i kryteria</th><th>Zakres pracy</th><th>Moduły i lekcje</th></tr></thead><tbody>'+''.join(rows)+'</tbody></table></div>'

def coverage_table():
    rows=[]
    for q in CURRICULUM['qualifications']:
        for i,unit in enumerate(q['units'],1):
            code=f'{q["id"]}.{i}'
            ids=[l['id'] for l in LESSONS if code in l['han']]
            cell=', '.join(f'<a href="{lesson_url(id)}">{id}</a>' for id in ids) if ids else '<strong>brak lekcji</strong> — język obcy zawodowy realizuje szkoła osobno' if 'obcy' in unit else '<strong>brak lekcji</strong>'
            rows.append(f'<tr><td><strong>{code}</strong></td><td>{e(unit)}</td><td>{cell}</td></tr>')
    return '<div class="tablewrap"><table><caption>Pokrycie jednostek efektów kształcenia lekcjami</caption><thead><tr><th>Jednostka</th><th>Nazwa</th><th>Lekcje</th></tr></thead><tbody>'+''.join(rows)+'</tbody></table></div>'

def source_cards():
    return '<div class="resource-grid">'+''.join(f'<article class="resource-card"><span class="tag">{e(s["publisher"])}</span><h3><a href="{e(s["url"])}" target="_blank" rel="noopener">{e(s["title"])} ↗</a></h3><p>{e(s["edition"])}</p><p class="small">{e(s["status"])} Sprawdzenie: 18.10.2026.</p></article>' for s in SOURCES.values())+'</div>'

def lesson_card(l):
    quals=qualifications(l)
    return f'''<article class="resource-card" data-lesson="{l['id']}" data-qualifications="{' '.join(quals)}" data-minutes="{l['duration']}"><div class="resource-top"><span class="tag">{l['id']} · {l['duration']} min</span><span>{' / '.join(quals)}</span></div><h3><a href="{lesson_url(l['id'])}">{e(l['title'])} ↗</a></h3><p>{e(l['subtitle'])}</p><p class="small">Jednostki: {', '.join(l['han'])}</p><a href="{plan_url(l['id'])}">Plan dla prowadzącego ↗</a></article>'''

def school_page():
    qualifications_html=''
    for q in CURRICULUM['qualifications']:
        qualifications_html+=f'<article class="panel"><p class="eyebrow">{q["id"]}</p><h2>{e(q["name"])}</h2><p>{e(" · ".join(q["occupations"]))}</p><details><summary>Jednostki efektów kształcenia</summary><ol>'+''.join(f'<li><strong>{q["id"]}.{i+1}</strong> {e(unit)}</li>' for i,unit in enumerate(q['units']))+'</ol></details></article>'
    options=''.join(f'<option value="{n}">{n}. {e(m["topic"])}</option>' for n,m in enumerate(COURSE,1))
    extensions=''.join(f'<li><strong>{e(x["title"])}</strong> — {e(x["note"])}</li>' for x in CURRICULUM['extensions'])
    minutes=sum(l['duration'] for l in LESSONS)
    cards=''.join(f'<h3 class="part-title">{e(PARTS[p])}</h3><div class="resource-grid">'+''.join(lesson_card(l) for l in LESSONS if l['part']==p)+'</div>' for p in PARTS)
    body=heading('KSZTAŁCENIE ZAWODOWE · HAN.01 I HAN.02',f'{len(LESSONS)} lekcji handlu, mapa podstawy.','Interaktywne lekcje 45/90 min dla technikum, szkoły branżowej i dorosłych. Sprawdź powiązania z podstawą programową i wybierz temat.')+f'''<div class="actions">{button('lekcje/index.html','Otwórz lekcje ↗')}{button('downloads/mapa-han.csv','Pobierz mapę efektów CSV',True,'download')}</div><section class="section two-col">{qualifications_html}</section><section class="section panel"><h2>Jak działają lekcje.</h2><p>{len(LESSONS)} tematów, razem {minutes//45} lekcji po 45 minut. Każda lekcja ma etapy z czasem, krótkie wyjaśnienia, przykład rozwiązany krok po kroku, zadania z natychmiastową informacją zwrotną (także wypełnianie dokumentów handlowych i rozmowy z klientem) oraz kartę wyniku. W trybie „Prowadzę zajęcia” przy każdym etapie są notatki: co powiedzieć, o co zapytać, typowe błędy i klucz odpowiedzi; plan lekcji drukuje się na A4.</p><p>Lekcje można prowadzić w klasie albo przejść samodzielnie — także z dorosłymi, którzy otwierają sklep, przekwalifikowują się lub sprzedają przez internet. Odpowiedzi zapisują się w przeglądarce, bez kont i bez wysyłania danych.</p><p>Nazwy przedmiotów i kolejność dobiera szkoła w swoim programie nauczania. HAN.01 jest wspólna dla sprzedawcy, technika handlowca i technika księgarstwa; HAN.02 dotyczy technika handlowca.</p></section><section id="lekcje" class="section"><p class="eyebrow">KATALOG</p><h2>Wybierz lekcję 45 lub 90 minut.</h2><div class="lesson-filters"><label for="lesson-qualification">Kwalifikacja<select id="lesson-qualification"><option value="">Obie kwalifikacje</option><option value="HAN.01">HAN.01</option><option value="HAN.02">HAN.02</option></select></label><label for="lesson-minutes">Czas<select id="lesson-minutes"><option value="">45 i 90 min</option><option value="45">45 min</option><option value="90">90 min</option></select></label></div><p id="lesson-count" role="status"></p>{cards}</section><section id="pokrycie" class="section"><p class="eyebrow">POKRYCIE JEDNOSTEK</p><h2>Które jednostki mają lekcje.</h2><p>Przypisanie lekcji do jednostek jest autorskie, na poziomie jednostki. Szczegółowe odniesienia do efektów i kryteriów (tabela niżej) zweryfikowano w tekście podstawy dla wybranych lekcji; dla pozostałych wymagają jeszcze porównania z PDF MEN/ORE.</p>{coverage_table()}</section><section id="mapa" class="section"><p class="eyebrow">PUNKTY ODNIESIENIA</p><h2>Moduł → efekt → lekcja.</h2><p>{e(CURRICULUM['method'])}</p><p class="small">Zapis HAN.02.3.1 oznacza jednostkę HAN.02.3, efekt 1. Kryteria podajemy osobno. „Bezpośrednie” oznacza pracę nad wskazanymi kryteriami, nie realizację całego efektu lub kwalifikacji.</p><div class="library-filters"><label for="mapping-search">Szukaj efektu lub tematu<input id="mapping-search" type="search" placeholder="np. HAN.02.3, marketing, cena"></label><label for="mapping-qualification">Kwalifikacja<select id="mapping-qualification"><option value="">Obie kwalifikacje</option><option value="HAN.01">HAN.01</option><option value="HAN.02">HAN.02</option></select></label><label for="mapping-module">Moduł<select id="mapping-module"><option value="">Wszystkie moduły</option>{options}</select></label></div><p id="mapping-count" role="status"></p>{mapping_table()}</section><section class="section panel"><h2>Powiązanie nie oznacza pełnego pokrycia podstawy.</h2><p>Lekcje obejmują wybrane efekty. Nie zastępują pracy w programie magazynowo-sprzedażowym i na prawdziwej kasie, praktyk zawodowych ani języka obcego zawodowego. Wynik na karcie lekcji nie jest wynikiem egzaminu zawodowego.</p><h3>Narzędzia i rozszerzenia autorskie</h3><ul>{extensions}</ul></section><section class="section" id="zrodla-han"><p class="eyebrow">ŹRÓDŁA I WERSJA MAPY</p><h2>Sprawdź punkt odniesienia.</h2><p>Dokumenty MEN/ORE są podstawą numeracji. ZPE pomaga dobrać dodatkowe materiały. Informator CKE potwierdzono w katalogu; niedostępny pełny odczyt nie służył do szczegółowego mapowania.</p>{source_cards()}</section>'''
    write('szkola.html',shell('Lekcje HAN.01 i HAN.02',body,'szkola.html'))

def export_map():
    output=io.StringIO(newline='');writer=csv.writer(output,delimiter=';',lineterminator='\n')
    writer.writerow(['Kwalifikacja','Jednostka','Efekt','Kryteria','Skrót autorski','Opis kryteriów — skrót','Moduły','Lekcje','Proponowany przedmiot','Powiązanie','Zakres i ograniczenie','Źródło','Strony PDF od 1','Sprawdzenie'])
    for r in MAP:writer.writerow([r['qualification'],r['unit'],r['effect'],','.join(map(str,r['criteria'])),r['summary'],r['criteriaSummary'],','.join(map(str,r['modules'])),', '.join(f'{id} {BY_ID[id]["title"]}' for id in r['lessons']),r['subject'],r['relation'],r['limit'],SOURCES[r['source']]['url'],','.join(map(str,r['pages'])),'2026-10-18'])
    write('downloads/mapa-han.csv','﻿'+output.getvalue())
    write('downloads/mapa-han.html',print_shell('HAN.01 i HAN.02 — mapa odniesień','<p>'+e(CURRICULUM['method'])+'</p>'+mapping_table('../')))

def search_entries():
    result=[{'title':'HAN.01 i HAN.02 — mapa podstawy i lekcje','url':'szkola.html','type':'Kształcenie zawodowe','text':'kwalifikacje sprzedawca technik handlowiec marketing podstawa programowa kryteria przedmioty'}]
    for l in LESSONS:
        rows=[r for r in MAP if l['id'] in r['lessons']]
        text=' '.join([l['subtitle']]+l['tags']+l['han']+[effect_code(r)+' '+r['criteriaSummary'] for r in rows])
        result.append({'title':f'{l["id"]}. {l["title"]}','url':lesson_url(l['id']),'type':f'Lekcja {l["duration"]} min','text':text})
    return result

def build_school():
    school_page();export_map()
