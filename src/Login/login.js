import React, { useContext } from 'react'
import "./login.css";
import { useRef, useState } from 'react';
import { Context } from '../Context/Context';
import axios from 'axios';

function Login() {

    const userRef = useRef();
    const passwordRef = useRef();
    const {dispatch, isFetching} = useContext(Context);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
          const res = await axios.post("https://api-anlakshya.azurewebsites.net/api/auth/login", {
            email: userRef.current.value,
            password: passwordRef.current.value,
          });

          const { authtoken  } = res.data;


          localStorage.setItem("auth-token", authtoken);
          setSuccess(false);
          
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data.others });
        } catch (err) {
          setSuccess(true);
          dispatch({ type: "LOGIN_FAILURE" });
        }
      };

    return (
        <div className='login'>
            <span className="loginTitle">Login</span>
            <form className="loginForm" onSubmit={handleSubmit}>
                <label>Email</label>
                <input type="email" className="loginInput" placeholder='Enter Your Username...' ref={userRef} />
                <label>Password</label>
                <input type="password" className=" loginInput" placeholder='Enter Your password...'  ref={passwordRef}/>
                <button className="loginButton" type='submit' disabled={isFetching}>Login</button>
                {success &&
                (<span style={{color:"red", marginTop:"10px" , alignSelf:"center"}}>Invalid credentials</span>)
                }
                
            </form>



        </div>
    )
}

export default Login