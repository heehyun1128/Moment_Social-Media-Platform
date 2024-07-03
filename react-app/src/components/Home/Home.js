import React, { useEffect, useRef, useState } from "react";
import './Home.css'
import './Home2.css'
import './Home3.css'
import { useHistory } from 'react-router-dom';
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import img1 from '../images/img1.png'
import img2 from '../images/img2.png'
import img3 from '../images/img3.png'
import demouser from '../images/demouser.png'
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";

const Home = () => {
  const sessionUser = useSelector((state) => state.session.user)
  const [showMenu, setShowMenu] = useState(false);

  const ulRef = useRef();
  const history = useHistory()

  const dispatch = useDispatch()
  const handleGoToAllPosts = e => {
    e.preventDefault()
    history.push('/posts/all')
  }
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef?.current?.contains(e.target)) {
        setShowMenu(false);
      
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);
  const closeMenu = () => setShowMenu(false);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/')
    closeMenu()
  };
  const videoRef = useRef(null);
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play();
    }
  }, []);
  
  return (

    <div id="home" >
      <video ref={videoRef} autoplay loop muted >
        <source  src="https://aamomentbucket.s3.us-west-1.amazonaws.com/4763786-uhd_4096_2160_24fps.mp4" type="video/mp4" />
      </video>
    <div id="head-icon-div">
        {sessionUser ? 
        <div id='home-logout'>
            <div>Hi, {sessionUser?.username}</div>
            <div>| </div>
            <div onClick={handleLogout}> LOG OUT</div>
        </div>
        : <div id='home-login-signup'>
          <OpenModalButton
            id='home-login-btn'
            buttonText=" LOG IN"
            onItemClick={closeMenu}
            modalComponent={<LoginFormModal />}
          />

          <OpenModalButton
            id='home-signup-btn'
            buttonText=" SIGN UP"
            onItemClick={closeMenu}
            modalComponent={<SignupFormModal />}
          />
            
        </div>
        
        
        }
        <NavLink exact to='/posts/all' class="button " style={{fontSize:"22px", paddingTop:"0px !important"}}>DISCOVER</NavLink>
    </div>
      <div id="intro">
        <h2 className="text-focus-in_top">SHARE YOUR </h2>
        <h1 className="text-focus-in">MOMENT</h1>
        <p style={{ color: '#c1cad9' }}>Welcome to Moment,
          <br />
          where every post is a cherished memory waiting to be shared. <br />Connect with friends and make moments</p>

        <ul className="actions puff-in-center ">
          <li><a href="#home-header" class="button icon solid solo fa-arrow-down scrolly">Continue</a></li>
        </ul>
      </div>

      <header id="home-header">
       
      


      <div id="main">

      
        <article class="post featured">
          
            <span class="date">FEATURED POSTS</span>

          <div id="portfolio-container" className="animate__fadeInUp">
            <div class="card" onClick={()=>{
              history.push('/posts/12')
            }}>
              <img src={img1} alt="" />
             
              <div className="content">

                <h1>01</h1>
                <h2>HELLO DISNEY</h2>
                <div id='home-user-profile' >
                  <div id='niannian-img-div'></div>
                  <p>Nian Nian</p>
                </div>
                <h3>My visit to Disney was a magical adventure filled with enchanting rides, beloved characters, and a contagious atmosphere of joy.</h3>
               
              </div>

            </div>


              <div class="card" onClick={() => {
                history.push('/posts/11')
              }}>
              <img src={img2} alt="" />
              <div className="content">

                <h1>02</h1>
                <h2>my best friend</h2>
                <div id='home-user-profile' >
                  <div id='demo-img-div'></div>
                  <p>Demo</p>
                </div>
                <h3>Dogs aren't just pets; they're family. My furry companion is not just a pet but also my confidant, playmate, and unwavering source of unconditional love. 🐾 </h3>
                
              </div>

            </div>

              <div class="card" onClick={() => {
                history.push('/posts/13')
              }}>
              <img src={img3} alt="" />
              <div className="content">

                <h1>03</h1>
                <h2>Hiking Day</h2>
                <div id='home-user-profile' >
                  <div id='bobbie-img-div'></div>
                  <p>Bobbie</p>
                </div>
                <h3>Today's hiking adventure was like stepping into a breathtaking postcard. With every step, we uncovered hidden treasures and felt a deep connection to the great outdoors.</h3>
                
              </div>

            </div>
          </div>
          <ul id="discover-at-bottom">
            <li><NavLink exact to='/posts/all' class="button large">DISCOVER MORE</NavLink></li>
          </ul>
        </article>

       

        
      

      </div>
      </header>
    </div>

    // <div id='home-div' >
    //   <div id='round'>
    //   </div>
    //   <div id='home-text'>
    //     <h2 id='site-name'>MOMENT <p></p> </h2>

    //     <h1 id='header'>Capture Best Moments in Life </h1>
    //     <button id='home-btn' onClick={handleGoToAllPosts}>Discover More</button>

    //   </div>
    // </div>


  )
}

export default Home