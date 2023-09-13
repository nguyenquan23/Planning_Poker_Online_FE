import { API_ROUTES } from "../../constants/routes"
import instance from "../apiConfig"

export const guestLogin = async (username) => {
  const res = await instance.post(API_ROUTES.GUEST_LOGIN, {
    username,
  })
  return res.data
}

export const signUp = async (username, email, password) => {
  const res = await instance.post(API_ROUTES.SIGNUP, {
    username,
    email,
    password,
  })
  return res.data
}

export const login = async (email, password) => {
  const res = await instance.post(API_ROUTES.EMAIL_LOGIN, {
    email,
    password,
  })
  return res.data
}
