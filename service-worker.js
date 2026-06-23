const CACHE_NAME = "pizza-pwa-v3";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./favicon.ico",
  "./icons/pizza-icon.svg",
  "./icons/favicon-16x16.png",
  "./icons/favicon-32x32.png",
  "./icons/apple-touch-icon.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/maskable-icon-192.png",
  "./icons/maskable-icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName)),
      ))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.ok) {
            const responseToCache = response.clone();
            event.waitUntil(
              caches.open(CACHE_NAME)
                .then((cache) => cache.put(event.request, responseToCache)),
            );
          }

          return response;
        })
        .catch(() => caches.match(event.request)
          .then((cachedResponse) => cachedResponse || caches.match("./index.html"))),
    );
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => cachedResponse || fetch(event.request)),
  );
});
