# Task 01 — Match Design: Update index.html

**Status:** ✅ Done  
**Phase:** 1 — Prototype

---

## Description

Update `index.html` to exactly match the exported design file from Claude Design (handoff bundle). The design file revealed 7 diffs from the current prototype.

## Changes Made

| # | Change | Reason |
|---|--------|--------|
| 1 | Material Symbols font: `display=swap` → `display=block` | Prevents FOIT (flash of invisible text) for icon font |
| 2 | Added `font-family: 'Material Symbols Rounded' !important` to `.material-symbols-rounded` | Prevents parent `font:` shorthand from overriding icon font |
| 3 | Added `font-style/weight: normal !important` | Same — prevents shorthand override |
| 4 | Added `letter-spacing: normal; text-transform: none; display: inline-block; white-space: nowrap` | Correct icon rendering on all browsers |
| 5 | Added `touch-action: manipulation` on `button, a, [role="button"]` | Removes 300ms tap delay on mobile |
| 6 | Added iOS safe-area CSS tokens (`--sat`, `--sab`) + `[data-scroll]` momentum scroll helper | iPhone notch/home bar support |
| 7 | Install banner: added `padding-bottom: max(14px, env(safe-area-inset-bottom))` + fixed `gap: 12px` (was `gap: 12` — invalid CSS) | Safe area on iPhone + layout fix |
| 8 | Cache-bust: `data.js?v=2` and `app.jsx?v=2` | Forces browser to reload after design updates |

## Files Changed

- `index.html`
