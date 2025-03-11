import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Artist_detail_main.css";

// Modal Component (no changes to this)
function Modal({ artist, closeModal, refreshArtists }) {
  const handleVerify = async () => {
    try {
      await axios.put("http://localhost:4000/api/admin/verifyUser", { email: artist.email });
      artist.isVerified = true;
      refreshArtists();
    } catch (error) {
      console.error("Error verifying user:", error);
    }
  };

  const handleUnverify = async () => {
    try {
      await axios.put("http://localhost:4000/api/admin/unverifyUser", { email: artist.email });
      artist.isVerified = false;
      refreshArtists();
    } catch (error) {
      console.error("Error unverifying user:", error);
    }
  };

  const handleBlock = async () => {
    try {
      await axios.put("http://localhost:4000/api/admin/blockUser", { email: artist.email });
      artist.isBlocked = true;
      refreshArtists();
    } catch (error) {
      console.error("Error blocking user:", error);
    }
  };

  const handleUnblock = async () => {
    try {
      await axios.put("http://localhost:4000/api/admin/unblockUser", { email: artist.email });
      artist.isBlocked = false;
      refreshArtists();
    } catch (error) {
      console.error("Error unblocking user:", error);
    }
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={closeModal}>×</button>
        <h3>{artist.artistDetails.name}</h3>
        <p><strong>Email:</strong> {artist.email}</p>
        <p><strong>Phone:</strong> {artist.phone}</p>
        <p><strong>City:</strong> {artist.artistDetails.city}</p>
        <p><strong>Address:</strong> {artist.artistDetails.address}</p>
        <p><strong>Education:</strong> {artist.artistDetails.education}</p>
        <p><strong>About:</strong> {artist.artistDetails.about}</p>
        <p><strong>Awards:</strong> {artist.artistDetails.awards}</p>
        <p><strong>Verified:</strong> {artist.isVerified ? 'Yes' : 'No'}</p>
        <p><strong>Blocked:</strong> {artist.isBlocked ? 'Yes' : 'No'}</p>

        <div className="modal-buttons">
          <button onClick={artist.isVerified ? handleUnverify : handleVerify}>
            {artist.isVerified ? "Unverify" : "Verify"}
          </button>
          <button onClick={artist.isBlocked ? handleUnblock : handleBlock}>
            {artist.isBlocked ? "Unblock" : "Block"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Artist Card Component with Show Artwork Button
function ArtistCard({ artist, onClick, fetchArtwork }) {
  return (
    <div className="artist-card" onClick={onClick}>
      <div className="artist-details">
        <h3>{artist.artistDetails.name}</h3>
        <div className="artist-info">
          <p><strong>Email:</strong> {artist.email}</p>
          <p><strong>Phone:</strong> {artist.phone}</p>
          <p><strong>Country:</strong> {artist.artistDetails.country}</p>
          <p><strong>City:</strong> {artist.artistDetails.city}</p>
          <p><strong>Verified:</strong> {artist.isVerified ? 'Yes' : 'No'}</p>
          <p><strong>Blocked:</strong> {artist.isBlocked ? 'Yes' : 'No'}</p>
        </div>
      </div>
      {/* Show Artwork Button for each artist */}
      <button
        className="show-artwork-btn"
        onClick={() => fetchArtwork(artist._id)} // Pass artist's ID
      >
        Show Artwork
      </button>
    </div>
  );
}

// Main Component with the Artwork Grid
function Artist_detail_main() {
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [artworkGrid, setArtworkGrid] = useState(false); // State to toggle the artwork grid visibility
  const [artworks, setArtworks] = useState([]); // State to store artwork data

  // Fetch artists data from the API
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/admin/artists")
      .then((response) => {
        setArtists(response.data);
      })
      .catch((error) => {
        console.error("Error fetching artists:", error);
      });
  }, []);

  // Fetch artwork data from the API for specific artist
  const fetchArtwork = async (artistId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/artworks?artistId=${artistId}`);
      if (response.data.length === 0) {
        alert("No artwork is present for this artist.");
      } else {
        setArtworks(response.data);
        setArtworkGrid(true);
      }
    } catch (error) {
      console.error("Error fetching artworks:", error);
    }
  };

  // Handle opening the modal
  const handleCardClick = (artist) => {
    setSelectedArtist(artist);
  };

  // Handle closing the modal
  const closeModal = () => {
    setSelectedArtist(null);
  };

  // Refresh artists data
  const refreshArtists = () => {
    axios
      .get("http://localhost:4000/api/admin/artists")
      .then((response) => {
        setArtists(response.data);
      })
      .catch((error) => {
        console.error("Error fetching artists:", error);
      });
  };

  return (
    <div className="main-studio">
      <h1>Manage Artist Profile</h1>
      <div className="heading">Welcome to Artist Portfolios</div>

      <div className="artist-list">
        {artists.map((artist, index) => (
          <ArtistCard 
            key={index} 
            artist={artist} 
            onClick={() => handleCardClick(artist)} 
            fetchArtwork={fetchArtwork} // Pass fetchArtwork to ArtistCard
          />
        ))}
      </div>

      {selectedArtist && (
        <Modal artist={selectedArtist} closeModal={closeModal} refreshArtists={refreshArtists} />
      )}

      {/* Artwork Grid (Visible after button click) */}
      {artworkGrid && (
        <div className="artwork-grid">
          <button className="close-artwork-btn" onClick={() => setArtworkGrid(false)}>
            Close Artwork
          </button>
          {artworks.map((artwork, index) => (
            <div key={index} className="artwork-card">
              <img src={artwork.image} alt={artwork.title} className="artwork-image" />
              <div className="artwork-info">
                <h4>{artwork.title}</h4>
                <p>{artwork.artist.name}</p>
                <p>{artwork.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Artist_detail_main;
