const mysql = require('mysql2')
const { HOST, USER, PASSWORD, DATABASE } = require('./utils/config.js')

const connections = mysql.createConnection({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE,
})

connections.connect((err)=>{
    if(err) throw err;
    console.log('database it okey')
})

module.exports = connections;
