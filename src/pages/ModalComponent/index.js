import React, { useState, useContext } from "react"
import { Modal, ModalHeader } from "reactstrap"
import SignUp from "../SignUp"
import Login from "../Login"
import { UserContext } from "../../context/userContext"

function ModalComponent() {
  const { user } = useContext(UserContext)
  const [modalCalled, setModalCalled] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <div className="btn-auth-options">
        <button
          type="button"
          className="btn-auth btn-login bg-transparent"
          onClick={() => {
            setModalCalled("login")
            toggle()
          }}
        >
          Login
        </button>
        <button
          type="button"
          className="btn-auth btn-signup bg-transparent"
          onClick={() => {
            setModalCalled("signUp")
            toggle()
          }}
        >
          Sign up
        </button>
      </div>
      <Modal
        isOpen={isOpen && !user._id}
        className="modal-dialog modal-dialog-centered modal-login"
        toggle={toggle}
      >
        <ModalHeader className="border-0" toggle={toggle}>
          {modalCalled === "login" ? "Login" : "Sign Up"}
        </ModalHeader>
        {modalCalled === "login" ? (
          <Login setModalCalled={setModalCalled} />
        ) : (
          <SignUp setModalCalled={setModalCalled} />
        )}
      </Modal>
    </>
  )
}

export default ModalComponent
