import React from 'react'
import { useDispatch } from "react-redux"
import { useModal } from '../../../context/Modal'

import './ImageValidationModal.css'

const ImageDeleteModal = () => {

  const { closeModal } = useModal()


  const closeCurrModal = e => {
    e.preventDefault();
    closeModal()

  }
  return (

    <div id='permit-err-div'>

      <h4>'Image successfully deleted!'</h4>
      <button onClick={closeCurrModal} >{`CONFIRM`}</button>
    </div>

  )
}

export default ImageDeleteModal