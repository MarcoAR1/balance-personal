import React, { useState } from 'react'
import useStyles from '../../styles/FormStyle'
import Button from '@material-ui/core/Button'
import FormLogin from './FormLogin'
import FormSingUp from './FormSingUp'

const Form = () => {
  const [focused, setFocused] = useState(true)
  const classes = useStyles()
  const handleFocused = (boolean) => {
    setFocused(boolean)
  }

  return (
    <div className={classes.container}>
      <div className={classes.tertiary}></div>
      <div className={classes.secondary}>
        <Button className={classes.button} onClick={() => handleFocused(true)}>
          <p className={!focused ? classes.textNormal : classes.textHover}>
            Log In
          </p>
        </Button>
        <Button className={classes.button} onClick={() => handleFocused(false)}>
          <p className={focused ? classes.textNormal : classes.textHover}>
            Sing Up
          </p>
        </Button>
      </div>
      {focused ? (
        <FormLogin className={classes.primary} />
      ) : (
        <FormSingUp className={classes.primary} />
      )}
    </div>
  )
}

export default Form
