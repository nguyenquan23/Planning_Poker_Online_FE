import { API_ROUTES } from "../../constants/routes"
import instance from "../apiConfig"

export const getUserById = async (id) => {
  const res = await instance.get(`${API_ROUTES.USER}/${id}`)
  return res.data
}

export const updateUserProfile = async (userId, displayName, photoURL) => {
  const res = await instance.patch(API_ROUTES.USER, {
    userId,
    displayName,
    photoURL,
  })
  return res.data
}
