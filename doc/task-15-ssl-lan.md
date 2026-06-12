# Task 15 — mkcert SSL + LAN Hostname

**Status:** ⬜ Not started  
**Phase:** 5 — Infrastructure

---

## Description

One-time server setup for local HTTPS via mkcert. HTTPS required for Service Worker and Web Push to work.

## Acceptance Criteria

- [ ] `mkcert` installed on server
- [ ] Root CA installed: `mkcert -install`
- [ ] Cert generated for `office.qpbd.local`
- [ ] Cert + key placed at `docker/nginx/certs/`
- [ ] Router DNS (or `/etc/hosts`) maps `office.qpbd.local` → server LAN IP
- [ ] Nginx config references certs at correct path
- [ ] HSTS header set in Nginx

## Server Setup Commands

```bash
mkcert -install
mkcert office.qpbd.local
mv office.qpbd.local.pem docker/nginx/certs/cert.pem
mv office.qpbd.local-key.pem docker/nginx/certs/key.pem
```

## Per-Device Setup (one-time ~2 min each)

1. Install mkcert CA cert on device
   - Android: Settings → Security → Install certificate
   - iOS: Settings → General → VPN & Device Management → install, then trust in Settings → General → About → Certificate Trust Settings
2. Add `office.qpbd.local` → server LAN IP (router DNS or device hosts file)
3. Open `https://office.qpbd.local` in browser

## Notes

- If server LAN IP changes: update router DNS once (hostname stays stable)
- SQLite file permissions: `chmod 600 data/prod.db`
- Document per-device setup for staff
