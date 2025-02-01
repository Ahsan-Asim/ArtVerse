import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/ArtVerse_Logo.png";
import SearchIcon from "../assets/images/search.png";
import ShoppingIcon from "../assets/images/shopping.png";
import LikeIcon from "../assets/images/heart.png";
import DefaultProfileIcon from "../assets/images/default_profile.jpeg";
import "../styles/Home_Page_Navigation.css";

export const Home_Page_Navigation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [artistProfileImage, setArtistProfileImage] = useState("");

  useEffect(() => {
    const artistEmail = sessionStorage.getItem("email"); // Fetch email from sessionStorage
    if (artistEmail) {
      fetch(`http://localhost:4000/api/artist/image?email=${artistEmail}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.profileImage) setArtistProfileImage(data.profileImage);
        })
        .catch((err) => console.error("Error fetching artist data: ", err));
    }
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?title=${searchQuery}`;
    }
  };

  const handleAddToCart = () => {
    const userEmail = sessionStorage.getItem("email");
    if (!userEmail) {
      alert("Please sign in to add items to your cart.");
      return;
    }
  };

  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        {/* Logo Section */}
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#navbar-collapse"
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

        {/* Welcome Message Section */}
        <div className="welcome-message">
          <h1>Welcome to ArtVerse!</h1>
        </div>

        {/* Search Section */}
        <div className="navbar-row center-content">
          <form className="search-container" onSubmit={handleSearchSubmit}>
            <img src={SearchIcon} alt="Search Icon" className="search-icon" />
            <input
              type="text"
              placeholder="Search Artworks"
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button type="submit" className="search-btn">
                Search
              </button>
            )}
          </form>
        </div>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="navbar-collapse">
          <ul className="nav navbar-nav">
            <li>
              <Link to="/become-artist" className="nav-link">
                Become Artist
              </Link>
            </li>
            <li>
              <Link to="/about" className="nav-link">
                Why Us
              </Link>
            </li>
            <li>
              <Link to="/paintings" className="nav-link">
                Paintings
              </Link>
            </li>
            <li>
              <Link to="/sculptures" className="nav-link">
                Sculptures
              </Link>
            </li>
            <li>
              <Link to="/photography" className="nav-link">
                Photography
              </Link>
            </li>
          </ul>

          {/* Icons Section */}
          <div className="icon-links">
            <Link to="/cartpage" className="icon-link" onClick={handleAddToCart}>
              <img src={ShoppingIcon} alt="Cart" className="icon shopping-icon" />
            </Link>
            <Link to="/favorites" className="icon-link">
              <img src={LikeIcon} alt="Favorites" className="icon like-icon" />
            </Link>
            <Link to="/profile" className="icon-link">
              <img
                src={
                  artistProfileImage
                    ? `http://localhost:4000/${artistProfileImage}`
                    : DefaultProfileIcon
                }
                alt="Profile"
                className="icon profile-icon"
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
