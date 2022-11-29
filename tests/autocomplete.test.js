import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import {screen} from '@testing-library/react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';

import {EventForm} from '../frontend/src/components/EventForm';
import React from 'react';




const eventcomp = require('../frontend/src/components/EventForm').default;

const URL = 'http://localhost:3010/v0/eventform';

const server = setupServer(
  rest.get(URL, (req, res, ctx) => {
    return res(ctx.json({message: 'Hello CSE186'}));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

/**
 */
test('Button Clickable', async () => {
  render(eventcomp);
  //fireEvent.click(screen.getByText('post-bttn'));
  const buttonState = document.getElementsByClassName("post-bttn").disabled

  //if(buttonState == true) console.log("Hello")
  //await screen.findByText('Hello CSE186');
});