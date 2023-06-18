import React from 'react'
import "./header.css"
import bg from "./bg.webp";


function Header() {
  return (<>

    <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={bg} className="d-block w-100 image" alt="Home - Anlakshya"/>
          <div className="carousel-caption  d-md-block heading">
            <h1 className='headerTitlesLg'>Welcome</h1>
            <p className='headerTitlesSm'>Find your dream job with us...</p>
            <a  href='https://www.youtube.com/channel/UChWfbgnmq70nlmBjMKl4HAg' target="_blank" rel="noopener noreferrer"><i className="icon fa-brands fa-youtube" style={{  fontSize: "100px"  }}></i></a>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default Header