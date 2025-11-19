// Service Worker for Rejoda Website - Aggressive Caching Strategy
const CACHE_NAME = 'rejoda-v1';
const RUNTIME_CACHE = 'rejoda-runtime-v1';

// Assets to cache immediately on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/about.html',
  '/projects.html',
  '/contact.html',
  '/src/scripts/main.js',
  '/styles/bootstrap.min.css',
  '/images/logo/logo no bg.svg',
  '/images/logo/rejoda logo no bg no cap.svg',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching static assets');
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('[Service Worker] Failed to cache some assets:', err);
      });
    })
  );
  self.skipWaiting(); // Activate immediately
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME && name !== RUNTIME_CACHE)
          .map((name) => {
            console.log('[Service Worker] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    })
  );
  return self.clients.claim(); // Take control immediately
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip cross-origin requests (unless you want to cache them)
  if (url.origin !== location.origin) {
    return;
  }

  // Strategy: Cache First for static assets, Network First for HTML
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      // For HTML pages, try network first, fallback to cache
      if (request.headers.get('accept').includes('text/html')) {
        return fetch(request)
          .then((response) => {
            // Cache successful responses
            if (response.status === 200) {
              const responseClone = response.clone();
              caches.open(RUNTIME_CACHE).then((cache) => {
                cache.put(request, responseClone);
              });
            }
            return response;
          })
          .catch(() => {
            // Network failed, return cached version if available
            return cachedResponse || new Response('Offline', { status: 503 });
          });
      }

      // For static assets (JS, CSS, images, videos), cache first
      if (cachedResponse) {
        // Update cache in background
        fetch(request)
          .then((response) => {
            if (response.status === 200) {
              const responseClone = response.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, responseClone);
              });
            }
          })
          .catch(() => {
            // Network failed, but we have cache
          });
        return cachedResponse;
      }

      // Not in cache, fetch from network
      return fetch(request)
        .then((response) => {
          // Don't cache non-successful responses
          if (response.status !== 200) {
            return response;
          }

          // Clone response for caching
          const responseClone = response.clone();
          const cacheToUse = request.headers.get('accept').includes('text/html')
            ? RUNTIME_CACHE
            : CACHE_NAME;

          caches.open(cacheToUse).then((cache) => {
            cache.put(request, responseClone);
          });

          return response;
        })
        .catch(() => {
          // Network failed and no cache
          return new Response('Network error', { status: 503 });
        });
    })
  );
});


