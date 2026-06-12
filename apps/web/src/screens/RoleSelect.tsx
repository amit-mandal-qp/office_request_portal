type Role = 'requester' | 'fulfillment'

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
    maxWidth: 420,
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
  sub: {
    fontSize: 'var(--text-body-02)',
    color: 'var(--qp-gray-lead)',
    margin: 0,
  },
  roleCard: (hovered: boolean) => ({
    border: `2px solid ${hovered ? 'var(--qp-electric-blue)' : 'var(--qp-gray-25)'}`,
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--spacing-24)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-16)',
    background: hovered ? 'var(--qp-info-soft)' : '#fff',
    transition: 'all 0.15s',
  }),
  icon: {
    fontSize: 32,
    color: 'var(--qp-electric-blue)',
  },
  roleLabel: {
    fontSize: 'var(--text-body-01)',
    fontWeight: 500,
    color: 'var(--qp-dark-blue)',
    margin: 0,
  },
  changeBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--qp-electric-blue)',
    fontSize: 'var(--text-body-03)',
    cursor: 'pointer',
    padding: 0,
    fontFamily: 'var(--font-sans)',
  },
}

function RoleCard({ icon, label, onClick }: { icon: string; label: string; onClick: () => void }) {
  return (
    <div
      style={S.roleCard(false)}
      onClick={onClick}
      onMouseEnter={(e) => Object.assign((e.currentTarget as HTMLDivElement).style, S.roleCard(true))}
      onMouseLeave={(e) => Object.assign((e.currentTarget as HTMLDivElement).style, S.roleCard(false))}
    >
      <span className="material-symbols-rounded" style={S.icon}>{icon}</span>
      <p style={S.roleLabel}>{label}</p>
    </div>
  )
}

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
    <div style={S.page}>
      <div style={S.card}>
        <div>
          <h1 style={S.heading}>Hello, {userName}</h1>
          <p style={S.sub}>
            What would you like to do today? — আজ আপনি কী করতে চান?
          </p>
        </div>
        <RoleCard
          icon="shopping_cart"
          label="I need something — আমার কিছু দরকার"
          onClick={() => onSelect('requester')}
        />
        <RoleCard
          icon="check_circle"
          label="I fulfill requests — আমি সাহায্য করব"
          onClick={() => onSelect('fulfillment')}
        />
        <button style={S.changeBtn} onClick={onChangeName}>
          Change name — নাম পরিবর্তন
        </button>
      </div>
    </div>
  )
}
