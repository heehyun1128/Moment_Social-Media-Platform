const LOAD_USERS='users/LOAD_USERS'
const LOAD_SINGLE_USER = 'users/LOAD_SINGLE_USER'

export const loadUsers = users=>({
  type:LOAD_USERS,
  users
})
export const getUser = user=>({
  type: LOAD_SINGLE_USER,
  user
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

    default:
      return state
  }

}

export default userReducer