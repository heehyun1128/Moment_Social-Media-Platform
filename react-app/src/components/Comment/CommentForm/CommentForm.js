import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchCreateComment, fetchCreateCommentImage } from '../../../store/comment'
import { useParams } from 'react-router-dom'
import './CommentForm.css'

const CommentForm = () => {
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state.session.user)
  const [image,setImage] = useState(null)
  const [content,setContent] = useState('')
  const {postId}=useParams()
  console.log('postId',postId)

  const resetForm = () => {
    setImage(null)
    setContent('')
  }

  const handleSubmit= async (e)=>{
    e.preventDefault()
    if (!sessionUser){
      alert('Please log in to create a comment.')
    }
    const comment={
      content
    }
    const textData = await dispatch(fetchCreateComment(postId,comment));
    console.log(textData.id)
    const formData = new FormData()
    formData.append('comment_image_url',image)
    formData.append('comment_id', textData.id)
    const data = await dispatch(fetchCreateCommentImage(formData))

    resetForm()

  }

  return (
    <div>
      <div id='comment-form-div'>
        <form id='create-comment-form' onSubmit={handleSubmit} encType="multipart/form-data">
          <textarea
            type="text"
            value={content}
            placeholder="Add comment here..."
            onChange={(e) => {
              console.log(e.target.value)
              setContent(e.target.value)
            }}
            required
          />
          <input
            type="file"
            accept="image/*"
            // value={profilePic}
            onChange={(e) => {
              console.log(e.target.files[0])
              setImage(e.target.files[0])
            }}

          />
          <button id='submit-comment-btn'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default CommentForm