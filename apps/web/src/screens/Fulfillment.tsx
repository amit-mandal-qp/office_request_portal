import { usePushSubscription } from '../hooks/usePushSubscription'
import { useRequests } from '../hooks/useRequests'
import { Status } from '@office/shared'
import type { RequestRecord } from '@office/shared'
import { playNotificationSound } from '../utils/sound'

const CAT_META: Record<string, { icon: string; color: string }> = {
  tea_coffee:   { icon: 'local_cafe',        color: '#7B4F2E' },
  chanachur:    { icon: 'fastfood',          color: '#D4652A' },
  supplies:     { icon: 'inventory_2',       color: '#1B87E6' },
  it_help:      { icon: 'computer',         color: '#6B4EAF' },
  meeting:      { icon: 'meeting_room',     color: '#1B6FA3' },
  housekeeping: { icon: 'cleaning_services',color: '#2E8B57' },
  custom:       { icon: 'add_circle',       color: '#545E6B' },
}

function timeAgo(iso: string): string {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
  if (s < 5)    return 'Just now'
  if (s < 60)   return `${s}s ago`
  if (s < 3600) return `${Math.floor(s / 60)} min ago`
  return `${Math.floor(s / 3600)}h ago`
}

const ghostBtn: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 6,
  padding: '7px 14px',
  background: 'var(--qp-surface)',
  border: '1.5px solid var(--qp-gray-40)',
  borderRadius: 'var(--radius-md)',
  font: 'var(--text-button-sm)',
  color: 'var(--qp-gray-lead)',
  cursor: 'pointer',
  transition: 'border-color .12s',
}

