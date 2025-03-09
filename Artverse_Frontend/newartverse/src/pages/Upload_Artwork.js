import React, { useState } from "react";
import axios from "axios"; // For making API calls
import "../styles/UploadArtworkPage.css";
import { Link } from 'react-router-dom'; // Import Link for routing


const Upload_Artwork = () => {
  const [artworkDetails, setArtworkDetails] = useState({
    title: "",
    category: "",
    subject: "",
    yearProduced: "",
    medium: "",
    material: "",
    style: "",
    price: "",
    height: "",
    width: "",
    depth: "",
    description: "",
    image: null, // Store the image file
  });

  // Handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setArtworkDetails({ ...artworkDetails, [name]: value });
  };

  // Handle image file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Only one file is selected
    setArtworkDetails({ ...artworkDetails, image: file });
  };

  // Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("image", artworkDetails.image); // Append image
  formData.append("title", artworkDetails.title);
  formData.append("category", artworkDetails.category);
  formData.append("subject", artworkDetails.subject);
  formData.append("yearProduced", artworkDetails.yearProduced);
  formData.append("medium", artworkDetails.medium);
  formData.append("material", artworkDetails.material);
  formData.append("style", artworkDetails.style);
  formData.append("price", artworkDetails.price);
  formData.append("height", artworkDetails.height);
  formData.append("width", artworkDetails.width);
  formData.append("depth", artworkDetails.depth);
  formData.append("description", artworkDetails.description);

  try {
    const token = sessionStorage.getItem('token');
    console.log(token);

    const response = await axios.post("http://localhost:4000/api/artwork/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`, // Token for authentication
      },
    });

    if (response.status === 200) {
      alert("Artwork uploaded successfully!");
      // Clear form fields after successful submission
      setArtworkDetails({
        title: "",
        category: "",
        subject: "",
        yearProduced: "",
        medium: "",
        material: "",
        style: "",
        price: "",
        height: "",
        width: "",
        depth: "",
        description: "",
        image: null, // Reset image to null
      });
    }
  } catch (error) {
    if (error.response && error.response.status === 403) {
      // User is not verified
      alert('Your account is under verification. You cannot upload artwork yet.');
    } else {
      // Other errors
      alert('Error uploading artwork.');
    }
  }
};

  return (
    <div className="upload-artwork-page">
      <h1>Upload Artwork</h1>
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="upload-primary-photo-container">
          <label htmlFor="primaryPhoto" className="upload-primary-photo-label">
            Upload Primary Photo
            <input type="file" id="primaryPhoto" onChange={handleFileChange} />
          </label>
        </div>

        {/* Other form inputs for artwork details */}
        <div className="grid-container">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={artworkDetails.title}
            onChange={handleInputChange}
            className="text-input rounded-input"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={artworkDetails.category}
            onChange={handleInputChange}
            className="text-input rounded-input"
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={artworkDetails.subject}
            onChange={handleInputChange}
            className="text-input rounded-input"
          />
          <input
            type="text"
            name="yearProduced"
            placeholder="Year Produced"
            value={artworkDetails.yearProduced}
            onChange={handleInputChange}
            className="text-input rounded-input"
          />
          <input
            type="text"
            name="medium"
            placeholder="Medium"
            value={artworkDetails.medium}
            onChange={handleInputChange}
            className="text-input rounded-input"
          />
          <input
            type="text"
            name="material"
            placeholder="Material"
            value={artworkDetails.material}
            onChange={handleInputChange}
            className="text-input rounded-input"
          />
          <input
            type="text"
            name="style"
            placeholder="Style"
            value={artworkDetails.style}
            onChange={handleInputChange}
            className="text-input rounded-input"
          />
          <input
            type="number"
            name="price"
            placeholder="Price in $"
            value={artworkDetails.price}
            onChange={handleInputChange}
            className="text-input rounded-input"
          />
        </div>

        {/* Dimensions input */}
        <div className="dimensions-section">
          <h3>Dimensions (inches)</h3>
          <input
            type="number"
            name="height"
            placeholder="Height"
            value={artworkDetails.height}
            onChange={handleInputChange}
            className="text-input rounded-input"
          />
          <input
            type="number"
            name="width"
            placeholder="Width"
            value={artworkDetails.width}
            onChange={handleInputChange}
            className="text-input rounded-input"
          />
          <input
            type="number"
            name="depth"
            placeholder="Depth"
            value={artworkDetails.depth}
            onChange={handleInputChange}
            className="text-input rounded-input"
          />
        </div>

        {/* Description textarea */}
        <div className="form-section">
          <textarea
            name="description"
            placeholder="Description"
            value={artworkDetails.description}
            onChange={handleInputChange}
            className="textarea rounded-input"
          ></textarea>
        </div>

        {/* Save button */}
        <button type="submit" className="save-button">
          Save Artwork
        </button>
      </form>
    </div>
  );
};

export default Upload_Artwork;
