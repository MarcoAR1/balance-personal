import {
  Button,
  Card,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Typography,
} from '@material-ui/core'
import React from 'react'
import useBalance from '../hooks/useBalance'
import { useViewAndAnimation } from '../hooks/useViewAndAnimation'
import { category, addNewRecord } from '../services/balances'
import useStyles from '../styles/FormBalanceStyle'

const FormBalance = () => {
  const { view, animation, ChangeViewTypeHome } = useViewAndAnimation()
  const { addRecord } = useBalance()
  const classes = useStyles()

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const amount = e.target[0].value ? e.target[0].value : 0
    const categoryOrDescription = e.target[1].value
    const data = {
      amount,
      type: view,
      description:
        view === 'add'
          ? JSON.stringify({ description: categoryOrDescription })
          : JSON.stringify({ category: categoryOrDescription }),
    }
    const res = await addNewRecord(data)

    if (!res) {
      ChangeViewTypeHome()
      return 'error'
    }
    if (JSON.parse(res)[0].affectedRows === 0) {
      ChangeViewTypeHome()
      return 'error'
    }
    const id = JSON.parse(res)[0].insertId
    const date = new Date().toISOString()
    const newRecord = {
      ...data,
      balance_id: id,
      created_at: date,
    }
    addRecord(newRecord)
    ChangeViewTypeHome()
  }

  return (
    <Card
      className={`${classes.container} ${animation.rightTwo && 'flip-right2'} ${
        animation.leftOne && 'flip-left'
      }`}
    >
      <div className={classes.containerTitle}>
        <Typography align="center" variant="h5" color="initial">
          New Record
        </Typography>
      </div>
      <form
        id="newRecord"
        onSubmit={handleFormSubmit}
        className={classes.containerFrom}
      >
        <TextField
          className={classes.input}
          type="number"
          id="number"
          label="Amount"
          onChange={() => {}}
        />
        {view === 'sub' ? (
          <FormControl className={classes.formControl}>
            <InputLabel>Category</InputLabel>
            <Select native defaultValue="">
              <option aria-label="None" value="" />
              <optgroup label="Category">
                {category.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </optgroup>
            </Select>
          </FormControl>
        ) : (
          <TextField type="textArea" id="description" label="Description" />
        )}
      </form>
      <div className={classes.containerButtons}>
        <div className={classes.containerButtonCancel}>
          <Button
            onClick={ChangeViewTypeHome}
            className={classes.buttonCancel}
            variant="contained"
          >
            cancel
          </Button>
        </div>
        <Button
          type="submit"
          form="newRecord"
          className={classes.buttonSave}
          variant="contained"
        >
          save
        </Button>
      </div>
    </Card>
  )
}

export default FormBalance
