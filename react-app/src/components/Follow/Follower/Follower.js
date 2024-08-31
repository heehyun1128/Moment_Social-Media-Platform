import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from "react-router-dom";
import { fetchAddFollowed, fetchAddFollower, fetchFollowers, fetchRemoveFollower } from '../../../store/user';
import './Follower.css'
import FollowerCard from './FollowerCard';


const Follower = () => {
  const { userId } = useParams()
  const history = useHistory();
  const dispatch = useDispatch()

  const sessionUser = useSelector(state => state.session?.user)

  if (!sessionUser || (sessionUser && Number(sessionUser.id) !== Number(userId))) {
    history.push('/')
  }
  const followers = useSelector(state => state.users?.singleUser?.followers)
  const followerArr = followers && Object.values(followers)



  useEffect(() => {

    dispatch(fetchFollowers(sessionUser.id))
  }, [dispatch, sessionUser.id])
 



  return (
    <div >
      {followerArr&&followerArr.length?
      <div id='follower-content' className='focus-in-contract-bck'>
        {followerArr.map((follower) => <FollowerCard follower={follower} sessionUser={sessionUser}/>)}
      </div>
      :
      <p>No Followers</p>
      }
    </div>
  )
}

export default Follower

// {
//   profilePic ? <img src={selImage} id='new-profile-pic' alt='' /> : <div id='profile-img-li'>
//     {user?.profileImage ? <img id='profile-img' src={user?.profileImage} alt="" /> : <i class="fa-solid fa-user fa-xl"></i>}
//   </div>
// }