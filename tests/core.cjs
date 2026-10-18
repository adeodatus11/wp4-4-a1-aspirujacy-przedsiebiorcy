'use strict';
const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const C = require('../assets/core.js');
const data = JSON.parse(fs.readFileSync(path.join(__dirname,'../src/course.json')));
test('cash flow przenosi salda i uwzględnia wszystkie kategorie wydatków', () => {
  const rows=C.calculate({opening:[10000],sales:[6000,9000,12000,15000,16000,17000],materials:[4000,5000,6000,6500,7000,7500],fixed:Array(6).fill(4000),tax:Array(6).fill(1500),investment:[5000]});
  assert.deepEqual(rows.map(r=>r.closing),[1500,0,500,3500,7000,11000]);
  assert.equal(rows[1].opening,rows[0].closing);
  assert.equal(C.calculate({opening:[0],sales:[.3],other:[.1]})[0].closing,.2);
  assert.equal(C.calculate({opening:[-5],sales:[1]})[0].closing,-4);
});
test('import odrzuca inną wersję i ogranicza strukturę do własnych pól', () => {
  assert.throws(()=>C.normalize({version:2}));
  const p=C.normalize(JSON.parse('{"version":1,"notes":{"m1-0":"<script>test</script>","__proto__":{"polluted":true}},"completed":[1,1,9,-1,"2"],"quizzes":{"1":[0,1,2],"2":[99,1,2]},"cash":{"sales":["nan",2,null]}}'));
  assert.equal(p.notes['m1-0'],'<script>test</script>');
  assert.equal({}.polluted,undefined);
  assert.deepEqual(p.completed,[1]);
  assert.deepEqual(p.quizzes,{1:[0,1,2]});
  assert.deepEqual(p.cash.sales,[0,2,0,0,0,0]);
});
test('eksport i ponowny import zachowują pracę i kompletne wyniki', () => {
  const p=C.blank(); p.notes['m8-5']='Mój następny krok';p.completed=[1,3,8];p.role='teacher';p.quizzes[1]=[0,1,2];p.cash.sales=[100,200,0,0,0,0];
  assert.deepEqual(C.normalize(JSON.parse(JSON.stringify(p))),p);
});
test('quizy mają spójny klucz; wynik jest obliczany z odpowiedzi', () => {
  for(const m of data){ const correct=m.quiz.map(q=>q[2]);assert.equal(C.grade(m.quiz,correct).score,3);assert.equal(C.grade(m.quiz,correct.map(x=>(x+1)%3)).score,0); }
});
test('wyszukiwanie normalizuje polskie znaki i wymaga wszystkich słów', () => {
  const entries=[{title:'Płynność firmy',text:'gotówka i finansowanie'},{title:'Finansowanie',text:'kapitał udziałowy'}];
  assert.equal(C.search(entries,'plynnosc gotowka').length,1);
  assert.equal(C.search(entries,'gotówka brak').length,0);
  assert.equal(C.search(entries,'  ').length,0);
});
