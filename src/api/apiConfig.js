import axios from "axios"
import BASE_URL from "../constants/baseURL"

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": true,
  },
})

export default instance
