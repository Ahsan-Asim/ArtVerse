import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/ArtVerse_Logo.png";
import SearchIcon from "../assets/images/search.png";
import ShoppingIcon from "../assets/images/shopping.png";
import LikeIcon from "../assets/images/heart.png";
import DefaultProfileIcon from "../assets/images/default_profile.jpeg";
import cameraIcon from "../assets/images/camera.jpg";
import "../styles/HomePage/Home_Page_Navigation.css";

export const NavigationBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [artistProfileImage, setArtistProfileImage] = useState(DefaultProfileIcon);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const artistEmail = sessionStorage.getItem("email");
    if (artistEmail) {
      fetch(`http://localhost:4000/api/artist/image?email=${artistEmail}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.profileImage) {
            setArtistProfileImage(data.profileImage);
          }
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
    <nav className="navbar navbar-default navbar-fixed-top">
      <div className="wrapper">
        {/* Logo Section */}
        <div className="nav-header">
          {/* Toggle Button */}
          <button className={`nav-toggle ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </button>

          <Link to="/" className="brand-logo">
            <img src={Logo} alt="ArtVerse Logo" className="brand-image" />
          </Link>
          {/* Icons Section (Like, Cart & Profile) */}
        <div className="nav-icons">
          <Link to="/favorites">
            <img src={LikeIcon} alt="Like Icon" className="icon like-icon" />
          </Link>
          <Link to="/cart">
            <img src={ShoppingIcon} alt="Shopping Icon" className="icon cart-icon" />
          </Link>
          <Link to="/profile">
            <img src={artistProfileImage} alt="Profile Icon" className="icon profile-icon" />
          </Link>
        </div>
        </div>

        {/* Welcome Section */}
        <div className="welcome-section">
          <h1>Welcome to ArtVerse!</h1>
        </div>

        {/* Search Section */}
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

        {/* Navigation Menu */}
        <div className={`nav-collapse ${menuOpen ? "open" : ""}`}>
          <ul className="nav-list">
            <li>
              <Link to="/become-artist" className="nav-item">
                Become Artist
              </Link>
            </li>
            <li>
              <Link to="/about" className="nav-item">
                Why Us
              </Link>
            </li>
            <li>
              <Link to="/Paintings_Market" className="nav-item">
                Paintings
              </Link>
            </li>
            <li>
              <Link to="/sculptures" className="nav-item">
                Sculptures
              </Link>
            </li>
            <li>
              <Link to="/photography" className="nav-item">
                Photography
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
