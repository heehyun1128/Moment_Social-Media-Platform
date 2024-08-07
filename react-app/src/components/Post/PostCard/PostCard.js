import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import './PostCard.css'
import { fetchUserLikedPosts, fetchUserPosts } from "../../../store/user";
import { fetchAddPostLike, fetchRemovePostLike } from "../../../store/post";
import { useModal } from "../../../context/Modal";
import PermitErrorModal from "../../ErrorModal/PermitErrorModal";



const PostCard = ({ post }) => {

  const history = useHistory()
  const dispatch = useDispatch()
  const createdDate = post?.createdAt?.slice(0, 16)
  const [isLiked, setIsLiked] = useState(false)
  const [totalLikes, setTotalLikes] = useState(0)
  const { setModalContent, setOnModalClose } = useModal();
  const [isBtnClicked, setIsBtnClicked]=useState(false)

  const sessionUser = useSelector(state => state.session?.user)
  const userLikedPosts = useSelector(state => state.users?.singleUser?.likedPosts)
  const postLikedUsers = post && post.likeUsers

  const allPostsObj = useSelector(state => state.posts?.Posts)

  
  const handleClickPostCard = (e) => {
    e.preventDefault()
    sessionStorage.setItem('scrollPosition', window.scrollY);
    history.push(`/posts/${post?.id}`)
  }

  const handleLike = async (e) => {
    if (!sessionUser) {
      // alert('Please log in to like a post')
      setModalContent(<PermitErrorModal />);
      
    }
    e.preventDefault()
    e.stopPropagation()

    if(isBtnClicked) {
      return
    }
    setIsBtnClicked(true)

    if (!isLiked) {
      const likedPost = sessionUser && post && await dispatch(fetchAddPostLike(post, sessionUser))
      
     if(likedPost && Object.values(likedPost)){

     setIsLiked(true)
     
    
     setTotalLikes(prevLike => {
       prevLike=Number(prevLike) 
         prevLike+= 1
       return prevLike
     });
     }

    //  setTimeout(()=>{
    //   setIsBtnClicked(false)
    //  },1500)
    
      // else {
      //   console.log(likedPost?.errors)
      // }
    } else {
      const dislikedPost = sessionUser && post && sessionUser.id && post.id && await dispatch(fetchRemovePostLike(post?.id, sessionUser?.id))
    
      if(dislikedPost &&Object.values(dislikedPost)){

        setIsLiked(false)
       
        // setTotalLikes(prevLike => Number(prevLike) - 1)
        setTotalLikes(prevLike => {
          prevLike = Number(prevLike)
          prevLike -= 1
          return prevLike
        });
      }
      dispatch(fetchUserLikedPosts(sessionUser?.id))

      
      
    }
    setIsBtnClicked(false)

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

  
  if (!allPostsObj || Object.values(allPostsObj).length === 0) {
    return null
  }
  const allPosts = allPostsObj && Object.values(allPostsObj)

  const likedPostCreator=allPosts?.filter(lpost=>Number(lpost.id)===Number(post.id))[0]
console.log(likedPostCreator)
  return (
   post && <div id='post-card-div' className="swing-in-top-fwd " onClick={handleClickPostCard}>
      <div id='post-card-img-div'>
        <div id='img-box'>
          {post && <img src={post && post?.previewImg} alt="" />}
          <div id="mask"></div>
          <h3 id='view-more'>View More</h3>

        </div>
        <div id='text-like-box'>
          <div id="text-box">
            {post && <h4>{post?.title}</h4>}
            {post && <h6> {likedPostCreator?.creator?.username}</h6>}
            {post && <p>{createdDate}</p>}
          </div>
          <div id="like-box">
            {post &&
              <p>
                <button id='like-btn' onClick={handleLike} disabled={isBtnClicked}><i  id={isLiked ? 'liked' : ''} class="fa-solid fa-heart fa-lg"></i></button>
                {totalLikes} Likes</p>
            }

          </div>

        </div>
      </div>

    </div>
  )
}

export default PostCard