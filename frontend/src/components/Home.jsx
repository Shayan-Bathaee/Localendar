import logo from './img/LocalendarLogo.svg';
import React from 'react';
import './Home.css';
import {useNavigate} from 'react-router-dom';


/**
 * @return {object} JSX Table
 */
function Home() {
/** 
  constructor(props) {
    super(props);
    this.state = {
      panelTransform: 'translateX(100%)',
      eventsContainerDim: 'rgb(214, 196, 171)',
      eventDim: '#2E5584',
    };
  }
*/

  const user = JSON.parse(localStorage.getItem('user'));
  const [name, setName] = React.useState(user ? user.name : '');
  const [icon, setPic] = React.useState(user ? user.pic : '');
  const [error, setError] = React.useState('Logged Out');
  const [toggle, setToggle] = React.useState({
    panelTransform: 'translateX(100%)',
    eventsContainerDim: 'rgb(214, 196, 171)',
    eventDim: '#2E5584',
  });

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

  const generateEvents = () => {
    var event = (
      <div className='event' 
        style={{backgroundColor: toggle.eventDim}}>
        <div className='eventHalf'>
          <div className='eventName'>UCSC Convention For College Students Who Go To Stevenson College</div>
          <div className='eventDetails'>Santa, Cruz - 9:00pm - 12/11/22</div>
        </div>
        <div className='profileHalf'>
        <div id='eventPoster'>Collegestudent435</div>
        <div id='eventPicture'><img src = {icon ? icon : ''}/></div>
        </div>
        <div className='eventDescription'>
          This is a random message that was generated for the project, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          This is a random message that was generated for the project, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          This is a random message that was generated for the project, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
       </div>
      </div>);
      return [event, event, event, event];
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
          {generateEvents()}
          </div>
        </div>
      </div>
    );
  
}



export default Home;
