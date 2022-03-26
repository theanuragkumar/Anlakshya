import React from 'react'
import "./home.css";
import Header from '../Header/header';
import Posts from '../Posts/posts';
import Sidebar from '../Sidebar/sidebar';

function home() {
  return (
    <>
      <div className='backgroundImg'>
        <Header></Header>
      </div>
      <div className='home' >
        <Posts></Posts>
        <Sidebar></Sidebar>

      </div>
    </>
  )
}

export default home