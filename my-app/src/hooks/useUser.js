import { useEffect } from 'react'
import { UserLogIn, UserLogOut } from '../reducers/userReducer'
import { setTokens } from '../services/balances'
import { useDispatch, useSelector } from 'react-redux'

const useUser = () => {
  const userInfo = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const userData = window.localStorage.getItem('infoUser')
    if (userData) {
      setTokens(JSON.parse(userData).token)
      dispatch(UserLogIn(JSON.parse(userData)))
    }
  }, [dispatch])

  const handleStateLogIn = (data) => {
    dispatch(UserLogIn(data))
  }

  const handleStateLogOut = () => {
    dispatch(UserLogOut())
  }

  return { userInfo, handleStateLogIn, handleStateLogOut }
}

export default useUser
