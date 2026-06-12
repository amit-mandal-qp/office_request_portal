# Task 13 — Service Worker (Cache-First + Push Handler)

**Status:** ⬜ Not started  
**Phase:** 4 — Frontend

---

## Description

Service worker for offline support and background push notifications. Migrates from prototype `sw.js` to the Vite build pipeline.

## Acceptance Criteria

- [ ] Cache-first strategy for app shell (HTML, CSS, JS, fonts)
- [ ] Network-first for Google Fonts with cache fallback
- [ ] `push` event handler → `showNotification()`
- [ ] `notificationclick` → focuses existing tab or opens `/`
- [ ] `SKIP_WAITING` message handler for cache updates
- [ ] `OPEN_FULFILLMENT` message from SW click → app routes to Fulfillment screen
- [ ] Urgent push: `requireInteraction: true`, vibrate `[300,100,300,100,300]`
- [ ] Normal push: vibrate `[200,50,200]`
- [ ] Cache version bumped (`qp-office-v2`) — separate from prototype

## Cache Shell

```js
const SHELL = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.svg',
  // Vite build outputs (hashed filenames — use workbox or manual precache list)
]
```

## Notes

- Prototype `sw.js` handles direct `Notification` API calls from page
- New SW receives VAPID push from server (different flow)
- Push payload format: `{ title, body, urgency, reqId }`

## Files

- `apps/web/public/sw.js`
- `apps/web/public/manifest.json`
