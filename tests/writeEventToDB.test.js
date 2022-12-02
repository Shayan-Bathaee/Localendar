import request from 'supertest';
import express from 'express';

require('jest-fetch-mock').enableMocks();
global.alert = jest.fn();
global.fetch = require('jest-fetch-mock');

/**
 * Function that is used to test writing the event to the backend.
 */
let app = express();
app.use(express.json());
app.post('/v0/eventform', async (req, res) => {
  const { eventname, email, eventdate, eventtime, eventlocation, latitude, longitude, eventdescription } = req.body
  if (!eventname || !email || !eventdate || !eventtime || !eventlocation || !latitude || !longitude || !eventdescription) {
    res.send(400)
    return
  }

  res.status(200).send({ eventname, email, eventdate, eventtime, eventlocation, latitude, longitude, eventdescription })
});

// Sample events used for testing
const newEvent = {
    eventname: 'New Event',
    email: 'testing@ucsc.edu',
    eventdate: '2023-01-01',
    eventtime: '12:00:00',
    eventlocation: '6313 Evergreen Ave, Las Vegas, NV, 89107',
    latitude: 36.162119,
    longitude: -115.2312065,
    eventdescription: 'testing new event'
}

const badEvent = {
    eventname: 'Bad New Event',
    email: 'testing@ucsc.edu',
    eventtime: '12:00:00',
    latitude: 36.162119,
    longitude: -115.2312065,
    eventdescription: 'testing bad event'
}

/**
 * Tests to see if the backend POST call successfully posts the event
 * that is correctly formatted.
 */
test('Post new event', async () => {
    const response = await request(app).post("/v0/eventform").send(newEvent)
    expect(response.body.eventname).toBe('New Event');
    expect(response.body.email).toBe('testing@ucsc.edu');
    expect(response.body.eventdate).toBe('2023-01-01');
    expect(response.body.eventtime).toBe('12:00:00');
    expect(response.body.eventlocation).toBe('6313 Evergreen Ave, Las Vegas, NV, 89107');
    expect(response.body.latitude).toBe(36.162119);
    expect(response.body.longitude).toBe(-115.2312065);
    expect(response.body.eventdescription).toBe('testing new event');
});

/**
 * Tests to see if the backend POST call throws an error when the event
 * is not correctly formatted.
 */
test('Post call throws error', async () => {
    const response = await request(app).post("/v0/eventform").send(badEvent)
    expect(response.status).toBe(400);
});
