import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserLikedPosts } from '../../store/user'
import { useParams } from 'react-router-dom'
import PostCard from '../Post/PostCard/PostCard'

const Like = () => {
  const { userId } = useParams()
  const dispatch = useDispatch()
  const likedPosts = useSelector(state => state.users?.singleUser?.likedPosts)
  const likedPostArr = likedPosts && Object.values(likedPosts)
  console.log(likedPostArr)
  useEffect(() => {
    dispatch(fetchUserLikedPosts(userId))
  }, [dispatch, userId])

  return (
    <div id='user-post-div'>
      {likedPostArr && likedPostArr.map(post => (<PostCard post={post} />))}
    </div>
  )
}

export default Like