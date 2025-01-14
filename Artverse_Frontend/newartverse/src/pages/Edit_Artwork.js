import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function EditArtwork() {
  const location = useLocation();
  const artwork = location.state; // Retrieve artwork details from navigation
  const [formData, setFormData] = useState({ ...artwork });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/api/artwork/update/${artwork.id}`, formData);
      alert("Artwork updated successfully");
      navigate("/artist_studio_main");
    } catch (error) {
      console.error("Error updating artwork:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title</label>
      <input name="title" value={formData.title} onChange={handleInputChange} />
      <label>Category</label>
      <input name="category" value={formData.category} onChange={handleInputChange} />
      {/* Add fields for dimensions, price, etc. */}
      <button type="submit">Update Artwork</button>
    </form>
  );
}

export default EditArtwork;
