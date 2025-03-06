import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LikeIcon from "../assets/images/like_icon.png";
import ShoppingIcon from "../assets/images/shopping_icon.png";
import "../styles/SearchPage/search_page_main.css";

function Search_page_main() {
  const [searchQuery, setSearchQuery] = useState("");
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const artworkQuery = params.get("artwork");
    console.log("Extracted artworkQuery:", artworkQuery);

    if (artworkQuery) {
      setSearchQuery(artworkQuery);
      fetchArtworks(artworkQuery);
    }
  }, []);

  const fetchArtworks = async (query) => {
    console.log(`Fetching artworks with query: ${query}`);
    try {
      const response = await fetch(
        `http://localhost:4000/api/artwork/search?artwork=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Fetched artworks:", data);
      setArtworks(data);
    } catch (error) {
      console.error("Error fetching artworks:", error);
    }
  };

  return (
    <div className="search-page">
      <h1 className="search-title">Search Results</h1>
      <div className="artwork-grid">
        {artworks.length > 0 ? (
          artworks.map((art) => {
            const imageUrl = art.image.startsWith("http")
              ? art.image
              : `http://localhost:4000${art.image}`;

            return (
              <div key={art._key} className="artwork-card">
                <Link to="/painting" state={{ artwork: art }} className="artwork-link">
                  <div className="artwork-image">
                    <img src={imageUrl} alt={art.artwork || "Artwork"} />
                  </div>
                  <div className="artwork_detail">
                    <h3 className="artwork-title">{art.artwork || "Untitled"}</h3>
                    <p className="artwork-details">By {art.artist || "Unknown Artist"}</p>
                    <p className="artwork-details">{art.style || "Unknown Style"} | {art.date || "Unknown Date"}</p>                    <p className="artwork-dimensions">{art.width} x {art.height} cm</p>
                    <p className="artwork-price">${art.Price}</p>
                    <div className="artwork-actions">
                      <button className="like-button">
                        <img src={LikeIcon} alt="Like" className="action-icon" />
                      </button>
                      <button className="shopping-button">
                        <img src={ShoppingIcon} alt="Shopping" className="action-icon" />
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <p className="no-results">No artworks found.</p>
        )}
      </div>
    </div>
  );
}

export default Search_page_main;
