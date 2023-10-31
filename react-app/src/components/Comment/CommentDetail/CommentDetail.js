import React, { useEffect } from 'react'
import CommentCard from '../CommentCard/CommentCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllPostComments, fetchSingleCommentImage } from '../../../store/comment'
import './CommentDetail.css'

const CommentDetail = ({comments}) => {

  
  const dispatch=useDispatch()

 
  return (
    <div>
      
      {comments && comments.map(comment=>
        <CommentCard key={comment.id} comment={comment} />
      )}
      {!comments?.length && <div id='no-comments'>No Comments</div>}
    </div>
  )
}

export default CommentDetail