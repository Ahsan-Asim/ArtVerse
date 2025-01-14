import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Corrected import
import "../styles/Artist_studio_main.css";
// import Artist_studio_footer from '../pages/Artist_studio_footer.js';
import Edit_Artwork from '../pages/Edit_Artwork.js';

function ArtworkCard({ id, image, title, category, yearProduced, dimensions, price, onDelete, onEdit }) {
  return (
    <div className="artwork-card">
      <div className="artwork-image-container">
        <img className="artwork-image" src={`http://localhost:4000${image}`} alt={title} />
      </div>
      <div className="artwork-details">
        <h3 className="artwork-title">{title}</h3>
        <div className="details-group">
          <p><strong>Category:</strong> {category}</p>
          <p><strong>Dimensions:</strong> {dimensions}</p>
          <p><strong>Year Produced:</strong> {yearProduced}</p>
          <p><strong>Price:</strong> ${price}</p>
        </div>
        <div className="button-group">
          {/* <button className="edit-button" onClick={() => onEdit(id)}>Edit</button> */}
          <button className="delete-button" onClick={() => onDelete(title)}>
  Delete
</button>
        </div>
      </div>
    </div>
  );
}


function Artist_studio_main() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const email = sessionStorage.getItem("email");
  const navigate = useNavigate();

  useEffect(() => {
    if (email) {
      // Fetch user details
      axios.get(`http://localhost:4000/api/users/getUserStatus/${email}`).then((response) => {
        const { isVerified, isBlocked } = response.data;
        setIsVerified(isVerified);
        setIsBlocked(isBlocked);
      }).catch((error) => console.error("Error fetching user status:", error));

      // Fetch artworks
      axios.get(`http://localhost:4000/api/artwork/getArtwork/${email}`).then((response) => {
        setArtworks(response.data);
        setLoading(false);
      }).catch((error) => {
        console.error("Error fetching artworks:", error);
        setLoading(false);
      });
    }
  }, [email]);

  const handleEdit = (artwork) => {
    navigate("/Edit_Artwork", { state: artwork });
  };

  const handleDelete = async (title) => {
    const email = sessionStorage.getItem("email"); // Retrieve email from sessionStorage
  
    if (!email) {
      alert("User email is not available.");
      return;
    }
  
    try {
      const response = await axios.delete("http://localhost:4000/api/artwork/delete", {
        data: { email, title }, // Pass email and title in the request body
      });
  
      alert(response.data.message);
      // Optionally, refresh or update the list of artworks on the frontend
      setArtworks(artworks.filter((artwork) => artwork.title !== title));
    } catch (error) {
      console.error("Error deleting artwork:", error);
      alert(error.response?.data?.error || "An error occurred.");
    }
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main-studio">
      <h1>Manage Artworks</h1>
      <div className="heading">
        <div className="left-area">
          <h1>My Original Artworks</h1>
        </div>
        <div className="right-area">
          <button onClick={() => navigate("/upload_artwork")}>
            Upload New Artwork
          </button>
        </div>
      </div>

      <div className="user-status">
        <p>User Status: {isVerified ? "Verified" : "Not Verified"}</p>
        <p>{isBlocked ? "Account is Blocked" : "Account is Active"}</p>
      </div>

      <div className="artwork-list">
        {artworks.length > 0 ? (
          artworks.map((artwork, index) => (
            <ArtworkCard
              key={index}
              {...artwork}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p>No artworks found.</p>
        )}
      </div>
    </div>
  );
}

export default Artist_studio_main;
