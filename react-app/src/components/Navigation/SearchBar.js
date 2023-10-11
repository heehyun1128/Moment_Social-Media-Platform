import React from 'react'

const SearchBar = () => {

  const handleSearch =e=>{
    e.preventDefault()
    alert('Feature comming soon!')
  }
  return (
    <div id='search-box' style={{display:'none'}}>
      <form action="">
        <input id='search-text' 
        onClick={handleSearch}
        type="text"
        placeholder='Search for a post...'
        // value={searchInput} 
        // onChange={handleSearchInputChange}
        />
        <button id='search-btn'>
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
    </div>
  )
}

export default SearchBar