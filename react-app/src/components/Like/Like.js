import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserLikedPosts } from '../../store/user'
import { useParams } from 'react-router-dom'

const Like = () => {
  const { userId } = useParams()
  const dispatch=useDispatch()
  const likedPosts = useSelector(state=>state.users?.singleUser?.likedPosts)
console.log(likedPosts)
  useEffect(()=>{
    dispatch(fetchUserLikedPosts(userId))
  },[dispatch])

  return (
    <div>
      
    </div>
  )
}

export default Like