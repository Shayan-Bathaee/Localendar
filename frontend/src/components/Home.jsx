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

const globalCoordinates = {
  lat: 0,
  lng: 0
}
const radiusOfEarthInMiles = 3963
let showPastEvents = false

const todaysDate = new Date()
todaysDate.setHours(0, 0, 0, 0)
const todaysDateInteger = todaysDate.getTime()

/**
 * @return {*} distance between the user and the event
 * @param {*} userLatitude
 * @param {*} userLongitude
 * @param {*} eventLatitude
 * @param {*} eventLongitude
 */
function calculateDistanceInMiles (userLatitude, userLongitude, eventLatitude, eventLongitude) {
  const userLatitudeRadians = userLatitude / 57.29577951
  const userLongitudeRadians = userLongitude / 57.29577951
  const eventLatitudeRadians = eventLatitude / 57.29577951
  const eventLongitudeRadians = eventLongitude / 57.29577951
  const distance = radiusOfEarthInMiles * Math.acos((Math.sin(userLatitudeRadians) * Math.sin(eventLatitudeRadians)) + (Math.cos(userLatitudeRadians) * Math.cos(eventLatitudeRadians) * Math.cos(eventLongitudeRadians - userLongitudeRadians)))
  return distance
}

function returnDateInt (event) {
  const time = event.eventtime // get time as a string
  const dateString = event.eventdate // get date as a string

  // get hours, minutes, and seconds
  const eventHours = time.slice(0, 2)
  const eventMinutes = time.slice(3, 5)
  const eventSeconds = time.slice(6)

  // typcast the string into a date, and update the hours, minutes, and seconds
  const date = new Date(dateString)
  date.setHours(parseInt(eventHours), parseInt(eventMinutes), parseInt(eventSeconds))

  // return the integer version of the date
  return date.getTime()
}

/**
 * check if every element in an array is undefined
 * @param {*} array
 * @returns
 */
function allElementsAreUndefined (array) {
  return array.every(element => element === undefined)
}

/**
 * @return {object} JSX Table
 */
function Home () {
  const user = JSON.parse(localStorage.getItem('user'))
  const [radius, setRadius] = React.useState('any')
  const [events, setEvents] = React.useState([])
  const [name, setName] = React.useState(user ? user.name : '')
  const [icon, setPic] = React.useState(user ? user.pic : '')
  const [address, setAddress] = React.useState('')
  const [error, setError] = React.useState('Logged Out')
  const [dim, setDim] = React.useState('none')
  const [transformer, setTransform] = React.useState('translateX(100%)')

  React.useEffect(() => {
    getEventsFromDB()
    showPastEvents = false
  }, [])

  const history = useNavigate()

  const logout = () => {
    localStorage.removeItem('user')
    setName('')
    setPic('')
    setError('Logged Out')
    history('/')
  }

  const createEvent = () => {
    history('/eventform')
  }

  const deleteEvent = () => {
    console.log('delete button clicked')
    console.log('user: ', user)
  }

  const togglePanel = (action) => {
    if (action === 'close') {
      setTransform('translateX(100%)')
      setDim('none')
    } else {
      setTransform('translateX(0%)')
      setDim('block')
    }
  }

  Geocode.setApiKey('AIzaSyAZwTrchd6eBtPRB7m1VOz5Fh5smHba5Us')

  const getEventsFromDB = () => {
    fetch('https://localendar.herokuapp.com/v0/eventform', {
      method: 'GET'
    })
      .then((res) => {
        if (!res.ok) {
          throw res
        }
        return res.json()
      })
      .then((json) => {
        console.log(json.data)
        for (let i = 0; i < json.data.length; i++) {
          json.data[i].dateInteger = returnDateInt(json.data[i])
        }
        json.data.sort((a, b) => {
          return a.dateInteger - b.dateInteger
        })
        setEvents(json.data)
      })
      .catch((err) => {
        console.log(err)
        alert('Error reading event')
      })
  }

  /* this function gets called when the 'search' button is pressed */
  const handleSelect = async value => {
    const results = await geocodeByAddress(value)
    const latLng = await getLatLng(results[0])
    setAddress(value)
    globalCoordinates.lat = latLng.lat
    globalCoordinates.lng = latLng.lng

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

    console.log('radius: ', radius)

    // sort the events based on their distance property
    eventsSortingCopy.sort((a, b) => {
      return a.distance - b.distance
    })

    // set the events now that they are sorted
    setEvents(eventsSortingCopy)
  }

  const handleSortByDate = () => {
    const eventsSortingCopy = [...events]
    for (let i = 0; i < eventsSortingCopy.length; i++) {
      eventsSortingCopy[i].dateInteger = returnDateInt(eventsSortingCopy[i])
    }

    eventsSortingCopy.sort((a, b) => {
      return a.dateInteger - b.dateInteger
    })

    // set the events now that they are sorted
    setEvents(eventsSortingCopy)
  }

  /* changes the viewing state of events when the show past events toggle is pressed */
  const handleShowPastEvents = () => {
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
    setEvents(eventsCopy) // trigger screen reset
  }

  const handleRadiusChange = (e) => {
    const eventsCopy = [...events]
    const eventsCopyLength = eventsCopy.length
    console.log('handling change')

    if (e.target.value == 'any') {
      for (let i = 0; i < eventsCopyLength; i++) { // display all when radius is any
        eventsCopy[i].inRadius = true
      }
    } else {
      const newRadius = parseInt(e.target.value)
      for (let i = 0; i < eventsCopyLength; i++) {
        if ('distance' in eventsCopy[i]) {
          if (eventsCopy[i].distance > newRadius) { // if the distance is outside of the radius, don't display it
            eventsCopy[i].inRadius = false
          } else {
            eventsCopy[i].inRadius = true
          }
        } else { // if the event doesn't have a distance, just keep it displayed
          eventsCopy[i].inRadius = true
        }
      }
    }

    setRadius(e.target.value)
    setEvents(eventsCopy)
  }

  /**
   * Generate formatted output of events
   * @param {*} events
   * @returns
   */

  const generateEvents = (events) => {
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

    const eventsList = events.map((event) => {
      if ((event.view == false) || (event.inRadius == false)) { // if we don't want to view the event, just return
        return
      }

      let distanceRender = ''
      if ('distance' in event) {
        distanceRender = ' (' + Math.round(event.distance * 10) / 10 + ' mi)'
      }
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
    if (allElementsAreUndefined(eventsList)) {
      return (
        <div id='failedSearchContainer'>
          <div id='failedSearch'>Your search returned no results.</div>
        </div>
      )
    }
    return eventsList
  }

  return (
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

export default Home
