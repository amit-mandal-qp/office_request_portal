# Task 06 — WebSocket Gateway (Socket.io)

**Status:** ⬜ Not started  
**Phase:** 3 — Backend

---

## Description

NestJS Socket.io gateway for real-time bidirectional communication. Broadcasts request events to all connected fulfillment clients.

## Acceptance Criteria

- [ ] `@WebSocketGateway` with CORS config for LAN
- [ ] `join:fulfillment` event — client registers to receive broadcasts
- [ ] `request:new` broadcast — emitted on new request (payload: full request)
- [ ] `request:updated` broadcast — emitted on status change (payload: `{ id, status }`)
- [ ] Gateway injectable into `RequestsService` for emitting
- [ ] Auto-reconnect handled client-side (Socket.io default)

## Events

**Client → Server:**
```
join:fulfillment  {}
```

**Server → Client:**
```
request:new      { request: RequestRecord }
request:updated  { id: string, status: Status }
```

## Files

- `apps/api/src/gateway/gateway.module.ts`
- `apps/api/src/gateway/app.gateway.ts`
