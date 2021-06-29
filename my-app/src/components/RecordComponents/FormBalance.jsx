import { FormControl, InputLabel, Select, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import useBalance from '../../hooks/useBalance'
import { useViewAndAnimation } from '../../hooks/useViewAndAnimation'
import { category, addNewRecord } from '../../services/balances'
import useStyles from '../../styles/FormBalanceStyle'
import CardHome from '../CardHome'

const FormBalance = () => {
  const { view, ChangeViewTypeHome } = useViewAndAnimation()
  const [disabledButton, setDisabledButton] = useState(false)
  const { addRecord } = useBalance()
  const classes = useStyles()

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setDisabledButton(true)
    const amount = e.target[0].value ? e.target[0].value : 0
    const categoryOrDescription = e.target[1].value
    const data = {
      amount: Math.abs(amount),
      type: view,
      description:
        view === 'add'
          ? JSON.stringify({ description: categoryOrDescription })
          : JSON.stringify({
              category: categoryOrDescription ? categoryOrDescription : 'Other',
            }),
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
    <CardHome
      CancelButton={{ function: ChangeViewTypeHome, text: 'Cancel' }}
      SaveButton={{
        text: 'Save',
        form: 'newRecord',
        type: 'submit',
        disabled: disabledButton,
      }}
      title="New Record"
      to="Home"
    >
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
        />
        {view === 'sub' ? (
          <FormControl className={classes.formControl}>
            <InputLabel>Category</InputLabel>
            <Select native defaultValue="">
              <option aria-label="None" value="" disabled />
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
          <TextField id="description" label="Description" />
        )}
      </form>
    </CardHome>
  )
}

export default FormBalance
