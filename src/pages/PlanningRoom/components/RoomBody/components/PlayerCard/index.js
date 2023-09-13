import React, { useEffect, useState } from "react"
import { UncontrolledTooltip } from "reactstrap"

function PlayerCard({ userVoting, isMainPlayer, isRevealed }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    setUser(userVoting)
  }, [userVoting])

  return (
    user && (
      <div className="player-card-wrapper d-flex flex-column align-items-center justify-content-center p-3">
        {!user.specMode ? (
          <div
            className={`player-card-empty
          ${
            user.vote && (isRevealed ? "player-card-revealed" : "player-card-voting")
          }
          d-flex align-items-center justify-content-center h3`}
          >
            {isRevealed &&
              (user.vote === "coffee" ? (
                <i className="fa fa-coffee" />
              ) : (
                <span>{user.vote}</span>
              ))}
          </div>
        ) : (
          <div className="player-card-spec d-flex flex-column justify-content-center align-items-center">
            <i className="fa fa-eye"></i>
          </div>
        )}

        <div className="player-name-container">
          <p className="player-name-text text-center" id={`tooltip-${user?.userId}`}>
            {isMainPlayer ? "You" : user.username}
          </p>
          <UncontrolledTooltip placement="bottom" target={`tooltip-${user?.userId}`}>
            {user.username}
          </UncontrolledTooltip>
        </div>
      </div>
    )
  )
}

export default PlayerCard
