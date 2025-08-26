import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import './Signup.css'
import { handleSuccess } from '../utils';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const Home = () => {
    const [loggedInUser, setLoggedInUser] = useState('');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess("Logged out successfully");
        setTimeout(()=>{
            navigate('/login');
        }, 1000);
    }

    useEffect(()=>{
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    }, []);
  return (
    <div>
      <h2>Welcome {loggedInUser} !!</h2>
      <button onClick={handleLogout}>Logout</button>
      <ToastContainer/>
    </div>
  )
}

export default Home
