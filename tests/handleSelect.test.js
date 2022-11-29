// This file tests handleSelect in Home.jsx

/* load in the file */
jest.mock("dateformat", () => jest.fn());
const calculateDistanceInMiles = require('../frontend/src/components/Home.jsx').calculateDistanceInMiles;

/* testbench global variable declarations */
var expectedOutput = [];
var address = '';
var radius = 'any';
var globalCoordinates = {
    lat: 0,
    lng: 0
};

var events = [
    {
        eventname: '0',
        email: '',
        eventdate: '',
        eventtime: '',
        eventlocation: '6313 Evergreen Ave, Las Vegas, NV, 89107',
        latitude: 36.162119,
        longitude: -115.2312065,
        eventdescription: ''
    },
    {
        eventname: '1',
        email: '',
        eventdate: '',
        eventtime: '',
        eventlocation: '717 State St, Albany, NY 12203',
        latitude: 42.6639721,
        longitude: -73.7779027,
        eventdescription: ''
    },
    {
        eventname: '2',
        email: '',
        eventdate: '',
        eventtime: '',
        eventlocation: '26803 Co Rd 312, Buena Vista, CO 81211',
        latitude: 38.807594,
        longitude: -106.107703,
        eventdescription: ''
    },
    {
        eventname: '3',
        email: '',
        eventdate: '',
        eventtime: '',
        eventlocation: '9150 W Church St, Des Plaines, IL 60016',
        latitude: 42.046932,
        longitude: -87.853613,
        eventdescription: ''
    },
    {
        eventname: '4',
        email: '',
        eventdate: '',
        eventtime: '',
        eventlocation: '193 Parkway N, Brewer, ME 04412',
        latitude: 44.791541,
        longitude:  -68.75037,
        eventdescription: ''
    }
];


/* function under test */
const handleSelect = () => {
    // For testing only: No use states, and no using google maps APIs. Hardcoded inputs for latitude and longitude.
    // const results = await geocodeByAddress(value)
    // const latLng = await getLatLng(results[0])
    // setAddress(value)
    // globalCoordinates.lat = latLng.lat
    // globalCoordinates.lng = latLng.lng

    // for each event, calculate distance and add it as an event property, then figure out if they are in radius
    const eventsSortingCopy = [...events]
    for (let i = 0; i < eventsSortingCopy.length; i++) {
      eventsSortingCopy[i].distance = calculateDistanceInMiles(globalCoordinates.lat, globalCoordinates.lng, eventsSortingCopy[i].latitude, eventsSortingCopy[i].longitude)
      if (radius == 'any') {
        eventsSortingCopy[i].inRadius = true
      } else if (eventsSortingCopy[i].distance <= parseInt(radius)) { // if distance is in the radius, display
        eventsSortingCopy[i].inRadius = true
      } else { // not in radius
        eventsSortingCopy[i].inRadius = false
      }
    }

    // sort the events based on their distance property
    eventsSortingCopy.sort((a, b) => {
        return a.distance - b.distance
    })

    // set the events now that they are sorted
    // setEvents(eventsSortingCopy);
    return eventsSortingCopy; // For testing only: we return the events to check if they are sorted
}


// Equivalence class: normal
test('Testing 161 Centereach Mall, Centereach, NY 11720', () => {
    address = '161 Centereach Mall, Centereach, NY 11720';
    globalCoordinates.lat = 40.86365653326479;
    globalCoordinates.lng = -73.08093140571732;

    var actualOutput = handleSelect();
    expect(actualOutput[0].eventname).toBe('1');
    expect(actualOutput[1].eventname).toBe('4');
    expect(actualOutput[2].eventname).toBe('3');
    expect(actualOutput[3].eventname).toBe('2');
    expect(actualOutput[4].eventname).toBe('0');
});

test('Testing 10655 Scripps Poway Pkwy, San Diego, CA 92131', () => {
    address = '10655 Scripps Poway Pkwy, San Diego, CA 92131';
    globalCoordinates.lat = 32.936745937555685;
    globalCoordinates.lng = -117.09812909257646;

    var actualOutput = handleSelect();
    expect(actualOutput[0].eventname).toBe('0');
    expect(actualOutput[1].eventname).toBe('2');
    expect(actualOutput[2].eventname).toBe('3');
    expect(actualOutput[3].eventname).toBe('1');
    expect(actualOutput[4].eventname).toBe('4');
});


// Equivalence class: at event
test('Testing 9150 W Church St, Des Plaines, IL 60016', () => {
    address = '9150 W Church St, Des Plaines, IL 60016';
    globalCoordinates.lat = 42.04711679300226;
    globalCoordinates.lng = -87.85369195809291;

    var actualOutput = handleSelect();
    expect(actualOutput[0].eventname).toBe('3');
    expect(actualOutput[1].eventname).toBe('1');
    expect(actualOutput[2].eventname).toBe('4');
    expect(actualOutput[3].eventname).toBe('2');
    expect(actualOutput[4].eventname).toBe('0');
});

// Equivalence class: no data
test('Testing no data', () => {
    events = [];
    address = '161 Centereach Mall, Centereach, NY 11720';
    globalCoordinates.lat = 40.86365653326479;
    globalCoordinates.lng = -73.08093140571732;    

    var actualOutput = handleSelect();
    expect(actualOutput).toStrictEqual([]);
});
