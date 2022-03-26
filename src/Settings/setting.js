import React from 'react'
import Sidebar from '../Sidebar/sidebar';
import img from "./anurag_pic.jpg"
import "./setting.css"
function setting() {
    return (
        <div className='settings'>
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update Your Account</span>
                    <span className="settingsDeleteTitle">Delete Your Account</span>
                </div>
                <form  className="settingsForm">
                    <label>Profile Picture</label>
                    <div className="settingsPP">
                        <img src={img} 
                        alt="" />
                    <label htmlFor='fileInput'>
                        <i className="settingsPPIcon fa-solid fa-circle-user"></i>
                    </label>
                    <input type="file"  id='fileInput' style={{display:"none"}}/>
                    </div>
                    <label>UserName</label>
                    <input type="text" placeholder="Anurag"   />
                    <label>Email</label>
                    <input type="email" placeholder="anurag@gmail.com"   />
                    <label>Password</label>
                    <input type="password"  />

                    <button className='settingsSubmit'>Update</button>

                </form>
            </div>


            
            <Sidebar />
            
        </div>

    )
}

export default setting