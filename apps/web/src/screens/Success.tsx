const S = {
  page: {
    minHeight: '100dvh',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--spacing-24)',
    background: 'var(--qp-gray-10)',
    fontFamily: 'var(--font-sans)',
  },
  card: {
    background: '#fff',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--spacing-32)',
    width: '100%',
    maxWidth: 400,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: 'var(--spacing-20)',
    textAlign: 'center' as const,
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: '50%',
    background: 'var(--qp-success-soft)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { fontSize: 36, color: 'var(--qp-success-deep)' },
  heading: {
    fontSize: 'var(--text-heading-01)',
    fontWeight: 500,
    color: 'var(--qp-dark-blue)',
    margin: 0,
  },
  sub: {
    fontSize: 'var(--text-body-02)',
    color: 'var(--qp-gray-lead)',
    margin: 0,
  },
  summary: {
    background: 'var(--qp-gray-10)',
    borderRadius: 'var(--radius-md)',
    padding: 'var(--spacing-16)',
    width: '100%',
    boxSizing: 'border-box' as const,
  },
  summaryLabel: {
    fontSize: 'var(--text-body-03)',
    color: 'var(--qp-gray-lead)',
    margin: '0 0 4px',
  },
  summaryValue: {
    fontSize: 'var(--text-body-01)',
    fontWeight: 500,
    color: 'var(--qp-dark-blue)',
    margin: 0,
  },
  btn: {
    padding: '14px 24px',
    borderRadius: 'var(--radius-pill)',
    border: '2px solid var(--qp-electric-blue)',
    background: '#fff',
    color: 'var(--qp-electric-blue)',
    fontSize: 'var(--text-button-lg)',
    fontFamily: 'var(--font-sans)',
    fontWeight: 500,
    cursor: 'pointer',
    width: '100%',
  },
}

export default function Success({
  userName,
  lastRequest,
  onAnother,
}: {
  userName: string
  lastRequest: { category: string; categoryBn: string } | null
  onAnother: () => void
}) {
  return (
    <div style={S.page}>
      <div style={S.card}>
        <div style={S.iconWrap}>
          <span className="material-symbols-rounded" style={S.icon}>check_circle</span>
        </div>
        <h1 style={S.heading}>Request Sent! — অনুরোধ পাঠানো হয়েছে!</h1>
        <p style={S.sub}>
          Your request has been received — আপনার অনুরোধ পাওয়া গেছে
        </p>
        {lastRequest && (
          <div style={S.summary}>
            <p style={S.summaryLabel}>Requested by — অনুরোধকারী</p>
            <p style={S.summaryValue}>{userName}</p>
            <p style={{ ...S.summaryLabel, marginTop: 12 }}>Category — ক্যাটাগরি</p>
            <p style={S.summaryValue}>{lastRequest.category} — {lastRequest.categoryBn}</p>
          </div>
        )}
        <button style={S.btn} onClick={onAnother}>
          Submit another request — আরেকটি অনুরোধ
        </button>
      </div>
    </div>
  )
}
