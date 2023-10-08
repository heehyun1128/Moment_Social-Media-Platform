import React, { useEffect } from 'react'
import CommentCard from '../CommentCard/CommentCard'
import { useDispatch, useSelector } from 'react-redux'
const CommentDetail = ({post}) => {
  console.log(post)
  return (
    <div>
      
      {post && post.postComments && post.postComments.map(comment=>
      <CommentCard comment={comment}/>
      )}
    </div>
  )
}

export default CommentDetail