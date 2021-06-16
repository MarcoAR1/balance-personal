import { Button } from '@material-ui/core'
import React from 'react'
import useBalance from '../hooks/useBalance'
import useStyles from '../styles/ItemRecordStyle'
import { useSelector } from 'react-redux'
import { useRecordsAnimation } from '../hooks/useRecordsAnimation'
import '../styles/App.css'

const ItemRecord = () => {
  const classes = useStyles()
  const {
    balance,
    deleteTargetSeelction,
    handleDeleteRecord,
    currentTargetSelection,
  } = useBalance()
  const targetDelete = useSelector(({ balance }) => balance.targetDelete)
  const { handleAnimationRecord, handleUnFocused } = useRecordsAnimation()

  return (
    <>
      {balance &&
        balance.map(({ balance_id, amount, type }) => {
          return targetDelete !== balance_id ? (
            <div
              className={`${classes.itemRecordBalance} ${
                type === 'add' ? classes.recordPayIn : classes.recordWithout
              }`}
              key={balance_id}
              id={balance_id}
            >
              <div className={classes.record}>
                <div
                  onClick={() => {
                    currentTargetSelection(balance_id)
                  }}
                  className={classes.text}
                >
                  {amount}$
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
              <div
                onBlur={() =>
                  handleUnFocused(balance_id, () => {
                    deleteTargetSeelction('')
                  })
                }
                className={classes.record}
              >
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
    </>
  )
}

export default ItemRecord
