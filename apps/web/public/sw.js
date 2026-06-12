const CACHE = 'qp-office-v2';
const SHELL = ['/', '/index.html', '/manifest.json'];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))),
    ).then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);

  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(
      caches.open(CACHE).then((c) =>
        c.match(e.request).then((cached) =>
          cached ?? fetch(e.request).then((res) => { c.put(e.request, res.clone()); return res; }),
        ),
      ),
    );
    return;
  }

  if (e.request.url.includes('/api/') || e.request.url.includes('/socket.io/')) return;

  e.respondWith(
    caches.match(e.request).then((cached) => cached ?? fetch(e.request)),
  );
});

self.addEventListener('push', (e) => {
  let data = { title: 'New Request', body: '', urgency: 'normal', reqId: '', vibrate: [200, 50, 200], requireInteraction: false };
  try { data = { ...data, ...e.data.json() }; } catch {}

  e.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/icon.svg',
      badge: '/icon.svg',
      vibrate: data.vibrate,
      requireInteraction: data.requireInteraction,
      data: { reqId: data.reqId },
    }),
  );
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      const existing = list.find((c) => c.url.includes(self.location.origin));
      if (existing) {
        existing.focus();
        existing.postMessage({ type: 'OPEN_FULFILLMENT' });
      } else {
        clients.openWindow('/');
      }
    }),
  );
});

self.addEventListener('message', (e) => {
  if (e.data?.type === 'SKIP_WAITING') self.skipWaiting();
});
