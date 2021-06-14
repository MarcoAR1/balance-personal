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
import { category, addNewRecord } from '../services/balances'
import useStyles from '../styles/FormBalanceStyle'

const FormBalance = ({
  type,
  setAddBalance,
  animation,
  setBalanceTotal,
  getAllBalance,
  setdeleteConfirmation,
}) => {
  const classes = useStyles()
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const amount = e.target[0].value ? e.target[0].value : 0
    const categoryOrDescription = e.target[1].value
    const data = {
      amount,
      type,
      description:
        type === 'add'
          ? JSON.stringify({ description: categoryOrDescription })
          : JSON.stringify({ category: categoryOrDescription }),
    }
    const res = await addNewRecord(data)

    if (!res) {
      setAddBalance(false)
      return 'error'
    }
    if (JSON.parse(res)[0].affectedRows === 0) {
      setAddBalance(false)
      return 'error'
    }
    const id = JSON.parse(res)[0].insertId
    const date = new Date().toISOString()
    const newRecord = {
      ...data,
      balance_id: id,
      created_at: date,
    }
    setdeleteConfirmation((prev) => {
      const copy = [...prev]
      copy.splice(0, 0, true)
      return copy
    })
    getAllBalance((prev) => {
      const copy = [...prev]
      copy.splice(0, 0, newRecord)
      return copy
    })
    setBalanceTotal((prev) => {
      return newRecord.type === 'add'
        ? parseInt(prev) + parseInt(newRecord.amount)
        : parseInt(prev) - parseInt(newRecord.amount)
    })
    setAddBalance(false)
  }

  return (
    <Card className={`${classes.container} ${animation && 'flip-left'}`}>
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
        {type === 'sub' ? (
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
          <TextField
            type="textArea"
            id="description"
            label="Description"
            onChange={() => {}}
          />
        )}
      </form>
      <div className={classes.containerButtons}>
        <div className={classes.containerButtonCancel}>
          <Button
            onClick={() => setAddBalance(false)}
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
