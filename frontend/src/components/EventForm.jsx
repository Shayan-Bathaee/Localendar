import React from "react";
import "./EventForm.css";
import { useState } from "react";
import { useNavigate } from "react-router";


var event = {
  eventname: "Steve's birthday party",
  email: "steve@ucsc.com",
  eventdate: "2022-12-14",
  eventtime: "12:00:00",
  eventlocation: "95060",
  eventdescription: "fat rager for steve's birthday"
};

function writeEventToDB() {
  /* write event to database */
  fetch('http://localhost:3010/v0/eventform', {
      method: 'POST',
      body: JSON.stringify(event), // currently, 'event' is the hardcoded event above
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          throw res;
        } return res.json();
      })
      .then((json) => {
        console.log('valid event');
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
    console.log(inputs);
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
              value={inputs.date || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Time    
            <input
              type="text"
              name="time"
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
          <button className="post-bttn" type="submit" onClick={writeEventToDB}>Post</button>
        </form>
      </div>
    </div>
  );
}

export default NewEvent;
