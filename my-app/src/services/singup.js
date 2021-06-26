import { UserLogOut } from '../reducers/userReducer'
import store from '../store'
const url = '/api/user/'
let userToken = ''
const setTokens = (string) => {
  userToken = 'Bearer ' + string
}
store.subscribe(() => {
  let { user } = store.getState()
  window.localStorage.setItem('infoUser', JSON.stringify(user))
  setTokens(user.token)
})
const status401LogOut = () => {
  window.localStorage.clear()
  store.dispatch(UserLogOut())
}
const SingUp = async (data) => {
  const res = await new Promise((resolve, reject) => {
    const load = (e) => {
      resolve(e.currentTarget)
    }
    const req = new XMLHttpRequest()
    req.open('POST', url, true)
    req.setRequestHeader('Content-Type', 'application/json')
    req.onloadend = load
    req.onerror = reject
    req.send(JSON.stringify(data))
  })
  if (res.status === 201) {
    return { message: 'Usuario Created' }
  }
  return { message: 'Usuario or email already exists.' }
}
const UpdateUser = async (data) => {
  const res = await new Promise((resolve, reject) => {
    const load = (e) => {
      if (e.currentTarget.status === 401) {
        status401LogOut()
      }
      if (e.currentTarget.status === 200) {
        resolve(JSON.parse(e.currentTarget.responseText).message)
      }
      resolve('User not updated')
    }
    const req = new XMLHttpRequest()
    req.open('PUT', url, true)
    req.setRequestHeader('Content-Type', 'application/json')
    req.setRequestHeader('Authorization', userToken)
    req.onloadend = load
    req.onerror = reject
    req.send(JSON.stringify(data))
  })
  return res
}

export { SingUp, UpdateUser }
