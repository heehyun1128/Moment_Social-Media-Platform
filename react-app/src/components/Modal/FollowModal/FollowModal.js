import React from 'react'
import { useDispatch } from "react-redux"
import { useModal } from '../../../context/Modal'



const FollowModal = ({type}) => {

  const { closeModal } = useModal()


  const closeCurrModal = e => {
    e.preventDefault();
    closeModal()

  }
  return (

    <div id='permit-err-div'>

      {type==='unfollow' &&<h4>"Successfully unfollowed user!"</h4>}
      <button onClick={closeCurrModal} >{`CONFIRM`}</button>
    </div>

  )
}

export default FollowModal