function RequestItem({ req, onUpdateStatus }: { req: RequestRecord; onUpdateStatus: (id: string, status: Status) => void }) {
  const catMeta = CAT_META[req.category]
  const isUrgent = req.urgency === 'URGENT'
  const isAcked = req.status === Status.ACKNOWLEDGED

  return (
    <div style={{
      background: 'var(--qp-surface)',
      border: `1.5px solid ${isUrgent ? 'var(--qp-upgrade)' : 'var(--qp-gray-40)'}`,
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
    }}>
      {isUrgent && (
        <div style={{ background: 'var(--qp-upgrade)', color: 'white', padding: '5px 14px', font: 'var(--text-body-03)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span className="material-symbols-rounded" style={{ fontSize: 14 }}>priority_high</span>
          URGENT — জরুরি
        </div>
      )}

      <div style={{ padding: '12px 14px' }}>
        {/* Requester row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#1B3380', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', font: 'var(--text-subtitle-02)', fontWeight: 500, flexShrink: 0 }}>
              {req.requesterName.charAt(0).toUpperCase()}
            </div>
            <div>
              <div style={{ font: 'var(--text-heading-04)', color: 'var(--qp-dark-blue)' }}>{req.requesterName}</div>
              <div style={{ font: 'var(--text-body-03)', color: 'var(--qp-gray-100)' }}>{timeAgo(req.createdAt)}</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {catMeta && <span className="material-symbols-rounded" style={{ fontSize: 18, color: catMeta.color }}>{catMeta.icon}</span>}
            <div style={{ textAlign: 'right' }}>
              <div style={{ font: 'var(--text-subtitle-02)', color: 'var(--qp-dark-blue)', fontWeight: 500 }}>{req.categoryEn}</div>
              <div style={{ font: 'var(--text-body-03)', color: 'var(--qp-gray-100)' }}>{req.categoryBn}</div>
            </div>
          </div>
        </div>

        {req.customText && (
          <div style={{ font: 'var(--text-body-02)', color: 'var(--qp-gray-lead)', background: 'var(--qp-gray-10)', borderRadius: 'var(--radius-sm)', padding: '7px 10px', marginBottom: 10 }}>
            {req.customText}
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {!isAcked ? (
            <button onClick={() => onUpdateStatus(req.id, Status.ACKNOWLEDGED)} style={ghostBtn}>
              <span className="material-symbols-rounded" style={{ fontSize: 15 }}>thumb_up</span>
              Acknowledge — গ্রহণ করুন
            </button>
          ) : (
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, font: 'var(--text-body-02)', color: 'var(--qp-success-deep)' }}>
              <span className="material-symbols-rounded" style={{ fontSize: 16, fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              Acknowledged
            </span>
          )}
          <button
            onClick={() => onUpdateStatus(req.id, Status.DONE)}
            style={{ ...ghostBtn, marginLeft: 'auto', background: 'var(--qp-success-deep)', border: 'none', color: 'white' }}
          >
            <span className="material-symbols-rounded" style={{ fontSize: 15 }}>task_alt</span>
            Done — সম্পন্ন
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Fulfillment({ userName: _userName }: { userName: string }) {
  const { needsSubscription, subscribing, subscribe, error: pushError } = usePushSubscription()
  const { requests, isLoading, updateStatus } = useRequests(req => playNotificationSound(req.urgency))

  const isIosOld = /iphone|ipad|ipod/i.test(navigator.userAgent) && !/(os 1[6-9]_|os [2-9][0-9]_)/i.test(navigator.userAgent)

  if (needsSubscription) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--qp-info-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <span className="material-symbols-rounded" style={{ fontSize: 36, color: 'var(--qp-electric-blue)' }}>notifications</span>
        </div>
        <div style={{ font: 'var(--text-heading-03)', color: 'var(--qp-dark-blue)', marginBottom: 8 }}>Enable Notifications to Continue</div>
        <div style={{ font: 'var(--text-heading-04)', color: 'var(--qp-gray-lead)', marginBottom: 6 }}>বিজ্ঞপ্তি চালু করুন</div>
        <div style={{ font: 'var(--text-body-02)', color: 'var(--qp-gray-lead)', marginBottom: 24, maxWidth: 300 }}>
          You need notifications to receive request alerts — অনুরোধ পেতে বিজ্ঞপ্তি প্রয়োজন
        </div>
        {isIosOld && (
          <div style={{ background: 'var(--qp-upgrade-soft)', border: '1px solid #F9A825', borderRadius: 'var(--radius-md)', padding: '10px 14px', font: 'var(--text-body-03)', color: 'var(--qp-gray-lead)', marginBottom: 16, maxWidth: 320 }}>
            Update to iOS 16.4+ for background notifications
          </div>
        )}
        {pushError && (
          <div style={{ background: 'var(--qp-error-soft)', border: '1px solid #E53935', borderRadius: 'var(--radius-md)', padding: '10px 14px', font: 'var(--text-body-03)', color: '#C62828', marginBottom: 16, maxWidth: 320 }}>
            {pushError}
          </div>
        )}
        <button
          onClick={subscribe}
          disabled={subscribing}
          style={{
            padding: '14px 32px',
            background: subscribing ? 'var(--qp-gray-40)' : 'var(--qp-electric-blue)',
            color: subscribing ? 'var(--qp-gray-100)' : 'white',
            border: 'none', borderRadius: 'var(--radius-md)',
            font: 'var(--text-button-lg)',
            cursor: subscribing ? 'not-allowed' : 'pointer',
          }}
        >
          {subscribing ? 'Enabling...' : 'Enable Notifications — বিজ্ঞপ্তি চালু করুন'}
        </button>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Sub-header */}
      <div style={{ padding: '12px 16px 10px', background: 'var(--qp-surface)', borderBottom: '1px solid var(--qp-gray-25)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ font: 'var(--text-heading-04)', color: 'var(--qp-dark-blue)' }}>Active requests</div>
            <div style={{ font: 'var(--text-body-03)', color: 'var(--qp-gray-100)' }}>সক্রিয় অনুরোধ</div>
          </div>
          {requests.length > 0 && (
            <span style={{ background: 'var(--qp-electric-blue)', color: 'white', minWidth: 26, height: 26, borderRadius: 'var(--radius-pill)', display: 'flex', alignItems: 'center', justifyContent: 'center', font: 'var(--text-subtitle-02)', fontWeight: 600, padding: '0 6px' }}>
              {requests.length}
            </span>
          )}
        </div>
      </div>

      {/* Request list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '60px 24px', color: 'var(--qp-gray-100)', font: 'var(--text-body-01)' }}>
            Loading...
          </div>
        ) : requests.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 24px', color: 'var(--qp-gray-100)' }}>
            <span className="material-symbols-rounded" style={{ fontSize: 60, display: 'block', marginBottom: 14, opacity: 0.35 }}>inbox</span>
            <div style={{ font: 'var(--text-body-01)' }}>No active requests</div>
            <div style={{ font: 'var(--text-body-02)', marginTop: 4 }}>কোনো অনুরোধ নেই</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {requests.map(req => (
              <RequestItem key={req.id + req.status} req={req} onUpdateStatus={updateStatus} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
