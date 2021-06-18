import { useDispatch } from 'react-redux'
import {
  deleteRecord,
  addNewRecord,
  targetRecord,
  targetDeleteRecord,
} from '../reducers/balanceReducer'
import { deleteRecordId } from '../services/balances'

const useBalance = () => {
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

  return {
    deleteTargetSeelction,
    currentTargetSelection,
    handleDeleteRecord,
    addRecord,
  }
}

export default useBalance
