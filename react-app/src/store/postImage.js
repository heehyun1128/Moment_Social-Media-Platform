export const REMOVE_POST_IMAGE = 'products/REMOVE_POST_IMAGE'

// DELETE a IMAGE
export const deletePostImage = postImageId => ({
  type: REMOVE_POST_IMAGE,
  postImageId
})


// DELETE A POST IMAGE
export const fetchDeletePostImage = (imageId) => async (dispatch) => {

  console.log(imageId)
  const res = await fetch(`/api/postimages/${imageId}`, {
    method: 'DELETE'
  })
  console.log(res)
  if (res.ok) {

    dispatch(deletePostImage(imageId))

  } else {
    const errors = await res.json()
    return errors
  }
}


const initialState = {}
const postImageReducer = (state = initialState, action) => {
  let newState
  switch (action.type) {
    case REMOVE_POST_IMAGE:
      newState = {
        ...state,
        postImage:null
      }

      return newState
    default:
      return state
  }
}

export default postImageReducer