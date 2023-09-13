import React, { createContext, useContext, useEffect, useState } from "react"
import {
  createIssue,
  getIssuesInRoom,
  deleteIssueById,
} from "../api/services/issueService"
import { RoomContext } from "./roomContext"
import { SocketContext } from "./SocketContext"
import SOCKET_EVENT from "../constants/socket_event"
import { toastUnknownError } from "../utils/ToastUtils"
import { ROOM_STATUS } from "../constants/roomConst"

export const IssueContext = createContext(null)

function IssueContextProvider({ children }) {
  const { room, selectedIssue, setSelectedIssue } = useContext(RoomContext)
  const { socket } = useContext(SocketContext)

  const [issueList, setIssueList] = useState([])

  useEffect(() => {
    socket.off(SOCKET_EVENT.ISSUE.NEW)
    socket.on(SOCKET_EVENT.ISSUE.NEW, (issue) => {
      onAddIssue(issue)
    })
    socket.off(SOCKET_EVENT.ISSUE.REMOVE)
    socket.on(SOCKET_EVENT.ISSUE.REMOVE, (issue) => {
      onDeleteIssue(issue)
    })
    socket.off(SOCKET_EVENT.ISSUE.SELECT)
    socket.on(SOCKET_EVENT.ISSUE.SELECT, (issue) => {
      setSelectedIssue(issue)
    })
    socket.off(SOCKET_EVENT.ISSUE.NAME_CHANGE)
    socket.on(SOCKET_EVENT.ISSUE.NAME_CHANGE, onUpdateIssue)
  }, [])

  useEffect(() => {
    loadIssues()
  }, [room])

  const onAddIssue = (issue) => {
    setIssueList((prevList) => [...prevList, issue])
  }

  const onUpdateIssue = (issue) => {
    setIssueList((oldIssueList) =>
      oldIssueList.map((_issue) => {
        if (_issue._id === issue._id) {
          _issue = { ...issue }
          if (selectedIssue?._id === issue._id) setSelectedIssue(issue)
        }
        return _issue
      })
    )
  }

  const onDeleteIssue = (issue) => {
    setSelectedIssue((oldSelectedIssue) =>
      oldSelectedIssue && oldSelectedIssue._id !== issue._id
        ? oldSelectedIssue
        : null
    )
    setIssueList((oldIssueList) =>
      oldIssueList.filter((_issue) => _issue._id !== issue._id)
    )
  }

  const addIssue = async (issueAdd) => {
    try {
      const res = await createIssue(issueAdd, room._id)
      const newIssue = res.data
      onAddIssue(newIssue)
      socket.emit(SOCKET_EVENT.ISSUE.NEW, newIssue)
    } catch {
      toastUnknownError()
    }
  }

  const updateIssue = (issue) => {
    socket.emit(SOCKET_EVENT.ISSUE.NAME_CHANGE, issue)
    onUpdateIssue(issue)
  }

  const deleteIssue = async (issueDelete) => {
    try {
      const res = await deleteIssueById(issueDelete._id)
      if (res.success) {
        onDeleteIssue(issueDelete)
        socket.emit(SOCKET_EVENT.ISSUE.REMOVE, issueDelete)
      }
    } catch {
      toastUnknownError()
    }
  }

  const loadIssues = async () => {
    try {
      if (room && room._id) {
        const res = await getIssuesInRoom(room._id)
        if (res.success) {
          setIssueList(res.data)
        }
      }
    } catch {
      toastUnknownError()
    }
  }

  const emitSelectedIssue = (issue) => {
    setSelectedIssue(issue)
    if (room.status === ROOM_STATUS.CONCLUDED && issue) {
      socket.emit(SOCKET_EVENT.ROOM.START, false)
    }
    socket.emit(SOCKET_EVENT.ISSUE.SELECT, issue)
  }

  return (
    <IssueContext.Provider
      value={{
        issueList,
        deleteIssue,
        addIssue,
        emitSelectedIssue,
        updateIssue,
        loadIssues,
      }}
    >
      {children}
    </IssueContext.Provider>
  )
}

export default IssueContextProvider
