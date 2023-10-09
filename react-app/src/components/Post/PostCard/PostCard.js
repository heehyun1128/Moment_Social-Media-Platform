import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom'
import './PostCard.css'


const PostCard = ({post}) => {
 console.log(post)
  const history = useHistory()
  const createdDate = post?.createdAt.slice(0,16)

  const handleClickPostCard = (e) => {
    e.preventDefault()
    history.push(`/posts/${post?.id}`)
  }
  return (
    <div id='post-card-div' onClick={handleClickPostCard}>
      <div id='post-card-img-div'>
        {post&&<img src={post && post?.previewImg} alt="" />}
      </div>
      {post && <h4>{post?.title}</h4>}
      {post && <p>Created by: {post?.creator?.username}</p>}
      {post && <p>Created at: {createdDate}</p>}
    </div>
  )
}

export default PostCard