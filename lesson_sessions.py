"""Samodzielne lekcje: formularze, testy i lokalne karty oceny."""
import hashlib
import json
from portal import SRC, e, write, heading, shell, button

ASSESSMENTS=json.loads((SRC/'assessments.json').read_text())

def definitions():
    from school import LESSONS, MAP, effect_code
    result=[]
    for lesson in LESSONS:
        item={key:lesson[key] for key in ['id','title','minutes','worksheet','exit','rubric','goal','tasks']}
        item['context']=lesson['input']
        item['questions']=ASSESSMENTS[lesson['id']]
        item['references']=[effect_code(r)+' — kryteria '+', '.join(map(str,r['criteria'])) for r in MAP if lesson['id'] in r['lessons']]
        item['version']=hashlib.sha256(json.dumps(item,sort_keys=True,ensure_ascii=False).encode()).hexdigest()[:12]
        result.append(item)
    return result

def session_section(lesson):
    id=lesson['id'];questions=[]
    for index,q in enumerate(ASSESSMENTS[id]):
        if q['type']=='choice':
            answers=''.join(f'<label class="quiz-option" for="{id}-q{index}-{j}"><input id="{id}-q{index}-{j}" type="radio" name="{id}-q{index}" value="{j}" data-lesson-answer="{index}"><span>{e(option)}</span></label>' for j,option in enumerate(q['options']))
        else:
            answers=f'<label class="number-answer" for="{id}-q{index}"><span>Twoja odpowiedź {e(q["unit"])}</span><input id="{id}-q{index}" type="text" inputmode="decimal" maxlength="100" data-lesson-answer="{index}" placeholder="Wpisz liczbę, np. 1,5"></label>'
        questions.append(f'<fieldset class="lesson-question"><legend><span>{index+1:02d} / 2 pkt</span> {e(q["prompt"])}</legend>{answers}</fieldset>')
    work=''.join(f'<label for="{id}-work-{i}"><span>{i+1:02d}. {e(label)}</span><textarea id="{id}-work-{i}" rows="5" maxlength="3000" data-lesson-work="{i}" placeholder="Wykonaj zadanie tutaj…"></textarea></label>' for i,label in enumerate(lesson['worksheet']))
    rubric=''.join(f'<label for="rubric-{i}"><span>{e(label)}</span><select id="rubric-{i}" data-rubric="{i}"><option value="">Jeszcze nie oceniono</option><option value="0">0 — jeszcze nie</option><option value="1">1 — częściowo</option><option value="2">2 — konkretnie i poprawnie</option></select></label>' for i,label in enumerate(lesson['rubric']))
    tasks=''.join(f'<li>{e(task)}</li>' for task in lesson['tasks'])
    return f'''<section id="sesja" data-lesson-session="{id}"><div class="session-toolbar panel"><div class="session-heading"><div><p class="eyebrow">TWOJA SESJA · {lesson['minutes']} MINUT</p><h2>Lekcja z wynikiem.</h2></div><div class="lesson-clock"><span>Pozostały czas</span><output id="lesson-timer" role="timer" aria-live="off">{lesson['minutes']}:00</output></div></div><p>Przeczytaj dane, wykonaj pracę i rozwiąż 5 pytań. Test daje do 10 punktów. Pracę praktyczną prowadzący ocenia osobno: do 6 punktów. Karta pokaże oba wyniki.</p><label for="lesson-participant">Imię lub identyfikator pracy (opcjonalnie)<input id="lesson-participant" maxlength="100" autocomplete="off" placeholder="np. uczeń 07 / grupa B"></label><div class="actions"><button type="button" class="button" id="lesson-start">Rozpocznij lekcję</button><button type="button" class="button secondary" id="lesson-pause" hidden>Wstrzymaj</button><button type="button" class="button secondary" id="lesson-finish" disabled>Zakończ i wygeneruj kartę</button><button type="button" class="text-button" id="lesson-backup">Pobierz kopię nauki (.json)</button></div><p id="lesson-session-message" role="status">Wyniki i praca zapisują się na tym urządzeniu. Rozpocznij, aby wypełniać odpowiedzi.</p><p class="small">Możesz wstrzymać czas albo zakończyć wcześniej. Po upływie czasu aktywna sesja kończy się automatycznie; brak odpowiedzi w teście daje 0 punktów. Gdy karta jest zamknięta, upływ czasu zostanie uwzględniony po powrocie. To lekcja, bez nadzoru egzaminacyjnego. <a href="moj-projekt.html">Wczytaj kopię lub zarządzaj danymi →</a></p></div>
<section class="section prose panel" id="dane-lekcji"><p class="eyebrow">01 / POZNAJ ZADANIE</p><h2>Dane do Twojej pracy.</h2><p><strong>Przygotowanie:</strong> {e(lesson['prerequisites'])}</p><p>{e(lesson['input'])}</p><h3>Co wykonujesz?</h3><ol>{tasks}</ol></section><form id="lesson-work-form"><fieldset id="lesson-inputs" disabled><legend class="sr-only">Praca i test lekcji {id}</legend><section class="section panel"><p class="eyebrow">02 / WYKONAJ PRACĘ</p><h2>Twoje rozwiązanie.</h2><p>Odpowiedzi są zapisywane na bieżąco. Nie wpisuj danych klientów i informacji poufnych. Każde pole mieści do 3000 znaków.</p><div class="workbook-fields lesson-work-fields">{work}</div><label class="lesson-exit" for="{id}-exit"><span>Bilet wyjścia: {e(lesson['exit'])}</span><textarea id="{id}-exit" data-lesson-work="4" maxlength="3000" rows="3" placeholder="Zapisz krótki wniosek…"></textarea></label></section><section class="section"><p class="eyebrow">03 / SPRAWDŹ ROZUMIENIE</p><h2>Test końcowy · 10 punktów.</h2><p>Pięć pytań, po 2 punkty. W zadaniach liczbowych możesz użyć przecinka lub kropki. Wyjaśnienia poznasz na karcie po zakończeniu sesji.</p><div class="quiz lesson-test">{''.join(questions)}</div></section></fieldset></form><div class="session-finish-panel"><p>Zapisz wynik, kiedy skończysz pracę i test. Przy upływie czasu karta powstanie automatycznie.</p><button type="button" class="button" id="lesson-finish-bottom" disabled>Zakończ lekcję i zobacz kartę</button></div>
<section id="karta-oceny" class="section" hidden><p class="eyebrow">04 / TWÓJ WYNIK I INFORMACJA ZWROTNA</p><div id="lesson-report"></div><div class="actions"><button type="button" class="button" id="lesson-print">Drukuj kartę / zapisz PDF</button><button type="button" class="button secondary" id="lesson-html">Pobierz kartę (.html)</button><a class="button secondary" href="wyniki-lekcji.html">Wszystkie wyniki lekcji →</a></div><form id="lesson-review-form" class="teacher-content panel green section"><p class="eyebrow">OCENA PRAKTYCZNA · WPIS RĘCZNY</p><h2>Uzupełnij kartę pracy.</h2><p>Oceń rozwiązanie według kryteriów. Test jest liczony automatycznie; punkty za treść i jakość pracy wymagają oceny człowieka. Dopóki nie wpiszesz wszystkich trzech ocen, karta pokazuje „oczekuje oceny” zamiast wyniku łącznego.</p><div class="review-rubric">{rubric}</div><label for="lesson-reviewer">Osoba oceniająca (opcjonalnie)<input id="lesson-reviewer" maxlength="100" autocomplete="off"></label><label for="lesson-review-comment">Informacja zwrotna i następny krok<textarea id="lesson-review-comment" maxlength="2000" rows="3"></textarea></label><button type="submit" class="button">Zapisz ocenę pracy</button><p id="lesson-review-message" role="status"></p></form></section><section class="section panel"><h2>Historia tej lekcji.</h2><p class="small">Zachowujemy trzy ostatnie zakończone próby i jedną bieżącą sesję każdej lekcji. Przed kolejnymi próbami możesz pobrać kopię. Zmiana urządzenia lub usunięcie danych przeglądarki nie przenosi wyników automatycznie.</p><div id="lesson-history"></div></section></section>'''

