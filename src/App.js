import './App.scss'
import React, { Component } from 'react'
import Sidebar from './components/sidebar'
import MainSearch from './components/MainSearch'
import Notes from './components/Notes'
import NotesForm from './components/NotesForm'
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
        desc: 'Have some healthy breakfast in the morning to boost your day',
        date: '10 / 10 / 2020',
      },
      {
        title: 'Soccer Event',
        desc: 'Attend the interschool soccer event in the middle of city',
        date: '9 / 10 / 2020',
      },
      {
        title: 'Water Plants',
        desc: 'Water plants twice a day and use cold water and filtered water',
        date: '8 / 10 / 2020',
      },
      {
        title: 'Beach Trip',
        desc:
          'Visit one nearby beach and enjoy the view while having some fresh drinks',
        date: '7 / 10 / 2020',
      },
      {
        title: 'Practice Yoga',
        desc:
          'Practice Yoga to stay away from diseases and to protect your health',
        date: '6 / 10 / 2020',
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
      this.setState(
        {
          newNoteData: {
            title: '',
            desc: '',
          },
          notes: updatedNotes,
          showNotesForm: false,
          currEdit: null,
        },
        () => {
          toast.success('🦄 Note Updated', {
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
    } else {
      newNoteData.date = `${new Date().getDate()} / ${new Date().getMonth()} / ${new Date().getFullYear()}`
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

  onSearchInput = (e) => {
    console.log(e.target.value)
    this.setState({
      searchQuery: e.target.value,
    })
  }

  render() {
    const { showNotesForm, newNoteData, searchQuery } = this.state
    return (
      <div className="app">
        <ToastContainer position="bottom-right" />
        <Sidebar />
        <div className="main-app">
          <MainSearch
            searchQuery={searchQuery}
            onSearchInput={this.onSearchInput}
          />
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
          <Notes
            getFilteredNotes={this.getFilteredNotes}
            onEditClick={this.onEditClick}
            deleteNote={this.deleteNote}
          />
        </div>
        {showNotesForm ? (
          <NotesForm
            newNoteData={newNoteData}
            onNotesFormInputChange={this.onNotesFormInputChange}
            createNewNote={this.createNewNote}
            setNotesFormVisibility={this.setNotesFormVisibility}
          />
        ) : null}
      </div>
    )
  }
}

export default App
