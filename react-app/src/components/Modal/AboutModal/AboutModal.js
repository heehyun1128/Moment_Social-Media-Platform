import React from 'react'
import { useDispatch } from "react-redux"
import { useModal } from '../../../context/Modal'
import './AboutModal.css'


const AboutModal = ({ type }) => {

  const { closeModal } = useModal()


  const closeCurrModal = e => {
    e.preventDefault();
    closeModal()

  }
  return (

    <div id='about-me-div'>
      <h2>ABOUT ME</h2>
      <h4 id='about-me-txt'>
        Welcome to MOMENT – the place where you can truly express yourself! Our platform empowers you to create, update, and delete your own posts, share your thoughts and memorable moments, and connect with like-minded individuals.
        <br />
        <div>...</div>
        Here, you're the author of your own story, and we're here to make it easy. Engage with others by commenting on posts and showing your appreciation with likes. Grow your circle by following other users, and watch as others follow your journey in return.
        <br />
        <div>...</div>
        Looking for something specific or seeking inspiration? Our search feature is your trusty companion. MOMENT is all about building connections, creating lasting memories, and sparking meaningful conversations in the digital realm. 
        <br/>
        <div>...</div>
        Join us today and start sharing your story!
      </h4>

      <button onClick={closeCurrModal} >{`CLOSE WINDOW`}</button>
    </div>

  )
}

export default AboutModal