import React, { useEffect, useContext, useState } from "react"
import "./RoomBody.css"
import PlayerCard from "./components/PlayerCard"
import ButtonReveal from "./components/ButtonReveal"
import ButtonStart from "./components/ButtonStart"
import { UserContext } from "../../../../context/userContext"
import { SocketContext } from "../../../../context/SocketContext"
import { RoomContext } from "../../../../context/roomContext"
import SOCKET_EVENT from "../../../../constants/socket_event"
import SetTimer from "./components/SetTimer"

const THIRD_USER_INDEX = 2
const FORTH_USER_INDEX = 3

function RoomBody({ isRevealed }) {
  const { socket } = useContext(SocketContext)
  const { user } = useContext(UserContext)
  const { users, setUsers } = useContext(RoomContext)

  const [isRevealable, setRevealable] = useState(false)

  const topUserList = users.filter(
    (_user, index) => index % 2 !== 0 && index !== FORTH_USER_INDEX
  )

  const bottomUserList = users.filter(
    (_user, index) => index % 2 === 0 && index !== THIRD_USER_INDEX
  )

  const clearUserVoting = () => {
    setUsers((current) => current.map((_user) => ({ ..._user, vote: null })))
  }

  useEffect(() => {
    if (!isRevealed) {
      for (let i = 0; i < users.length; i += 1) {
        if (users[i].vote) {
          setRevealable(true)
          return
        }
      }
    }
    setRevealable(false)
  }, [users])

  useEffect(() => {
    socket.on(SOCKET_EVENT.USER.JOIN, (_users) => {
      setUsers(_users)
    })
    socket.on(SOCKET_EVENT.USER.LEAVE, ({ userId }) => {
      setUsers((current) => current.filter((_user) => _user.userId !== userId))
    })
    socket.on(SOCKET_EVENT.USER.VOTE, ({ userId, voteValue }) => {
      setUsers((current) =>
        current.map((_user) => {
          if (_user.userId === userId) return { ..._user, vote: voteValue }
          return _user
        })
      )
    })
    socket.on(SOCKET_EVENT.USER.NAME_CHANGE, ({ userId, name }) => {
      setUsers((current) =>
        current.map((_user) => {
          if (_user.userId === userId) return { ..._user, username: name }
          return _user
        })
      )
    })
    socket.on(SOCKET_EVENT.USER.SPECTATOR_MODE, ({ userId, specMode }) => {
      setUsers((current) =>
        current.map((_user) => {
          if (_user.userId === userId) return { ..._user, specMode }
          return _user
        })
      )
    })
    socket.on(SOCKET_EVENT.ROOM.START, clearUserVoting)
  }, [])

  const handleReveal = () => {
    socket.emit(SOCKET_EVENT.ROOM.REVEAL)
    setRevealable(false)
  }

  const handleStart = () => {
    socket.emit(SOCKET_EVENT.ROOM.START, true)
    setRevealable(false)
  }

  return (
    <div className="room-body d-flex flex-column justify-content-between">
      <div className="timer-module">
        <SetTimer />
      </div>
      <div className="table-module-wrapper d-flex align-items-center justify-content-center">
        <div className="table-module-container d-inline-grid gap-4">
          <div className="table-module-top d-flex align-items-center justify-content-center gap-4">
            {topUserList.map((_user) => (
              <PlayerCard
                userVoting={_user}
                key={_user.userId}
                isMainPlayer={user._id === _user.userId}
                isRevealed={isRevealed}
              />
            ))}
          </div>
          <div className="table-module-left d-flex align-items-center justify-content-center">
            {users[THIRD_USER_INDEX] && (
              <PlayerCard
                userVoting={users[THIRD_USER_INDEX]}
                isMainPlayer={user._id === users[THIRD_USER_INDEX].userId}
                isRevealed={isRevealed}
              />
            )}
          </div>
          <div className="table-module-right d-flex align-items-center justify-content-center">
            {users[FORTH_USER_INDEX] && (
              <PlayerCard
                userVoting={users[FORTH_USER_INDEX]}
                isMainPlayer={user._id === users[FORTH_USER_INDEX].userId}
                isRevealed={isRevealed}
              />
            )}
          </div>
          <div className="table-module-bottom d-flex align-items-center justify-content-center gap-4">
            {bottomUserList.map((_user) => (
              <PlayerCard
                userVoting={_user}
                key={_user.userId}
                isMainPlayer={user._id === _user.userId}
                isRevealed={isRevealed}
              />
            ))}
          </div>
          <div
            className={`table-module-center ${
              isRevealable && !isRevealed ? "voting" : ""
            } d-flex flex-column align-items-center justify-content-center`}
          >
            {isRevealed ? (
              <ButtonStart handleStart={handleStart} />
            ) : (
              <ButtonReveal
                isRevealable={isRevealable}
                handleReveal={handleReveal}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomBody
