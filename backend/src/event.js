const db = require('./db');
const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

const getEvents = async () => {
  const select = 'SELECT * FROM events';
  const query = {
    text: select,
    values: [],
  };
  const {rows} = await pool.query(query);
  //return rows;
  return JSON.stringify(rows);
};

exports.get = async (req, res) => {
  res.status(200).json({message:
    `all events stored in event database: ` +
    `${await getEvents()}`
  });
};

exports.post = async (req, res) => {
    const {eventname, email, eventdate, eventtime, eventlocation, eventdescription} = req.body;
  
    pool.query(
      'INSERT INTO events (eventname, email, eventdate, eventtime, eventlocation, eventdescription) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [eventname, email, eventdate, eventtime, eventlocation, eventdescription],
      (error, results) => {
        if (error) {
          throw error;
        }
  
        
        res.status(200).json({eventname: eventname, email: email, eventdate: eventdate, eventtime: eventtime, eventlocation: eventlocation, eventdescription: eventdescription});
      }
    );
  };