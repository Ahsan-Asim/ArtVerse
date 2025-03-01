import React from 'react';
import FeaturedImage1 from '../assets/images/Service_Page_Image1.png';
import '../styles/Service_Page_Main.css';

function Service_Page_Main() {
  return (
    <div className="featured-art1" style={{paddingTop:"150px"}}>
      <img src={FeaturedImage1} alt="Featured Art" className="background-image1" />
      <div className="overlay-text1">
        <h2 className="winner-text1">This Week Winner Portrait ArtPiece</h2>
        <p className="description-text1">
          Explore This Week’s MasterPiece Which is Voted By Best Artist. Our Curators Love it
        </p>
      </div>
    </div>
  );
}

export default Service_Page_Main;
