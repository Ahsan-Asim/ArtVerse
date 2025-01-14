import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for client-side routing
import '../styles/Service_Page_Header.css';
import Logo from '../assets/images/ArtVerse_Logo.png'; // Correct path to your logo
import SearchIcon from '../assets/images/search.png'; // Correct path to your search icon
import ShoppingIcon from '../assets/images/shopping.png'; // Correct path to your shopping icon
import LikeIcon from '../assets/images/heart.png'; // Correct path to your like icon
import ProfileIcon from '../assets/images/profile.png'; // Correct path to your profile icon

function Service_Page_Header() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    // Prevent default form submission behavior
    e.preventDefault();
    if (searchQuery) {
      // Redirect to the search results page with the query parameter
      window.location.href = `/search?title=${searchQuery}`;    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchQuery) {
      // Trigger search on Enter key press
      handleSearchSubmit(e);
    }
  };

  return (
    <div>
      <header className="header">
        <Link to="/" className="logo-link">
          <img src={Logo} alt="ArtVerse Logo" className="logo" />
        </Link>
        <div className="headings">
          <Link to="/become-artist" className="become-artist">Become Artist</Link>
          <Link to="/why-us" className="why-us">Why Us</Link>
          <Link to="/explore-digital-art" className="explore-digital-art">Explore Digital Art</Link>
        </div>
        <form className="search-container50" onSubmit={handleSearchSubmit}>
          <img src={SearchIcon} alt="Search Icon" className="search-icon" />
          <input
            type="text"
            placeholder="Search"
            className="search-input"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress} // Listen for Enter key press
          />
          {searchQuery && (
            <button type="submit" className="search-btn">Search</button>
          )}
        </form>
        <Link to="/cart" className="icon-link">
          <img src={ShoppingIcon} alt="Shopping Icon" className="shopping-icon" />
        </Link>
        <Link to="/favorites" className="icon-link">
          <img src={LikeIcon} alt="Like Icon" className="like-icon" />
        </Link>
        <Link to="/profile" className="icon-link">
          <img src={ProfileIcon} alt="Profile Icon" className="profile-icon" />
        </Link>
      </header>

      {/* New Row of Headings */}
      <div className="sub-headings">
        <Link to="/painting" className="sub-heading-item">Paintings</Link>
        <Link to="/sculptures" className="sub-heading-item">Sculptures</Link>
        <Link to="/photography" className="sub-heading-item">Photography</Link>
        <Link to="/digital-arts" className="sub-heading-item">Digital Arts</Link>
        <Link to="/auctions" className="sub-heading-item">Auctions</Link>
        <Link to="/events" className="sub-heading-item">Events</Link>
      </div>
    </div>
  );
}

export default Service_Page_Header;
