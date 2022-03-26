import React from 'react'
import "./login.css";

function login() {
    return (
        <div className='login'>
            <span className="loginTitle">Login</span>
            <form className="loginForm">
                <label>Email</label>
                <input type="text" classname="loginInput" placeholder='Enter Your Email...' />
                <label>Password</label>
                <input type="password" classname=" loginInput" placeholder='Enter Your password...' />
                <button className="loginButton">Login</button>
                
            </form>



        </div>
    )
}

export default login