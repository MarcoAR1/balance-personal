const jwt = require('jsonwebtoken')
const { SING } = require('../config')

const verifyToken = (req, res, next) => {
  const authorization = req.get('authorization')
  let token = ''
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.split(' ')[1]
  }

  const verify = jwt.verify(token, SING)
  
  if (!token || !verify.username) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  
  const { username } = verify
  req.username = username
  req.token = token

  next()
}

module.exports = verifyToken
