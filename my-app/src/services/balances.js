const url = 'http://localhost:3001/api/balance'

let userToken = 'Bearer '
const setTokens = (string) => {
  userToken += string
}

const getTotalBalance = async () => {
  const res = await new Promise((resolve, reject) => {
    const load = (e) => {
      if (e.currentTarget.status === 401) {
        window.localStorage.clear()
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
        window.localStorage.clear()
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
  const urlRecord = url + '/record'
  const res = await new Promise((resolve, reject) => {
    const load = (e) => {
      if (e.currentTarget.status === 401) {
        window.localStorage.clear()
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
        window.localStorage.clear()
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
  setTokens,
  getTotalBalance,
  getBalanceRecord,
  deleteRecordId,
  addNewRecord,
  category,
}
