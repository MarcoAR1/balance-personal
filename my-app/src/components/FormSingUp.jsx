import React, { useState } from 'react'
import { Button, Card, TextField, Typography } from '@material-ui/core'
import useStyles from '../styles/FormLoginStyle'
import SingUp from '../services/singup'

const FormSingUp = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [message, setMessage] = useState('')
  const classes = useStyles()

  const handleChangeUsername = (e) => {
    const value = e.target.value
    setUsername(value)
  }
  const handleChangePassword = (e) => {
    const value = e.target.value
    setPassword(value)
  }
  const handleChangePasswordConfirm = (e) => {
    const value = e.target.value
    setPasswordConfirm(value)
  }
  const handleChangeEmail = (e) => {
    const value = e.target.value
    setEmail(value)
  }
  const handleChangeFullName = (e) => {
    const value = e.target.value
    setFullName(value)
  }
  const handleChangeMessage = ({ message }) => {
    setMessage(message)
  }

  const handleSubmitSingup = async (e) => {
    e.preventDefault()
    const request = await SingUp({ username, password, email, name: fullName })
    if (request.status && request.status === 201) {
      return handleChangeMessage(request)
    }
    return handleChangeMessage(request)
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
          onSubmit={handleSubmitSingup}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Full Name"
            variant="standard"
            onChange={handleChangeFullName}
            type="text"
            value={fullName}
          />

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
          <TextField
            label="Confirm you password"
            variant="standard"
            onChange={handleChangePasswordConfirm}
            type="password"
            value={passwordConfirm}
          />

          <TextField
            label="Email"
            variant="standard"
            onChange={handleChangeEmail}
            type="email"
            value={email}
          />

          <Button type="submit" variant="outlined">
            Sing Up
          </Button>
        </form>
        <div>
          <Typography variant="body1" color="secondary">
            {message}
          </Typography>
        </div>
      </Card>
    </>
  )
}

export default FormSingUp
