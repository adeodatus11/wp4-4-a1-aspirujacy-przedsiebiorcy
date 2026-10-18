/* Lokalne sesje i ocena. Funkcje nie używają DOM, sieci ani zegara globalnego. */
(function(root,factory){
  const core=factory();
  if(typeof module==='object' && module.exports)module.exports=core;
  else root.LessonCore=core;
})(typeof window!=='undefined'?window:this,function(){
  'use strict';
  const ids=Array.from({length:10},(_,i)=>`L${String(i+1).padStart(2,'0')}`);
  const text=(x,n=3000)=>typeof x==='string'?x.slice(0,n):'';
  const timestamp=x=>Number.isFinite(x)&&x>=0&&x<=8640000000000000?x:null;
  function definition(x){
    if(!x || !ids.includes(x.id) || ![45,90].includes(x.minutes) || !Array.isArray(x.questions) || x.questions.length!==5)throw Error('Niepoprawna definicja lekcji.');
    const questions=x.questions.map((q,i)=>{
      const base={id:`q${i+1}`,type:q.type,prompt:text(q.prompt,1500),feedback:text(q.feedback,2000),points:2};
      if(q.type==='choice' && Array.isArray(q.options) && q.options.length===3 && Number.isInteger(q.correct) && q.correct>=0 && q.correct<3)return {...base,options:q.options.map(s=>text(s,800)),correct:q.correct};
      if(q.type==='number' && Number.isFinite(q.expected) && Math.abs(q.expected)<=1e12 && Number.isFinite(q.tolerance) && q.tolerance>=0 && q.tolerance<=1)return {...base,expected:q.expected,tolerance:q.tolerance,unit:text(q.unit,50)};
      throw Error('Niepoprawne pytanie.');
    });
    if(!Array.isArray(x.worksheet)||x.worksheet.length!==4||!Array.isArray(x.rubric)||x.rubric.length!==3)throw Error('Brak kryteriów lub pól pracy.');
    return {id:x.id,title:text(x.title,250),goal:text(x.goal,1000),context:text(x.context,10000),tasks:(Array.isArray(x.tasks)?x.tasks:[]).slice(0,10).map(s=>text(s,2000)),minutes:x.minutes,version:text(x.version,40),worksheet:x.worksheet.map(s=>text(s,400)),exit:text(x.exit,800),rubric:x.rubric.map(s=>text(s,600)),references:(Array.isArray(x.references)?x.references:[]).slice(0,30).map(s=>text(s,150)),questions};
  }
  function normalizeAttempt(x){
    try{
      if(!x || !['running','paused','finished'].includes(x.status) || timestamp(x.startedAt)===null || !/^[A-Za-z0-9-]{1,80}$/.test(x.id))return null;
      const spec=definition(x.definition), limit=spec.minutes*60000;
      const answers=spec.questions.map((q,i)=>q.type==='choice'?(Number.isInteger(x.answers?.[i])&&x.answers[i]>=0&&x.answers[i]<3?x.answers[i]:null):text(x.answers?.[i],100));
      const result={id:x.id,definition:spec,status:x.status,participant:text(x.participant,100),startedAt:x.startedAt,runningSince:x.status==='running'?(timestamp(x.runningSince)??x.startedAt):null,spentMs:Number.isFinite(x.spentMs)?Math.max(0,Math.min(limit,x.spentMs)):0,work:Array.from({length:5},(_,i)=>text(x.work?.[i])),answers,review:{scores:Array.from({length:3},(_,i)=>Number.isInteger(x.review?.scores?.[i])&&x.review.scores[i]>=0&&x.review.scores[i]<=2?x.review.scores[i]:null),comment:text(x.review?.comment,2000),reviewer:text(x.review?.reviewer,100)}};
      if(x.status==='finished'){
        if(timestamp(x.endedAt)===null)return null;
        result.endedAt=x.endedAt;result.finishReason=x.finishReason==='time'?'time':'manual';
      }
      return result;
    }catch(_){return null;}
  }
  function normalizeBook(x){
    const out={};
    for(const id of ids){
      const item=x?.[id];if(!item || typeof item!=='object')continue;
      const active=normalizeAttempt(item.active);
      const seen=new Set();
      const history=(Array.isArray(item.history)?item.history:[]).map(normalizeAttempt).filter(a=>{
        if(!a||a.status!=='finished'||a.definition.id!==id||seen.has(a.id))return false;
        seen.add(a.id);return true;
      }).slice(-3);
      out[id]={active:active&&active.status!=='finished'&&active.definition.id===id?active:null,history};
    }
    return out;
  }
  function create(spec,now,id,participant=''){
    return normalizeAttempt({id,definition:spec,status:'running',participant,startedAt:now,runningSince:now,spentMs:0,work:[],answers:[]});
  }
  function elapsed(a,now){
    const running=a.status==='running'&&a.runningSince!==null?Math.max(0,now-a.runningSince):0;
    return Math.min(a.definition.minutes*60000,a.spentMs+running);
  }
  const remaining=(a,now)=>Math.max(0,a.definition.minutes*60000-elapsed(a,now));
  function pause(a,now){if(a.status==='running'){a.spentMs=elapsed(a,now);a.runningSince=null;a.status='paused';}return a;}
  function resume(a,now){if(a.status==='paused'){a.runningSince=now;a.status='running';}return a;}
  function finish(book,now,reason='manual'){
    const a=book.active;if(!a)return null;
    a.spentMs=elapsed(a,now);a.runningSince=null;a.status='finished';a.endedAt=now;a.finishReason=reason==='time'?'time':'manual';
    book.history=[...book.history,a].slice(-3);book.active=null;return a;
  }
  function parseNumber(value,unit=''){
    let s=String(value??'').trim();
    if(unit==='%')s=s.replace(/%$/,'');
    s=s.replace(/[\s\u00a0\u202f]/g,'').replace(',','.');
    if(!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(s))return null;
    const n=Number(s);return Number.isFinite(n)&&Math.abs(n)<=1e12?n:null;
  }
  function result(a){
    const details=a.definition.questions.map((q,i)=>{
      const answer=a.answers[i];
      const parsed=q.type==='number'?parseNumber(answer,q.unit):answer;
      const answered=parsed!==null && parsed!==undefined;
      const correct=answered && (q.type==='choice'?parsed===q.correct:Math.abs(parsed-q.expected)<=q.tolerance+1e-9);
      const correctText=q.type==='choice'?q.options[q.correct]:`${String(q.expected).replace('.',',')}${q.unit?' '+q.unit:''}`;
      const answerText=q.type==='choice'?(Number.isInteger(answer)?q.options[answer]:'—'):text(answer,100)||'—';
      return {prompt:q.prompt,answered,correct,answerText,correctText,score:correct?2:0,max:2,feedback:q.feedback};
    });
    const autoScore=details.reduce((n,r)=>n+r.score,0),reviewed=a.review.scores.every(x=>x!==null),practicalScore=a.review.scores.reduce((s,n)=>s+(n??0),0);
    return {details,autoScore,autoMax:10,autoPercent:Math.round(autoScore/10*100),answeredCount:details.filter(x=>x.answered).length,workCount:a.work.filter(s=>s.trim()).length,reviewed,practicalScore,practicalMax:6,total:reviewed?autoScore+practicalScore:null,totalMax:16,percent:reviewed?Math.round((autoScore+practicalScore)/16*100):null};
  }
  return {ids,definition,normalizeAttempt,normalizeBook,create,elapsed,remaining,pause,resume,finish,parseNumber,result};
});
