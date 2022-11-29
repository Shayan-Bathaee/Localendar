import request from 'supertest';
import express from 'express';

require('jest-fetch-mock').enableMocks();
const postUser = require('../backend/src/auth.js').post;
global.alert = jest.fn();
global.fetch = require('jest-fetch-mock');

let app = express();

app.use(express.json());
app.post('/v0/homepage', async (req, res) => {
  const { email, name, pic } = req.body
  if (!email || !name || !pic) {
    res.send(400)
    return
  }

  res.send({ email, name, pic })
});

const newUser = {
    name: 'test',
    email: 'test@test.com',
    pic: 'test-pic.jpeg'
}

const badUser = {
    name: 'test',
    pic: 'test-pic.jpeg'
}

test('Post new user', async () => {
  const response = await request(app).post("/v0/homepage").send(newUser)
  expect(response.body.name).toBe('test');
  expect(response.body.email).toBe('test@test.com');
  expect(response.body.pic).toBe('test-pic.jpeg');
});

test('Post new user', async () => {
  const response = await request(app).post("/v0/homepage").send(badUser)
  expect(response.statusCode).toBe(400);

});
