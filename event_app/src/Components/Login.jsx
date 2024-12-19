import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/api';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const  navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
    
      localStorage.setItem('accessToken', response.data.access);
      alert('Login successful');
      navigate('/home')

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{height:"500px",width:"600px",marginLeft:"500px",marginTop:"200px"}}>
    <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: 'column', gap: "15px" }}>
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

    <div class="form-floating">
      <input 
      type="email" 
      class="form-control" 
      id="floatingInput" 
      placeholder="name@example.com"
      onChange={(e) => setFormData({ ...formData, email: e.target.value })}/>
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating">
      <input 
      type="password" 
      class="form-control" 
      id="floatingPassword" 
      placeholder="Password"
      onChange={(e) => setFormData({ ...formData, password: e.target.value })}/>
      <label for="floatingPassword">Password</label>
    </div>

    <button class="btn btn-primary w-100 py-2" type="submit">Sign in</button>

  </form>
  </div>
  );
};


export default Login;
