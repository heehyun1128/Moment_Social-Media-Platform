import React from 'react'
import { useDispatch } from "react-redux"
import { useModal } from '../../../context/Modal'

import './ImageValidationModal.css'

const ImageValidationModal = () => {

  const { closeModal } = useModal()


  const closeCurrModal = e => {
    e.preventDefault();
    closeModal()

  }
  return (

    <div id='permit-err-div'>

      <h4>'Pictures must end with "png", "PNG", "jpg", "JPG", "jpeg", "JPEG", "gif", "GIF" '</h4>
      <button onClick={closeCurrModal} >{`CONFIRM`}</button>
    </div>

  )
}

export default ImageValidationModal