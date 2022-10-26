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
    'INSERT INTO users (email, username, pw) VALUES ($1, $2, $3) ON CONFLICT (email) DO NOTHING RETURNING *',
    [email, name, pic],
    (error, results) => {
      if (error) {
        throw error;
      }

      

      res.status(200).json({email: email, name: name, pic: pic});
    }
  );

  // res.status(200).json({name: name, email: email});
};
