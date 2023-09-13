import React, { useState, useContext } from "react"
import {
  Form,
  FormGroup,
  Label,
  Input,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./SignUp.css"
import validateEmail from "../../utils/ValidateUtils"
import { PASS_LIMIT } from "../../constants/authConst"
import { signUp } from "../../api/services/authService"
import { UserContext } from "../../context/userContext"

function SignUp({ setModalCalled }) {
  const { setUser } = useContext(UserContext)

  const [userSignUpData, setUserSignUpData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState({
    userNameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
  })

  const errorMessages = {
    userNameError:
      userSignUpData.userName.length === 0 ? "Username is required" : "",
    emailError: !validateEmail(userSignUpData.email) ? "Email is required" : "",
    passwordError:
      userSignUpData.password.length < PASS_LIMIT
        ? "Password must be at least 8 characters"
        : "",
    confirmPasswordError:
      userSignUpData.confirmPassword !== userSignUpData.password
        ? "Confirm password is invalid"
        : "",
  }

  const setErrorsMessage = () => {
    setErrors(errorMessages)
  }
  const successSignUp = () => toast.success("User created!")

  const failSignUp = () => {
    toast.error("Create user failed")
  }

  const handleChange = (event, propertyName) => {
    setUserSignUpData((prevState) => ({
      ...prevState,
      [propertyName]: event.target.value,
    }))
    setErrors((prevState) => ({
      ...prevState,
      [`${propertyName}Error`]: "",
    }))
  }
  const handleSignUp = async () => {
    try {
      const res = await signUp(
        userSignUpData.userName,
        userSignUpData.email,
        userSignUpData.password
      )
      setUserSignUpData({
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
      })
      localStorage.setItem("userId", res.data._id)
      setUser(res.data)
      successSignUp()
    } catch (err) {
      failSignUp()
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (
      userSignUpData.userName &&
      validateEmail(userSignUpData.email) &&
      userSignUpData.password.length >= PASS_LIMIT &&
      userSignUpData.confirmPassword === userSignUpData.password
    ) {
      handleSignUp()
    } else {
      setErrorsMessage()
    }
  }

  return (
    <>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="userName" className="fs-3">
              Username
            </Label>
            <Input
              type="text"
              name="userName"
              id="userName"
              className="input-signup"
              value={userSignUpData.userName}
              onChange={(event) => handleChange(event, "userName")}
              // @ts-ignore
              invalid={userSignUpData.userName ? errorMessages.userNameError : null}
            />
          </FormGroup>
          {errors.userNameError && (
            <div className="error-message">
              <i className="fa fa-warning" /> {errors.userNameError}
            </div>
          )}
          <FormGroup>
            <Label for="email" className="fs-3">
              Email
            </Label>
            <Input
              type="email"
              name="email"
              id="email"
              value={userSignUpData.email}
              onChange={(event) => handleChange(event, "email")}
              // @ts-ignore
              invalid={userSignUpData.email ? errorMessages.emailError : null}
              className="input-signup"
            />
          </FormGroup>
          {errors.emailError && (
            <div className="error-message">
              <i className="fa fa-warning" /> {errors.emailError}
            </div>
          )}
          <FormGroup>
            <Label for="password" className="fs-3">
              Password
            </Label>
            <Input
              type="password"
              name="password"
              id="password"
              value={userSignUpData.password}
              onChange={(event) => handleChange(event, "password")}
              // @ts-ignore
              invalid={userSignUpData.password ? errorMessages.passwordError : null}
              className="input-signup"
            />
          </FormGroup>
          {errors.passwordError && (
            <div className="error-message">
              <i className="fa fa-warning" /> {errors.passwordError}
            </div>
          )}
          <FormGroup>
            <Label for="confirmPassword" className="fs-3">
              Confirm Password
            </Label>
            <Input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={userSignUpData.confirmPassword}
              onChange={(event) => handleChange(event, "confirmPassword")}
              // @ts-ignore
              invalid={
                userSignUpData.confirmPassword
                  ? errorMessages.confirmPasswordError
                  : null
              }
              className="input-signup"
            />
          </FormGroup>
          {errors.confirmPasswordError && (
            <div className="error-message">
              <i className="fa fa-warning" /> {errors.confirmPasswordError}
            </div>
          )}
        </Form>
      </ModalBody>
      <ModalFooter className="border-0 d-flex flex-column justify-content-center align-items-center gap-4">
        <Button
          block
          color="primary"
          size="lg"
          className="btn-signup"
          onClick={handleSubmit}
        >
          Sign up
        </Button>
        <div className="d-flex justify-content-center align-items-center bottom-option--login">
          <span>Already have an account?</span>
          <button
            type="button"
            className="btn-login bg-transparent"
            onClick={() => setModalCalled("login")}
          >
            Login
          </button>
        </div>
      </ModalFooter>
    </>
  )
}

export default SignUp
