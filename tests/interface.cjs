/* Integracja skryptów z rzeczywistym drzewem HTML (LinkeDOM), bez przeglądarki. */
'use strict';
const fs=require('node:fs'), path=require('node:path'), vm=require('node:vm');
const assert=require('node:assert/strict');
const {parseHTML}=require('linkedom');
const root=path.resolve(__dirname,'..');
const memory=new Map();
const NativeDate=Date;
const nativeTimeout=setTimeout,NativeURL=URL;
function open(file,options={}) {
  const {window}=parseHTML(fs.readFileSync(path.join(root,file),'utf8'));
  const document=window.document;
  // LinkeDOM nie implementuje pełnego interfejsu formularzy, okien ani storage.
  for(const el of document.querySelectorAll('select'))Object.defineProperty(el,'value',{configurable:true,get(){return this.querySelector('option[selected]')?.value || this.querySelector('option')?.value || '';},set(v){for(const option of this.querySelectorAll('option'))option.toggleAttribute('selected',option.value===v);}});
  const storage={getItem(k){if(options.blocked)throw Error('blocked');return memory.get(k)||null;},setItem(k,v){if(options.blocked)throw Error('blocked');memory.set(k,v);},removeItem(k){memory.delete(k);}};
  let now=options.now??2000000000000;
  const callbacks=[],downloads=[];
  class TestDate extends NativeDate {constructor(...args){super(...(args.length?args:[now]));}static now(){return now;}}
  class TestURL extends NativeURL {}
  TestURL.createObjectURL=blob=>{downloads.push(blob);return 'blob:test';};TestURL.revokeObjectURL=()=>{};
  Object.assign(window,{localStorage:storage,location:{hash:options.hash||'',search:options.search||'',protocol:'https:'},confirm:()=>true,print:()=>{},setTimeout:(fn)=>nativeTimeout(fn,0),clearTimeout,setInterval:fn=>{callbacks.push(fn);return callbacks.length;},clearInterval:()=>{},Date:TestDate,Blob,URL:TestURL,URLSearchParams,Intl,console});
  const context=vm.createContext(window);
  for(const script of ['core.js','course-data.js','search-index.js','site.js'])vm.runInContext(fs.readFileSync(path.join(root,'assets',script),'utf8'),context,{filename:script});
  return {$:q=>document.querySelector(q),$$:q=>[...document.querySelectorAll(q)],window,document,context,downloads,advance(ms){now+=ms;callbacks.forEach(fn=>fn());}};
}
function event(view,el,type){el.dispatchEvent(new view.window.Event(type,{bubbles:true,cancelable:true}));}
async function run(){
  let page=open('modul-1.html');
  const note=page.$('[data-note="m1-0"]');note.value='Mój cel: pięć rozmów';event(page,note,'input');
  let project=open('moj-projekt.html');assert.equal(project.$('[data-note="m1-0"]').value,note.value);
  const complete=page.$('[data-complete]');complete.checked=true;event(page,complete,'change');
  let home=open('index.html');assert.equal(home.$('[data-completed-count]').textContent,'1');assert.match(home.$('#continue-learning').href,/modul-2/);
  console.log('OK: zapis notatek między stronami, ukończenie i kontynuacja.');
  const role=page.$('#role-select');role.value='teacher';event(page,role,'change');assert.equal(open('modul-2.html').document.body.dataset.role,'teacher');
  role.value='participant';event(page,role,'change');assert.equal(open('prowadzacy.html').document.body.dataset.role,'teacher');
  assert.equal(open('modul-3.html',{hash:'#dla-prowadzacego'}).document.body.dataset.role,'teacher');
  console.log('OK: widoki i bezpośrednie linki do scenariusza.');
  page=open('modul-1.html');const questions=JSON.parse(fs.readFileSync(path.join(root,'src/course.json')))[0].quiz;
  questions.forEach((q,i)=>{page.$(`[name="q1-${i}"][value="${q[2]}"]`).setAttribute('checked','');});
  event(page,page.$('.quiz'),'submit');assert.match(page.$('.quiz-result').textContent,/3\/3/);assert.equal(open('modul-1.html').$$('.quiz-feedback[hidden]').length,0);
  console.log('OK: quiz, wyjaśnienia i odtworzenie wyniku.');
  let library=open('biblioteka.html');library.$('#library-module').value='7';library.$('#library-kind').value='source';event(library,library.$('#library-module'),'input');
  assert.equal(library.$$('[data-library-item]').filter(x=>!x.hidden).length,3);
  library.$('#library-search').value='nieistniejący-temat-xyz';event(library,library.$('#library-search'),'input');assert.match(library.$('#library-count').textContent,/Brak/);
  home=open('index.html');home.$('#site-search').value='plynnosc';event(home,home.$('#site-search'),'input');assert.ok(home.$$('#search-items a').length>=1);
  home.$('#site-search').value='<img src=x onerror=alert(1)>';event(home,home.$('#site-search'),'input');assert.equal(home.$$('#search-items img').length,0);
  console.log('OK: filtrowanie biblioteki i wyszukiwanie bez polskich znaków.');
  const school=open('szkola.html');
  school.$('#mapping-qualification').value='HAN.02';school.$('#mapping-module').value='7';event(school,school.$('#mapping-qualification'),'input');
  assert.equal(school.$$('[data-mapping]').filter(x=>!x.hidden).length,1);
  school.$('#lesson-qualification').value='HAN.02';school.$('#lesson-minutes').value='90';event(school,school.$('#lesson-minutes'),'input');
  assert.equal(school.$$('[data-lesson]').filter(x=>!x.hidden).length,7);
  home.$('#site-search').value='HAN.02.7.7';event(home,home.$('#site-search'),'input');assert.ok(home.$$('#search-items a').some(a=>a.href.includes('lekcja/29')));
  console.log('OK: filtry podstawy i katalogu lekcji handlu oraz wyszukiwanie po identyfikatorze efektu.');
  let cash=open('cash-flow.html');event(cash,cash.$('#cash-example'),'click');assert.match(cash.$('[data-cash-output="closing"][data-month="0"]').textContent,/1.*500/);assert.equal(Number(cash.$('#cash-opening-1').value),1500);
  cash.$('#cash-sales-0').value='0';event(cash,cash.$('#cash-sales-0'),'input');assert.match(cash.$('#cash-summary').textContent,/ujemne saldo/);assert.equal(Number(cash.$('#cash-opening-1').value),-4500);
  assert.equal(Number(open('cash-flow.html').$('#cash-opening-1').value),-4500);
  console.log('OK: kalkulator, przenoszenie sald, ostrzeżenie i trwały zapis.');
  project=open('moj-projekt.html');const input=project.$('#import-project');
  const dangerous={version:1,notes:{'project-name':'<img src=x onerror=alert(1)>','m1-0':'Po imporcie'},completed:[8],quizzes:{},cash:{}};
  input.files=[{size:100,text:async()=>JSON.stringify(dangerous)}];event(project,input,'change');await new Promise(resolve=>setTimeout(resolve,5));
  assert.equal(project.$('#project-name').value,dangerous.notes['project-name']);assert.equal(project.$$('img').length,0);assert.equal(project.$('[data-note="m1-0"]').value,'Po imporcie');
  input.files=[{size:20,text:async()=>'{bad'}];event(project,input,'change');await new Promise(resolve=>setTimeout(resolve,5));assert.match(project.$('#project-message').textContent,/Nie wczytano/);assert.equal(project.$('[data-note="m1-0"]').value,'Po imporcie');
  console.log('OK: import poprawny, odrzucenie błędnego pliku, treść importu bez wykonania HTML.');
  event(project,project.$('#reset-project'),'click');assert.equal(project.$('#project-name').value,'');assert.equal(memory.has('pracownia-project-v1'),false);
  const blocked=open('modul-1.html',{blocked:true});assert.equal(blocked.$('#storage-warning').hidden,false);blocked.$('[data-note="m1-0"]').value='Tylko sesja';event(blocked,blocked.$('[data-note="m1-0"]'),'input');assert.match(blocked.$('.save-state').textContent,/Tylko w tej sesji/);
  console.log('OK: kasowanie lokalne i tryb z niedostępnym storage.');
}
if(require.main===module)run().catch(e=>{console.error(e);process.exitCode=1;});
module.exports={open,event,memory};
