import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Landing_Page_Seventh_Section.css'; // Ensure to import your custom CSS

function Landing_Page_Seventh_Section() {
  return (
    <div>
      <div className="main-container">
        <h1 className='main-h1'><b>Find Your Artist on Finger Tips</b></h1>

        <div className="buttons1">
          <Link to="/signup" className="button-link">
            <button className="get">Get Started</button>
          </Link>
          <Link to="/About_Us" className="button-link">
            <button className="about">About Us</button>
          </Link>
        </div>

        <h6 className='co-h6'>Are You Artist? Join Artverse</h6>
      </div>
    </div>
  );
}

export default Landing_Page_Seventh_Section;
