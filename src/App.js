import './App.scss'
import React, { Component } from 'react'
import { Book, Search, Trash2, Edit } from 'react-feather'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

class App extends Component {
  state = {
    showNotesForm: false,
    newNoteData: {
      title: '',
      desc: '',
    },
    currEdit: null,
    notes: [
      {
        title: 'Eat Breakfast',
        desc:
          'Have some healthy breakfast and also include enough micro nutrients',
      },
      {
        title: 'Play Soccer',
        desc: 'Have some healthy breakfast and enough micro nutrients',
      },
      {
        title: 'Water Plants',
        desc:
          'Water Plants and healthy breakfast and also include enough micro nutrients',
      },
      {
        title: 'Clean Diet',
        desc: 'Some healthy breakfast and also include enough micro nutrients',
      },
      {
        title: 'Exercise Yoga',
        desc: 'Have some healthy breakfast and  include enough micro nutrients',
      },
    ],
    searchQuery: '',
    sort: 'new',
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

    if (!newNoteData.title.length) {
      return toast.error('Title is Must', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }

    if (!newNoteData.desc.length) {
      return toast.error('Description is Must', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }

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
      const newNotes = [newNoteData].concat(notes)

      this.setState(
        {
          newNoteData: {
            title: '',
            desc: '',
          },
          notes: newNotes,
          showNotesForm: false,
        },
        () => {
          toast.success('🦄 Note Added', {
            position: 'bottom-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        }
      )
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
    let { searchQuery, notes, sort } = this.state
    notes = notes.filter((note, idx) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return sort === 'new' ? notes : notes.reverse()
  }

  render() {
    const { showNotesForm, newNoteData, searchQuery } = this.state
    return (
      <div className="app">
        <ToastContainer position="bottom-right" />
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
            <div className="main-actions">
              <button
                className="btn"
                onClick={() => this.setNotesFormVisibility(true)}
              >
                Add Note
              </button>
            </div>
            <select
              onChange={(e) => {
                this.setState({
                  sort: e.target.value,
                })
              }}
              name="sort"
              id="cars"
            >
              <option value="new">Newest</option>
              <option value="old">Oldest</option>
            </select>
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
