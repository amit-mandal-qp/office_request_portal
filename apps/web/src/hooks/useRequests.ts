import { useEffect, useRef } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { RequestRecord, Status, RequestNewPayload, RequestUpdatedPayload } from '@office/shared'
import { useWebSocket } from './useWebSocket'

async function fetchActive(): Promise<RequestRecord[]> {
  const res = await fetch('/api/requests/active')
  if (!res.ok) throw new Error('Failed to fetch requests')
  return res.json()
}

export function useRequests(onNewRequest?: (req: RequestRecord) => void) {
  const qc = useQueryClient()
  const socket = useWebSocket()
  const onNewRef = useRef(onNewRequest)
  useEffect(() => { onNewRef.current = onNewRequest })

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['requests'],
    queryFn: fetchActive,
  })

  useEffect(() => {
    const onNew = (payload: RequestNewPayload) => {
      qc.setQueryData<RequestRecord[]>(['requests'], (prev = []) => {
        if (prev.find((r) => r.id === payload.request.id)) return prev
        return [payload.request, ...prev]
      })
      onNewRef.current?.(payload.request)
    }

    const onUpdated = (payload: RequestUpdatedPayload) => {
      qc.setQueryData<RequestRecord[]>(['requests'], (prev = []) =>
        prev
          .map((r) => (r.id === payload.id ? { ...r, status: payload.status } : r))
          .filter((r) => r.status !== 'DONE' as Status),
      )
    }

    socket.on('request:new', onNew)
    socket.on('request:updated', onUpdated)
    return () => {
      socket.off('request:new', onNew)
      socket.off('request:updated', onUpdated)
    }
  }, [socket, qc])

  async function updateStatus(id: string, status: Status) {
    await fetch(`/api/requests/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
  }

  return { requests, isLoading, updateStatus }
}
