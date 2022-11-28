// NOT FINISHED YET
//
//

// var eventsSorted = [
//     {
//         eventname: '0',
//         eventdate: '2023-02-01T08:00:00.000Z',
//         eventtime: '06:30:00',
//     },
//     {
//         eventname: '1',
//         eventdate: '2024-02-01T08:00:00.000Z',
//         eventtime: '06:30:00',
//     },
//     {
//         eventname: '2',
//         eventdate: '2025-02-01T08:00:00.000Z',
//         eventtime: '06:30:00',
//     },
//     {
//         eventname: '3',
//         eventdate: '2026-02-01T08:00:00.000Z',
//         eventtime: '06:30:00',
//     },
//     {
//         eventname: '4',
//         eventdate: '2027-02-01T08:00:00.000Z',
//         eventtime: '06:30:00',
//     }
// ];


// var eventsUnsorted = [
//     {
//         eventname: '0',
//         eventdate: '2027-02-01T08:00:00.000Z',
//         eventtime: '06:30:00',
//     },
//     {
//         eventname: '1',
//         eventdate: '2026-02-01T08:00:00.000Z',
//         eventtime: '06:30:00',
//     },
//     {
//         eventname: '2',
//         eventdate: '2025-02-01T08:00:00.000Z',
//         eventtime: '06:30:00',
//     },
//     {
//         eventname: '3',
//         eventdate: '2024-02-01T08:00:00.000Z',
//         eventtime: '06:30:00',
//     },
//     {
//         eventname: '4',
//         eventdate: '2023-02-01T08:00:00.000Z',
//         eventtime: '06:30:00',
//     }
// ];

// var eventsSame = [
//     {
//         eventname: '0',
//         eventdate: '2027-02-01T08:00:00.000Z',
//         eventtime: '06:30:00',
//     },
//     {
//         eventname: '1',
//         eventdate: '2027-02-01T08:00:00.000Z',
//         eventtime: '06:30:00',
//     },
//     {
//         eventname: '2',
//         eventdate: '2027-02-01T08:00:00.000Z',
//         eventtime: '06:30:00',
//     },
//     {
//         eventname: '3',
//         eventdate: '2027-02-01T08:00:00.000Z',
//         eventtime: '06:30:00',
//     },
//     {
//         eventname: '4',
//         eventdate: '2027-02-01T08:00:00.000Z',
//         eventtime: '06:30:00',
//     }
// ];

// var eventsMixed = [
//     {
//         eventname: '0',
//         eventdate: '1999-02-01T08:00:00.000Z',
//         eventtime: '06:30:00',
//     },
//     {
//         eventname: '1',
//         eventdate: '2026-02-01T08:00:00.000Z',
//         eventtime: '06:30:00',
//     },
//     {
//         eventname: '2',
//         eventdate: '2022-12-01T08:00:00.000Z',
//         eventtime: '06:30:00',
//     },
//     {
//         eventname: '3',
//         eventdate: '2022-02-01T08:00:00.000Z',
//         eventtime: '05:30:00',
//     },
//     {
//         eventname: '4',
//         eventdate: '1972-02-01T08:00:00.000Z',
//         eventtime: '06:30:00',
//     }
// ];

// var eventsSameDate = [
//     {
//         eventname: '0',
//         eventdate: '2027-02-01T08:00:00.000Z',
//         eventtime: '06:30:00',
//     },
//     {
//         eventname: '1',
//         eventdate: '2027-02-01T08:00:00.000Z',
//         eventtime: '05:30:00',
//     },
//     {
//         eventname: '2',
//         eventdate: '2027-02-01T08:00:00.000Z',
//         eventtime: '04:30:00',
//     },
//     {
//         eventname: '3',
//         eventdate: '2027-02-01T08:00:00.000Z',
//         eventtime: '03:30:00',
//     },
//     {
//         eventname: '4',
//         eventdate: '2027-02-01T08:00:00.000Z',
//         eventtime: '02:30:00',
//     }
// ];

// const returnDateInt = (event) => {
//   const time = event.eventtime
//   const dateString = event.eventdate
//   const eventHours = time.slice(0, 2)
//   const eventMinutes = time.slice(3, 5)
//   const eventSeconds = time.slice(6)
//   const date = new Date(dateString)
//   date.setHours(parseInt(eventHours), parseInt(eventMinutes), parseInt(eventSeconds))
    
//   return date.getTime()
// }

// const handleSortByDate = (events) => {
//   const eventsSortingCopy = [...events]
//   for (let i = 0; i < eventsSortingCopy.length; i++) {
//     eventsSortingCopy[i].dateInteger = returnDateInt(eventsSortingCopy[i])
//   }

//   eventsSortingCopy.sort((a, b) => {
//     return a.dateInteger - b.dateInteger
//   })

//   return eventsSortingCopy
//   }

// test('Testing Already Sorted List', () => {
//     var listSorted = handleSortByDate(eventsSorted);
//     expect([0].eventname).toBe('0');
//     expect(listSorted[1].eventname).toBe('1');
//     expect(listSorted[2].eventname).toBe('2');
//     expect(listSorted[3].eventname).toBe('3');
//     expect(listSorted[4].eventname).toBe('4');
// });

