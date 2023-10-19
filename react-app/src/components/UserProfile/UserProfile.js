import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import PostCard from "../Post/PostCard/PostCard";
import { fetchSingleUser, fetchUserPosts } from "../../store/user";
import './UserProfile.css'

const UserProfile = () => {
  const { userId } = useParams()
  const dispatch = useDispatch()
  const history = useHistory();
  const sessionUser = useSelector(state => state.session?.user)
 

  const singleUser=useSelector(state=>state.users?.singleUser)
 console.log(singleUser)
  if (!sessionUser || (sessionUser && Number(sessionUser.id) !== Number(userId))) {
    history.push('/')
  }

  const userPosts=useSelector(state=>state.users?.singleUser?.userPosts)
 
  useEffect(()=>{
    dispatch(fetchSingleUser(userId))
  }, [dispatch, userId])
  useEffect(()=>{
    dispatch(fetchUserPosts(sessionUser.id))
  }, [dispatch,sessionUser.id])
 
  
  if (!userPosts) { return null }
  const userPostArr=Object.values(userPosts)
  
 
  if (!sessionUser || !singleUser) { return null }
  console.log(userPostArr)
  return (
    <div id='profile-page-main-div'>
    <div id='profile-info-div'>
        <div id='profile-info-img-div'>
          {singleUser?.profileImage? <img src={singleUser.profileImage} alt="" /> :
            <i class="fa-solid fa-user fa-lg"></i>
          
          }
        </div>
        <h4>{sessionUser && sessionUser.username}</h4>
    </div>
      <h2>YOUR POSTS</h2>
      <div id='user-post-div' >
        {userPostArr && userPostArr.map(post => {
          console.log(post)
          return <PostCard post={post} />
        })}
      </div>
      {!userPostArr.length && <p>No Posts here</p>}
    </div>
  )
}

export default UserProfile