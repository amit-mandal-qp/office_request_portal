import { useState, useMemo } from 'react'
import { nanoid } from 'nanoid'
import { Urgency, Status } from '@office/shared'
import { useRequests } from '../hooks/useRequests'

const CATEGORIES = [
  { id: 'tea_coffee',   en: 'Tea / Coffee',      bn: 'চা / কফি',         icon: 'local_cafe',        color: '#7B4F2E' },
  { id: 'chanachur',   en: 'Chanachur / Snacks', bn: 'চানাচুর মাখা',      icon: 'fastfood',          color: '#D4652A' },
  { id: 'supplies',    en: 'Office Supplies',    bn: 'অফিস সাপ্লাই',     icon: 'inventory_2',       color: '#1B87E6' },
  { id: 'it_help',     en: 'IT / Tech Help',     bn: 'আইটি সাহায্য',     icon: 'computer',          color: '#6B4EAF' },
  { id: 'meeting',     en: 'Meeting Room',       bn: 'মিটিং রুম',        icon: 'meeting_room',      color: '#1B6FA3' },
  { id: 'housekeeping',en: 'Housekeeping',       bn: 'পরিষ্কার',         icon: 'cleaning_services', color: '#2E8B57' },
  { id: 'custom',      en: 'Other Request',      bn: 'অন্যান্য',          icon: 'add_circle',        color: '#545E6B' },
]

const URGENCY_OPTS = [
  { val: Urgency.NORMAL, en: 'Normal', bn: 'সাধারণ', icon: 'schedule',      color: 'var(--qp-electric-blue)', bg: 'var(--qp-info-soft)' },
  { val: Urgency.URGENT, en: 'Urgent', bn: 'জরুরি',  icon: 'priority_high', color: 'var(--qp-upgrade)',       bg: 'var(--qp-upgrade-soft)' },
]

// Block re-submission within this window (ms)
const BLOCK_WINDOW_MS = 30 * 60 * 1000

import type { RequestRecord } from '@office/shared'

function getBlockedCategories(activeRequests: RequestRecord[], userName: string): Map<string, RequestRecord> {
  const blocked = new Map<string, RequestRecord>()
  const now = Date.now()
  for (const req of activeRequests) {
    if (
      req.requesterName === userName &&
      req.status !== Status.DONE &&
      now - new Date(req.createdAt).getTime() < BLOCK_WINDOW_MS
    ) {
      blocked.set(req.category, req)
    }
  }
  return blocked
}

function minutesAgo(iso: string): number {
  return Math.floor((Date.now() - new Date(iso).getTime()) / 60000)
}

