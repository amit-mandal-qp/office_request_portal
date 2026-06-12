/* =====================================================
   QuestionPro BD — Office Request Portal
   Service Worker  (sw.js)
   - Caches app shell for offline use
   - Handles notification messages from the page
   - Handles notification click → opens/focuses app
   ===================================================== */

const CACHE = 'qp-office-v1';

const SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg',
  './icon-maskable.svg',
  './data.js',
  './app.jsx',
  './_ds/questionpro-design-system-8f51d4ab-dac4-4db7-9f1f-921e9f066bfb/styles.css',
  './_ds/questionpro-design-system-8f51d4ab-dac4-4db7-9f1f-921e9f066bfb/_ds_bundle.js',
  './_ds/questionpro-design-system-8f51d4ab-dac4-4db7-9f1f-921e9f066bfb/tokens/colors.css',
  './_ds/questionpro-design-system-8f51d4ab-dac4-4db7-9f1f-921e9f066bfb/tokens/typography.css',
  './_ds/questionpro-design-system-8f51d4ab-dac4-4db7-9f1f-921e9f066bfb/tokens/spacing.css',
  './_ds/questionpro-design-system-8f51d4ab-dac4-4db7-9f1f-921e9f066bfb/tokens/radii.css',
  './_ds/questionpro-design-system-8f51d4ab-dac4-4db7-9f1f-921e9f066bfb/tokens/fonts.css',
];

/* ── Install: pre-cache app shell ── */
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(SHELL).catch(() => { /* ignore individual fetch errors during install */ }))
      .then(() => self.skipWaiting())
  );
});

/* ── Activate: purge old caches ── */
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* ── Fetch: cache-first for shell assets, network-first for others ── */
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  /* Skip non-GET and cross-origin except Google Fonts */
  if (e.request.method !== 'GET') return;

  /* Google Fonts: network-first with cache fallback */
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
          return res;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  /* App shell: cache-first */
  if (url.origin === self.location.origin) {
    e.respondWith(
      caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      }))
    );
  }
});

/* ── Message from page: show notification ── */
self.addEventListener('message', e => {
  if (!e.data) return;

  if (e.data.type === 'NEW_REQUEST') {
    const { title, body, urgency, reqId } = e.data;
    self.registration.showNotification(title, {
      body,
      icon: './icon.svg',
      badge: './icon.svg',
      vibrate: urgency === 'urgent' ? [300, 100, 300, 100, 300] : [200, 50, 200],
      tag: reqId || 'qp-request',
      requireInteraction: urgency === 'urgent',
      silent: false,
      data: { url: './index.html', role: 'fulfillment' },
    });
  }

  if (e.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/* ── Notification click: open / focus fulfillment view ── */
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    self.clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then(list => {
        /* Focus existing tab if open */
        for (const client of list) {
          if (client.url.includes('index.html') || client.url.endsWith('/')) {
            client.postMessage({ type: 'OPEN_FULFILLMENT' });
            return client.focus();
          }
        }
        /* Otherwise open a new window */
        return self.clients.openWindow('./index.html');
      })
  );
});
