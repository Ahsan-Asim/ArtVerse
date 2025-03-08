import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/ArtVerse_Logo.png";
import SearchIcon from "../assets/images/search.png";
import cameraIcon from "../assets/images/camera.jpg";
import "../styles/Navigation.css";

export const Navigation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [artistProfileImage, setArtistProfileImage] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const artistEmail = sessionStorage.getItem("email");
    if (artistEmail) {
      fetch(`http://localhost:4000/api/artist/image?email=${artistEmail}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.profileImage) setArtistProfileImage(data.profileImage);
        })
        .catch((err) => console.error("Error fetching artist data: ", err));
    }
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?artwork=${searchQuery}`;
    }
  };

  return (
    <nav id="nav-container" className="navbar navbar-default navbar-fixed-top">
      <div className="wrapper">
        <div className="nav-header">
          <button
            className={`nav-toggle ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </button>
          <Link to="/" className="brand-logo">
            <img src={Logo} alt="ArtVerse Logo" className="brand-image" />
          </Link>
        </div>

        <div className="welcome-section">
          <h1>Welcome to ArtVerse!</h1>
        </div>

        <div className="nav-row center-box">
          <form className="search-box" onSubmit={handleSearchSubmit}>
            <img src={SearchIcon} alt="Search Icon" className="search-symbol" />
            <input
              type="text"
              placeholder="Search Artwork"
              className="search-field"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <Link to="/image_search">
              <img src={cameraIcon} alt="Camera Icon" className="photo-icon" />
            </Link>
          </form>
        </div>

        <div className={`nav-collapse ${menuOpen ? "open" : ""}`} id="nav-collapse">
          <ul className="nav navbar-nav">
            <li><a href="/About_Us" className="nav-item">About</a></li>
            <li><a href="#services" className="nav-item">Services</a></li>
            <li><a href="#portfolio" className="nav-item">Gallery</a></li>
            <li><a href="#testimonials" className="nav-item">Testimonials</a></li>
            <li><a href="#team" className="nav-item">Digital Art</a></li>
            <li><a href="#contact" className="nav-item">Explore More</a></li>
            <li>
              <div className="buttons">
                <Link to="/signin" className="login_button">Login</Link>
                <Link to="/signup" className="signup_button">Signup</Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
