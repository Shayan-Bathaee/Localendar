import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Login from './components/Login';
import Home from './components/Home'

/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/homepage" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
