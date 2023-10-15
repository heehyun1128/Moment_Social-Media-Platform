import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useModal } from '../../../context/Modal'
import { useParams, useHistory } from "react-router-dom";
import './DeleteCommentModal.css'
import { fetchDeletePost } from '../../../store/post'

const DeletePostModal = ({postId}) => {
  const dispatch = useDispatch()
  const { closeModal } = useModal()
  const sessionUser = useSelector(state => state.session?.user)
  const history = useHistory();

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(fetchDeletePost(postId))
    history.push(`/profile/${sessionUser.id}`)
    closeModal()

  }
  const closeDeleteModal = e => {
    e.preventDefault();
    closeModal()

  }
  return (
    <div id="delete-modal-container">
      <h3 id='delete-modal-header'>CONFIRM DELETION</h3>
      <h4 className="delete-modal-msg">
        Are you sure you want to remove this post?
      </h4>
      <button onClick={handleDelete} className="delete-modal-btn yes">{`CONFIRM DELETION`}</button>
      <button onClick={closeDeleteModal} className="delete-modal-btn no">{`CANCEL DELETION`}</button>
    </div>
  )
}

export default DeletePostModal