import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeletePost, fetchSinglePost } from "../../../store/post";
import { useParams, useHistory } from "react-router-dom";
import './PostDetail.css'
import { fetchSingleUser } from "../../../store/user";
import CommentDetail from "../../Comment/CommentDetail/CommentDetail";

const PostDetail = () => {
  const { postId } = useParams()
  const dispatch = useDispatch()
  const history = useHistory();

  const post = useSelector(state => state.posts?.singlePost)
  const postCreator = useSelector(state => state.users?.singleUser)
  

  const sessionUser = useSelector(state => state.session?.user)
  
  const [imageId, setImageId] = useState(null)
  
  const images = post?.postImages
  
  const handleMouseOver = (imageId) => {
    setImageId(imageId)

  }
  // const handleMouseLeave =()=>{
    //   setImageId(null)
    // }
    

  const handleDeletePost = async (e) => {
    e.preventDefault();
    await dispatch(fetchDeletePost(post.id))
    history.push(`/profile/${sessionUser.id}`)
  }

  const handleOpenEditPostForm = (e) => {
    e.preventDefault();
    history.push(`/posts/${postId}/edit`)
  }
  useEffect(() => {
    dispatch(fetchSinglePost(postId))
  }, [dispatch, postId])
  useEffect(() => {
    console.log(post)
    post && post.creatorId && dispatch(fetchSingleUser(post?.creatorId))

  }, [dispatch, post, post?.creatorId])

  if (!post || !postCreator || !sessionUser){
    return null
  }
  
  return (
    <div>
      <div id="post-detail-div">
        <div id="post-img-container">
          {images?.map(image => (
            <div
              className='post-image'
              id={image?.preview === true ? 'active' : image?.id === imageId ? 'active' : ''}
              key={image?.id}
              onMouseEnter={() => handleMouseOver(image?.id)}
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
            {sessionUser && post?.creatorId === sessionUser.id && <button onClick={handleOpenEditPostForm}><i class="fa-solid fa-pen-to-square"></i>EDIT POST</button>}
            {sessionUser && post?.creatorId === sessionUser.id && <button onClick={handleDeletePost}><i class="fa-solid fa-trash-can"></i>DELETE POST</button>}


          </div>
          <h4>{post?.title}</h4>
          <div id="post-content">
            {post?.content}
          </div>
        </div>
      </div>
      <div>
        {post &&  <div> {post.numOfComments} Comments</div>}
      </div>
      <div id="comment-detail-div">
        <CommentDetail post={post}/>
      </div>
    </div>
  )
}

export default PostDetail