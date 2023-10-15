import PostForm from "./PostForm";
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux';
const CreatePostForm = () => {
  const post = {
    title: '',
    content: '',

  }
  const postImage = null

  const history = useHistory()
  const sessionUser = useSelector(state => state.session?.user)
  if (!sessionUser || (Number(post?.creatorId) && sessionUser && Number(sessionUser.id) !== Number(post?.creatorId))) {
    history.push('/posts/all')
  }
  return (
    <PostForm
      post={post}
      formType='createPost'
    />
  )
}

export default CreatePostForm