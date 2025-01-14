import React from 'react';
import '../styles/Landing_Page_Main_Section.css'; // Ensure to import your custom CSS
import Artist_Image from '../assets/images/Landing_Page_Image1.png';
import { Link } from 'react-router-dom';

function Landing_Page_Main_Section() {
  return (
    <div className="landing-page-container">
    <div className="main-text">
      <h1 className='main-heading'><b>An Ultimate Heaven For Artist</b></h1>
      <h5 className='second-heading'>A seamless Ecosystem for Artist Where he can Sell/Buy Any All Kind of Visual Art.</h5>
      <Link to="/signup" className="button-link">
      <button className='landing_button'>Get Started</button>
      </Link>
    </div>

    {/* Image on the right side */}
    <div className="image-container">
      <img src={Artist_Image} alt="Artist Heaven" className="right-image" />
    </div>
  </div>
  )
}

export default Landing_Page_Main_Section
