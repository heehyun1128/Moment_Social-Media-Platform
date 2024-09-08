import React from 'react'
import './Footer.css'
import { useModal } from '../../context/Modal'
import AboutModal from '../Modal/AboutModal/AboutModal'

const Footer = () => {
  const { setModalContent, setOnModalClose } = useModal()
  
  const handleViewAbout = ()=>{
    setModalContent(<AboutModal />)
  }
  return (
    <div id='footer-main'>
   
      <div id='footer-sub-divs'>
        <h6>STACK</h6>
        <p>React, Redux, Flask, OPENAI API, SQLAlchemy, PostgreSQL, JavaScript, Python, CSS3</p>
      <p id='about-btn' onClick={handleViewAbout}>Moment@2023 | ABOUT</p>
      </div>
    </div>
  )
}

export default Footer