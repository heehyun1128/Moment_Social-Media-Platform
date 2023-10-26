import React, { useEffect, useState } from 'react'
import { fetchRemoveFollower } from '../../../store/user'
import { useDispatch } from 'react-redux'
import './Follower.css'

const FollowerCard = ({ follower, sessionUser }) => {
  console.log(follower)
  const dispatch = useDispatch()
  const [followStatus, setFollowStatus] = useState(false)

  const handleRemoveFollowUser = async (follower, index) => {

    // unfollow
    await dispatch(fetchRemoveFollower(sessionUser?.id, follower?.id))
    alert("Successfully unfollowed user!")

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
    (<div >
     

      {follower?.profileImage ? <div id='new-profile-pic'><img  src={follower?.profileImage} alt="" /></div> : <div id='profile-img-li'><i class="fa-solid fa-user fa-xl"></i></div>}
        <p>{follower.username}</p>
   
      {sessionUser && sessionUser?.id !== follower?.id && <div id="follow-btn" onClick={() => handleRemoveFollowUser(follower)}>
        {followStatus && 'REMOVE FOLLOWER'}
      </div>}
    </div>) : null

}

export default FollowerCard