# Task 12 — Screen: Fulfillment + Required Push Subscription UX

**Status:** ⬜ Not started  
**Phase:** 4 — Frontend

---

## Description

Fulfillment screen shows all active requests in real-time. Requires push subscription before showing requests — staff must enable notifications to proceed.

## Acceptance Criteria

### Push Subscription Gate (required, blocking)
- [ ] On mount: check `usePushSubscription().needsSubscription`
- [ ] If `needsSubscription = true`: show blocking banner instead of request list
- [ ] Banner content (bilingual):
  - Heading: "Enable Notifications to Continue — বিজ্ঞপ্তি চালু করুন"
  - Body: "You need notifications to receive request alerts — অনুরোধ পেতে বিজ্ঞপ্তি প্রয়োজন"
  - Button: "Enable Notifications — বিজ্ঞপ্তি চালু করুন"
- [ ] On button tap: call `subscribe()`
- [ ] While subscribing: button shows loading state, disabled
- [ ] On permission denied: show error "Notifications blocked. Enable in browser settings — ব্রাউজার সেটিংস থেকে অনুমতি দিন" + retry button
- [ ] iOS < 16.4: show info banner "Update to iOS 16.4+ for background notifications"
- [ ] Once subscribed: dismiss gate, show request list

### Request List
- [ ] Uses `useRequests()` — loads from `GET /api/requests/active` on mount
- [ ] Real-time updates via `request:new` and `request:updated` WS events
- [ ] Empty state: "No pending requests — কোনো অনুরোধ নেই"
- [ ] Each request card shows: requester name, category (bilingual), time ago, urgency badge
- [ ] Urgent requests: red border + "URGENT — জরুরি" badge
- [ ] "Acknowledge — গ্রহণ করুন" button → `PATCH /api/requests/:id/status ACKNOWLEDGED`
- [ ] "Done — সম্পন্ন" button → `PATCH /api/requests/:id/status DONE` → card removed from list

## Files

- `apps/web/src/screens/Fulfillment.tsx`
- `apps/web/src/hooks/usePushSubscription.ts` (see task-09)
