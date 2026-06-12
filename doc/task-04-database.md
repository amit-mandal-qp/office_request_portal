# Task 04 — Prisma + SQLite Schema + Migrations

**Status:** ⬜ Not started  
**Phase:** 3 — Backend

---

## Description

Set up Prisma ORM with SQLite (WAL mode) in `apps/api`. Define the schema, run initial migration, and wire PrismaService into NestJS.

## Acceptance Criteria

- [ ] `prisma/schema.prisma` matches the design spec exactly
- [ ] SQLite datasource with `WAL` journal mode pragma
- [ ] `Request` model with all fields
- [ ] `PushSubscription` model with all fields
- [ ] `Urgency` and `Status` enums defined
- [ ] Initial migration created and applied
- [ ] `PrismaService` injectable NestJS service
- [ ] Dev DB at `apps/api/prisma/dev.db`
- [ ] Prod DB path from `DATABASE_URL` env var

## Schema

```prisma
model Request {
  id            String   @id
  requesterName String
  category      String
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
  endpoint    String   @unique
  p256dh      String
  auth        String
  deviceName  String?
  createdAt   DateTime @default(now())
}

enum Urgency { NORMAL URGENT }
enum Status  { PENDING ACKNOWLEDGED DONE }
```

## Commands

```bash
npx prisma migrate dev --name init
npx prisma generate
```
