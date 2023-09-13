import React, { useContext, useEffect, useState } from "react"
import { Offcanvas, OffcanvasBody, Button } from "reactstrap"
import IssueInput from "./components/IssueInput"
import IssueList from "./components/IssueList"
import { IssueContext } from "../../../../context/issueContext"
import "./Issue.css"
import { RoomContext } from "../../../../context/roomContext"

function Issues({ isOpen, toggleOffCanvas, voteResult }) {
  const [isAddingIssue, setIsAddingIssue] = useState(false)
  const [issueCount, setIssueCount] = useState(0)
  const [totalPoint, setTotalPoint] = useState(0)

  const {
    issueList,
    deleteIssue,
    emitSelectedIssue,
    addIssue,
    updateIssue,
    loadIssues,
  } = useContext(IssueContext)
  const { selectedIssue } = useContext(RoomContext)

  useEffect(() => {
    setIssueCount(issueList.length)
    setTotalPoint(
      issueList.reduce(
        (total, item) =>
          Number(total) +
          (Number.isNaN(Number(item.storyPoints)) ? 0 : Number(item.storyPoints)),
        0
      )
    )
  }, [issueList])

  useEffect(() => {
    if (voteResult) {
      loadIssues()
    }
  }, [voteResult])

  const closeAddingIssue = () => setIsAddingIssue(false)

  return (
    <Offcanvas
      backdrop={false}
      direction="end"
      isOpen={isOpen}
      toggle={toggleOffCanvas}
      className="canvas-issue border-0"
    >
      <div className="d-flex align-items-center p-3 justify-content-between issue-header">
        <div className="d-flex flex-column gap-2 justify-content-center align-items-start offcanvas-title">
          <span className="fs-3">Issues</span>
          <p className="issues-report m-0">{`${issueCount} issues・${totalPoint} points`}</p>
        </div>
        <button
          className="border-0 d-flex justify-content-center align-items-center off-canvas-close-btn"
          type="button"
          onClick={toggleOffCanvas}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      <OffcanvasBody>
        <IssueList
          issueList={issueList}
          deleteIssue={deleteIssue}
          emitSelectedIssue={emitSelectedIssue}
          selectedIssue={selectedIssue}
          updateIssue={updateIssue}
        />
        {isAddingIssue ? (
          <IssueInput closeAddingIssue={closeAddingIssue} addIssue={addIssue} />
        ) : (
          <Button
            block
            color="primary"
            outline
            className="option-button"
            onClick={() => setIsAddingIssue(true)}
          >
            <i className="fa fa-plus" /> Add an issue
          </Button>
        )}
      </OffcanvasBody>
    </Offcanvas>
  )
}

export default Issues
