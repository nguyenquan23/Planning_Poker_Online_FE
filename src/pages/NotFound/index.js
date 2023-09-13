import React from "react"
import { Link } from "react-router-dom"
import { ROUTES } from "../../constants/routes"
import "./NotFound.css"

function NotFound() {
  return (
    <>
      <div className="background-layer position-fixed w-100 d-flex justify-content-center align-items-center">
        <h1>404</h1>
      </div>
      <div className="top-layer position-absolute w-100 d-flex flex-column align-items-center text-center">
        <div className="notfound-404">
          4<i className="fa-solid fa-gear fa-spin"></i>4
        </div>
        <div className="notfound-data">Page Not Found</div>
        <div className="notfound-message">
          <p>The page you&apos;re looking for is not existed</p>
        </div>
        <Link to={ROUTES.HOME_PATH}>
          <button type="button" className="mt-4">
            Go Back
          </button>
        </Link>
      </div>
    </>
  )
}

export default NotFound
