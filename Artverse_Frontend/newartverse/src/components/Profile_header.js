import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import Logo from '../assets/images/ArtVerse_Logo.png';
import SearchIcon from '../assets/images/search.png';
import '../styles/Landing_Page_Header.css';

function Profile_header() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
  e.preventDefault();
  if (searchQuery) {
    window.location.href = `/search?title=${searchQuery}`;
  }
};


  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchQuery) {
      handleSearchSubmit(e);
    }
  };

  return (
    <header className="header">
      <Link to="/" className="logo-link">
        <img src={Logo} alt="ArtVerse Logo" className="logo" />
      </Link>
      <div className="headings">
        <Link to="/About_Us" className="become-artist">About Us</Link>
        <Link to="/why-us" className="why-us">Digital Art</Link>
        <Link to="/become-artist" className="explore-digital-art">Become Artist</Link>
      </div>

      <form className="search-container" onSubmit={handleSearchSubmit}>
        <img src={SearchIcon} alt="Search Icon" className="search-icon" />
        <input
          type="text"
          placeholder="Search"
          className="search-input"
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleKeyPress}
        />
        {searchQuery && (
          <button type="submit" className="search-btn">Search</button>
        )}
      </form>

      <div className="buttons">
        <Link to="/signin" className="login_button" style={{ textDecoration: "none" }}>
          Login
        </Link>
        <Link to="/signup" className="signup_button" style={{ textDecoration: "none" }}>
          Signup
        </Link>
      </div>
    </header>
  );
}

export default Profile_header;
