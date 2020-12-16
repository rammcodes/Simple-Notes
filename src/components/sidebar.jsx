import React, { Component } from 'react'
import { Book } from 'react-feather'

class Sidebar extends Component {
  state = {}
  render() {
    return (
      <div className="sidebar">
        <h1 className="app-title">
          <span>Notes</span>
          <Book className="icon" />
        </h1>
        <div className="app-info"></div>
        <div className="bottom">
          <p className="product-info">
            <span>Made By</span>
            <a
              href="https://rammaheshwari.com"
              target="_blank"
              rel="noreferrer"
            >
              Ram
            </a>
          </p>
        </div>
      </div>
    )
  }
}

export default Sidebar
