import { useState } from 'react'
import { nanoid } from 'nanoid'
import { Urgency } from '@office/shared'

const CATEGORIES = [
  { id: 'tea_coffee', en: 'Tea / Coffee', bn: 'চা / কফি', icon: 'local_cafe', color: '#7B4F2E' },
  { id: 'chanachur', en: 'Chanachur / Snacks', bn: 'চানাচুর মাখা', icon: 'fastfood', color: '#D4652A' },
  { id: 'supplies', en: 'Office Supplies', bn: 'অফিস সাপ্লাই', icon: 'inventory_2', color: '#1B87E6' },
  { id: 'it_help', en: 'IT / Tech Help', bn: 'আইটি সাহায্য', icon: 'computer', color: '#6B4EAF' },
  { id: 'meeting', en: 'Meeting Room', bn: 'মিটিং রুম', icon: 'meeting_room', color: '#1B6FA3' },
  { id: 'housekeeping', en: 'Housekeeping', bn: 'পরিষ্কার', icon: 'cleaning_services', color: '#2E8B57' },
  { id: 'custom', en: 'Other Request', bn: 'অন্যান্য', icon: 'add_circle', color: '#545E6B' },
]

const S = {
  page: {
    minHeight: '100dvh',
    padding: 'var(--spacing-24)',
    background: 'var(--qp-gray-10)',
    fontFamily: 'var(--font-sans)',
  },
  card: {
    background: '#fff',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--spacing-24)',
    maxWidth: 480,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 'var(--spacing-20)',
  },
  heading: {
    fontSize: 'var(--text-heading-02)',
    fontWeight: 500,
    color: 'var(--qp-dark-blue)',
    margin: 0,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
    gap: 'var(--spacing-12)',
  },
  catBtn: (selected: boolean, color: string) => ({
    border: `2px solid ${selected ? color : 'var(--qp-gray-25)'}`,
    borderRadius: 'var(--radius-md)',
    padding: 'var(--spacing-16) var(--spacing-12)',
    cursor: 'pointer',
    background: selected ? `${color}18` : '#fff',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: 'var(--spacing-8)',
    transition: 'all 0.12s',
  }),
  catIcon: (color: string) => ({ fontSize: 28, color }),
  catLabel: {
    fontSize: 'var(--text-body-03)',
    color: 'var(--qp-dark-blue)',
    fontWeight: 500,
    textAlign: 'center' as const,
    margin: 0,
    lineHeight: 1.3,
  },
  catLabelBn: {
    fontSize: 11,
    color: 'var(--qp-gray-lead)',
    textAlign: 'center' as const,
    margin: 0,
  },
  label: {
    fontSize: 'var(--text-body-02)',
    color: 'var(--qp-gray-lead)',
    display: 'block',
    marginBottom: 'var(--spacing-8)',
  },
  textarea: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: 'var(--radius-md)',
    border: '1.5px solid var(--qp-gray-25)',
    fontSize: 'var(--text-body-02)',
    fontFamily: 'var(--font-sans)',
    resize: 'vertical' as const,
    boxSizing: 'border-box' as const,
    minHeight: 80,
  },
  urgencyRow: {
    display: 'flex',
    gap: 'var(--spacing-12)',
  },
  urgencyBtn: (active: boolean, urgent: boolean) => ({
    flex: 1,
    padding: '10px',
    borderRadius: 'var(--radius-md)',
    border: `2px solid ${active ? (urgent ? '#E53935' : 'var(--qp-electric-blue)') : 'var(--qp-gray-25)'}`,
    background: active ? (urgent ? '#FFEBEE' : 'var(--qp-info-soft)') : '#fff',
    cursor: 'pointer',
    fontSize: 'var(--text-button-sm)',
    fontFamily: 'var(--font-sans)',
    fontWeight: 500,
    color: active ? (urgent ? '#E53935' : 'var(--qp-electric-blue)') : 'var(--qp-gray-lead)',
    transition: 'all 0.12s',
  }),
  submitBtn: (disabled: boolean) => ({
    padding: '14px 24px',
    borderRadius: 'var(--radius-pill)',
    border: 'none',
    background: disabled ? 'var(--qp-gray-25)' : 'var(--qp-electric-blue)',
    color: disabled ? 'var(--qp-gray-40)' : '#fff',
    fontSize: 'var(--text-button-lg)',
    fontFamily: 'var(--font-sans)',
    fontWeight: 500,
    cursor: disabled ? 'not-allowed' : 'pointer',
    width: '100%',
  }),
  error: {
    background: '#FFEBEE',
    border: '1px solid #E53935',
    borderRadius: 'var(--radius-md)',
    padding: 'var(--spacing-12) var(--spacing-16)',
    color: '#C62828',
    fontSize: 'var(--text-body-03)',
  },
}

