# Task 05 — Requests Module (CRUD + WS Broadcast)

**Status:** ⬜ Not started  
**Phase:** 3 — Backend

---

## Description

NestJS `RequestsModule` implementing all REST endpoints for request lifecycle, plus WebSocket broadcast on create/update.

## Acceptance Criteria

- [ ] `POST /api/requests` — idempotent upsert by `id` (nanoid from client)
- [ ] `GET /api/requests/active` — all where `status != DONE`
- [ ] `PATCH /api/requests/:id/status` — update `ACKNOWLEDGED | DONE`
- [ ] `ValidationPipe` + `class-validator` DTOs on all inputs
- [ ] `customText` max 500 chars validation
- [ ] `category` validated against allowed values
- [ ] On `POST`: emit `request:new` WS event to all fulfillment clients
- [ ] On `PATCH`: emit `request:updated` WS event to all clients
- [ ] On `POST`: send VAPID push to all active subscriptions
- [ ] Response 201 with created request on `POST`

## Endpoints

| Method | Path | Body | Response |
|--------|------|------|----------|
| `POST` | `/api/requests` | `RequestDto` | `201 RequestRecord` |
| `GET` | `/api/requests/active` | — | `RequestRecord[]` |
| `PATCH` | `/api/requests/:id/status` | `{ status }` | `RequestRecord` |

## Files

- `apps/api/src/requests/requests.module.ts`
- `apps/api/src/requests/requests.controller.ts`
- `apps/api/src/requests/requests.service.ts`
- `apps/api/src/requests/dto/create-request.dto.ts`
- `apps/api/src/requests/dto/update-status.dto.ts`
