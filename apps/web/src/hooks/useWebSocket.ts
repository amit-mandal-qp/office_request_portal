import { useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import { useQueryClient } from '@tanstack/react-query'

let socket: Socket | null = null

function getSocket(): Socket {
  if (!socket) {
    socket = io({ path: '/socket.io', autoConnect: true, reconnection: true })
  }
  return socket
}

export function useWebSocket() {
  const qc = useQueryClient()
  const socketRef = useRef<Socket>(getSocket())

  useEffect(() => {
    const s = socketRef.current
    s.emit('join:fulfillment')

    const onReconnect = () => {
      qc.invalidateQueries({ queryKey: ['requests'] })
    }
    s.on('connect', onReconnect)
    return () => { s.off('connect', onReconnect) }
  }, [qc])

  return socketRef.current
}
