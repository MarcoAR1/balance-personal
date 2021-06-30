import { UserLogIn, UserLogOut } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { getBalanceRecord, getTotalBalance } from '../services/balances'
import { getAllRecord, getBalance } from '../reducers/balanceReducer'

const useUser = () => {
  const dispatch = useDispatch()

  const handleStateLogIn = (data) => {
    dispatch(UserLogIn(data))
    getBalanceRecord().then((records) => {
      dispatch(getAllRecord(JSON.parse(records)))
    })
    getTotalBalance().then((total) => {
      const totalBalance = JSON.parse(total)

      if (totalBalance) {
        dispatch(getBalance(totalBalance.amount))
        return
      }

      dispatch(getBalance(0))
    })
  }

  const handleStateLogOut = () => {
    dispatch(UserLogOut())
  }

  return { handleStateLogIn, handleStateLogOut }
}

export default useUser