export default function Requester({
  userName,
  onSuccess,
}: {
  userName: string
  onSuccess: (category: string, categoryBn: string) => void
}) {
  const [selected, setSelected] = useState<typeof CATEGORIES[0] | null>(null)
  const [customText, setCustomText] = useState('')
  const [urgency, setUrgency] = useState<Urgency>(Urgency.NORMAL)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [requestId] = useState(() => nanoid())

  const customRequired = selected?.id === 'custom'
  const ready = selected !== null && !submitting && (!customRequired || customText.trim().length > 0)

  async function handleSubmit() {
    if (!ready || !selected) return
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: requestId,
          requesterName: userName,
          category: selected.id,
          categoryEn: selected.en,
          categoryBn: selected.bn,
          customText: customText.trim() || undefined,
          urgency,
        }),
      })
      if (!res.ok) throw new Error(`Error ${res.status}`)
      onSuccess(selected.en, selected.bn)
    } catch (e: any) {
      setError(e?.message ?? 'Failed to submit. Try again.')
      setSubmitting(false)
    }
  }

  return (
    <div style={S.page}>
      <div style={S.card}>
        <h1 style={S.heading}>New Request — নতুন অনুরোধ</h1>

        <div>
          <label style={S.label}>Category — ক্যাটাগরি</label>
          <div style={S.grid}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                style={S.catBtn(selected?.id === cat.id, cat.color)}
                onClick={() => setSelected(cat)}
              >
                <span className="material-symbols-rounded" style={S.catIcon(cat.color)}>{cat.icon}</span>
                <p style={S.catLabel}>{cat.en}</p>
                <p style={S.catLabelBn}>{cat.bn}</p>
              </button>
            ))}
          </div>
        </div>

        {selected && (
          <div>
            <label style={S.label}>
              {customRequired
                ? 'Describe your request — অনুরোধ বর্ণনা করুন *'
                : 'Additional details — অতিরিক্ত বিবরণ (optional)'}
            </label>
            <textarea
              style={S.textarea}
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              maxLength={500}
              placeholder={customRequired ? 'Required — আবশ্যক' : 'Optional — ঐচ্ছিক'}
            />
          </div>
        )}

        <div>
          <label style={S.label}>Urgency — জরুরিতা</label>
          <div style={S.urgencyRow}>
            <button
              style={S.urgencyBtn(urgency === Urgency.NORMAL, false)}
              onClick={() => setUrgency(Urgency.NORMAL)}
            >
              Normal — স্বাভাবিক
            </button>
            <button
              style={S.urgencyBtn(urgency === Urgency.URGENT, true)}
              onClick={() => setUrgency(Urgency.URGENT)}
            >
              Urgent — জরুরি
            </button>
          </div>
        </div>

        {error && <div style={S.error}>{error}</div>}

        <button style={S.submitBtn(!ready)} disabled={!ready} onClick={handleSubmit}>
          {submitting ? 'Submitting...' : 'Submit Request — অনুরোধ পাঠান'}
        </button>
      </div>
    </div>
  )
}
