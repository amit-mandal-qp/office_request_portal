# Office Request Portal — Design Spec
**Date:** 2026-06-10  
**Stack:** NestJS monorepo · React · SQLite · WebSockets · VAPID Web Push · Docker · Nginx  
**Scope:** Internal LAN-only PWA for QuestionPro BD office staff

---

## 1. Problem Statement

Office staff need a way to submit requests (tea, snacks, supplies, IT help, etc.) and have fulfillment staff notified **instantly** on their personal phones — even when the app is closed. The current prototype uses `localStorage` polling with no backend, so cross-device delivery is impossible.

---

## 2. Decisions Made

| Decision | Choice | Reason |
|----------|--------|--------|
| Auth | None — name entry only | Internal office tool, ~20–30 employees, no user management overhead |
| Real-time (in-app) | WebSockets (Socket.io) | True instant delivery, bidirectional, NestJS first-class support |
| Background push | VAPID Web Push | Free, no third-party account, `web-push` npm package, standard-compliant |
| Database | SQLite (WAL mode) | Zero setup, single file, handles 30 concurrent writes trivially |
| Deployment | Local LAN only | `office.qpbd.local` via Nginx + mkcert SSL |
| Monorepo tooling | pnpm workspaces + Turborepo | Shared types, unified build |
| History | Fire-and-forget | No UI for history; DONE requests remain in DB as silent audit trail |

---

## 3. Monorepo Structure

```
office-request-portal/
├── apps/
│   ├── api/                          # NestJS backend
│   │   ├── src/
│   │   │   ├── requests/             # RequestsModule: CRUD + WS broadcast
│   │   │   ├── push/                 # PushModule: subscription management + send
│   │   │   ├── gateway/              # WebSocket gateway (Socket.io)
│   │   │   └── prisma/               # PrismaService
│   │   └── prisma/
│   │       ├── schema.prisma
│   │       └── migrations/
│   └── web/                          # React + Vite frontend
│       ├── src/
│       │   ├── screens/              # NameEntry, RoleSelect, Requester, Fulfillment, Success
│       │   ├── hooks/                # useWebSocket, usePushSubscription, useRequests
│       │   └── data/                 # category config, API client (fetch wrapper)
│       └── public/
│           ├── sw.js                 # Service worker: cache-first + push handler
│           └── manifest.json
├── packages/
│   └── shared/                       # Shared TypeScript types (RequestDto, Category, enums)
├── docker/
│   ├── nginx/
│   │   ├── nginx.conf                # Reverse proxy config
│   │   └── certs/                    # mkcert-generated SSL cert + key
│   └── Dockerfile.api                # NestJS production image
├── docker-compose.yml                # Production (LAN)
├── docker-compose.dev.yml            # Local dev (hot reload)
├── turbo.json                        # Turborepo pipeline config
├── pnpm-workspace.yaml
├── .env.example
└── package.json                      # pnpm workspace root
```

---

## 4. Data Model (Prisma / SQLite)

```prisma
model Request {
  id            String   @id              // client-generated nanoid — idempotency key
  requesterName String
  category      String                    // e.g. 'tea_coffee', 'it_help'
  categoryEn    String
  categoryBn    String
  customText    String?
  urgency       Urgency  @default(NORMAL)
  status        Status   @default(PENDING)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model PushSubscription {
  id          String   @id @default(cuid())
  endpoint    String   @unique            // Web Push endpoint URL
  p256dh      String                     // encryption key
  auth        String                     // auth secret
  deviceName  String?                    // optional label ("Karim's phone")
  createdAt   DateTime @default(now())
}

enum Urgency { NORMAL URGENT }
enum Status  { PENDING ACKNOWLEDGED DONE }
```

**Notes:**
- `Request.id` is client-generated (nanoid) before submission — enables `upsert` idempotency
- No `User` model — name is a plain string
- DONE requests are never deleted — silent audit trail at zero cost
- `updatedAt` tracks last status change timestamp

---

## 5. API Design

