import React from 'react'
import { useDispatch } from "react-redux"
import { useModal } from '../../../context/Modal'

import './ImageValidationModal.css'

const ImageNotEmptyModal = () => {

  const { closeModal } = useModal()


  const closeCurrModal = e => {
    e.preventDefault();
    closeModal()

  }
  return (

    <div id='permit-err-div'>
      <h4>You must add at least one Picture</h4>
      
      <button onClick={closeCurrModal} >{`CONFIRM`}</button>
    </div>

  )
}

export default ImageNotEmptyModal