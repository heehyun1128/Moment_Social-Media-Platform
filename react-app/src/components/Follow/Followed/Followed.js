import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from "react-router-dom";
import { fetchAddFollowed, fetchAddFollowd, fetchFollowed, fetchRemoveFollowed } from '../../../store/user';
import './Followed.css'
import FollowedCard from './FollowedCard';


const Followed = () => {
  const { userId } = useParams()
  const history = useHistory();
  const dispatch = useDispatch()

  const sessionUser = useSelector(state => state.session?.user)

  if (!sessionUser || (sessionUser && Number(sessionUser.id) !== Number(userId))) {
    history.push('/')
  }
  const followedUsers = useSelector(state => state.users?.singleUser?.followed)
  const followedUserArr = followedUsers && Object.values(followedUsers)



  useEffect(() => {

    dispatch(fetchFollowed(sessionUser.id))
  }, [dispatch, sessionUser.id])
 



  return (
    <div>
      {followedUserArr&&followedUserArr.length?
      <div id='follower-content'>
        {followedUserArr.map((followed) => <FollowedCard followed={followed} sessionUser={sessionUser} />)}
      </div>
      :
      <p>No Followed Users</p>}
    </div>
  )
}

export default Followed

