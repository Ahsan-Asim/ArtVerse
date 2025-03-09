import React from 'react';
import FeaturedImage1 from '../assets/images/Service_Page_Image1.png';
import '../styles/ServicePage/Service_Page_Main.css';

function Service_Page_Main() {
  return (
    <div className="featured-art1">
      <img src={FeaturedImage1} alt="Featured Art" className="background-image1" />
      <div className="overlay-text1">
        <h2 className="winner-text1">This Week’s Winner Portrait Art Piece</h2>
        <p className="description-text1">
          Explore This Week’s Masterpiece, Voted by the Best Artists. Our Curators Love It.
        </p>
      </div>
    </div>
  );
}

export default Service_Page_Main;
