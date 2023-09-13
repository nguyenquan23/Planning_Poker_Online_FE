import React, { useContext } from "react"
import { Form, FormGroup, Input } from "reactstrap"
import { SocketContext } from "../../context/SocketContext"
import SOCKET_EVENT from "../../constants/socket_event"
import { RoomContext } from "../../context/roomContext"
import "./SpecMode.css"

function SpecMode() {
  const { socket } = useContext(SocketContext)
  const { specMode, setSpecMode } = useContext(RoomContext)

  const handleSpecMode = () => {
    setSpecMode(!specMode)
    socket.emit(SOCKET_EVENT.USER.SPECTATOR_MODE, { specMode: !specMode })
  }

  return (
    <div className="item-spec-mode d-flex align-items-center gap-5">
      <div className="spec-mode-container d-flex align-items-center">
        <i className="fa fa-eye spec-icon"></i>
        <span className="spec-mode-label">Spectator mode</span>
      </div>
      <Form className="switch-container">
        <FormGroup switch>
          <Input
            type="switch"
            role="switch"
            onClick={handleSpecMode}
            defaultChecked={specMode}
            className="switch-input"
          />
        </FormGroup>
      </Form>
    </div>
  )
}

export default React.memo(SpecMode)
