import React, { useState, createContext, useEffect, useMemo } from "react"
import SocketClient from "socket.io-client"
import BASE_URL from "../constants/baseURL"

export const SocketContext = createContext(null)

function SocketContextProvider({ children }) {
  const [socket] = useState(
    SocketClient(BASE_URL, {
      autoConnect: true,
    })
  )

  useEffect(() => {
    if (socket) {
      socket.connect()
    }
  }, [socket])

  return (
    <SocketContext.Provider value={useMemo(() => ({ socket }), [])}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketContextProvider
