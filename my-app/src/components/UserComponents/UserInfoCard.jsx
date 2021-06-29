import { Button, Card, Typography } from '@material-ui/core'
import React from 'react'
import Graphic from '../Graphic'
import useStyles from '../../styles/UserInfoCardStyle'
import '../../styles/App.css'
import UserMenuFloatList from './UserMenuFloatList'
import { useViewAndAnimation } from '../../hooks/useViewAndAnimation'
import { useSelector } from 'react-redux'

const UserInfoCard = () => {
  const userInfo = useSelector(({ user }) => user)
  const { ChangeViewTypeAdd, ChangeViewTypeSub } = useViewAndAnimation()
  const animation = useSelector(({ animation }) => animation.Home)
  const balanceTotal = useSelector(({ balance }) => balance.Balance)
  const classes = useStyles()

  return (
    <Card
      className={`${classes.container} ${animation.rightOne && 'flip-right'} ${
        animation.leftTwo && 'flip-left2'
      }`}
    >
      <div>
        <div className={classes.containerTitle}>
          <Typography
            className={classes.title}
            align="center"
            variant="h4"
            color="initial"
          >
            {userInfo.name}
          </Typography>
          <UserMenuFloatList />
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
            onClick={ChangeViewTypeAdd}
            className={classes.buttonAdd}
            variant="contained"
          >
            Add
          </Button>
        </div>
        <Button
          onClick={ChangeViewTypeSub}
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
