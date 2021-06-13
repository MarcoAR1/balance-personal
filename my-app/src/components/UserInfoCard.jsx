import { Button, Card, Typography, IconButton } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import MenuIcon from '@material-ui/icons/Menu'
import Graphic from './Graphic'
import { getTotalBalance } from '../services/balances'
import useStyles from '../styles/UserInfoCardStyle'

const UserInfoCard = ({ name }) => {
  const [balanceTotal, setBalanceTotal] = useState(0)
  const classes = useStyles()

  useEffect(() => {
    const getTotal = async () => {
      const total = await getTotalBalance()
      setBalanceTotal(total ? total : 0)
    }
    getTotal()
  }, [])

  return (
    <Card className={classes.container}>
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
          <IconButton aria-label="Menu" onClick={() => {}}>
            <MenuIcon />
          </IconButton>
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
          <Button className={classes.buttonAdd} variant="contained">pay in</Button>
        </div>
        <Button className={classes.buttonWithDraw} variant="contained">withdraw</Button>
      </div>
    </Card>
  )
}

export default UserInfoCard
