import React from "react"
import "./ButtonStart.css"

function ButtonStart({ handleStart }) {
  return (
    <div className="btn-container d-flex align-items-center">
      <button className="btn-start text-center" type="button" onClick={handleStart}>
        Start new voting
      </button>
    </div>
  )
}

export default ButtonStart
