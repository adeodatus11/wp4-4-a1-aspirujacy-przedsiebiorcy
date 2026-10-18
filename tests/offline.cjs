'use strict';
const assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),path=require('node:path');
async function run(){
  const scope='https://example.test/kurs/',handlers={},stores=new Map();let offline=false,claims=0,fetches=0;
  const canonical=(value,ignore=false)=>{const u=new URL(typeof value==='string'?value:value.url,scope);if(ignore)u.search='';return u.href;};
  function cache(name){
    if(!stores.has(name))stores.set(name,new Map());const map=stores.get(name);
    return {async addAll(files){for(const file of files)map.set(canonical(file),new Response('offline '+file));},async put(key,value){map.set(canonical(key),value);},async match(key,options){const value=map.get(canonical(key,options?.ignoreSearch));return value?.clone();}};
  }
  const context={self:{registration:{scope},clients:{async claim(){claims++;}},addEventListener(type,handler){handlers[type]=handler;}},caches:{async open(name){return cache(name);},async keys(){return [...stores.keys()];},async delete(name){return stores.delete(name);}},URL,Response,async fetch(request){fetches++;if(offline)throw Error('offline');const response=new Response('network '+request.url);Object.defineProperty(response,'type',{value:'basic'});return response;}};
  vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../sw.js'),'utf8'),context);
  let pending;handlers.install({waitUntil(promise){pending=promise;}});await pending;
  const current=[...stores.keys()][0];assert.ok(stores.get(current).size>70);
  stores.set('pracownia-han:'+scope+':old',new Map());stores.set('pracownia-han:https://example.test/inny-kurs/:old',new Map());
  handlers.activate({waitUntil(promise){pending=promise;}});await pending;
  assert.equal(stores.has('pracownia-han:'+scope+':old'),false);assert.equal(stores.has('pracownia-han:https://example.test/inny-kurs/:old'),true);assert.equal(claims,1);
  async function request(url,method='GET'){
    let response;handlers.fetch({request:new Request(url,{method}),respondWith(promise){response=promise;}});return response?await response:null;
  }
  const url=scope+'lekcja-han-01.html?proba=abc';let response=await request(url);assert.match(await response.text(),/network/);
  offline=true;response=await request(url);assert.match(await response.text(),/network/);
  response=await request(scope+'lekcja-han-02.html?proba=inne');assert.match(await response.text(),/offline/);
  response=await request(scope+'brak.html');assert.equal(response.status,503);
  const before=fetches;assert.equal(await request('https://example.test/inny-kurs/index.html'),null);assert.equal(await request('https://external.test/info'),null);assert.equal(await request(scope+'notatki','POST'),null);assert.equal(fetches,before);
  console.log('OK: instalacja cache, zakres katalogu, aktualizacja tylko własnego cache, sieć i fallback offline, odnośnik do próby oraz brak przechwytywania innych projektów.');
}
run().catch(error=>{console.error(error);process.exitCode=1;});