### REST Endpoints (`/api`)

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/requests` | Submit request (idempotent upsert by `id`) |
| `GET` | `/api/requests/active` | All requests where `status != DONE` |
| `PATCH` | `/api/requests/:id/status` | Update status `{ status: 'ACKNOWLEDGED' \| 'DONE' }` |
| `POST` | `/api/push/subscribe` | Register device push subscription (required for Fulfillment screen access) |
| `DELETE` | `/api/push/subscribe` | Unregister push subscription |
| `GET` | `/api/push/subscriptions/check` | Check if device already subscribed (used before showing subscription prompt) |

### WebSocket Events (Socket.io)

**Server → Client:**
```
request:new      { request }       # broadcast to all connected fulfillment clients
request:updated  { id, status }    # broadcast status change to all clients
```

**Client → Server:**
```
join:fulfillment  {}               # fulfillment screen registers to receive WS events
```

### Request Submission Flow

```
Requester submits form
  → Client generates nanoid requestId
  → POST /api/requests
  → Server: upsert by id (idempotent)
  → Server: emit request:new via WS to all fulfillment clients
  → Server: send VAPID push to all active subscriptions (guaranteed: Fulfillment requires push)
  → Response 201 to requester

Fulfillment taps Acknowledge
  → PATCH /api/requests/:id/status { status: 'ACKNOWLEDGED' }
  → Server: update DB
  → Server: emit request:updated to all WS clients

Fulfillment taps Done
  → PATCH /api/requests/:id/status { status: 'DONE' }
  → Server: update DB
  → Server: emit request:updated (clients remove item from active list)
```

### New Push Subscription Registration Flow

```
Fulfillment staff opens app → enables notifications
  → POST /api/push/subscribe
  → Server: save subscription to DB
  → Server: check pending requests (status = PENDING | ACKNOWLEDGED)
  → if pending count > 0: send catch-up push to this device
      body: "You have {n} pending request(s) waiting"
  → Response 201
```

---

## 6. Frontend Architecture

### Screen Flow

```
NameEntry → RoleSelect → Requester → Success
                       ↘ Fulfillment
```

- `localStorage` persists `qp_user_name` only
- Role is re-selected each session (no change from prototype)

### Key Hooks

```typescript
useWebSocket()          // connects Socket.io, auto-reconnect, exposes on/emit
useRequests()           // GET /active on mount + merges WS events in real-time
usePushSubscription()   // requests Notification permission, registers VAPID sub
```

### State Management

React `useState` + `useReducer` — no Redux/Zustand. TanStack Query for REST calls + cache invalidation on WS events.

### WS Reconnection Strategy

Socket.io handles auto-reconnect with exponential backoff. On reconnect → `GET /api/requests/active` resyncs full state (covers events missed during disconnect).

### Push Subscription Flow (Required)

Fulfillment screen requires active push subscription before displaying requests.

1. Fulfillment screen mounts
2. Check if device already has active `PushSubscription` in DB
3. If not → show blocking banner: "Enable Notifications to Continue"
4. User taps button → request `Notification.permission`
5. If granted → `usePushSubscription` subscribes via `navigator.serviceWorker.ready` + VAPID public key
6. `POST /api/push/subscribe` → stored in DB
7. On success → dismiss banner, show Fulfillment UI
8. On failure → show error message, retry button
9. Server pushes to this endpoint on every future request

### Service Worker (`sw.js`) Responsibilities

- Cache-first shell for offline support
- Handles `push` events → `showNotification()`
- `notificationclick` → focuses existing tab or opens `/`
- Handles `SKIP_WAITING` message for cache updates

### Tech Stack

| Package | Purpose |
|---------|---------|
| React 18 + Vite | UI + build (replaces CDN + Babel) |
| TypeScript | Type safety across monorepo |
| Socket.io-client | WebSocket connection |
| TanStack Query | REST data fetching + cache |
| QP Design System (`_ds/`) | Tokens + components (kept as-is) |

---

## 7. Edge Cases

### Network & Connectivity

| Scenario | Handling |
|----------|----------|
| Server unreachable at submit | Error shown, form preserved, button re-enables for retry |
| WS drops mid-session | Socket.io auto-reconnects; `GET /active` resyncs on reconnect |
| VAPID push delivery fails (device offline) | Fire-and-forget; device gets backlog via `GET /active` when app opens |
| Server restart while clients connected | All WS clients reconnect automatically; no data loss (SQLite persists) |

### Concurrent Actions

| Scenario | Handling |
|----------|----------|
| Two staff tap Done simultaneously | First PATCH wins; second is no-op (status already DONE); both receive `request:updated` WS event |
| Two staff tap Acknowledge simultaneously | Both succeed (ACKNOWLEDGED is idempotent); WS event syncs both screens |

### Submission & Idempotency

| Scenario | Handling |
|----------|----------|
| Double-tap submit | Button disabled on first tap; `requestId` generated once per form open |
| Network retry sends same `requestId` | Server `upsert` on `id` — second write ignored, push not re-sent |
| User submits then closes app | Request already saved server-side; no action needed |

### Push Notifications

| Scenario | Handling |
|----------|----------|
| All fulfillment staff subscribed (required) | Request saved; VAPID push sent to all active subscriptions immediately |
| Staff opens app after offline period | `GET /active` loads full pending backlog immediately on mount |
| New subscription registered, pending requests exist | Server sends catch-up push: "You have {n} pending request(s) waiting" |
| Push subscription expires / 410 Gone | Server detects 410 on send → deletes subscription from DB automatically |
| User denies notification permission | Fulfillment screen remains blocked; show error banner with "try again" button |
| iOS < 16.4 | Push not supported; Fulfillment screen shows: "Update to iOS 16.4+ to enable background notifications" or allow WS-only mode with retry |

### HTTPS / LAN

| Scenario | Handling |
|----------|----------|
| mkcert CA not installed on device | Browser HTTPS warning; SW + push won't work; setup doc covers per-device CA install |
| Server LAN IP changes | Nginx hostname (`office.qpbd.local`) decouples from IP; update router DNS once |
| Office server offline | App loads from SW cache; submit fails with clear offline error; fulfillment shows stale-state warning |

### Urgent Requests

- Push sent with `requireInteraction: true` (stays on screen until dismissed)
- Vibration: `[300,100,300,100,300]` (urgent) vs `[200,50,200]` (normal)
- Fulfillment screen: red border + URGENT banner on request card

---

## 8. Deployment

### Development

```bash
pnpm install
pnpm dev           # api on :3000, web on :5173 (Vite proxies /api + /socket.io)
```

- SQLite at `apps/api/prisma/dev.db`
- No HTTPS required (`localhost` is SW/push exempt)
- VAPID keys: `npx web-push generate-vapid-keys` → save to `.env`

### Production (LAN Server)

**One-time server setup:**
```bash
# Generate local SSL cert
mkcert -install
mkcert office.qpbd.local
# Move cert + key to docker/nginx/certs/

