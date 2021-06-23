import { IconButton, TextField } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from '../styles/UserProfileStyle'
import CardHome from './CardHome'
import { useState } from 'react'
import { useViewAndAnimation } from '../hooks/useViewAndAnimation'
import EditIcon from '@material-ui/icons/Edit'
import CloseIcon from '@material-ui/icons/Close'
import '../styles/App.css'
import { UpdateUser } from '../services/singup'
import { UpdateUserState, UserLogOut } from '../reducers/userReducer'

const styleDivForm = {
  display: 'flex',
  width: '80%',
  justifyContent: 'space-around',
}

const UserProfile = () => {
  const userInfo = useSelector(({ user }) => user)
  const dispatch = useDispatch()
  const [editUserInfo, setEditUserInfo] = useState({
    name: { value: userInfo.name },
    email: { value: userInfo.email },
    username: { value: userInfo.username },
  })
  const { ChangeViewTypeHome } = useViewAndAnimation()
  const classes = useStyles()

  const handleEditUserInfo = (data, boolean) => {
    setEditUserInfo((prev) => {
      const copy = { ...prev }
      copy[data] = { ...copy[data], disabled: boolean }
      return copy
    })
  }

  const handleInput = ({ target }) => {
    setEditUserInfo((prev) => {
      const copy = { ...prev }
      copy[target.id] = { ...copy[target.id], value: target.value }
      return copy
    })
  }

  const handleSubmitSaveEditUserInfo = async (e) => {
    e.preventDefault()
    let data = {}
    for (let x in editUserInfo) {
      if (editUserInfo[x] && editUserInfo[x].value) {
        const currentValue = editUserInfo[x].value
        if (currentValue === userInfo[x]) {
          continue
        }
        data[x] = currentValue
      }
    }
    const res = await UpdateUser(data)

    if (res === 'User updated successfully') {
      if (data.username) {
        window.localStorage.clear()
        dispatch(UserLogOut())
        return
      }
      dispatch(UpdateUserState(data))
    }
    ChangeViewTypeHome()
  }

  return (
    <CardHome
      CancelButton={{
        function: ChangeViewTypeHome,
        text: 'Cancel',
      }}
      SaveButton={{ form: 'form-edit-userinfo', type: 'submit', text: 'Save' }}
      title="Datos de usuario"
      to="Home"
    >
      <form
        onSubmit={handleSubmitSaveEditUserInfo}
        id="form-edit-userinfo"
        className={classes.container}
      >
        <div style={styleDivForm}>
          <TextField
            className={classes.input}
            disabled={!(editUserInfo.name && editUserInfo.name.disabled)}
            label="Name"
            id="name"
            value={editUserInfo.name.value}
            onChange={handleInput}
          />
          {editUserInfo.name && editUserInfo.name.disabled ? (
            <IconButton
              onClick={() => {
                handleEditUserInfo('name', false)
              }}
            >
              <CloseIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => {
                handleEditUserInfo('name', true)
              }}
            >
              <EditIcon />
            </IconButton>
          )}
        </div>
        <div style={styleDivForm}>
          <TextField
            className={classes.input}
            disabled={
              !(editUserInfo.username && editUserInfo.username.disabled)
            }
            label="Username"
            id="username"
            value={editUserInfo.username.value}
            onChange={handleInput}
          />
          {editUserInfo.username && editUserInfo.username.disabled ? (
            <IconButton
              onClick={() => {
                handleEditUserInfo('username', false)
              }}
            >
              <CloseIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => {
                handleEditUserInfo('username', true)
              }}
            >
              <EditIcon />
            </IconButton>
          )}
        </div>
        <div style={styleDivForm}>
          <TextField
            className={classes.input}
            disabled={!(editUserInfo.email && editUserInfo.email.disabled)}
            label="Email"
            id="email"
            value={editUserInfo.email.value}
            onChange={handleInput}
          />
          {editUserInfo.email && editUserInfo.email.disabled ? (
            <IconButton
              onClick={() => {
                handleEditUserInfo('email', false)
              }}
            >
              <CloseIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => {
                handleEditUserInfo('email', true)
              }}
            >
              <EditIcon />
            </IconButton>
          )}
        </div>
        <div style={styleDivForm}>
          <TextField
            className={classes.input}
            disabled={
              !(editUserInfo.password && editUserInfo.password.disabled)
            }
            label="Password"
            type="password"
            id="password"
            value={
              editUserInfo.password && editUserInfo.password.value
                ? editUserInfo.password.value
                : ''
            }
            onChange={handleInput}
          />

          {editUserInfo.password && editUserInfo.password.disabled ? (
            <IconButton
              onClick={() => {
                handleEditUserInfo('password', false)
              }}
            >
              <CloseIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => {
                handleEditUserInfo('password', true)
              }}
            >
              <EditIcon />
            </IconButton>
          )}
        </div>
      </form>
    </CardHome>
  )
}

export default UserProfile
