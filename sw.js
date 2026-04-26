/* Noor service worker — offline-first caching for the shell + fonts */
var CACHE = 'noor-v7';
var SHELL = ['./', './index.html', './manifest.webmanifest', './assets/icon.png', './assets/adaptive-icon.png', './assets/favicon.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(SHELL); }));
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }));
  self.clients.claim();
});

self.addEventListener('fetch', function (e) {
  var url = e.request.url;
  // Let the Quran.com API pass through (always live); everything else network-first with cache fallback
  if (url.indexOf('api.quran.com') >= 0 || url.indexOf('everyayah.com') >= 0 || url.indexOf('verses.quran.com') >= 0) {
    e.respondWith(
      fetch(e.request).then(function (resp) {
        if (resp && resp.status === 200) {
          var rc = resp.clone();
          caches.open(CACHE).then(function (c) { c.put(e.request, rc); });
        }
        return resp;
      }).catch(function () { return caches.match(e.request); })
    );
    return;
  }
  e.respondWith(
    fetch(e.request).then(function (resp) {
      if (resp && resp.status === 200) {
        var rc = resp.clone();
        caches.open(CACHE).then(function (c) { c.put(e.request, rc); });
      }
      return resp;
    }).catch(function () {
      return caches.match(e.request).then(function (r) { return r || caches.match('./'); });
    })
  );
});
