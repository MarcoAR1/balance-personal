import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllRecord,
  getBalance,
  deleteRecord,
  addNewRecord,
  targetRecord,
  targetDeleteRecord,
} from '../reducers/balanceReducer'
import {
  deleteRecordId,
  getBalanceRecord,
  getTotalBalance,
} from '../services/balances'

const useBalance = () => {
  const balance = useSelector((state) => state.balance.Record)
  const dispatch = useDispatch()
  const handleDeleteRecord = async (id) => {
    const req = await deleteRecordId(id)
    if (!req.responseText) {
      return 'error'
    }
    const res = JSON.parse(req.responseText)
    if (res[0].affectedRows !== 1) {
      return 'error'
    }
    dispatch(deleteRecord(id))
  }

  const currentTargetSelection = (data) => {
    dispatch(targetRecord(data))
  }
  const deleteTargetSeelction = (data) => {
    dispatch(targetDeleteRecord(data))
  }
  const addRecord = (data) => {
    dispatch(addNewRecord(data))
  }

  useEffect(() => {
    getBalanceRecord().then((records) => {
      dispatch(getAllRecord(records))
    })
    getTotalBalance().then((total) => {
      dispatch(getBalance(total[0].amount))
    })
  }, [dispatch])

  return {
    deleteTargetSeelction,
    currentTargetSelection,
    balance,
    handleDeleteRecord,
    addRecord,
  }
}

export default useBalance
