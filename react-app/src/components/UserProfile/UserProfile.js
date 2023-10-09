import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import PostCard from "../Post/PostCard/PostCard";
import { fetchUserPosts } from "../../store/user";

const UserProfile = () => {
  const { userId } = useParams()
  const dispatch = useDispatch()
  const history = useHistory();
  const sessionUser = useSelector(state => state.session?.user)

 
  if (!sessionUser || (sessionUser && Number(sessionUser.id) !== Number(userId))) {
    history.push('/')
  }

  const userPosts=useSelector(state=>state.users?.singleUser?.userPosts)
 
  useEffect(()=>{
    dispatch(fetchUserPosts(sessionUser.id))
  }, [dispatch])
  
  if (!userPosts) { return null }
  const userPostArr=Object.values(userPosts)
  
 
  if (!sessionUser) { return null }
  console.log(userPostArr)
  return (
    <div>
    <h1>{sessionUser && sessionUser.username}'s Profile Page</h1>
      <div id='user-post-div' >
      <h4>All Posts</h4>
        {userPostArr && userPostArr.map(post => {
          console.log(post)
          return <PostCard post={post} />
        })}
      </div>
    </div>
  )
}

export default UserProfile