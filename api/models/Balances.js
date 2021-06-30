const sql = require('../dbmysql.js')

class Balance {
  constructor({ user_id = '', description = '', type = '', amount = '' } = '') {
    this.user_id = user_id
    this.description = description
    this.type = type
    this.amount = amount
  }
  async Create() {
    const result = await sql
      .promise()
      .query('INSERT INTO Balance SET ?', [this])
    sql.end
    return result
  }
  async getAllBalancetoaUser() {
    const result = await sql
      .promise()
      .query(
        "SELECT t2.amount FROM (SELECT SUM(CASE WHEN type='add' THEN amount ELSE amount *-1 end) AS amount, user_id FROM bsp6mhyf15txd3wl3fzu.Balance GROUP BY user_id) t2 WHERE user_id=?",
        [this.user_id]
      )
    sql.end
    return result[0]
  }
  async getAllRecordsBalancetoaUser(limit, Order, startDate, endDate) {
    if (Order === 'desc') {
      const result = await sql
        .promise()
        .query(
          'SELECT * FROM Balance WHERE user_id = ? and created_at >= ? and created_at <= ? ORDER BY created_at desc LIMIT ?',
          [this.user_id, startDate, endDate, limit]
        )
      sql.end
      return result[0]
    }
    const result = await sql
      .promise()
      .query(
        'SELECT * FROM Balance WHERE user_id = ? and created_at >= ? and created_at <= ?  ORDER BY created_at ASC LIMIT ?',
        [this.user_id, startDate, endDate, limit]
      )
    sql.end
    return result[0]
  }

  async updateBalance(data, id) {
    const result = await sql
      .promise()
      .query('UPDATE Balance SET ? WHERE user_id = ? and balance_id = ?', [
        data,
        this.user_id,
        id,
      ])
    sql.end
    return result[0]
  }

  async deleteaBalance(balance_id, user_id) {
    const result = await sql
      .promise()
      .query('DELETE FROM Balance WHERE user_id = ? AND balance_id = ?', [
        user_id,
        balance_id,
      ])
    sql.end
    return result
  }
}

module.exports = Balance
