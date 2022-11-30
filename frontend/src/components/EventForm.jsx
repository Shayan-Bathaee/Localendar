import React, { useState } from 'react'
import './EventForm.css'

import { useNavigate } from 'react-router'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete'

// writes an event to the database
// event: an object containing:
// eventname
// email
// eventdate ('YYYY-MM-DD')
// eventtime ('HH:MM:SS')
// eventlocation
// eventdescription
function writeEventToDB (newEvent) {
  /* write event to database */
  fetch('http://localhost:3010/v0/eventform', {
    method: 'POST',
    body: JSON.stringify(newEvent),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => {
      // console.log(res);
      if (!res.ok) {
        throw res
      } return res.json()
    })
    .then((json) => {
      console.log(json)
    })
    .catch((err) => {
      console.log(err)
      alert('Error setting up event')
    })
}

function NewEvent () {
  const [inputs, setInputs] = useState({})

  const [address, setAddress] = React.useState('')
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null
  })


  const handleSelect = async value => {
    const results = await geocodeByAddress(value)
    const latLng = await getLatLng(results[0])
    setAddress(value)
    setCoordinates(latLng)
  }

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setInputs((values) => ({ ...values, [name]: value }))
  }


  const handlePost = (event) => {
    event.preventDefault()
    // get user
    const user = JSON.parse(localStorage.getItem('user'))
    // build new event
    // if(!coordinates.lat) 
    //const isEnabled = coordinates.lat.length > 0
    //console.log(isEnabled)



    const newEvent = {
      eventname: inputs.event_name,
      email: user.email,
      eventdate: inputs.date,
      eventtime: inputs.time,
      eventlocation: address,
      latitude: coordinates.lat,
      longitude: coordinates.lng,
      eventdescription: inputs.description
    }
    // console.log(coordinates.lat)
    // console.log(address)
    writeEventToDB(newEvent)
    history('/homepage') // take user back to homepage when event is done
  }

  const history = useNavigate()

  const cancel = () => {
    window.history.back()
  }

  

  return (
    <div>
      <div>
        <h1 className='page-title'> Create an Event </h1>
      </div>
      <div className='event-form'>
        <form onSubmit={handlePost}>
          <label>
            Event Name
            <input
              type='text'
              name='event_name'
              value={inputs.event_name || ''}
              onChange={handleChange}
            />
          </label>

          <label>
            Date
            <input
              type='text'
              name='date'
              placeholder='YYYY-MM-DD'
              value={inputs.date || ''}
              onChange={handleChange}
            />
          </label>
          <label>
            Time
            <input
              type='text'
              name='time'
              placeholder='HH:MM:SS'
              value={inputs.time || ''}
              onChange={handleChange}
            />
          </label>
          <label>

            <PlacesAutocomplete
              value={address}
              onChange={setAddress}
              onSelect={handleSelect}
            >
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                  Location
                  <input type='text' name='location ' {...getInputProps({ placeholder: 'Type address' })} />

                  <div>
                    {loading ? <div>...loading</div> : null}

                    {suggestions.map(suggestion => {
                      const style = {
                        backgroundColor: suggestion.active ? '#ff8a5c' : '#fff'
                      }

                      return (
                        <div {...getSuggestionItemProps(suggestion, { style })}>
                          {suggestion.description}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>

          </label>
          <br />
          <label>
            Description
            <textarea
              type='text'
              name='description'
              value={inputs.description || ''}
              onChange={handleChange}
              id='description-box'
            />
          </label>
          <br />
          <button className='cancel-bttn ' type='button' onClick={cancel}>Cancel</button>
          
          <button className='post-bttn' disabled = {inputs.description == null || inputs.description == "" || 
          inputs.event_name == null || inputs.event_name == "" || coordinates.lat == null || 
          inputs.date == null || inputs.date == "" || inputs.time == null || inputs.time == "" || 
          inputs.date.search(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/) < 0 || 
          inputs.time.search(/^(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)$/)<0} type='submit'>Post</button>
        </form>
      </div>
    </div>
  )
}

// Uncomment this line to test functions. App cannot run at the same time. 
// module.exports = {writeEventToDB};

export default NewEvent
