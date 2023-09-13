import React from "react"
import ReactDOM from "react-dom/client"
import "bootstrap/dist/css/bootstrap.min.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "bootstrap/dist/css/bootstrap.css"
import "react-toastify/dist/ReactToastify.css"
import SocketContextProvider from "./context/SocketContext"
import UserContextProvider from "./context/userContext"
import App from "./App"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <UserContextProvider>
    <SocketContextProvider>
      <App />
    </SocketContextProvider>
  </UserContextProvider>
)
