import React, { createContext, useContext, useEffect, useState } from "react"
import SOCKET_EVENT from "../constants/socket_event"
import { SocketContext } from "./SocketContext"
import { UserContext } from "./userContext"

export const RoomContext = createContext(null)

function RoomContextProvider({ children }) {
  const [room, setRoom] = useState(null)
  const [users, setUsers] = useState([])
  const [selectedIssue, setSelectedIssue] = useState(null)
  const [specMode, setSpecMode] = useState(false)

  const { socket } = useContext(SocketContext)
  const { user } = useContext(UserContext)

  useEffect(() => {
    if (room && user && room._id && user._id) {
      if (users.findIndex((_user) => _user.userId === user._id) === -1) {
        socket.emit(SOCKET_EVENT.USER.JOIN, {
          userId: user._id,
          username: user.name,
          roomId: room._id,
        })
      }
    }
  }, [room, user._id])

  const clearUserVoting = () => {
    setUsers((current) => current.map((_user) => ({ ..._user, vote: null })))
  }

  return (
    <RoomContext.Provider
      value={{
        room,
        users,
        specMode,
        selectedIssue,
        setRoom,
        setUsers,
        setSpecMode,
        setSelectedIssue,
        clearUserVoting,
      }}
    >
      {children}
    </RoomContext.Provider>
  )
}

export default RoomContextProvider
