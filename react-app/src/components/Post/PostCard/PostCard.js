import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import './PostCard.css'
import { fetchUserLikedPosts, fetchUserPosts } from "../../../store/user";
import { fetchAddPostLike, fetchRemovePostLike } from "../../../store/post";



const PostCard = ({ post }) => {
 
  const history = useHistory()
  const dispatch = useDispatch()
  const createdDate = post?.createdAt?.slice(0, 16)
  const [isLiked, setIsLiked] = useState(false)
  const [totalLikes, setTotalLikes] = useState(0)

  const sessionUser = useSelector(state => state.session?.user)
  const userLikedPosts = useSelector(state => state.users?.singleUser?.likedPosts)
  const postLikedUsers = post && post.likeUsers

  const handleClickPostCard = (e) => {
    e.preventDefault()
    history.push(`/posts/${post?.id}`)
  }

  const handleLike = async (e) => {
    if (!sessionUser) {
      alert('Please log in to like a post')
    }
    e.preventDefault()
    e.stopPropagation()
    if (!isLiked) {
      const likedPost = sessionUser && post && await dispatch(fetchAddPostLike(post, sessionUser))
      if (!likedPost.errors) {

        setIsLiked(true)
        setTotalLikes(prevLike => {
          prevLike=Number(prevLike) 
            prevLike+= 1
          return prevLike
        });

      } 
      // else {
      //   console.log(likedPost?.errors)
      // }
    } else {
      const dislikedPost = sessionUser && post && sessionUser.id && post.id && await dispatch(fetchRemovePostLike(post?.id, sessionUser?.id))
     
      if (!dislikedPost.errors) {

        setIsLiked(false)
        // setTotalLikes(prevLike => Number(prevLike) - 1)
        setTotalLikes(prevLike => {
          prevLike = Number(prevLike)
          prevLike -= 1
          return prevLike
        });
        // await dispatch(fetchUserPosts(sessionUser?.id))
      } 
      // else {
      //   console.log(dislikedPost.errors)
      // }

      // history.push(`/profile/${sessionUser?.id}`)
      
    }

  }

  useEffect(() => {
    sessionUser && dispatch(fetchUserLikedPosts(sessionUser?.id))
  }, [dispatch, sessionUser?.id])

  useEffect(() => {
    
    if (userLikedPosts && post && Object.keys(userLikedPosts).includes(post.id + '')) {
      setIsLiked(true)
    } else { 
      setIsLiked(false)
    }
  }, [userLikedPosts, post])

  useEffect(() => {
    if (postLikedUsers && postLikedUsers.length) {
      const totalNumLike = Number(postLikedUsers.length)
      
      setTotalLikes(totalNumLike)
    }
  }, [dispatch, postLikedUsers])

  // if (!sessionUser) {
  //   return null
  // }
  return (
   post && <div id='post-card-div' onClick={handleClickPostCard}>
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
            {post &&
              <p>
                <i onClick={handleLike} id={isLiked ? 'liked' : ''} class="fa-solid fa-heart fa-lg"></i>
                {totalLikes} Likes</p>
            }

          </div>

        </div>
      </div>

    </div>
  )
}

export default PostCard