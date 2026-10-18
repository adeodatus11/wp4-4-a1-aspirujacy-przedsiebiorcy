'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const L=require('../assets/lesson-core.js'),C=require('../assets/core.js');
const lessons=JSON.parse(fs.readFileSync(path.join(__dirname,'../src/lessons.json'))),assessments=JSON.parse(fs.readFileSync(path.join(__dirname,'../src/assessments.json')));
function spec(id='L05'){const lesson=lessons.find(l=>l.id===id);return {...lesson,questions:assessments[id],version:'test-v1',references:['HAN.01.3.5 — kryterium 4']};}
function attempt(id='L05',now=1000,uid='attempt-1'){return L.create(spec(id),now,uid,'uczeń 7');}
test('czas wznawia się po odczycie, pauza nie zużywa czasu, zakończenie zachowuje kopię',()=>{
  const a=attempt();assert.equal(L.remaining(a,61000),44*60000);
  L.pause(a,61000);assert.equal(L.remaining(a,500000),44*60000);
  const book=L.normalizeBook({L05:{active:a,history:[]}}).L05;
  L.resume(book.active,500000);assert.equal(L.remaining(book.active,560000),43*60000);
  const done=L.finish(book,560000);assert.equal(done.spentMs,120000);assert.equal(book.active,null);assert.equal(book.history.length,1);
});
test('przekroczenie czasu po powrocie daje zero pozostałego czasu, a brak odpowiedzi zero punktów',()=>{
  const a=attempt();assert.equal(L.remaining(a,1000+90*60000),0);
  const book={active:a,history:[]},done=L.finish(book,1000+90*60000,'time');
  assert.equal(done.spentMs,45*60000);assert.equal(done.finishReason,'time');assert.equal(L.result(done).autoScore,0);assert.equal(L.result(done).total,null);
});
test('liczby polskie, znaki i tolerancja są oceniane poprawnie',()=>{
  assert.equal(L.parseNumber('1 140,00'),1140);assert.equal(L.parseNumber('-3,33 %','%'),-3.33);
  for(const text of ['', 'Infinity','1+1','1,2,3','<img>'])assert.equal(L.parseNumber(text),null);
  const a=attempt();a.answers=['100','106,67','90','20',1];assert.equal(L.result(a).autoScore,10);
  a.answers[1]='107';assert.equal(L.result(a).autoScore,8);
});
test('w każdym z dziesięciu testów komplet poprawnych odpowiedzi daje 10/10',()=>{
  for(const lesson of lessons){const a=attempt(lesson.id);a.answers=a.definition.questions.map(q=>q.type==='choice'?q.correct:String(q.expected).replace('.',','));assert.equal(L.result(a).autoScore,10,lesson.id);}
});
test('wynik łączny pojawia się dopiero po wszystkich trzech ocenach praktycznych',()=>{
  const a=attempt();a.answers=['100','106,67','90','20',1];a.review.scores=[2,null,1];assert.equal(L.result(a).total,null);
  a.review.scores=[2,0,1];assert.equal(L.result(a).total,13);assert.equal(L.result(a).percent,81);
});
test('historia zachowuje trzy próby i klucz każdej historycznej wersji',()=>{
  const book={active:null,history:[]};
  for(let i=0;i<4;i++){book.active=attempt('L05',1000+i*100,`attempt-${i}`);L.finish(book,2000+i*100);}
  assert.deepEqual(book.history.map(a=>a.id),['attempt-1','attempt-2','attempt-3']);
  const original=book.history[0].definition.questions[0].expected;
  const changed=spec();changed.questions=JSON.parse(JSON.stringify(changed.questions));changed.questions[0].expected=999;
  assert.equal(book.history[0].definition.questions[0].expected,original);
});
test('import zachowuje sesję, pracę i oceny, odrzuca cudze pola, a stare kopie pozostają poprawne',()=>{
  const state=C.blank();state.lessons.L05={active:attempt(),history:[]};state.lessons.L05.active.work[0]='<script>tylko tekst</script>';
  const copy=C.normalize(JSON.parse(JSON.stringify(state)));assert.equal(copy.lessons.L05.active.work[0],state.lessons.L05.active.work[0]);
  assert.deepEqual(C.normalize({version:1}).lessons,{});
  assert.deepEqual(L.normalizeBook({L99:{active:attempt()},L05:{active:{id:'bad'},history:[]}}),{L05:{active:null,history:[]}});
});
