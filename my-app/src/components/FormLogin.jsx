import React, { useState } from 'react'
import { Button, Card, TextField, Typography } from '@material-ui/core'
import useStyles from '../styles/FormLoginStyle'
import LockOpenIcon from '@material-ui/icons/LockOpen'

const FormLogin = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [messageNotification, setMessageNotification] = useState('')
  const classes = useStyles()

  const handleChangeUsername = (e) => {
    const value = e.target.value
    setUsername(value)
  }
  const handleChangePassword = (e) => {
    const value = e.target.value
    setPassword(value)
  }

  const handleMessageNotification = (message) => {
    setMessageNotification(message)
  }

  return (
    <>
      <Card className={classes.containerFrom}>
        <div>
          <h2> Your Balance </h2>
        </div>

        <form
          className={classes.inputsFormLogin}
          id="my-input"
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Username"
            variant="standard"
            autoFocus
            onChange={handleChangeUsername}
            value={username}
          />

          <TextField
            label="Password"
            variant="standard"
            onChange={handleChangePassword}
            type="password"
            value={password}
          />

          <Button variant="outlined" endIcon={<LockOpenIcon />}>
            Sing In
          </Button>
        </form>
        <div className={classes.notification}>
          <Typography variant="body1" color="secondary">
            {messageNotification}
          </Typography>
        </div>
      </Card>
    </>
  )
}

export default FormLogin
