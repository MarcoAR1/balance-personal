import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useViewAndAnimation } from '../hooks/useViewAndAnimation'
import CardHome from './CardHome'

const RecordInfo = () => {
  const record = useSelector(
    (state) => state.balance.Record.balance_id === state.balance.currentTarget
  )
  console.log(record)
  const dispatch = useDispatch()
  const { ChangeViewTypeHome } = useViewAndAnimation()

  return (
    <CardHome
      CancelButton={{ text: 'volver', function: ChangeViewTypeHome }}
    ></CardHome>
  )
}

export default RecordInfo
