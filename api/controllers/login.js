const loginRouter = require('express').Router()
const User = require('../models/User.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { SING } = require('../utils/config')

loginRouter.post('/', async (req, res) => {
  const { username = '', password = '' } = req.body
  const getUser = await new User({ username }).getUserLogin()
  const CurrentUser = getUser.filter((user) => user.username === username)

  if (!CurrentUser[0])
    return res.status(401).json({ message: 'Pasword or username incorrect.' })
  if (!(username === CurrentUser[0].username))
    return res.status(401).json({ message: 'Pasword or username incorrect.' })
  if (!(await bcrypt.compare(password, CurrentUser[0].password)))
    return res.status(401).json({ message: 'Pasword or username incorrect.' })
  const tokenUser = {
    username: CurrentUser[0].username,
    name: CurrentUser[0].name,
    email: CurrentUser[0].email,
    user_id: CurrentUser[0].user_id,
  }
  const token = jwt.sign(tokenUser, SING, { expiresIn: 60 * 60 * 24 * 15 })

  return res.status(202).send({
    username: CurrentUser[0].username,
    name: CurrentUser[0].name,
    email: CurrentUser[0].email,
    token,
  })
})

module.exports = loginRouter
