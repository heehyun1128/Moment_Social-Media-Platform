import React from 'react'
import { useDispatch } from "react-redux"
import { useModal } from '../../context/Modal'

import './PermitErrorModal.css'

const PermitErrorModal = () => {
  
  const { closeModal } = useModal()


  const closePermitErrModal = e => {
    e.preventDefault();
    closeModal()

  }
  return (
 
      <div id='permit-err-div'>
    
        <h4>Please log  in or sign up</h4>
        <button onClick={closePermitErrModal} >{`CONFIRM`}</button>
      </div>
   
  )
}

export default PermitErrorModal