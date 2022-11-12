import logo from './img/LocalendarLogo.svg';
import React from 'react';
import './Home.css';
import dateFormat from 'dateformat';
import {json, useNavigate} from 'react-router-dom';
import Geocode from "react-geocode";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

/**
 * @return {object} JSX Table
 */
function Home() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [events, setEvents] = React.useState([]);
  const [name, setName] = React.useState(user ? user.name : '');
  const [icon, setPic] = React.useState(user ? user.pic : '');
  const [address, setAddress] = React.useState("");
  const [error, setError] = React.useState('Logged Out');
  const [dim, setDim] = React.useState('none');
  const [transformer, setTransform] = React.useState('translateX(100%)');

  React.useEffect(() => {
    getEventsFromDB();
  }, []);

  const history = useNavigate();

  const logout = () => {
    localStorage.removeItem('user');
    setName('');
    setPic('');
    setError('Logged Out');
    history('/');
  };

  const createEvent = () => {
    history('/eventform');
  }
  
  const togglePanel = (action) => {
    if (action === 'close') {
        setTransform('translateX(100%)');
        setDim('none');
    } else {
        setTransform('translateX(0%)');
        setDim('block');
    }
  };

  Geocode.setApiKey("AIzaSyAZwTrchd6eBtPRB7m1VOz5Fh5smHba5Us");

  //1156 High St, Santa Cruz, CA
  // const inputAddress = (addy) => {
  //   if (address1 == "" && addy == "") {return;}
  //   else {
  //     setResultsHidden('none');
  //     console.log(addy);
  //     Geocode.fromAddress(addy).then(
  //       (response) => {
  //         console.log(response.results[0]);
  //         const latitude = response.results[0].geometry.location.lat;
  //         const longitude = response.results[0].geometry.location.lng;
  //         console.log("coordinates: ", latitude, longitude)
  //       },
  //       (error) => {
  //         console.error(error);
  //       }
  //     );
  //   }
  // }

  const getEventsFromDB = () => {
    fetch('http://localhost:3010/v0/eventform', {
      method: 'GET'
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        } 
        return res.json();
      })
      .then((json) => {
        console.log(json.data);
        setEvents(json.data);
      })
      .catch((err) => {
        console.log(err);
        alert('Error reading event');
      });
  }

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    console.log(latLng);
    // Use this latitude and longitude to retrieve data from database
  };

  /**
   * Generate formatted output of events
   * @param {*} events 
   * @returns 
   */
  const generateEvents = (events) => {
    console.log("Events", events)
    const eventsList = events.map((event) => {
      return (
        <div className='event'>
          <div className='eventHalf'>
            <div className='eventName'>{event.eventname}</div>
            <div className='eventDetails'>
              {event.eventlocation}
              {' '}
              {event.eventtime} 
              {' '}
              {dateFormat(event.eventdate, "dddd, mmm d, yyyy")}
            </div>
          </div>
          <div className='profileHalf'>
            <div id='eventPoster'>{event.email}</div>
            <div id='eventPicture'><img src={event.profilepic} /></div>
          </div>
          <div className='eventBorder'></div>
          <div className='eventDescription'>
            {event.eventdescription}
          </div>
        </div>
      )
    });
    return eventsList;
  }

  return (
    <div>
      <div id='sidePanel' style={{'transform': transformer}}>
        <div id='profileContainer'>
          <div id='profileName'>{name ? name : ''}</div>
          <div id='profilePicture'><img src = {icon ? icon : ''}/></div>
        </div>
        <div id='viewProfile'>View Profile</div>
        <div id='createPost' onClick={createEvent}>Create Post</div>
        <div id='signOut' onClick={logout}>Logout</div>
      </div>
      <div>
        <div id='pageHeader'>
          <img src={logo} alt='logo' className='logo'/>
          <div id='navBarContainer' onClick={()=>togglePanel('open')}>
            <div className='navBarLine'></div>
            <div className='navBarLine'></div>
            <div className='navBarLine'></div>
          </div>
        </div>
        <div id='pageDimmer' onClick={()=>togglePanel('close')}
        style={{'display': dim}}></div>
        <div id='eventsContainer'>
          <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}>
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <div id='locationContainer'>
                  <div id='setButton' onClick={()=>handleSelect(address)}>Search</div>
                  <input id= 'textPortion' type="text" name="location "{...getInputProps({ placeholder: "Enter address" })} />
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
                    );
                  })}
                </div>
              </div>
              )}
          </PlacesAutocomplete>
          {generateEvents(events)}
        </div>
      </div>
    </div>
  ); 
}

export default Home;
