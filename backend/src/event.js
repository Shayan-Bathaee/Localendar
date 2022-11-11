const db = require('./db');
const {Pool} = require('pg');
const fs = require('fs');

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
  return rows;
};

const selectUser = async (user) => {

  let select = 'SELECT * FROM users';
  if (user) {
    select += ` WHERE email ~* $1`;
  }
  const query = {
    text: select,
    values: user ? [`${user}`] : [],
  };

  const {rows} = await pool.query(query);
  return rows[0].pic;
};



exports.get = async (req, res) => {

  const u = await getEvents();

  for(let i = 0; i < u.length; i++){
    u[i].profilepic = await selectUser(u[i].email);
  }

  res.status(200).json({
    message: `all events stored in event database: `, 
    data: u,
  });
};

exports.post = async (req, res) => {
    const {eventname, email, eventdate, eventtime, eventlocation, eventcoords, eventdescription} = req.body;
  
    pool.query(
      'INSERT INTO events (eventname, email, eventdate, eventtime, eventlocation, eventcoords, eventdescription) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [eventname, email, eventdate, eventtime, eventlocation, eventcoords, eventdescription],
      (error, results) => {
        if (error) {
          throw error;
        }
  
        
        res.status(200).json({eventname: eventname, email: email, eventdate: eventdate, eventtime: eventtime, eventlocation: eventlocation, eventcoords: eventcoords, eventdescription: eventdescription});
      }
    );
  };