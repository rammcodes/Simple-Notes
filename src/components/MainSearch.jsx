import React, { Component } from 'react'
import { Search } from 'react-feather'

class MainSearch extends Component {
  state = {}
  render() {
    const { searchQuery, onSearchInput } = this.props
    return (
      <div className="search">
        <span className="icon-cont">
          <Search className="icon" />
        </span>
        <input
          value={searchQuery}
          onChange={onSearchInput}
          placeholder="Search notes by title..."
        />
      </div>
    )
  }
}

export default MainSearch
