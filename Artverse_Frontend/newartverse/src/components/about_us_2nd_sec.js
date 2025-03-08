import React from "react";
import FeaturedImage1 from '../assets/images/Rectangle 85.png';
import '../styles/about_us_2nd_sec.css';
function About_us_2nd_sec() {
  return (
    <div className="featured-art1">
    <img src={FeaturedImage1} alt="Featured Art" className="background-image1" />
    <div className="overlay-text1">
    <p className="description-text1">
          Artverse: Where creativity connects and collections come to life.
          Discover, create, and celebrate art in a thriving digital community.
        </p>
    </div>
  </div>
  );
}

export default About_us_2nd_sec;