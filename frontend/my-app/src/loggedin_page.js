import './App.css';
import React from 'react';

class ProfileBox extends React.Component {
    render() {
      return (
        <p>Profile pic goes here</p>
      );
    }
  }
  
  class LogoutButton extends React.Component {
    render() {
      return (
        <p>Logout Button goes here</p>
      );
    }
  }
  
  
  function LoggedIn() {
    return (
      <div className='home'>
        <div className='header-div'>
          <h1> You are logged in, [insert name]! </h1>
        </div>
        <div className='profile-border'>
          <div className='profile-box'>
            <ProfileBox/>
          </div>
          <br></br>
          <br></br>
          <div className='logout-button'>
            <LogoutButton/>
          </div>
        </div>
      </div>
    );
  }
  
  export default LoggedIn;