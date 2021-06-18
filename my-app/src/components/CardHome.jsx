import { Button, Card, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import useStyles from '../styles/CardHomeStyle'

const CardHome = ({
  children,
  SaveButton = {},
  CancelButton = {},
  title = '',
}) => {
  const animation = useSelector(({ animation }) => animation.Home)
  const classes = useStyles()

  return (
    <Card
      className={`${classes.container} ${animation.rightTwo && 'flip-right2'} ${
        animation.leftOne && 'flip-left'
      }`}
    >
      <div className={classes.containerTitle}>
        <Typography align="center" variant="h5" color="initial">
          {title}
        </Typography>
      </div>
      {children}
      <div className={classes.containerButtons}>
        <div className={classes.containerButtonCancel}>
          <Button
            onClick={CancelButton.function}
            className={classes.buttonCancel}
            variant="contained"
            disabled={CancelButton.disabled}
          >
            {CancelButton.text}
          </Button>
        </div>
        <Button
          type={SaveButton.type}
          form={SaveButton.form}
          onClick={SaveButton.function}
          className={classes.buttonSave}
          variant="contained"
          disabled={SaveButton.disabled}
        >
          {SaveButton.text}
        </Button>
      </div>
    </Card>
  )
}

export default CardHome
