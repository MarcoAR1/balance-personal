import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getAllRecord, getBalance } from '../reducers/balanceReducer'
import { UserLogIn } from '../reducers/userReducer'
import { getBalanceRecord, getTotalBalance } from '../services/balances'

const useStartApp = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const userData = window.localStorage.getItem('infoUser')
    if (userData) {
      dispatch(UserLogIn(JSON.parse(userData)))
      getBalanceRecord().then((records) => {
        dispatch(getAllRecord(records))
      })
      getTotalBalance().then((total) => {
        if (total[0]) {
          dispatch(getBalance(total[0].amount))
          return
        }
        dispatch(getBalance(0))
      })
    }
  }, [dispatch])
}

export default useStartApp
