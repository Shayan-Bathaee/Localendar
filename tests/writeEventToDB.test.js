require('jest-fetch-mock').enableMocks();
const writeEventToDB = require('../frontend/src/components/EventForm.jsx').writeEventToDB;
global.alert = jest.fn();
global.fetch = require('jest-fetch-mock');

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

test('Post new event', () => {
    writeEventToDB(newEvent);
});

test('Post call throws error', () => {
    writeEventToDB(newEvent);
});