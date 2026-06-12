# Task 14 — Docker + Nginx Setup

**Status:** ⬜ Not started  
**Phase:** 5 — Infrastructure

---

## Description

Production Docker Compose setup with Nginx reverse proxy for LAN deployment.

## Acceptance Criteria

- [ ] `docker/Dockerfile.api` — NestJS production image (Node Alpine)
- [ ] `docker-compose.yml` — production: nginx + api services
- [ ] `docker-compose.dev.yml` — local dev: hot reload
- [ ] Nginx routes: `/api/*` → `api:3000`, `/socket.io/*` → `api:3000` (WS upgrade), `/*` → React static build
- [ ] HTTP → HTTPS 301 redirect
- [ ] SQLite volume-mounted: `./data:/app/prisma/data`
- [ ] `pnpm build` produces React static build for nginx to serve

## Docker Services

```yaml
services:
  nginx:
    ports: ["443:443", "80:80"]
  api:
    # internal :3000
    volumes: ["./data:/app/prisma/data"]
```

## Nginx Routing

```
https://office.qpbd.local/api/*        → api:3000
https://office.qpbd.local/socket.io/*  → api:3000 (WS upgrade)
https://office.qpbd.local/*            → React static build
http://office.qpbd.local/*             → 301 HTTPS redirect
```

## Files

- `docker/Dockerfile.api`
- `docker/nginx/nginx.conf`
- `docker-compose.yml`
- `docker-compose.dev.yml`
