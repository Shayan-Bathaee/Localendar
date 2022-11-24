import logo from './img/LocalendarLogo.svg'
import React, { useCallback, useEffect, useState } from 'react'
import './App.css'

import jwt_decode from 'jwt-decode'
import { Navigate } from 'react-router-dom'

class LoginBox extends React.Component {
  render () {
    return (
      <div id='sign-in-div' />
    )
  }
}

function App () {
  // state not designed to be used cross components
  const [user, setUser] = useState({})
  const [redirectHome, setRedirectHome] = useState(false)

  function handleSignIn (response) {
    const user_object = jwt_decode(response.credential)
    setUser(user_object)
    document.getElementById('sign-in-div').hidden = true
    window.profile_name = user_object.name
    setRedirectHome(true)
  }
  function handleSignOut (event) {
    setUser({})
    setRedirectHome(false)
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: '792919383337-pnkkhet0sprdmlf00ojncglrujh3ve0r.apps.googleusercontent.com',
      callback: handleSignIn
    })

    google.accounts.id.renderButton(
      document.getElementById('sign-in-div'),
      { theme: 'outline', size: 'large' }
    )
  }, [])

  return (
    <div>
      <div className='home'>
        <div className='logoDiv'>
          <img src={logo} alt='logo' className='logoClass' />
          <div className='loginBox'>
            <div>
              <LoginBox />
              {redirectHome &&
                <Navigate to='/homepage' replace />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
