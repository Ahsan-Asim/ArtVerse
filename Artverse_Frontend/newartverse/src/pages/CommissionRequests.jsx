import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CommissionRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate(); // Use navigate for redirection

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
    navigate(`/artist-details/${email}`); // Navigate to the artist details page
  };

  if (loading)
    return <p className="text-center text-gray-600 text-lg">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500 text-lg">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Commission Work</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.length === 0 ? (
          <p className="text-gray-600 text-center col-span-3">No commission requests found.</p>
        ) : (
          requests.map((request, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <p className="text-lg font-medium text-gray-800 mb-2">
                <strong>Description:</strong> {request.description}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Budget:</strong> ${request.budget}
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Timeframe:</strong> {request.time}
              </p>
              <button
                onClick={() =>
                  setOpenDropdown(openDropdown === index ? null : index)
                }
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
              >
                {openDropdown === index
                  ? "Hide Interested Artists"
                  : "Show Interested Artists"}
              </button>
              <AnimatePresence>
                {openDropdown === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 bg-white shadow-md rounded-md p-4"
                  >
                    {request.interested_people.length > 0 ? (
                      request.interested_people.map((artist) => (
                        <div
                          key={artist._id}
                          onClick={() => handleArtistClick(artist.email)}
                          className="p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-100 transition duration-200"
                        >
                          <p className="text-gray-800 font-semibold">
                            {artist.name}
                          </p>
                          <p className="text-gray-600 text-sm">{artist.email}</p>
                          <p className="text-gray-600 text-sm">
                            <strong>Country:</strong> {artist.country}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-600">No interested artists yet.</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommissionRequests;
