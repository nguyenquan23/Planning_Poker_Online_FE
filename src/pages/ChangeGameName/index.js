import React, { useState, useEffect, useContext } from "react"
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Button,
} from "reactstrap"
import { ROOM_DEFAULT_NAME } from "../../constants/roomConst"
import SOCKET_EVENT from "../../constants/socket_event"
import { GAME_NAME_LIMIT } from "../../constants/authConst"
import { RoomContext } from "../../context/roomContext"
import { SocketContext } from "../../context/SocketContext"
import { GAMENAME_LENGTH_EXCEEDS_ERROR } from "../../constants/errorMessage"
import "./ChangeGameName.css"

function ChangeRoomName({ modalChangeGameName, toggleModalChangeGameName }) {
  const { room, setRoom } = useContext(RoomContext)
  const { socket } = useContext(SocketContext)
  const [roomName, setRoomName] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleInputChange = (event) => {
    setRoomName(event.target.value)
    setErrorMessage(
      event.target.value.length >= GAME_NAME_LIMIT
        ? GAMENAME_LENGTH_EXCEEDS_ERROR
        : ""
    )
  }

  const handleSave = (event) => {
    event.preventDefault()
    setRoom((current) => ({
      ...current,
      name: roomName,
    }))
    socket.emit(SOCKET_EVENT.ROOM.NAME_CHANGE, { name: roomName })
    toggleModalChangeGameName(false)
  }

  useEffect(() => {
    if (room) {
      setRoomName(room.name || ROOM_DEFAULT_NAME)
    }
  }, [room])

  useEffect(() => {
    socket.on(SOCKET_EVENT.ROOM.NAME_CHANGE, (data) => {
      setRoom((current) => ({
        ...current,
        name: data.name,
      }))
    })
  }, [])

  return (
    <Modal
      isOpen={modalChangeGameName}
      centered
      toggle={toggleModalChangeGameName}
      className="modal-change-game-name"
    >
      <ModalHeader toggle={toggleModalChangeGameName} className="border-0">
        Change game name
      </ModalHeader>
      <ModalBody>
        <Form className="form-change-room-name" onSubmit={handleSave}>
          <FormGroup className="mt-3">
            <div className="form-floating">
              <input
                type="text"
                id="input-edit-game-name"
                name="input-edit-game-name"
                className="form-control input-edit-game-name"
                value={roomName}
                maxLength={GAME_NAME_LIMIT}
                onChange={handleInputChange}
                placeholder="Game's name"
              />
              <label htmlFor="input-edit-game-name" className="label-game-name">
                Game&apos;s name
              </label>
            </div>
            {errorMessage && (
              <div className="error-message">
                <i className="fa fa-warning" /> {errorMessage}
              </div>
            )}
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter className="border-0">
        <Button block color="primary" className="btn-save" onClick={handleSave}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default ChangeRoomName
