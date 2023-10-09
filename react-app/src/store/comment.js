export const LOAD_COMMENTS = 'comments/LOAD_COMMENTS'
export const GET_COMMENT = 'comments/GET_COMMENT'
export const EDIT_COMMENT = 'comments/EDIT_COMMENT'
export const LOAD_COMMENT_IMAGES = 'comments/LOAD_COMMENT_IMAGES'
export const GET_COMMENT_IMAGE = 'comments/GET_COMMENT_IMAGE'
export const EDIT_COMMENT_IMAGE = 'comments/EDIT_COMMENT_IMAGE'
export const REMOVE_COMMENT = 'comments/REMOVE_COMMENT'

// load all comments
export const loadComments = comments => ({
  type: LOAD_COMMENTS,
  comments
})

// load/comment single comment
export const getComment = comment => ({
  type: GET_COMMENT,
  comment
})
// edit a comment
export const editComment = comment => ({
  type: EDIT_COMMENT,
  comment
})
// DELETE a comment
export const removeComment = commentId => ({
  type: REMOVE_COMMENT,
  commentId
})

// LOAD COMMENT IMAGES
export const loadCommentImages = commentImages => ({
  type: LOAD_COMMENT_IMAGES,
  commentImages
})
// GET COMMENT IMAGES
export const getCommentImage = commentImage => ({
  type: GET_COMMENT_IMAGE,
  commentImage
})

// edit a comment IMAGE
export const editCommentImage = image => ({
  type: EDIT_COMMENT_IMAGE,
  image
})

// fetch all post comments
export const fetchAllPostComments = (postId) => async (dispatch) => {
  const res = await fetch(`/api/posts/${postId}/comments`)

  if (res.ok) {
    const data = await res.json()
    dispatch(loadComments(data))
    console.log(data)
    return data
  } else {
    const errors = await res.json()
    return errors
  }
}

// fetch single comment
export const fetchSingleComment = (commentId) => async (dispatch) => {
  const res = await fetch(`/api/comments/${commentId}`)

  if (res.ok) {
    const data = await res.json()
    dispatch(getComment(data))
    console.log(data)
    return data
  } else {
    const errors = await res.json()
    return errors
  }
}
// fetch single comment image
export const fetchSingleCommentImage = (commentId) => async (dispatch) => {
  const res = await fetch(`/api/comments/${commentId}/images`)

  if (res.ok) {
    const data = await res.json()
    dispatch(getCommentImage(data))
    console.log(data)
    return data
  } else {
    const errors = await res.json()
    return errors
  }
}

// create a comment
export const fetchCreateComment = (postId, comment) => async (dispatch) => {
  console.log(comment)
  console.log(postId)
  const res = await fetch(`/api/posts/${postId}/comments/new`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comment)
  })
  if (res.ok) {
    const data = await res.json()
    dispatch(getComment(data))
    console.log(data)
    return data
  } else {
    const errors = await res.json()
    return errors
  }
}

// UPDATE a comment
export const fetchUpdateComment = (comment) => async (dispatch) => {
  console.log(comment)
  const res = await fetch(`/api/comments/${comment.id}/edit`, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comment)
  })
  if (res.ok) {
    const data = await res.json()
    dispatch(editComment(data))
    console.log(data)
    return data
  } else {
    const errors = await res.json()
    return errors
  }
}

// DELETE A COMMENT
export const fetchDeleteComment = (commentId) => async (dispatch) => {
  const res = await fetch(`/api/comments/${commentId}`, {
    method: 'DELETE'
  })
  console.log(res)
  if (res.ok) {

    dispatch(removeComment(commentId))

  } else {
    const errors = await res.json()
    return errors
  }
}

// create a comment image
export const fetchCreateCommentImage = (formData) => async (dispatch) => {
  console.log(formData.get('comment_id'))
  const commentId = formData.get('comment_id')
  const res = await fetch(`/api/comments/${commentId}/images`, {
    method: "POST",
    body: formData
  })
  console.log(res)
  if (res.ok) {
    const data = await res.json()
    dispatch(getCommentImage(data))
    console.log(data)
    return data
  } else {
    const errors = await res.json()
    return errors
  }
}

// UPDATE a comment image
export const fetchUpdateCommentImage = (formData, imageId) => async (dispatch) => {
  console.log(formData.keys(), imageId)
  // Access all keys using an iterator
  const entriesIterator = formData.entries();

  for (const [key, value] of entriesIterator) {
    // Check if the value is an object
    if (typeof value === 'object' && value !== null) {
      console.log(key + ': ' + JSON.stringify(value, null, 2));
    } else {
      console.log(key + ': ' + value);
    }
  }

  const commentId = formData.get('comment_id')
  const res = await fetch(`/api/comments/${commentId}/images/${imageId}/edit`, {
    method: "PUT",
    body: formData
  })
  console.log(res)
  if (res.ok) {
    const data = await res.json()
    dispatch(editCommentImage(data))
    console.log(data)
    return data
  } else {
    const errors = await res.json()
    return errors
  }
}



// state
const initialState = {}
const commentReducer = (state = initialState, action) => {
  let newState
  switch (action.type) {
    case LOAD_COMMENTS:
      newState = {
        ...state,
        comments: {
          ...state.comments
        }
      }
      action.comments.Comments.forEach(comment => {
        newState.comments[comment.id] = comment
      })
      console.log(newState.comments)
      return newState

    case GET_COMMENT:
    case EDIT_COMMENT:
      newState = {
        ...state,
        comments: {
          ...state.comments,
          [action.comment.id]: action.comment
        },
        singleComment: action.comment
      }
      console.log(newState)
      return newState
    case GET_COMMENT_IMAGE:
    case EDIT_COMMENT_IMAGE:
      newState = {
        ...state,
        singleComment: {
          ...state.singleComment,
          commentImages: {
            ...state.commentImages,
            ...action.commentImage
          }
        }
      }
      return newState

    case LOAD_COMMENT_IMAGES:
      newState = {
        ...state,
        singleComment: {
          ...state.singleComment,
          commentImages:action.commentImages
        }
      }
      return newState
    case REMOVE_COMMENT:
      console.log(action.commentId)
      const commentObj = {...state.comments}
      delete commentObj[action.commentId]
      newState = {
        ...state,
        comments: commentObj,
        singleComment:null
      }
      console.log('newState',newState)
      return newState

    default:
      return state
  }
}

export default commentReducer