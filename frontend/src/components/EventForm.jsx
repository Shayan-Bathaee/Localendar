import React from "react";
import "./EventForm.css";
import { useState } from "react";
import { useNavigate } from "react-router";


// writes an event to the database
// event: an object containing:
  // eventname
  // email
  // eventdate ('YYYY-MM-DD')
  // eventtime ('HH:MM:SS')
  // eventlocation
  // eventdescription
function writeEventToDB(newEvent) {
  /* write event to database */
  fetch('http://localhost:3010/v0/eventform', {
      method: 'POST',
      body: JSON.stringify(newEvent),
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
        console.log(json);
      })
      .catch((err) => {
        console.log(err);
        alert('Error setting up event');
      });
}


function NewEvent() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handlePost = (event) => {
    event.preventDefault();
    // get user 
    const user = JSON.parse(localStorage.getItem('user'));
    // build new event 
    var newEvent = {
      eventname: inputs.event_name,
      email: user.email,
      eventdate: inputs.date,
      eventtime: inputs.time,
      eventlocation: inputs.location,
      eventdescription: inputs.description
    }
    writeEventToDB(newEvent);
    history('/homepage'); // take user back to homepage when event is done
    history.go(0);
  };

  const history = useNavigate();

  const cancel = () => {
    history('/homepage');
  }

  return (
    <div>
      <div>
        <h1 className="page-title"> Create an Event </h1>
      </div>
      <div className="event-form">
        <form onSubmit={handlePost}>
          <label>
            Event Name
            <input
              type="text"
              name="event_name"
              value={inputs.event_name || ""}
              onChange={handleChange}
            />
          </label>

          <label>
            Date    
            <input
              type="text"
              name="date"
              placeholder="YYYY-MM-DD"
              value={inputs.date || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Time    
            <input
              type="text"
              name="time"
              placeholder="HH:MM:SS"
              value={inputs.time || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Location    
            <input
              type="text"
              name="location"
              value={inputs.location || ""}
              onChange={handleChange}
            />
          </label>
          <br></br>
          <label>
            Description    
            <textarea
              type="text"
              name="description"
              value={inputs.description || ""}
              onChange={handleChange}
              id="description-box"
            />
          </label>
          <br></br>
          <button className="cancel-bttn "type="button" onClick={cancel}>Cancel</button>
          <button className="post-bttn" type="submit">Post</button>
        </form>
      </div>
    </div>
  );
}

export default NewEvent;
