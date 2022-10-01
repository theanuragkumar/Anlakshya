import React, { useEffect } from 'react'
import "./sidebar.css";
import img from "./anu.webp"
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Sidebar() {

    const [cats, setCats] = useState([]);
    useEffect(() => {
        const getCats = async () => {
            const res = await axios.get("https://api-anlakshya.azurewebsites.net/api/categories/");
            setCats(res.data);
        }
        getCats();
    }, [])


    return (
        <div className='sidebar'>
            <div className="sidebarItem">
                <span className="sidebarTitle">
                    ABOUT ME
                </span>
                <img className="sideImg" src={img} alt="Anurag Kumar" loading="lazy" width="500" height="500"/>
                <p className="sideDesc">
                Hi, I am Anurag Kumar, Full Stack Developer and Part-time Youtuber working in one of the top MNC in the world. I try to help college students
                    in finding jobs and also trying to help them to prepare for the interview rounds. For more Detail, You can subscribe to my Youtube 
                    channel for more Job and Interview related videoes.
                </p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className="sidebarList">
                    {cats.map((c) => (
                        <Link to={`/post/?cat=${c.name}`} key={c._id}>
                            <li className="sidebarListItem">{c.name.charAt(0).toUpperCase()+c.name.slice(1)}</li>
                        </Link>
                    ))}

                </ul>
                <span className="sidebarTitle">FOLLOW US</span>
            </div>
            <div className="sidebarItem">               
                <div className="sidebarSocial">
                    <a href='https://www.youtube.com/channel/UChWfbgnmq70nlmBjMKl4HAg' target="_blank"  rel="noreferrer"><i className="sidebarIcon fa-brands fa-youtube"></i></a>
                    <a href='https://t.me/anlakshya' target="_blank"  rel="noreferrer"><i className="sidebarIcon fa-brands fa-telegram" ></i></a>
                    <a href='mailto:anlakshyatech@gmail.com' target="_blank"  rel="noreferrer"><i className="sidebarIcon fa-solid fa-envelope"></i></a>
                </div>
            </div>
        </div>
    )
}

export default Sidebar