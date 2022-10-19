import React from 'react';
import logo from './img/LocalendarLogo.svg';
import Home from './Home'
import './App.css';
import {useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";

/**
 * Simple component with one state variable.
 *
 * @return {object} JSX
 */
function Login() {
  const [homeDisplay, setHomeDisplay] = React.useState('none');
  const [loginDisplay, setLoginDisplay] = React.useState('block');

  const [user, setUser] = React.useState({email: '', name: '', pic: ''});

  const history = useNavigate();

  

  function handleSignIn(response) {
    var userObject = jwt_decode(response.credential);
    console.log(userObject.email);
    const u = user;
    u["email"] = userObject.email;
    u["name"] = userObject.given_name;
    u["pic"] = userObject.picture;
    setUser(u);
    console.log(user);
    document.getElementById("signInDiv").hidden = true;
    // window.profile_name = user_object.name;
    // setRedirectHome(true);
    // console.log("Encoded JWT ID token: " + response.credential);
    fetch('http://localhost:3010/v0/homepage', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        // console.log(res);
        if (!res.ok) {
          throw res;
        } return res.json();
      })
      .then((json) => {
        console.log('correct password');
        console.log(json);
        localStorage.setItem('user', JSON.stringify(json));
        history('/homepage');
      })
      .catch((err) => {
        console.log(err);
        alert('Error logging in, please try again!!!!');
      });
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "792919383337-pnkkhet0sprdmlf00ojncglrujh3ve0r.apps.googleusercontent.com",
      callback: handleSignIn
    });

    google.accounts.id.renderButton (
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" },
    )
  }, []);

  return (
    <div>
      <div>
        <div style={{display: homeDisplay}}>
          <Home/>
        </div>
        <div className='home' style={{display: loginDisplay}}>
          <div className='logoDiv'>
            <img src={logo} alt='logo' className='logoClass'/>
            <div className='loginBox'>
              <div>
                <div id = "signInDiv"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}



export default Login;
