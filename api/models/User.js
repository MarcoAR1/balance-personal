const sql = require('../dbmysql')

class User {
  constructor({ username = '', password = '', email = '', name = '' } = '') {
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
    sql.end
    return result
  }

  async getUser() {
    const result = await sql
      .promise()
      .query(`SELECT * FROM User WHERE username = ?`, [this.username])
    sql.end
    return result[0]
  }
  async getAllUser(limit) {
    if (limit) {
      const result = await sql
        .promise()
        .query(`SELECT username FROM User LIMIT ?`, [limit])
      sql.end
      return result[0]
    }

    const result = await sql.promise().query(`SELECT username FROM User`)
    sql.end()
    return result[0]
  }
  async deleteUser(username, email) {
    const result = await sql
      .promise()
      .query(`DELETE FROM User WHERE username = ? AND email = ?`, [
        username,
        email,
      ])
    sql.end
    return result
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
