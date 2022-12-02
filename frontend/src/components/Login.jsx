import React, { useEffect, useState } from 'react'
import logo from './img/LocalendarLogo.svg'
import Home from './Home'
import './App.css'
import { useNavigate } from 'react-router-dom'

import jwt_decode from 'jwt-decode'

/**
 * Login component
 *
 * @return {object} JSX
 */
function Login () {
  const [homeDisplay, setHomeDisplay] = React.useState('none')
  const [loginDisplay, setLoginDisplay] = React.useState('block')

  const [user, setUser] = React.useState({ email: '', name: '', pic: '' }) // begin with empty user

  const history = useNavigate()

  function handleSignIn (response) {

    const userObject = jwt_decode(response.credential) // get entire google response
    const u = user // retreive email, name, and profile picture
    u.email = userObject.email
    u.name = userObject.given_name
    u.pic = userObject.picture

    setUser(u) // set user state variable 
    document.getElementById('signInDiv').hidden = true // hide the sign in div

    // write the user information to the database
    fetch('http://localhost:3010/v0/homepage', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw res
        } return res.json()
      })
      .then((json) => {
        localStorage.setItem('user', JSON.stringify(json)) // add the user to local storage for easy reference
        history('/homepage') // navigate to homepage
      })
      .catch((err) => {
        console.log(err)
        alert('Error logging in, please try again!!!!')
      })
  }

  // set up google sign in div
  // https://www.youtube.com/watch?v=roxC8SMs7HU&list=LL&index=1&t=845s&ab_channel=CooperCodes
  useEffect(() => {
    google.accounts.id.initialize({
      client_id: '792919383337-pnkkhet0sprdmlf00ojncglrujh3ve0r.apps.googleusercontent.com',
      callback: handleSignIn
    })

    google.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      { theme: 'outline', size: 'large' }
    )
  }, [])

  return (
    <div>
      <div>
        <div style={{ display: homeDisplay }}>
          <Home />
        </div>
        <div className='home' style={{ display: loginDisplay }}>
          <div className='logoDiv'>
            <img src={logo} alt='logo' className='logoClass' />
            <div className='loginBox'>
              <div id='signInDiv' />
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Login
