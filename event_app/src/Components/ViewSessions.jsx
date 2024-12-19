import React, { useState,useEffect } from 'react'
import {getEventsWithSessions} from '../api/api'

function ViewSessions({events}) {
  const [eventList,setEventList] = useState([])

  const handleViewSession = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await getEventsWithSessions(token);
     
        console.log(response)
        setEventList(response.data)
       
      
    } catch (error) {
      console.error('Error in viewing sessions', error);
    }
  };
  useEffect(() => {
    
    handleViewSession()
  }, []);



  return (
    <div>
      <h1 style={{textAlign:"center"}}>Events Table</h1>
      {eventList.map((event)=>(
        <div key={event.id} style={{marginBottom:"2rem"}}>
          <h2>{event.title} ({event.date})</h2>
           <table border={1} style={{width:"100%",borderCollapse:"collapse"}} className="table table-striped">
            <thead>
              <tr>
                  <th>Session Title</th>
                  <th>Start Time</th>
                  <th>End time</th>
              </tr>
            </thead>
            <tbody>
              {event.sessions.map((session)=>(
                <tr key={session.id}>
                  <td>{session.title}</td>
                  <td>{session.start_time}</td>
                  <td>{session.end_time}</td>
                </tr>
              ))}
            </tbody>

           </table>
        </div>
      ))}

      
    </div>
  )
}

export default ViewSessions