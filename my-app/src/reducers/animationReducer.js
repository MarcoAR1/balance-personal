const ACTION_TYPE = {
  activeRight: '@animation/right',
  activeRight2: '@animation/right2',
  activeLeft: '@animation/left',
  activeLeft2: '@animation/left2',
  activeFinish: '@animation/finish',
  deleteAnimation: '@animation/deleteAnimation',
  addPointAnimation: '@animation/addPointAnimation',
}

export const animationReducer = (state = { Home: {} }, { type, payload }) => {
  if (type === ACTION_TYPE.activeRight) {
    return Object.assign(state, payload)
  }
  if (type === ACTION_TYPE.activeRight2) {
    return Object.assign(state, payload)
  }
  if (type === ACTION_TYPE.activeLeft) {
    return Object.assign(state, payload)
  }
  if (type === ACTION_TYPE.activeLeft2) {
    return Object.assign(state, payload)
  }
  if (type === ACTION_TYPE.activeFinish) {
    return Object.assign(state, payload)
  }
  if (type === ACTION_TYPE.addPointAnimation) {
    const index = {}
    payload.forEach((element) => {
      index[element.balance_id] = {}
    })

    return Object.assign(state, index)
  }

  return state
}

export const ActiveRight = (data) => {
  const index = {}
  index[data] = {
    rightOne: true,
    rightTwo: false,
  }

  return {
    type: ACTION_TYPE.activeRight,
    payload: index,
  }
}
export const ActiveRight2 = (data) => {
  const index = {}
  index[data] = {
    rightOne: false,
    rightTwo: true,
  }
  return {
    type: ACTION_TYPE.activeRight2,
    payload: index,
  }
}
export const ActiveLeft = (data) => {
  const index = {}
  index[data] = {
    leftOne: true,
    leftTwo: false,
  }
  return {
    type: ACTION_TYPE.activeLeft,
    payload: index,
  }
}
export const ActiveLeft2 = (data) => {
  const index = {}
  index[data] = {
    leftOne: false,
    leftTwo: true,
  }
  return {
    type: ACTION_TYPE.activeLeft2,
    payload: index,
  }
}
export const ActiveFinish = (data) => {
  const index = {}
  index[data] = {}
  return {
    type: ACTION_TYPE.activeFinish,
    payload: index,
  }
}

export const addPointAnimation = (points) => {
  return {
    type: ACTION_TYPE.addPointAnimation,
    payload: points,
  }
}
