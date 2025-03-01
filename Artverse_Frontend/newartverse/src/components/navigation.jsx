import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/ArtVerse_Logo.png";
import SearchIcon from "../assets/images/search.png";
import '../styles/Navigation.css'
export const Navigation = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery) {
      window.location.href = `/search?title=${searchQuery}`;
    }
  };

  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        {/* Logo */}
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link to="/" className="navbar-brand">
            <img src={Logo} alt="ArtVerse Logo" className="logo" />
          </Link>
        </div>

        {/* Centered Welcome Message */}
        <div className="navbar-row center-content">
          <form className="search-container" onSubmit={handleSearchSubmit}>
            <h1 className="welcome-message">WELCOME TO ARTVERSE</h1>

            <img src={SearchIcon} alt="Search Icon" className="search-icon" />
            <input
              type="text"
              placeholder="Search Artwork"
              className="search-input"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {searchQuery && (
              <button type="submit" className="search-btn">
                Search
              </button>
            )}
          </form>
        </div>

        {/* Navigation Links and Buttons */}
        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav">
            <li>
              <a href="#about" className="page-scroll">
                About
              </a>
            </li>
            <li>
              <a href="#services" className="page-scroll">
                Services
              </a>
            </li>
            <li>
              <a href="#portfolio" className="page-scroll">
                Gallery
              </a>
            </li>
            <li>
              <a href="#testimonials" className="page-scroll">
                Testimonials
              </a>
            </li>
            <li>
              <a href="#team" className="page-scroll">
                Digital Art
              </a>
            </li>
            <li>
              <a href="#contact" className="page-scroll">
                Explore More
              </a>
            </li>
            <li>
              <div className="buttons">
                <Link to="/signin" className="login_button">
                  Login
                </Link>
                <Link to="/signup" className="signup_button">
                  Signup
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
