import React, { useContext, useEffect } from "react"
import { UncontrolledDropdown, DropdownToggle, Button, Container } from "reactstrap"
import { Link } from "react-router-dom"
import logo from "../../assets/logo.png"
import steps from "../../constants/homeSteps"
import { UserContext } from "../../context/userContext"
import ChangeProfile from "../ChangeProfile"
import { ROUTES } from "../../constants/routes"
import defaultUserPhoto from "../../assets/user_photo.png"
import "./Home.css"
import ModalComponent from "../ModalComponent"

function Home() {
  const { user } = useContext(UserContext)

  useEffect(() => {
    localStorage.removeItem("roomId")
  }, [])

  return (
    <div className="home">
      <nav className="nav home-navbar d-flex justify-content-between align-items-center">
        <div className="title_container d-flex">
          <img src={logo} alt="logo" className="logo" />
          <div className="site-title">Planning Poker Online</div>
        </div>
        <div className="btn_container d-flex justify-content-end align-items-center">
          {user._id ? (
            <UncontrolledDropdown direction="down" className="dropdown-container">
              <DropdownToggle
                color="primary"
                className="btn-dropdown btn-user-dropdown"
              >
                <img src={user.photoURL || defaultUserPhoto} alt="" />
                {user.name}
                <i className="fas fa-chevron-down" />
              </DropdownToggle>
              <ChangeProfile />
            </UncontrolledDropdown>
          ) : (
            <ModalComponent />
          )}
          <Link to={ROUTES.NEW_GAME_PATH}>
            <Button color="primary" className="btn-start-new-game">
              Start new game
            </Button>
          </Link>
        </div>
      </nav>
      <Container className="home-main-container d-flex flex-column justify-content-evenly">
        <div className="home_title_container text-center">
          <span className="home_title">Press Play on Planning Poker Online</span>
        </div>
        <div className="home_subtitle_container text-center">
          <span className="home_subtitle">
            3 Simple Steps to Start Your Story Estimates
          </span>
        </div>
        <Container className="home-steps-container d-flex justify-content-evenly align-items-center">
          {steps.map((step) => (
            <div
              className="step-container d-flex flex-column justify-content-start align-items-center"
              key={step.title}
            >
              <img src={step.image} alt="step" className="step-image-container" />
              <p className="step-title-container text-center fw-bold lh-base">
                {step.title}
                <p className="step-subtitle-container text-center fw-normal lh-base mt-4">
                  {step.subtitle}
                </p>
              </p>
            </div>
          ))}
        </Container>
      </Container>
    </div>
  )
}
export default Home
