import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchCreateComment, fetchCreateCommentImage } from '../../../store/comment'
import { useParams } from 'react-router-dom'
import './CommentForm.css'
import Loading from '../../Loading/Loading';
import PermitErrorModal from '../../ErrorModal/PermitErrorModal';
import { useModal } from '../../../context/Modal';
import ImageValidationModal from '../../Modal/ImageModal/ImageValidationModal';

const CommentForm = () => {
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state.session.user)
  const [image, setImage] = useState(null)
  const [content, setContent] = useState('')
  const { postId } = useParams()

  const [selImage, setSelImage] = useState(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [imageLoading, setImageLoading] = useState(false)
  const [isPermitError, setIsPermitError] = useState(false)
  const [errors, setErrors] = useState({});
  const { setModalContent, setOnModalClose } = useModal();

  const displayFile = e => {

    e.stopPropagation()
    const image = e.target.files[0]
    const imageUrl = image && URL.createObjectURL(image)
    setSelImage(imageUrl)
  }
  const resetForm = () => {
    setImage(null)
    setContent('')
  }

  const isImageValid = (image) => {
    const imageExtensions = ["png", "PNG", "jpg", "JPG", "jpeg", "JPEG", "gif", "GIF"]
    if (!imageExtensions?.some(extension => image?.postImageUrl?.endsWith(extension) ||
      image?.name?.endsWith(extension))) {
      return false
    } else {
      return true
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!sessionUser) {
     
      setModalContent(<PermitErrorModal />);
    }
    const comment = {
      content
    }
  
    const formData = new FormData()
    if (image && !isImageValid(image)) {
      setModalContent(<ImageValidationModal />);
      return
    } else {
      const textData = await dispatch(fetchCreateComment(postId, comment));
      if (textData && textData.errors) {
        setErrors(textData.errors)
        return
      }
      formData.append('comment_image_url', image)
      formData.append('comment_id', textData.id)
      setImageLoading(true)
      if (textData.id) {

        const data = await dispatch(fetchCreateCommentImage(formData))
        setIsSubmitted(true)
        setSelImage('')
      }
    }


    resetForm()
    setImage(null)
    setImageLoading(false)
    setErrors('')

  }

  return (
    <div id='comment-form-main' >

      <div id='comment-form-div'>
      
        <h6>Add your comment here</h6>
        <form id='create-comment-form' onSubmit={handleSubmit} encType="multipart/form-data">
          <textarea
            type="text"
            value={content}
            placeholder="Add comment here..."
            onChange={(e) => {

              setContent(e.target.value)
            }}
            required
          />
          {errors && errors.content &&
            <p className="errors">{errors.content}</p>
          }
          {selImage && <img src={selImage} id='comment-img' alt='' />}
          <div id='submit-comment-div'>
            <label>
              <div id='select-image'>SELECT IMAGE</div>
              <input
                type="file"
                accept="image/*"
               
                onChange={(e) => {

                  setImage(e.target.files[0])
                  displayFile(e)
                }}

              />
            </label>

            {imageLoading ? (
              <>
                <Loading />
                <p>Submitting...</p>
              </>
            ) : (<button id='submit-comment-btn'>SUBMIT COMMENT</button>)}
          </div>
        </form>
      </div>
    </div>
  )
}

export default CommentForm