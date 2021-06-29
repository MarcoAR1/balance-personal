import { Card, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from '../styles/RecordBalanceStyle'
import ItemRecord from './RecordComponents/ItemRecord'
import OptionsFloatList from './RecordComponents/OptionsFloatList'

const RocordBalance = () => {
  const classes = useStyles()
  return (
    <Card className={classes.container}>
      <div className={classes.containerTitle}>
        <Typography className={classes.title} variant="h4" color="initial">
          Records
        </Typography>
        <OptionsFloatList />
      </div>
      <div className={classes.containerRecord}>
        <ItemRecord />
      </div>
    </Card>
  )
}

export default RocordBalance
