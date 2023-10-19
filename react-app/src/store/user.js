const LOAD_USERS='users/LOAD_USERS'
const LOAD_SINGLE_USER = 'users/LOAD_SINGLE_USER'
const LOAD_USER_POST = 'users/LOAD_USER_POST'
const EDIT_USER_IMAGE = 'users/EDIT_USER_IMAGE'
const LOAD_USER_LIKE_POST ='users/LOAD_USER_LIKE_POST'
const ADD_LIKE = 'users/ADD_LIKE'
const DELETE_LIKE = 'users/DELETE_LIKE'

export const loadUsers = users=>({
  type:LOAD_USERS,
  users
})
export const getUser = user=>({
  type: LOAD_SINGLE_USER,
  user
})
export const loadUserPosts = posts=>({
  type: LOAD_USER_POST,
  posts
})
export const loadUserLikedPosts = posts=>({
  type: LOAD_USER_LIKE_POST,
  posts
})

export const addLike = postId => ({
  type: ADD_LIKE,
  postId
})
export const delLike = postId => ({
  type: DELETE_LIKE,
  postId
})

export const editUserImage = userImage => ({
  type: EDIT_USER_IMAGE,
  userImage
})


// fetch all users
export const fetchAllUsers = () => async (dispatch) => {
  const res = await fetch('/api/users')
  if (res.ok) {
    const data = await res.json()
    dispatch(loadUsers(data))
    console.log(data)
    return data
  } else {
    const errors = await res.json()
    return errors
  }
}

// fetch single user
export const fetchSingleUser = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}`)
  console.log(res)
  if (res.ok) {
    const data = await res.json()
    dispatch(getUser(data))
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
  console.log(res)
  if (res.ok) {
    const data = await res.json()
    dispatch(loadUserPosts(data))
    console.log(data)
    return data
  } else {
    const errors = await res.json()
    return errors
  }
}
// fetch USER liked posts
export const fetchUserLikedPosts = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}/likes`)
  console.log(res)
  if (res.ok) {
    const data = await res.json()
    dispatch(loadUserLikedPosts(data))
    console.log(data)
    return data
  } else {
    const errors = await res.json()
    return errors
  }
}

export const fetchAddLike = postId => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}/likes`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postId)
  });
  if (response.ok) {
    console.log(response)
    const data = await response.json()
    dispatch(addLike(postId))
    return data
  } else {
    const errors = await response.json()
    return errors
  }
}
export const fetchRemoveLike = postId => async (dispatch) => {
  const response = await fetch(`/api/likes/${postId}`, {
    method: "DELETE"
  });
  if (response.ok) {
    const data = await response.json()
    dispatch(delLike(postId))
    return data
  } else {
    const errors = await response.json()
    return errors
  }
}


// edit user profile image
export const fetchUserProfileImage = (userId,formData) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}/profile-update`, {
    method: "PUT",
    body: formData
  })
  console.log(res)
  if (res.ok) {
    const data = await res.json()
    dispatch(editUserImage(data))
    console.log(data)
    return data
  } else {
    const errors = await res.json()
    console.log(errors)
    return errors
  }
}

const initialState = {}
const userReducer = (state = initialState, action) => {
  let newState
  switch (action.type) {
    case LOAD_USERS:
      newState = {
        ...state,
        ...action.users
      }
      console.log(newState)
      return newState
   
    case LOAD_SINGLE_USER:
      newState = {
        ...state,
        singleUser: action.user
      }
      console.log(newState)
      return newState
    case LOAD_USER_POST:
      newState = {
        ...state,
        singleUser: {
          ...state.singleUser,
          userPosts:action.posts
        }
      }
      console.log(newState)
      return newState
    case EDIT_USER_IMAGE:
      newState={
        ...state,
        singleUser: {
          ...state.singleUser,
          ...action.userImage
        }
      }
      return newState
    case LOAD_USER_LIKE_POST:
      newState={
        ...state,
        singleUser: {
          ...state.singleUser,
          likedPosts:action.posts
        }
      }
      return newState
    case DELETE_LIKE:
      newState = {
        ...state,
        singleUser: {
          ...state.singleUser,
          likedPosts: {
            ...state.singleUser.likedPosts,
            // [action.post.id]:null
          }
          
        }
      }
      delete newState.singleUser.likedPosts[action.postId]
      return newState
    default:
      return state
  }

}

export default userReducer