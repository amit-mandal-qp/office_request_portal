import { usePushSubscription } from '../hooks/usePushSubscription'
import { useRequests } from '../hooks/useRequests'
import { Status } from '@office/shared'
import type { RequestRecord } from '@office/shared'

function timeAgo(iso: string): string {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
  if (s < 5) return 'Just now'
  if (s < 60) return `${s}s ago`
  if (s < 3600) return `${Math.floor(s / 60)} min ago`
  return `${Math.floor(s / 3600)}h ago`
}

const S = {
  page: {
    minHeight: '100dvh',
    padding: 'var(--spacing-24)',
    background: 'var(--qp-gray-10)',
    fontFamily: 'var(--font-sans)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-12)',
    marginBottom: 'var(--spacing-24)',
  },
  heading: {
    fontSize: 'var(--text-heading-02)',
    fontWeight: 500,
    color: 'var(--qp-dark-blue)',
    margin: 0,
  },
  gate: {
    background: '#fff',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--spacing-32)',
    maxWidth: 420,
    margin: '80px auto 0',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: 'var(--spacing-16)',
    textAlign: 'center' as const,
  },
  gateIcon: { fontSize: 48, color: 'var(--qp-electric-blue)' },
  gateHeading: {
    fontSize: 'var(--text-heading-02)',
    fontWeight: 500,
    color: 'var(--qp-dark-blue)',
    margin: 0,
  },
  gateSub: {
    fontSize: 'var(--text-body-02)',
    color: 'var(--qp-gray-lead)',
    margin: 0,
  },
  gateBtn: (loading: boolean) => ({
    padding: '14px 32px',
    borderRadius: 'var(--radius-pill)',
    border: 'none',
    background: loading ? 'var(--qp-gray-25)' : 'var(--qp-electric-blue)',
    color: loading ? 'var(--qp-gray-40)' : '#fff',
    fontSize: 'var(--text-button-lg)',
    fontFamily: 'var(--font-sans)',
    fontWeight: 500,
    cursor: loading ? 'not-allowed' : 'pointer',
    width: '100%',
  }),
  errorBanner: {
    background: '#FFEBEE',
    border: '1px solid #E53935',
    borderRadius: 'var(--radius-md)',
    padding: 'var(--spacing-12)',
    color: '#C62828',
    fontSize: 'var(--text-body-03)',
    width: '100%',
    boxSizing: 'border-box' as const,
  },
  list: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 'var(--spacing-12)',
    maxWidth: 560,
    margin: '0 auto',
  },
  reqCard: (urgent: boolean) => ({
    background: '#fff',
    borderRadius: 'var(--radius-lg)',
    border: `2px solid ${urgent ? '#E53935' : 'transparent'}`,
    padding: 'var(--spacing-20)',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 'var(--spacing-12)',
  }),
  reqTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  reqName: {
    fontSize: 'var(--text-body-01)',
    fontWeight: 500,
    color: 'var(--qp-dark-blue)',
    margin: 0,
  },
  reqCategory: {
    fontSize: 'var(--text-body-02)',
    color: 'var(--qp-gray-lead)',
    margin: '2px 0 0',
  },
  urgentBadge: {
    background: '#FFEBEE',
    color: '#E53935',
    borderRadius: 'var(--radius-sm)',
    padding: '2px 8px',
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 0.5,
  },
  timeAgo: {
    fontSize: 'var(--text-body-03)',
    color: 'var(--qp-gray-40)',
    margin: 0,
  },
  actions: {
    display: 'flex',
    gap: 'var(--spacing-8)',
  },
  ackBtn: {
    flex: 1,
    padding: '10px',
    borderRadius: 'var(--radius-md)',
    border: '2px solid var(--qp-electric-blue)',
    background: '#fff',
    color: 'var(--qp-electric-blue)',
    fontSize: 'var(--text-button-sm)',
    fontFamily: 'var(--font-sans)',
    fontWeight: 500,
    cursor: 'pointer',
  },
  doneBtn: {
    flex: 1,
    padding: '10px',
    borderRadius: 'var(--radius-md)',
    border: 'none',
    background: 'var(--qp-success-soft)',
    color: 'var(--qp-success-deep)',
    fontSize: 'var(--text-button-sm)',
    fontFamily: 'var(--font-sans)',
    fontWeight: 500,
    cursor: 'pointer',
  },
  empty: {
    textAlign: 'center' as const,
    color: 'var(--qp-gray-40)',
    fontSize: 'var(--text-body-02)',
    paddingTop: 60,
  },
}

