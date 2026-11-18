// Offline support: caches the site so the app opens without internet.
const CACHE = 'cft-v12';
const FILES = ['./', 'index.html', 'manifest.json', 'firebase-config.js', 'extras.js',
  'img/emblem.png', 'img/icon-192.png', 'img/icon-512.png', 'img/logo.jpg', 'img/hero.jpg',
  'img/trees.jpg', 'img/birds.jpg', 'img/garden.jpg', 'img/poultry.jpg',
  'img/maize.jpg', 'img/daud.jpg', 'img/marry.jpg', 'img/geofrey.jpg',
  'img/community.jpg', 'img/school.jpg', 'img/nursery.jpg', 'img/nursery2.jpg', 'img/woodlot.jpg', 'img/tools.jpg', 'img/poster.jpg',
  'img/happy.jpg', 'img/wildebeest.jpg', 'img/seedlings.jpg', 'img/doreen.jpg', 'img/vaileth.jpg'];

self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))));
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(r => {
    const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r;
  }).catch(() => caches.match(e.request)));
});
