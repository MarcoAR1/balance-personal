const url = '/api/login/'

const Login = async (data) => {
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

  if (res.status === 202) {
    return JSON.parse(res.responseText)
  }
  if (res.status === 401) {
    return JSON.parse(res.responseText)
  }
  return { message: 'Something went wrong' }
}

export default Login
