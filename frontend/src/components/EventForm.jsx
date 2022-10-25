import React from "react";
import "./EventForm.css";
import { useState } from "react";

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
          <br></br>
          <label>
            Date    
            <input
              type="text"
              name="date"
              value={inputs.date || ""}
              onChange={handleChange}
            />
          </label>
          <br></br>
          <label>
            Time    
            <input
              type="text"
              name="time"
              value={inputs.time || ""}
              onChange={handleChange}
            />
          </label>
          <br></br>
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
            <input
              type="text"
              name="description"
              value={inputs.description || ""}
              onChange={handleChange}
              size="50"
            />
          </label>
          <br></br>
          <br></br>
          <button type="submit">Post</button>
        </form>
      </div>
    </div>
  );
}

export default NewEvent;
