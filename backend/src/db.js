const { Pool } = require('pg')
require("dotenv").config();

// Configurations for PostgreSQL
const devConfig = {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD
}

// Heroku Configurations
const proConfig = {
  connectionString: process.env.DATABASE_URL
}

// Construct pool for connection between database and client
const pool = new Pool(
  process.env.PORT === "production" ? proConfig : devConfig
);

// Retrieves user from the database
exports.selectUser = async (user) => {

  // Build SQL for database query
  let select = 'SELECT * FROM users'
  if (user) {
    select += ' WHERE email ~* $1'
  }

  // Construct call for database query
  const query = {
    text: select,
    values: user ? [`${user}`] : []
  }

  // Retrieve user information from the database
  const { rows } = await pool.query(query)

  // return user information
  return rows[0]
}
