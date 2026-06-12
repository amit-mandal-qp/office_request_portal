# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the App

No build step. Serve any HTTP server from this directory (service worker requires HTTP, not `file://`):

```bash
python3 -m http.server 8080
# or
npx serve .
```

Open `http://localhost:8080`.

## Architecture

**Zero-toolchain PWA** — React 18 + JSX run entirely in-browser via CDN UMD bundles and Babel standalone. No npm, no bundler, no TypeScript.

| File | Role |
|------|------|
| `index.html` | Entry point: loads all deps, splash screen, PWA install banner, registers SW |
| `app.jsx` | Full React SPA — all screens and components in one file |
| `data.js` | Exposes `window.AppData`: category config + `localStorage` CRUD helpers |
| `sw.js` | Service worker: cache-first shell, push notification display, notification-click routing |
| `_ds/` | Vendored QuestionPro Design System (CSS tokens + React component bundle) |

### Screen Flow

```
name → role → request → success
              └──→ fulfillment
```

`localStorage` keys `qp_user_name` and `qp_user_role` persist sessions across reloads. The `App` component restores state on mount and routes to the correct screen.

### Data Layer

All request data lives in `localStorage` under key `qp_requests` as a JSON array. `window.AppData` methods (`getAll`, `getActive`, `add`, `update`) are the only interface. No server, no backend.

Request shape:
```js
{
  id, name, category, categoryEn, categoryBn, categoryIcon,
  customText, urgency,  // 'normal' | 'urgent'
  status,              // 'pending' | 'acknowledged' | 'done'
  timestamp
}
```

### Design System

Loaded from `_ds/questionpro-design-system-8f51d4ab-dac4-4db7-9f1f-921e9f066bfb/`. Exposes `window.QuestionProDesignSystem_8f51d4` (React primitives: `Button`, `Card`, `Input`, `Chip`, `Avatar`). In practice `app.jsx` uses mostly inline styles against design tokens.

**CSS tokens to use** (defined in `_ds/tokens/`):
- Colors: `--qp-dark-blue`, `--qp-electric-blue`, `--qp-gray-10/25/40/100/lead`, `--qp-upgrade`, semantic pairs (`--qp-success-deep/soft`, `--qp-info-deep/soft`)
- Type: `--text-heading-01` through `--text-body-03`, `--text-button-sm/lg`, `--text-subtitle-02`
- Spacing: `--spacing-*` tokens (baseline: 8/12/16/24/32px)
- Radii: `--radius-sm/md/lg/pill`
- Font: `--font-sans` (Fira Sans, weights 300/400/500 only)

Icons are **Material Symbols Rounded** (`<span className="material-symbols-rounded">`), substituting for the proprietary Wick icon font.

The `S` object in `app.jsx` holds reusable inline-style tokens (`S.card`, `S.ghostBtn`, `S.primaryBtn(disabled)`, `S.icon(size, color)`).

### Real-time Updates

`FulfillmentScreen` polls `localStorage` every 6 s and listens to the `storage` event for cross-tab updates. No WebSockets or server push — all coordination is via shared `localStorage`.

Notifications flow: requester submit → `fireNotification()` → calls `Notification` API directly + posts `NEW_REQUEST` message to service worker → SW calls `showNotification()`.

## Key Conventions

- **Bilingual strings everywhere**: labels show `English — বাংলা` paired text. All new UI strings need both.
- **No comments explaining what code does** — only add a comment when the why is non-obvious.
- **Inline styles** are the pattern here (not CSS classes). New components should follow the same style; match existing token variable names exactly.
- **No emoji in UI** per QP design system guidelines.
- To update the SW cache version after changing shell assets, bump `CACHE` in `sw.js` (`'qp-office-v1'` → `'qp-office-v2'`, etc.).
