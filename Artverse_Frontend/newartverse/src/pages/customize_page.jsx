import React, { useState } from 'react';
import '../styles/CustomizePage.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CustomizePage() {
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
    const formData = new FormData();
    formData.append('serviceId', serviceId);
    formData.append('budget', budget);
    formData.append('time', time);
    formData.append('description', description);
    formData.append('image', image);

    await axios.post('http://localhost:5000/submit-request', {
      serviceId, budget, time, description, image: image ? image.name : ''
    });

    alert('Request submitted successfully!');
  };

  return (
    <div className="customize-container">
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

export default CustomizePage;
