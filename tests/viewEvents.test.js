const returnDateInt = require('../frontend/src/components/Home.jsx').returnDateInt;
jest.mock("dateformat", () => jest.fn());

var showPastEvents = true;
const todaysDate = new Date()
todaysDate.setHours(0, 0, 0, 0)
const todaysDateInteger = todaysDate.getTime()

// Hardcoded events for testing
var events = [
    {
        eventname: '0',
        email: '',
        eventdate: '2021-10-12',
        eventtime: '11:45:10',
        eventlocation: '6313 Evergreen Ave, Las Vegas, NV, 89107',
        latitude: 36.162119,
        longitude: -115.2312065,
        eventdescription: '',
        view: false
    },
    {
        eventname: '1',
        email: '',
        eventdate: '2022-11-19',
        eventtime: '04:30:12',
        eventlocation: '717 State St, Albany, NY 12203',
        latitude: 42.6639721,
        longitude: -73.7779027,
        eventdescription: '',
        view: false
    },
    {
        eventname: '2',
        email: '',
        eventdate: '2022-12-25',
        eventtime: '12:34:12',
        eventlocation: '26803 Co Rd 312, Buena Vista, CO 81211',
        latitude: 38.807594,
        longitude: -106.107703,
        eventdescription: '',
        view: true
    },
    {
        eventname: '3',
        email: '',
        eventdate: '2023-04-01',
        eventtime: '11:11:11',
        eventlocation: '9150 W Church St, Des Plaines, IL 60016',
        latitude: 42.046932,
        longitude: -87.853613,
        eventdescription: '',
        view: true
    },
    {
        eventname: '4',
        email: '',
        eventdate: '2024-08-29',
        eventtime: '05:45:30',
        eventlocation: '193 Parkway N, Brewer, ME 04412',
        latitude: 44.791541,
        longitude:  -68.75037,
        eventdescription: '',
        view: true
    }
];

// For testing purposes only
const generateEvents = (events) => {
    for (let i = 0; i < events.length; i++) {
      if (showPastEvents) {
        events[i].view = true
      } else {
        if (returnDateInt(events[i]) < todaysDateInteger) {
          events[i].view = false
        } else {
          console.log(todaysDateInteger);
          events[i].view = true
        }
      }
    }
}

test('Show all events', () => {
    generateEvents(events);
    expect(events[0].view).toBe(true);
    expect(events[1].view).toBe(true);
    expect(events[2].view).toBe(true);
    expect(events[3].view).toBe(true);
    expect(events[4].view).toBe(true);
});

test('Do not show past events', () => {
    showPastEvents = false;
    generateEvents(events);
    expect(events[0].view).toBe(false);
    expect(events[1].view).toBe(false);
    expect(events[2].view).toBe(true);
    expect(events[3].view).toBe(true);
    expect(events[4].view).toBe(true);
});