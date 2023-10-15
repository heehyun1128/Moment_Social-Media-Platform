import React, { useEffect } from "react";
import './Home.css'
import { useHistory } from 'react-router-dom';


const Home = () => {
  const history = useHistory()
  const handleGoToAllPosts = e => {
    e.preventDefault()
    history.push('/posts/all')
  }


  return (



    <div id='home-div' >
      <div id='round'>
      </div>
      <div id='home-text'>
        <h2 id='site-name'>MOMENT <p></p> </h2>
       
        <h1 id='header'>Capture Best Moments in Life </h1>
        <button id='home-btn' onClick={handleGoToAllPosts}>Discover More</button>

      </div>
    </div>


  )
}

export default Home