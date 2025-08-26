import React from 'react'
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import { handleError, handleSuccess } from '../utils';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const [loginInfo, setLoginInfo] = useState({
        email : '',
        password : ''
    })
    const handleChange = (e) => {
        const {name, value} = e.target;

        const copyLoginInfo = {...loginInfo};
        copyLoginInfo[name] = value;

        setLoginInfo(copyLoginInfo);
    }
    const handleLogin = async (e) => {
        e.preventDefault();

        const {email, password} = loginInfo;

        if(!email || !password) {
            return handleError("Please enter full details");
        }

        try{
            const url = "http://localhost:8080/auth/login";
            let response = await fetch(url, {
                method : "POST",
                headers : {
                    'Content-Type' : "application/json"
                },
                body : JSON.stringify(loginInfo)
            });

            const result = await response.json();
            
            const {success, jwtToken, message, name, error} = result;

            if(success) {
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                
                handleSuccess(message);
                setTimeout (()=>{
                    navigate('/home');
                }, 2000);
                
            } else if(error) {
                const details = error?.details[0].message;
                                handleError(details);
               
            } else if(!success) {
                handleError(message);
            }

        } catch(err) {
            handleError(err);
        }
    }

  return (
    <>
    <div>Login</div>
    <form onSubmit={handleLogin}>
       

        <label htmlFor='email'>Email</label>
        <input name='email' placeholder='Enter your email address...'
        type='email'
        onChange={handleChange}
        value={loginInfo.email}
        />

        <label htmlFor='password'>Password</label>
        <input name='password' placeholder='Enter password'
        type='password'
        onChange={handleChange}
        value={loginInfo.password}
        />

        <button type='submit'>Login</button>

        <span>Not registered yet ? <Link to='/signup'>Sign Up</Link> </span>

    </form>
    <ToastContainer />
    </>
  )
}

export default Login
