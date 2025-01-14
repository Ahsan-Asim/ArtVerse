import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import Logo from "../assets/images/ArtVerse_Logo.png";
import SearchIcon from "../assets/images/search.png";
import "../styles/Landing_Page_Header.css";

function Landing_Page_Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage the toggle

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
    if (e.key === "Enter" && searchQuery) {
      handleSearchSubmit(e);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState); // Toggle the menu open/close
  };

  return (
    <header className="header">
      <Link to="/" className="logo-link">
        <img src={Logo} alt="ArtVerse Logo" className="logo" />
      </Link>

      {/* Hamburger menu toggle for smaller screens */}
      <div className="menu-toggle" onClick={toggleMenu}>
        &#9776; {/* Hamburger icon */}
      </div>

      {/* Navigation Bar */}
      <nav className={`nav-bar ${isMenuOpen ? "open" : ""}`}>
        <Link to="/About_Us" className="nav-item">
          About Us
        </Link>
        <Link
          to="#"
          className="nav-item"
          onClick={(e) => {
            e.preventDefault();
            alert("This page is under construction.");
          }}
        >
          Digital Art
        </Link>
        <Link to="/become-artist" className="nav-item">
          Become Artist
        </Link>
      </nav>

      {/* Search Bar */}
      <form className="search-container" onSubmit={handleSearchSubmit}>
        <img src={SearchIcon} alt="Search Icon" className="search-icon" />
        <input
          type="text"
          placeholder="Search Artwork"
          className="search-input"
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleKeyPress}
        />
        {searchQuery && (
          <button type="submit" className="search-btn">
            Search
          </button>
        )}
      </form>

      <div className="buttons">
        <Link
          to="/signin"
          className="login_button"
          style={{ textDecoration: "none" }}
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="signup_button"
          style={{ textDecoration: "none" }}
        >
          Signup
        </Link>
      </div>
    </header>
  );
}

export default Landing_Page_Header;
