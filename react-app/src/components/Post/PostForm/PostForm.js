import React, { useEffect, useState } from "react";
import { fetchCreatePost, fetchCreatePostImage, fetchUpdatePost } from "../../../store/post";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import './PostForm.css'

const PostForm = ({ post, formType }) => {
  console.log(post)
  const dispatch = useDispatch();
  const history = useHistory();
  const [postPics, setPostPics] = useState(post?.postImages || new Array(5).fill(null))
  const [imageLoading, setImageLoading] = useState(false)
  const [title, setTitle] = useState(post?.title || '')
  const [content, setContent] = useState(post?.content || '')
  const [errors, setErrors] = useState({});
  const [imgErrors, setImgErrors] = useState({});
  const [postImgArr, setPostImgArr] = useState([])
  const [selFileNames, setSelFileNames] = useState([]) 

  const resetForm = () => {
    setPostPics(new Array(5).fill(null))
    setTitle('')
    setContent('')
  }

  if(postPics.length<5){
    console.log([...postPics, ...new Array(5 - postPics.length).fill(null)]) 
    const newArr = [...postPics, ...new Array(5 - postPics.length).fill(null)]
    setPostPics(newArr)
    
  }
  const handleImageChange = (e, index) => {
    const fileNames = [...selFileNames]
    if(e.target.files[0]){
      fileNames[index]=e.target.files[0].name
      setSelFileNames(fileNames)

      const newPics = [...postPics]
      newPics[index] = null
      newPics[index] = e.target.files[0]
      setPostPics(newPics)
      console.log(newPics)
    }else{

      fileNames[index]=fileNames[index] || 'No File Chosen'
    }
    

  }


  const isImageValid = (postPic) => {
    const imageExtensions = ["pdf", "png", "jpg", "jpeg", "gif"]
    if (!imageExtensions?.some(extension => postPic?.name.endsWith(extension))) {
      return false
    } else {
      return true
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const post = {
      title,
      content
    }
    const textData = await dispatch(fetchCreatePost(post));

    if (formType === 'createPost') {
      // postPics?.map(async postPic => {
      for (const postPic of postPics) {
        if (postPic === null) continue
        const formData = new FormData();
        setImageLoading(true)

        if (!isImageValid(postPic)) {
          // setImgErrors({ 'image': 'Pictures must end with "pdf", "png", "jpg", "jpeg", or "gif" ' })
          alert('Pictures must end with "pdf", "png", "jpg", "jpeg", or "gif" ')
          return 
        } else {
          formData.append('post_image_url', postPic)
          formData.append('preview', true)
          formData.append('post_id', textData.id)
          const imageData = await dispatch(fetchCreatePostImage(formData));
        }


      }



      if (textData.errors) {
        setErrors(textData.errors);

      } else {
        setImageLoading(false)

      }
      history.push(`/posts/${textData.id}`)
      resetForm()
    } else if (formType === 'updatePost') {
      post = {
        ...post,
        title,
        content
      }

      console.log(post)
      setPostImgArr(post?.postImages)
      const updateTextData = await dispatch(fetchUpdatePost(post))

      // const formData
    }










  }
  return (
    <div>
      {formType === "createPost" && <h2>Create a post</h2>}
      {formType === "updatePost" && <h2>Update your post</h2>}
      <form form id='create-post-form' onSubmit={handleSubmit} encType="multipart/form-data">

        {formType === "updatePost" &&

          <>
            <h4>Edit your post images</h4>
            {post?.postImages.map((img, index) => (

              <div key={index}>
                <input
                  type="file"
                  accept="image/*"
                  key={img.id}
                  id={img.id}
                  style={{
                    backgroundImage: `url(${img?.postImageUrl})`,
                    backgroundSize: 'cover',
                    height: '500px',
                  }}
                  onChange={(e) => {
                    handleImageChange(e, index)
                    console.log(e.target.files[0])
                    // setPostPic(e.target.files[0])
                  }}
                 
                />
                {/* {imgErrors && imgErrors.image &&
                  <p className="errors">{errors.image}</p>
                } */}
              </div>
            ))}
          </>

        }

        {formType === "createPost" &&
          <>
            <h4>Add an image to start</h4>

            {postPics.map((pic, index) => {
              console.log(index)
              return <div key={index} id="post-image-div">
                <input
                  type="file"
                  accept="image/*"
                  // value={profilePic}
                  onChange={(e) => {
                    handleImageChange(e, index)
                    console.log(e.target.files[0])
                    // setPostPic(e.target.files[0])
                  }}

                />
                <p>{selFileNames[index]}</p>
                {/* {(imageLoading) && <p>Loading...</p>} */}
              </div>
            })}

          </>
        }

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