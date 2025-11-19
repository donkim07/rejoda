// Cache Manager - Register Service Worker and manage caching
export function initCacheManager() {
  // Check if service workers are supported
  if ('serviceWorker' in navigator) {
    // Register service worker
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('[Cache Manager] Service Worker registered:', registration.scope);

          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New service worker available
                console.log('[Cache Manager] New service worker available');
                // Optionally show update notification to user
              }
            });
          });
        })
        .catch((error) => {
          console.warn('[Cache Manager] Service Worker registration failed:', error);
        });

      // Listen for service worker updates
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('[Cache Manager] Service Worker updated, reloading...');
        // Optionally reload page to get new version
        // window.location.reload();
      });
    });
  }

  // Preload critical resources
  preloadCriticalResources();
}

// Preload critical resources for faster loading
function preloadCriticalResources() {
  const criticalResources = [
    // Critical CSS
    { href: '/styles/bootstrap.min.css', as: 'style' },
    // Critical images
    { href: '/images/logo/logo no bg.svg', as: 'image' },
    // Critical fonts (already handled by preconnect)
  ];

  criticalResources.forEach((resource) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.href;
    link.as = resource.as;
    if (resource.as === 'style') {
      link.onload = function () {
        this.onload = null;
        this.rel = 'stylesheet';
      };
    }
    document.head.appendChild(link);
  });
}

// Clear cache manually (useful for development)
export function clearCache() {
  if ('caches' in window) {
    caches.keys().then((cacheNames) => {
      cacheNames.forEach((cacheName) => {
        caches.delete(cacheName);
      });
      console.log('[Cache Manager] All caches cleared');
    });
  }
}

// Get cache size (for debugging)
export async function getCacheSize() {
  if (!('caches' in window)) return 0;

  let totalSize = 0;
  const cacheNames = await caches.keys();

  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();

    for (const key of keys) {
      const response = await cache.match(key);
      if (response) {
        const blob = await response.blob();
        totalSize += blob.size;
      }
    }
  }

  return totalSize;
}


