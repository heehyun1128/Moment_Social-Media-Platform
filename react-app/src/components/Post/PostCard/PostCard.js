import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import './PostCard.css'
import { fetchAddLike, fetchRemoveLike, fetchUserLikedPosts } from "../../../store/user";



const PostCard = ({ post }) => {
  console.log(post)
  const history = useHistory()
  const dispatch = useDispatch()
  const createdDate = post?.createdAt.slice(0, 16)
  const [isLiked, setIsLiked] = useState(false)
  const [totalLikes, setTotalLikes] = useState(null)

  const sessionUser = useSelector(state => state.session?.user)
  const userLikedPosts = useSelector(state => state.users?.singleUser?.likedPosts)
  const postLikedUsers=post&&post.likeUsers
  // console.log(Object.keys(userLikedPosts).includes(post.id+''))

  const handleClickPostCard = (e) => {
    e.preventDefault()
    history.push(`/posts/${post?.id}`)
  }

  const handleLike = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isLiked) {
      const likedPost = await dispatch(fetchAddLike(post.id))
      if (!likedPost.errors) {

        setIsLiked(true)
        setTotalLikes(prevLike => prevLike + 1)
      } else {
        console.log(likedPost.errors)
      }
    } else {
      const dislikedPost = await dispatch(fetchRemoveLike(post.id))
      if (!dislikedPost.errors) {

        setIsLiked(false)
        setTotalLikes(prevLike => prevLike - 1)
      } else {
        console.log(dislikedPost.errors)
      }

    }

  }

  useEffect(() => {
    dispatch(fetchUserLikedPosts(sessionUser.id))
  }, [dispatch, sessionUser.id])

  useEffect(() => {
    if (userLikedPosts && post && Object.keys(userLikedPosts).includes(post.id + '')) {
      setIsLiked(true)
    } else {
      setIsLiked(false)
    }
  }, [userLikedPosts, post])

  useEffect(() => {
    if (postLikedUsers) {
      const totalNumLike = postLikedUsers.length
      setTotalLikes(totalNumLike)
    }
  }, [dispatch, postLikedUsers])

  if (!sessionUser) {
    return null
  }
  return (
    <div id='post-card-div' onClick={handleClickPostCard}>
      <div id='post-card-img-div'>
        <div id='img-box'>
          {post && <img src={post && post?.previewImg} alt="" />}
          <div id="mask"></div>
          <h3 id='view-more'>View More</h3>

        </div>
        <div id='text-like-box'>
          <div id="text-box">
            {post && <h4>{post?.title}</h4>}
            {post && <p> {post?.creator?.username}</p>}
            {post && <p>{createdDate}</p>}
          </div>
          <div id="like-box">
            {post && <i onClick={handleLike} id={isLiked ? 'liked' : ''} class="fa-solid fa-heart fa-lg"></i>}
            {totalLikes} Likes
          </div>
         
        </div>
      </div>

    </div>
  )
}

export default PostCard