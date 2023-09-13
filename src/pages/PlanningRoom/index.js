import React, { useEffect, useState, useContext, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Fireworks from "@fireworks-js/react"
import RoomHeader from "./components/RoomHeader"
import RoomBody from "./components/RoomBody"
import RoomFooter from "./components/RoomFooter"
import { getRoomById } from "../../api/services/roomService"
import { RoomContext } from "../../context/roomContext"
import { SocketContext } from "../../context/SocketContext"
import { ROOM_DEFAULT_NAME, ROOM_STATUS } from "../../constants/roomConst"
import { UserContext } from "../../context/userContext"
import { ROUTES } from "../../constants/routes"
import SOCKET_EVENT from "../../constants/socket_event"
import IssueContextProvider from "../../context/issueContext"
import Issues from "./components/Issues"
import LoginAsGuest from "../LoginAsGuest"
import "./PlanningRoom.css"

const FIREWORK_Z_INDEX_ON = 0
const FIREWORK_Z_INDEX_OFF = -1

function PlanningRoom() {
  const { room, setRoom, setUsers, setSelectedIssue, setSpecMode } =
    useContext(RoomContext)
  const { socket } = useContext(SocketContext)
  const { user } = useContext(UserContext)

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isRevealed, setIsRevealed] = useState(false)
  const [voteResult, setVoteResult] = useState(null)
  const [fireworkIndex, setFireWorkIndex] = useState(FIREWORK_Z_INDEX_OFF)

  const fireworkRef = useRef()
  const { id } = useParams()

  const navigate = useNavigate()

  const toggleOffCanvas = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    socket.on(SOCKET_EVENT.ROOM.REVEAL, (data) => {
      setVoteResult(data)
      setRoom((current) => ({ ...current, status: ROOM_STATUS.CONCLUDED }))
    })
    socket.on(SOCKET_EVENT.ROOM.START, (resetIssue) => {
      setRoom((current) => ({ ...current, status: ROOM_STATUS.VOTING }))
      if (resetIssue) setSelectedIssue(null)
    })

    return () => {
      socket.emit(SOCKET_EVENT.USER.LEAVE)
      socket.off(SOCKET_EVENT.ALL)
    }
  }, [])

  useEffect(() => {
    if (user._id) {
      setIsLoggedIn(true)
      socket.on(SOCKET_EVENT.USER.SPECTATOR_MODE, (data) => {
        if (data.userId === user._id) {
          setSpecMode(data.specMode)
        }
      })
    }
  }, [user])

  useEffect(() => {
    if (room) setIsRevealed(room.status === ROOM_STATUS.CONCLUDED)
  }, [room])

  const getGameName = async () => {
    try {
      const res = await getRoomById(id)
      const { voting, currentResults, ...roomData } = res.data
      setRoom(roomData)
      setUsers(voting)
      setVoteResult(currentResults)
    } catch {
      navigate(ROUTES.NOT_FOUND)
    }
  }

  const checkUserLoggedIn = async () => {
    if (user._id) {
      setIsLoggedIn(true)
    }
  }

  useEffect(() => {
    checkUserLoggedIn()
    getGameName()
  }, [id])

  useEffect(() => {
    if (!fireworkRef.current) return

    const timeOut = setTimeout(() => fireWorkOff(), 3000)
    if (isRevealed) {
      // @ts-ignore
      if (!fireworkRef.current.isRunning) {
        // @ts-ignore
        fireworkRef.current.start()
      }
      setFireWorkIndex(FIREWORK_Z_INDEX_ON)
    } else {
      fireWorkOff()
    }
    return () => clearTimeout(timeOut)
  }, [isRevealed])

  const fireWorkOff = () => {
    // @ts-ignore
    if (fireworkRef.current.isRunning) {
      // @ts-ignore
      fireworkRef.current.stop()
    }
    setFireWorkIndex(FIREWORK_Z_INDEX_OFF)
  }

  const widthClassName = isOpen ? "room__container--offcanvas" : "w-100"

  return (
    room && (
      <div className="room">
        {!isLoggedIn && <LoginAsGuest isLoggedIn={isLoggedIn} />}
        <div
          className={`room__container vh-100 d-flex flex-column justify-content-between ${widthClassName}`}
        >
          <RoomHeader
            gameName={room.name || ROOM_DEFAULT_NAME}
            toggleOffCanvas={toggleOffCanvas}
          />
          <RoomBody isRevealed={isRevealed} />
          <RoomFooter
            votingSystem={room.votingSystem}
            isRevealed={isRevealed}
            voteResult={voteResult}
          />
        </div>
        <IssueContextProvider>
          <Issues
            isOpen={isOpen}
            toggleOffCanvas={toggleOffCanvas}
            voteResult={voteResult}
          />
        </IssueContextProvider>
        <Fireworks
          ref={fireworkRef}
          options={{
            opacity: 0.5,
          }}
          style={{
            display: isRevealed ? "block" : "none",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            position: "fixed",
            zIndex: fireworkIndex,
            background: "transparent",
          }}
        />
      </div>
    )
  )
}

export default PlanningRoom
