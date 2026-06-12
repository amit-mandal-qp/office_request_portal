# Task 03 — Shared Types Package

**Status:** ✅ Done  
**Phase:** 2 — Monorepo Setup

---

## Description

Created `packages/shared/src/index.ts` with all shared TypeScript types for use by both `apps/api` and `apps/web`.

## Acceptance Criteria

- [x] `packages/shared/src/index.ts` exports all shared types
- [x] `RequestDto` — shape for creating a request
- [x] `RequestRecord` — full request shape from DB
- [x] `Category` type — category config shape
- [x] `Urgency` enum — `NORMAL | URGENT`
- [x] `Status` enum — `PENDING | ACKNOWLEDGED | DONE`
- [x] WS event payload types: `RequestNewPayload`, `RequestUpdatedPayload`
- [x] Both `apps/api` and `apps/web` import from `@office/shared` (workspace linked)

## Types Defined

```typescript
export enum Urgency { NORMAL = 'NORMAL', URGENT = 'URGENT' }
export enum Status  { PENDING = 'PENDING', ACKNOWLEDGED = 'ACKNOWLEDGED', DONE = 'DONE' }

export interface Category { id, en, bn, icon, color, bg }

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

export interface RequestNewPayload { request: RequestRecord }
export interface RequestUpdatedPayload { id: string; status: Status }
```

## Files Changed

- `packages/shared/src/index.ts` — all shared types
