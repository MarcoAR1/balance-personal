const ACTION_TYPE = {
  getBalance: '@balance/getBalance',
  getAllRecord: '@balance/getAllRecord',
  addRecord: '@balance/addRecord',
  subRecord: '@balance/subRecord',
  currentTarget: '@balance/currentTarget',
  targetDelete: '@balance/targetDelete',
  updateBalance: '@balance/updateBalance',
  filterPaginations: '@balance/filterPaginations',
}

export const balanceReducer = (
  state = { Record: [], filters: { paginationPosition: 1 } },
  { type, payload }
) => {
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
  if (type === ACTION_TYPE.updateBalance) {
    const { data, id } = payload
    const copy = { ...state }
    const record = copy.Record.find((items) => items.balance_id === id)
    if (data.amount) {
      const amount = Math.abs(data.amount)

      if (record.type === 'add') {
        const diff = amount - parseInt(record.amount)
        copy.Balance += diff
      }
      if (record.type === 'sub') {
        const diff = amount - parseInt(record.amount)
        copy.Balance -= diff
      }
    }
    Object.assign(record, data)
    return copy
  }

  if (type === ACTION_TYPE.filterPaginations) {
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

export const updateBalance = (data, id) => {
  return {
    type: ACTION_TYPE.updateBalance,
    payload: {
      data,
      id,
    },
  }
}
export const filterPaginations = (paginationPosition) => {
  return {
    type: ACTION_TYPE.filterPaginations,
    payload: { filters: { paginationPosition } },
  }
}
