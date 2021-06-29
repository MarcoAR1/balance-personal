import { useDispatch, useSelector } from 'react-redux'
import {
  ActiveRight,
  ActiveRight2,
  ActiveFinish,
  ActiveLeft,
  ActiveLeft2,
  ActiveExit,
} from '../reducers/animationReducer'
import {
  viewTypeHome,
  viewTypeAdd,
  viewTypeSub,
  viewTypeProfile,
  viewTypeEditRecord,
  viewTypeWithoutGraphic,
  viewTypeGraphic,
} from '../reducers/viewReducer'

export const useViewAndAnimation = () => {
  const view = useSelector(({ view }) => view.userCard)
  const dispatch = useDispatch()

  const handleChangeView = (fun, string, value = true) => {
    if (!value) {
      dispatch(ActiveLeft(string))
      setTimeout(() => {
        dispatch(fun)
        dispatch(ActiveLeft2(string))
      }, 200)
      setTimeout(() => {
        dispatch(ActiveFinish(string))
      }, 300)
      return
    }
    dispatch(ActiveRight(string))
    setTimeout(() => {
      dispatch(fun)
      dispatch(ActiveRight2(string))
    }, 200)
    setTimeout(() => {
      dispatch(ActiveFinish(string))
    }, 300)
  }

  const handleChangeViewGraphic = (fun, string, value = true) => {
    dispatch(ActiveExit(string))
    setTimeout(() => {
      dispatch(ActiveFinish(string))
      dispatch(fun)
    }, 200)
    return
  }

  const ChangeViewTypeAdd = () => {
    handleChangeView(viewTypeAdd(), 'Home')
  }
  const ChangeViewTypeSub = () => {
    handleChangeView(viewTypeSub(), 'Home')
  }
  const ChangeViewTypeHome = () => {
    handleChangeView(viewTypeHome(), 'Home', false)
  }
  const ChangeViewTypeProfile = () => {
    handleChangeView(viewTypeProfile(), 'Home')
  }
  const ChangeViewTypeEditRecord = () => {
    handleChangeViewGraphic(viewTypeEditRecord(), 'Graphic')
  }
  const ChangeViewTypeWithoutGraphic = () => {
    handleChangeViewGraphic(viewTypeWithoutGraphic(), 'Graphic')
  }
  const ChangeViewTypeWithGraphic = () => {
    handleChangeViewGraphic(viewTypeGraphic(), 'Graphic')
  }

  return {
    view,
    ChangeViewTypeAdd,
    ChangeViewTypeSub,
    ChangeViewTypeHome,
    ChangeViewTypeProfile,
    ChangeViewTypeEditRecord,
    ChangeViewTypeWithoutGraphic,
    ChangeViewTypeWithGraphic,
  }
}
