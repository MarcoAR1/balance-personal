import { Typography } from '@material-ui/core'
import React, { useState } from 'react'
import useStyles from '../styles/HomeBalanceStyle'
import RecordBalance from './RecordBalance'
import UserInfoCard from './UserInfoCard'
import FormBalance from './FormBalance'
const HomeBalance = ({ userInfo }) => {
  const [addBalance, setAddBalance] = useState(false)
  const [animation, setAnimation] = useState(false)
  const classes = useStyles()

  const handleChangeView = (value) => {
    setAnimation(true)
    setTimeout(() => {
      setAnimation(false)
      setAddBalance(value)
    }, 300)
  }

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <Typography variant="h4"> Your Balance </Typography>
      </div>
      <div className={classes.containerApp}>
        <div className={classes.userInfoContainer}>
          {addBalance ? (
            <FormBalance
              animation={animation}
              setAddBalance={handleChangeView}
              type={addBalance}
            />
          ) : (
            <UserInfoCard
              animation={animation}
              setAddBalance={handleChangeView}
              name={userInfo.name}
            />
          )}
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
