import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/ArtistProfile.css"; // Import CSS

const ArtistProfile = () => {
  const { email } = useParams();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/users/getUserByEmail/${email}`
        );
        setArtist(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching artist details");
      } finally {
        setLoading(false);
      }
    };
    fetchArtist();
  }, [email]);

  if (loading) return <p className="text-center">Loading artist details...</p>;
  if (error) return <p className="text-center error-text">{error}</p>;

  return (
    <div className="artist-profile-container">
      {/* Artist Info */}
      <div className="artist-info">
        <img
          src={`http://localhost:4000${artist.image}` || "https://via.placeholder.com/150"}
          alt={artist.name}
          className="artist-image"
        />
        <div className="artist-details">
          <h2>{artist.firstName} {artist.lastName}</h2>
          <p>{artist.email}</p>
          <p>{artist.artistDetails?.city}, {artist.artistDetails?.state}, {artist.artistDetails?.country}</p>
        </div>
      </div>

      {/* Additional Info */}
      <div className="additional-info">
        <p><strong>About:</strong> {artist.artistDetails?.about || "No details available"}</p>
        <p><strong>Education:</strong> {artist.artistDetails?.education || "Not specified"}</p>
        <p><strong>Awards:</strong> {artist.artistDetails?.awards || "No awards listed"}</p>
        <p><strong>Certificates:</strong> {artist.artistDetails?.certificates || "No certificates uploaded"}</p>
        <p><strong>Address:</strong> {artist.artistDetails?.address || "Not provided"}</p>
      </div>

      {/* Artworks */}
      <div className="artworks-container">
        <h3>Artworks</h3>
        {artist.artworks.length === 0 ? (
          <p>No artworks available</p>
        ) : (
          <div className="artwork-grid">
            {artist.artworks.map((artwork) => (
              <div key={artwork._id} className="artwork-card">
                <img
                  src={`http://localhost:4000${artwork.image}`}
                  alt={artwork.artwork}
                />
                <div className="artwork-details">
                  <h4>{artwork.artwork}</h4>
                  <p>{artwork.type} - {artwork.medium}</p>
                  <p>Created on: {artwork.date}</p>
                  <p className="artwork-price">${artwork.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtistProfile;
