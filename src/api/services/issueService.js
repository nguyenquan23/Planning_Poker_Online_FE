import { API_ROUTES } from "../../constants/routes"
import instance from "../apiConfig"

export const createIssue = async (issue, roomId) => {
  const res = await instance.post(API_ROUTES.ISSUE, {
    name: issue.name,
    room: roomId,
  })
  return res.data
}

export const deleteIssueById = async (issueId) => {
  const res = await instance.delete(`${API_ROUTES.ISSUE}/${issueId}`)
  return res.data
}

export const getIssuesInRoom = async (roomId) => {
  const res = await instance.get(`${API_ROUTES.ISSUE_ROOM}/${roomId}`)
  return res.data
}
