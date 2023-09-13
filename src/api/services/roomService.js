import instance from "../apiConfig"
import { API_ROUTES } from "../../constants/routes"

export const createRoom = async (roomName) => {
  const res = await instance.post(`${API_ROUTES.ROOM_PATH}`, {
    roomName,
  })
  return res.data
}

export const getRoomById = async (roomId) => {
  const res = await instance.get(`${API_ROUTES.ROOM_PATH}/${roomId}`)
  return res.data
}

export const getVotingHistory = async (roomId) => {
  const res = await instance.get(`${API_ROUTES.ROOM_HISTORY}/${roomId}`)
  return res.data
}
