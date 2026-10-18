/* Wygenerowane przez offline.py. Cache zawiera materiały, nie dane ucznia. */
const VERSION="fc8bde1c7ba18d2d";
const PREFIX='pracownia-han:'+self.registration.scope+':';
const CACHE=PREFIX+VERSION;
const FILES=["./analiza.html", "./assets/core.js", "./assets/course-data.js", "./assets/favicon.svg", "./assets/print.css", "./assets/print.js", "./assets/search-index.js", "./assets/site.css", "./assets/site.js", "./biblioteka.html", "./cash-flow.html", "./downloads/README.txt", "./downloads/cash-flow.xlsx", "./downloads/karta-modul-1.html", "./downloads/karta-modul-2.html", "./downloads/karta-modul-3.html", "./downloads/karta-modul-4.html", "./downloads/karta-modul-5.html", "./downloads/karta-modul-6.html", "./downloads/karta-modul-7.html", "./downloads/karta-modul-8.html", "./downloads/lean-canvas.html", "./downloads/mapa-han.csv", "./downloads/mapa-han.html", "./downloads/podrecznik-prowadzacego.html", "./downloads/prowadzacy-modul-1.html", "./downloads/prowadzacy-modul-2.html", "./downloads/prowadzacy-modul-3.html", "./downloads/prowadzacy-modul-4.html", "./downloads/prowadzacy-modul-5.html", "./downloads/prowadzacy-modul-6.html", "./downloads/prowadzacy-modul-7.html", "./downloads/prowadzacy-modul-8.html", "./downloads/zeszyt-uczestnika.html", "./index.html", "./lekcje/assets/index-DpqoqX-S.js", "./lekcje/favicon.svg", "./lekcje/index.html", "./manifest.webmanifest", "./modul-1.html", "./modul-2.html", "./modul-3.html", "./modul-4.html", "./modul-5.html", "./modul-6.html", "./modul-7.html", "./modul-8.html", "./moj-projekt.html", "./o-materialach.html", "./prowadzacy.html", "./przeglad.html", "./szkola.html", "./wdrozenie.html"];
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
