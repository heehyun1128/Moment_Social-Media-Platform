import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './Navigation.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory()
  const sessionUser = useSelector(state => state.session?.user)

  // const handleViewAllPosts = () => {
  //   history.push(`/profile/${sessionUser.id}`)
  //   closeMenu()
  // }
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

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/')
    closeMenu()
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <div onClick={openMenu}>
        <i class="fa-solid fa-user"></i>
      </div>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div id='profile-main'>
              <div id='profile-img-li'><img id='profile-img' src={user.profileImage} alt="" /></div>
              <div>Welcome, {user.username}</div>
            </div>
            {/* <li>{user.email}</li> */}

            {/* <div onClick={handleViewAllPosts}>View All Posts</div> */}
          
              <button id='logout-btn' onClick={handleLogout}>Log Out</button>
            
          </>
        ) : (
          <div id='signup-login-div'>
            <h4 id='signup-login-h4'>Hi there,please </h4>
          
            <OpenModalButton
              id='login-btn'
              buttonText=" Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <h4 id='signup-login-h4'>or </h4>
            <OpenModalButton
              id='signup-btn'
              buttonText=" Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />

          </div>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
