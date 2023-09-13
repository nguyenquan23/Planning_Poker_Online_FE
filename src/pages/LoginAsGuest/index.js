import React, { useState, useContext } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import { UserContext } from "../../context/userContext"
import { guestLogin } from "../../api/services/authService"
import { USER_NAME_LIMIT } from "../../constants/authConst"
import {
  USERNAME_LENGTH_EXCEEDS_ERROR,
  USERNAME_FIELD_EMPTY_ERROR,
} from "../../constants/errorMessage"
import "./LoginAsGuest.css"
import ModalComponent from "../ModalComponent"

function LoginAsGuest({ isLoggedIn }) {
  const [showModal, setShowModal] = useState(!isLoggedIn)
  const [guestName, setGuestName] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const { user, setUser } = useContext(UserContext)
  const toggle = () => setShowModal(!showModal)

  const handleInputChange = (event) => {
    setGuestName(event.target.value)
    setErrorMessage(
      event.target.value.length >= USER_NAME_LIMIT
        ? USERNAME_LENGTH_EXCEEDS_ERROR
        : ""
    )
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (guestName.trim() === "") {
      setErrorMessage(USERNAME_FIELD_EMPTY_ERROR)
    } else {
      const res = await guestLogin(guestName)
      if (res.success) {
        localStorage.setItem("userId", res.data._id)
        setUser(res.data)
        toggle()
      }
    }
  }

  return (
    <div className="login-as-guest">
      <Modal isOpen={showModal && !user._id} centered className="modal-guest">
        <ModalHeader className="border-0">Choose your display name</ModalHeader>
        <ModalBody>
          <form className="form-login-as-guest" onSubmit={handleSubmit}>
            <input
              type="text"
              required
              className="input-guest-name"
              placeholder="Your display name"
              maxLength={USER_NAME_LIMIT}
              value={guestName}
              onChange={handleInputChange}
            />
            {errorMessage && (
              <div className="error-message">
                <i className="fa fa-warning" /> {errorMessage}
              </div>
            )}
            <Button
              block
              color="primary"
              size="lg"
              className="btn-continue"
              onClick={handleSubmit}
            >
              Continue to game
            </Button>
          </form>
        </ModalBody>
        <ModalFooter className="border-0 w-100">
          <ModalComponent />
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default LoginAsGuest
