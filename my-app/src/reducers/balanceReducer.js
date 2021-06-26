const ACTION_TYPE = {
  GetBalance: '@balance/getBalance',
  GetAllRecord: '@balance/getAllRecord',
  AddRecord: '@balance/addRecord',
  SubRecord: '@balance/subRecord',
  CurrentTarget: '@balance/currentTarget',
  TargetDelete: '@balance/targetDelete',
  UpdateBalance: '@balance/updateBalance',
  FilterPaginations: '@balance/filterPaginations',
}

export const balanceReducer = (
  state = { Record: [], filters: { paginationPosition: 1 } },
  { type, payload }
) => {
  if (type === ACTION_TYPE.GetBalance) {
    return Object.assign({ ...state }, payload)
  }
  if (type === ACTION_TYPE.GetAllRecord) {
    return Object.assign({ ...state }, payload)
  }
  if (type === ACTION_TYPE.AddRecord) {
    const { Record } = payload
    const copyState = { ...state }
    copyState.Record.splice(0, 0, Record)
    Record.type === 'add'
      ? (copyState.Balance += parseInt(Record.amount))
      : (copyState.Balance -= parseInt(Record.amount))
    return copyState
  }
  if (type === ACTION_TYPE.SubRecord) {
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

  if (type === ACTION_TYPE.CurrentTarget) {
    return Object.assign({ ...state }, payload)
  }
  if (type === ACTION_TYPE.TargetDelete) {
    return Object.assign({ ...state }, payload)
  }
  if (type === ACTION_TYPE.UpdateBalance) {
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

  if (type === ACTION_TYPE.FilterPaginations) {
    return Object.assign({ ...state }, payload)
  }

  return state
}

export const getBalance = (data) => {
  return {
    type: ACTION_TYPE.GetBalance,
    payload: { Balance: data },
  }
}

export const getAllRecord = (data) => {
  return {
    type: ACTION_TYPE.GetAllRecord,
    payload: { Record: data },
  }
}

export const addNewRecord = (data) => {
  return {
    type: ACTION_TYPE.AddRecord,
    payload: { Record: data },
  }
}
export const deleteRecord = (data) => {
  return {
    type: ACTION_TYPE.SubRecord,
    payload: { id: data },
  }
}
export const targetDeleteRecord = (data) => {
  return {
    type: ACTION_TYPE.TargetDelete,
    payload: { targetDelete: data },
  }
}

export const targetRecord = (data) => {
  return {
    type: ACTION_TYPE.CurrentTarget,
    payload: { currentTarget: data },
  }
}

export const updateBalance = (data, id) => {
  return {
    type: ACTION_TYPE.UpdateBalance,
    payload: {
      data,
      id,
    },
  }
}
export const filterPaginations = (paginationPosition) => {
  return {
    type: ACTION_TYPE.FilterPaginations,
    payload: { filters: { paginationPosition } },
  }
}
