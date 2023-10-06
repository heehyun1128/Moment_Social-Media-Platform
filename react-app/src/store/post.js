/** Action Type Constants: */
export const LOAD_POSTS = 'products/LOAD_POSTS'
export const GET_POST = 'products/GET_POST'
export const LOAD_USER_POSTS = 'products/LOAD_USER_POSTS'
export const EDIT_POST = 'products/EDIT_POST'
export const EDIT_POST_IMAGE = 'products/EDIT_POST_IMAGE'
export const LOAD_POST_IMAGES = 'products/LOAD_POST_IMAGES'
export const GET_POST_IMAGE = 'products/GET_POST_IMAGE'



/**  Action Creators: */
// load all posts
export const loadPosts = posts => ({
  type: LOAD_POSTS,
  posts
})
// load USER posts
export const loadUserPosts = posts => ({
  type: LOAD_USER_POSTS,
  posts
})
// load/post single post
export const getPost = post => ({
  type: GET_POST,
  post
})
// edit a post
export const editPost = post => ({
  type: EDIT_POST,
  post
})
// edit a post IMAGE
export const editPostImage = post => ({
  type: EDIT_POST_IMAGE,
  post
})

// LOAD POST IMAGES
export const loadPostImages = postImages => ({
  type: LOAD_POST_IMAGES,
  postImages
})
// GET POST IMAGES
export const getPostImage = postImage => ({
  type: GET_POST_IMAGE,
  postImage
})



/** Thunk Action Creators: */
// fetch all posts
export const fetchAllPosts = () => async (dispatch) => {
  const res = await fetch('/api/posts')
  if (res.ok) {
    const data = await res.json()
    dispatch(loadPosts(data))
    console.log(data)
    return data
  } else {
    const errors = await res.json()
    return errors
  }
}
// fetch all USER posts
export const fetchUserPosts = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}/posts`)
  if (res.ok) {
    const data = await res.json()
    dispatch(loadPosts(data))
    console.log(data)
    return data
  } else {
    const errors = await res.json()
    return errors
  }
}

// fetch single post
export const fetchSinglePost = (postId) => async (dispatch) => {
  const res = await fetch(`/api/posts/${postId}`)
  console.log(res)
  if (res.ok) {
    const data = await res.json()
    dispatch(getPost(data))
    console.log(data)
    return data
  } else {
    const errors = await res.json()
    return errors
  }
}

// create a post
export const fetchCreatePost = (post) => async (dispatch) => {
  const res = await fetch('/api/posts/new', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post)
  })
  if (res.ok) {
    const data = await res.json()
    dispatch(getPost(data))
    console.log(data)
    return data
  } else {
    const errors = await res.json()
    return errors
  }
}
// create a post image
export const fetchCreatePostImage = (formData) => async (dispatch) => {
  console.log(formData.get('post_id'))
  const postId = formData.get('post_id')
  const res = await fetch(`/api/posts/${postId}/images`, {
    method: "POST",
    body: formData
  })
  console.log(res)
  if (res.ok) {
    const data = await res.json()
    dispatch(getPostImage(data))
    console.log(data)
    return data
  } else {
    const errors = await res.json()
    return errors
  }
}

// UPDATE a post
export const fetchUpdatePost = (post) => async (dispatch) => {
  const res = await fetch(`/api/posts/${post.id}/edit`, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post)
  })
  if (res.ok) {
    const data = await res.json()
    dispatch(editPost(data))
    console.log(data)
    return data
  } else {
    const errors = await res.json()
    return errors
  }
}
// UPDATE a post image
export const fetchUpdatePostImage = (formData, imageId) => async (dispatch) => {
  console.log(formData.get('post_id'))
  const postId = formData.get('post_id')
  const res = await fetch(`/api/posts/${postId}/images/${imageId}/edit`, {
    method: "PUT",
    body: formData
  })
  console.log(res)
  if (res.ok) {
    const data = await res.json()
    dispatch(editPostImage(data))
    console.log(data)
    return data
  } else {
    const errors = await res.json()
    return errors
  }
}


// state
const initialState = {}
const postReducer = (state = initialState, action) => {
  let newState
  switch (action.type) {
    case LOAD_POSTS:
      newState = {
        ...state,
        ...action.posts
      }
      console.log(newState)
      return newState
    case LOAD_USER_POSTS:
      newState = {
        ...state,
        userPost: action.posts
      }
      return newState
    case GET_POST:
    case EDIT_POST:
      newState = {
        ...state,
        singlePost: action.post
      }
      console.log(newState)
      return newState
    case GET_POST_IMAGE:
    case EDIT_POST_IMAGE:
      newState = {
        ...state,
        singlePost: {
          ...state.singlePost,
          postImage: action.postImage
        }
      }
      return newState

    default:
      return state
  }
}

export default postReducer