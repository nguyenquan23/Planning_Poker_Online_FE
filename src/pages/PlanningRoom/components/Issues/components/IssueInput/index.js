import React, { useState } from "react"
import { Form, Input } from "reactstrap"
import "./IssueInput.css"

function IssueInput({ closeAddingIssue, addIssue }) {
  const [newIssueName, setNewIssueName] = useState("")

  const handleAddIssue = () => {
    closeAddingIssue()
    if (newIssueName.length > 0) {
      addIssue({ name: newIssueName })
    }
  }

  const saveButtonDisabled = newIssueName.trim() === ""

  return (
    <Form
      onSubmit={handleAddIssue}
      className="d-flex justify-content-center flex-column"
    >
      <Input
        type="textarea"
        className="issue-input"
        placeholder="Enter a title for the issue"
        autoFocus
        onChange={(e) => setNewIssueName(e.target.value)}
      />
      <div className="d-flex justify-content-between mt-4">
        <button
          id="cancel"
          type="button"
          className="w-50 me-3 btn-cancel btn-delete-issue--cancel"
          onClick={closeAddingIssue}
        >
          Cancel
        </button>
        <button
          type="button"
          className="w-50 ms-3 btn btn-save--issue"
          disabled={saveButtonDisabled}
          onClick={handleAddIssue}
        >
          Save
        </button>
      </div>
    </Form>
  )
}

export default IssueInput
