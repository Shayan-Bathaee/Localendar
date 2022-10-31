import logo from './img/LocalendarLogo.svg';
import React from 'react';
import './Home.css';
import dateFormat from 'dateformat';
import {json, useNavigate} from 'react-router-dom';

/**
 * @return {object} JSX Table
 */
function Home() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [events, setEvents] = React.useState([]);
  const [name, setName] = React.useState(user ? user.name : '');
  const [icon, setPic] = React.useState(user ? user.pic : '');
  const [error, setError] = React.useState('Logged Out');
  const [toggle, setToggle] = React.useState({
    panelTransform: 'translateX(100%)',
    eventsContainerDim: 'rgb(214, 196, 171)',
    eventDim: '#2E5584',
  });

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
      setToggle({
        panelTransform: 'translateX(100%)',
        eventsContainerDim: 'rgb(214, 196, 171)',
        eventDim: '#2E5584',
      });
    } else {
      setToggle({
        panelTransform: 'translateX(0%)',
        eventsContainerDim: 'rgb(87, 79, 69)',
        eventDim: '#15263b',
      });
    }
  };

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

  /**
   * Generate formatted output of events
   * @param {*} events 
   * @returns 
   */
  const generateEvents = (events) => {
    console.log("Events", events)
    const eventsList = events.map((event) => {
      return (
        <div className='event'
          style={{ backgroundColor: toggle.eventDim }}>
          <div className='eventHalf'>
            <div className='eventName'>{event.eventname}</div>
            <div className='eventDetails'>
              {event.eventlocation} - &nbsp;
              {event.eventtime} &nbsp;
              {dateFormat(event.eventdate, "dddd, mmm d, yyyy")}
            </div>
          </div>
          <div className='profileHalf'>
            <div id='eventPoster'>{event.email}</div>
            <div id='eventPicture'><img src={{icon} ? icon : ''} /></div>
          </div>
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
      <div id='sidePanel' style={{transform: toggle.panelTransform}}>
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
          <div id='navBarContainer' onClick={() => togglePanel('open')}>
            <div className='navBarLine'></div>
            <div className='navBarLine'></div>
            <div className='navBarLine'></div>
          </div>
        </div>
        <div id='eventsContainer' onClick={() => togglePanel('close')}
          style={{backgroundColor: toggle.eventsContainerDim}}>
          {generateEvents(events)}
        </div>
      </div>
    </div>
  ); 
}

export default Home;
