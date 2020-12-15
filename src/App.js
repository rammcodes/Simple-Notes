import './App.scss'
import React, { Component } from 'react'
import { Book, Search, Trash2, Edit } from 'react-feather'

class App extends Component {
  state = {
    showNotesForm: false,
    newNoteData: {
      title: '',
      desc: '',
    },
    currEdit: null,
    notes: [],
    searchQuery: '',
  }

  setNotesFormVisibility = (val) => {
    if (!val) {
      this.setState({
        newNoteData: {
          title: '',
          desc: '',
        },
        currEdit: null,
      })
    }

    this.setState({
      showNotesForm: val,
    })
  }

  onNotesFormInputChange = (e) => {
    const newNoteData = { ...this.state.newNoteData }
    newNoteData[e.target.name] = e.target.value
    this.setState({
      newNoteData,
    })
  }

  createNewNote = () => {
    const { newNoteData, notes, currEdit } = this.state
    if (currEdit !== null) {
      const updatedNotes = JSON.parse(JSON.stringify(notes))
      updatedNotes[currEdit].title = newNoteData.title
      updatedNotes[currEdit].desc = newNoteData.desc
      this.setState({
        newNoteData: {
          title: '',
          desc: '',
        },
        notes: updatedNotes,
        showNotesForm: false,
        currEdit: null,
      })
    } else {
      notes.push(newNoteData)
      this.setState({
        newNoteData: {
          title: '',
          desc: '',
        },
        notes,
        showNotesForm: false,
      })
    }
  }

  onEditClick = (idx) => {
    let notes = JSON.parse(JSON.stringify(this.state.notes))
    let editNote = notes[idx]
    this.setState(
      {
        newNoteData: {
          title: editNote.title,
          desc: editNote.desc,
        },
        currEdit: idx,
      },
      () => {
        this.setState({
          showNotesForm: true,
        })
      }
    )
  }

  deleteNote = (idx) => {
    let notes = JSON.parse(JSON.stringify(this.state.notes))
    notes = notes.filter((item, index) => idx !== index)
    this.setState({
      notes,
    })
  }

  getFilteredNotes = () => {
    let { searchQuery, notes } = this.state
    notes = notes.filter((note, idx) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    return notes
  }

  render() {
    const { showNotesForm, newNoteData, notes, searchQuery } = this.state
    return (
      <div className="app">
        <div className="sidebar">
          <h1 className="app-title">
            <span>Notes</span>
            <Book className="icon" />
          </h1>
          <div className="app-info"></div>
        </div>
        <div className="main-app">
          <div className="search">
            <span className="icon-cont">
              <Search className="icon" />
            </span>
            <input
              value={searchQuery}
              onChange={(e) => {
                this.setState({
                  searchQuery: e.target.value,
                })
              }}
              placeholder="Search Notes..."
            />
          </div>
          <div className="actions">
            <div className="filters"></div>
            <div className="main-actions">
              <button
                className="btn btn-filled"
                onClick={() => this.setNotesFormVisibility(true)}
              >
                Add Note
              </button>
            </div>
          </div>
          <div className="notes">
            {this.getFilteredNotes().map((item, idx) => {
              return (
                <div className="note" key={idx}>
                  <div className="upper">
                    <h3 className="note-title">{item.title}</h3>
                    <div className="note-actions">
                      <span className="edit-cont">
                        <Edit
                          className="icon"
                          onClick={() => this.onEditClick(idx)}
                        ></Edit>
                      </span>
                      <span className="delete-cont">
                        <Trash2
                          className="icon"
                          onClick={() => this.deleteNote(idx)}
                        ></Trash2>
                      </span>
                    </div>
                  </div>
                  <div className="lower">
                    <p className="note-desc">{item.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        {showNotesForm ? (
          <div className="form-cont">
            <div className="form">
              <input
                className="form-input"
                name="title"
                placeholder="Title"
                value={newNoteData.title}
                onChange={(e) => this.onNotesFormInputChange(e)}
                maxLength="20"
              />
              <input
                className="form-input"
                name="desc"
                placeholder="Description"
                value={newNoteData.desc}
                onChange={(e) => this.onNotesFormInputChange(e)}
              />
              <button
                className="btn btn-long mb2 noShadow"
                onClick={this.createNewNote}
              >
                Submit
              </button>
              <button
                onClick={() => this.setNotesFormVisibility(false)}
                className="btn btn-long btn-plane noShadow"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}

export default App
