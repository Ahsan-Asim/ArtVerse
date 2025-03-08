import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/RequestDetails.css";

const RequestDetails = () => {
  const { notificationId } = useParams();
  const navigate = useNavigate();
  const [requestDetails, setRequestDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buttonsHidden, setButtonsHidden] = useState(false);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/notifications/detail/${notificationId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        if (data.success && data.notification) {
          setRequestDetails(data.notification);
        } else {
          console.error("Failed to fetch request details:", data.message);
        }
      } catch (error) {
        console.error("Error fetching request details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequestDetails();
  }, [notificationId, token]);

  if (loading) {
    return <p className="loading-screen">Loading...</p>;
  }

  if (!requestDetails) {
    return <p className="error-message">Request details not found.</p>;
  }

  const handleInterestedClick = async () => {
    const artistEmail = sessionStorage.getItem("email");

    if (!artistEmail) {
      alert("Artist email not found in session.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/requests/${requestDetails.request._id}/interested`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: artistEmail }),
      });

      const data = await response.json();
      if (data.success) {
        alert("You have been marked as interested!");
        setButtonsHidden(true);
      } else {
        alert("Failed to mark interest: " + data.message);
      }
    } catch (error) {
      console.error("Error marking interest:", error);
    }
  };

  const handleNotInterestedClick = () => {
    setButtonsHidden(true);
  };

  const { user, request } = requestDetails;

  const handleDownloadImage = () => {
    if (request?.image) {
      const link = document.createElement("a");
      link.href = `data:image/jpeg;base64,${request.image}`;
      link.download = "request_image.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="request-container">
      <h2 className="request-title">Request Details</h2>

      {request?.image && (
        <div className="image-container">
          <img src={`data:image/jpeg;base64,${request.image}`} alt="Uploaded Request" className="request-image" />
          <button className="download-button" onClick={handleDownloadImage}>Download Image</button>
        </div>
      )}

      <div className="details-container">
        {user ? (
          <div className="user-card">
            <h3 className="section-title">User Information</h3>
            <p><strong>Name:</strong> {user.name} {user.lastName}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Verified:</strong> {user.isVerified ? "Yes" : "No"}</p>
            <p><strong>Blocked:</strong> {user.isBlocked ? "Yes" : "No"}</p>
          </div>
        ) : <p className="error-message">User information not available.</p>}

        {request ? (
          <div className="request-card">
            <h3 className="section-title">Request Information</h3>
            <p><strong>Budget:</strong> {request.budget}</p>
            <p><strong>Time:</strong> {request.time}</p>
            <p><strong>Description:</strong> {request.description}</p>
          </div>
        ) : <p className="error-message">Request information not available.</p>}
      </div>

      {!buttonsHidden && (
        <div className="button-container">
          <button className="interest-button" onClick={handleInterestedClick}>Interested</button>
          <button className="not-interest-button" onClick={handleNotInterestedClick}>Not Interested</button>
        </div>
      )}
    </div>
  );
};

export default RequestDetails;
