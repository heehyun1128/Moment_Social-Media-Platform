import React, { useEffect, useState } from 'react'
import { fetchRemoveFollower } from '../../../store/user'
import { useDispatch } from 'react-redux'
import './Follower.css'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { useModal } from '../../../context/Modal';
import FollowModal from '../../Modal/FollowModal/FollowModal';

const FollowerCard = ({ follower, sessionUser }) => {

  const dispatch = useDispatch()
  const [followStatus, setFollowStatus] = useState(false)
  const { setModalContent, setOnModalClose } = useModal()

  const handleRemoveFollowUser = async (follower, index) => {

    // unfollow
    await dispatch(fetchRemoveFollower(sessionUser?.id, follower?.id))
    // alert("Successfully unfollowed user!")
    setModalContent(<FollowModal type='removefollower' />)

    setFollowStatus(false)
  }


  useEffect(() => {
    if (follower) {
      setFollowStatus(true)
    } else {
      setFollowStatus(false)
    }
  }, [follower])

  return followStatus ?
    (<div id='follow-div'>
     

      <div id='follow-user-div'>
        {follower?.profileImage ? <div id='new-profile-pic'><img src={follower?.profileImage} alt="" /></div> : <div id='profile-img-li'><i class="fa-solid fa-user fa-xl"></i></div>}
        <p>{follower?.username}</p>
      </div>
{/*    
      {sessionUser && sessionUser?.id !== follower?.id && <div id="follow-btn" onClick={() => handleRemoveFollowUser(follower)}>
        {followStatus && 'REMOVE FOLLOWER'}
      </div>} */}
      {sessionUser && sessionUser?.id !== follower?.id &&
        <Button 
        variant="outlined" 
          style={{ color: 'gray', borderColor: 'gray' }}
        onClick={() => handleRemoveFollowUser(follower)} startIcon={<DeleteIcon />}>
          {followStatus && 'REMOVE FOLLOWER'}
        </Button>
      }
    </div>) : null

}

export default FollowerCard