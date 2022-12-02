const db = require('./db')
const { Pool } = require('pg')
const fs = require('fs')
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
  connectionString: process.env.DATABASE_URL 
}

const pool = new Pool(
  process.env.PORT === "production" ? proConfig : devConfig
);

/**
 * Retrieves all the events from the database.
 * 
 * @returns rows
 */
const getEvents = async () => {
  const select = 'SELECT * FROM events'
  const query = {
    text: select,
    values: []
  }
  const { rows } = await pool.query(query)
  return rows
}

/**
 * Selects the user that's trying to log in from the database.
 * 
 * @param {*} user 
 * @returns rows[0].pic
 */
const selectUser = async (user) => {
  let select = 'SELECT * FROM users'
  if (user) {
    select += ' WHERE email ~* $1'
  }
  const query = {
    text: select,
    values: user ? [`${user}`] : []
  }

  const { rows } = await pool.query(query)
  return rows[0].pic
}

/**
 * GET call that retrieves all the events from the database.
 * Sets the profile picture for that event to the corresponding
 * user's profile picture to be displayed on the event card.
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.get = async (req, res) => {
  const u = await getEvents()

  for (let i = 0; i < u.length; i++) {
    u[i].profilepic = await selectUser(u[i].email)
  }

  res.status(200).json({
    message: 'all events stored in event database: ',
    data: u
  })
}

/**
 * POST call that writes the new event into the database.
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.post = async (req, res) => {
  const { eventname, email, eventdate, eventtime, eventlocation, latitude, longitude, eventdescription } = req.body

  pool.query(
    'INSERT INTO events (eventname, email, eventdate, eventtime, eventlocation, latitude, longitude, eventdescription) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    [eventname, email, eventdate, eventtime, eventlocation, latitude, longitude, eventdescription],
    (error, results) => {
      if (error) {
        throw error
      }

      res.status(200).json({
        eventname,
        email,
        eventdate,
        eventtime,
        eventlocation,
        latitude,
        longitude,
        eventdescription
      })
    }
  )
}
