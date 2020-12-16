import React, { Component } from 'react'
import { Edit, Trash2 } from 'react-feather'

class Notes extends Component {
  state = {}
  render() {
    const { getFilteredNotes, onEditClick, deleteNote } = this.props
    return (
      <div className="notes">
        {getFilteredNotes().map((item, idx) => {
          return (
            <div className="note" key={idx}>
              <div className="upper">
                <h3 className="note-title">{item.title}</h3>
                <div className="note-actions">
                  <span className="edit-cont">
                    <Edit
                      className="icon"
                      onClick={() => onEditClick(idx)}
                    ></Edit>
                  </span>
                  <span className="delete-cont">
                    <Trash2
                      className="icon"
                      onClick={() => deleteNote(idx)}
                    ></Trash2>
                  </span>
                </div>
              </div>
              <div className="lower">
                <p className="note-desc">{item.desc}</p>
                <div className="time-info">
                  <span className="time">{item.date}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default Notes
