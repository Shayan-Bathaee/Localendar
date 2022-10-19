const db = require('./db');
const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

const getUser = async () => {
  const select = 'SELECT * FROM users';
  const query = {
    text: select,
    values: [],
  };
  const {rows} = await pool.query(query);
  return rows[0].email;
};

exports.get = async (req, res) => {
  res.status(200).json({message:
    `First entry stored in the user database is ` +
    `${await getUser()} `});
};

exports.post = async (req, res) => {
  const { name, email, pic } = req.body;

  pool.query(
    'INSERT INTO users (email, username, pw) VALUES ($2, $1, $3) RETURNING *',
    [email, name, pic],
    (error, results) => {
      if (error) {
        throw error;
      }

      

      res.status(200).json({name: name, email: email, pic: pic});
    }
  );

  // res.status(200).json({name: name, email: email});
};
