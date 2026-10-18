(function(){
  'use strict';
  const Store=window.CourseStore, Core=window.LessonCore;
  if(!Store||!Core)return;
  const $=q=>document.querySelector(q), $$=q=>[...document.querySelectorAll(q)];
  const definitions=window.LESSON_DATA||[];
  const node=(tag,text,cls)=>{const el=document.createElement(tag);if(text!==undefined)el.textContent=text;if(cls)el.className=cls;return el;};
  const date=ms=>new Date(ms).toLocaleString('pl-PL');
  const time=ms=>{const seconds=Math.ceil(ms/1000);return `${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`;};
  const url=(id,attempt)=>`lekcja-han-${id.slice(1)}.html${attempt?'?proba='+encodeURIComponent(attempt)+'#karta-oceny':'#sesja'}`;
  const backup=()=>Store.download('moja-nauka.json',JSON.stringify(Store.backup(),null,2),'application/json');
  function savedResultLabel(a){
    const r=Core.result(a);
    return `Test ${r.autoScore}/10 · praca ${r.reviewed?r.practicalScore+'/6':'oczekuje oceny'}${r.reviewed?' · łącznie '+r.total+'/16':''}`;
  }
  function updateOverview(){
    const books=Store.read().lessons;
    $$('[data-lesson]').forEach(card=>{
      const id=card.dataset.lesson,book=books[id];
      let label=card.querySelector('.lesson-local-state');
      if(!label){label=node('p',undefined,'lesson-local-state');card.append(label);}
      label.textContent=book?.active?'Sesja '+(book.active.status==='paused'?'wstrzymana — wznów':'w toku — wróć do pracy'):book?.history.length?savedResultLabel(book.history.at(-1)):'Brak zakończonej sesji na tym urządzeniu.';
    });
    const container=$('#lesson-results-list');
    if(!container)return;
    container.replaceChildren();let count=0;
    for(const spec of definitions){
      const book=books[spec.id];if(!book||(!book.active&&!book.history.length))continue;
      count++;
      const article=node('article',undefined,'panel results-lesson');
      article.append(node('p',spec.id+' · '+spec.minutes+' min','eyebrow'),node('h2',spec.title));
      if(book.active){
        const link=node('a',book.active.status==='paused'?'Wznów wstrzymaną lekcję →':'Wróć do bieżącej sesji →','button secondary');link.href=url(spec.id);article.append(link);
      }
      for(const a of [...book.history].reverse()){
        const row=node('div',undefined,'attempt-row'),link=node('a',`${date(a.endedAt)} · ${a.participant||'bez identyfikatora'} →`);link.href=url(spec.id,a.id);
        row.append(link,node('p',savedResultLabel(a)));article.append(row);
      }
      container.append(article);
    }
    if(!count)container.append(node('div','Nie masz jeszcze zapisanej sesji. Wybierz lekcję i rozpocznij pracę.','panel'));
  }
  if($('#results-backup'))$('#results-backup').addEventListener('click',backup);
  Store.subscribe(updateOverview);updateOverview();
  if('serviceWorker' in (window.navigator||{}) && window.isSecureContext && location.protocol!=='file:'){
    navigator.serviceWorker.register('sw.js').then(()=>navigator.serviceWorker.ready).then(()=>{
      const el=$('#offline-state');if(el)el.textContent='Materiały zapisano do pracy offline. Źródła zewnętrzne i pierwsze pobranie ZIP wymagają internetu.';
    }).catch(()=>{const el=$('#offline-state');if(el)el.textContent='Automatyczny zapis materiałów offline jest niedostępny. Możesz użyć pakietu ZIP.';});
  }
  const root=$('[data-lesson-session]');if(!root)return;
  const id=root.dataset.lessonSession,spec=definitions.find(d=>d.id===id);
  if(!spec)return;
  let selected=null;
  try{selected=new URLSearchParams(location.search||'').get('proba');}catch(_){}
  const getBook=()=>Store.read().lessons[id]||{active:null,history:[]};
  const currentAttempt=()=>{const b=getBook();return b.history.find(a=>a.id===selected)||(!b.active?b.history.at(-1):null);};
  function newId(){return 'sesja-'+(window.crypto?.randomUUID?window.crypto.randomUUID():Date.now().toString(36)+'-'+Math.random().toString(36).slice(2));}
  function clock(){
    const b=getBook(),a=b.active;
    $('#lesson-timer').textContent=a?time(Core.remaining(a,Date.now())):b.history.length?'Zakończona':spec.minutes+':00';
  }
  function section(parent,title,text){const el=node('section',undefined,'report-section');el.append(node('h3',title),node('p',text));parent.append(el);return el;}
  function makeReport(a){
    const r=Core.result(a),report=node('article',undefined,'assessment-card');
    report.append(node('p','KARTA OCENY PRACY · '+a.definition.id,'eyebrow'),node('h2',a.definition.title));
    report.append(node('p',`${a.participant||'Bez identyfikatora'} · zakończenie ${date(a.endedAt)} · aktywny czas ${time(a.spentMs)} / ${a.definition.minutes}:00`,'report-meta'));
    report.append(node('p',`Próba ${a.id} · wersja materiału ${a.definition.version} · ${a.finishReason==='time'?'zakończono po upływie czasu':'zakończono przez uczestnika'}`,'small'));
    const scores=node('div',undefined,'assessment-scores');
    for(const [title,value,detail] of [['Test automatyczny',r.autoScore+'/10',r.autoPercent+'% punktów testu'],['Praca praktyczna',r.reviewed?r.practicalScore+'/6':'Oczekuje oceny',r.reviewed?'Wpis ręczny według rubryki':'Nie doliczamy brakującej oceny jako zera'],['Wynik łączny',r.reviewed?r.total+'/16':'Jeszcze nieustalony',r.reviewed?r.percent+'% całości':'Po ocenie wszystkich kryteriów']]){
      const box=node('div');box.append(node('span',title),node('strong',value),node('small',detail));scores.append(box);
    }
    report.append(scores,node('p',`Odpowiedzi w teście: ${r.answeredCount}/5. Uzupełnione pola pracy: ${r.workCount}/5. Samo wypełnienie pola nie oznacza poprawności rozwiązania.`));
    const review=section(report,'Ocena pracy praktycznej','Trzy kryteria po 0–2 punkty. Ocena wymaga sprawdzenia treści i obserwacji pracy.');
    const list=node('ul');a.definition.rubric.forEach((text,i)=>list.append(node('li',`${a.review.scores[i]===null?'Nie oceniono':a.review.scores[i]+'/2'} — ${text}`)));review.append(list);
    if(a.review.reviewer)review.append(node('p','Wpis oceny: '+a.review.reviewer));
    if(a.review.comment)review.append(node('p',a.review.comment,'preserve-lines'));
    const feedback=section(report,'Następny krok',r.autoScore<8?'Wróć do pytań bez kompletu punktów i przeanalizuj wyjaśnienia. Potem zaplanuj poprawkę w pracy.':r.reviewed?'Wykorzystaj informację zwrotną do poprawienia rozwiązania lub wykonaj zadanie rozszerzające.':'Test pokazuje dobre rozumienie pojęć. Przekaż pracę do oceny praktycznej i omów jeden obszar do poprawy.');
    if(!r.reviewed)feedback.append(node('p','Ocena pracy praktycznej nadal wymaga uzupełnienia.'));
    if(a.definition.context){
      const context=section(report,'Zadanie i dane z tej próby',a.definition.context);
      const tasks=node('ol');a.definition.tasks.forEach(task=>tasks.append(node('li',task)));context.append(tasks);
    }
    section(report,'Twoje rozwiązanie','Odpowiedzi zapisane w momencie zakończenia sesji.');
    [...a.definition.worksheet,a.definition.exit].forEach((label,i)=>section(report,`${i+1}. ${label}`,a.work[i]||'Brak odpowiedzi.').lastChild.classList.add('preserve-lines'));
    const questions=section(report,'Test — odpowiedzi i wyjaśnienia','Każde pytanie: 2 punkty za poprawną odpowiedź, 0 za niepoprawną lub brak.');
    r.details.forEach((q,i)=>{
      const item=node('div',undefined,'report-question');item.append(node('h4',`${i+1}. ${q.prompt}`),node('p',`Twoja odpowiedź: ${q.answerText}`),node('p',`Punkty: ${q.score}/2. Poprawna odpowiedź: ${q.correctText}`),node('p',q.feedback,'small'));questions.append(item);
    });
    section(report,'Odniesienia do HAN.01 / HAN.02',a.definition.references.join(' · '));
    report.append(node('p','Karta dydaktyczna przechowywana lokalnie. Wpis oceny nie jest weryfikacją tożsamości, oceną egzaminu CKE ani potwierdzeniem kwalifikacji.','small'));
    return report;
  }
  function renderReport(a){
    const container=$('#karta-oceny'),target=$('#lesson-report');
    container.hidden=!a;if(!a){target.replaceChildren();return;}
    target.replaceChildren(makeReport(a));
    a.definition.rubric.forEach((label,i)=>{
      const el=$(`[data-rubric="${i}"]`);el.previousElementSibling.textContent=label;el.value=a.review.scores[i]===null?'':String(a.review.scores[i]);
    });
    $('#lesson-review-comment').value=a.review.comment;$('#lesson-reviewer').value=a.review.reviewer;
  }
  function render(){
    const b=getBook(),active=b.active,display=active||b.history.find(a=>a.id===selected)||b.history.at(-1);
    if(!active&&!b.history.some(a=>a.id===selected))selected=b.history.at(-1)?.id||null;
    $('#lesson-start').textContent=active?'Sesja w toku':b.history.length?'Rozpocznij nową próbę':'Rozpocznij lekcję';
    $('#lesson-start').disabled=!!active;
    $('#lesson-pause').hidden=!active;$('#lesson-pause').textContent=active?.status==='paused'?'Wznów lekcję':'Wstrzymaj';
    const outdated=active&&active.definition.version!==spec.version;
    $('#lesson-finish').disabled=!active;$('#lesson-finish-bottom').disabled=!active;$('#lesson-inputs').disabled=!active||active.status!=='running'||outdated;
    if(outdated)$('#lesson-pause').hidden=true;
    $('#lesson-participant').disabled=!active&&!!b.history.length;
    if(display&&$('#lesson-participant').value!==display.participant)$('#lesson-participant').value=display.participant;
    $$('[data-lesson-work]').forEach(el=>{const value=display?.work[Number(el.dataset.lessonWork)]||'';if(el.value!==value)el.value=value;});
    $$('[data-lesson-answer]').forEach(el=>{
      const value=display?.answers[Number(el.dataset.lessonAnswer)];
      if(el.type==='radio')el.checked=value===Number(el.value);
      else if(el.value!==(value??''))el.value=value??'';
    });
    $('#lesson-session-message').textContent=active?(active.status==='paused'?'Lekcja wstrzymana. Czas nie płynie, a pola są zablokowane do wznowienia.':'Sesja trwa. Odpowiedzi zapisują się '+(Store.available()?'lokalnie w przeglądarce.':'tylko w pamięci tej sesji — pobierz kopię przed wyjściem.')):b.history.length?'Sesja zakończona. Karta oceny i zapis pracy są poniżej. Nowa próba nie zmienia poprzedniego wyniku.':'Rozpocznij, aby wypełniać pracę i test.';
    if(outdated)$('#lesson-session-message').textContent='Materiały zmieniły się od rozpoczęcia tej próby. Zakończ i zachowaj archiwalną kartę, a następnie rozpocznij nową próbę. Nie zmieniamy punktacji zapisanej wersji.';
    clock();
    const history=$('#lesson-history');history.replaceChildren();
    for(const a of [...b.history].reverse()){
      const row=node('div',undefined,'attempt-row'),btn=node('button',`${date(a.endedAt)} · ${a.participant||'bez identyfikatora'} — otwórz kartę`,'text-button');btn.type='button';btn.dataset.report=a.id;
      row.append(btn,node('p',savedResultLabel(a)));history.append(row);
    }
    if(!b.history.length)history.append(node('p','Nie ma jeszcze zakończonej próby.'));
    renderReport(currentAttempt());
  }
  function ensureExpiry(){
    const a=getBook().active;if(!a||a.status!=='running'||Core.remaining(a,Date.now())>0)return false;
    Store.update(s=>{
      const b=s.lessons[id];if(b?.active?.id!==a.id)return;
      const done=Core.finish(b,Date.now(),'time');selected=done.id;
    });
    $('#lesson-session-message').textContent='Czas lekcji upłynął. Pracę i odpowiedzi zapisano, a karta wyniku jest gotowa poniżej.';
    return true;
  }
  $('#lesson-start').addEventListener('click',()=>{
    const participant=$('#lesson-participant').value;
    if(getBook().history.length&&!confirm('Rozpocząć nową próbę z pustą pracą i testem? Zachowamy trzy ostatnie zakończone próby.'))return;
    selected=null;
    Store.update(s=>{
      const b=s.lessons[id]||(s.lessons[id]={active:null,history:[]});if(b.active)return;
      b.active=Core.create(spec,Date.now(),newId(),participant);
    });
  });
  $('#lesson-pause').addEventListener('click',()=>{
    if(ensureExpiry())return;
    Store.update(s=>{const a=s.lessons[id]?.active;if(!a)return;a.status==='running'?Core.pause(a,Date.now()):Core.resume(a,Date.now());});
  });
  $('#lesson-finish').addEventListener('click',()=>{
    if(ensureExpiry())return;
    const a=getBook().active;if(!a)return;
    const r=Core.result(a);
    if(!confirm(`Zakończyć lekcję? Test: ${r.answeredCount}/5 odpowiedzi, praca: ${r.workCount}/5 pól. Brak odpowiedzi w teście daje 0 punktów. Zapisanej próby nie edytujesz, ale możesz rozpocząć kolejną.`))return;
    Store.update(s=>{const b=s.lessons[id];if(b?.active?.id===a.id)selected=Core.finish(b,Date.now()).id;});
    $('#karta-oceny').scrollIntoView?.({behavior:'smooth',block:'start'});
  });
  $('#lesson-finish-bottom').addEventListener('click',()=>$('#lesson-finish').click());
  function edit(change){
    if(ensureExpiry())return;
    Store.update(s=>{const a=s.lessons[id]?.active;if(a?.status==='running'&&a.definition.version===spec.version)change(a);});
  }
  $$('[data-lesson-work]').forEach(el=>el.addEventListener('input',()=>edit(a=>a.work[Number(el.dataset.lessonWork)]=el.value.slice(0,3000))));
  $$('[data-lesson-answer]').forEach(el=>el.addEventListener(el.type==='radio'?'change':'input',()=>edit(a=>a.answers[Number(el.dataset.lessonAnswer)]=el.type==='radio'?Number(el.value):el.value.slice(0,100))));
  $('#lesson-participant').addEventListener('input',()=>edit(a=>a.participant=$('#lesson-participant').value.slice(0,100)));
  $('#lesson-work-form').addEventListener('submit',e=>e.preventDefault());
  $('#lesson-history').addEventListener('click',ev=>{
    const button=ev.target.closest('[data-report]');if(!button)return;selected=button.dataset.report;renderReport(currentAttempt());$('#karta-oceny').scrollIntoView?.({behavior:'smooth'});
  });
  $('#lesson-review-form').addEventListener('submit',ev=>{
    ev.preventDefault();const a=currentAttempt();if(!a)return;
    const scores=$$('[data-rubric]').map(el=>el.value===''?null:Number(el.value));
    const comment=$('#lesson-review-comment').value.slice(0,2000),reviewer=$('#lesson-reviewer').value.slice(0,100);
    Store.update(s=>{const saved=s.lessons[id]?.history.find(x=>x.id===a.id);if(saved)saved.review={scores,comment,reviewer};});
    $('#lesson-review-message').textContent=Store.available()?'Zapisano ocenę lokalnie. Karta została zaktualizowana.':'Ocena pozostaje w pamięci sesji. Pobierz kopię przed wyjściem.';
  });
  $('#lesson-backup').addEventListener('click',backup);
  $('#lesson-print').addEventListener('click',()=>{
    const a=currentAttempt();if(!a)return;
    $$('.assessment-print').forEach(el=>el.remove());const printed=node('section',undefined,'assessment-print');printed.append(makeReport(a));$('#main').append(printed);document.body.classList.add('printing-assessment');window.print();
  });
  window.addEventListener('afterprint',()=>{$$('.assessment-print').forEach(el=>el.remove());document.body.classList.remove('printing-assessment');});
  $('#lesson-html').addEventListener('click',()=>{
    const a=currentAttempt();if(!a)return;
    const doc='<!doctype html><html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Karta oceny '+a.definition.id+'</title><style>body{font:15px/1.6 Arial,sans-serif;max-width:900px;margin:35px auto;padding:0 25px;color:#203d32}h2,h3,h4{line-height:1.3}.assessment-scores{display:flex;gap:25px;flex-wrap:wrap;border-block:1px solid #bbb;padding:20px 0}.assessment-scores>div{display:grid;gap:8px}.assessment-scores strong{font-size:23px}.small,small{font-size:11px}.report-section,.report-question{border-top:1px solid #ddd;padding-top:16px;margin-top:20px}.preserve-lines{white-space:pre-wrap;overflow-wrap:anywhere}@media print{@page{margin:18mm}body{padding:0;font-size:10pt}.assessment-scores>div,.report-question{break-inside:avoid}}</style></head><body>'+makeReport(a).outerHTML+'<p>Wydruk / PDF: użyj funkcji drukowania przeglądarki. Ten plik zawiera kompletną kartę i nie wymaga internetu.</p></body></html>';
    Store.download(`karta-${id}-${a.id}.html`,doc,'text/html;charset=utf-8');
  });
  Store.subscribe(render);render();ensureExpiry();
  const timer=setInterval(()=>{if(!ensureExpiry())clock();},1000);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden){ensureExpiry();clock();}});
  window.addEventListener('pageshow',()=>{ensureExpiry();clock();});
})();