def results_page():
    body=heading('TWOJA NAUKA NA TYM URZĄDZENIU','Wyniki, do których możesz wrócić.','Zapisane prace, testy i karty oceny. Wznów lekcję albo otwórz zakończoną próbę.')+'''<div class="actions"><a class="button" href="szkola.html#lekcje">Wybierz lekcję ↗</a><button type="button" class="button secondary" id="results-backup">Pobierz kopię nauki (.json)</button><a class="button secondary" href="moj-projekt.html">Wczytaj kopię / zarządzaj danymi</a></div><p class="notice">Wynik automatyczny dotyczy testu. Ocena praktyczna jest wpisem ręcznym. Karty mają charakter dydaktyczny; nie są świadectwem ani wynikiem egzaminu CKE. Oba widoki serwisu są publiczne, więc zapis nie potwierdza tożsamości osoby oceniającej.</p><section class="section" id="lesson-results-list" aria-label="Zapisane sesje i wyniki"></section>'''
    write('wyniki-lekcji.html',shell('Wyniki lekcji',body,'wyniki-lekcji.html'))

def build_sessions():
    data=definitions()
    write('assets/lesson-data.js','window.LESSON_DATA = '+json.dumps(data,ensure_ascii=False).replace('<','\\u003c')+';\n')
    results_page()
