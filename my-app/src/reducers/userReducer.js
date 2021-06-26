const ACTION_TYPE = {
  LogIn: '@user/logIn',
  LogOut: '@user/logOut',
  UpdateUser: '@user/updateUser',
}

export const userReducer = (state = {}, { type, peyload }) => {
  if (type === ACTION_TYPE.LogIn) {
    return peyload
  }
  if (type === ACTION_TYPE.LogOut) {
    return peyload
  }
  if (type === ACTION_TYPE.UpdateUser) {
    return Object.assign({ ...state }, peyload)
  }

  return state
}

export const UserLogIn = (data) => {
  return {
    type: ACTION_TYPE.LogIn,
    peyload: data,
  }
}
export const UserLogOut = () => {
  return {
    type: ACTION_TYPE.LogOut,
    peyload: {},
  }
}
export const UpdateUserState = (data) => {
  return {
    type: ACTION_TYPE.UpdateUser,
    peyload: data,
  }
}
