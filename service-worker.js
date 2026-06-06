const CACHE_NAME = 'justalarm-v1.3.1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/pages/changelog.html',
  '/pages/privacy.html',
  '/assets/css/global.css',
  '/assets/css/components.css',
  '/assets/css/themes.css',
  '/assets/css/pages/index.css',
  '/assets/css/responsive.css',
  '/assets/css/pages/changelog.css',
  '/assets/css/pages/privacy.css',
  '/assets/css/pages/404.css',
  '/assets/js/themes.js',
  '/assets/js/ui.js',
  '/assets/js/sw.js',
  '/assets/images/favicon.png',
  '/assets/images/apple-touch-icon.png',
  '/assets/images/og-image.png',
  '/assets/images/screenshot.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.mode === 'navigate') {
    e.respondWith(fetch(e.request));
    return;
  }
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
