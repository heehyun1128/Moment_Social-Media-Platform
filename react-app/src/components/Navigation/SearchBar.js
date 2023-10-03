import React from 'react'

const SearchBar = () => {

  return (
    <div id='search-bar-div'>
      <form action="">
        <input id='search-bar-input' 
        type="text"
        placeholder='Search for a post...'
        // value={searchInput} 
        // onChange={handleSearchInputChange}
        />
      </form>
    </div>
  )
}

export default SearchBar