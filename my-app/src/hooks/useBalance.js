import { useDispatch } from 'react-redux'
import { DisabledEntrance } from '../reducers/animationReducer'
import {
  deleteRecord,
  addNewRecord,
  targetRecord,
  targetDeleteRecord,
} from '../reducers/balanceReducer'
import { viewTypeEditRecord } from '../reducers/viewReducer'
import { deleteRecordId } from '../services/balances'

const useBalance = () => {
  const dispatch = useDispatch()
  const handleDeleteRecord = async (id, fun) => {
    const req = await deleteRecordId(id)
    if (!req.responseText) {
      fun(false)
      return 'error'
    }
    const res = JSON.parse(req.responseText)
    if (res[0].affectedRows !== 1) {
      fun(false)
      return 'error'
    }
    dispatch(deleteRecord(id))
    fun(false)
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
  const ChangeViewTypeEditRecord = () => {
    dispatch(viewTypeEditRecord())
    setTimeout(() => {
      dispatch(DisabledEntrance('Graphic'))
    }, 200)
  }
  return {
    deleteTargetSeelction,
    currentTargetSelection,
    handleDeleteRecord,
    addRecord,
    ChangeViewTypeEditRecord,
  }
}

export default useBalance
