const express = require('express')
require('express-async-errors')
const cors = require('cors')
const morgan = require('morgan')
const { handleError } = require('./utils/middleware/handleError.js')
const userRouter = require('./controllers/user.js')
const loginRouter = require('./controllers/login.js')
const balanceRouter = require('./controllers/balance.js')

// Settings
const app = express()

//Middleware
app.use(cors())
app.use(express.json())
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :json')
)
morgan.token('json', (req) => {
  return JSON.stringify(req.body)
})

//Routes
app.use('/api/user', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/balance', balanceRouter)

//Middleware Error
app.use(handleError)

module.exports = app
