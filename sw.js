// LinceApp Service Worker — cache do app pra funcionar offline
const CACHE_NAME = 'lince-app-v1';
const APP_URL = '/locafacil/locafacil.html';

// Instala e guarda o app no cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([APP_URL]);
    }).then(() => self.skipWaiting())
  );
});

// Limpa caches antigos ao ativar
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Estratégia: network-first com fallback pro cache
// (sempre tenta pegar a versão mais nova; sem internet, usa a salva)
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Só intercepta o HTML do app — Supabase e CDNs passam direto
  if (event.request.mode === 'navigate' || url.pathname === APP_URL) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // guarda a versão nova no cache
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request).then((r) => r || caches.match(APP_URL)))
    );
  }
});
