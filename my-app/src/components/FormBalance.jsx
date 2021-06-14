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

const FormBalance = ({ type, setAddBalance, animation }) => {
  const classes = useStyles()
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const amount = e.target[0].value
    const categoryOrDescription = e.target[1].value
    const data = {
      amount,
      type,
      description:
        type === 'add'
          ? { description: categoryOrDescription }
          : { category: categoryOrDescription },
    }
    await addNewRecord(data)
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
