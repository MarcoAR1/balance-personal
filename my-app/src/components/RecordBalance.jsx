import { Card, IconButton, Typography } from '@material-ui/core'
import React from 'react'
import MenuIcon from '@material-ui/icons/Menu'
import useStyles from '../styles/RecordBalanceStyle'
import ItemRecord from './ItemRecord'

const RocordBalance = ({ balance, deleteConfirmation, handleDeleteRecord }) => {
  const classes = useStyles()

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
        />
      </div>
    </Card>
  )
}

export default RocordBalance
