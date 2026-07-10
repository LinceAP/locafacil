// LinceApp Service Worker — v2, cache robusto para offline
const CACHE_NAME = 'lince-app-v2';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Só lida com requisições do próprio site (HTML e sw)
  if (url.origin !== self.location.origin) return;

  // Navegações e o HTML do app: network-first, cache fallback
  if (event.request.mode === 'navigate' || url.pathname.endsWith('.html')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        })
        .catch(() =>
          caches.match(event.request, { ignoreSearch: true })
            .then((r) => r || caches.match('/locafacil/locafacil.html', { ignoreSearch: true }))
            .then((r) => r || new Response('<h1>Offline</h1><p>Abra o app com internet uma vez para ativar o modo offline.</p>', { headers: { 'Content-Type': 'text/html' } }))
        )
    );
  }
});
