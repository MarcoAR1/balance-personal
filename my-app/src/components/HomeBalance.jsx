import { Typography } from '@material-ui/core'
import React from 'react'
import useStyles from '../styles/HomeBalanceStyle'
import RecordBalance from './RecordBalance'
import UserInfoCard from './UserInfoCard'
import FormBalance from './FormBalance'
import { useSelector } from 'react-redux'
import UserProfile from './UserProfile'
import RecordInfo from './RecordInfo'

const HomeBalance = () => {
  const viewUserCard = useSelector(({ view }) => view.userCard)
  const viewGraphic = useSelector(({ view }) => view.graphicCard)
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <Typography variant="h4"> Your Balance </Typography>
      </div>
      <div className={classes.containerApp}>
        <div className={classes.userInfoContainer}>
          {viewUserCard === 'Home' && <UserInfoCard />}
          {(viewUserCard === 'add' || viewUserCard === 'sub') && (
            <FormBalance />
          )}
          {viewUserCard === 'profile' && <UserProfile />}
          {viewGraphic === 'editRecord' && <RecordInfo />}
          {viewGraphic === 'Graphic' && (
            <div className={classes.graphicInfo}></div>
          )}
        </div>
        <div className={classes.recordInfoContainer}>
          <RecordBalance />
        </div>
      </div>
    </div>
  )
}

export default HomeBalance
