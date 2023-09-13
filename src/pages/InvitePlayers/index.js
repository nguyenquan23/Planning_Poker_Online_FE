import React, { useState } from "react"
import { toast } from "react-toastify"
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap"
import "./InvitePlayers.css"

function InvitePlayers(props) {
  const { gameUrl } = props

  const [modal, setModal] = useState(false)

  const toggle = () => setModal(!modal)

  const copyText = () => {
    navigator.clipboard
      .writeText(gameUrl)
      .then(() => {
        toast.success("Link copied to clipboard!")
        toggle()
      })
      .catch(() => {
        toast.error("Failed to copy link!")
        toggle()
      })
  }

  return (
    <div className="invite-players">
      <Button color="primary" outline className="option-button" onClick={toggle}>
        <i className="fa fa-user-plus" /> Invite players
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle}
        centered
        className="modal-invite-players"
      >
        <ModalHeader toggle={toggle} className="modal-title border-0">
          Invite players
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label size="lg" for="input-game-url" className="label-game-url">
                Game&apos;s url
              </Label>
              <Input
                id="input-game-url"
                name="input-game-url"
                placeholder="Game's url"
                type="text"
                className="input-game-url"
                value={gameUrl}
                readOnly
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter className="border-0">
          <Button block color="primary" className="btn-copy-link" onClick={copyText}>
            Copy invitation link
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default InvitePlayers
