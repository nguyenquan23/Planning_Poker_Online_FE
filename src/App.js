import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer, Zoom } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import NewGame from "./pages/NewGame"
import NotFound from "./pages/NotFound"
import { ROUTES } from "./constants/routes"
import "./index.css"
import Home from "./pages/Home"
import PlanningRoom from "./pages/PlanningRoom"
import RoomContextProvider from "./context/roomContext"

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-center"
        hideProgressBar
        newestOnTop
        autoClose={2000}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        transition={Zoom}
        pauseOnHover
        theme="light"
      />
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.HOME_PATH} element={<Home />} />
          <Route path={ROUTES.NEW_GAME_PATH} element={<NewGame />} />
          <Route
            path={ROUTES.ROOM_PATH}
            element={
              <RoomContextProvider>
                <PlanningRoom />
              </RoomContextProvider>
            }
          />
          <Route path={ROUTES.OTHERS} element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
