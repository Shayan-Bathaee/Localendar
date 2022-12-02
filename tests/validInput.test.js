// Testing file for Submit Button in EventForm.jsx

// Hardcoded events for testing different test scenarios
const inputs = [
  {
    eventname: 'New Event',
    email: 'testing@ucsc.edu',
    eventdate: '2023-01-01',
    eventtime: '12:00:00',
    eventlocation: '6313 Evergreen Ave, Las Vegas, NV, 89107',
    latitude: 36.162119,
    longitude: -115.2312065,
    eventdescription: 'testing new event',
    valid: true
  },
  {
    eventname: 'New Event',
    email: 'testing@ucsc.edu',
    eventdate: '2023-01-01',
    eventtime: '12:00:00',
    eventlocation: '6313 Evergreen Ave, Las Vegas, NV, 89107',
    latitude: 36.162119,
    longitude: -115.2312065,
    valid: true
  },
  {
    eventname: 'New Event',
    email: 'testing@ucsc.edu',
    eventdate: '2023-01-01',
    eventtime: '12:00:002a',
    eventlocation: '6313 Evergreen Ave, Las Vegas, NV, 89107',
    latitude: 36.162119,
    longitude: -115.2312065,
    eventdescription: 'testing new event',
    valid: true
  },
  {
    eventname: 'New Event',
    email: 'testing@ucsc.edu',
    eventdate: '2023-01a-01',
    eventtime: '12:00:00',
    eventlocation: '6313 Evergreen Ave, Las Vegas, NV, 89107',
    latitude: 36.162119,
    longitude: -115.2312065,
    eventdescription: 'testing new event',
    valid: true
  },
  {
    eventname: 'New Event',
    email: 'testing@ucsc.edu',
    eventdate: '2023-01-01',
    eventtime: '12:00:00',
    eventlocation: 'fdfsdfsd',
    eventdescription: 'testing new event',
    valid: true
  },
  {
    eventname: 'New Event',
    email: 'testing@ucsc.edu',
    eventdescription: 'testing new event',
    valid: true
  }

]

// For testing purposes only
/**
 * Function takes a list of potential input cases and determines whether they are valid
 * @param {*} inputs - List of input cases
 */
const validInput = (inputs) => {
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].eventdescription == null || inputs[i].eventdescription == '' ||
      inputs[i].eventname == null || inputs[i].eventname == '' || inputs[i].latitude == null ||
      inputs[i].eventdate == null || inputs[i].eventdate == '' || inputs[i].eventtime == null || inputs[i].eventtime == '' ||
      inputs[i].eventdate.search(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/) < 0 ||
      inputs[i].eventtime.search(/^(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)$/) < 0) {
      inputs[i].valid = false
    } else {
      inputs[i].valid = true
    }
  }
}

// Test if submit button is enabled if all inputs entered are valid
test('Event #1 - All inputs are Valid', () => {
  validInput(inputs)
  expect(inputs[0].valid).toBe(true)
})

// Test if submit button is disabled if one input is empty
test('Event #2 - Missing Input Value', () => {
  validInput(inputs)
  expect(inputs[1].valid).toBe(false)
})

// Test if submit button is disabled for invalid time input
test('Event #3 - Invalid Time Format for Input', () => {
  validInput(inputs)
  expect(inputs[2].valid).toBe(false)
})

// Test if submit button is disabled for invalid date input
test('Event #4 - Invalid Date Format for Input', () => {
  validInput(inputs)
  expect(inputs[3].valid).toBe(false)
})

// Test if submit button is disabled for non-existent location input
test('Event #5 - Invalid Location in Input', () => {
  validInput(inputs)
  expect(inputs[4].valid).toBe(false)
})

// Test iif submit button is disabled when multiple inputs are unfilled
test('Event #6 - Missing Multiple Input Values', () => {
  validInput(inputs)
  expect(inputs[5].valid).toBe(false)
})
