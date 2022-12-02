const db = require('./db')
const { Pool } = require('pg')
require("dotenv").config();

/**
 * Configures the database that uses Postgres
 */
const devConfig = {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD
}

/**
 * Configuration for webhosting using Heroku
 */
const proConfig = {
  connectionString: process.env.DATABASE_URL //heroku add-on
}

/**
 * Determines whether to run on Heroku or locally
 */
const pool = new Pool(
  process.env.PORT === "production" ? proConfig : devConfig
);


/**
 * POST call that writes new user information into the database.
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.post = async (req, res) => {
  const { name, email, pic } = req.body

  pool.query(
    'INSERT INTO users (email, pic, username) VALUES ($1, $2, $3) ON CONFLICT (email) DO NOTHING RETURNING *',
    [email, pic, name],
    (error, results) => {
      if (error) {
        throw error
      }

      res.status(200).json({ email, pic, name })
    }
  )

}
