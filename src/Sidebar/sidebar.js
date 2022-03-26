import React from 'react'
import "./sidebar.css";
import img from "./anurag_pic.jpg"
function sidebar() {
  return (
    <div className='sidebar'>
        <div className="sidebarItem">
            <span className="sidebarTitle">
                ABOUT ME

            </span>
            <img className="sideImg" src={img} alt="" />
            <p>
                Full-Stack java developer having hands on experience on HTML, CSS, 
                JavaScript, BootStrap, React Js, Java, Spring, SpringBoot, MicroServices, Kafka, Python,
                 and Data Science.
            </p>
        </div>
        <div className="sidebarItem">
            <span className="sidebarTitle">CATEGORIES</span>
            <ul className="sidebarList">
                <li className="sidebarListItem">Life</li>
                <li className="sidebarListItem">Music</li>
                <li className="sidebarListItem">Style</li>
                <li className="sidebarListItem">Sport</li>
                <li className="sidebarListItem">Tech</li>
                <li className="sidebarListItem">Cinema</li>
            </ul>
        </div>
        <div className="sidebarItem">
            <span className="sidebarTitle">FOLLOW US</span>
            <div className="sidebarSocial">
                <i className="sidebarIcon fa-brands fa-facebook-square"></i>
                <i className="sidebarIcon fa-brands fa-twitter-square"></i>
                <i className="sidebarIcon fa-brands fa-instagram-square"></i>
                <i className="sidebarIcon fa-solid fa-envelope"></i>

            </div>
        </div>
       
        
        </div>
  )
}

export default sidebar