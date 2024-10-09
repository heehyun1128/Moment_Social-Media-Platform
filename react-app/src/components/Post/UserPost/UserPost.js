import React from "react";
import {  useSelector } from "react-redux";
import PostCard from '../PostCard/PostCard'
import { useParams, useHistory} from "react-router-dom";

import './UserPost.css'
const UserPost = ({userPostArr}) => {
  const { userId } = useParams()
  const history = useHistory();
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