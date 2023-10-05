import React, { useState } from "react";
import { fetchCreatePost, fetchCreatePostImage } from "../../../store/post";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const PostForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [postPic, setPostPic] = useState(null)
  const [imageLoading, setImageLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    setImageLoading(true)

    console.log(title)
    console.log(content)
    console.log(postPic)
    // if (!postPic.name.endsWith("pdf") && !postPic.name.endsWith("png") && !postPic.name.endsWith("jpg") && !postPic.name.endsWith("jpeg" && !postPic.name.endsWith("gif"))){
    //   alert('Pictures must end with "pdf", "png", "jpg", "jpeg", or "gif" ')
    // }
    const imageExtensions = ["pdf", "png", "jpg", "jpeg", "gif"]
    if (!imageExtensions?.some(extension => postPic?.name.endsWith(extension))) {
      alert('Pictures must end with "pdf", "png", "jpg", "jpeg", or "gif" ')
    }

    const post = {
      title,
      content
    }
    const textData = await dispatch(fetchCreatePost(post));

    formData.append('post_image_url', postPic)
    formData.append('preview', true)
    formData.append('post_id', textData.id)
    const imageData = await dispatch(fetchCreatePostImage(formData));

    if (textData.errors) {
      setErrors(textData.errors);

    } else {
      setImageLoading(false)

    }
    history.push(`/posts/${ textData.id }`)

  }
  return (
    <div>
      <h1>Create a Post</h1>
      <form form id='create-post-form' onSubmit={handleSubmit} encType="multipart/form-data">


        <div id="post-image-div">
          <h4>Add an image to start</h4>
          <input
            type="file"
            accept="image/*"
            // value={profilePic}
            onChange={(e) => {
              console.log(e.target.files[0])
              setPostPic(e.target.files[0])
            }}

          />
          {(imageLoading) && <p>Loading...</p>}
        </div>

        <div id="post-title-div">
          <h4>Title</h4>
          <input
            type="text"
            placeholder="Please give you post a title..."
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              console.log(e.target.value)
            }}
            required
          />
          {errors && errors.title &&
            <p className="errors">{errors.title}</p>
          }
        </div>

        <div id="post-content-div">
          <h4>Content</h4>
          <textarea
            type="text"
            value={content}
            placeholder="Add post Content here..."
            onChange={(e) => {
              console.log(e.target.value)
              setContent(e.target.value)
            }}
            required
          />
          {errors && errors.title &&
            <p className="errors">{errors.content}</p>
          }
        </div>
        <button type="submit">POST</button>
      </form>
    </div>
  )
}

export default PostForm