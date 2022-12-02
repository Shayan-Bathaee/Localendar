// Testing file for handleSortByDate function in Home.jsx


// List of sorted event objects containing only the necessary information for sorting by date
var eventsSorted = [
    {
        eventname: '0',
        eventdate: '2023-02-01T08:00:00.000Z',
        eventtime: '06:30:00',
    },
    {
        eventname: '1',
        eventdate: '2024-02-01T08:00:00.000Z',
        eventtime: '06:30:00',
    },
    {
        eventname: '2',
        eventdate: '2025-02-01T08:00:00.000Z',
        eventtime: '06:30:00',
    },
    {
        eventname: '3',
        eventdate: '2026-02-01T08:00:00.000Z',
        eventtime: '06:30:00',
    },
    {
        eventname: '4',
        eventdate: '2027-02-01T08:00:00.000Z',
        eventtime: '06:30:00',
    }
];


// List of unsorted event objects that have different times and dates, containing only
// the necessary information for sorting
var eventsDifferentDateTime = [
    {
        eventname: '0',
        eventdate: '2027-02-01T08:00:00.000Z',
        eventtime: '05:30:00',
    },
    {
        eventname: '1',
        eventdate: '2026-02-01T08:00:00.000Z',
        eventtime: '04:30:00',
    },
    {
        eventname: '2',
        eventdate: '2025-02-01T08:00:00.000Z',
        eventtime: '03:30:00',
    },
    {
        eventname: '3',
        eventdate: '2024-02-01T08:00:00.000Z',
        eventtime: '02:30:00',
    },
    {
        eventname: '4',
        eventdate: '2023-02-01T08:00:00.000Z',
        eventtime: '01:30:00',
    }
];


// List of sorted event objects (by default) that have the same times and dates, containing only
// the necessary information for sorting
var eventsSameDateTime = [
    {
        eventname: '0',
        eventdate: '2027-02-01T08:00:00.000Z',
        eventtime: '06:30:00',
    },
    {
        eventname: '1',
        eventdate: '2027-02-01T08:00:00.000Z',
        eventtime: '06:30:00',
    },
    {
        eventname: '2',
        eventdate: '2027-02-01T08:00:00.000Z',
        eventtime: '06:30:00',
    },
    {
        eventname: '3',
        eventdate: '2027-02-01T08:00:00.000Z',
        eventtime: '06:30:00',
    },
    {
        eventname: '4',
        eventdate: '2027-02-01T08:00:00.000Z',
        eventtime: '06:30:00',
    }
];


// List of unsorted event objects that have different times and same dates, containing only
// the necessary information for sorting
var eventsDifferentTime = [
    {
        eventname: '0',
        eventdate: '2027-02-01T08:00:00.000Z',
        eventtime: '06:30:00',
    },
    {
        eventname: '1',
        eventdate: '2027-02-01T08:00:00.000Z',
        eventtime: '05:30:00',
    },
    {
        eventname: '2',
        eventdate: '2027-02-01T08:00:00.000Z',
        eventtime: '03:30:00',
    },
    {
        eventname: '3',
        eventdate: '2027-02-01T08:00:00.000Z',
        eventtime: '04:30:00',
    },
    {
        eventname: '4',
        eventdate: '2027-02-01T08:00:00.000Z',
        eventtime: '01:30:00',
    }
];


// List of unsorted event objects that have same times and different dates, containing only
// the necessary information for sorting
var eventsDifferentDate = [
    {
        eventname: '0',
        eventdate: '2027-04-01T08:00:00.000Z',
        eventtime: '06:30:00',
    },
    {
        eventname: '1',
        eventdate: '2027-03-01T08:00:00.000Z',
        eventtime: '06:30:00',
    },
    {
        eventname: '2',
        eventdate: '2027-02-01T08:00:00.000Z',
        eventtime: '06:30:00',
    },
    {
        eventname: '3',
        eventdate: '2027-12-01T08:00:00.000Z',
        eventtime: '06:30:00',
    },
    {
        eventname: '4',
        eventdate: '2027-11-01T08:00:00.000Z',
        eventtime: '06:30:00',
    }
];


