# Monorepo Setup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold a pnpm + Turborepo monorepo with NestJS API, React+Vite web app, and shared types package — all runnable with `pnpm dev`.

**Architecture:** Single root with `apps/api` (NestJS) and `apps/web` (Vite+React+TS) as workspaces. `packages/shared` holds TypeScript types imported by both. Turborepo orchestrates build/dev pipelines.

**Tech Stack:** pnpm workspaces, Turborepo 2.x, NestJS 11, React 18 + Vite 6, TypeScript 5 strict

**Working directory:** `/home/amit/Downloads/Office Request Portal` (note: spaces in path — always quote)

---

## File Map

| Action | Path | Purpose |
|--------|------|---------|
| Create | `package.json` | Monorepo root — workspace + turbo dep |
| Create | `pnpm-workspace.yaml` | Declares `apps/*` and `packages/*` |
| Create | `turbo.json` | Pipeline: build, dev, lint |
| Create | `.env.example` | All required env vars documented |
| Create | `.gitignore` | Node modules, dist, env files |
| Scaffold | `apps/api/` | NestJS via `nest new` |
| Scaffold | `apps/web/` | Vite React-TS via `pnpm create vite` |
| Create | `packages/shared/package.json` | `@office/shared` package |
| Create | `packages/shared/tsconfig.json` | Strict TS config |
| Create | `packages/shared/src/index.ts` | Barrel export (placeholder for task 03) |

---

## Task 1: Install pnpm

**Files:** none

- [ ] **Step 1: Install pnpm globally**

```bash
npm install -g pnpm
```

- [ ] **Step 2: Verify**

```bash
pnpm --version
```

Expected output: `9.x.x` (or similar recent version)

---

## Task 2: Create Root Monorepo Config

**Files:**
- Create: `package.json`
- Create: `pnpm-workspace.yaml`
- Create: `turbo.json`
- Create: `.gitignore`

- [ ] **Step 1: Create root `package.json`**

File: `package.json`
```json
{
  "name": "office-request-portal",
  "private": true,
  "scripts": {
    "dev": "turbo run dev --parallel",
    "build": "turbo run build",
    "lint": "turbo run lint"
  },
  "devDependencies": {
    "turbo": "latest"
  },
  "engines": {
    "node": ">=20",
    "pnpm": ">=9"
  }
}
```

- [ ] **Step 2: Create `pnpm-workspace.yaml`**

File: `pnpm-workspace.yaml`
```yaml
packages:
  - "apps/*"
  - "packages/*"
```

- [ ] **Step 3: Create `turbo.json`**

File: `turbo.json`
```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {}
  }
}
```

- [ ] **Step 4: Create `.gitignore`**

File: `.gitignore`
```
node_modules/
dist/
.env
*.db
*.db-journal
*.db-wal
*.db-shm
.turbo/
```

- [ ] **Step 5: Verify files exist**

```bash
ls package.json pnpm-workspace.yaml turbo.json .gitignore
```

Expected: all 4 files listed

---

## Task 3: Scaffold NestJS API

**Files:**
- Scaffold: `apps/api/` (via `nest new`)

- [ ] **Step 1: Create `apps/` directory**

```bash
mkdir -p "apps"
```

- [ ] **Step 2: Scaffold NestJS app**

```bash
cd "/home/amit/Downloads/Office Request Portal" && nest new apps/api --package-manager pnpm --skip-git --strict
```

Expected: NestJS CLI creates `apps/api/` with full scaffold including `src/`, `test/`, `package.json`, `tsconfig.json`.

- [ ] **Step 3: Verify NestJS scaffold**

```bash
ls "apps/api/src/"
```

Expected: `app.controller.spec.ts  app.controller.ts  app.module.ts  app.service.ts  main.ts`

- [ ] **Step 4: Test NestJS starts**

```bash
cd "/home/amit/Downloads/Office Request Portal/apps/api" && pnpm run start:dev &
sleep 5 && curl -s http://localhost:3000 && kill %1
```

Expected: `Hello World!` (NestJS default response)

- [ ] **Step 5: Commit**

```bash
cd "/home/amit/Downloads/Office Request Portal"
git add apps/api/
git commit -m "feat: scaffold NestJS API app"
```

---

## Task 4: Scaffold Vite Web App

**Files:**
- Scaffold: `apps/web/` (via `pnpm create vite`)

- [ ] **Step 1: Scaffold Vite React-TS app**

```bash
cd "/home/amit/Downloads/Office Request Portal" && pnpm create vite apps/web --template react-ts
```

When prompted for project name, type `.` (current dir) or accept `apps/web`.

- [ ] **Step 2: Verify Vite scaffold**

```bash
ls "apps/web/src/"
```

Expected: `App.css  App.tsx  assets/  index.css  main.tsx  vite-env.d.ts`

- [ ] **Step 3: Install web dependencies**

```bash
cd "/home/amit/Downloads/Office Request Portal/apps/web" && pnpm install
```

- [ ] **Step 4: Test Vite dev server starts**

```bash
cd "/home/amit/Downloads/Office Request Portal/apps/web" && pnpm run dev &
sleep 4 && curl -s http://localhost:5173 | head -5 && kill %1
```

Expected: HTML with `<div id="root">` in output

- [ ] **Step 5: Commit**

