import React from 'react';
import '../styles/Landing_Page_Artist_Section.css'; // Ensure to import your custom CSS
import Star_Image from '../assets/images/Artist_Stars.png';
import Artist_Image from '../assets/images/Artist_Image.png';

function Landing_Page_Artist_Section() {
  return (
    <div className="artist-section">
      <h1 className='main-heading1'>Meet Our Artists</h1>
      <div className="bold-line"></div>

      <div className="artist-cards1">
        {/* Each artist's card */}
        <div className="artist-card card1">
          <img src={Artist_Image} alt="Artist 1" className="artist-image" />
          <div className="artist-text">
            <h3>Rohit Kumar</h3>
            <div className="stars">
              <img src={Star_Image} alt="Stars" className="star-image" />
            </div>
          </div>
        </div>

        <div className="artist-card card2">
          <img src={Artist_Image} alt="Artist 2" className="artist-image" />
          <div className="artist-text">
            <h3>Sh Raza</h3>
            <div className="stars">
              <img src={Star_Image} alt="Stars" className="star-image" />
            </div>
          </div>
        </div>

        <div className="artist-card card3">
          <img src={Artist_Image} alt="Artist 3" className="artist-image" />
          <div className="artist-text">
            <h3>Jatin</h3>
            <div className="stars">
              <img src={Star_Image} alt="Stars" className="star-image" />
            </div>
          </div>
        </div>

        <div className="artist-card card4">
          <img src={Artist_Image} alt="Artist 4" className="artist-image" />
          <div className="artist-text">
            <h3>Ahsan Asim</h3>
            <div className="stars">
              <img src={Star_Image} alt="Stars" className="star-image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing_Page_Artist_Section;
