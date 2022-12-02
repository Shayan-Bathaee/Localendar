import request from 'supertest';
import express from 'express';

require('jest-fetch-mock').enableMocks();
global.alert = jest.fn();
global.fetch = require('jest-fetch-mock');

// get the user from the database
let app = express();
app.use(express.json());
app.get('/v0/homepage', async (req, res) => {
  res.status(200).json({
    message:
    'First entry stored in the user database is ' +
    users[0].email
  })
});

// mock of the database
const users = [
  {
    name: 'test',
    email: 'test@test.com',
    pic: 'test-pic.jpeg'
  }
]

// gets the user database
test('get user', async () => {
  const response = await request(app).get("/v0/homepage")
  // console.log(response.body.message)
  expect(response.body.message).toBe('First entry stored in the user database is test@test.com');
});
