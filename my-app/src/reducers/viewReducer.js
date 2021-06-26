const ACTION_TYPE = {
  TypeAdd: '@view/add',
  TypeSub: '@view/sub',
  TypeHome: '@view/home',
  TypeProfile: '@view/profile',
  TypeEditRecord: '@view/editRecord',
  TypeWithoutGraphic: '@view/withoutGraphic',
  TypeGraphic: '@view/graphic',
}

export const viewReducer = (
  state = {
    userCard: 'Home',
  },
  { type, payload }
) => {
  if (type === ACTION_TYPE.TypeHome) {
    return Object.assign({ ...state }, payload)
  }
  if (type === ACTION_TYPE.TypeAdd) {
    return Object.assign({ ...state }, payload)
  }
  if (type === ACTION_TYPE.TypeSub) {
    return Object.assign({ ...state }, payload)
  }
  if (type === ACTION_TYPE.TypeProfile) {
    return Object.assign({ ...state }, payload)
  }
  if (type === ACTION_TYPE.TypeEditRecord) {
    return Object.assign({ ...state }, payload)
  }
  if (type === ACTION_TYPE.TypeGraphic) {
    return Object.assign({ ...state }, payload)
  }
  if (type === ACTION_TYPE.TypeWithoutGraphic) {
    return Object.assign({ ...state }, payload)
  }

  return state
}

export const viewTypeAdd = () => {
  return {
    type: ACTION_TYPE.TypeAdd,
    payload: {
      userCard: 'add',
    },
  }
}
export const viewTypeSub = () => {
  return {
    type: ACTION_TYPE.TypeSub,
    payload: {
      userCard: 'sub',
    },
  }
}
export const viewTypeHome = () => {
  return {
    type: ACTION_TYPE.TypeHome,
    payload: {
      userCard: 'Home',
    },
  }
}
export const viewTypeProfile = () => {
  return {
    type: ACTION_TYPE.TypeProfile,
    payload: {
      userCard: 'profile',
    },
  }
}
export const viewTypeEditRecord = () => {
  return {
    type: ACTION_TYPE.TypeEditRecord,
    payload: {
      graphicCard: 'editRecord',
    },
  }
}
export const viewTypeGraphic = () => {
  return {
    type: ACTION_TYPE.TypeGraphic,
    payload: {
      graphicCard: 'Graphic',
    },
  }
}
export const viewTypeWithoutGraphic = () => {
  return {
    type: ACTION_TYPE.TypeWithoutGraphic,
    payload: {
      graphicCard: '',
    },
  }
}
