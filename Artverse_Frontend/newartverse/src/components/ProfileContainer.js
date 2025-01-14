import React from "react";
import ArtistImage from "../assets/images/Artist_Image.png";

const ProfileContainer = ({ name, location, description }) => {
  return (
    <div className="profile-container">
      <img src={ArtistImage} alt={name} className="profile-image" />
      <div className="profile-content">
        <h3 className="profile-name">{name}</h3>
        <p className="profile-location">{location}</p>
        <div className="button-container">
          <button className="button">Verify</button>
          <button className="button2">Delete</button>
        </div>
        <p className="profile-description">{description}</p>
      </div>
    </div>
  );
};

export default ProfileContainer;