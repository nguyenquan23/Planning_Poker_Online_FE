import { Link } from "react-router-dom"
import React, { useContext, useState } from "react"
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Nav,
  NavItem,
  Button,
} from "reactstrap"
import InvitePlayers from "../../../InvitePlayers"
import ChangeProfile from "../../../ChangeProfile"
import VotingHistory from "./components/VotingHistory"
import { UserContext } from "../../../../context/userContext"
import { RoomContext } from "../../../../context/roomContext"
import { ROUTES } from "../../../../constants/routes"
import defaultUserPhoto from "../../../../assets/user_photo.png"
import logo from "../../../../assets/logo.png"
import "./RoomHeader.css"
import ChangeGameName from "../../../ChangeGameName"

function RoomHeader({ gameName, toggleOffCanvas }) {
  const { user } = useContext(UserContext)
  const { selectedIssue } = useContext(RoomContext)

  const [modalHistory, setModalHistory] = useState(false)
  const toggleModalHistory = () => setModalHistory((prev) => !prev)

  const [modalChangeGameName, setModalChangeGameName] = useState(false)
  const toggleModalChangeGameName = () => {
    setModalChangeGameName(!modalChangeGameName)
  }

  return (
    <div className="d-flex justify-content-between align-items-center room__header">
      <Nav className="d-flex justify-content-start align-items-center left-side-header">
        <NavItem>
          <Link to={ROUTES.HOME_PATH}>
            <img className="site-logo" src={logo} alt="" />
          </Link>
        </NavItem>
        <NavItem>
          <UncontrolledDropdown direction="down" className="dropdown-container">
            <DropdownToggle
              color="primary"
              className="btn-dropdown btn-game-dropdown"
            >
              {gameName}
              <i className="fas fa-chevron-down" />
            </DropdownToggle>
            <DropdownMenu className="border-0 mt-3 p-0">
              <DropdownItem className="item" onClick={toggleModalChangeGameName}>
                <i className="fa-regular fa-pen-to-square" />
                Change game name
              </DropdownItem>
              <ChangeGameName
                modalChangeGameName={modalChangeGameName}
                toggleModalChangeGameName={toggleModalChangeGameName}
              />
              <DropdownItem divider className="m-0" />
              <DropdownItem className="item" onClick={toggleModalHistory}>
                <i className="fa fa-history" />
                Voting history
              </DropdownItem>
              <VotingHistory
                modalHistory={modalHistory}
                toggleModalHistory={toggleModalHistory}
              />
            </DropdownMenu>
          </UncontrolledDropdown>
          {selectedIssue && (
            <div className="voting-issue-wrapper d-flex align-items-center gap-2">
              <span className="voting-issue-label">Voting: </span>
              <p className="voting-issue-name m-0">{selectedIssue.name}</p>
            </div>
          )}
        </NavItem>
      </Nav>
      <Nav className="d-flex justify-content-end align-items-center right-side-header">
        <NavItem>
          <UncontrolledDropdown direction="down" className="dropdown-container">
            <DropdownToggle
              color="primary"
              className="btn-dropdown btn-user-dropdown"
            >
              <img src={user?.photoURL || defaultUserPhoto} alt="" />
              {user.name}
              <i className="fas fa-chevron-down" />
            </DropdownToggle>
            <ChangeProfile />
          </UncontrolledDropdown>
        </NavItem>
        <NavItem>
          <InvitePlayers gameUrl={window.location.href} />
        </NavItem>
        <NavItem>
          <Button
            color="primary"
            outline
            className="option-button"
            onClick={toggleOffCanvas}
          >
            <i className="fa fa-list" />
          </Button>
        </NavItem>
      </Nav>
    </div>
  )
}

export default RoomHeader
