const ACTION_TYPE = {
  getBalance: '@balance/getBalance',
  getAllRecord: '@balance/getAllRecord',
  addRecord: '@balance/addRecord',
  subRecord: '@balance/subRecord',
  currentTarget: '@balance/currentTarget',
  targetDelete: '@balance/targetDelete',
}

export const balanceReducer = (state = {}, { type, payload }) => {
  if (type === ACTION_TYPE.getBalance) {
    return Object.assign(state, payload)
  }
  if (type === ACTION_TYPE.getAllRecord) {
    return Object.assign(state, payload)
  }
  if (type === ACTION_TYPE.addRecord) {
    const { Record } = payload
    const copyState = { ...state }
    copyState.Record.splice(0, 0, Record)
    Record.type === 'add'
      ? (copyState.Balance += parseInt(Record.amount))
      : (copyState.Balance -= parseInt(Record.amount))
    return copyState
  }
  if (type === ACTION_TYPE.subRecord) {
    const { id } = payload
    const copyState = { ...state }
    const recordFilter = state.Record.filter((record) => {
      if (record.balance_id === id) {
        record.type === 'add'
          ? (copyState.Balance -= parseInt(record.amount))
          : (copyState.Balance += parseInt(record.amount))
        return false
      }
      return true
    })
    copyState.Record = recordFilter
    return copyState
  }

  if (type === ACTION_TYPE.currentTarget) {
    return Object.assign(state, payload)
  }
  if (type === ACTION_TYPE.targetDelete) {
    return Object.assign(state, payload)
  }

  return state
}

export const getBalance = (data) => {
  return {
    type: ACTION_TYPE.getBalance,
    payload: { Balance: data },
  }
}

export const getAllRecord = (data) => {
  return {
    type: ACTION_TYPE.getAllRecord,
    payload: { Record: data },
  }
}

export const addNewRecord = (data) => {
  return {
    type: ACTION_TYPE.addRecord,
    payload: { Record: data },
  }
}
export const deleteRecord = (data) => {
  return {
    type: ACTION_TYPE.subRecord,
    payload: { id: data },
  }
}
export const targetDeleteRecord = (data) => {
  return {
    type: ACTION_TYPE.targetDelete,
    payload: { targetDelete: data },
  }
}

export const targetRecord = (data) => {
  return {
    type: ACTION_TYPE.currentTarget,
    payload: { currentTarget: data },
  }
}
