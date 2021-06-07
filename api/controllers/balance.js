const balanceRouter = require('express').Router()
const Balance = require('../models/Balances.js')
const verifyToken = require('../utils/middleware/verifyToken.js')

balanceRouter.post('/', verifyToken, async (req, res) => {
  const { username, description, type, amount } = req.body
  const newBalance = await new Balance({
    username,
    description,
    type,
    amount,
  }).Create()
  res.json(newBalance)
})
balanceRouter.get('/', verifyToken, async (req, res) => {
  const { username } = req.body
  const newBalance = await new Balance({
    username,
  }).getAllBalancetoaUser()
  console.log(newBalance)
  res.json(newBalance)
})
balanceRouter.get('/history', verifyToken, async (req, res) => {
  const {
    username,
    limit = 10,
    order = 'desc',
    startDate = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-0`,
    endDate = `${new Date().getFullYear()}-${new Date().getMonth() + 2}-0`,
  } = req.body
  const newHistoryBalance = await new Balance({
    username,
  }).getAllHistoryBalancetoaUser(limit, order, startDate, endDate)
  console.log(newHistoryBalance)
  res.json(newHistoryBalance)
})

balanceRouter.delete('/', verifyToken, async (req, res) => {
  const { balance_id } = req.body
  const username = req.username
  console.log(username, balance_id)
  const deleteBalance = await new Balance().deleteaBalance(balance_id, username)
  res.json(deleteBalance)
})

module.exports = balanceRouter
