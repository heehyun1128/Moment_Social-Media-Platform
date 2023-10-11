import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import PostCard from "../Post/PostCard/PostCard";
import { fetchUserPosts } from "../../store/user";
import './UserProfile.css'

const UserProfile = () => {
  const { userId } = useParams()
  const dispatch = useDispatch()
  const history = useHistory();
  const sessionUser = useSelector(state => state.session?.user)
 

 
  // if (!sessionUser || (sessionUser && Number(sessionUser.id) !== Number(userId))) {
  //   history.push('/')
  // }

  const userPosts=useSelector(state=>state.users?.singleUser?.userPosts)
 
  useEffect(()=>{
    dispatch(fetchUserPosts(sessionUser.id))
  }, [dispatch])
  
  if (!userPosts) { return null }
  const userPostArr=Object.values(userPosts)
  
 
  if (!sessionUser) { return null }
  console.log(userPostArr)
  return (
    <div id='profile-page-main-div'>
    <div id='profile-info-div'>
        <div id='profile-info-img-div'>
          <img src={sessionUser.profileImage} alt="" />
        </div>
        <h4>{sessionUser && sessionUser.username}</h4>
    </div>
      <h2>All Posts</h2>
      <div id='user-post-div' >
        {userPostArr && userPostArr.map(post => {
          console.log(post)
          return <PostCard post={post} />
        })}
      </div>
    </div>
  )
}

export default UserProfile