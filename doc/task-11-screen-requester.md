# Task 11 — Screens: Requester + Success

**Status:** ⬜ Not started  
**Phase:** 4 — Frontend

---

## Description

Requester screen lets staff pick a category and submit a request. Success screen confirms submission.

## Acceptance Criteria

### Requester Screen
- [ ] Category grid (7 categories from `data/categories`)
- [ ] Selecting a category shows optional custom text field (for `custom` category: required)
- [ ] Urgency toggle: Normal / Urgent (bilingual)
- [ ] Submit button disabled while sending
- [ ] `nanoid` generated once per form open as `requestId`
- [ ] Button disabled on first tap (prevents double-submit)
- [ ] `POST /api/requests` with full DTO
- [ ] On success → navigate to Success screen
- [ ] On error → show error, re-enable button for retry (form preserved)

### Success Screen
- [ ] Confirmation message (bilingual)
- [ ] Shows request summary (category + name)
- [ ] "Submit another request — আরেকটি অনুরোধ" button → back to Requester

## Edge Cases

- Network error: error banner shown, form not reset, button re-enabled
- Double-tap: button disabled after first click

## Files

- `apps/web/src/screens/Requester.tsx`
- `apps/web/src/screens/Success.tsx`
