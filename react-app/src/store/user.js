const LOAD_USERS = 'users/LOAD_USERS'
const LOAD_SINGLE_USER = 'users/LOAD_SINGLE_USER'
const LOAD_USER_POST = 'users/LOAD_USER_POST'
const EDIT_USER_IMAGE = 'users/EDIT_USER_IMAGE'
const LOAD_USER_LIKE_POST = 'users/LOAD_USER_LIKE_POST'

const ADD_USER_POST_LIKE = 'users/ADD_USER_POST_LIKE'
const DELETE_USER_POST_LIKE = 'users/DELETE_USER_POST_LIKE'
const LOAD_FOLLOWER = 'users/LOAD_FOLLOWER'
const LOAD_FOLLOWED = 'users/LOAD_FOLLOWED'
const ADD_FOLLOWER = 'users/ADD_FOLLOWER'
const ADD_FOLLOWED = 'users/ADD_FOLLOWED'
const DELETE_FOLLOWER = 'users/DELETE_FOLLOWER'
const DELETE_FOLLOWED = 'users/DELETE_FOLLOWED'

export const loadUsers = users => ({
  type: LOAD_USERS,
  users
})
export const getUser = user => ({
  type: LOAD_SINGLE_USER,
  user
})
export const loadUserPosts = posts => ({
  type: LOAD_USER_POST,
  posts
})
export const loadUserLikedPosts = posts => ({
  type: LOAD_USER_LIKE_POST,
  posts
})


export const addLike = (post, user) => ({
  type: ADD_USER_POST_LIKE,
  post,
  user
})
export const delLike = (postId,userId) => ({
  type: DELETE_USER_POST_LIKE,
  postId,
  userId
})
export const addUserPostLike = (post, user) => ({
  type: ADD_USER_POST_LIKE,
  post,
  user
})
export const delUserPostLike = (postId,userId) => ({
  type: DELETE_USER_POST_LIKE,
  postId,
  userId
})

export const editUserImage = userImage => ({
  type: EDIT_USER_IMAGE,
  userImage
})

export const getFollowers = users => ({
  type: LOAD_FOLLOWER,
  users
})
export const getFollowed = users => ({
  type: LOAD_FOLLOWED,
  users
})
export const addFollower = user => ({
  type: ADD_FOLLOWER,
  user
})
export const addFollowed = user => ({
  type: ADD_FOLLOWED,
  user
})
export const delFollower = userId => ({
  type: DELETE_FOLLOWER,
  userId
})
export const delFollowed = userId => ({
  type: DELETE_FOLLOWED,
  userId
})

// fetch all users
export const fetchAllUsers = () => async (dispatch) => {
  const res = await fetch('/api/users')
  if (res.ok) {
    const data = await res.json()
    dispatch(loadUsers(data))
   
    return data
  } else {
    const errors = await res.json()
    return errors
  }
}

// fetch single user
export const fetchSingleUser = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}`)

  if (res.ok) {
    const data = await res.json()
    dispatch(getUser(data))
    
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
    dispatch(loadUserPosts(data))
   
    return data
  } else {
    const errors = await res.json()
    return errors
  }
}
// fetch USER liked posts
export const fetchUserLikedPosts = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}/likes`)
  
  if (res.ok) {
    const data = await res.json()
    dispatch(loadUserLikedPosts(data))
   
    return data
  } else {
    const errors = await res.json()
    return errors
  }
}

export const fetchAddLike = (post, user) => async (dispatch) => {
  const response = await fetch(`/api/posts/${post.id}/likes`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post.id)
  });
  if (response.ok) {
    
    const data = await response.json()
    dispatch(addLike(post, user))
    return data
  } else {
    const errors = await response.json()
    return errors
  }
}
export const fetchRemoveLike =( postId,userId)=> async (dispatch) => {
  const response = await fetch(`/api/likes/${postId}`, {
    method: "DELETE"
  });
  if (response.ok) {
    const data = await response.json()
    dispatch(delLike(postId,userId))
    return data
  } else {
    const errors = await response.json()
    return errors
  }
}


