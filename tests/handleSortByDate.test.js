
// Test Data Variables

jest.mock("dateformat", () => jest.fn());

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


var eventsUnsorted = [
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

var eventsMixed = [
    {
        eventname: '0',
        eventdate: '1999-02-01T08:00:00.000Z',
        eventtime: '06:30:00',
    },
    {
        eventname: '1',
        eventdate: '2026-02-01T08:00:00.000Z',
        eventtime: '06:30:00',
    },
    {
        eventname: '2',
        eventdate: '2022-12-01T08:00:00.000Z',
        eventtime: '06:30:00',
    },
    {
        eventname: '3',
        eventdate: '2022-02-01T08:00:00.000Z',
        eventtime: '05:30:00',
    },
    {
        eventname: '4',
        eventdate: '1972-02-01T08:00:00.000Z',
        eventtime: '06:30:00',
    }
];

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

// Copied Functions From Home.jsx For Simplicity

const returnDateInt = (event) => {
  const time = event.eventtime
  const dateString = event.eventdate
  const eventHours = time.slice(0, 2)
  const eventMinutes = time.slice(3, 5)
  const eventSeconds = time.slice(6)
  const date = new Date(dateString)
  date.setHours(parseInt(eventHours), parseInt(eventMinutes), parseInt(eventSeconds))
    
  return date.getTime()
}

const handleSortByDate = (events) => {
  const eventsSortingCopy = [...events]
  for (let i = 0; i < eventsSortingCopy.length; i++) {
    eventsSortingCopy[i].dateInteger = returnDateInt(eventsSortingCopy[i])
  }

  eventsSortingCopy.sort((a, b) => {
    return a.dateInteger - b.dateInteger
  })

  return eventsSortingCopy
}

// Unit Tests

test('Testing Already Sorted List', () => {
    var listSorted = handleSortByDate(eventsSorted);
    expect(listSorted[0].eventname).toBe('0');
    expect(listSorted[1].eventname).toBe('1');
    expect(listSorted[2].eventname).toBe('2');
    expect(listSorted[3].eventname).toBe('3');
    expect(listSorted[4].eventname).toBe('4');
});

test('Testing Unsorted List With Different Dates and Times', () => {
    var listUnsorted = handleSortByDate(eventsUnsorted);
    expect(listUnsorted[0].eventname).toBe('4');
    expect(listUnsorted[1].eventname).toBe('3');
    expect(listUnsorted[2].eventname).toBe('2');
    expect(listUnsorted[3].eventname).toBe('1');
    expect(listUnsorted[4].eventname).toBe('0');
});

test('Testing Events With Same Date And Time', () => {
    var listSameDateTime = handleSortByDate(eventsSameDateTime);
    expect(listSameDateTime[0].eventname).toBe('0');
    expect(listSameDateTime[1].eventname).toBe('1');
    expect(listSameDateTime[2].eventname).toBe('2');
    expect(listSameDateTime[3].eventname).toBe('3');
    expect(listSameDateTime[4].eventname).toBe('4');
});

test('Testing Mixed Date List', () => {
    var listMixed = handleSortByDate(eventsMixed);
    expect(listMixed[0].eventname).toBe('4');
    expect(listMixed[1].eventname).toBe('0');
    expect(listMixed[2].eventname).toBe('3');
    expect(listMixed[3].eventname).toBe('2');
    expect(listMixed[4].eventname).toBe('1');
});

test('Testing Events With Same Date But Different Times', () => {
    var listDifferentTime = handleSortByDate(eventsDifferentTime);
    expect(listDifferentTime[0].eventname).toBe('4');
    expect(listDifferentTime[1].eventname).toBe('2');
    expect(listDifferentTime[2].eventname).toBe('3');
    expect(listDifferentTime[3].eventname).toBe('1');
    expect(listDifferentTime[4].eventname).toBe('0');
});

test('Testing Events With Same Time But Different Date', () => {
    var listDifferentDate = handleSortByDate(eventsDifferentDate);
    expect(listDifferentDate[0].eventname).toBe('2');
    expect(listDifferentDate[1].eventname).toBe('1');
    expect(listDifferentDate[2].eventname).toBe('0');
    expect(listDifferentDate[3].eventname).toBe('4');
    expect(listDifferentDate[4].eventname).toBe('3');
});
