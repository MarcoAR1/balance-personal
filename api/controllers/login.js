const loginRouter = require('express').Router()
const User = require('../models/User.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { SING } = require('../utils/config')

loginRouter.post('/', async (req, res) => {
  const { username = '', password = '' } = req.body
  const getUser = await new User({ username, password }).getUser()
  if (!getUser[0])
    return res.status(401).json({ message: 'pasword or username incorrect.' })

  if (!(await bcrypt.compare(password, getUser[0].password)))
    return res.status(401).json({ message: 'pasword or username incorrect.' })
  const tokenUser = {
    username,
    name: getUser[0].name,
    email: getUser[0].email,
  }
  const token = jwt.sign(tokenUser, SING, { expiresIn: 60 * 60 * 24 * 15 })

  return res.status(202).send({
    username,
    name: getUser[0].name,
    email: getUser[0].email,
    token,
  })
})

module.exports = loginRouter
