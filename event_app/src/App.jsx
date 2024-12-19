import { useEffect, useState } from 'react'
import './App.css'
import Schedulerapp from './Components/Schedulerapp'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Register from './Components/Register'
import Login from './Components/Login'
import Protected from './Components/Protected'
import Navbar from './Components/Navbar'
import CreateSession from './Components/CreateSession'
import { listEvent } from './api/api';
import CreateSpeaker from './Components/CreateSpeaker'
import Home from './Components/Home'
import ViewSessions from './Components/ViewSessions'
import Table from './Components/Table'
import ViewSpeakers from './Components/ViewSpeakers'


function App() {
  const [events, setEvents] = useState([]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error('Access token is missing.');
        return;
      }
      const response = await listEvent(token);

      // Debug API response structure
      console.log(response);
      setEvents(response.data || []); // Adjust based on API response
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  };
  
  useEffect(() => {
    
    fetchData();
  }, []);


  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/Protected' element={<Protected/>}/>
        <Route path='/home' element={<Schedulerapp events={events} />}>

        <Route path='/home/' element={<Home events={events} fetchData={fetchData}/>}/>
          <Route path='/home/create_session' element={<CreateSession events={events}/>}/>
          <Route path='/home/create_speakers' element={<CreateSpeaker/>}/>
          <Route path='/home/view_sessions' element={<ViewSessions events={events} />}/>
          <Route path='/home/list_event' element={<Table/>}/>
          <Route path='/home/view_speakers' element={<ViewSpeakers/>}/>

        </Route>
        <Route path="/" element={<Navbar />} />
       
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
