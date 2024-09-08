import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from '../PostCard/PostCard'
import { useParams, useHistory, useLocation, NavLink } from "react-router-dom";
import { fetchSingleUser, fetchUserPosts } from "../../../store/user";
import './UserPost.css'
const UserPost = ({userPostArr}) => {
  const { userId } = useParams()
  const dispatch = useDispatch()
  const history = useHistory();
  const location = useLocation()
  const currentPath = location.pathname
  const sessionUser = useSelector(state => state.session?.user)


 
  if (!sessionUser || (sessionUser && Number(sessionUser.id) !== Number(userId))) {
    history.push('/')
  }

 


  if (!sessionUser ) { return null }

  return (
    <div >
      {/* <h2>YOUR POSTS</h2> */}
      <div id='user-post-div' >
        {userPostArr && userPostArr.map(post => {
       
          return post && <PostCard post={post} />
        })}
        {!userPostArr?.length && <div id='no-post'><p >No Posts here</p></div>}
      </div>
    </div>
  )
}

export default UserPost