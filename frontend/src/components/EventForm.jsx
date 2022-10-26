import React from "react";
import "./EventForm.css";
import { useState } from "react";
import { useNavigate } from "react-router";

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
          <button className="post-bttn" type="submit">Post</button>
        </form>
      </div>
    </div>
  );
}

export default NewEvent;
