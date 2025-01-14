import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/search_page_main.css";
function Search_page_main() {
  const [searchQuery, setSearchQuery] = useState("");
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    // Extract 'title' query parameter from URL
    const params = new URLSearchParams(window.location.search);
    const title = params.get("title");
    if (title) {
      setSearchQuery(title);
      fetchArtworks(title); // Automatically fetch artworks when title is found
    }
  }, []);

  const fetchArtworks = async (query) => {
    console.log(`Fetching artworks with query: ${query}`);
    try {
      // Ensure you are using the correct URL for the API
      const response = await fetch(
        `http://localhost:4000/api/artwork/search?title=${encodeURIComponent(
          query
        )}`
      );

      // Check if the response is ok
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      // Parse the JSON response
      const data = await response.json();
      console.log("Fetched artworks:", data);

      // Update the state with the fetched data
      setArtworks(data);
    } catch (error) {
      console.error("Error fetching artworks:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      e.preventDefault();
      fetchArtworks(searchQuery);
    }
  };
  return (
    <div className="search-page">
      <h1 className="search-title">Search Results</h1>
      <div className="artwork-grid">
        {artworks.length > 0 ? (
          artworks.map((artwork) => (
            <div key={artwork._id} className="artwork-card">
              <Link
                to="/painting" // Navigates to the specific painting page
                state={{ artwork }} // Pass artwork data
                className="artwork-link"
              >
                <div className="artwork-image">
                  <img src={artwork.image} alt={artwork.title} />
                </div>
                <div className="artwork_detail">
                  <h2 className="artwork-title">{artwork.title}</h2>
                  <p className="artwork-details">
                    {artwork.category} | {artwork.yearProduced}
                  </p>
                  <p className="artwork-description">{artwork.description}</p>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p className="no-results">No artworks found.</p>
        )}
      </div>
    </div>
  );
}

export default Search_page_main;
