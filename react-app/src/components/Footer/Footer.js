import React from 'react'
import './Footer.css'

const Footer = () => {
  const handleGoLinkedin = e=>{
    e.preventDefault()
    window.open('https://www.linkedin.com/in/yi-c-452811132/')
  }
  const handleGoGithub = e=>{
    e.preventDefault()
    window.open('https://github.com/heehyun1128/yc-Moment')
  }
  const handleGoPortfolio = e=>{
    e.preventDefault()
    window.open('https://heehyun1128.github.io/')
  }
  return (
    <div id='footer-main'>
      <div id='footer-sub-divs'>
        <h4>Moment@2023</h4>
      </div>
      <div id='footer-sub-divs'>
        <h4>CONTACT DEVELOPER</h4>
        <div id='contact-items'>
          <p onClick={handleGoLinkedin}>LinkedIn</p>
          <p onClick={handleGoGithub}>Github</p>
          <p onClick={handleGoPortfolio}>Portfolio</p>
        </div>
      </div>
      <div id='footer-sub-divs'>
        <h4>STACK</h4>
        <p>React, Redux, Flask, SQLAlchemy, PostgreSQL, CSS3</p>
      </div>
    </div>
  )
}

export default Footer