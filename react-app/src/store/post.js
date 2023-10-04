/** Action Type Constants: */
export const LOAD_POSTS = 'products/LOAD_POSTS'
export const GET_POST = 'products/GET_POST'
export const EDIT_POST = 'products/EDIT_POST'
export const GET_SINGLE_POST = 'products/GET_SINGLE_POST'



/**  Action Creators: */
// load all posts
export const loadPosts = posts => ({
  type: LOAD_POSTS,
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

// GET POST IMAGES
export const loadSinglePost = post =>({
  type: GET_SINGLE_POST,
  post
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

// fetch single post
export const fetchSinglePost = (postId) => async (dispatch) =>{
  const res = await fetch(`/api/posts/${postId}`)
  console.log(res)
  if (res.ok) {
    const data = await res.json()
    dispatch(loadSinglePost(data))
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
    case GET_POST:
      newState={
        ...state,
        singlePost:action.post
      }
      console.log(newState)
      return newState
    default:
      return state
  }
}

export default postReducer