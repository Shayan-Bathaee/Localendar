import logo from './img/LocalendarLogo.svg'
import React from 'react'
import './App.css'
import Home from './Home'

/**
 *
 * @param {string} props
 * @return {string} val
 */
class LoginBox extends React.Component {
/**
 *
 * @param {string} props
 * @return {string} val
 */
  render () {
    return (
      <p>Login stuff goes here!!!</p>
    )
  }
}

/**
 *
 * @param {string} props
 * @return {string} val
 */
function LoginTemplate () {
  const [homeDisplay, setHomeDisplay] = React.useState('none')
  const [loginDisplay, setLoginDisplay] = React.useState('block')
  return (
    <div>
      <div style={{ display: homeDisplay }}>
        <Home />
      </div>
      <div className='home' style={{ display: loginDisplay }}>
        <div className='logoDiv'>
          <img src={logo} alt='logo' className='logoClass' />
          <div className='loginBox'>
            <div>
              <LoginBox />
              <div onClick={() => {
                setHomeDisplay('block')
                setLoginDisplay('none')
              }}
              >Click me for home page!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginTemplate
