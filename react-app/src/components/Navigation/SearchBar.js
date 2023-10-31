import React, { useEffect } from "react";
import { fetchSearchedPosts } from "../../store/post";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/"

const SearchBar = ({ searchContent, setSearchContent }) => {

  const history = useHistory()
  const dispatch=useDispatch()

  const handleSubmit = async e=>{
    e.preventDefault()
    const data = await dispatch(fetchSearchedPosts(searchContent))
   

    history.push(`/search?q=${searchContent}`)
    setSearchContent("")
  }
  const handleSearchInputChange = e=>{
    e.preventDefault()
  
    setSearchContent(e.target.value)
    
  }


  return (
    <div id='search-box' >
      <form onSubmit={handleSubmit}>
        <input id='search-text' 
        value={searchContent}
        type="text"
        placeholder='Search for a post...'
        onChange={handleSearchInputChange}
        />
        <button id='search-btn'>
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
    </div>
  )
}

export default SearchBar