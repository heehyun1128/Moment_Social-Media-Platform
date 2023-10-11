import React from 'react'
import { useDispatch} from "react-redux"
import { useModal } from '../../../context/Modal'
import { fetchDeleteComment } from '../../../store/comment'

const DeleteCommentModal = ({commentId}) => {
  const dispatch = useDispatch()
  const { closeModal } = useModal()


  const handleDelete = e=>{
    e.preventDefault()
    dispatch(fetchDeleteComment(commentId))
    closeModal()

  }
  const closeDeleteModal = e => {
    e.preventDefault();
    closeModal()

  }
  return (
    <div id="delete-modal-container">
      <h3 id='delete-modal-header'>Confirm Delete</h3>
      <p className="delete-modal-msg">
        Are you sure you want to remove this comment?
      </p>
      <button onClick={handleDelete} className="delete-modal-btn yes">{`Confirm Deletion`}</button>
      <button onClick={closeDeleteModal} className="delete-modal-btn no">{`Cancel Deletion`}</button>
    </div>
  )
}

export default DeleteCommentModal