// edit user profile image
export const fetchUserProfileImage = (userId, formData) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}/profile-update`, {
    method: "PUT",
    body: formData
  })

  if (res.ok) {
    const data = await res.json()
    dispatch(editUserImage(data))
   
    return data
  } else {
    const errors = await res.json()
   
    return errors
  }
}
// get all followers
export const fetchFollowers = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}/followers`)
 
  if (res.ok) {
    const data = await res.json()
    dispatch(getFollowers(data))
   
    return data
  } else {
    const errors = await res.json()
    return errors
  }
}
// get all followed
export const fetchFollowed = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}/followed`)
 
  if (res.ok) {
    const data = await res.json()
    dispatch(getFollowed(data))
    
    return data
  } else {
    const errors = await res.json()
    return errors
  }
}

// add follower
export const fetchAddFollower = (userId, followerId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/followers/${followerId}`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, followerId })
  });
  if (response.ok) {
   
    const data = await response.json()
    dispatch(addFollower(followerId))
    return data
  } else {
    const errors = await response.json()
    return errors
  }
}
// add followed
export const fetchAddFollowed = (userId, followedId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/followed/${followedId}`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, followedId })
  });
  if (response.ok) {
   
    const data = await response.json()
    dispatch(addFollower(followedId))
    return data
  } else {
    const errors = await response.json()
    return errors
  }
}

export const fetchRemoveFollower = (userId, followerId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/followers/${followerId}/delete`, {
    method: "DELETE"
  });
  if (response.ok) {
    const data = await response.json()
    dispatch(delFollower(followerId))
    return data
  } else {
    const errors = await response.json()
    return errors
  }
}
export const fetchRemoveFollowed = (userId, followedId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/followed/${followedId}/delete`, {
    method: "DELETE"
  });
  if (response.ok) {
    const data = await response.json()
    dispatch(delFollower(followedId))
    return data
  } else {
    const errors = await response.json()
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
      
      return newState

    case LOAD_SINGLE_USER:
      newState = {
        ...state,
        singleUser: action.user
      }
     
      return newState
    case LOAD_USER_POST:
      newState = {
        ...state,
        singleUser: {
          ...state.singleUser,
          userPosts: action.posts
        }
      }
     
      return newState
    case EDIT_USER_IMAGE:
      newState = {
        ...state,
        singleUser: {
          ...state.singleUser,
          ...action.userImage
        }
      }
      return newState
    case LOAD_USER_LIKE_POST:
      newState = {
        ...state,
        singleUser: {
          ...state.singleUser,
          likedPosts: action.posts
        }
      }
      return newState
    case ADD_USER_POST_LIKE:
      
      const currentLikeNum = state.singleUser?.userPosts[action.post.id]?.numOfLikes;
      const newLikeCount = currentLikeNum + 1;
      newState= {
        ...state,
        singleUser: {
          ...state.singleUser,
          likedPosts: {
            ...state.singleUser.likedPosts,
            [action.post.id]: action.post
          },
          userPosts: {
            ...state.singleUser.userPosts,
            [action.post.id]: {
              ...state.singleUser.userPosts[action.post.id],
              likeUsers: {
                ...state.singleUser.userPosts[action.post.id]?.likeUsers,
                [action.user.id]: action.user
              },
              numOfLikes: newLikeCount
            }
            
          }
        }
      };
     
      return newState

    case DELETE_USER_POST_LIKE:
    
     
      newState = {
        ...state,
        singleUser: {
          ...state.singleUser,
          likedPosts: {
            ...state.singleUser.likedPosts,
            [action.postId]: null
          },
          userPosts: {
            ...state.singleUser.userPosts,
            
            [action.postId]: {
              ...state.singleUser.userPosts[action.postId],
              likeUsers: {
                ...state.singleUser.userPosts[action.postId]?.likeUsers,
                [action.userId]: null
              },
            
            },
           
          }

        }
      }
      
      return newState
  
    case LOAD_FOLLOWER:
      newState = {
        ...state,
        singleUser: {
          ...state.singleUser,
          followers: action.users
        }
      }
      return newState
    case ADD_FOLLOWER:
      newState = {
        ...state,
        singleUser: {
          ...state.singleUser,
          followers: {
            ...state.singleUser.followers,
            [action.user.id]: action.user
          }
        }
      }
      return newState
    case DELETE_FOLLOWER:
      newState = {
        ...state,
        singleUser: {
          ...state.singleUser,
          followers: {
            ...state.singleUser.followers,
            [action.userId]:null
          }

        }
      }
      
      return newState
    case LOAD_FOLLOWED:
      newState = {
        ...state,
        singleUser: {
          ...state.singleUser,
          followed: action.users
        }
      }
      return newState
    case ADD_FOLLOWED:
      newState = {
        ...state,
        singleUser: {
          ...state.singleUser,
          followed: {
            ...state.singleUser.followed,
            [action.user.id]: action.user
          }
        }
      }
      return newState
    case DELETE_FOLLOWED:
      newState = {
        ...state,
        singleUser: {
          ...state.singleUser,
          followed: {
            ...state.singleUser.followed
          }

        },

      }
      delete newState.singleUser.followed[action.userId]
      return newState
    default:
      return state
  }

}

export default userReducer