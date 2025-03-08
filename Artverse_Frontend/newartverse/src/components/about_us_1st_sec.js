import React from 'react';
import '../styles/about_us_1st_sec.css';
import image from '../assets/images/Ellipse 18.png';
import rectangle from '../assets/images/Rectangle 69.png';

function About_us_1st_sec() {
  return (
    <div className='container'>
      <div className="top-section">
        <h1>About Us</h1>
        <img src={image} className="image-bottom" alt="Decorative Element" />
      </div>
      <div className="bottom-section">
        <div className="left-section">
          <img src={rectangle} alt="Left Section Graphic" />
        </div>
        <div className="right-section">
          <header>OUR MISSION</header>
          <p>At Artverse, our mission is to bridge the gap between artists and art enthusiasts by creating a vibrant, accessible platform where creativity thrives. We empower artists to showcase their work, connect with an engaged community, and bring unique, meaningful art to the world. Through innovative tools and a supportive environment, we aim to make art more discoverable, collectible, and appreciated globally.</p>
        </div>
      </div>
    </div>
  );
}

export default About_us_1st_sec;