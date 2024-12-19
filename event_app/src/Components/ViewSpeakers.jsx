import React, { useState,useEffect } from 'react'
import { viewSpeakers } from '../api/api';

function ViewSpeakers() {
    const [speakers,setSpeakers] = useState ([])

    const handleViewSpeaker = async () => {
        try {
          const token = localStorage.getItem('accessToken');
          const response = await viewSpeakers(token);
         
            console.log(response)
            setSpeakers(response.data)
           
          
        } catch (error) {
          console.error('Error in viewing sessions', error);
        }
      };
      useEffect(() => {
        
        handleViewSpeaker()
      }, []);

  return (
    <div>
        <table className="table table-striped">
             <thead>
            <tr>
            <th scope="col">Name</th>
            <th scope="col">Email </th>
            </tr>
        </thead>
        <tbody>
            {speakers.map((speaker)=>(
                <tr key={speaker.id}> 
                <td>{speaker.name}</td>
                <td>{speaker.email}</td>
                </tr>

            ))}
            
        </tbody>
        
        </table>
    </div>
  )
}

export default ViewSpeakers