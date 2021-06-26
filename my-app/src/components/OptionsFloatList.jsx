import React from 'react'
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core/'
import MenuComponent from './MenuComponent'
import DateFnsUtils from '@date-io/date-fns'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { category } from '../services/balances'
import { useDispatch, useSelector } from 'react-redux'
import {
  onFilterCategoryChange,
  onFilterCategoryClean,
  onFilterClearAll,
  onFilterDateEndChange,
  onFilterDateStartChange,
  onFilterTypeChangeAdd,
  onFilterTypeChangeSub,
  onFilterTypeIsClean,
} from '../reducers/filterReducer'
const styleMenuItems = {
  display: 'flex',
  flexDirection: 'column',
}
const OptionsFloatList = () => {
  const filters = useSelector(({ filter }) => filter)
  const dispatch = useDispatch()

  return (
    <MenuComponent>
      <MenuItem style={styleMenuItems}>
        Filters
        <Button
          style={{ marginTop: '5px' }}
          variant="outlined"
          color="secondary"
          onClick={() => dispatch(onFilterClearAll())}
        >
          Clear All
        </Button>
      </MenuItem>
      <MenuItem style={styleMenuItems}>
        <FormControl>
          <InputLabel>Type</InputLabel>
          <Select
            native
            defaultValue={filters.Type ? filters.Type : ''}
            value={filters.Type ? filters.Type : ''}
            onChange={(e) => {
              if (e.currentTarget.value === 'add') {
                return dispatch(onFilterTypeChangeAdd())
              }
              dispatch(onFilterTypeChangeSub())
            }}
          >
            <option aria-label="None" value="" disabled />
            <optgroup label="Type">
              <option value={'add'}>{'add'}</option>
              <option value={'sub'}>{'sub'}</option>
            </optgroup>
          </Select>
        </FormControl>
        <Button
          style={{ marginTop: '5px' }}
          variant="outlined"
          color="secondary"
          onClick={() => {
            dispatch(onFilterTypeIsClean())
          }}
        >
          Clear Type
        </Button>
      </MenuItem>
      {filters.Type === 'sub' && (
        <MenuItem style={styleMenuItems}>
          <FormControl>
            <InputLabel>Category</InputLabel>
            <Select
              native
              defaultValue={filters.Category ? filters.Category : ''}
              value={filters.Category ? filters.Category : ''}
              onChange={(e) => {
                dispatch(onFilterCategoryChange(e.currentTarget.value))
              }}
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
          <Button
            style={{ marginTop: '5px' }}
            variant="outlined"
            color="secondary"
            onClick={() => {
              dispatch(onFilterCategoryClean())
            }}
          >
            Clear Category
          </Button>
        </MenuItem>
      )}
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <MenuItem style={styleMenuItems}>
          Date Start:
          <DatePicker
            style={{ width: '50%' }}
            value={filters.Date.Start ? filters.Date.Start : null}
            onChange={(date) => {
              const MaxDate = () => {
                const DateEnd = filters.Date.End
                if (DateEnd) {
                  if (date < DateEnd) {
                    DateEnd.setDate(date.getDate() - 1)
                  }
                }
                const currentMax = new Date()
                currentMax.setDate(currentMax.getDate() + 1)
                return date > MaxDate ? MaxDate : date
              }
              dispatch(onFilterDateStartChange(MaxDate()))
            }}
          />
          <Button
            style={{ marginTop: '5px' }}
            variant="outlined"
            color="secondary"
            onClick={() => {
              dispatch(onFilterDateStartChange(null))
            }}
          >
            Clear Date Start
          </Button>
        </MenuItem>
        <MenuItem style={styleMenuItems}>
          Date End:
          <DatePicker
            style={{ width: '50%' }}
            value={filters.Date.End ? filters.Date.End : null}
            onChange={(date) => {
              const MaxDate = () => {
                if (filters.Date.Start) {
                  let currentMax = new Date(filters.Date.Start)
                  currentMax.setDate(currentMax.getDate() - 1)
                  return date > currentMax ? currentMax : date
                }
                const MaxDate = new Date()
                MaxDate.setDate(MaxDate.getDate() - 1)
                return date > MaxDate ? MaxDate : date
              }

              dispatch(onFilterDateEndChange(MaxDate()))
            }}
          />
          <Button
            style={{ marginTop: '5px' }}
            variant="outlined"
            color="secondary"
            onClick={() => {
              dispatch(onFilterDateEndChange(null))
            }}
          >
            Clear Date End
          </Button>
        </MenuItem>
      </MuiPickersUtilsProvider>
    </MenuComponent>
  )
}

export default OptionsFloatList
