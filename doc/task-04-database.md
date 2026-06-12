# Task 04 — Prisma + SQLite Schema + Migrations

**Status:** ✅ Done  
**Phase:** 3 — Backend

---

## Description

Set up Prisma ORM with SQLite (WAL mode) in `apps/api`. Define the schema, run initial migration, and wire PrismaService into NestJS.

## Acceptance Criteria

- [x] `prisma/schema.prisma` matches the design spec
- [x] SQLite datasource with `WAL` journal mode pragma (via `$queryRawUnsafe` in `onModuleInit`)
- [x] `Request` model with all fields
- [x] `PushSubscription` model with all fields
- [x] `urgency` and `status` as `String` fields with defaults (Prisma 5 SQLite has no native enums; TypeScript enums in `packages/shared` cover type safety)
- [x] Initial migration created and applied (`prisma/migrations/20260612202640_init/`)
- [x] `PrismaService` injectable NestJS service (`@Global` module)
- [x] Dev DB at `apps/api/prisma/dev.db`
- [x] Prod DB path from `DATABASE_URL` env var

## Notes

- Downgraded to Prisma 5 (from 7) — Prisma 7 removed `url` from datasource and `datasources` from constructor, requiring driver adapters; too heavy for simple SQLite
- `$queryRawUnsafe('PRAGMA journal_mode=WAL')` used instead of `$executeRaw` because PRAGMA returns a result set in SQLite
- Schema uses `String` for urgency/status; `Urgency`/`Status` TypeScript enums in `packages/shared` enforce values at compile time
