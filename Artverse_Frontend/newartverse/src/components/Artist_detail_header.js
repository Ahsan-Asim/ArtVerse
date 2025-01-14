import React from 'react'
import Logo from '../assets/images/ArtVerse_Logo.png'; // Correct path to your logo
import ProfileIcon from '../assets/images/default_profile.jpeg'; // Correct path to your profile icon
import '../styles/Artist_detail_header.css'; // Ensure to import your custom CSS

function ArtistDetailHeader() {
  return (
    <div>
    <header className="header-container">
      <a href="/" className="logo-link">
        <img src={Logo} alt="ArtVerse Logo" className="logo-img" />
      </a>
      <div className="nav-links">
        <a href="/profile" className="nav-link profile-link">Profile</a>
        <a href="/manage_artworks" className="nav-link manage-artworks-link">Manage Artworks</a>
        <a href="/sales_dashboard" className="nav-link sales-dashboard-link">Sales Dashboard</a>
        <a href="/offers_dashboard" className="nav-link offers-dashboard-link">Offers Dashboard</a>
      </div>
      <a href="/profile" className="profile-icon-link">
        <img src={ProfileIcon} alt="Profile Icon" className="profile-icon-img" />
      </a>
    </header>
  </div>
  )
}

export default ArtistDetailHeader;
