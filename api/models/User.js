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

  async getUser(user_id) {
    const result = await sql
      .promise()
      .query(`SELECT * FROM User WHERE user_id = ?`, [user_id])
    sql.end
    return result[0]
  }
  async getUserLogin() {
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
  async deleteUser(username, email, user_id) {
    const result = await sql
      .promise()
      .query(
        `DELETE FROM User WHERE username = ? AND email = ? AND user_id = ?`,
        [username, email, user_id]
      )
    sql.end
    return result
  }

  async updateUser(data, user_id) {
    const result = await sql
      .promise()
      .query('UPDATE User SET ? WHERE username = ? AND user_id = ?', [
        data,
        this.username,
        user_id,
      ])
    sql.end
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
