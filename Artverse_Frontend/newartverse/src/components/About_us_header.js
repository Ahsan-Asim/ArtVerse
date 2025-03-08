import React from 'react'
import Logo from "../assets/images/ArtVerse_Logo.png"; // Correct path to your logo
import SearchIcon from "../assets/images/search.png"; // Correct path to your search icon
import ShoppingIcon from "../assets/images/shopping.png"; // Correct path to your shopping icon
import LikeIcon from "../assets/images/heart.png"; // Correct path to your like icon
import ProfileIcon from "../assets/images/profile.png"; // Correct path to your profile icon

import '../styles/About_us_header.css'
function About_us_header() {
  return (
    <div>
      <header className="header">
        <a href="/" className="logo-link">
          <img src={Logo} alt="ArtVerse Logo" className="logo" />
        </a>
        <div className="headings">
          <a href="/become-artist" className="become-artist">
            Become Artist
          </a>
          <a href="/why-us" className="why-us">
            Why Us
          </a>
          <a href="/explore-digital-art" className="explore-digital-art">
            Explore Digital Art
          </a>
        </div>
        <div className="search-container60">
          <img src={SearchIcon} alt="Search Icon" className="search-icon" />
          <input type="text" placeholder="Search" className="search-input" />
        </div>

      </header>

      {/* New Row of Headings */}
      <div className="sub-headings">
        <a href="/paintings" className="sub-heading-item">
          Paintings
        </a>
        <a href="/sculptures" className="sub-heading-item">
          Sculptures
        </a>
        <a href="/photography" className="sub-heading-item">
          Photography
        </a>
        <a href="/digital-arts" className="sub-heading-item">
          Digital Arts
        </a>
        <a href="/auctions" className="sub-heading-item">
          Auctions
        </a>
        <a href="/events" className="sub-heading-item">
          Events
        </a>
      </div>
    </div>
  )
}

export default About_us_header