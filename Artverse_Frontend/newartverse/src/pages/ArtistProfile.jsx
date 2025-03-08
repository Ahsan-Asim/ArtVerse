import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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

  if (loading) return <p className="text-center text-gray-600 text-lg">Loading artist details...</p>;
  if (error) return <p className="text-center text-red-500 text-lg">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Artist Info */}
      <div className="flex items-center space-x-6">
        <img
          src={`http://localhost:4000${artist.image}` || "https://via.placeholder.com/150"}
          alt={artist.name}
          className="w-40 h-40 rounded-full border-4 border-gray-300 object-cover"
        />
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{artist.firstName} {artist.lastName}</h2>
          <p className="text-gray-600 text-lg">{artist.email}</p>
          <p className="text-gray-600 text-lg">
            {artist.artistDetails?.city}, {artist.artistDetails?.state}, {artist.artistDetails?.country}
          </p>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-6 space-y-4 text-lg text-gray-800">
        <p><strong>About:</strong> {artist.artistDetails?.about || "No details available"}</p>
        <p><strong>Education:</strong> {artist.artistDetails?.education || "Not specified"}</p>
        <p><strong>Awards:</strong> {artist.artistDetails?.awards || "No awards listed"}</p>
        <p><strong>Certificates:</strong> {artist.artistDetails?.certificates || "No certificates uploaded"}</p>
        <p><strong>Address:</strong> {artist.artistDetails?.address || "Not provided"}</p>
      </div>

      {/* Artworks */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-800">Artworks</h3>
        {artist.artworks.length === 0 ? (
          <p className="text-gray-500">No artworks available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
            {artist.artworks.map((artwork) => (
              <div key={artwork._id} className="bg-gray-100 p-4 rounded-lg shadow-lg">
                <img
                  src={`http://localhost:4000${artwork.image}`}
                  alt={artwork.artwork}
                  className="w-full h-56 object-cover rounded-lg"
                />
                <div className="mt-3">
                  <h4 className="text-lg font-bold text-gray-800">{artwork.artwork}</h4>
                  <p className="text-gray-600">{artwork.type} - {artwork.medium}</p>
                  <p className="text-gray-500 text-sm">Created on: {artwork.date}</p>
                  <p className="text-green-600 font-semibold">${artwork.price}</p>
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
