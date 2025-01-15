import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/ArtVerse_Logo.png";

export const Navigation = (props) => {
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          {/* Logo Section */}
          <Link to="/" className="navbar-brand">
            <img src={Logo} alt="ArtVerse Logo" className="logo" />
          </Link>
        </div>
        {/* Navbar Content */}
        <div className="navbar-content">
          {/* First Row: Welcome Message */}
          <div className="navbar-row welcome-message">
            <h1>WELCOME TO ARTVERSE</h1>
          </div>
          {/* Second Row: Navigation Links */}
          <div className="navbar-row">
            <ul className="nav navbar-nav navbar-right">
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
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
