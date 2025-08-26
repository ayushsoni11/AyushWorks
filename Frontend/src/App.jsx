import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from "./pages/Signup.jsx";

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Navigate to='/login' />} />
      <Route path='/home' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
    </Routes>
    </>
    
  )
}

export default App
