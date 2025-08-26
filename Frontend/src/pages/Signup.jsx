import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Signup.css';
import {ToastContainer} from 'react-toastify';
import { useState } from 'react';
import { handleError, handleSuccess } from '../utils';

const Signup = () => {

    const navigate = useNavigate();
    const[signupInfo, setSignupInfo] = useState({
        name :"",
        email : "",
        password : ""
    })

    const handleChange = (e) => {

        const {name, value } = e.target;

        const copySignupInfo = {...signupInfo};

        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);

    }

    const handleSignup = async (e) => {
       e.preventDefault();
        //client validation
        const {name, email, password } = signupInfo;

        if(!name || !email || !password) {
            return handleError("Please fill the form correctly");
        }

        try{
            const url = "http://localhost:8080/auth/signup";
            const response = await fetch(url,{
                method : "POST", 
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(signupInfo) 
            });

            const result = await response.json();

            console.log(result);

            const {success, message, error}  = result;

            if(success) {
                handleSuccess(message);

                setTimeout (()=>{
                    navigate('/login');
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
    <div>Sign up page</div>
    <form onSubmit={handleSignup}>
        <label htmlFor='name'>Name</label>
        <input name='name' placeholder='Enter name...'
        autoFocus
        type='text'
        onChange={handleChange}
        value={signupInfo.name}
        />

        <label htmlFor='email'>Email</label>
        <input name='email' placeholder='Enter your email address...'
        type='email'
        onChange={handleChange}
        value={signupInfo.email}
        />

        <label htmlFor='password'>Password</label>
        <input name='password' placeholder='Enter password'
        type='password'
        onChange={handleChange}
        value={signupInfo.password}
        />

        <button type='submit'>Sign up</button>

        <span>Already have an account ? <Link to='/login'>Login</Link> </span>

    </form>

     

    <ToastContainer />
    </>
  )
}

export default Signup
