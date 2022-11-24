const { Pool } = require('pg')

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD
})

exports.selectUser = async (user) => {
  console.log(user)

  let select = 'SELECT * FROM users'
  if (user) {
    select += ' WHERE email ~* $1'
  }
  const query = {
    text: select,
    values: user ? [`${user}`] : []
  }

  console.log(query)

  const { rows } = await pool.query(query)

  console.log(rows)

  return rows[0]
}
