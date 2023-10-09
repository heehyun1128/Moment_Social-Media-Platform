import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchUpdateComment, fetchUpdateCommentImage } from '../../../store/comment';
import { useParams, useHistory } from 'react-router-dom'
import { useModal } from '../../../context/Modal';


const EditCommentModal = ({ comment }) => {
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state.session.user)
  const [image, setImage] = useState(null)
  const [content, setContent] = useState(comment?.content)
  const { postId } = useParams()
  const history = useHistory()
  console.log(comment)
  const { closeModal } = useModal();

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
    console.log(comment)
    const textData = await dispatch(fetchUpdateComment(comment));
    console.log(textData.id)
    // const formData = new FormData()
    // formData.append('comment_image_url', image)
    // formData.append('comment_id', textData.id)
    // const data = await dispatch(fetchUpdateCommentImage(formData))

    resetForm()
    closeModal();
  }
  return (
    <div>
      <form id='create-comment-form' onSubmit={handleSubmit} encType="multipart/form-data">
        <textarea
          type="text"
          value={content}
          placeholder="Update comment here..."
          onChange={(e) => {
            console.log(e.target.value)
            setContent(e.target.value)
          }}
          required
        />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default EditCommentModal