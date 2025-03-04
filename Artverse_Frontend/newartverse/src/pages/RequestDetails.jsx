import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function RequestDetails() {
  const { requestId } = useParams();
  const [request, setRequest] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/requests`)
      .then(res => setRequest(res.data.find(req => req._id === requestId)))
      .catch(err => console.error("Error fetching request:", err));
  }, [requestId]);

  const handleDecision = async (status) => {
    try {
      await axios.post(`http://localhost:4000/api/requests/update/${requestId}`, { status });
      alert(`Marked as ${status}`);
    } catch (err) {
      console.error("Error updating request:", err);
      alert("Failed to update request.");
    }
  };

  if (!request) return <p>Loading...</p>;

  return (
    <div className="request-details">
      <h2>{request.serviceId.replace('-', ' ')}</h2>
      <p><strong>Budget:</strong> ${request.budget}</p>
      <p><strong>Time:</strong> {request.time}</p>
      <p><strong>Description:</strong> {request.description}</p>
      {request.image && <img src={`http://localhost:4000/uploads/${request.image}`} alt="User Upload" />}
      
      <button onClick={() => handleDecision('Interested')} style={{ backgroundColor: "green" }}>Interested</button>
      <button onClick={() => handleDecision('Not Interested')} style={{ backgroundColor: "red" }}>Not Interested</button>
    </div>
  );
}

export default RequestDetails;
