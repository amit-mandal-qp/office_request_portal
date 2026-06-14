import { useState } from 'react'

export default function NameEntry({ onNext }: { onNext: (name: string) => void }) {
  const [name, setName] = useState(() => localStorage.getItem('qp_user_name') ?? '')

  const ready = name.trim().length >= 2

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!ready) return
    localStorage.setItem('qp_user_name', name.trim())
    onNext(name.trim())
  }

  return (
    <div style={{ padding: '48px 24px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100%', boxSizing: 'border-box', background: 'var(--qp-surface)' }}>
      {/* Logo */}
      <div style={{ marginBottom: 36, textAlign: 'center' }}>
        <svg width="56" height="56" viewBox="0 0 65 65" fill="none">
          <path className="logo-fill" d="M57.8,0H7.2C3.2,0,0,3.2,0,7.2v50.6c0,4,3.2,7.2,7.2,7.2h50.6c4,0,7.2-3.2,7.2-7.2V7.2C65,3.2,61.8,0,57.8,0z M28.3,51.6c0,2.1-1.7,3.8-3.8,3.8c-2.1,0-3.8-1.7-3.8-3.8c0-2.1,1.7-3.8,3.8-3.8C26.6,47.8,28.3,49.5,28.3,51.6C28.3,51.6,28.3,51.6,28.3,51.6z M39,36.5H28.2v7.2h-7.2v-7.2v-7.2H39c0.1,0,0.1,0,0.2,0c3-0.1,5.4-2.5,5.3-5.5c-0.1-3-2.5-5.4-5.5-5.3H20.9v-7.2H39c7,0,12.6,5.7,12.6,12.6C51.6,30.8,46,36.5,39,36.5z"/>
        </svg>
        <div style={{ font: 'var(--text-heading-02)', color: 'var(--qp-dark-blue)', marginTop: 16 }}>Office Requests</div>
        <div style={{ font: 'var(--text-heading-03)', color: 'var(--qp-gray-lead)', marginTop: 2 }}>অফিস রিকোয়েস্ট</div>
        <div style={{ font: 'var(--text-body-02)', color: 'var(--qp-gray-100)', marginTop: 4 }}>QuestionPro BD</div>
      </div>

      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 360, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ font: 'var(--text-subtitle-02)', color: 'var(--qp-gray-lead)' }}>
            Your name — আপনার নাম
          </span>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g. Karim Hossain"
            autoFocus
            autoComplete="given-name"
            style={{
              padding: '11px 14px',
              border: '1.5px solid var(--qp-gray-40)',
              borderRadius: 'var(--radius-md)',
              font: 'var(--text-body-01)',
              color: 'var(--qp-dark-blue)',
              background: 'var(--qp-surface)',
              outline: 'none',
              transition: 'border-color .12s',
            }}
            onFocus={e => (e.target.style.borderColor = 'var(--qp-electric-blue)')}
            onBlur={e => (e.target.style.borderColor = 'var(--qp-gray-40)')}
          />
        </label>
        <button
          type="submit"
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
          <span className="material-symbols-rounded" style={{ fontSize: 18 }}>arrow_forward</span>
          Continue — এগিয়ে যান
        </button>
      </form>
    </div>
  )
}
