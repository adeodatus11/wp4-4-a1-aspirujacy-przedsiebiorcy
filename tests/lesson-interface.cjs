'use strict';
const assert=require('node:assert/strict');
const {open,event,memory}=require('./interface.cjs');
const key='pracownia-project-v1';
const state=()=>JSON.parse(memory.get(key));
function input(page,selector,value,type='input'){const el=page.$(selector);el.value=value;event(page,el,type);}
function click(page,id){event(page,page.$(id),'click');}
function start(file='lekcja-han-05.html'){const page=open(file);input(page,'#lesson-participant','uczeń 07');click(page,'#lesson-start');return page;}
function answerCorrectly(page){
  const id=page.$('[data-lesson-session]').dataset.lessonSession;
  const a=state().lessons[id].active;
  a.definition.questions.forEach((q,i)=>{
    if(q.type==='choice'){const el=page.$(`[data-lesson-answer="${i}"][value="${q.correct}"]`);el.checked=true;event(page,el,'change');}
    else input(page,`[data-lesson-answer="${i}"]`,String(q.expected).replace('.',','));
  });
}
async function run(){
  memory.clear();let page=start();assert.equal(page.$('#lesson-inputs').disabled,false);
  input(page,'[data-lesson-work="0"]','Moje obliczenie: 80 × 1,25 = 100');answerCorrectly(page);
  page.advance(60000);assert.match(page.$('#lesson-timer').textContent,/44:00/);
  page=open('lekcja-han-05.html',{now:2000000060000});assert.match(page.$('#lesson-timer').textContent,/44:00/);assert.match(page.$('[data-lesson-work="0"]').value,/Moje obliczenie/);
  click(page,'#lesson-pause');page.advance(600000);assert.match(page.$('#lesson-timer').textContent,/44:00/);assert.equal(page.$('#lesson-inputs').disabled,true);
  click(page,'#lesson-pause');page.advance(60000);assert.match(page.$('#lesson-timer').textContent,/43:00/);
  click(page,'#lesson-finish');assert.equal(page.$('#karta-oceny').hidden,false);assert.match(page.$('#lesson-report').textContent,/10\/10/);assert.match(page.$('#lesson-report').textContent,/Oczekuje oceny/);
  assert.equal(state().lessons.L05.history[0].spentMs,120000);
  console.log('OK: sesja, zapis pracy/testu, odświeżenie, pauza, wznowienie i karta.');
  input(page,'#role-select','teacher','change');
  for(let i=0;i<3;i++)input(page,`[data-rubric="${i}"]`,'2','change');
  input(page,'#lesson-review-comment','Popraw rozróżnienie marży i narzutu.');event(page,page.$('#lesson-review-form'),'submit');
  assert.match(page.$('#lesson-report').textContent,/16\/16/);
  const attempt=state().lessons.L05.history[0];page=open('lekcja-han-05.html',{search:'?proba='+attempt.id});assert.match(page.$('#lesson-report').textContent,/16\/16/);assert.match(page.$('#lesson-report').textContent,/Popraw rozróżnienie/);
  click(page,'#lesson-html');const card=await page.downloads.at(-1).text();assert.match(card,/16\/16/);assert.match(card,/Moje obliczenie/);assert.ok(!card.includes('<script'));
  const results=open('wyniki-lekcji.html');assert.match(results.$('#lesson-results-list').textContent,/16\/16/);
  console.log('OK: ocena praktyczna, utrwalenie karty, samodzielny HTML i widok wyników.');
  click(page,'#lesson-start');input(page,'[data-lesson-work="0"]','<img src=x onerror=alert(1)>');click(page,'#lesson-finish');
  assert.equal(page.$$('#lesson-report img').length,0);assert.match(page.$('#lesson-report').textContent,/<img/);assert.equal(state().lessons.L05.history.length,2);
  assert.equal(state().lessons.L05.history[0].review.scores[0],2);
  console.log('OK: nowa próba zachowuje starszą ocenę i nie wykonuje HTML z pracy.');
  page=start('lekcja-han-01.html');input(page,'[data-lesson-work="0"]','Zapis przed końcem');page.advance(45*60000+1000);
  assert.equal(state().lessons.L01.active,null);assert.equal(state().lessons.L01.history[0].finishReason,'time');assert.match(page.$('#lesson-report').textContent,/0\/10/);assert.match(page.$('#lesson-report').textContent,/Zapis przed końcem/);
  console.log('OK: automatyczne zakończenie z częściową pracą i niepełnym testem.');
  page=start('lekcja-han-03.html');input(page,'[data-lesson-work="0"]','Praca przed zamknięciem');
  page=open('lekcja-han-03.html',{now:2000000000000+46*60000});assert.equal(state().lessons.L03.active,null);assert.match(page.$('#lesson-report').textContent,/Praca przed zamknięciem/);
  console.log('OK: upływ czasu po zamknięciu karty i automatyczna karta po powrocie.');
  page=start('lekcja-han-02.html');page.advance(20000);click(page,'#lesson-backup');const backup=JSON.parse(await page.downloads.at(-1).text());assert.equal(backup.lessons.L02.active.status,'paused');assert.equal(state().lessons.L02.active.status,'running');
  const project=open('moj-projekt.html');const imported=project.$('#import-project');imported.files=[{size:1000,text:async()=>JSON.stringify(backup)}];event(project,imported,'change');await new Promise(resolve=>setTimeout(resolve,5));
  page=open('lekcja-han-02.html',{now:2000000800000});assert.equal(state().lessons.L02.active.status,'paused');assert.match(page.$('#lesson-timer').textContent,/89:40/);
  console.log('OK: przeniesienie kopii sesji zatrzymuje czas w kopii i nie zmienia pracy źródłowej.');
  page=start('lekcja-han-04.html');const older=state();older.lessons.L04.active.definition.version='wersja-archiwalna';older.lessons.L04.active.definition.questions[0].prompt='Pytanie ze starszej wersji';memory.set(key,JSON.stringify(older));
  page=open('lekcja-han-04.html');assert.equal(page.$('#lesson-inputs').disabled,true);assert.match(page.$('#lesson-session-message').textContent,/Materiały zmieniły/);click(page,'#lesson-finish');assert.match(page.$('#lesson-report').textContent,/Pytanie ze starszej wersji/);
  console.log('OK: zmiana treści nie pozwala mieszać aktywnej próby z nowym kluczem.');
  memory.clear();page=open('lekcja-han-03.html',{blocked:true});click(page,'#lesson-start');input(page,'[data-lesson-work="0"]','Praca w pamięci');click(page,'#lesson-finish');assert.match(page.$('#lesson-report').textContent,/Praca w pamięci/);assert.equal(page.$('#storage-warning').hidden,false);
  console.log('OK: karta i eksport pozostają dostępne przy zablokowanym localStorage.');
}
run().catch(error=>{console.error(error);process.exitCode=1;});
