const balanceRouter = require('express').Router()
const Balance = require('../models/Balances.js')
const User = require('../models/User.js')
const verifyToken = require('../utils/middleware/verifyToken.js')

balanceRouter.post('/', verifyToken, async (req, res) => {
  const { description, type, amount } = req.body
  const username = req.username
  const newBalance = await new Balance({
    username,
    description,
    type,
    amount,
  }).Create()
  res.status(201).json(JSON.stringify(newBalance))
})
balanceRouter.get('/', verifyToken, async (req, res) => {
  const username = req.username
  const verifyUser = await new User({ username }).getUser()
  if (!verifyUser[0]) {
    return res.status(401).json({ message: 'error login' })
  }
  const newBalance = await new Balance({
    username,
  }).getAllBalancetoaUser()
  res.status(202).json(JSON.stringify(newBalance))
})
balanceRouter.get('/record', verifyToken, async (req, res) => {
  const {
    limit = 10,
    order = 'desc',
    startDate = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-0`,
    endDate = `${new Date().getFullYear()}-${new Date().getMonth() + 2}-0`,
  } = req.body
  const username = req.username
  const verifyUser = await new User({ username }).getUser()
  if (!verifyUser[0]) {
    return res.status(401).json({ message: 'error login' })
  }
  const RecordBalance = await new Balance({
    username,
  }).getAllRecordsBalancetoaUser(limit, order, startDate, endDate)
  res.status(202).json(JSON.stringify(RecordBalance))
})

balanceRouter.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params
  const username = req.username
  const verifyUser = await new User({ username }).getUser()
  if (!verifyUser[0]) {
    return res.status(401).json({ message: 'error login' })
  }
  if (verifyUser[0].username !== username) {
    return res.status(401).json({ message: 'not authenticated' })
  }
  const deleteBalance = await new Balance().deleteaBalance(id, username)
  res.status(404).json(deleteBalance)
})

module.exports = balanceRouter
