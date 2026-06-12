# Task 03 — Shared Types Package

**Status:** ⬜ Not started  
**Phase:** 2 — Monorepo Setup

---

## Description

Create `packages/shared/` with TypeScript types shared between `apps/api` and `apps/web`. Eliminates duplication and ensures type safety across the monorepo.

## Acceptance Criteria

- [ ] `packages/shared/src/index.ts` exports all shared types
- [ ] `RequestDto` — shape for creating a request
- [ ] `RequestRecord` — full request shape from DB
- [ ] `Category` type — category config shape
- [ ] `Urgency` enum — `NORMAL | URGENT`
- [ ] `Status` enum — `PENDING | ACKNOWLEDGED | DONE`
- [ ] WS event payload types: `RequestNewPayload`, `RequestUpdatedPayload`
- [ ] Both `apps/api` and `apps/web` import from `@office/shared`

## Types to Define

```typescript
export enum Urgency { NORMAL = 'NORMAL', URGENT = 'URGENT' }
export enum Status  { PENDING = 'PENDING', ACKNOWLEDGED = 'ACKNOWLEDGED', DONE = 'DONE' }

export interface RequestDto {
  id: string          // client-generated nanoid
  requesterName: string
  category: string
  categoryEn: string
  categoryBn: string
  customText?: string
  urgency: Urgency
}

export interface RequestRecord extends RequestDto {
  status: Status
  createdAt: string
  updatedAt: string
}
```

## Files

- `packages/shared/package.json` — name: `@office/shared`
- `packages/shared/tsconfig.json`
- `packages/shared/src/index.ts`
