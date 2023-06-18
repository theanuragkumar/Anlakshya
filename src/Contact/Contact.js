import {React, useState} from 'react'
import emailjs from 'emailjs-com';
import "./contact.css";

function Contact() {
    const [alert, setAlert] = useState(false);
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

    function sendEmail(e) {
        setAlert(false);
        e.preventDefault();  
        emailjs.sendForm('service_6mu3uab', 'template_0jkqbge', e.target, 'iKnsdL-7gV-5EuHsP')
            .then((result) => {
                setAlert(true); 
                setName("");
                setMessage("");   

            }, (error) => {
                alert("Some Error Occured" + error.text);
            });
    }



    return (<>
        <div className='contact'>
            <span className="contactTitle">Contact us</span>
            {
            alert && <div className="alert alert-success mt-3" width="100" role="alert">
                Message Sent Successfully...
            </div>
            }
            <form className="contactForm" onSubmit={sendEmail}>
                <label>Email</label>
                <input type="email"  value={name} className="contactInput" placeholder='Enter Your Email...' name='from_name' onChange={e => setName(e.target.value)} required/>           
                <label>Text Me</label>
                <textarea type="text" value={message} rows="4" cols="50" className=" contactInput" placeholder='Text Me...' name='message' onChange={e => setMessage(e.target.value)} required/>
                <button className="contactButton" type='submit'>Contact us</button>
            </form>
        </div>
    </>

    )
}

export default Contact