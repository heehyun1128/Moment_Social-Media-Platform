import React, { useEffect } from 'react'
import CommentCard from '../CommentCard/CommentCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllPostComments, fetchSingleCommentImage } from '../../../store/comment'

const CommentDetail = ({comments}) => {
  console.log(comments)
  
  const dispatch=useDispatch()

  // console.log(comments)
  // const postCommentsObj = useSelector(state => state.comments?.comments)
  
  // const postComments =postCommentsObj && Object.values(postCommentsObj)
 
  

  // useEffect(()=>{
  //   dispatch(fetchAllPostComments(post.id))
  // }, [dispatch, post.id])
 

  

  // if (!post ) {
  //   return null
  // }
  // if (!postCommentsObj ||! postComments.length){
  //   return null
  // }
  return (
    <div>
      
      {comments && comments.map(comment=>
        <CommentCard key={comment.id} comment={comment} />
      )}
    </div>
  )
}

export default CommentDetail