import React, { useContext, useEffect, useState } from "react"
import { Button } from "reactstrap"
import iconHandDown from "../../../../assets/icon_hand_down.png"
import SOCKET_EVENT from "../../../../constants/socket_event"
import { SocketContext } from "../../../../context/SocketContext"
import { RoomContext } from "../../../../context/roomContext"
import { EXTRA_CARD } from "../../../../constants/roomConst"
import "./RoomFooter.css"

function RoomFooter({ votingSystem, isRevealed, voteResult }) {
  const { socket } = useContext(SocketContext)
  const { specMode, setSpecMode } = useContext(RoomContext)
  const [pickedCard, setPickedCard] = useState()

  const handlePickCard = (card) => {
    const voteValue = card !== pickedCard ? card : ""
    setPickedCard(voteValue)
    socket.emit(SOCKET_EVENT.USER.VOTE, { voteValue })
  }

  const handleDeactivate = () => {
    setSpecMode(!specMode)
    socket.emit(SOCKET_EVENT.USER.SPECTATOR_MODE, { specMode: false })
  }

  useEffect(() => {
    socket.on(SOCKET_EVENT.ROOM.START, () => {
      setPickedCard(null)
    })
  }, [])

  return (
    <div className="d-flex justify-content-center align-items-center room__footer">
      {isRevealed && voteResult ? (
        <div className="d-flex justify-content-center result-section">
          <div className="d-flex flex-column justify-content-evenly align-items-center mx-3 gap-2 result-average-container">
            <span className="average-label">Average</span>
            <div className="result-card">
              {voteResult.results === EXTRA_CARD.COFFEE ? (
                <i className="fa fa-coffee" />
              ) : (
                <span>{voteResult.results}</span>
              )}
            </div>
            <span className="vote-count">
              {voteResult.voteOnTotal.split("/")[0]}
              {Number(voteResult.voteOnTotal.split("/")[0]) > 1 ? " Votes" : " Vote"}
            </span>
          </div>
          {voteResult.coffeeTime && (
            <div className="d-flex flex-column justify-content-center align-items-center mx-3 coffee-time">
              <span className="coffee-time-label mb-3">Coffee time!</span>
              <i className="fa fa-coffee" />
            </div>
          )}
        </div>
      ) : (
        (!specMode && (
          <div className="d-flex flex-column gap-4 align-items-center card-list-section">
            <div className="choose-your-card">
              <span>Choose your card below</span>
              <img src={iconHandDown} alt="" className="icon-hand-down" />
            </div>
            <div className="card-lists-container">
              <ul className="d-flex justify-content-evenly align-items-center card-lists">
                {votingSystem.map((card) => (
                  <li className="card-item" key={card}>
                    <Button
                      color="primary"
                      outline
                      className={
                        pickedCard === card ? "card-button--picked" : "card-button"
                      }
                      onClick={() => handlePickCard(card)}
                    >
                      {card === EXTRA_CARD.COFFEE ? (
                        <i className="fa fa-coffee" />
                      ) : (
                        <span>{card}</span>
                      )}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )) ||
        (specMode && (
          <div className="activated-spec-mode-container d-flex flex-column align-items-center gap-3">
            <span>
              You are in spectator mode <i className="fa fa-eye"></i>
            </span>
            <button
              type="button"
              className="bg-transparent border-0 btn-deactivate-spec-mode"
              onClick={handleDeactivate}
            >
              Deactivate
            </button>
          </div>
        ))
      )}
    </div>
  )
}

export default RoomFooter
