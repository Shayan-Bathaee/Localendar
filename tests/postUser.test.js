import request from 'supertest'
import express from 'express'

require('jest-fetch-mock').enableMocks()
global.alert = jest.fn()
global.fetch = require('jest-fetch-mock')

// posts a user to the user database
const app = express()
app.use(express.json())
app.post('/v0/homepage', async (req, res) => {
  const { email, name, pic } = req.body
  if (!email || !name || !pic) {
    res.send(400)
    return
  }
  res.status(200).send({ email, name, pic })
})

// json for valid user
const newUser = {
  name: 'test',
  email: 'test@test.com',
  pic: 'test-pic.jpeg'
}

// json for invalid user
const badUser = {
  name: 'test',
  pic: 'test-pic.jpeg'
}

// post a valid user
test('Post new user', async () => {
  const response = await request(app).post('/v0/homepage').send(newUser)
  expect(response.body.name).toBe('test')
  expect(response.body.email).toBe('test@test.com')
  expect(response.body.pic).toBe('test-pic.jpeg')
})

// post an invalid user
test('Post bad user', async () => {
  const response = await request(app).post('/v0/homepage').send(badUser)
  expect(response.status).toBe(400)
})
