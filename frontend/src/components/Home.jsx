import logo from './img/LocalendarLogo.svg'
import React, { useEffect } from 'react'
import './Home.css'
import dateFormat from 'dateformat'
import { json, useNavigate } from 'react-router-dom'
import Geocode from 'react-geocode'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete'

// Global coordinates of the selected location in the search bar
const globalCoordinates = {
  lat: 0,
  lng: 0
}

// Global constant for radius of earth
const radiusOfEarthInMiles = 3963

// Global variable for tracking whether the user wants to display past events
let showPastEvents = false

// Global constant for todays date and time
const todaysDate = new Date()
todaysDate.setHours(0, 0, 0, 0)

// Global constant for miliseconds occuring since Janurary 1, 1970 to todays date
const todaysDateInteger = todaysDate.getTime()

/**
 * Returns distance in miles from user's location to events
 * @return {number} - Distance in miles from user's location to events
 * @param {number} userLatitude - Latitude of the user's current location
 * @param {number} userLongitude - Longitude 
 * @param {number} eventLatitude
 * @param {number} eventLongitude
 */
const calculateDistanceInMiles = (userLatitude, userLongitude, eventLatitude, eventLongitude) => {

  // Converts latitudes and longitudes into radians
  const userLatitudeRadians = userLatitude / 57.29577951
  const userLongitudeRadians = userLongitude / 57.29577951
  const eventLatitudeRadians = eventLatitude / 57.29577951
  const eventLongitudeRadians = eventLongitude / 57.29577951

  // Calculates distance 
  const distance = radiusOfEarthInMiles * Math.acos((Math.sin(userLatitudeRadians) * Math.sin(eventLatitudeRadians)) + (Math.cos(userLatitudeRadians) * Math.cos(eventLatitudeRadians) * Math.cos(eventLongitudeRadians - userLongitudeRadians)))

  // Returns distance
  return Math.round(distance * 10) / 10;
}

/**
 * Function takes an event object and returns time in miliseconds
 * @param {object} event - Object containing information about the event
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
 * Checks if every element within the array of events is undefined
 * @param {array} - 
 * @returns - Boolean for whether all elements are undefined with the events array
 */
function allElementsAreUndefined (array) {

  // Returns boolean for whether all elements are undefined within the events array
  return array.every(element => element === undefined)
}

/**
 * @return {object} - Home page for the website
 */
