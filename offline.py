"""Generuje aplikację offline w zakresie katalogu danego serwisu."""
import hashlib
import json
from portal import ROOT, write

def build_offline():
    manifest={"name":"Pracownia przedsiębiorczości — lekcje HAN","short_name":"Pracownia HAN","lang":"pl","start_url":"./szkola.html","scope":"./","display":"standalone","background_color":"#f7f7f0","theme_color":"#123d36","icons":[{"src":"assets/favicon.svg","sizes":"any","type":"image/svg+xml","purpose":"any"}]}
    write('manifest.webmanifest',json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
    files=sorted([p for p in ROOT.glob('*.html')]+list((ROOT/'assets').glob('*'))+[p for p in (ROOT/'downloads').glob('*') if p.is_file() and p.suffix!='.zip']+[ROOT/'manifest.webmanifest'])
    files=[p for p in files if p.is_file()]
    digest=hashlib.sha256()
    for p in files:digest.update(str(p.relative_to(ROOT)).encode());digest.update(p.read_bytes())
    paths=['./'+p.relative_to(ROOT).as_posix() for p in files]
    script='''/* Wygenerowane przez offline.py. Cache zawiera materiały, nie dane ucznia. */
const VERSION=__VERSION__;
const PREFIX='pracownia-han:'+self.registration.scope+':';
const CACHE=PREFIX+VERSION;
const FILES=__FILES__;
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)));
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith(PREFIX)&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
  const request=event.request,url=new URL(request.url),scope=new URL(self.registration.scope);
  if(request.method!=='GET'||url.origin!==scope.origin||!url.pathname.startsWith(scope.pathname))return;
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE);
    // W sieci pobieramy bieżące pliki; w offline wracamy do zapisanych materiałów.
    try{
      const response=await fetch(request);
      if(response.ok && response.type==='basic'){
        const canonical=new URL(request.url);canonical.search='';
        try{await cache.put(canonical.href,response.clone());}catch(_){}
      }
      return response;
    }catch(_){
      const cached=await cache.match(request,{ignoreSearch:true});
      return cached||new Response('Ten materiał nie został jeszcze pobrany do pracy offline. Połącz się z internetem i otwórz go ponownie.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});
    }
  })());
});
'''
    script=script.replace('__VERSION__',json.dumps(digest.hexdigest()[:16])).replace('__FILES__',json.dumps(paths,ensure_ascii=False))
    write('sw.js',script)