/**
 * Function takes an event object and returns time in miliseconds
 * @param {*} event - Object containing information about the event
 * @returns - Time in miliseconds since January 1, 1970
 */
const returnDateInt = (event) => {

  // Extract event time and event date from event object
  const time = event.eventtime
  const dateString = event.eventdate

  // Slice the event time string to get hour, minute, and seconds
  const eventHours = time.slice(0, 2)
  const eventMinutes = time.slice(3, 5)
  const eventSeconds = time.slice(6)

  // Create new date object with the event date string and set the time below
  const date = new Date(dateString)
  date.setHours(parseInt(eventHours), parseInt(eventMinutes), parseInt(eventSeconds))

  // Return time of date in miliseconds since January 1, 1970
  return date.getTime()
}


/**
 * Function takes a list of event objects and sorts them from earliest to latest dates
 * @param {*} events - List of events, with each event being an object with information about event
 * @returns - Sorted copy of events list, from earliest to latest dates
 */
const handleSortByDate = (events) => {

  // Create copy of events list and add new attribute "dateInteger" (miliseconds returned by returnDateInt)
  const eventsSortingCopy = [...events]
  for (let i = 0; i < eventsSortingCopy.length; i++) {
    eventsSortingCopy[i].dateInteger = returnDateInt(eventsSortingCopy[i])
  }

  // Sort the events based on the difference of the date integers
  eventsSortingCopy.sort((a, b) => {
    return a.dateInteger - b.dateInteger
  })

  // Return sorted copy of events list
  return eventsSortingCopy
}


// Test if the sorting method maintains order of an already sorted list of events
test('Testing Already Sorted List', () => {
    var listSorted = handleSortByDate(eventsSorted);
    expect(listSorted[0].eventname).toBe('0');
    expect(listSorted[1].eventname).toBe('1');
    expect(listSorted[2].eventname).toBe('2');
    expect(listSorted[3].eventname).toBe('3');
    expect(listSorted[4].eventname).toBe('4');
});


// Test if the sorting method correctly sorts an unsorted list of events with
// the different times and different dates
test('Testing Unsorted List With Different Dates and Times', () => {
    var listDifferentDateTime = handleSortByDate(eventsDifferentDateTime);
    expect(listDifferentDateTime[0].eventname).toBe('4');
    expect(listDifferentDateTime[1].eventname).toBe('3');
    expect(listDifferentDateTime[2].eventname).toBe('2');
    expect(listDifferentDateTime[3].eventname).toBe('1');
    expect(listDifferentDateTime[4].eventname).toBe('0');
});


// Test if the sorting method correctly sorts a list of events with the same
// dates and times
test('Testing Events With Same Dates And Times', () => {
    var listSameDateTime = handleSortByDate(eventsSameDateTime);
    expect(listSameDateTime[0].eventname).toBe('0');
    expect(listSameDateTime[1].eventname).toBe('1');
    expect(listSameDateTime[2].eventname).toBe('2');
    expect(listSameDateTime[3].eventname).toBe('3');
    expect(listSameDateTime[4].eventname).toBe('4');
});


// Test if the sorting method correctly sorts an unsorted list of events with
// the same dates but different times
test('Testing Events With Same Dates But Different Times', () => {
    var listDifferentTime = handleSortByDate(eventsDifferentTime);
    expect(listDifferentTime[0].eventname).toBe('4');
    expect(listDifferentTime[1].eventname).toBe('2');
    expect(listDifferentTime[2].eventname).toBe('3');
    expect(listDifferentTime[3].eventname).toBe('1');
    expect(listDifferentTime[4].eventname).toBe('0');
});


// Test if the sorting method correctly sorts an unsorted list of events with
// the same times but different dates
test('Testing Events With Same Time But Different Date', () => {
    var listDifferentDate = handleSortByDate(eventsDifferentDate);
    expect(listDifferentDate[0].eventname).toBe('2');
    expect(listDifferentDate[1].eventname).toBe('1');
    expect(listDifferentDate[2].eventname).toBe('0');
    expect(listDifferentDate[3].eventname).toBe('4');
    expect(listDifferentDate[4].eventname).toBe('3');
});

