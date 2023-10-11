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
  const [selImage, setSelImage] = useState(null)
  const [isSubmitted,setIsSubmitted]=useState(false)

  const displayFile = e => {
    console.log('called')
    e.stopPropagation()
    const image = e.target.files[0]
    const imageUrl = URL.createObjectURL(image)
    setSelImage(imageUrl)
  }
  const resetForm = () => {
    setImage(null)
    setContent('')
  }

  const isImageValid = (image) => {
    const imageExtensions = ["pdf", "PDF", "png", "PNG", "jpg", "JPG", "jpeg", "JPEG", "gif", "GIF"]
    if (!imageExtensions?.some(extension => image?.postImageUrl?.endsWith(extension) ||
      image?.name?.endsWith(extension))) {
      return false
    } else {
      return true
    }
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
    const formData = new FormData()
    if(image && !isImageValid(image)){
      alert('Pictures must end with "pdf", "PDF", "png", "PNG", "jpg", "JPG", "jpeg", "JPEG", "gif", "GIF" ')
      return
    }else{

      formData.append('comment_image_url',image)
      formData.append('comment_id', textData.id)
      const data = await dispatch(fetchCreateCommentImage(formData))
      setIsSubmitted(true)
    }
    

    resetForm()
    setImage(null)

  }

  return (
    <div>
      <div id='comment-form-div'>
      <div></div>
      <h4>Add your comment here</h4>
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
          <div id='submit-comment-div'>
            {selImage &&!isSubmitted && <img src={selImage} id='comment-img' alt='' />}
            <input
              type="file"
              accept="image/*"
              // value={profilePic}
              onChange={(e) => {
                console.log(e.target.files[0])
                setImage(e.target.files[0])
                displayFile(e)
              }}

            />
            <button id='submit-comment-btn'>Submit Comment</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CommentForm