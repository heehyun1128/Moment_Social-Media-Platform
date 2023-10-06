import { useHistory, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSinglePost } from '../../../store/post';
import PostForm from './PostForm';

const EditPostForm = () => {
  const {postId} = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  const [errors, setErrors] = useState({});

  // get editted post
  const post = useSelector(state=>state.posts?.singlePost)
  const sessionUser = useSelector(state => state.session?.user)
  
  
  // user auth
  if (!sessionUser || (Number(post?.creatorId) && sessionUser && Number(sessionUser.id) !== Number(post?.creatorId))) {
    history.push('/')
  }

  useEffect(() => {
    dispatch(fetchSinglePost(postId))

  }, [dispatch, postId])
 
  if (Object.values(errors).length) {
    history.push('/404')

  }
  if (!post) return (<></>)

  return (
    <PostForm 
      post={post}
      formType='updatePost'
    />
  )
}

export default EditPostForm