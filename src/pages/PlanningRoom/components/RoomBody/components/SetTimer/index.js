import React, { useState, useEffect, useContext } from "react"
import { toast } from "react-toastify"
import { Dropdown, DropdownToggle, DropdownMenu, Button, Alert } from "reactstrap"
import { SocketContext } from "../../../../../../context/SocketContext"
import SOCKET_EVENT from "../../../../../../constants/socket_event"
import iconClock from "../../../../../../assets/icon_clock.png"
// @ts-ignore
import sound from "../../../../../../assets/sound.mp3"

function SetTimer() {
  const [minutesValue, setMinutesValue] = useState("")
  const [remainingTime, setRemainingTime] = useState(-1)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const toggle = () => setDropdownOpen(!dropdownOpen)

  const { socket } = useContext(SocketContext)

  const handleInputMinutesChange = (event) => {
    setMinutesValue(event.target.value)
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`
  }

  const handleStart = (event) => {
    event.preventDefault()
    const seconds = Math.ceil(parseFloat(minutesValue) * 60)
    if (seconds) {
      setRemainingTime(seconds)
      socket.emit(SOCKET_EVENT.ROOM.SET_TIMER, { timeAmount: seconds })
    }
    toggle()
  }

  const playSound = () => {
    const audio = new Audio(sound)
    audio.play()
  }

  useEffect(() => {
    socket.on(SOCKET_EVENT.ROOM.SET_TIMER, ({ timeAmount }) => {
      setRemainingTime(timeAmount)
    })
  }, [])

  useEffect(() => {
    if (remainingTime === 0) {
      playSound()
      toast.error("Time is up!")
      return
    }
    const timer = setTimeout(() => {
      setRemainingTime(remainingTime - 1)
    }, 1000)
    return () => clearTimeout(timer)
  }, [remainingTime])

  return (
    <div className="btn-timer-wrapper d-flex align-items-center">
      <Dropdown
        isOpen={dropdownOpen}
        toggle={toggle}
        direction="down"
        className="me-3"
      >
        <DropdownToggle color="primary" className="bg-transparent border-0">
          <button className="btn-timer" id="btn-timer" type="button">
            <img src={iconClock} alt="" />
          </button>
        </DropdownToggle>
        <DropdownMenu className="border-0 mt-3 dropdown-timer">
          <form
            className="d-flex flex-column justify-content-between align-items-center m-4 gap-4"
            onSubmit={handleStart}
          >
            <div className="form-floating">
              <input
                type="text"
                className="form-control input-minutes"
                id="input-minutes"
                placeholder="Minutes"
                value={minutesValue}
                onChange={handleInputMinutesChange}
              />
              <label htmlFor="input-minutes" className="label-minutes">
                Minutes
              </label>
            </div>
            <Button
              color="primary"
              block
              className="btn-start-timer"
              onClick={handleStart}
            >
              <i className="fa fa-play"></i> Start
            </Button>
          </form>
        </DropdownMenu>
      </Dropdown>
      {remainingTime > 0 && (
        <Alert color="info" className="m-0">
          Time left: {formatTime(remainingTime)}
        </Alert>
      )}
    </div>
  )
}

export default SetTimer
