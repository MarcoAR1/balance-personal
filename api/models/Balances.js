const sql = require('../dbmysql.js')

class Balance {
  constructor(
    { username = '', description = '', type = '', amount = '' } = ''
  ) {
    this.username = username
    this.description = description
    this.type = type
    this.amount = amount
  }
  async Create() {
    const result = await sql
      .promise()
      .query('INSERT INTO Balance SET ?', [this])
    return result
  }
  async getAllBalancetoaUser() {
    const result = await sql
      .promise()
      .query(
        "SELECT t2.amount FROM (SELECT SUM(CASE WHEN type='add' THEN amount ELSE amount *-1 end) AS amount, username FROM bsp6mhyf15txd3wl3fzu.Balance GROUP BY username) t2 WHERE username=?",
        [this.username]
      )
    return result[0]
  }
  async getAllHistoryBalancetoaUser(limit, Order, startDate, endDate) {
    if (Order === 'desc') {
      const result = await sql
        .promise()
        .query(
          'SELECT * FROM Balance WHERE username = ? and created_at >= ? and created_at <= ? ORDER BY created_at desc LIMIT ?',
          [this.username, startDate, endDate, limit]
        )
      return result[0]
    }
    const result = await sql
      .promise()
      .query(
        'SELECT * FROM Balance WHERE username = ? and created_at >= ? and created_at <= ?  ORDER BY created_at ASC LIMIT ?',
        [this.username, startDate, endDate, limit]
      )
    return result[0]
  }

  async deleteaBalance(balance_id, username) {
    const result = await sql
      .promise()
      .query('DELETE FROM Balance WHERE username = ? AND balance_id = ?', [
        username,
        balance_id,
      ])
    return result
  }
}

module.exports = Balance
