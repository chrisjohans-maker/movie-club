const CACHE = 'cmc-static-v2';
const STATIC = [
  '/movie-club/icon-192.png',
  '/movie-club/icon-512.png',
  '/movie-club/apple-touch-icon.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(STATIC))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // NEVER cache HTML — always network
  if(
    url.pathname.endsWith('.html') ||
    url.pathname.endsWith('/') ||
    url.search.includes('bust=')
  ) {
    e.respondWith(fetch(e.request, {cache: 'no-store'}));
    return;
  }

  // Never cache API calls
  if(
    url.hostname.includes('firebase') ||
    url.hostname.includes('firestore') ||
    url.hostname.includes('themoviedb') ||
    url.hostname.includes('googleapis') ||
    url.hostname.includes('youtube') ||
    url.hostname.includes('gstatic')
  ) {
    e.respondWith(fetch(e.request, {cache: 'no-store'}));
    return;
  }

  // Cache icons and manifest only
  e.respondWith(
    caches.match(e.request).then(cached =>
      cached || fetch(e.request).then(res => {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      })
    )
  );
});


