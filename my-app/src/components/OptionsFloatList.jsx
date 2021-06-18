import React from 'react'
import { MenuItem } from '@material-ui/core/'
import MenuComponent from './MenuComponent'

const OptionsFloatList = () => {
  return (
    <MenuComponent>
      <MenuItem>Date</MenuItem>
      <MenuItem>Category</MenuItem>
      <MenuItem>Type</MenuItem>
    </MenuComponent>
  )
}

export default OptionsFloatList
