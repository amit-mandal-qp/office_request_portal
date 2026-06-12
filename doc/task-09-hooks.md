# Task 09 — Core Hooks

**Status:** ⬜ Not started  
**Phase:** 4 — Frontend

---

## Description

Three custom React hooks that form the data layer of the frontend. These are the only interface between UI components and the backend.

## Acceptance Criteria

### `useWebSocket()`
- [ ] Connects Socket.io with auto-reconnect
- [ ] Exposes `on(event, handler)` and `emit(event, data)`
- [ ] On reconnect: triggers `GET /api/requests/active` resync
- [ ] Cleans up socket on unmount

### `useRequests()`
- [ ] `GET /api/requests/active` on mount via TanStack Query
- [ ] Merges incoming `request:new` WS events into cache
- [ ] Updates item on `request:updated` WS event
- [ ] Exposes: `requests`, `isLoading`, `updateStatus(id, status)`

### `usePushSubscription()`
- [ ] Checks `GET /api/push/subscriptions/check` with current endpoint on mount
- [ ] If not subscribed: sets `needsSubscription = true`
- [ ] `subscribe()` — requests `Notification` permission → VAPID subscribe → `POST /api/push/subscribe`
- [ ] Returns `{ needsSubscription, subscribing, subscribe, error }`

## Files

- `apps/web/src/hooks/useWebSocket.ts`
- `apps/web/src/hooks/useRequests.ts`
- `apps/web/src/hooks/usePushSubscription.ts`