export default function Requester({
  userName,
  onSuccess,
}: {
  userName: string
  onSuccess: (category: string, categoryBn: string) => void
}) {
  const { requests } = useRequests()
  const [selected, setSelected] = useState<string | null>(null)
  const [customText, setCustomText] = useState('')
  const [urgency, setUrgency] = useState<string>(Urgency.NORMAL)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [requestId] = useState(() => nanoid())

  const blockedCats = useMemo(
    () => getBlockedCategories(requests, userName),
    [requests, userName],
  )

  const cat = CATEGORIES.find(c => c.id === selected)
  const customRequired = selected === 'custom'
  const isSelectedBlocked = selected ? blockedCats.has(selected) : false
  const ready = selected !== null && !submitting && !isSelectedBlocked && (!customRequired || customText.trim().length > 0)

  async function handleSubmit() {
    if (!ready || !cat) return
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: requestId,
          requesterName: userName,
          category: cat.id,
          categoryEn: cat.en,
          categoryBn: cat.bn,
          customText: customText.trim() || undefined,
          urgency,
        }),
      })
      if (!res.ok) throw new Error(`Error ${res.status}`)
      onSuccess(cat.en, cat.bn)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to submit. Try again.')
      setSubmitting(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Sub-header */}
      <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--qp-gray-25)', background: 'var(--qp-surface)', flexShrink: 0 }}>
        <div>
          <div style={{ font: 'var(--text-heading-04)', color: 'var(--qp-dark-blue)' }}>What do you need?</div>
          <div style={{ font: 'var(--text-body-03)', color: 'var(--qp-gray-100)' }}>আপনার কি দরকার?</div>
        </div>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Category grid */}
        <div>
          <div style={{ font: 'var(--text-subtitle-02)', color: 'var(--qp-gray-lead)', marginBottom: 10 }}>
            Select category — বিভাগ বেছে নিন
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {CATEGORIES.map(c => {
              const active = selected === c.id
              const blocked = blockedCats.get(c.id)
              const isBlocked = !!blocked

              return (
                <button
                  key={c.id}
                  onClick={() => !isBlocked && setSelected(c.id)}
                  disabled={isBlocked}
                  style={{
                    position: 'relative',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    gap: 8, padding: '14px 10px',
                    background: isBlocked ? 'var(--qp-gray-10)' : active ? 'var(--qp-electric-blue)' : 'var(--qp-surface)',
                    border: `2px solid ${isBlocked ? 'var(--qp-gray-25)' : active ? 'var(--qp-electric-blue)' : 'var(--qp-gray-40)'}`,
                    borderRadius: 'var(--radius-lg)',
                    cursor: isBlocked ? 'not-allowed' : 'pointer',
                    minHeight: 90,
                    opacity: isBlocked ? 0.7 : 1,
                    transition: 'background .13s, border-color .13s',
                    WebkitTapHighlightColor: 'transparent',
                  }}
                >
                  <span className="material-symbols-rounded" style={{ fontSize: 26, color: isBlocked ? 'var(--qp-gray-40)' : active ? 'white' : c.color }}>{c.icon}</span>
                  <div style={{ textAlign: 'center', lineHeight: 1.25 }}>
                    <div style={{ font: 'var(--text-subtitle-02)', fontWeight: 500, color: isBlocked ? 'var(--qp-gray-40)' : active ? 'white' : 'var(--qp-dark-blue)' }}>{c.en}</div>
                    <div style={{ font: 'var(--text-body-03)', color: isBlocked ? 'var(--qp-gray-40)' : active ? 'rgba(255,255,255,.75)' : 'var(--qp-gray-100)', marginTop: 2 }}>{c.bn}</div>
                  </div>
                  {/* Pending badge */}
                  {isBlocked && (
                    <div style={{ position: 'absolute', top: 6, right: 6, background: 'var(--qp-upgrade)', color: 'white', borderRadius: 'var(--radius-sm)', padding: '1px 6px', font: 'var(--text-body-03)', fontSize: 10, fontWeight: 600 }}>
                      {minutesAgo(blocked.createdAt)}m ago
                    </div>
                  )}
                </button>
              )
            })}
          </div>
          {blockedCats.size > 0 && (
            <div style={{ marginTop: 10, font: 'var(--text-body-03)', color: 'var(--qp-gray-lead)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className="material-symbols-rounded" style={{ fontSize: 14, color: 'var(--qp-upgrade)' }}>info</span>
              Grayed categories have a pending request. Unlocks after 30 min — বিগত অনুরোধ এখনো সক্রিয়।
            </div>
          )}
        </div>

        {/* Details */}
        {selected && !isSelectedBlocked && (
          <div>
            <div style={{ font: 'var(--text-subtitle-02)', color: 'var(--qp-gray-lead)', marginBottom: 8 }}>
              {customRequired ? 'Describe your request — অনুরোধ বর্ণনা করুন *' : 'Add details (optional) — বিস্তারিত'}
            </div>
            <textarea
              value={customText}
              onChange={e => setCustomText(e.target.value)}
              placeholder={customRequired ? 'Required — আবশ্যক' : 'e.g. 2 cups, extra sugar / ২ কাপ, বেশি চিনি'}
              rows={3}
              maxLength={500}
              style={{
                width: '100%', boxSizing: 'border-box',
                padding: '10px 12px',
                border: '1.5px solid var(--qp-gray-40)',
                borderRadius: 'var(--radius-md)',
                font: 'var(--text-body-01)',
                color: 'var(--qp-dark-blue)', background: 'var(--qp-surface)',
                resize: 'none', outline: 'none',
                transition: 'border-color .12s',
              }}
              onFocus={e => (e.target.style.borderColor = 'var(--qp-electric-blue)')}
              onBlur={e => (e.target.style.borderColor = 'var(--qp-gray-40)')}
            />
          </div>
        )}

        {/* Urgency */}
        {selected && !isSelectedBlocked && (
          <div>
            <div style={{ font: 'var(--text-subtitle-02)', color: 'var(--qp-gray-lead)', marginBottom: 10 }}>
              Priority — অগ্রাধিকার
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              {URGENCY_OPTS.map(opt => (
                <button
                  key={opt.val}
                  onClick={() => setUrgency(opt.val)}
                  style={{
                    flex: 1, display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 14px',
                    background: urgency === opt.val ? opt.bg : 'var(--qp-surface)',
                    border: `2px solid ${urgency === opt.val ? opt.color : 'var(--qp-gray-40)'}`,
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer', transition: 'all .13s',
                    WebkitTapHighlightColor: 'transparent',
                  }}
                >
                  <span className="material-symbols-rounded" style={{ fontSize: 20, color: opt.color }}>{opt.icon}</span>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ font: 'var(--text-subtitle-02)', fontWeight: 500, color: 'var(--qp-dark-blue)' }}>{opt.en}</div>
                    <div style={{ font: 'var(--text-body-03)', color: 'var(--qp-gray-100)' }}>{opt.bn}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div style={{ background: 'var(--qp-error-soft)', border: '1px solid #E53935', borderRadius: 'var(--radius-md)', padding: '10px 14px', color: '#C62828', font: 'var(--text-body-02)' }}>
            {error}
          </div>
        )}
      </div>

      {/* Fixed footer */}
      <div style={{ padding: '14px 16px', borderTop: '1px solid var(--qp-gray-25)', background: 'var(--qp-surface)', flexShrink: 0 }}>
        <button
          onClick={handleSubmit}
          disabled={!ready}
          style={{
            width: '100%', padding: '14px',
            background: ready ? 'var(--qp-electric-blue)' : 'var(--qp-gray-40)',
            color: ready ? 'white' : 'var(--qp-gray-100)',
            border: 'none', borderRadius: 'var(--radius-md)',
            font: 'var(--text-button-lg)',
            cursor: ready ? 'pointer' : 'not-allowed',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
        >
          <span className="material-symbols-rounded" style={{ fontSize: 18 }}>send</span>
          {submitting ? 'Sending...' : 'Send Request — পাঠান'}
        </button>
      </div>
    </div>
  )
}
