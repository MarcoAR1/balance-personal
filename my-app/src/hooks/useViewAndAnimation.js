import { useDispatch, useSelector } from 'react-redux'
import {
  ActiveRight,
  ActiveRight2,
  ActiveFinish,
  ActiveLeft,
  ActiveLeft2,
} from '../reducers/animationReducer'
import { viewTypeHome, viewTypeAdd, viewTypeSub, viewTypeProfile } from '../reducers/viewReducer'

export const useViewAndAnimation = () => {
  const animation = useSelector(({ animation }) => animation.Home)
  const view = useSelector(({ view }) => view.userCard)
  const dispatch = useDispatch()
  const handleChangeView = (value) => {
    if (!value) {
      dispatch(ActiveLeft('Home'))
      setTimeout(() => {
        dispatch(viewTypeHome())
        dispatch(ActiveLeft2('Home'))
      }, 200)
      setTimeout(() => {
        dispatch(ActiveFinish('Home'))
      }, 300)
      return
    }
    dispatch(ActiveRight('Home'))
    setTimeout(() => {
      dispatch(value)
      dispatch(ActiveRight2('Home'))
    }, 200)
    setTimeout(() => {
      dispatch(ActiveFinish('Home'))
    }, 300)
  }

  const ChangeViewTypeAdd = () => {
    handleChangeView(viewTypeAdd())
  }
  const ChangeViewTypeSub = () => {
    handleChangeView(viewTypeSub())
  }
  const ChangeViewTypeHome = () => {
    handleChangeView()
  }
  const ChangeViewTypeProfile = () => {
    handleChangeView(viewTypeProfile())
  }

  return {
    animation,
    view,
    ChangeViewTypeAdd,
    ChangeViewTypeSub,
    ChangeViewTypeHome,
    ChangeViewTypeProfile
  }
}
