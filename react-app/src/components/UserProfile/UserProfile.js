import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { fetchUserPosts } from "../../store/post";
import PostCard from "../Post/PostCard/PostCard";

const UserProfile = () => {
  const { userId } = useParams()
  const dispatch = useDispatch()
  const history = useHistory();
  const sessionUser = useSelector(state => state.session?.user)

 
  if (!sessionUser || (sessionUser && Number(sessionUser.id) !== Number(userId))) {
    history.push('/')
  }

  const userPosts=useSelector(state=>state.posts)
  const userPostArr=Object.values(userPosts)
  useEffect(()=>{
    dispatch(fetchUserPosts(sessionUser.id))
  },[dispatch])

  if (!userPostArr || !userPostArr.length) { return null }
 
  if (!sessionUser) { return null }
  console.log(userPostArr)
  return (
    <div>
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