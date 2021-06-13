const url = 'http://localhost:3001/api/login/'

const Login = async (data) => {
  const req = new XMLHttpRequest()
  await new Promise((resolve) => {
    req.open('POST', url, true)
    req.setRequestHeader('Content-Type', 'application/json')
    req.send(JSON.stringify(data))
    req.addEventListener('load', () => {
      resolve(req)
    })
  })

  if (req.status === 202) {
    return JSON.parse(req.responseText)
  }
  if (req.status === 401) {
    return JSON.parse(req.responseText)
  }
  return { message: 'something went wrong' }
}

export default Login
