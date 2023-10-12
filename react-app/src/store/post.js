/** Action Type Constants: */
export const LOAD_POSTS = 'posts/LOAD_POSTS'
export const GET_POST = 'posts/GET_POST'
export const LOAD_USER_POSTS = 'posts/LOAD_USER_POSTS'
export const EDIT_POST = 'posts/EDIT_POST'
export const EDIT_POST_IMAGE = 'posts/EDIT_POST_IMAGE'
export const LOAD_POST_IMAGES = 'posts/LOAD_POST_IMAGES'
export const GET_POST_IMAGE = 'posts/GET_POST_IMAGE'
export const REMOVE_POST = 'posts/REMOVE_POST'
export const SEARCH_POSTS = 'posts/SEARCH_POSTS'



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
// DELETE a post
export const removePost = post => ({
  type: REMOVE_POST,
  post
})
// edit a post IMAGE
export const editPostImage = post => ({
  type: EDIT_POST_IMAGE,
  post
})

// DELETE a IMAGE
// export const removePostImage = postImageId => ({
//   type: REMOVE_POST_IMAGE,
//   postImageId
// })


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

export const searchPosts = (posts) => {
  return {
    type: SEARCH_POSTS,
    posts
  }
};

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
// // fetch all USER posts
// export const fetchUserPosts = (userId) => async (dispatch) => {
//   const res = await fetch(`/api/users/${userId}/posts`)
//   console.log(res)
//   if (res.ok) {
//     const data = await res.json()
//     dispatch(loadPosts(data))
//     console.log(data)
//     return data
//   } else {
//     const errors = await res.json()
//     return errors
//   }
// }

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

// DELETE A POST
export const fetchDeletePost = (postId)=>async(dispatch)=>{
  const res = await fetch(`/api/posts/${postId}`,{
    method:'DELETE'
  })
  console.log(res)
  if (res.ok) {

    dispatch(removePost(postId))

  } else {
    const errors = await res.json()
    return errors
  }
}

export const fetchSearchedPosts = (searchTerm) => async (dispatch) => {
  const res = await fetch(`/api/search/?q=${searchTerm}`)
  if (res.ok) {
    const data = await res.json()
    dispatch(searchPosts(data))
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

    case REMOVE_POST:
      newState = {
        ...state,
        singlePost: null
      }
      return newState
    case SEARCH_POSTS:
      newState = {
        ...state,
        searchPosts: {
          ...action.posts
        }
      }
      console.log(newState)
      return newState
    default:
      return state
  } 
}

export default postReducer