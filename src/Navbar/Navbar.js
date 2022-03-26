import React from 'react'
import "./Navbar.css"
import {Link} from "react-router-dom";

function Navbar() {
    const user = true;
    return (
        <div className='nav'>
            <div className='navLeft'>
                <i className="navIcon fa-brands fa-facebook-square"></i>
                <i className="navIcon fa-brands fa-twitter-square"></i>
                <i className="navIcon fa-brands fa-instagram-square"></i>
                <i className="navIcon fa-solid fa-envelope"></i>
            </div>
            <div className='navCenter'>
                <ul className='navList'>
                    <li className='navListItem'><Link  style={{textDecoration:"none" ,color:"inherit"}} to='/' >HOME</Link></li>
                    <li className='navListItem'><Link to='/about' style={{textDecoration:"none" ,color:"inherit"}}>ABOUT</Link></li>
                    <li className='navListItem'><Link to='/contact' style={{textDecoration:"none" ,color:"inherit"}}>CONTACT</Link></li>
                    <li className='navListItem'><Link to='/write' style={{textDecoration:"none" ,color:"inherit"}}>{user && "WRITE"}</Link></li>
                    <li className='navListItem'><Link to='/' style={{textDecoration:"none" ,color:"inherit"}}>{user && "LOGOUT"}</Link></li>
                </ul>

            </div>
            <div className='navRight'>{user &&
            <img className="navImage" src="https://media-exp1.licdn.com/dms/image/C4E03AQE-Z2bRcPA9bg/profile-displayphoto-shrink_400_400/0/1647220749463?e=1653523200&v=beta&t=DePD4uYZtlkubvLrMs0sbllg9LALV99Ju5C8G0qEkSA"
            alt="" />

            }
                
                <i className="navSearch fa-solid fa-magnifying-glass"></i>

            </div>
        </div>
    )
}

export default Navbar