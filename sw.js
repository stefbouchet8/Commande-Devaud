var C="commande-fl-2";
var F=["./","./index.html","./manifest.json","./icon-192.png","./icon-512.png"];
var OK=["www.gstatic.com","fonts.googleapis.com","fonts.gstatic.com"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(F)}));self.skipWaiting()});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n!==C}).map(function(n){return caches.delete(n)}))}));self.clients.claim()});
self.addEventListener("fetch",function(e){
if(e.request.method!=="GET")return;
var u=new URL(e.request.url);
if(u.origin!==location.origin&&OK.indexOf(u.hostname)<0)return;
e.respondWith(fetch(e.request).then(function(r){if(r.ok){var cp=r.clone();caches.open(C).then(function(c){c.put(e.request,cp)})}return r}).catch(function(){return caches.match(e.request)}))});
