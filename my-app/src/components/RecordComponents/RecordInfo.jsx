import {
  FormControl,
  IconButton,
  InputLabel,
  Select,
  TextField,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useViewAndAnimation } from '../../hooks/useViewAndAnimation'
import useStyles from '../../styles/RecordInfoStyle'
import CardHome from '../CardHome'
import EditIcon from '@material-ui/icons/Edit'
import CloseIcon from '@material-ui/icons/Close'
import { category, updateRecord } from '../../services/balances'
import { updateBalance } from '../../reducers/balanceReducer'

const styleDivForm = {
  display: 'flex',
  width: '80%',
  justifyContent: 'space-around',
}
const RecordInfo = () => {
  const record = useSelector(
    ({ balance }) =>
      balance.Record.filter(
        ({ balance_id }) => balance_id === balance.currentTarget
      )[0]
  )
  const animation = useSelector(({ animation }) => animation.Graphic)
  const [editRecordInfo, setEditRecordInfo] = useState({})
  const { ChangeViewTypeWithGraphic } = useViewAndAnimation()
  const dispatch = useDispatch()
  const classes = useStyles()

  const handleEditRecordInfo = (data, boolean) => {
    setEditRecordInfo((prev) => {
      const object = {}
      object[data] = boolean
      const copy = { ...prev }
      copy.disabled = Object.assign(copy.disabled, object)
      return copy
    })
  }

  const handleInput = ({ target }) => {
    setEditRecordInfo((prev) => {
      const copy = { ...prev }
      if (target.id === 'amount') {
        const number = target.value ? Math.abs(target.value) : ''
        copy[target.id] = number
        return copy
      }
      copy[target.id] = target.value
      return copy
    })
  }

  const handleSubmitSaveEditRecordInfo = async (e) => {
    e.preventDefault()
    let data = {}

    for (let x in editRecordInfo) {
      if (x === 'Date' || x === 'disabled') {
        continue
      }
      const currentValue = editRecordInfo[x]
      if (x === 'description') {
        if (record.type === 'add') {
          if (JSON.parse(record.description).description === currentValue) {
            continue
          }
          data[x] = JSON.stringify({ description: currentValue })
          continue
        }
        if (JSON.parse(record.description).category === currentValue) {
          continue
        }
        data[x] = JSON.stringify({ category: currentValue })
        continue
      }
      if (currentValue === record[x]) {
        continue
      }
      if (x === 'amount') {
        data[x] = currentValue ? currentValue : 0
        continue
      }
      data[x] = currentValue
    }

    if (!Object.keys(data).length) {
      ChangeViewTypeWithGraphic()
      return
    }

    const res = await updateRecord(data, record.balance_id)
    if (res === 'balance update successful') {
      dispatch(updateBalance(data, record.balance_id))
    }
    ChangeViewTypeWithGraphic()
  }

  useEffect(() => {
    setEditRecordInfo({
      Date: record.created_at,
      description:
        record.type === 'add'
          ? JSON.parse(record.description).description
          : JSON.parse(record.description).category,
      amount: record.amount,
      disabled: {},
    })
  }, [record])

  return (
    <CardHome
      title="Record Info"
      CancelButton={{
        text: 'volver',
        function: ChangeViewTypeWithGraphic,
        style: {
          background: 'white',
        },
      }}
      style={
        record.type === 'add'
          ? { background: '#BEFBC1', marginTop: '20px' }
          : { background: '#FB9F9F', marginTop: '20px' }
      }
      SaveButton={{
        form: 'edit-record-form',
        type: 'submit',
        text: 'Save',
        style: { background: 'white' },
      }}
      ClassInsert={`${!animation.entrance && 'entrance'} ${
        animation.exit && 'exit'
      }`}
    >
      <form
        id="edit-record-form"
        onSubmit={handleSubmitSaveEditRecordInfo}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div style={styleDivForm}>
          <TextField
            className={classes.input}
            disabled={
              !(editRecordInfo.disabled && editRecordInfo.disabled.amount)
            }
            label="Amount"
            type="number"
            id="amount"
            onChange={handleInput}
            value={editRecordInfo.amount}
          />
          {editRecordInfo.disabled && editRecordInfo.disabled.amount ? (
            <IconButton
              onClick={() => {
                handleEditRecordInfo('amount', false)
              }}
            >
              <CloseIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => {
                handleEditRecordInfo('amount', true)
              }}
            >
              <EditIcon />
            </IconButton>
          )}
        </div>
        <div style={styleDivForm}>
          {record.type === 'add' ? (
            <TextField
              className={classes.input}
              disabled={
                !(
                  editRecordInfo.disabled && editRecordInfo.disabled.description
                )
              }
              label="Description"
              type="text"
              id="description"
              onChange={handleInput}
              value={editRecordInfo.description}
            />
          ) : (
            <FormControl>
              <InputLabel>Category</InputLabel>
              <Select
                id="description"
                onChange={handleInput}
                disabled={
                  !(
                    editRecordInfo.disabled &&
                    editRecordInfo.disabled.description
                  )
                }
                value={editRecordInfo.description}
                native
              >
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
          )}
          {editRecordInfo.disabled && editRecordInfo.disabled.description ? (
            <IconButton
              onClick={() => {
                handleEditRecordInfo('description', false)
              }}
            >
              <CloseIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => {
                handleEditRecordInfo('description', true)
              }}
            >
              <EditIcon />
            </IconButton>
          )}
        </div>
        <div style={styleDivForm}>
          <TextField
            className={classes.input}
            disabled
            label="Date to created"
            type="text"
            id="date"
            value={editRecordInfo.Date && editRecordInfo.Date.slice(0, 10)}
          />
          <TextField
            className={classes.input}
            disabled
            label="Time to created"
            type="text"
            id="time"
            value={editRecordInfo.Date && editRecordInfo.Date.slice(11, 19)}
          />
        </div>
      </form>
    </CardHome>
  )
}

export default RecordInfo
