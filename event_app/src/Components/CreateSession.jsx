import React, { useState, useEffect } from 'react';
import { createSession } from '../api/api';

function CreateSession({ events }) { // Assuming `events` is passed as a prop
  const [sessionData, setSessionData] = useState({
    event: '',
    title: '',
    start_time: '',
    end_time: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(sessionData)
      const token = localStorage.getItem('accessToken');
      const response = await createSession(token,sessionData);

      if (response.status === 201) {
        console.log(response.data.message);
        alert('Session created');
        setSessionData({ event_id: '', title: '', start_time: '', end_time: '' });
      }
    } 
    catch (err) {
      console.error('Error creating session:', err);
      const errorMessage = err.response?.data?.error || 'Failed to create session. Please try again.';
      alert(errorMessage);
    }
  };

  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="event_id" className="form-label">Event</label>
          <select
            className="form-control"
            name="event_id"
            id="event_id"
            value={sessionData.event}
            onChange={(e) =>
              setSessionData({ ...sessionData, event: e.target.value })
            }
          >
            <option value="">Select an Event</option>
            {events.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Session Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={sessionData.title}
            onChange={(e) =>
              setSessionData({ ...sessionData, title: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="starttime" className="form-label">Start Time</label>
          <input
            type="time"
            className="form-control"
            id="starttime"
            value={sessionData.start_time}
            onChange={(e) =>
              setSessionData({ ...sessionData, start_time: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="endtime" className="form-label">End Time</label>
          <input
            type="time"
            className="form-control"
            id="endtime"
            value={sessionData.end_time}
            onChange={(e) =>
              setSessionData({ ...sessionData, end_time: e.target.value })
            }
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateSession;
