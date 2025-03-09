import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../styles/CommissionRequest.css";

const CommissionRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const userEmail = sessionStorage.getItem("email");
        if (!userEmail) throw new Error("User email not found in session");

        const response = await axios.get(
          `http://localhost:4000/api/users/commission-requests?email=${userEmail}`
        );

        setRequests(response.data.requests);
      } catch (err) {
        setError(err.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleArtistClick = (email) => {
    navigate(`/artist-details/${email}`);
  };

  const handleDeleteArtist = async (requestId, artistId) => {
    try {
      await axios.delete(`http://localhost:4000/api/requests/${requestId}/remove-artist/${artistId}`);

      // Update the UI after deletion
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === requestId
            ? { ...request, interested_people: request.interested_people.filter((artist) => artist._id !== artistId) }
            : request
        )
      );
    } catch (err) {
      console.error("Error removing artist:", err);
    }
  };

  if (loading) return <p className="loading-text">Loading...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="container">
      <h2>🎨 Commission Work</h2>

      <div className="table-container">
        <table className="responsive-table">
          <thead>
            <tr>
              <th>Work</th>
              <th>Budget</th>
              <th>Timeframe</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-data">No commission requests found.</td>
              </tr>
            ) : (
              requests.map((request, index) => (
                <React.Fragment key={index}>
                  <tr className="table-row">
                    <td data-label="Work">Work {index + 1}</td>
                    <td data-label="Budget" className="budget">${request.budget}</td>
                    <td data-label="Timeframe">{request.time}</td>
                    <td data-label="Description">{request.description}</td>
                    <td data-label="Action">
                      <button
                        onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                        className="action-button"
                      >
                        {openDropdown === index ? "Hide Artists" : "Show Artists"}
                      </button>
                    </td>
                  </tr>

                  {openDropdown === index && (
                    <tr>
                      <td colSpan="5">
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="dropdown-container"
                        >
                          {request.interested_people.length > 0 ? (
                            <table className="artist-table">
                              <thead>
                                <tr>
                                  <th>Artist Name</th>
                                  <th>Email</th>
                                  <th>Country</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {request.interested_people.map((artist) => (
                                  <tr key={artist._id} className="artist-row">
                                    <td>{artist.name}</td>
                                    <td>{artist.email}</td>
                                    <td>{artist.country}</td>
                                    <td>
                                      <button
                                        className="confirm-button"
                                      >
                                        ✅ Confirm
                                      </button>
                                      <button
                                        className="delete-button"
                                        onClick={() => handleDeleteArtist(request._id, artist._id)}
                                      >
                                        ❌ Delete
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          ) : (
                            <p className="no-artists">No interested artists yet.</p>
                          )}
                        </motion.div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommissionRequests;
