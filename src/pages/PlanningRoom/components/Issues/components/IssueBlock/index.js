import React, { useEffect, useState } from "react"
import {
  Card,
  CardText,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input,
  Form,
} from "reactstrap"
import "./IssueBlock.css"

function IssueBlock({
  issue,
  index,
  selectedIssue,
  emitSelectedIssue,
  deleteIssue,
  updateIssue,
}) {
  const [modalDelete, setModalDelete] = useState(false)
  const [dropdown, setDropdown] = useState(false)
  const [editing, setEditing] = useState(false)
  const [newIssueName, setNewIssueName] = useState("")

  useEffect(() => {
    setNewIssueName(issue.name)
  }, [issue])

  const toggle = () => setDropdown((prev) => !prev)
  const toggleDelete = () => setModalDelete((prev) => !prev)
  const toggleEditing = () =>
    setEditing((prev) => {
      if (prev) {
        handleCancelEdit()
      }
      return !prev
    })

  const handleConfirmDelete = () => {
    setModalDelete(false)
    deleteIssue(issue)
  }

  const handleUpdateIssue = () => {
    setEditing(false)
    if (newIssueName.length > 0) {
      updateIssue({ ...issue, name: newIssueName })
    }
  }

  const handleCancelEdit = () => {
    setNewIssueName(issue.name)
    setEditing(false)
  }

  const isSelected = selectedIssue && selectedIssue._id === issue._id

  const saveButtonDisabled = newIssueName.trim() === ""

  return (
    <>
      <Card
        body
        className={`my-2 issue-block border-0 ${
          isSelected && "selected-issue-block"
        }`}
      >
        <div className="issue-block-header d-flex justify-content-between align-items-center">
          <CardTitle tag="h5">PP-{index}</CardTitle>
          <Dropdown isOpen={dropdown} toggle={toggle}>
            <DropdownToggle className={`dot-menu ${isSelected && "voting"}`}>
              <i className="fa-solid fa-ellipsis-vertical fa-rotate-90" />
            </DropdownToggle>
            <DropdownMenu className="menu border-0 p-0">
              <DropdownItem className="menu-option" onClick={() => setEditing(true)}>
                <i className="fa-solid fa-pencil edit-icon" />
                <span className="option-text">Edit</span>
              </DropdownItem>
              <DropdownItem divider className="m-0" />
              <DropdownItem
                className="menu-option"
                onClick={() => setModalDelete(true)}
              >
                <i className="fa-solid fa-trash trash-icon" />
                <span className="option-text">Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <CardText className="card-text">{issue.name}</CardText>
        <div className="d-flex justify-content-between align-items-center">
          {isSelected ? (
            <Button
              color="primary"
              className="btn-voting border-0 w-50"
              onClick={() => emitSelectedIssue(null)}
            >
              Voting now...
            </Button>
          ) : (
            <Button
              className="btn-vote w-50"
              onClick={() => emitSelectedIssue(issue)}
            >
              {issue.storyPoints ? "Vote again" : "Vote this issue"}
            </Button>
          )}

          <div
            className={`story-point ${
              isSelected && "selected-issue-block"
            } d-flex justify-content-center align-items-center`}
          >
            <span>{issue.storyPoints || "-"}</span>
          </div>
        </div>
      </Card>
      <Modal
        isOpen={modalDelete}
        toggle={toggleDelete}
        centered
        className="modal-delete"
      >
        <ModalHeader className="border-0 modal-title" toggle={toggleDelete}>
          Are you sure you want to delete this issue?
        </ModalHeader>
        <ModalBody className="fs-4 align-self-left">
          This operation is irreversible.
        </ModalBody>
        <ModalFooter className="d-flex justify-content-between align-content-center border-0">
          <Button
            className="me-5 flex-fill btn-delete-issue--cancel"
            onClick={() => setModalDelete(false)}
          >
            Cancel
          </Button>
          <Button
            className="ms-5 flex-fill btn-delete-issue--ok"
            onClick={handleConfirmDelete}
          >
            Delete
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={editing} toggle={toggleEditing} centered className="modal-edit">
        <ModalHeader className="border-0 modal-title" toggle={toggleEditing}>
          Edit issue
        </ModalHeader>
        <ModalBody>
          <Form
            onSubmit={handleUpdateIssue}
            className="d-flex justify-content-center flex-column mb-1"
          >
            <Input
              type="textarea"
              className="issue-edit"
              placeholder="Enter a title for the issue"
              autoFocus
              value={newIssueName}
              onChange={(e) => setNewIssueName(e.target.value)}
            />
            <div className="d-flex justify-content-between mt-4">
              <button
                type="button"
                id="cancel"
                className="w-50 me-3 btn-cancel btn-delete-issue--cancel"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
              <button
                type="button"
                className="w-50 ms-3 btn btn-save--issue"
                disabled={saveButtonDisabled}
                onClick={handleUpdateIssue}
              >
                Save
              </button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </>
  )
}

export default IssueBlock