function Home () {
  
  // Constant for local information stored about current user
  const user = JSON.parse(localStorage.getItem('user'))

  // All React states used for various purposes within the Home object
  const [radius, setRadius] = React.useState('any')
  const [events, setEvents] = React.useState([])
  const [name, setName] = React.useState(user ? user.name : '')
  const [icon, setPic] = React.useState(user ? user.pic : '')
  const [address, setAddress] = React.useState('')
  const [error, setError] = React.useState('Logged Out')
  const [dim, setDim] = React.useState('none')
  const [transformer, setTransform] = React.useState('translateX(100%)')

  // Effect used to fetch events from the database when Home page is loaded
  React.useEffect(() => {
    getEventsFromDB()
    showPastEvents = false
  }, [])

  const history = useNavigate()

  /**
   * Logs out user and removes all locally stored information about them. Also,
   * routes the user back to the Login page
   */
  const logout = () => {
    localStorage.removeItem('user')
    setName('')
    setPic('')
    setError('Logged Out')
    history('/')
  }

  /**
   * Transfers user to the Event Form page when they want to post an event
   */
  const createEvent = () => {
    history('/eventform')
  }

  /**
   * Toggles the hidden sliding menu on the right side of the page and dims rest of page
   * @param {string} action - String that signifies whether to close or open sliding meunu
   */
  const togglePanel = (action) => {

    // If string is 'close' then we translate the sliding menu to hide it and undim the page. If
    // the string is 'open' then we translate the sliding menu to be seen and dim background
    if (action === 'close') {
      setTransform('translateX(100%)')
      setDim('none')
    } else {
      setTransform('translateX(0%)')
      setDim('block')
    }
  }

  // API key for Google
  Geocode.setApiKey('AIzaSyAZwTrchd6eBtPRB7m1VOz5Fh5smHba5Us')

  /**
   * Call to the backend to retrieve events from the database
   */
  const getEventsFromDB = () => {
    fetch('http://localhost:3010/v0/eventform', {
      method: 'GET'
    })
      .then((res) => {

        // If there is an issue with the response, display it, otherwise return events json
        if (!res.ok) {
          throw res
        }
        return res.json()
      })
      .then((json) => {
        
        // Sort events from database if they are retrieve successfully and display them
        for (let i = 0; i < json.data.length; i++) {
          json.data[i].dateInteger = returnDateInt(json.data[i])
        }
        json.data.sort((a, b) => {
          return a.dateInteger - b.dateInteger
        })
        setEvents(json.data)
      })
      .catch((err) => {

        // Alert user if there has been error retrieving events
        console.log(err)
        alert('Error reading event')
      })
  }

  /**
   * Retrieves and sets the address and coordinates of the address that was searched by the user,
   * then sets the events according to filters applied by user
   * @param {string} value - Address currently typed in the search bar
   */
  const handleSelect = async value => {

    // Retrieve latitude and longitude from geocode
    const results = await geocodeByAddress(value)
    const latLng = await getLatLng(results[0])

    // Set the address state to the value and assign the global longitude and latitude
    // to the longitude and latitude of that address
    setAddress(value)
    globalCoordinates.lat = latLng.lat
    globalCoordinates.lng = latLng.lng

    // For each event, calculate the distance and add it as an event property, then figure out if they are within the radius
    const eventsSortingCopy = [...events]
    for (let i = 0; i < eventsSortingCopy.length; i++) {
      eventsSortingCopy[i].distance = calculateDistanceInMiles(globalCoordinates.lat, globalCoordinates.lng, eventsSortingCopy[i].latitude, eventsSortingCopy[i].longitude)
      if (radius == 'any') {
        eventsSortingCopy[i].inRadius = true
      } else if (eventsSortingCopy[i].distance <= parseInt(radius)) {
        eventsSortingCopy[i].inRadius = true
      } else {
        eventsSortingCopy[i].inRadius = false
      }
    }

    // Sort the events based on the difference of the date integers
    eventsSortingCopy.sort((a, b) => {
      return a.distance - b.distance
    })

    // Set the currently displayed events to the sorted copy of events list
    setEvents(eventsSortingCopy);
  }

  /**
   * Sorts the events displayed from earliest to latest when the "Sort By Date" is selected
   */
  const handleSortByDate = () => {

    // Create copy of events list and add new property "dateInteger" (miliseconds returned by returnDateInt)
    const eventsSortingCopy = [...events]
    for (let i = 0; i < eventsSortingCopy.length; i++) {
      eventsSortingCopy[i].dateInteger = returnDateInt(eventsSortingCopy[i])
    }

    // Sort the events based on the difference of the date integers
    eventsSortingCopy.sort((a, b) => {
      return a.dateInteger - b.dateInteger
    })

    // Set the currently displayed events to the sorted copy of events list
    setEvents(eventsSortingCopy)
  }

  /**
   * Displays the past events when the "Show Past Events" button is selected
   */
  const handleShowPastEvents = () => {

    // Creates copy of the events list and changes their view property depending on whether
    // the user has requested past events or not
    showPastEvents = !showPastEvents
    const eventsCopy = [...events]
    const eventsCopyLength = eventsCopy.length
    for (let i = 0; i < eventsCopyLength; i++) {
      if (showPastEvents) {
        eventsCopy[i].view = true
      } else {
        if (returnDateInt(events[i]) < todaysDateInteger) {
          eventsCopy[i].view = false
        } else {
          eventsCopy[i].view = true
        }
      }
    }

    // Set the events to the new copy of the events list with altered view properties
    setEvents(eventsCopy)
  }

  /**
   * Filters and sets the events that are within the radius provided
   * @param {object} e - Radius selected by the user
   */
  const handleRadiusChange = (e) => {

    // Create copy of events list
    const eventsCopy = [...events]
    const eventsCopyLength = eventsCopy.length
    console.log('handling change')

    // If the radius is "any" display all events
    if (e.target.value == 'any') {
      for (let i = 0; i < eventsCopyLength; i++) {
        eventsCopy[i].inRadius = true
      }
    } else {

      // Otherwise, parse through the events and check if they are within the radius
      const newRadius = parseInt(e.target.value)
      for (let i = 0; i < eventsCopyLength; i++) {
        if ('distance' in eventsCopy[i]) {
          if (eventsCopy[i].distance > newRadius) { 
            eventsCopy[i].inRadius = false
          } else {
            eventsCopy[i].inRadius = true
          }
        } else {
          eventsCopy[i].inRadius = true
        }
      }
    }

    // Set the new radius state and events list state
    setRadius(e.target.value)
    setEvents(eventsCopy)
  }

  /**
   * Generate JSX for events onto the Home page
   * @param {array} events - Array containg event objects
   * @returns - JSX for event postings
   */
  const generateEvents = (events) => {

    // Change the views of the events depending on whether the user wants past events
    for (let i = 0; i < events.length; i++) {
      if (showPastEvents) {
        events[i].view = true
      } else {
        if (returnDateInt(events[i]) < todaysDateInteger) {
          events[i].view = false
        } else {
          events[i].view = true
        }
      }
    }

    // Returns list of events that meet specified criteria by user
    const eventsList = events.map((event) => {

      // If the event does not meet the user's filters, then return nothing for event
      if ((event.view == false) || (event.inRadius == false)) {
        return
      }

      // If the user specifies distance, attach the distance to event data
      let distanceRender = ''
      if ('distance' in event) {
        distanceRender = ' (' + event.distance + ' mi)'
      }

      // JSX for event posting if it meets filter criteria
      return (
        <div className='event'>
          <div className='eventHalf'>
            <div className='eventName'>{event.eventname}</div>
            <div className='eventDetails'>
              {event.eventlocation}{distanceRender}
              <br />
              {event.eventtime}
              {' '}
              {dateFormat(event.eventdate, 'dddd, mmm d, yyyy')}
            </div>
          </div>
          <div className='profileHalf'>
            <div id='eventPoster'>{event.email}</div>
            <div id='eventPicture'><img src={event.profilepic} /></div>
          </div>
          <div className='eventBorder' />
          <div className='eventDescription'>
            {event.eventdescription}
          </div>
        </div>
      )
    })

    // If objects within the events list are undefined, return JSX displaying that no
    // results were found for the request
    if (allElementsAreUndefined(eventsList)) {
      return (
        <div id='failedSearchContainer'>
          <div id='failedSearch'>Your search returned no results.</div>
        </div>
      )
    }

    // Return JSX for events
    return eventsList
  }

  return (
    
    // JSX for Home page
    <div>
      <div id='sidePanel' style={{ transform: transformer }}>
        <div id='profileContainer'>
          <div id='profileName'>{name || ''}</div>
          <div id='profilePicture'><img src={icon || ''} /></div>
        </div>
        <div id='createPost' onClick={createEvent}>Create Post</div>
        <div id='signOut' onClick={logout}>Logout</div>
      </div>
      <div>
        <div id='pageHeader'>
          <img src={logo} alt='logo' className='logo' />
          <div id='navBarContainer' onClick={() => togglePanel('open')}>
            <div className='navBarLine' />
            <div className='navBarLine' />
            <div className='navBarLine' />
          </div>
        </div>
        <div
          id='pageDimmer' onClick={() => togglePanel('close')}
          style={{ display: dim }}
        />
        <div id='eventsContainer'>
          {/* Parts of PlacesAutocomplete used from the youtube video:
          https://www.youtube.com/watch?v=uJYqQdnw8LE */}
          <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <div id='locationContainer'>
                  <div id='setButton' onClick={() => handleSelect(address)}>Search</div>
                  <input id='textPortion' type='text' name='location ' {...getInputProps({ placeholder: 'Enter address' })} />
                </div>
                <div id='resultsContainer'>
                  {suggestions.map(suggestion => {
                    return (
                      <div id='resultsContainerSmall'>
                        <div id='result'>
                          <div {...getSuggestionItemProps(suggestion)}>
                            {suggestion.description}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
          <div id='optionsContainer'>
            <button id='sortByDateButton' class='optionsButton' onClick={handleSortByDate}>Sort By Date</button>
            <div id='showPastEventsContainer'>
              <button id='showPastEventsButton' class='optionsButton'>
                Show Past Events &nbsp;
                <label class='switch'>
                  <input type='checkbox' onChange={handleShowPastEvents} />
                  <span class='slider round' />
                </label>
              </button>
            </div>
            <div id='radiusContainter'>
              <button id='radiusButton' class='optionsButton'>
                Search Radius &nbsp;
                <select name='radiusSelect' id='radiusSelect' class='dropdownSelect' onChange={handleRadiusChange}>
                  <option value='any'>Any</option>
                  <option value='5'>5 mi</option>
                  <option value='10'>10 mi</option>
                  <option value='25'>25 mi</option>
                  <option value='50'>50 mi</option>
                  <option value='100'>100 mi</option>
                  <option value='250'>250 mi</option>
                  <option value='300'>300 mi</option>
                </select>
              </button>
            </div>
          </div>
          {generateEvents(events)}
        </div>
      </div>
    </div>
  )
}

// Uncomment this line to test functions. App cannot run at the same time. 
// module.exports = {calculateDistanceInMiles, returnDateInt, Home};

export default Home;



