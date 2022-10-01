import React from 'react'
import "./Navbar.css"
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { Context } from '../Context/Context';
import logo from "./logo.jpeg"
import { useEffect, useState } from 'react';
import axios from "axios";
import { FaAlignJustify } from "react-icons/fa";



function Navbar() {
    const { user, dispatch } = useContext(Context);
    const [toggle, setToggle] = useState(false);


    const handleLogout = () => {
        localStorage.clear();
        dispatch({ type: "LOGOUT" });
    };

    // API CALL for ALL Category   
    const [cats, setCats] = useState([]);

    useEffect(() => {
        const getCats = async () => {
            const res = await axios.get("https://api-anlakshya.azurewebsites.net/api/categories/");
            setCats(res.data);
        }
        getCats();
    }, [])

    return (

        <>

            <nav className='navCenter'>
                <div className='navLeft'>
                    <img className="navImage" src={logo}
                        alt="Anlakshya" />
                </div>
                <div className=''></div>
                <li className='navListItem'><Link style={{ textDecoration: "none", color: "inherit" }} to='/'><b>HOME</b></Link></li>
                <li className="navListItem dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" >
                    <Link style={{ textDecoration: "none", color: "inherit" }} to='/post' ><b>POSTS</b></Link>
                </li>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <Link className="dropdown-item" to={`/post/`}> ALL POSTS </Link>
                    {cats.map((c) => (
                        <li key={c._id}> <Link className="dropdown-item" to={`/post/?cat=${c.name}`}>
                            {c.name.toUpperCase()}
                        </Link>
                        </li>
                    ))}
                </ul>
                <li className='navListItem'><Link to='/post/?cat=project' style={{ textDecoration: "none", color: "inherit" }}><b>PROJECTS</b></Link></li>
                <li className='navListItem'><Link to='/about' style={{ textDecoration: "none", color: "inherit" }}><b>ABOUT US</b></Link></li>
                <li className="navListItem dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" >
                    <Link style={{ textDecoration: "none", color: "inherit" }} to='/about' ><b>POLICY</b></Link>
                </li>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <Link className="dropdown-item" to={`/privacy`}> PRIVACY POLICY</Link>
                    <Link className="dropdown-item" to={`/refund`}> REFUND POLICY</Link>
                    <Link className="dropdown-item" to={`/terms`}> TERMS & CONDITIONS</Link>
                </ul>
                <li className='navListItem'><Link to='/write' style={{ textDecoration: "none", color: "inherit" }}><b>{user && "WRITE"}</b></Link></li>
                {/* <li className='navListItem'><Link to='/settings' style={{ textDecoration: "none", color: "inherit" }}><b>{user && "PROFILE"}</b></Link></li> */}
                <li className='navListItem'><Link to='/' style={{ textDecoration: "none", color: "inherit" }} onClick={handleLogout}><b>{user && "LOGOUT"}</b></Link></li>
                {user && <div className='navRight'>
                    <li className='navListItem'><Link to={`/post/?user=${user.username}`} style={{ textDecoration: "none", color: "inherit" }}><b>{user.username.toUpperCase()}</b></Link></li>
                </div>}

            </nav>

            <nav className='navMobile'>
                
                <div className='nav'>
                    <Link style={{ textDecoration: "none", color: "inherit" }} to='/' ><h2 className='logo'>Anlakshya</h2></Link>
                    <div className="navbar-toggler" onClick={() => { setToggle(!toggle) }}>
                        <FaAlignJustify />
                    </div>
                </div>

                {toggle && <div className='navDropdown'>
                    <li className='navListItem'><Link style={{ textDecoration: "none", color: "inherit" }} to='/' onClick={() => { setToggle(!toggle) }}><b>HOME</b></Link></li>
                    <hr></hr>
                    <li className="navListItem dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" >
                        <Link style={{ textDecoration: "none", color: "inherit" }} to='/post' ><b>POSTS</b></Link>
                    </li>
                    <hr></hr>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <Link className="dropdown-item" to={`/post/`} onClick={() => { setToggle(!toggle) }}> ALL POSTS </Link>
                        {cats.map((c) => (
                            <li key={c._id}> <Link className="dropdown-item" to={`/post/?cat=${c.name}`} onClick={() => { setToggle(!toggle) }}>
                                {c.name.toUpperCase()}
                            </Link>
                            </li>
                        ))}
                    </ul>
                    <li className='navListItem'><Link to='/post/?cat=project' style={{ textDecoration: "none", color: "inherit" }} onClick={() => { setToggle(!toggle) }}><b>PROJECTS</b></Link></li>
                    <hr></hr>
                    <li className='navListItem'><Link to='/about' style={{ textDecoration: "none", color: "inherit" }} onClick={() => { setToggle(!toggle) }}><b>ABOUT US</b></Link></li>
                    <hr></hr>
                    <li className="navListItem dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" >
                        <Link style={{ textDecoration: "none", color: "inherit" }} to='/privacy' ><b>POLICY</b></Link>
                    </li>

                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <Link className="dropdown-item" to={`/privacy`} onClick={() => { setToggle(!toggle) }}> PRIVACY POLICY</Link>
                        <Link className="dropdown-item" to={`/refund`} onClick={() => { setToggle(!toggle) }}> REFUND POLICY</Link>
                        <Link className="dropdown-item" to={`/terms`} onClick={() => { setToggle(!toggle) }}> TERMS & CONDITIONS</Link>
                    </ul>
                    {user && <hr></hr>}
                    <li className='navListItem'><Link to='/write' style={{ textDecoration: "none", color: "inherit" }} onClick={() => { setToggle(!toggle) }}><b>{user && "WRITE"}</b></Link></li>
                    {/* {user && <hr></hr>}
                    <li className='navListItem'><Link to='/settings' style={{ textDecoration: "none", color: "inherit" }} onClick={() => { setToggle(!toggle) }}><b>{user && "PROFILE"}</b></Link></li> */}
                    {user && <hr></hr>}
                    <li className='navListItem' onClick={() => { setToggle(!toggle) }}><Link to='/' style={{ textDecoration: "none", color: "inherit" }} onClick={handleLogout} ><b>{user && "LOGOUT"}</b></Link></li>
                    {user && <hr></hr>}
                    {user && <li className='navListItem' onClick={() => { setToggle(!toggle) }}><Link to={`/post/?user=${user.username}`} style={{ textDecoration: "none", color: "inherit" }}><b>{user && user.username.toUpperCase()}</b></Link></li>}
                </div>
                }
            </nav>


        </>

    )
}

export default Navbar





