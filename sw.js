const CACHE = 'cmc-static-v1';
const STATIC = [
  '/movie-club/icon-192.png',
  '/movie-club/icon-512.png',
  '/movie-club/apple-touch-icon.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(STATIC)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Handle skip waiting message from app
self.addEventListener('message', e => {
  if(e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Always fetch HTML fresh
  if(url.pathname.endsWith('.html') || url.pathname.endsWith('/')) {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
    return;
  }

  // Always fetch Firebase, TMDB, Google APIs, YouTube fresh
  if(
    url.hostname.includes('firebase') ||
    url.hostname.includes('firestore') ||
    url.hostname.includes('themoviedb') ||
    url.hostname.includes('googleapis') ||
    url.hostname.includes('youtube') ||
    url.hostname.includes('gstatic')
  ) {
    e.respondWith(fetch(e.request).catch(() => new Response('',{status:503})));
    return;
  }

  // Cache first for static assets
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
      const clone = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, clone));
      return res;
    }))
  );
});


