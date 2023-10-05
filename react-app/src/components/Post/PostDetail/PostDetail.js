import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSinglePost } from "../../../store/post";
import { useParams } from "react-router-dom";
import './PostDetail.css'
import { fetchSingleUser } from "../../../store/user";

const PostDetail = () => {
  const { postId } = useParams()
  const dispatch = useDispatch()
  const post = useSelector(state => state.posts?.singlePost)
  const postCreator = useSelector(state => state.users?.singleUser)
  const images = post?.postImages
  const [imageId, setImageId] = useState(null)

  const handleMouseOver=(imageId)=>{
    setImageId(imageId)
    
  }
  // const handleMouseLeave =()=>{
  //   setImageId(null)
  // }
  const handleOpenEditPostForm=()=>{
   
  }
    useEffect(() => {
      dispatch(fetchSinglePost(postId))
      
    }, [dispatch,postId])
    useEffect(() => {
      // console.log(post)
      post && post.creatorId&& dispatch(fetchSingleUser(post?.creatorId))
      
    }, [dispatch, post, post?.creatorId])

  return (
    <div>
      <div id="post-detail-div">
        <div id="post-img-container">
          {images?.map(image => (
            <div
              className='post-image'
              id={image?.preview===true? 'active' :image?.id===imageId?'active':''}
              key={image?.id}
              onMouseEnter={()=>handleMouseOver(image?.id)}
              // onMouseLeave={handleMouseLeave}
              style={{ backgroundImage: `url(${image?.postImageUrl})` }} alt="" />
          ))}
        </div>
        <div id="post-detail">
          <div id="post-detail-user">
            <div id='post-detail-user-pic-div'>
              <img src={postCreator?.profileImage} alt="" />
            </div>
            <p>{post?.creator?.username}</p>
          </div>
          <div id='post-detail-btn-div'>
            <button onClick={handleOpenEditPostForm}><i class="fa-solid fa-pen-to-square"></i>EDIT POST</button>
            <button><i class="fa-solid fa-trash-can"></i>DELETE POST</button>
          </div>
          <h4>{post?.title}</h4>
          <div id="post-content">
            {post?.content}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostDetail