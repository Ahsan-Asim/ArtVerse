import React, { useState } from 'react';
import '../styles/CustomizePage.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CustomizationPage() {
  const { serviceId } = useParams();
  const [budget, setBudget] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const userEmail = sessionStorage.getItem("email"); // Get email from sessionStorage
  
    if (!userEmail) {
      alert("User email not found. Please log in.");
      return;
    }
  
    const formData = new FormData();
    formData.append("budget", budget);
    formData.append("time", time);
    formData.append("description", description);
  
    if (image) {
      formData.append("image", image);
    }
  
    try {
      const response = await axios.post("http://localhost:4000/api/requests/submit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "user-email": userEmail, // Ensure correct casing
        },
      });
  
      alert("Request submitted successfully!");
      console.log("Server Response:", response.data);
    } catch (error) {
      console.error("Error submitting request:", error.response?.data || error.message);
      alert("Failed to submit request. Please try again.");
    }
  };
  
  

  return (
    <div className="customization-container">
      <h2>Customize Your {serviceId.replace('-', ' ')}</h2>
      <form onSubmit={handleSubmit}>
        <label>Upload Image:</label>
        <input type="file" onChange={handleFileChange} accept="image/*" />

        <label>Budget:</label>
        <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="Enter budget" />

        <label>Time Required:</label>
        <input type="text" value={time} onChange={(e) => setTime(e.target.value)} placeholder="Enter time frame" />

        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe your requirements"></textarea>

        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
}

export default CustomizationPage;
