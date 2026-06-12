# Task 10 — Screens: NameEntry + RoleSelect

**Status:** ⬜ Not started  
**Phase:** 4 — Frontend

---

## Description

First two screens in the app flow. NameEntry persists name to `localStorage`. RoleSelect routes to Requester or Fulfillment.

## Screen Flow

```
NameEntry → RoleSelect → (Requester | Fulfillment)
```

## Acceptance Criteria

### NameEntry
- [ ] Text input for name (bilingual label: "Your Name — আপনার নাম")
- [ ] Restores `qp_user_name` from `localStorage` on mount
- [ ] "Continue" button disabled until name has ≥ 2 chars
- [ ] Saves name to `localStorage` on submit
- [ ] Routes to RoleSelect

### RoleSelect
- [ ] Two role cards: "I need something — আমার কিছু দরকার" and "I fulfill requests — আমি সাহায্য করব"
- [ ] Selecting a role immediately routes to correct screen
- [ ] Role is **not** persisted — re-selected each session

## Notes

- Match existing prototype visuals exactly (QP DS tokens + inline styles)
- No emoji in UI per design system guidelines

## Files

- `apps/web/src/screens/NameEntry.tsx`
- `apps/web/src/screens/RoleSelect.tsx`
