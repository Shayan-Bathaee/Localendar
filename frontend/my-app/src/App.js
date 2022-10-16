import logo from './img/LocalendarLogo.svg';
import './App.css';
import React from 'react';

class LoginBox extends React.Component {
  render() {
    return (
      <p>Login stuff goes here!!!</p>
    );
  }
}


function App() {
  return (
    <div className='home'>
      <div className='logo-div'>
        <img src={logo} alt='logo' className='logo'/>
      </div>
      <div className='login-border'>
        <div className='login-box'>
          <LoginBox/>
        </div>
      </div>
    </div>
  );
}

export default App;