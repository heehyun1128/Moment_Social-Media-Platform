/** Action Type Constants: */
export const LOAD_POSTS = 'products/LOAD_POSTS'
export const GET_POST = 'products/GET_POST'
export const EDIT_POST = 'products/EDIT_POST'


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



/** Thunk Action Creators: */
// export const fetchAllPosts = () => async (dispatch) =>{
//   const res=await fetch('/api/posts')
// }
