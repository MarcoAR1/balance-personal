const sql = require('../dbmysql')

class User {
  constructor({ username, password, email, name }) {
    this.username = username
    this.password = password
    this.email = email
    this.name = name
  }

  async Create() {
    if (!this.validate()) {
      return 'no me cuelas cracken'
    }

    const result = await sql.promise().query(`INSERT INTO User SET ?`, [this])
    return result
  }
  async getUser() {
    const result = await sql
      .promise()
      .query(`SELECT * FROM User WHERE username = ?`, [this.username])
    return result[0]
  }

  validate() {
    if (this.username < 3) {
      return false
    }
    if (this.password < 3) {
      return false
    }
    if (this.email < 3) {
      return false
    }
    return true
  }
}

module.exports = User
