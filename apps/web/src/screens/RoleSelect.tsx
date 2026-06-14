type Role = 'requester' | 'fulfillment'

const ROLES = [
  { id: 'requester' as Role,   en: 'I need something',   bn: 'আমার কিছু দরকার',     icon: 'add_circle',  color: 'var(--qp-electric-blue)', bg: 'var(--qp-info-soft)' },
  { id: 'fulfillment' as Role, en: 'I handle requests',  bn: 'আমি অনুরোধ পূরণ করি', icon: 'task_alt',    color: 'var(--qp-success-deep)',  bg: 'var(--qp-success-soft)' },
]

export default function RoleSelect({
  userName,
  onSelect,
  onChangeName,
}: {
  userName: string
  onSelect: (role: Role) => void
  onChangeName: () => void
}) {
  return (
    <div style={{ padding: '36px 24px', display: 'flex', flexDirection: 'column', minHeight: '100%', boxSizing: 'border-box' }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ font: 'var(--text-heading-02)', color: 'var(--qp-dark-blue)' }}>Hi, {userName}</div>
        <div style={{ font: 'var(--text-body-01)', color: 'var(--qp-gray-lead)', marginTop: 4 }}>
          How will you use the app today? — আজ আপনি কী করতে চান?
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {ROLES.map(r => (
          <button
            key={r.id}
            onClick={() => onSelect(r.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 16,
              padding: '18px 20px',
              background: 'var(--qp-surface)',
              border: '1.5px solid var(--qp-gray-40)',
              borderRadius: 'var(--radius-lg)',
              cursor: 'pointer', textAlign: 'left',
              transition: 'border-color .12s, box-shadow .12s',
              WebkitTapHighlightColor: 'transparent',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = r.color; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 8px rgba(0,0,0,.08)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--qp-gray-40)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none'; }}
          >
            <span style={{ width: 48, height: 48, borderRadius: 'var(--radius-md)', background: r.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span className="material-symbols-rounded" style={{ fontSize: 26, color: r.color }}>{r.icon}</span>
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ font: 'var(--text-heading-04)', color: 'var(--qp-dark-blue)' }}>{r.en}</div>
              <div style={{ font: 'var(--text-body-02)', color: 'var(--qp-gray-lead)', marginTop: 2 }}>{r.bn}</div>
            </div>
            <span className="material-symbols-rounded" style={{ fontSize: 18, color: 'var(--qp-gray-100)' }}>chevron_right</span>
          </button>
        ))}
      </div>

      <button
        onClick={onChangeName}
        style={{ marginTop: 24, background: 'none', border: 'none', color: 'var(--qp-gray-100)', font: 'var(--text-body-02)', cursor: 'pointer', alignSelf: 'center' }}
      >
        Change name — নাম পরিবর্তন
      </button>
    </div>
  )
}