```bash
cd "/home/amit/Downloads/Office Request Portal"
git add apps/web/
git commit -m "feat: scaffold Vite React-TS web app"
```

---

## Task 5: Create Shared Types Package

**Files:**
- Create: `packages/shared/package.json`
- Create: `packages/shared/tsconfig.json`
- Create: `packages/shared/src/index.ts`

- [ ] **Step 1: Create shared package directory**

```bash
mkdir -p "packages/shared/src"
```

- [ ] **Step 2: Create `packages/shared/package.json`**

File: `packages/shared/package.json`
```json
{
  "name": "@office/shared",
  "version": "0.0.1",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "lint": "tsc --noEmit"
  }
}
```

- [ ] **Step 3: Create `packages/shared/tsconfig.json`**

File: `packages/shared/tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "declaration": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*"]
}
```

- [ ] **Step 4: Create `packages/shared/src/index.ts` (placeholder)**

File: `packages/shared/src/index.ts`
```typescript
// Shared types — populated in task-03-shared-types
export {};
```

- [ ] **Step 5: Commit**

```bash
cd "/home/amit/Downloads/Office Request Portal"
git add packages/
git commit -m "feat: add shared types package scaffold"
```

---

## Task 6: Link Shared Package into Apps

**Files:**
- Modify: `apps/api/package.json`
- Modify: `apps/web/package.json`

- [ ] **Step 1: Add `@office/shared` to API dependencies**

In `apps/api/package.json`, add to `"dependencies"`:
```json
"@office/shared": "workspace:*"
```

- [ ] **Step 2: Add `@office/shared` to Web dependencies**

In `apps/web/package.json`, add to `"dependencies"`:
```json
"@office/shared": "workspace:*"
```

- [ ] **Step 3: Install from workspace root to link packages**

```bash
cd "/home/amit/Downloads/Office Request Portal" && pnpm install
```

- [ ] **Step 4: Verify workspace link**

```bash
ls "apps/api/node_modules/@office/"
ls "apps/web/node_modules/@office/"
```

Expected: `shared` symlink in both

- [ ] **Step 5: Commit**

```bash
cd "/home/amit/Downloads/Office Request Portal"
git add apps/api/package.json apps/web/package.json pnpm-lock.yaml
git commit -m "feat: link @office/shared into api and web apps"
```

---

## Task 7: Create `.env.example`

**Files:**
- Create: `.env.example`

- [ ] **Step 1: Create `.env.example`**

File: `.env.example`
```
# NestJS API
PORT=3000
NODE_ENV=development

# Database (SQLite)
DATABASE_URL=file:./prisma/dev.db

# VAPID keys — generate with: npx web-push generate-vapid-keys
VAPID_PUBLIC_KEY=
VAPID_PRIVATE_KEY=
VAPID_MAILTO=admin@qpbd.local
```

- [ ] **Step 2: Create `.env` from example for local dev**

```bash
cd "/home/amit/Downloads/Office Request Portal" && cp .env.example .env
```

- [ ] **Step 3: Verify `.env` not tracked by git**

```bash
grep ".env" .gitignore
```

Expected: `.env` listed

- [ ] **Step 4: Commit**

```bash
cd "/home/amit/Downloads/Office Request Portal"
git add .env.example
git commit -m "chore: add .env.example with all required vars"
```

---

## Task 8: Wire Root `pnpm dev` Command

**Files:**
- Modify: `apps/api/package.json` (verify `dev` script exists)
- Modify: `apps/web/package.json` (verify `dev` script exists)

- [ ] **Step 1: Check API `dev` script**

```bash
cat "apps/api/package.json" | grep '"dev"'
```

Expected: `"dev": "nest start --watch"` (or similar hot-reload command)

- [ ] **Step 2: Check Web `dev` script**

```bash
cat "apps/web/package.json" | grep '"dev"'
```

Expected: `"dev": "vite"`

- [ ] **Step 3: Run root `pnpm dev` to verify both start**

```bash
cd "/home/amit/Downloads/Office Request Portal" && pnpm dev &
sleep 8
curl -s http://localhost:3000 | head -3
curl -s http://localhost:5173 | head -3
kill %1
```

Expected: API returns `Hello World!`, web returns HTML

- [ ] **Step 4: Update task tracker**

In `doc/task-02-monorepo-setup.md`, check off all acceptance criteria and set status to ✅ Done.

In `doc/README.md`, update task 02 status to ✅.

- [ ] **Step 5: Final commit**

```bash
cd "/home/amit/Downloads/Office Request Portal"
git add doc/task-02-monorepo-setup.md doc/README.md
git commit -m "chore: mark task-02 monorepo setup complete"
```

---

## Acceptance Checklist (verify before marking done)

- [ ] `pnpm-workspace.yaml` defines `apps/*` and `packages/*`
- [ ] Root `package.json` with `turbo` devDependency
- [ ] `turbo.json` with `build`, `dev`, `lint` tasks
- [ ] `apps/api/` — NestJS scaffold running on `:3000`
- [ ] `apps/web/` — Vite+React+TS scaffold running on `:5173`
- [ ] `packages/shared/` — `@office/shared` package linked in both apps
- [ ] `.env.example` with all 6 required vars
- [ ] `pnpm dev` from root starts both apps concurrently
