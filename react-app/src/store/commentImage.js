export const REMOVE_COMMENT_IMAGE = 'comments/REMOVE_COMMENT_IMAGE'

// DELETE an IMAGE
export const deleteCommentImage = commentImageId => ({
  type: REMOVE_COMMENT_IMAGE,
  commentImageId
})


// DELETE A comment IMAGE
export const fetchDeleteCommentImage = (imageId) => async (dispatch) => {

  console.log(imageId)
  const res = await fetch(`/api/commentimages/${imageId}`, {
    method: 'DELETE'
  })
  console.log(res)
  if (res.ok) {

    dispatch(deleteCommentImage(imageId))

  } else {
    const errors = await res.json()
    return errors
  }
}


const initialState = {}
const commentImageReducer = (state = initialState, action) => {
  let newState
  switch (action.type) {
    case REMOVE_COMMENT_IMAGE:
      newState = {
        ...state,
        commentImage: null
      }

      return newState
    default:
      return state
  }
}

export default commentImageReducer