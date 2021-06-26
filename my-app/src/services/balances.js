import { UserLogOut } from '../reducers/userReducer'
import store from '../store'

const url = '/api/balance/'

let userToken = ''
const setTokens = (string) => {
  userToken = 'Bearer ' + string
}
store.subscribe(() => {
  let { user } = store.getState()
  setTokens(user.token)
})

const status401LogOut = () => {
  window.localStorage.clear()
  store.dispatch(UserLogOut())
}

const getTotalBalance = async () => {
  const res = await new Promise((resolve, reject) => {
    const load = (e) => {
      if (e.currentTarget.status === 401) {
        status401LogOut()
      }
      resolve(JSON.parse(e.currentTarget.responseText))
    }
    const req = new XMLHttpRequest()
    req.open('GET', url, true)
    req.setRequestHeader('Authorization', userToken)
    req.onloadend = load
    req.onerror = reject
    req.send()
  })

  return JSON.parse(res)
}

const deleteRecordId = async (id) => {
  const res = await new Promise((resolve, reject) => {
    const load = (e) => {
      if (e.currentTarget.status === 401) {
        status401LogOut()
      }
      resolve(e.currentTarget)
    }
    const req = new XMLHttpRequest()
    req.open('DELETE', `${url}/${id}`, true)
    req.setRequestHeader('Authorization', userToken)
    req.onloadend = load
    req.onerror = reject
    req.send()
  })

  return res
}

const getBalanceRecord = async () => {
  const urlRecord = url + 'record'
  const res = await new Promise((resolve, reject) => {
    const load = (e) => {
      if (e.currentTarget.status === 401) {
        status401LogOut()
      }
      resolve(JSON.parse(e.currentTarget.responseText))
    }
    let req = new XMLHttpRequest()
    req.open('GET', urlRecord, true)
    req.onloadend = load
    req.onerror = reject
    req.setRequestHeader('Authorization', userToken)
    req.send()
  })

  return JSON.parse(res)
}

const addNewRecord = async (items) => {
  const { description, type, amount } = items
  const data = { description, amount, type }
  const res = await new Promise((resolve, reject) => {
    const load = (e) => {
      if (e.currentTarget.status === 401) {
        status401LogOut()
      }
      resolve(JSON.parse(e.currentTarget.responseText))
    }
    const req = new XMLHttpRequest()
    req.open('POST', url, true)
    req.setRequestHeader('Content-Type', 'application/json')
    req.setRequestHeader('Authorization', userToken)
    req.onloadend = load
    req.onerror = reject
    req.send(JSON.stringify(data))
  })
  return res
}

const updateRecord = async (data, id) => {
  const res = await new Promise((resolve, reject) => {
    const load = (e) => {
      if (e.currentTarget.status === 401) {
        status401LogOut()
      }
      if (e.currentTarget.status === 200) {
        resolve(JSON.parse(e.currentTarget.responseText).message)
      }
      resolve('Record not possible to update')
    }
    const req = new XMLHttpRequest()
    req.open('PUT', url + id, true)
    req.setRequestHeader('Content-Type', 'application/json')
    req.setRequestHeader('Authorization', userToken)
    req.onloadend = load
    req.onerror = reject
    req.send(JSON.stringify(data))
  })
  return res
}

const category = [
  'Travel',
  'Transport',
  'Food',
  'Services',
  'Restaurants',
  'Health and self-care',
  'Wardrobe',
  'Education',
  'Entertainment and fun',
  'Other',
]
export {
  updateRecord,
  getTotalBalance,
  getBalanceRecord,
  deleteRecordId,
  addNewRecord,
  category,
}
