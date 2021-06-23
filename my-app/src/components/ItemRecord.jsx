import { Button } from '@material-ui/core'
import React from 'react'
import useBalance from '../hooks/useBalance'
import useStyles from '../styles/ItemRecordStyle'
import { useDispatch, useSelector } from 'react-redux'
import { useRecordsAnimation } from '../hooks/useRecordsAnimation'
import { useViewAndAnimation } from '../hooks/useViewAndAnimation'
import { Pagination } from '@material-ui/lab'
import '../styles/App.css'
import { filterPaginations } from '../reducers/balanceReducer'

const ItemRecord = () => {
  const balance = useSelector(({ balance }) => balance.Record)
  const paginationPosition = useSelector(
    ({ balance }) => balance.filters.paginationPosition
  )
  const classes = useStyles()
  const {
    deleteTargetSeelction,
    handleDeleteRecord,
    currentTargetSelection,
    ChangeViewTypeEditRecord,
  } = useBalance()
  const targetDelete = useSelector(({ balance }) => balance.targetDelete)
  const currentTarget = useSelector(({ balance }) => balance.currentTarget)
  const { handleAnimationRecord } = useRecordsAnimation()
  const { ChangeViewTypeWithoutGraphic } = useViewAndAnimation()
  const dispatch = useDispatch()

  const handlePaginationChange = (event, newPage) => {
    dispatch(filterPaginations(newPage))
  }

  const CurrentRecordItems = () => {
    const copy = [...balance]
    const finish = 10
    const start = (paginationPosition - 1) * 10
    return copy.splice(start, finish)
  }

  return (
    <>
      {balance &&
        CurrentRecordItems().map(({ balance_id, amount, type }) => {
          return targetDelete !== balance_id ? (
            <div
              className={`${classes.itemRecordBalance} ${
                type === 'add' ? classes.recordPayIn : classes.recordWithout
              }`}
              key={balance_id}
              id={balance_id}
            >
              <div className={classes.record} id={balance_id + 'two'}>
                <div
                  onClick={() => {
                    currentTargetSelection(balance_id)
                    ChangeViewTypeEditRecord()
                  }}
                  className={classes.text}
                  style={{ cursor: 'pointer' }}
                >
                  {type === 'sub' && '-'} {amount} $
                </div>
                <Button
                  onClick={() => {
                    handleAnimationRecord(() => {
                      deleteTargetSeelction(balance_id)
                    }, balance_id)
                  }}
                  className={classes.deleteButton}
                >
                  Delete
                </Button>
              </div>
            </div>
          ) : (
            <div
              className={`${classes.itemRecordBalance} ${
                type === 'add' ? classes.recordPayIn : classes.recordWithout
              }`}
              key={balance_id}
              id={balance_id}
            >
              <div className={classes.record} id={balance_id + 'two'}>
                <div className={classes.text}>Delete Record?</div>
                <Button
                  onClick={() => {
                    deleteTargetSeelction('')
                    handleAnimationRecord(
                      () => {
                        deleteTargetSeelction('')
                      },
                      balance_id,
                      true
                    )
                  }}
                  color="primary"
                  variant="outlined"
                >
                  No
                </Button>
                <Button
                  style={{ marginLeft: 10 }}
                  onClick={() => {
                    handleAnimationRecord(
                      () => {
                        if (currentTarget === targetDelete) {
                          ChangeViewTypeWithoutGraphic()
                        }
                        handleDeleteRecord(balance_id)
                      },
                      balance_id,
                      true
                    )
                  }}
                  className={classes.deleteButton}
                  color="secondary"
                  variant="outlined"
                >
                  Yes
                </Button>
              </div>
            </div>
          )
        })}
      {balance.length > 11 && (
        <Pagination
          style={{ marginBottom: 10 }}
          count={Math.ceil(balance.length / 10)}
          page={paginationPosition}
          onChange={handlePaginationChange}
          color="primary"
        />
      )}
    </>
  )
}

export default ItemRecord
