import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DefaultProfileIcon from "../assets/images/default_profile.jpeg";

export const Landing_Page_Artist_Section = (props) => {
  const [artists, setArtists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/admin/artists")
      .then((response) => {
        // Shuffle the artists and set only the top 4
        const shuffledArtists = response.data.sort(() => 0.5 - Math.random());
        setArtists(shuffledArtists.slice(0, 4));
      })
      .catch((error) => console.error("Error fetching artists:", error));
  }, []);

  const getArtistImageUrl = (imagePath) => {
    if (!imagePath) {
      return DefaultProfileIcon;
    }
    return `http://localhost:4000/${imagePath.replace(/\\/g, "/")}`;
  };

  return (
    <div id="artists" className="text-center">
      <div className="container">
        <div className="col-md-8 col-md-offset-2 section-title">
          <h2>Meet Our Artists</h2>
          <p>Discover the talent and creativity of our artists.</p>
        </div>
        <div id="row">
          {artists.map((artist, index) => (
            <div key={index} className="col-md-3 col-sm-6 artist">
              <div className="thumbnail">
                <img
                  src={getArtistImageUrl(artist.artistDetails?.image)}
                  alt={artist.artistDetails?.name || "Artist"}
                  className="team-img"
                />
                <div className="caption">
                  <h4>{artist.artistDetails?.name}</h4>
                  <p>{artist.artistDetails?.country}</p>
                  <button
                    className="follow-button"
                    onClick={() => navigate("/signup")}
                  >
                    Follow Artist
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
