const url = 'http://localhost:3001/api/balance'

let userToken = 'Bearer '
const setTokens = (string) => {
  userToken += string
}

const getTotalBalance = async () => {
  const load = (resolve, req) => {
    resolve(req)
    req.removeEventListener('load', load)
  }
  const req = await new Promise((resolve, reject) => {
    const req = new XMLHttpRequest()
    req.open('GET', url, true)
    req.setRequestHeader('Authorization', userToken)
    req.addEventListener('load', load(resolve, req, reject))
    req.send()
  })
  return req.response
}

const getBalanceRecord = async () => {
  const urlRecord = url + '/record'
  const load = (resolve, req) => {
    resolve(req)
    req.removeEventListener('load', load)
  }
  const req = await new Promise((resolve, reject) => {
    const req = new XMLHttpRequest()
    req.open('GET', urlRecord, true)
    req.setRequestHeader('Authorization', userToken)
    req.addEventListener('load', load(resolve, req, reject))
    req.send()
  })
  return req.response
}

export { setTokens, getTotalBalance, getBalanceRecord }
