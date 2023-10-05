import PostForm from "./PostForm";

const CreatePostForm = () => {
  const post = {
    title: '',
    content: '',

  }
  const postImage = null
  return (
    <PostForm
      post={post}
      formType='createPost'
    />
  )
}

export default CreatePostForm