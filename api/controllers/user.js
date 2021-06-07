const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User.js')

userRouter.post('/', async (req, res) => {
  let { username = '', password = '', name = '', email = '' } = req.body
  if (!password.length > 3 || !username.length > 3) {
    return res.status(400).json({
      message:
        username.length < 3 ? 'username it too short' : 'password it too short',
    })
  }
  password = await bcrypt.hash(password, 10)
  const newUser = await new User({ username, password, name, email }).Create()
  res.status(201).json(newUser)
})

userRouter.get('/', async (_, res) => {
  const findUser = await new User({ username})
})

module.exports = userRouter
