import { useEffect, useState } from 'react'

const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY as string

function urlBase64ToUint8Array(base64: string): Uint8Array {
  const padded = base64.replace(/-/g, '+').replace(/_/g, '/').padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=')
  const raw = atob(padded)
  return Uint8Array.from([...raw].map((c) => c.charCodeAt(0)))
}

export function usePushSubscription() {
  const [needsSubscription, setNeedsSubscription] = useState(false)
  const [subscribing, setSubscribing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) return
    navigator.serviceWorker.ready.then(async (reg) => {
      const existing = await reg.pushManager.getSubscription()
      if (!existing) { setNeedsSubscription(true); return }
      const res = await fetch(`/api/push/subscriptions/check?endpoint=${encodeURIComponent(existing.endpoint)}`)
      const { subscribed } = await res.json()
      if (!subscribed) setNeedsSubscription(true)
    })
  }, [])

  async function subscribe() {
    setSubscribing(true)
    setError(null)
    try {
      const perm = await Notification.requestPermission()
      if (perm !== 'granted') {
        setError('Notifications blocked. Enable in browser settings — ব্রাউজার সেটিংস থেকে অনুমতি দিন')
        return
      }
      const reg = await navigator.serviceWorker.ready
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY) as unknown as BufferSource,
      })
      const { endpoint, keys } = sub.toJSON() as { endpoint: string; keys: { p256dh: string; auth: string } }
      await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endpoint, p256dh: keys.p256dh, auth: keys.auth }),
      })
      setNeedsSubscription(false)
    } catch (e: any) {
      setError(e?.message ?? 'Subscription failed')
    } finally {
      setSubscribing(false)
    }
  }

  return { needsSubscription, subscribing, subscribe, error }
}
