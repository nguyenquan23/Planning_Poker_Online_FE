import React from "react"
import "./ButtonReveal.css"

function ButtonReveal({ isRevealable, handleReveal }) {
  return (
    <div className="btn-container d-flex align-items-center">
      {isRevealable ? (
        <button
          className="reveal-btn text-center"
          type="button"
          onClick={handleReveal}
        >
          Reveal card
        </button>
      ) : (
        <div>Pick your card!</div>
      )}
    </div>
  )
}

export default ButtonReveal
