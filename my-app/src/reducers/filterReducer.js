const ACTION_TYPE = {
  FilterTypeSub: '@filter/fillterTypeSub',
  FilterTypeAdd: '@filter/fillterTypeAdd',
  FillterTypeClean: '@filter/fillterTypeClean',
  FilterDateStart: '@filter/filtterDateStart',
  FilterDateStartClean: '@filter/filtterDateStartClean',
  FilterDateEnd: '@filter/filtterDateEnd',
  FilterDateEndClean: '@filter/filtterDateEndClean',
  FilterDateClean: '@filter/filtterDateClean',
  FillterCategory: '@fillter/fillterCategory',
  FillterCategoryClean: '@fillter/fillterCategoryClean',
  FillterCleanAll: '@fillter/fillterCleanAll',
}

export const filterReducer = (state = { Date: {} }, { type, payload }) => {
  if (type === ACTION_TYPE.FilterTypeSub) {
    return Object.assign({ ...state }, payload)
  }
  if (type === ACTION_TYPE.FilterTypeAdd) {
    return Object.assign({ ...state }, payload)
  }
  if (type === ACTION_TYPE.FillterTypeClean) {
    const copy = { ...state }
    delete copy.Type
    return copy
  }
  if (type === ACTION_TYPE.FilterDateStart) {
    const copy = { ...state }
    Object.assign(copy.Date, payload)
    return copy
  }
  if (type === ACTION_TYPE.FilterDateStartClean) {
    const copy = { ...state }
    delete copy.Date.Start
    return copy
  }
  if (type === ACTION_TYPE.FilterDateEnd) {
    const copy = { ...state }
    Object.assign(copy.Date, payload)
    return copy
  }
  if (type === ACTION_TYPE.FilterDateEndClean) {
    const copy = { ...state }
    delete copy.Date.End
    return copy
  }
  if (type === ACTION_TYPE.FilterDateClean) {
    const copy = { ...state }
    delete copy.Date
    return copy
  }
  if (type === ACTION_TYPE.FillterCategory) {
    return Object.assign({ ...state }, payload)
  }
  if (type === ACTION_TYPE.FillterCategoryClean) {
    const copy = { ...state }
    delete copy.Category
    return copy
  }
  if (type === ACTION_TYPE.FillterCleanAll) {
    return { Date: {} }
  }

  return state
}

export const onFilterTypeChangeSub = () => {
  return {
    type: ACTION_TYPE.FilterTypeSub,
    payload: { Type: 'sub' },
  }
}
export const onFilterTypeChangeAdd = () => {
  return {
    type: ACTION_TYPE.FilterTypeSub,
    payload: { Type: 'add' },
  }
}
export const onFilterTypeIsClean = () => {
  return {
    type: ACTION_TYPE.FillterTypeClean,
  }
}
export const onFilterDateStartChange = (Date) => {
  return {
    type: ACTION_TYPE.FilterDateStart,
    payload: { Start: Date },
  }
}
export const onFilterDateEndChange = (Date) => {
  return {
    type: ACTION_TYPE.FilterDateEnd,
    payload: { End: Date },
  }
}
export const onFilterDateClean = () => {
  return {
    type: ACTION_TYPE.FilterDateClean,
  }
}
export const onFilterCategoryChange = (Category) => {
  return {
    type: ACTION_TYPE.FillterCategory,
    payload: { Category },
  }
}
export const onFilterCategoryClean = () => {
  return {
    type: ACTION_TYPE.FillterCategoryClean,
  }
}

export const onFilterClearAll = () => {
  return {
    type: ACTION_TYPE.FillterCleanAll,
  }
}
