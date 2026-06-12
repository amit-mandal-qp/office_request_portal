# Office Request Portal — Project Tracker

**Stack:** NestJS monorepo · React · SQLite · WebSockets · VAPID Web Push · Docker · Nginx  
**Scope:** Internal LAN-only PWA for QuestionPro BD office staff

---

## Status Legend

| Symbol | Meaning |
|--------|---------|
| ✅ | Done |
| 🔄 | In progress |
| ⬜ | Not started |

---

## Phase 1 — Prototype (Current)

| # | Task | File | Status |
|---|------|------|--------|
| 1 | Match design: update `index.html` | [task-01-index-html.md](task-01-index-html.md) | ✅ |

---

## Phase 2 — Monorepo Setup

| # | Task | File | Status |
|---|------|------|--------|
| 2 | Init pnpm monorepo + Turborepo | [task-02-monorepo-setup.md](task-02-monorepo-setup.md) | ✅ |
| 3 | Shared types package | [task-03-shared-types.md](task-03-shared-types.md) | ⬜ |

---

## Phase 3 — Backend (NestJS)

| # | Task | File | Status |
|---|------|------|--------|
| 4 | Prisma + SQLite schema + migrations | [task-04-database.md](task-04-database.md) | ⬜ |
| 5 | Requests module (CRUD + WS broadcast) | [task-05-requests-module.md](task-05-requests-module.md) | ⬜ |
| 6 | WebSocket gateway (Socket.io) | [task-06-websocket-gateway.md](task-06-websocket-gateway.md) | ⬜ |
| 7 | Push module (VAPID subscriptions + send) | [task-07-push-module.md](task-07-push-module.md) | ⬜ |

---

## Phase 4 — Frontend (React + Vite)

| # | Task | File | Status |
|---|------|------|--------|
| 8 | React + Vite + TypeScript setup | [task-08-frontend-setup.md](task-08-frontend-setup.md) | ⬜ |
| 9 | Core hooks (useWebSocket, useRequests, usePushSubscription) | [task-09-hooks.md](task-09-hooks.md) | ⬜ |
| 10 | Screens: NameEntry + RoleSelect | [task-10-screens-entry.md](task-10-screens-entry.md) | ⬜ |
| 11 | Screen: Requester + Success | [task-11-screen-requester.md](task-11-screen-requester.md) | ⬜ |
| 12 | Screen: Fulfillment + required push subscription UX | [task-12-screen-fulfillment.md](task-12-screen-fulfillment.md) | ⬜ |
| 13 | Service worker (cache-first + push handler) | [task-13-service-worker.md](task-13-service-worker.md) | ⬜ |

---

## Phase 5 — Infrastructure

| # | Task | File | Status |
|---|------|------|--------|
| 14 | Docker + Nginx setup | [task-14-docker-nginx.md](task-14-docker-nginx.md) | ⬜ |
| 15 | mkcert SSL + LAN hostname | [task-15-ssl-lan.md](task-15-ssl-lan.md) | ⬜ |

---

## Notes

- Push subscription is **required** for Fulfillment screen (Option A — blocks until enabled)
- All UI strings bilingual: English + Bengali
- No authentication — name entry only
- See `planning/2026-06-10-office-request-portal-design.md` for full spec
