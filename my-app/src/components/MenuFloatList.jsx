import React, { useState } from 'react'
import { MenuItem, Menu, IconButton } from '@material-ui/core/'
import MenuIcon from '@material-ui/icons/Menu'

const MenuFloatList = ({ setUserInfo }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogOut = () => {
    handleClose()
    window.localStorage.removeItem('infoUser')
    setUserInfo(null)
  }

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
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleLogOut}>Logout</MenuItem>
      </Menu>
    </div>
  )
}

export default MenuFloatList
