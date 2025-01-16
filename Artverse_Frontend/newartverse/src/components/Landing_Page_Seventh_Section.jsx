import React from 'react';
import { Link } from 'react-router-dom';

export const Landing_Page_Seventh_Section = (props) => {
  return (
    <div>
      <div className="main-container" style={{marginTop: '100px'}}>
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

