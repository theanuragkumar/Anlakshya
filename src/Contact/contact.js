import React from 'react'
import "./contact.css";

function contact() {
    return (
        <div className='contact card'>
            <span className="contactTitle">Contact Us</span>
            <form className="contactForm">
                <label>Email</label>
                <input type="text" classname="contactInput" placeholder='Enter Your Email...' />
                <label>Text Me</label>
                <textarea type="text" rows="4" cols="50"  classname=" contactInput" placeholder='Text Me...' />
                <button className="contactButton">Contact us</button>                
            </form>
        </div>
    )
}

export default contact