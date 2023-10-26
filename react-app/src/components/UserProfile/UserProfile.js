import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, useLocation, NavLink } from "react-router-dom";
import PostCard from "../Post/PostCard/PostCard";
import { fetchFollowers, fetchSingleUser, fetchUserPosts } from "../../store/user";
import './UserProfile.css'
import UserPost from "../Post/UserPost/UserPost";
import Like from "../Like/Like";
import Follower from "../Follow/Follower/Follower";
import Followed from "../Follow/Followed/Followed";

const UserProfile = () => {
  const { userId } = useParams()
  const dispatch = useDispatch()
  const history = useHistory();
  // const location = useLocation()
  // const currentPath = location.pathname
  const sessionUser = useSelector(state => state.session?.user)
  const [isViewAllUserPosts, setIsViewAllUserPosts] = useState(true)
  const [isViewLikedPosts, setIsViewLikedPosts] = useState(false)
  const [isViewFollowers, setIsViewFollowers] = useState(false)
  const [isViewFollowed, setIsViewFollowed] = useState(false)
  const [redText, setRedText] = useState(true)
  const [redLike, setRedLike] = useState(false)

  const allStyle = { color: redText ? '#c69a9a' : 'black' }
  const likeStyle = { color: redLike ? '#c69a9a' : 'black' }

  const singleUser = useSelector(state => state.users?.singleUser)
  // console.log(singleUser)
  if (!sessionUser || (sessionUser && Number(sessionUser.id) !== Number(userId))) {
    history.push('/')
  }

  const userPosts = useSelector(state => state.users?.singleUser?.userPosts)
  useEffect(() => {
    dispatch(fetchSingleUser(userId))
  }, [dispatch, userId])
  useEffect(() => {
    dispatch(fetchUserPosts(sessionUser.id))
  }, [dispatch, sessionUser.id])

  console.log(userPosts)
  if (!userPosts) { return null }
  const userPostArr = Object.values(userPosts)

  const handleViewAllUserPosts = e => {
    e.preventDefault()

    setIsViewAllUserPosts(true)
    setIsViewLikedPosts(false)
    setIsViewFollowers(false)
    setIsViewFollowed(false)
    setRedText(true)
    setRedLike(false)
  }
  const handleViewLikedPosts = e => {
    e.preventDefault()
    setIsViewAllUserPosts(false)
    setIsViewLikedPosts(true)
    setIsViewFollowers(false)
    setIsViewFollowed(false)
    setRedText(false)
    setRedLike(true)
  }

  const handleViewUserFollowers=e=>{
    e.preventDefault()
    setIsViewAllUserPosts(false)
    setIsViewLikedPosts(false)
    setIsViewFollowed(false)
    setIsViewFollowers(true)
  }
  const handleViewUserFollowed=e=>{
    e.preventDefault()
    setIsViewAllUserPosts(false)
    setIsViewLikedPosts(false)
    setIsViewFollowers(false)
    setIsViewFollowed(true)
  }


  if (!sessionUser) { return null }
  // console.log(userPostArr)
  return (
    <div id='profile-page-main-div'>
      <div id='profile-info-div'>
        <div id='profile-info-img-div'>
          {singleUser?.profileImage ? <img src={singleUser.profileImage} alt="" /> :
            <i class="fa-solid fa-user fa-lg"></i>

          }
        </div>
        <h4>{sessionUser && sessionUser.username}</h4>
        <div id="follower" onClick={handleViewUserFollowers}>
          FOLLOWERS
        </div>
        <div id="follower" onClick={handleViewUserFollowed}>
          FOLLOWING
        </div>
      </div>
      <div id="post-nav">
        <div id='nav-link-div'>
          <h2 style={allStyle} onClick={handleViewAllUserPosts}>YOUR POSTS</h2>
        </div>
        <div className='nav-link-div'>
          <h2 style={likeStyle} onClick={handleViewLikedPosts}>LIKED POSTS</h2>
        </div>
      </div>
      <div id="posts-div">
        {isViewAllUserPosts && <UserPost userPostArr={userPostArr} />}
        {isViewLikedPosts && <Like />}
        {isViewFollowers && <Follower />}
        {isViewFollowed && <Followed />}
      </div>

    </div>
  )
}

export default UserProfile