# Build and start
pnpm build
docker compose up -d

# Run DB migrations
docker compose exec api npx prisma migrate deploy
```

**Docker services (`docker-compose.yml`):**
```yaml
services:
  nginx:
    ports: ["443:443", "80:80"]
    # Terminates SSL, reverse proxies to api, serves React static build

  api:
    # NestJS, internal port 3000
    volumes: ["./data:/app/prisma/data"]   # SQLite file persists on host
```

**Nginx routing:**
```
https://office.qpbd.local/api/*        → api:3000 (REST)
https://office.qpbd.local/socket.io/*  → api:3000 (WebSocket upgrade)
https://office.qpbd.local/*            → React static build
http://office.qpbd.local/*             → 301 redirect to HTTPS
```

**Environment variables (`.env`):**
```
VAPID_PUBLIC_KEY=
VAPID_PRIVATE_KEY=
VAPID_MAILTO=admin@qpbd.local
DATABASE_URL=file:/app/prisma/data/prod.db
PORT=3000
```

### Per-Device Setup (one-time, ~2 minutes)

1. Install mkcert CA cert on device (Android: Settings → Security → Install certificate; iOS: Settings → General → VPN & Device Management)
2. Add `office.qpbd.local` → server LAN IP (via router DNS or device `/etc/hosts`)
3. Open `https://office.qpbd.local` in browser
4. Install PWA ("Add to Home Screen")
5. Open app, select Fulfillment role, tap "Enable Notifications"

---

## 9. Security Considerations

- **LAN-only** — not exposed to internet; attack surface is limited to office network
- **No auth** — acceptable for internal tool on private LAN; names are unverified strings
- **HTTPS enforced** — Nginx redirects all HTTP to HTTPS; HSTS header set
- **VAPID keys** — stored in `.env`, never committed to git; `.env.example` has empty placeholders
- **SQLite file** — volume-mounted outside container; permissions set to `600`
- **Input validation** — NestJS `ValidationPipe` with `class-validator` on all DTOs; `customText` max 500 chars; `category` validated against enum

---

## 10. Open Questions / Future Considerations

- **Category management:** Categories currently hardcoded in `data.js` / shared package. A future admin screen could allow adding/editing categories without a code deploy.
- **Multi-office:** Currently single-tenant. If QP adds more offices, a `tenantId` on `Request` and `PushSubscription` would segment data.
- **Request assignment:** Currently any fulfillment staff can claim a request. Future: assign to specific person.
- **Rate limiting:** No rate limiting on `POST /api/requests`. For 20–30 staff this is fine. If abuse becomes a concern, add per-IP throttle via NestJS `ThrottlerModule`.
