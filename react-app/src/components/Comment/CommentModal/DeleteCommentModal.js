import React from 'react'
import { useDispatch} from "react-redux"
import { useModal } from '../../../context/Modal'
import { fetchDeleteComment } from '../../../store/comment'
import './DeleteCommentModal.css'

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
      <h3 id='delete-modal-header'>CONFIRM DELETION</h3>
      <h4 className="delete-modal-msg" style={{textTransform:"capitalize"}}>
        Are you sure you want to remove this comment?
      </h4>
      <button onClick={handleDelete} className="delete-modal-btn yes">{`CONFIRM DELETION`}</button>
      <button onClick={closeDeleteModal} className="delete-modal-btn no">{`CANCEL DELETION`}</button>
    </div>
  )
}

export default DeleteCommentModal