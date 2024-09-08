import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchCreateCommentImage, fetchUpdateComment, fetchUpdateCommentImage } from '../../../store/comment';
import { useParams, useHistory } from 'react-router-dom'
import { useModal } from '../../../context/Modal';
import '../CommentForm/CommentForm.css'
import Loading from '../../Loading/Loading';
import ImageValidationModal from '../../Modal/ImageModal/ImageValidationModal';


const EditCommentModal = ({ comment }) => {
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state.session.user)
  const [image, setImage] = useState(null)
  const [content, setContent] = useState(comment?.content)
  const { postId } = useParams()
  const history = useHistory()
  const { closeModal } = useModal();
  const commentImageId = comment?.commentImages[0]?.id

  const [selImage, setSelImage] = useState(null)
  const [imageLoading, setImageLoading] = useState(false)
  const [initialUrl, setInitialUrl] = useState(null)
  const [errors, setErrors] = useState({});
  const { setModalContent, setOnModalClose } = useModal();


  useEffect(() => {
    const initialImgUrl = comment?.commentImages[0]?.commentImageUrl

   
    initialImgUrl && setSelImage(initialImgUrl)
    initialImgUrl && setInitialUrl(initialImgUrl)
  }, [comment?.commentImages])

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
   
    comment = {
      'id': comment.id,
      content
    }

    if (image && !isImageValid(image)) {
      setModalContent(<ImageValidationModal />)
      return
    } else {
      const textData = await dispatch(fetchUpdateComment(comment));

      if (textData && textData.errors) {
        setErrors(textData.errors)
        return
      }

      const formData = new FormData()
      formData.append('comment_id', textData?.id)
      if (textData?.id && image) {

        formData.append('comment_image_url', image)
        setImageLoading(true)
        if (initialUrl) {

          const data = await dispatch(fetchUpdateCommentImage(formData, commentImageId))
        } else {
          await dispatch(fetchCreateCommentImage(formData))
        }
      }
    }


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

                  setContent(e.target.value)
                }}
                required
              />
              {errors && errors.content &&
                <p className="errors">{errors.content}</p>
              }

            </label>
          </div>
          <div id='edit-comment-img-container'>
            <img src={selImage} id='comment-img' alt='' />
            <label id='edit-comment-img-input-label'>

              <input
                type="file"
                accept="image/*"
               
                onChange={(e) => {

                  setImage(e.target.files[0])
                  displayFile(e)
                }}

              />
              <span className='comment-icon-span'>+</span>
            </label>
          </div>

          {imageLoading ?
            <>
              <Loading />
              <p>Submitting...</p>
            </>
            : <button id='edit-comment-btn'>Submit</button>}
        </form>
      </div>
    </div>
  )
}

export default EditCommentModal