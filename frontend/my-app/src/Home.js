import logo from './img/LocalendarLogo.svg'
import React from 'react'
import './Home.css'
import App from './App'

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      panelTransform: 'translateX(100%)',
      eventsContainerDim: 'rgb(214, 196, 171)',
      eventDim: '#2E5584'
    }
  }

  togglePanel = (action) => {
    if (action === 'close') {
      this.setState({
        panelTransform: 'translateX(100%)',
        eventsContainerDim: 'rgb(214, 196, 171)',
        eventDim: '#2E5584'
      })
    } else {
      this.setState({
        panelTransform: 'translateX(0%)',
        eventsContainerDim: 'rgb(87, 79, 69)',
        eventDim: '#15263b'
      })
    }
  }

  handleSignOut (event) {
    App.setUser({})
    App.setRedirectHome(false)
  }

  render () {
    return (
      <div>
        <div id='sidePanel' style={{ transform: this.state.panelTransform }}>
          <div id='profileContainer'>
            <div id='profileName'>{window.profile_name}</div>
            <div id='profilePicture' />
          </div>
          <div id='viewProfile'>View Profile</div>
          <div id='createPost'>Create Post</div>
          <div id='signOut' onClick={(e) => this.handleSignOut(e)}>Sign Out</div>
        </div>
        <div>
          <div id='pageHeader'>
            <img src={logo} alt='logo' className='logo' />
            <div id='navBarContainer' onClick={() => this.togglePanel('open')}>
              <div className='navBarLine' />
              <div className='navBarLine' />
              <div className='navBarLine' />
            </div>
          </div>
          <div
            id='eventsContainer' onClick={() => this.togglePanel('close')}
            style={{ backgroundColor: this.state.eventsContainerDim }}
          >
            <div className='event' style={{ backgroundColor: this.state.eventDim }} />
            <div className='event' style={{ backgroundColor: this.state.eventDim }} />
            <div className='event' style={{ backgroundColor: this.state.eventDim }} />
            <div className='event' style={{ backgroundColor: this.state.eventDim }} />
            <div className='event' style={{ backgroundColor: this.state.eventDim }} />
            <div className='event' style={{ backgroundColor: this.state.eventDim }} />
          </div>
        </div>
      </div>
    )
  }
}

export default Home
