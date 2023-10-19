const LOAD_USERS='users/LOAD_USERS'
const LOAD_SINGLE_USER = 'users/LOAD_SINGLE_USER'
const LOAD_USER_POST = 'users/LOAD_USER_POST'
const EDIT_USER_IMAGE = 'users/EDIT_USER_IMAGE'

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
    default:
      return state
  }

}

export default userReducer