import { React, useContext, useState } from 'react'
import { Context } from '../Context/Context';
import axios from 'axios';

import "./setting.css"
function Setting() {

  const { user } = useContext(Context);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    try {
      const authtoken = localStorage.getItem("auth-token")
      axios.put("https://api-anlakshya.azurewebsites.net/api/users/" + user._id, updatedUser, {
        headers: {
          "auth-token": authtoken
        }
      }).then(() => {
        setSuccess(true);
      })


    } catch (error) {
      alert(error);
    }

  }

  const showPassword = ()=>{
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }


  return (
    <div className='settings'>
      <div className="settingsWrapper">
        <form className="settingsForm" onSubmit={handleSubmit}>
          <span className="settingsUpdateTitle">Update Your Account</span>
          <label>Username</label>
          <input type="text" placeholder={user.username} onChange={e => setUsername(e.target.value)} readOnly />
          <label>Email</label>
          <input type="email" placeholder={user.email} onChange={e => setEmail(e.target.value)} required/>
          <label>Password</label>
          <input type="password" onChange={e => setPassword(e.target.value)} id="password" required minLength={5}></input>
          <label><input type="checkbox" onClick={showPassword} />  Show Password </label>
          <button className='settingsSubmit' type='submit'>Update</button>

          {success && <span style={{ color: "red", textAlign: "center" }}>Profile has been updated...</span>}
        </form>  
      </div>


    </div>

  )
}

export default Setting