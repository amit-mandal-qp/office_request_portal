const CATEGORIES: Record<string, { icon: string; color: string }> = {
  tea_coffee:   { icon: 'local_cafe',        color: '#7B4F2E' },
  chanachur:    { icon: 'fastfood',          color: '#D4652A' },
  supplies:     { icon: 'inventory_2',       color: '#1B87E6' },
  it_help:      { icon: 'computer',         color: '#6B4EAF' },
  meeting:      { icon: 'meeting_room',     color: '#1B6FA3' },
  housekeeping: { icon: 'cleaning_services',color: '#2E8B57' },
  custom:       { icon: 'add_circle',       color: '#545E6B' },
}

export default function Success({
  userName: _userName,
  lastRequest,
  onAnother,
}: {
  userName: string
  lastRequest: { category: string; categoryBn: string } | null
  onAnother: () => void
}) {
  const catMeta = lastRequest ? CATEGORIES[lastRequest.category] : null

  return (
    <div style={{ padding: '48px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', minHeight: '100%', boxSizing: 'border-box' }}>
      <div style={{ width: 76, height: 76, borderRadius: '50%', background: 'var(--qp-success-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
        <span className="material-symbols-rounded" style={{ fontSize: 40, color: 'var(--qp-success-deep)', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
      </div>

      <div style={{ font: 'var(--text-heading-02)', color: 'var(--qp-dark-blue)' }}>Request sent!</div>
      <div style={{ font: 'var(--text-heading-03)', color: 'var(--qp-gray-lead)', marginTop: 4, marginBottom: 28 }}>অনুরোধ পাঠানো হয়েছে</div>

      {lastRequest && catMeta && (
        <div style={{
          width: '100%', maxWidth: 340,
          background: 'var(--qp-surface)', border: '1px solid var(--qp-gray-40)', borderRadius: 'var(--radius-lg)',
          padding: 16, textAlign: 'left', marginBottom: 28,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="material-symbols-rounded" style={{ fontSize: 22, color: catMeta.color }}>{catMeta.icon}</span>
            <span style={{ font: 'var(--text-heading-04)', color: 'var(--qp-dark-blue)', flex: 1 }}>{lastRequest.category}</span>
          </div>
          <div style={{ font: 'var(--text-body-02)', color: 'var(--qp-gray-lead)', marginTop: 6 }}>{lastRequest.categoryBn}</div>
        </div>
      )}

      <button
        onClick={onAnother}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '10px 22px',
          background: 'var(--qp-surface)',
          border: '1.5px solid var(--qp-electric-blue)',
          borderRadius: 'var(--radius-md)',
          font: 'var(--text-button-sm)',
          color: 'var(--qp-electric-blue)',
          cursor: 'pointer',
        }}
      >
        <span className="material-symbols-rounded" style={{ fontSize: 18 }}>add</span>
        Send another request — আরেকটি অনুরোধ
      </button>
    </div>
  )
}
