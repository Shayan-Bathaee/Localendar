import logo from './img/LocalendarLogo.svg';
import React from 'react';
import './App.css';
import Home from './Home'

class LoginBox extends React.Component {
  render() {
    return (
      <p>Login stuff goes here!!!</p>
    );
  }
}


function App() {
  const [homeDisplay, setHomeDisplay] = React.useState('none');
  const [loginDisplay, setLoginDisplay] = React.useState('block');
  return (
    <div>
      <div style={{display: homeDisplay}}>
        <Home/>
      </div>
      <div className='home' style={{display: loginDisplay}}>
        <div className='logoDiv'>
          <img src={logo} alt='logo' className='logoClass'/>
          <div className='loginBox'>
          <div>
            <LoginBox/>
            <div onClick={()=>{setHomeDisplay('block'); setLoginDisplay('none')}}>Click me for home page!</div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default App;