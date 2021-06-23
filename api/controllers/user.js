const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User.js')
const verifyToken = require('../utils/middleware/verifyToken.js')

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

userRouter.put('/', verifyToken, async (req, res) => {
  const data = {}
  const username = req.username
  for (let x in req.body) {
    if (x === 'password') {
      data[x] = await bcrypt.hash(req.body[x], 10)
      continue
    }
    data[x] = req.body[x]
  }
  const updateUser = await new User({ username }).updateUser(data)
  if (updateUser.affectedRows) {
    return res.status(200).json({ message: 'User updated successfully' })
  }
  res.status(400).json({ message: 'User dont possible to update' })
})

userRouter.get('/', async (req, res) => {
  const { limit = 0 } = req.body
  const getAllUser = await new User().getAllUser(limit)
  res.status(200).json(getAllUser)
})

userRouter.delete('/', verifyToken, async (req, res) => {
  const { username, email } = req.body
  if (username !== req.username) {
    return res.status(401).json({ error: 'No authorization' })
  }
  const deleteUser = await new User().deleteUser(username, email)
  res.status(200).json(deleteUser)
})

module.exports = userRouter
