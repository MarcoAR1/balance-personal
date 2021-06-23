const ACTION_TYPE = {
  typeAdd: '@view/add',
  typeSub: '@view/sub',
  typeHome: '@view/home',
  typeProfile: '@view/profile',
  typeEditRecord: '@view/editRecord',
  typeWithoutGraphic: '@view/withoutGraphic',
  typeGraphic: '@view/graphic',
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
  if (type === ACTION_TYPE.typeEditRecord) {
    return Object.assign(state, payload)
  }
  if (type === ACTION_TYPE.typeGraphic) {
    return Object.assign(state, payload)
  }
  if (type === ACTION_TYPE.typeWithoutGraphic) {
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
export const viewTypeEditRecord = () => {
  return {
    type: ACTION_TYPE.typeEditRecord,
    payload: {
      graphicCard: 'editRecord',
    },
  }
}
export const viewTypeGraphic = () => {
  return {
    type: ACTION_TYPE.typeGraphic,
    payload: {
      graphicCard: 'Graphic',
    },
  }
}
export const viewTypeWithoutGraphic = () => {
  return {
    type: ACTION_TYPE.typeWithoutGraphic,
    payload: {
      graphicCard: '',
    },
  }
}
