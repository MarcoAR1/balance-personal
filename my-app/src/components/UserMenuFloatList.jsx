import { MenuItem } from '@material-ui/core/'
import useUser from '../hooks/useUser'
import { useViewAndAnimation } from '../hooks/useViewAndAnimation'
import MenuComponent from './MenuComponent'

const UserMenuFloatList = () => {
  const { handleStateLogOut } = useUser()
  const { ChangeViewTypeProfile } = useViewAndAnimation()

  const handleLogOut = () => {
    window.localStorage.removeItem('infoUser')
    handleStateLogOut()
  }

  return (
    <MenuComponent>
      <MenuItem onClick={ChangeViewTypeProfile}>Profile</MenuItem>
      <MenuItem onClick={handleLogOut}>Logout</MenuItem>
    </MenuComponent>
  )
}

export default UserMenuFloatList
