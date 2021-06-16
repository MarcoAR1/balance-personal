import React, { useState } from 'react'
import { MenuItem, Menu, IconButton } from '@material-ui/core/'
import MenuIcon from '@material-ui/icons/Menu'
import useUser from '../hooks/useUser'

const MenuFloatList = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const { handleStateLogOut } = useUser()
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('infoUser')
    handleStateLogOut()
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