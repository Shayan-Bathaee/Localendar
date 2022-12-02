import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import './components/App.css'
import EventForm from './components/EventForm'

/**
 * App component to keep track of routes in the program
 *
 * @return {object} JSX
 */
function App () {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/homepage' element={<Home />} />
          <Route path='/eventform' element={<EventForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
