const db = require('./db')
const { Pool } = require('pg')
require("dotenv").config();

const devConfig = {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD
}

const proConfig = {
  connectionString: process.env.DATABASE_URL //heroku add-on
}

const pool = new Pool(
  process.env.PORT === "production" ? proConfig : devConfig
);
