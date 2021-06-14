import { Button, Card, Typography } from '@material-ui/core'
import React from 'react'
import Graphic from './Graphic'
import useStyles from '../styles/UserInfoCardStyle'
import '../styles/App.css'
import MenuFloatList from './MenuFloatList'

const UserInfoCard = ({
  name,
  setAddBalance,
  animation,
  balanceTotal,
  setUserInfo,
}) => {
  const classes = useStyles()

  return (
    <Card className={`${classes.container} ${animation && 'flip-right'}`}>
      <div>
        <div className={classes.containerTitle}>
          <Typography
            className={classes.title}
            align="center"
            variant="h4"
            color="initial"
          >
            {name}
          </Typography>
          <MenuFloatList setUserInfo={setUserInfo} />
        </div>
        <Typography
          className={classes.totalBalance}
          variant="h4"
          color="initial"
        >
          {balanceTotal}$
        </Typography>
      </div>
      <div className={classes.containerGraphic}>
        <Graphic />
      </div>
      <div className={classes.containerButtons}>
        <div className={classes.containerButtonADD}>
          <Button
            onClick={() => setAddBalance('add')}
            className={classes.buttonAdd}
            variant="contained"
          >
            Add
          </Button>
        </div>
        <Button
          onClick={() => setAddBalance('sub')}
          className={classes.buttonWithDraw}
          variant="contained"
        >
          Withdraw
        </Button>
      </div>
    </Card>
  )
}

export default UserInfoCard
