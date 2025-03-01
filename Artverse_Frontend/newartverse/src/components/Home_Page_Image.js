import React from 'react';
import '../styles/Home_Page_Image.css'; // Ensure to import your custom CSS
import FeaturedImage from '../assets/images/home1.png'; // Replace with the correct path to your image

function Home_Page_Image() {
  return (
    <div className="featured-art">
      <img src={FeaturedImage} alt="Featured Art" className="background-image" />
      <div className="overlay-text">
        <h2 className="winner-text">This Week Winner Portrait ArtPiece</h2>
        <p className="description-text">
          Explore This Week’s MasterPiece Which is Voted By Best Artist. Our Curators Love it
        </p>
      </div>
    </div>
  );
}

export default Home_Page_Image;
