# Task 02 — Init pnpm Monorepo + Turborepo

**Status:** ✅ Done  
**Phase:** 2 — Monorepo Setup

---

## Description

Scaffold the monorepo structure with pnpm workspaces and Turborepo. This is the foundation for all subsequent backend and frontend work.

## Acceptance Criteria

- [x] `pnpm-workspace.yaml` defines `apps/*` and `packages/*`
- [x] Root `package.json` with pnpm workspace + Turborepo dev dependency
- [x] `turbo.json` with pipeline: `build`, `dev`, `lint`
- [x] `apps/api/` directory with NestJS scaffold (`nest new`)
- [x] `apps/web/` directory with Vite + React + TypeScript scaffold
- [x] `packages/shared/` directory for shared types
- [x] `.env.example` with all required env vars
- [x] `pnpm dev` starts both api (`:3000`) and web (`:5173`) concurrently — requires `pnpm approve-builds` once (pnpm 11 security gate for `unrs-resolver`)

## Notes

- pnpm 11.6.0 + Node 24.13.0
- NestJS 11, Vite 8, React 18 (TypeScript strict)
- `.npmrc` has `dangerously-allow-all-builds=true` and `confirmModulesPurge=false`
- **One-time setup:** Run `pnpm approve-builds` from project root (needs TTY) to approve `unrs-resolver` build scripts

## Structure

```
office-request-portal/
├── apps/
│   ├── api/           # NestJS 11 (strict TS)
│   └── web/           # Vite 8 + React 18 + TS
├── packages/
│   └── shared/        # @office/shared — workspace linked in both apps
├── turbo.json
├── pnpm-workspace.yaml
├── .npmrc
├── .env.example
└── package.json
```
