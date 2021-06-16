import React, { useState } from 'react'
import { MenuItem, Menu, IconButton } from '@material-ui/core/'
import MenuIcon from '@material-ui/icons/Menu'

const OptionsFloatList = () => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogOut = () => {}

  return (
    <div>
      <IconButton aria-label="Menu" aria-haspopup="true" onClick={handleClick}>
        <MenuIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Date</MenuItem>
        <MenuItem onClick={handleClose}>Category</MenuItem>
        <MenuItem onClick={handleLogOut}>Type</MenuItem>
      </Menu>
    </div>
  )
}

export default OptionsFloatList
