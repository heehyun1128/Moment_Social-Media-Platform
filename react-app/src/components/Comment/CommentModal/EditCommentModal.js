import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchCreateCommentImage, fetchUpdateComment, fetchUpdateCommentImage } from '../../../store/comment';
import { useParams, useHistory } from 'react-router-dom'
import { useModal } from '../../../context/Modal';


const EditCommentModal = ({ comment }) => {
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state.session.user)
  const [image, setImage] = useState(null)
  const [content, setContent] = useState(comment?.content)
  const { postId } = useParams()
  const history = useHistory()
  // console.log(comment?.commentImages?.length)
  const { closeModal } = useModal();
  const commentImageId = comment?.commentImages[0]?.id
  // console.log(commentImageId)
  const [selImage, setSelImage] = useState(null)

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    // if (!sessionUser) {
    //   history.push('/')
    // }
    comment = {
      'id': comment.id,
      content
    }
    // console.log(comment)
    const textData = await dispatch(fetchUpdateComment(comment));


    const formData = new FormData()
    formData.append('comment_image_url', image)
    formData.append('comment_id', textData.id)
    console.log('formData - editimagemodal', formData)
    if (comment?.commentImages?.length) {

      const data = await dispatch(fetchUpdateCommentImage(formData, commentImageId))
    } else {
      await dispatch(fetchCreateCommentImage(formData))
    }
    // CALL FETCH CREATE COMMENT IMAGE IF NO EXISTING COMMENT IMAGE

    resetForm()
    closeModal();
  }
  return (
    <div id='edit-comment-modal'>
      <div>
        <form id='edit-comment-form' onSubmit={handleSubmit} encType="multipart/form-data">
          <div id='edit-comment-container'>
            <label id='edit-comment-input-label'>
              <textarea
                id='comment-field'
                type="text"
                value={content}
                placeholder="Update comment here..."
                onChange={(e) => {
                  console.log(e.target.value)
                  setContent(e.target.value)
                }}
                required
              />
              <span className='icon-span'><i class="fa-solid fa-comment fa-lg"></i><p className='icon-text'>Add Comment</p></span>
            </label>
          </div>
          <div id='edit-comment-img-container'>
            <img src={selImage} id='comment-img' alt='' />
            <label id='edit-comment-img-input-label'>

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
              <span className='icon-span'><i class="fa-solid fa-image fa-lg"></i><p className='icon-text'>Add Image</p></span>
            </label>
          </div>

          <button id='edit-comment-btn'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default EditCommentModal