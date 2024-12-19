import React, { useState } from 'react'
import { createSpeaker } from '../api/api';

function CreateSpeaker() {
    const [speaker,setSpeaker] = useState({
        name : '',
        email : '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const token = localStorage.getItem('accessToken');
          const response = await createSpeaker(token,speaker);
    
          if (response.status === 201) {
            console.log(response.data.message);
            alert('Speaker created');
            setSpeaker({ name: '', email: '' });
          }
        } catch (err) {
          console.error('Error creating speaker:', err);
          const errorMessage = err.response?.data?.error || 'Failed to create speaker. Please try again.';
          alert(errorMessage);
        }
      };


  return (
    <div>
        <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name of Speaker</label>
    <input type="text" 
    className="form-control" 
    id="speaker_name" 
    aria-describedby="emailHelp"
    value={speaker.name}
            onChange={(e) =>
              setSpeaker({ ...speaker, name: e.target.value })
            }/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email Address</label>
    <input type="email" 
    className="form-control" 
    id="exampleInputPassword1"
    value={speaker.email}
            onChange={(e) =>
              setSpeaker({ ...speaker, email: e.target.value })
            }/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        
    </div>
  )
}

export default CreateSpeaker