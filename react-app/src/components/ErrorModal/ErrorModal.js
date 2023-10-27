import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"; 



function ErrorModal() {
  const dispatch = useDispatch();
 
  const { closeModal } = useModal();

  const closeErrorModal = e => {
    e.preventDefault();
    closeModal()

  }

  return (
    <div id='error-modal'>
      
      <p>Please sign up or log in to view this section.'</p>
      <button onClick={closeErrorModal} className="delete-modal-btn no">{`CLOSE WINDOW`}</button>
    </div>
  );
}

export default ErrorModal;
