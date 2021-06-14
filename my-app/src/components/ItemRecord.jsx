import { Button } from '@material-ui/core'
import React from 'react'
import useStyles from '../styles/ItemRecordStyle'

const ItemRecord = ({ balance, handleDeleteRecord, deleteConfirmation }) => {
  const classes = useStyles()
  return (
    <>
      {balance.map(({ balance_id, amount, type }, i) => {
        return deleteConfirmation[i] ? (
          <div
            className={`${classes.itemRecordBalance} ${
              type === 'add' ? classes.recordPayIn : classes.recordWithout
            }`}
            key={balance_id}
          >
            <div className={classes.record}>
              <div
                onClick={() => {
                  console.log('presionado')
                }}
                className={classes.text}
              >
                {amount}$
              </div>
              <Button
                onClick={() => {
                  handleDeleteRecord(i)
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
          >
            <div className={classes.record}>
              <div className={classes.text}>Delete Record?</div>
              <Button
                onClick={() => {
                  handleDeleteRecord(i, null, true)
                }}
                color="primary"
                variant="outlined"
              >
                No
              </Button>
              <Button
                style={{ marginLeft: 10 }}
                onClick={() => {
                  handleDeleteRecord(i, balance_id)
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
