import { Typography } from '@material-ui/core'
import React from 'react'
import useStyles from '../styles/HomeBalanceStyle'
import RecordBalance from './RecordBalance'
import UserInfoCard from './UserInfoCard'

const HomeBalance = ({ userInfo }) => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <Typography variant="h4"> Your Balance </Typography>
      </div>
      <div className={classes.containerApp}>
        <div className={classes.userInfoContainer}>
          <UserInfoCard name={userInfo.name} />
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
