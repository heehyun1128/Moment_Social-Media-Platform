import React from 'react'
import { useDispatch } from "react-redux"
import { useModal } from '../../../context/Modal'

import './ImageValidationModal.css'
import ImageDeleteModal from './ImageDeleteModal'
import { fetchDeletePostImage } from '../../../store/postImage'

const ImageCantUndoneModal = ({ imgInputIdList, setImgInputIdList, index, postPics, deleteImageCalled, setDeleteImageCalled, setPostPics, selImageUrls, setSelImageUrls }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal()
  const { setModalContent, setOnModalClose } = useModal()

  

const handleDel=()=>{
  setModalContent(<ImageDeleteModal/>)
  const imgInputLi = [...imgInputIdList]
  imgInputLi[index] = null
  setImgInputIdList(imgInputLi)

  const imageId = postPics[index].id
  dispatch(fetchDeletePostImage(imageId))
  const isImageDeleted = [...deleteImageCalled]
  isImageDeleted[index] = true


  setDeleteImageCalled(isImageDeleted)
  const newPics = [...postPics]

  newPics[index] = null

  setPostPics(newPics)
  const imageUrls = [...selImageUrls]
  imageUrls[index] = null
  setSelImageUrls(prevImageUrls => imageUrls)
}
  const closeCurrModal = e => {
    e.preventDefault();
    closeModal()

  }
  return (

    <div id='permit-err-div'>

      <h4>Are you sure you want to remove this image? This can't be undone.</h4>
      <button onClick={handleDel} >{`CONFIRM`}</button>
      <button onClick={closeCurrModal} >{`CANCEL`}</button>
    </div>

  )
}

export default ImageCantUndoneModal