const ACTION_TYPE = {
  ActiveRight: '@animation/right',
  ActiveRight2: '@animation/right2',
  ActiveLeft: '@animation/left',
  ActiveExit: '@animation/exit',
  ActiveLeft2: '@animation/left2',
  ActiveFinish: '@animation/finish',
  DeleteAnimation: '@animation/deleteAnimation',
  AddPointAnimation: '@animation/addPointAnimation',
  DisabledEntrance: '@animation/disabledEntrance',
}

export const animationReducer = (
  state = { Home: {}, Graphic: {} },
  { type, payload }
) => {
  if (type === ACTION_TYPE.ActiveRight) {
    return Object.assign({ ...state }, payload)
  }
  if (type === ACTION_TYPE.ActiveRight2) {
    return Object.assign({ ...state }, payload)
  }
  if (type === ACTION_TYPE.ActiveLeft) {
    return Object.assign({ ...state }, payload)
  }
  if (type === ACTION_TYPE.ActiveLeft2) {
    return Object.assign({ ...state }, payload)
  }
  if (type === ACTION_TYPE.ActiveFinish) {
    return Object.assign({ ...state }, payload)
  }
  if (type === ACTION_TYPE.ActiveExit) {
    return Object.assign({ ...state }, payload)
  }
  if (type === ACTION_TYPE.DisabledEntrance) {
    return Object.assign({ ...state }, payload)
  }
  if (type === ACTION_TYPE.AddPointAnimation) {
    const index = {}
    payload.forEach((element) => {
      index[element.balance_id] = {}
    })

    return Object.assign({ ...state }, index)
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
    type: ACTION_TYPE.ActiveRight,
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
    type: ACTION_TYPE.ActiveRight2,
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
    type: ACTION_TYPE.ActiveLeft,
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
    type: ACTION_TYPE.ActiveLeft2,
    payload: index,
  }
}
export const ActiveFinish = (data) => {
  const index = {}
  index[data] = {}
  return {
    type: ACTION_TYPE.ActiveFinish,
    payload: index,
  }
}

export const addPointAnimation = (points) => {
  return {
    type: ACTION_TYPE.AddPointAnimation,
    payload: points,
  }
}
export const ActiveExit = (data) => {
  const index = {}
  index[data] = { exit: true, entrance: false }
  return {
    type: ACTION_TYPE.ActiveExit,
    payload: index,
  }
}

export const DisabledEntrance = (data) => {
  const index = {}
  index[data] = { entrance: true }
  return {
    type: ACTION_TYPE.DisabledEntrance,
    payload: index,
  }
}
