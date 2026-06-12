# Task 08 — React + Vite + TypeScript Setup

**Status:** ⬜ Not started  
**Phase:** 4 — Frontend

---

## Description

Scaffold `apps/web/` with Vite + React 18 + TypeScript. Configure Vite dev proxy so `/api` and `/socket.io` route to the NestJS backend during development.

## Acceptance Criteria

- [ ] Vite project with React + TypeScript template
- [ ] `vite.config.ts` proxy: `/api` → `http://localhost:3000`, `/socket.io` → `http://localhost:3000`
- [ ] QP Design System assets copied from prototype (`_ds/` folder)
- [ ] Material Symbols Rounded font imported
- [ ] TanStack Query (`@tanstack/react-query`) installed
- [ ] Socket.io-client installed
- [ ] `@office/shared` package linked via pnpm workspace
- [ ] `pnpm dev` runs Vite with hot reload on `:5173`

## Dependencies

```json
{
  "react": "^18",
  "react-dom": "^18",
  "@tanstack/react-query": "^5",
  "socket.io-client": "^4",
  "nanoid": "^5",
  "@office/shared": "workspace:*"
}
```

## Proxy Config

```typescript
// vite.config.ts
proxy: {
  '/api': 'http://localhost:3000',
  '/socket.io': { target: 'http://localhost:3000', ws: true }
}
```
