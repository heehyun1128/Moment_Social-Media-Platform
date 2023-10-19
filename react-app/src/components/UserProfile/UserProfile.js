import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, useLocation, NavLink } from "react-router-dom";
import PostCard from "../Post/PostCard/PostCard";
import { fetchSingleUser, fetchUserPosts } from "../../store/user";
import './UserProfile.css'
import UserPost from "../Post/UserPost/UserPost";
import Like from "../Like/Like";

const UserProfile = () => {
  const { userId } = useParams()
  const dispatch = useDispatch()
  const history = useHistory();
  const location = useLocation()
  const currentPath = location.pathname
  const sessionUser = useSelector(state => state.session?.user)
  const [isViewAllUserPosts,setIsViewAllUserPosts] = useState(true)
  const [isViewLikedPosts,setIsViewLikedPosts] = useState(true) 
  const [redText,setRedText] = useState(true)
  const [redLike,setRedLike] = useState(false)

  const allStyle = { color: redText ?'#c69a9a':'black'}
  const likeStyle = { color: redLike ?'#c69a9a':'black'}

  const singleUser = useSelector(state => state.users?.singleUser)
  console.log(singleUser)
  if (!sessionUser || (sessionUser && Number(sessionUser.id) !== Number(userId))) {
    history.push('/')
  }

  // const userPosts = useSelector(state => state.users?.singleUser?.userPosts)

  useEffect(() => {
    dispatch(fetchSingleUser(userId))
  }, [dispatch, userId])
  // useEffect(() => {
  //   dispatch(fetchUserPosts(sessionUser.id))
  // }, [dispatch, sessionUser.id])

  const handleViewAllUserPosts = e=>{
    e.preventDefault()
    
    setIsViewAllUserPosts(!isViewAllUserPosts)
    setIsViewLikedPosts(!isViewLikedPosts)
    setRedText(true)
    setRedLike(false)
  }
  const handleViewLikedPosts = e=>{
    e.preventDefault()
    setIsViewAllUserPosts(!isViewAllUserPosts)
    setIsViewLikedPosts(!isViewLikedPosts)
    setRedText(false)
    setRedLike(true)
  }

  // if (!userPosts) { return null }
  // const userPostArr = Object.values(userPosts)


  if (!sessionUser || !singleUser) { return null }
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
        {isViewAllUserPosts && <UserPost/>}
        {isViewLikedPosts && <Like />}
      </div>
      
    </div>
  )
}

export default UserProfile