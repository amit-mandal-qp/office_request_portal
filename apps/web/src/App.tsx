import { useState, useEffect, useCallback } from 'react'
import NameEntry from './screens/NameEntry'
import RoleSelect from './screens/RoleSelect'
import Requester from './screens/Requester'
import Success from './screens/Success'
import Fulfillment from './screens/Fulfillment'

type Screen = 'name-entry' | 'role-select' | 'requester' | 'success' | 'fulfillment'
type Role = 'requester' | 'fulfillment'

export default function App() {
  const [screen, setScreen] = useState<Screen>('name-entry')
  const [userName, setUserName] = useState('')
  const [lastRequest, setLastRequest] = useState<{ category: string; categoryBn: string } | null>(null)
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    (localStorage.getItem('qp_theme') as 'light' | 'dark') ?? 'light'
  )

  const toggleTheme = useCallback(() => {
    setTheme(t => {
      const next = t === 'light' ? 'dark' : 'light'
      localStorage.setItem('qp_theme', next)
      document.documentElement.setAttribute('data-theme', next === 'dark' ? 'dark' : '')
      return next
    })
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem('qp_user_name')
    if (saved && saved.length >= 2) {
      setUserName(saved)
      setScreen('role-select')
    }
    if (navigator.serviceWorker) {
      navigator.serviceWorker.addEventListener('message', e => {
        if (e.data?.type === 'OPEN_FULFILLMENT') setScreen('fulfillment')
      })
    }
  }, [])

  function handleLogout() {
    localStorage.removeItem('qp_user_name')
    setUserName('')
    setScreen('name-entry')
  }

  const showHeader = screen !== 'name-entry'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--qp-surface)' }}>
      {/* App header */}
      {showHeader && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', background: '#1B3380', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <svg width="28" height="28" viewBox="0 0 65 65" fill="none">
              <path fill="white" d="M57.8,0H7.2C3.2,0,0,3.2,0,7.2v50.6c0,4,3.2,7.2,7.2,7.2h50.6c4,0,7.2-3.2,7.2-7.2V7.2C65,3.2,61.8,0,57.8,0z M28.3,51.6c0,2.1-1.7,3.8-3.8,3.8c-2.1,0-3.8-1.7-3.8-3.8c0-2.1,1.7-3.8,3.8-3.8C26.6,47.8,28.3,49.5,28.3,51.6C28.3,51.6,28.3,51.6,28.3,51.6z M39,36.5H28.2v7.2h-7.2v-7.2v-7.2H39c0.1,0,0.1,0,0.2,0c3-0.1,5.4-2.5,5.3-5.5c-0.1-3-2.5-5.4-5.5-5.3H20.9v-7.2H39c7,0,12.6,5.7,12.6,12.6C51.6,30.8,46,36.5,39,36.5z"/>
            </svg>
            <span style={{ font: 'var(--text-heading-04)', color: 'white' }}>Office Requests</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <button
              onClick={toggleTheme}
              style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,.65)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px 6px', borderRadius: 'var(--radius-sm)' }}
              title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 18 }}>{theme === 'light' ? 'dark_mode' : 'light_mode'}</span>
            </button>
            <button
              onClick={handleLogout}
              style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,.65)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, font: 'var(--text-body-03)' }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 16 }}>logout</span>
              {userName}
            </button>
          </div>
        </div>
      )}

      {/* Screen content */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {screen === 'name-entry' && (
          <NameEntry onNext={name => { setUserName(name); setScreen('role-select') }} />
        )}
        {screen === 'role-select' && (
          <RoleSelect
            userName={userName}
            onSelect={(role: Role) => setScreen(role === 'requester' ? 'requester' : 'fulfillment')}
            onChangeName={() => setScreen('name-entry')}
          />
        )}
        {screen === 'requester' && (
          <Requester
            userName={userName}
            onSuccess={(category, categoryBn) => { setLastRequest({ category, categoryBn }); setScreen('success') }}
          />
        )}
        {screen === 'success' && (
          <Success userName={userName} lastRequest={lastRequest} onAnother={() => setScreen('requester')} />
        )}
        {screen === 'fulfillment' && (
          <Fulfillment userName={userName} />
        )}
      </div>
    </div>
  )
}
