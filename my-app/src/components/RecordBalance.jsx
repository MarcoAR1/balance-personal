import { Card, IconButton, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import MenuIcon from '@material-ui/icons/Menu'
import useStyles from '../styles/RecordBalanceStyle'
import { deleteRecordId, getBalanceRecord } from '../services/balances'
import ItemRecord from './ItemRecord'

const HistorialBalance = () => {
  const [balance, getAllBalance] = useState([])
  const [deleteConfirmation, setdeleteConfirmation] = useState([])
  const classes = useStyles()

  const handleDeleteRecord = async (position, id, cancel) => {
    if (cancel) {
      setdeleteConfirmation((prev) => {
        let copy = [...prev]
        copy[position] = true
        setdeleteConfirmation(copy)
      })
      return
    }
    if (!id) {
      setdeleteConfirmation((prev) => {
        let copy = [...prev]
        copy[position] = false
        setdeleteConfirmation(copy)
      })
      return
    }
    const deleteRecord = await deleteRecordId(id)
    if (!deleteRecord.responseText) {
      return 'error'
    }
    const res = JSON.parse(deleteRecord.responseText)
    if (res[0].affectedRows === 1) {
      setdeleteConfirmation((prev) => {
        let copy = [...prev]
        copy.splice(position, 1)
        return copy
      })
      getAllBalance((prev) => {
        let copy = [...prev]
        copy.splice(position, 1)
        return copy
      })
    }
  }

  useEffect(() => {
    const getRecord = async () => {
      const records = await getBalanceRecord()
      getAllBalance(records ? records : [])
      setdeleteConfirmation(new Array(records.length).fill(true))
    }
    getRecord()
  }, [])

  return (
    <Card className={classes.container}>
      <div className={classes.containerTitle}>
        <Typography className={classes.title} variant="h4" color="initial">
          Records
        </Typography>
        <IconButton aria-label="Menu" onClick={() => {}}>
          <MenuIcon />
        </IconButton>
      </div>
      <div className={classes.containerRecord}>
        <ItemRecord
          balance={balance}
          handleDeleteRecord={handleDeleteRecord}
          deleteConfirmation={deleteConfirmation}
          setdeleteConfirmation={setdeleteConfirmation}
        />
      </div>
    </Card>
  )
}

export default HistorialBalance
