import React from 'react';
import {render} from '@testing-library/react';

import Login from '../components/Login.jsx';
import App from '../App.jsx';

test('login page', () => {
  render(<App />);
});