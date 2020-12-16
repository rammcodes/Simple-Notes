import React, { Component } from 'react'

class NotesForm extends Component {
  state = {}
  render() {
    const {
      newNoteData,
      onNotesFormInputChange,
      createNewNote,
      setNotesFormVisibility,
    } = this.props
    return (
      <div className="form-cont">
        <div className="form">
          <input
            className="form-input"
            name="title"
            placeholder="Title"
            value={newNoteData.title}
            onChange={(e) => onNotesFormInputChange(e)}
            maxLength="20"
          />
          <input
            className="form-input"
            name="desc"
            placeholder="Description"
            value={newNoteData.desc}
            onChange={(e) => onNotesFormInputChange(e)}
          />
          <button className="btn btn-long mb2 noShadow" onClick={createNewNote}>
            Submit
          </button>
          <button
            onClick={() => setNotesFormVisibility(false)}
            className="btn btn-long btn-plane noShadow"
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }
}

export default NotesForm
