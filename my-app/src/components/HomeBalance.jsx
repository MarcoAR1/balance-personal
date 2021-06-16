import { Typography } from '@material-ui/core'
import React from 'react'
import useStyles from '../styles/HomeBalanceStyle'
import RecordBalance from './RecordBalance'
import UserInfoCard from './UserInfoCard'
import FormBalance from './FormBalance'
import { useSelector } from 'react-redux'

const HomeBalance = () => {
  const view = useSelector(({ view }) => view.userCard)
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <Typography variant="h4"> Your Balance </Typography>
      </div>
      <div className={classes.containerApp}>
        <div className={classes.userInfoContainer}>
          {view ? <FormBalance /> : <UserInfoCard />}
          <div className={classes.graphicInfo}></div>
        </div>

        <div className={classes.recordInfoContainer}>
          <RecordBalance />
        </div>
      </div>
    </div>
  )
}

export default HomeBalance
