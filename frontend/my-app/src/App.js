import logo from './img/LocalendarLogo.svg';
import './App.css';
import React, { useCallback } from 'react';
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import LoggedIn from "./loggedin_page";

class LoginBox extends React.Component {
  render() {
    return (
      <div id="sign-in-div"></div>
    );
  }
}

function App() {
  // state not designed to be used cross components
  const [ user, setUser ] = useState({});

  function handleSignIn(response) {
    var user_object = jwt_decode(response.credential);
    console.log(user_object);
    setUser(user_object);
    window.user = user;
    document.getElementById("sign-in-div").hidden = true;
    console.log(useState);
    //window.location.href = "./loggedin_page"
    //LoggedIn();
  }
  function handleSignOut(event) {
    setUser({});
    document.getElementById("sign-in-div").hidden = false;
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "792919383337-pnkkhet0sprdmlf00ojncglrujh3ve0r.apps.googleusercontent.com",
      callback: handleSignIn
    });

    google.accounts.id.renderButton(
      document.getElementById("sign-in-div"),
      { theme: "outline", size: "large" }
    )
  }, []);

  return (
    <div className='home'>
      <div className='logo-div'>
        <img src={logo} alt='logo' className='logo'/>
      </div>
      <div className='login-border'>
        <div className='login-box'>
          <LoginBox/>
          {
            // show signout button after sign in only
            Object.keys(user).length != 0 &&
            <div>
              <button onClick= { (e) => handleSignOut(e) }>Sign Out</button>
              <LoggedIn/>
            </div>
          }
          {
            // show user profile pic
            user &&
            <div>
              <img src={user.picture}></img>
            </div>
            //LoggedIn()
          }
          
        </div>
      </div>
    </div>
  );
}

export default App;