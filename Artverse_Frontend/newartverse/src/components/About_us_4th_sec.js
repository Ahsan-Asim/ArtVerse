import React from 'react';
import '../styles/About_us_4th_sec.css';
import SideImage from '../assets/images/Landing_Page_Image3.png'; // Correct path to your profile icon
import ArtistsSign from '../assets/images/Artist_Sign.png'; // Correct path to your profile icon


function About_us_4th_sec() {
  return (
      <div className="container1">
        <div className="image-container">
          <img
            src={SideImage}
            alt="Description"
            className="styled-image"
          />
        </div>
        <div className="text-container">
          <h3 className='con-heading'>Find Art You Love</h3>
          <p className='con-para'>“At Artverse, we make it our mission to help you discover and buy from the best emerging artists around the world. Whether you’re looking to discover a new artist, add a statement piece to your home, or commemorate an important life event, Artverse is your portal to thousands of original works by today’s top artists.”</p>

          <img src={ArtistsSign} alt='' className='con-pic'></img>
          <h3 className='con-head3'>Chief Curator & VP, Art Advisory</h3>
        </div>
      </div>
  )
}

export default About_us_4th_sec;