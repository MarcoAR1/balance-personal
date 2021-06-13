const url = 'http://localhost:3001/api/user'

const SingUp = async (data) => {
  const req = new XMLHttpRequest()
  await new Promise((resolve, reject) => {
    req.open('POST', url, true)
    req.setRequestHeader('Content-Type', 'application/json')
    req.send(JSON.stringify(data))
    req.addEventListener('load', function Abort() {
      resolve(req)
      reject(req)
      req.abort()
      req.removeEventListener('load', Abort)
    })
  })
  if (req.status === 201) {
    return { message: 'Usuario Created' }
  }
  return { message: 'Usuario or email already exists.' }
}

export default SingUp
