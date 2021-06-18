import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getAllRecord, getBalance } from '../reducers/balanceReducer'
import { UserLogIn } from '../reducers/userReducer'
import {
  getBalanceRecord,
  getTotalBalance,
  setTokens,
} from '../services/balances'

const useStartApp = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const userData = window.localStorage.getItem('infoUser')
    if (userData) {
      setTokens(JSON.parse(userData).token)
      dispatch(UserLogIn(JSON.parse(userData)))

      getBalanceRecord().then((records) => {
        dispatch(getAllRecord(records))
      })
      getTotalBalance().then((total) => {
        dispatch(getBalance(total[0].amount))
      })
    }
  }, [dispatch])
}

export default useStartApp
