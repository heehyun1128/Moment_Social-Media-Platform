import React, { useEffect, useState } from "react";
import { fetchCreatePost, fetchCreatePostImage, fetchUpdatePost, fetchUpdatePostImage } from "../../../store/post";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import './PostForm.css'
import { fetchDeletePostImage } from "../../../store/postImage";
import Loading from "../../Loading/Loading";
import { useModal } from "../../../context/Modal";
import ImageValidationModal from "../../Modal/ImageModal/ImageValidationModal";
import ImageDeleteModal from "../../Modal/ImageModal/ImageDeleteModal";
import ImageNotEmptyModal from "../../Modal/ImageModal/ImageNotEmptyModal";
import ImageCantUndoneModal from "../../Modal/ImageModal/ImageCantUndoneModal";

const PostForm = ({ post, formType }) => {

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
  const [selImageUrls, setSelImageUrls] = useState([])
  const [backgroundImg, setBackgroundImg] = useState('')
  const { setModalContent, setOnModalClose } = useModal()
  // const [edittedImgIdList, setEdittedImgIdList] = useState([])
  const [imgInputIdList, setImgInputIdList] = useState(postPics.map(pic => pic?.id))
  const [isCancelImageUpdate, setIsCancelImageUpdate] = useState(new Array(5).fill(false))
  const [deleteImageCalled, setDeleteImageCalled] = useState(new Array(5).fill(false))
  const [deselectImageCalled, setDeSelectImageCalled] = useState(new Array(5).fill(false))
  const [redBorderClass, setRedBorderClass] = useState(new Array(5).fill(''))

  // GET INITIAL IMAGE URLS

  useEffect(() => {
    const initialUrls = post?.postImages?.map(pic => pic?.postImageUrl)
    // const initialUrls = post?.postImages?.map(pic => pic?.postImageUrl)

    initialUrls && setSelImageUrls(initialUrls)
  }, [post?.postImages])

  const handleRemoveImg = (index) => {
  
    setModalContent(<ImageCantUndoneModal imgInputIdList={imgInputIdList} setImgInputIdList={setImgInputIdList} index={index} postPics={postPics} deleteImageCalled={deleteImageCalled} setDeleteImageCalled={setDeleteImageCalled} setPostPics={setPostPics} selImageUrls={selImageUrls} setSelImageUrls={setSelImageUrls} />)
  }


  const handleUndoImageUpdate = (index) => {

    const fileNames = [...selFileNames]
    const imageUrls = [...selImageUrls]


    const deselectImage = [...deselectImageCalled]
    deselectImage[index] = true
    setDeleteImageCalled(deselectImage)

    const imgUpdateBtnClicked = [...isCancelImageUpdate] //[]
    imgUpdateBtnClicked[index] = true

    setIsCancelImageUpdate(imgUpdateBtnClicked)

    fileNames[index] = ''
    setSelFileNames(fileNames)

    // postImageUrl
    imageUrls[index] = ''
    setSelImageUrls(imageUrls)
    const newPics = [...postPics]

    newPics[index] = post?.postImages[index]

    setPostPics(newPics)
  }
  const handleDeselectImg = (index) => {

    const fileNames = [...selFileNames]
    const imageUrls = [...selImageUrls]

    fileNames[index] = ''
    setSelFileNames(fileNames)

    imageUrls[index] = ''
    setSelImageUrls(imageUrls)

    const newPics = [...postPics]
    newPics[index] = null

    // setPostPics(newPics.filter(pic => pic !== null))
    setPostPics(newPics)

    const redBd = [...redBorderClass]
    // const index = postPics.indexOf(postPic)
    redBd[index] = ''
    setRedBorderClass(redBd)
  }


  const resetForm = () => {
    setPostPics(new Array(5).fill(null))
    setTitle('')
    setContent('')
  }

  if (postPics.length < 5) {

    const newArr = [...postPics, ...new Array(5 - postPics.length).fill(null)]
    setPostPics(newArr)

  }
  const handleImageChange = (e, index) => {
    e.preventDefault();

    const fileNames = [...selFileNames]
    const imageUrls = [...selImageUrls]
    const imageInputIds = [...imgInputIdList]
    const redBd = [...redBorderClass]
    console.log(redBd)
    redBd[index] = ''
    setRedBorderClass(redBd)
    if (e.target.files[0]) {
      const imgUpdateBtnClicked = [...isCancelImageUpdate]
      imgUpdateBtnClicked[index] = true

      setIsCancelImageUpdate(imgUpdateBtnClicked)

      fileNames[index] = e.target.files[0].name
      setSelFileNames(fileNames)
      // get selected image URL
      imageUrls[index] = URL.createObjectURL(e.target.files[0])
      setSelImageUrls(imageUrls)

      imageInputIds[index] = Number(e.target.id)

      setImgInputIdList(imageInputIds)


      const newPics = [...postPics]
      newPics[index] = null
      newPics[index] = e.target.files[0]
      setPostPics(newPics)

     
      
    } else {

      fileNames[index] = fileNames[index] || 'No File Chosen'
    }

  }


  const isImageValid = (postPic) => {
    const imageExtensions = ["png", "PNG", "jpg", "JPG", "jpeg", "JPEG", "gif", "GIF"]
    if (!imageExtensions?.some(extension => postPic?.postImageUrl?.endsWith(extension) ||
      postPic?.name?.endsWith(extension))) {

      return false
    } else {
      return true
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (postPics?.every(item => item === null)) {
      setModalContent(<ImageNotEmptyModal />);
      return
    }
    if (formType === 'createPost') {
      post = {
        title,
        content
      }
      let textData
      if (postPics?.every(item => (isImageValid(item)||item===null))) {

        textData = await dispatch(fetchCreatePost(post));
      }
      // postPics?.map(async postPic => {
      let preview = false
      for (const postPic of postPics) {
        if (postPic === null || postPic === undefined) continue
        const formData = new FormData();

        const notNullPostsArr = postPics.filter(pic => pic !== null)
        if (notNullPostsArr.indexOf(postPic) === 0 ) {
          preview = true
        } else {
          preview = false
        }

        if (!isImageValid(postPic)) {
          // setImgErrors({ 'image': 'Pictures must end with "pdf", "png", "jpg", "jpeg", or "gif" ' })
          // alert('Pictures must end with "png", "PNG", "jpg", "JPG", "jpeg", "JPEG", "gif", "GIF" ')
          setModalContent(<ImageValidationModal />);
          setImageLoading(false)
          const redBd = [...redBorderClass]
          const index = postPics.indexOf(postPic)
          redBd[index] = 'red-bd-class'
          setRedBorderClass(redBd)

          return
        } else {
          formData.append('post_image_url', postPic)
          formData.append('preview', preview)
          textData && formData.append('post_id', textData?.id)
          if (textData && textData.id) {


            const imageData = await dispatch(fetchCreatePostImage(formData));

            setImageLoading(true)
          }

        }

      }
      if (textData && textData.errors) {

        setErrors(textData.errors);
        return

      }
      

      textData && history.push(`/posts/${textData?.id}`)
      resetForm()
    } else if (formType === 'updatePost') {


      post = {
        ...post,
        title,
        content,

      }

      const notNullPostsArr=postPics.filter(pic=>pic!==null)

      let textData
      if(notNullPostsArr.every(pic=>(pic?.postImageUrl?.startsWith('http')) || isImageValid(pic))){

        textData = await dispatch(fetchUpdatePost(post));
      }
      if (textData&&textData.errors) {

        setErrors(textData.errors);
        return
      }

      let preview = false

      for (let i = 0; i < postPics.length; i++) {
        const postPic = postPics[i]

        if (postPic === null || postPic === undefined) continue
        const formData = new FormData();
        const edittedImgId = imgInputIdList[i]


        if (notNullPostsArr.indexOf(postPic) === 0) {
          preview = true
        } else {
          preview = false
        }

        console.log(postPic !== null)
        if (postPic!==null && !postPic?.postImageUrl?.startsWith('http') && !isImageValid(postPic)) {
          // setImgErrors({ 'image': 'Pictures must end with "pdf", "png", "jpg", "jpeg", or "gif" ' })
          // alert('Pictures must end with "png","PNG", "jpg", "JPG","jpeg","JPEG", "gif","GIF" ')
          setModalContent(<ImageValidationModal />);
          setImageLoading(false)
          const redBd = [...redBorderClass]
          const index = postPics.indexOf(postPic)
          redBd[index] = 'red-bd-class'
          setRedBorderClass(redBd)
          return
        } else {

          formData.append('post_image_url', postPic)
          formData.append('preview', preview)
          textData&&formData.append('post_id', textData.id)

          if (textData&&textData.id) {

            if (postPic && postPic.id) {
              const imageData = await dispatch(fetchUpdatePostImage(formData, postPic.id));
            } else if (edittedImgId) {
              const imageData = await dispatch(fetchUpdatePostImage(formData, edittedImgId));
            } else if (postPic) {
              // console.log('called')
              await dispatch(fetchCreatePostImage(formData))
            }
            setImageLoading(true)
          }
        }
      }






      // if (textData.errors) {
      //   console.log(errors)
      //   setErrors(textData.errors);

      // } else {
      //   setImageLoading(true)

      // }
      textData && history.push(`/posts/${textData?.id}`)
      // resetForm()
    }










  }

  return (
    <div id='post-form-div'>
      <div id="post-form-header">
        <h3 id='back-to-all-posts' onClick={() => { history.push('/posts/all') }}><i class="fa-solid fa-backward"></i>{` ALL POSTS `}</h3>
      </div>
      {formType === "createPost" && <h2>Create a post <i class="fa-solid fa-pen-to-square"></i></h2>}
      {formType === "updatePost" && <h2>Update your post <i class="fa-solid fa-pen-to-square"></i></h2>}
      <form form id='create-post-form' onSubmit={handleSubmit} encType="multipart/form-data">

        {formType === "updatePost" &&

          <div id='edit-post-div'>
            <h4>Edit your post images</h4>
            <div id='edit-post-main'>
              {postPics && postPics.map((img, index) => (

                <div id='edit-post-input-div' key={index}>


                  {<div id='upload-img-preview' >
                    {<img id='update-img-display' className={redBorderClass[index]} src={selImageUrls[index]} alt="" />}
                    {<label id='edit-post-input-label'>

                      <input
                        type="file"
                        accept="image/*"
                        key={imgInputIdList[index]}
                        id={imgInputIdList[index]}

                        onChange={(e) => {
                          handleImageChange(e, index)

                          // setPostPic(e.target.files[0])
                        }}

                      />
                      <div id='plus-icon'>+</div>
                    </label>}

                  </div>}
                  {selImageUrls[index] && !deleteImageCalled[index] && !isCancelImageUpdate[index] && <div id='remove-image-div' onClick={() => handleRemoveImg(index)}>REMOVE IMAGE</div>}
                  {/* {selImageUrls[index] && isCancelImageUpdate[index] && <div id='deslect-image-div' onClick={() => handleUndoImageUpdate(index)}>DESELECT IMAGE */}
                  {/* {isCancelImageUpdate[index]} */}
                  {/* </div>} */}
                  {/* <p>{selFileNames[index]}</p> */}
                  {/* {imgErrors && imgErrors.image &&
                  <p className="errors">{errors.image}</p>
                } */}
                </div>
              ))}
            </div>
          </div>

        }

        {formType === "createPost" &&
          <>
            <h4>Add an image to start</h4>

            <div id='create-post-main'>
              {postPics && postPics.map((pic, index) => {

                return <div key={index} id="post-image-div">
                  <div id='upload-img-preview'>
                    <img src={selImageUrls[index]} className={redBorderClass[index]} alt="" />
                    {selImageUrls[index] && <div id='deslect-image-btn' onClick={() => handleDeselectImg(index)}>x</div>}

                    {!selImageUrls[index] && <label id='create-post-input-label'>
                      <input
                        type="file"
                        accept="image/*"
                        // value={profilePic}
                        onChange={(e) => {
                          handleImageChange(e, index)

                          // setPostPic(e.target.files[0])
                        }}

                      />
                      <span id='plus-icon'>+</span>
                    </label>}
                  </div>

                  {/* <p>{selFileNames[index]}</p> */}

                </div>
              })}
            </div>

          </>
        }

        <div id="post-title-div">
          <h4>Title</h4>
          <input
            type="text"
            placeholder="Please give your post a title..."
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)

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
            placeholder="Add post content here..."
            onChange={(e) => {

              setContent(e.target.value)
            }}
            required
          />
          {errors && errors.content &&
            <p className="errors">{errors.content}</p>
          }
        </div>
        {imageLoading ? <>
          <Loading />
          <p>Submitting...</p>
        </> : <button id='submit-post-btn' type="submit">POST</button>}
      </form>
    </div>
  )
}

export default PostForm