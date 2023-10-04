import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import './PostCard.css'
import { fetchSinglePost } from "../../../store/post";


const PostCard = ({post}) => {
 


  return (
    <div id='post-card-div'>
      <div id='post-card-img-div'>
        <img src={post?.previewImg} alt="" />
      </div>
      <h4>{post?.title}</h4>
      
    </div>
  )
}

export default PostCard