import React from 'react'
import "./single.css"
import Sidebar from "../Sidebar/sidebar";
import SinglePost from '../SinglePost/singlePost';
function single() {
  return (
    <div className='single'>
        <SinglePost></SinglePost>
        <Sidebar />        
    </div>
  )
}

export default single