function RequestCard({ req, onUpdateStatus }: { req: RequestRecord; onUpdateStatus: (id: string, status: Status) => void }) {
  const urgent = req.urgency === 'URGENT'
  return (
    <div style={S.reqCard(urgent)}>
      <div style={S.reqTop}>
        <div>
          <p style={S.reqName}>{req.requesterName}</p>
          <p style={S.reqCategory}>{req.categoryEn} — {req.categoryBn}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
          {urgent && <span style={S.urgentBadge}>URGENT — জরুরি</span>}
          <p style={S.timeAgo}>{timeAgo(req.createdAt)}</p>
        </div>
      </div>
      {req.customText && (
        <p style={{ fontSize: 'var(--text-body-03)', color: 'var(--qp-gray-lead)', margin: 0 }}>
          {req.customText}
        </p>
      )}
      <div style={S.actions}>
        {req.status === Status.PENDING && (
          <button style={S.ackBtn} onClick={() => onUpdateStatus(req.id, Status.ACKNOWLEDGED)}>
            Acknowledge — গ্রহণ করুন
          </button>
        )}
        <button style={S.doneBtn} onClick={() => onUpdateStatus(req.id, Status.DONE)}>
          Done — সম্পন্ন
        </button>
      </div>
    </div>
  )
}

export default function Fulfillment({ userName: _userName }: { userName: string }) {
  const { needsSubscription, subscribing, subscribe, error } = usePushSubscription()
  const { requests, isLoading, updateStatus } = useRequests()

  const isIosOld =
    /iphone|ipad|ipod/i.test(navigator.userAgent) &&
    !/(os 1[6-9]_|os [2-9][0-9]_)/i.test(navigator.userAgent)

  if (needsSubscription) {
    return (
      <div style={S.page}>
        <div style={S.gate}>
          <span className="material-symbols-rounded" style={S.gateIcon}>notifications</span>
          <h2 style={S.gateHeading}>Enable Notifications to Continue — বিজ্ঞপ্তি চালু করুন</h2>
          <p style={S.gateSub}>
            You need notifications to receive request alerts — অনুরোধ পেতে বিজ্ঞপ্তি প্রয়োজন
          </p>
          {isIosOld && (
            <div style={{ ...S.errorBanner, background: '#FFF9C4', border: '1px solid #F9A825', color: '#5D4037' }}>
              Update to iOS 16.4+ for background notifications
            </div>
          )}
          {error && <div style={S.errorBanner}>{error}</div>}
          <button style={S.gateBtn(subscribing)} disabled={subscribing} onClick={subscribe}>
            {subscribing ? 'Enabling...' : 'Enable Notifications — বিজ্ঞপ্তি চালু করুন'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={S.page}>
      <div style={S.header}>
        <span className="material-symbols-rounded" style={{ fontSize: 28, color: 'var(--qp-electric-blue)' }}>
          inbox
        </span>
        <h1 style={S.heading}>Requests — অনুরোধসমূহ</h1>
      </div>

      {isLoading ? (
        <p style={S.empty}>Loading... — লোড হচ্ছে...</p>
      ) : requests.length === 0 ? (
        <p style={S.empty}>No pending requests — কোনো অনুরোধ নেই</p>
      ) : (
        <div style={S.list}>
          {requests.map((req) => (
            <RequestCard key={req.id} req={req} onUpdateStatus={updateStatus} />
          ))}
        </div>
      )}
    </div>
  )
}
