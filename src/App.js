import Navbar from "./Navbar/Navbar";
import Home from "./Home/Home";
import Single from "./Page/Single";
import Write from "./Write/Write";
import Setting from "./Settings/Setting";
import Login from "./Login/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Context } from "./Context/Context";
import { useContext } from "react";
import AllPost from "./AllPost/AllPost";
import LoadingBar from 'react-top-loading-bar'
import React, { useState } from 'react';
import About from "./Components/AboutUs/About";



function App() {
    const {user}= useContext(Context);
    const [progress, setProgress] = useState(0);

  return (
    <Router>
      <Navbar />
      <LoadingBar
        color='#f11946'
        progress={progress}
        height={3}  
      />
      <Routes>
        <Route  path="/" element={<Home setProgress={setProgress} />} />
        <Route  path="/post/" element={<AllPost setProgress={setProgress}/>} />
        <Route  path="/login" element={user ? <Home  setProgress={setProgress}/> : <Login setProgress={setProgress}/>} />
        <Route  path="/post/:postId" element={<Single setProgress={setProgress}/>} />
        <Route  path="/write" element={user ?  <Write setProgress={setProgress}/> : <Home setProgress={setProgress}/> } />
        <Route  path="/settings" element={user ? <Setting /> : <Login />} />
        <Route  path="/about" element={<About page="about"/>} />
        <Route  path="/privacy" element={<About page="privacy"/>} />
        <Route  path="/terms" element={<About page="terms"/>} />
        <Route  path="/refund" element={<About page="refund"/>} />
      </Routes>
      
    </Router>
    
  );
}

export default App;
