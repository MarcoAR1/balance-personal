const ACTION_TYPE = {
  logIn: '@user/logIn',
  logOut: '@user/logOut',
  updateUser: '@user/updateUser',
}

export const userReducer = (state = {}, { type, peyload }) => {
  if (type === ACTION_TYPE.logIn) {
    return peyload
  }
  if (type === ACTION_TYPE.logOut) {
    return peyload
  }
  if (type === ACTION_TYPE.updateUser) {
    return Object.assign(state, peyload)
  }

  return state
}

export const UserLogIn = (data) => {
  return {
    type: ACTION_TYPE.logIn,
    peyload: data,
  }
}
export const UserLogOut = () => {
  return {
    type: ACTION_TYPE.logOut,
    peyload: {},
  }
}
export const UpdateUserState = (data) => {
  return {
    type: ACTION_TYPE.updateUser,
    peyload: data,
  }
}
