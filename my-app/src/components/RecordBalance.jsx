import { Button, Card, IconButton, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import MenuIcon from '@material-ui/icons/Menu'
import useStyles from '../styles/RecordBalanceStyle'
import { getBalanceRecord } from '../services/balances'

const HistorialBalance = () => {
  const [balance, getAllBalance] = useState([])
  const classes = useStyles()
  useEffect(() => {
    const getRecord = async () => {
      const records = await getBalanceRecord()
      getAllBalance(records ? records : [])
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
        {balance.map((e, i) => {
          return (
            <div
              className={`${classes.itemRecordBalance} ${
                true ? classes.recordPayIn : classes.recordWithout
              }`}
              key={i}
            >
              <div className={classes.record}>
                <div
                  onClick={() => {
                    console.log('presionado')
                  }}
                  className={classes.text}
                >
                  {e}$
                </div>
                <Button
                  onClick={() => {
                    console.log('Borrado')
                  }}
                  className={classes.deleteButton}
                >
                  Delete
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

export default HistorialBalance
