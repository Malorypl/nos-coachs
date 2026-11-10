// Hors ligne : toujours le réseau d'abord (dernière version), sinon la copie gardée.
const C="coach-conseillere-fab91390fb";
const FILES=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","icon-180.png","../fb/firebase-app-compat.js","../fb/firebase-firestore-compat.js"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith("coach-conseillere-")&&k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;
  const u=new URL(r.url);if(u.origin!==location.origin)return;
  e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(r,cp)).catch(()=>{});return res}).catch(()=>caches.match(r).then(m=>m||caches.match("index.html"))))});
