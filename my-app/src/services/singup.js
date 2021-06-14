const url = 'http://localhost:3001/api/user'

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

export default SingUp
