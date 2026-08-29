/* FridgeFlow Lightweight Offline Service Worker */
const CACHE_NAME = 'fridgeflow-v3.6';
const ASSETS_TO_CACHE = [
  './',
  './planner.html',
  './recipes.html',
  './cook.html',
  './prices.html',
  './css/main.css',
  './css/awwwards.css',
  './css/responsive.css',
  './js/data.js',
  './js/storage.js',
  './js/main.js',
  './js/planner.js',
  './js/recipes.js',
  './js/cook.js',
  './js/prices.js',
  './js/audio-engine.js',
  './js/ai-recipe-generator.js',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch(err => console.log('SW cache partial fail:', err));
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Stale-while-revalidate for local assets, network-first for external unsplash images
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      }).catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});
