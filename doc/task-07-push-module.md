# Task 07 — Push Module (VAPID Subscriptions + Send)

**Status:** ⬜ Not started  
**Phase:** 3 — Backend

---

## Description

NestJS `PushModule` for managing Web Push subscriptions and sending VAPID notifications via `web-push` npm package.

## Acceptance Criteria

- [ ] `POST /api/push/subscribe` — save subscription to DB; send catch-up push if pending requests exist
- [ ] `DELETE /api/push/subscribe` — remove subscription by endpoint
- [ ] `GET /api/push/subscriptions/check` — check if `endpoint` is already subscribed
- [ ] VAPID keys loaded from env vars
- [ ] 410 Gone response on send → auto-delete subscription from DB
- [ ] Catch-up push on new subscription: "You have {n} pending request(s) waiting"
- [ ] Urgent requests: `requireInteraction: true`, vibrate `[300,100,300,100,300]`
- [ ] Normal requests: vibrate `[200,50,200]`
- [ ] `PushService` injectable into `RequestsService`

## Endpoints

| Method | Path | Body | Response |
|--------|------|------|----------|
| `POST` | `/api/push/subscribe` | `{ endpoint, p256dh, auth, deviceName? }` | `201` |
| `DELETE` | `/api/push/subscribe` | `{ endpoint }` | `200` |
| `GET` | `/api/push/subscriptions/check` | `?endpoint=...` | `{ subscribed: boolean }` |

## Env Vars Required

```
VAPID_PUBLIC_KEY=
VAPID_PRIVATE_KEY=
VAPID_MAILTO=admin@qpbd.local
```

## Files

- `apps/api/src/push/push.module.ts`
- `apps/api/src/push/push.controller.ts`
- `apps/api/src/push/push.service.ts`
