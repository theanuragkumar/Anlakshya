import React from 'react'
import { Link } from 'react-router-dom'
import "./footer.css"
function Footer() {
    return (
        <footer>
            <div className="footer-content">
                <h3>Anlakshya</h3>
                <p>Anlakshya - Find your dream job with us...<br></br>For more details, Please follow us</p>
                <div className='socials'>

                    <a href='https://www.youtube.com/channel/UChWfbgnmq70nlmBjMKl4HAg' target="_blank" rel="noopener noreferrer"><i className="Icon fa-brands fa-youtube"></i></a>
                    <a href='https://t.me/anlakshya' target="_blank"  rel="noreferrer"><i className="Icon fa-brands fa-telegram" ></i></a>
                    <a href='mailto:anlakshyatech@gmail.com' target="_blank" rel="noopener noreferrer"><i className="Icon fa-solid fa-envelope"></i></a>
                    {/* <i className="Icon fa-brands fa-facebook-square"></i>
                    <i className="Icon fa-brands fa-twitter-square"></i>
                    <i className="Icon fa-brands fa-instagram-square"></i>
                    <i className="Icon fa-solid fa-envelope"></i> */}
                </div>
            </div>
            <div className="footer-bottom">
                <p>copyright &copy;2022 <Link to="/">Anlakshya</Link>  </p>
                <div className="footer-menu">
                <ul className="f-menu">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/about">Contact</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            </div>
            </div>
            
        </footer>
    )
}

export default Footer