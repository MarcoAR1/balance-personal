import { Button, Card, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import useStyles from '../styles/CardHomeStyle'

const CardHome = ({
  children,
  SaveButton = {},
  CancelButton = {},
  title = '',
  style,
  to = '',
  ClassInsert = '',
  ContainerButtons = {},
}) => {
  const animation = useSelector(({ animation }) => animation)
  const classes = useStyles()

  return (
    <Card
      className={`${classes.container} ${
        animation[to] && animation[to].rightTwo && 'flip-right2'
      } ${
        animation[to] && animation[to].leftOne && 'flip-left'
      } ${ClassInsert}`}
      style={style}
    >
      <div className={classes.containerTitle}>
        <Typography align="center" variant="h5" color="initial">
          {title}
        </Typography>
      </div>
      {children}
      <div className={classes.containerButtons} style={ContainerButtons.style}>
        <div className={classes.containerButtonCancel}>
          <Button
            onClick={CancelButton.function}
            style={CancelButton.style}
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
          style={SaveButton.style}
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
