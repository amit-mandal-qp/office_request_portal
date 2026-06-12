import { useState, useEffect } from 'react'

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
    gap: 'var(--spacing-24)',
  },
  heading: {
    fontSize: 'var(--text-heading-01)',
    fontWeight: 500,
    color: 'var(--qp-dark-blue)',
    margin: 0,
  },
  label: {
    fontSize: 'var(--text-body-02)',
    color: 'var(--qp-gray-lead)',
    marginBottom: 'var(--spacing-8)',
    display: 'block',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: 'var(--radius-md)',
    border: '1.5px solid var(--qp-gray-25)',
    fontSize: 'var(--text-body-02)',
    fontFamily: 'var(--font-sans)',
    outline: 'none',
    boxSizing: 'border-box' as const,
    color: 'var(--qp-dark-blue)',
  },
  btn: (disabled: boolean) => ({
    padding: '14px 24px',
    borderRadius: 'var(--radius-pill)',
    border: 'none',
    background: disabled ? 'var(--qp-gray-25)' : 'var(--qp-electric-blue)',
    color: disabled ? 'var(--qp-gray-40)' : '#fff',
    fontSize: 'var(--text-button-lg)',
    fontFamily: 'var(--font-sans)',
    fontWeight: 500,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'background 0.15s',
    width: '100%',
  }),
}

export default function NameEntry({ onNext }: { onNext: (name: string) => void }) {
  const [name, setName] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('qp_user_name')
    if (saved) setName(saved)
  }, [])

  const ready = name.trim().length >= 2

  function handleSubmit() {
    if (!ready) return
    localStorage.setItem('qp_user_name', name.trim())
    onNext(name.trim())
  }

  return (
    <div style={S.page}>
      <div style={S.card}>
        <h1 style={S.heading}>Office Request Portal</h1>
        <div>
          <label style={S.label}>Your Name — আপনার নাম</label>
          <input
            style={S.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Enter your name"
            autoFocus
          />
        </div>
        <button style={S.btn(!ready)} disabled={!ready} onClick={handleSubmit}>
          Continue — এগিয়ে যান
        </button>
      </div>
    </div>
  )
}
