import { useState, useEffect } from 'react'
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

  useEffect(() => {
    const saved = localStorage.getItem('qp_user_name')
    if (saved && saved.length >= 2) {
      setUserName(saved)
      setScreen('role-select')
    }
  }, [])

  if (screen === 'name-entry') {
    return <NameEntry onNext={(name) => { setUserName(name); setScreen('role-select') }} />
  }
  if (screen === 'role-select') {
    return (
      <RoleSelect
        userName={userName}
        onSelect={(role: Role) => setScreen(role === 'requester' ? 'requester' : 'fulfillment')}
        onChangeName={() => setScreen('name-entry')}
      />
    )
  }
  if (screen === 'requester') {
    return (
      <Requester
        userName={userName}
        onSuccess={(category, categoryBn) => { setLastRequest({ category, categoryBn }); setScreen('success') }}
      />
    )
  }
  if (screen === 'success') {
    return <Success userName={userName} lastRequest={lastRequest} onAnother={() => setScreen('requester')} />
  }
  if (screen === 'fulfillment') {
    return <Fulfillment userName={userName} />
  }
  return null
}
