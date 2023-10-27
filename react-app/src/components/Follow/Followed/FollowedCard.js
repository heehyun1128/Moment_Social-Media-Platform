import React, { useEffect, useState } from 'react'
import { fetchRemoveFollowed } from '../../../store/user'
import { useDispatch } from 'react-redux'
import './Followed.css'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

const FollowedCard = ({ followed, sessionUser }) => {
  console.log(followed)
  const dispatch = useDispatch()
  const [followdStatus, setFollowdStatus] = useState(false)

  const handleRemoveFollowUser = async (followed) => {

    // unfollow
    await dispatch(fetchRemoveFollowed(sessionUser?.id, followed?.id))
    alert("Successfully unfollowed user!")

    setFollowdStatus(false)
  }


  useEffect(() => {
    if (followed) {
      setFollowdStatus(true)
    } else {
      setFollowdStatus(false)
    }
  }, [followed])

  return followdStatus ?
    (<div>


      <div id='follow-user-div'>
        {followed?.profileImage ? <div id='new-profile-pic'><img src={followed?.profileImage} alt="" /></div> : <div id='profile-img-li'><i class="fa-solid fa-user fa-xl"></i></div>}
        <p>{followed.username}</p>
      </div>

      {/* {sessionUser && sessionUser?.id !== followed?.id && <div id="follow-btn" onClick={() => handleRemoveFollowUser(followed)}>
        {followdStatus && 'UNFOLLOW'}
      </div>} */}
      {sessionUser && sessionUser?.id !== followed?.id &&
        <Button 
        variant="outlined" 
          style={{ color: 'gray', borderColor: 'gray' }}
        onClick={() => handleRemoveFollowUser(followed)} startIcon={<DeleteIcon />}>
          {followdStatus && 'UNFOLLOW'}
        </Button>
      }
      
        
      
    </div>) : null

}

export default FollowedCard