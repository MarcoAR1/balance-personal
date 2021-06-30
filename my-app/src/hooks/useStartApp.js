import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getAllRecord, getBalance } from '../reducers/balanceReducer'
import { UserLogIn } from '../reducers/userReducer'
import { getBalanceRecord, getTotalBalance } from '../services/balances'

const useStartApp = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const userData = JSON.parse(window.localStorage.getItem('infoUser'))
    if (userData['username']) {
      dispatch(UserLogIn(userData))
      getBalanceRecord().then((records) => {
        dispatch(getAllRecord(JSON.parse(records)))
      })
      getTotalBalance().then((total) => {
        const BalanceTotal = JSON.parse(total)[0]
        if (BalanceTotal) {
          dispatch(getBalance(BalanceTotal.amount))
          return
        }
        dispatch(getBalance(0))
      })
    }
  }, [dispatch])
}

export default useStartApp
