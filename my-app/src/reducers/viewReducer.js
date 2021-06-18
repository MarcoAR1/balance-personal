const ACTION_TYPE = {
  typeAdd: '@view/add',
  typeSub: '@view/sub',
  typeHome: '@view/home',
  typeProfile: '@view/profile',
}

export const viewReducer = (
  state = {
    userCard: 'Home',
  },
  { type, payload }
) => {
  if (type === ACTION_TYPE.typeHome) {
    return Object.assign(state, payload)
  }
  if (type === ACTION_TYPE.typeAdd) {
    return Object.assign(state, payload)
  }

  if (type === ACTION_TYPE.typeSub) {
    return Object.assign(state, payload)
  }
  if (type === ACTION_TYPE.typeProfile) {
    return Object.assign(state, payload)
  }

  return state
}

export const viewTypeAdd = () => {
  return {
    type: ACTION_TYPE.typeAdd,
    payload: {
      userCard: 'add',
    },
  }
}
export const viewTypeSub = () => {
  return {
    type: ACTION_TYPE.typeSub,
    payload: {
      userCard: 'sub',
    },
  }
}
export const viewTypeHome = () => {
  return {
    type: ACTION_TYPE.typeHome,
    payload: {
      userCard: 'Home',
    },
  }
}
export const viewTypeProfile = () => {
  return {
    type: ACTION_TYPE.typeProfile,
    payload: {
      userCard: 'profile',
    },
  }
}
