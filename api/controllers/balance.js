const balanceRouter = require('express').Router()
const Balance = require('../models/Balances.js')
const User = require('../models/User.js')
const verifyToken = require('../utils/middleware/verifyToken.js')

balanceRouter.post('/', verifyToken, async (req, res) => {
  const { description, type, amount } = req.body
  const user_id = req.user_id
  const newBalance = await new Balance({
    description,
    type,
    amount,
    user_id,
  }).Create()
  res.status(201).json(JSON.stringify(newBalance))
})

balanceRouter.get('/', verifyToken, async (req, res) => {
  const user_id = req.user_id
  const verifyUser = await new User().getUser(user_id)
  if (!verifyUser[0]) {
    return res.status(401).json({ message: 'error login' })
  }
  const newBalance = await new Balance({
    user_id,
  }).getAllBalancetoaUser()
  res.status(202).json(JSON.stringify(newBalance))
})

balanceRouter.get('/record', verifyToken, async (req, res) => {
  let { limit = 2000, order, startDate, endDate } = req.body
  const user_id = req.user_id
  const verifyUser = await new User().getUser(user_id)
  if (!verifyUser[0]) {
    return res.status(401).json({ message: 'error login' })
  }

  if (order === 'asc') {
    order = 'asc'
  }
  if (order !== 'asc') {
    order = 'desc'
  }

  if (startDate || endDate) {
    const RecordBalance = await new Balance({
      user_id,
    }).getAllRecordsBalancetoaUserSortForDate(limit, order, startDate, endDate)
    return res.status(202).json(JSON.stringify(RecordBalance))
  }

  const RecordBalance = await new Balance({
    user_id,
  }).getAllRecordsBalancetoaUser(limit, order)
  res.status(202).json(JSON.stringify(RecordBalance))
})

balanceRouter.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params
  const user_id = req.user_id
  const verifyUser = await new User().getUser(user_id)
  if (!verifyUser[0]) {
    return res.status(401).json({ message: 'error login' })
  }
  if (verifyUser[0].user_id !== user_id) {
    return res.status(401).json({ message: 'not authenticated' })
  }
  const deleteBalance = await new Balance().deleteaBalance(id, user_id)
  res.status(404).json(deleteBalance)
})

balanceRouter.put('/:id', verifyToken, async (req, res) => {
  const { id } = req.params
  const user_id = req.user_id
  const data = {}
  for (let x in req.body) {
    if (x === 'username') {
      continue
    }
    data[x] = req.body[x]
  }
  const updateBalance = await new Balance({ user_id }).updateBalance(data, id)

  if (updateBalance.affectedRows) {
    return res.status(200).json({ message: 'balance update successful' })
  }
  res.status(400).json({ message: 'it not possible to update' })
})

module.exports = balanceRouter
