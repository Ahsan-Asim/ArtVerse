import React, { useEffect, useState } from "react";
import axios from "axios";
import DefaultProfileIcon from "../assets/images/default_profile.jpeg";
import StarImage from "../assets/images/Artist_Stars.png";
import "../styles/Home_Page_Artist_Display.css"; // Custom CSS

function Home_Page_Artist_Display() {
  const [artists, setArtists] = useState([]);
  const [userEmail, setUserEmail] = useState(sessionStorage.getItem("email"));
  const [followedArtists, setFollowedArtists] = useState(new Set());

  useEffect(() => {
    if (userEmail) {
      axios
        .get(`http://localhost:4000/api/artists/followed-artists/${userEmail}`)
        .then((response) => {
          const followed = new Set(response.data.map((artist) => artist.name));
          setFollowedArtists(followed);
        })
        .catch((error) =>
          console.error("Error fetching followed artists:", error)
        );
    }
  }, [userEmail]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/admin/artists")
      .then((response) => setArtists(response.data))
      .catch((error) => console.error("Error fetching artists:", error));
  }, []);

  const getArtistImageUrl = (imagePath) => {
    if (!imagePath) {
      return DefaultProfileIcon;
    }
    return `http://localhost:4000/${imagePath.replace(/\\/g, "/")}`;
  };

  const handleFollow = async (artistName) => {
    try {
      const response = await axios.post("http://localhost:4000/api/artists/follow", {
        artistName: artistName,
        email: userEmail,
      });

      setFollowedArtists((prev) => new Set(prev.add(artistName)));
      alert(response.data.message);
    } catch (error) {
      console.error("Error following artist:", error);
      alert("An error occurred while following the artist.");
    }
  };

  return (
    <div id="artists" className="home-artist-section text-center">
      <div className="container">
        <div className="section-title">
          <h2>Meet Our Artists</h2>
          <p>Explore the creativity and talent of our top artists.</p>
        </div>
        <div id="row">
          {artists
            .sort(() => Math.random() - 0.5)
            .slice(0, 4)
            .map((artist, index) => (
              <div key={index} className="col-md-3 col-sm-6 artist">
                <div className="thumbnail">
                  <img
                    src={getArtistImageUrl(artist.artistDetails?.image)}
                    alt={artist.artistDetails?.name || "Artist"}
                    className="team-img"
                  />
                  <div className="caption">
                    <h4>{artist.artistDetails?.name || "Unknown Artist"}</h4>
                    <div className="stars">
                      <img src={StarImage} alt="Star" />
                    </div>
                    <button
                      className={`follow-button ${
                        followedArtists.has(artist.artistDetails?.name)
                          ? "following"
                          : ""
                      }`}
                      onClick={() => handleFollow(artist.artistDetails?.name)}
                    >
                      {followedArtists.has(artist.artistDetails?.name)
                        ? "Following"
                        : "Follow"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home_Page_Artist_Display;
