import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LikeIcon from "../assets/images/like_icon.png";
import ShoppingIcon from "../assets/images/shopping_icon.png";

export const Landing_Page_fifth_Section = () => {
  const [artworks, setArtworks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchArtworks();
  }, []);

  const fetchArtworks = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/artwork/random?limit=9");
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
    <div id="portfolio" style={{ textAlign: "center", padding: "50px 20px" }}>
      <div style={{ maxWidth: "1200px", margin: "auto" }}>
        <div style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "2rem", color: "#333" }}>Explore Inspiring Designs</h2>
          <p style={{ fontSize: "1.2rem", color: "#555" }}>
            Discover the beauty and creativity of our curated art collection.
          </p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {artworks.length > 0 ? (
            artworks.map((art, index) => {
              const imageUrl = art.image.startsWith("http")
                ? art.image
                : `http://localhost:4000${art.image}`;

              return (
                <div
                  key={art._key || index}
                  style={{
                    textDecoration: "none",
                    width: "30%",
                    margin: "15px",
                    minWidth: "250px",
                    cursor: "pointer",
                    overflow: "hidden",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  }}
                  onClick={() => navigate("/signup")}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow = "0px 6px 12px rgba(0,0,0,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "0px 4px 6px rgba(0,0,0,0.1)";
                  }}
                >
                  <div
                    style={{
                      backgroundImage: `url(${imageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      width: "100%",
                      height: "300px",
                    }}
                  ></div>

                  <div style={{ padding: "15px", textAlign: "left", backgroundColor: "#fff" }}>
                    <h3 style={{ fontSize: "1.5rem", marginBottom: "5px", color: "#333" }}>
                      {art.artwork || "Untitled"}
                    </h3>
                    <p style={{ color: "#777" }}>By {art.artist || "Unknown Artist"}</p>
                    <p style={{ fontSize: "1rem", color: "#444" }}>{art.medium || "Unknown Medium"}</p>
                    <p style={{ fontSize: "0.9rem", color: "#666" }}>Size: {art.width} x {art.height} units</p>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <p style={{ fontWeight: "bold", color: "green" }}>${art.Price || "Price Not Available"}</p>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-around", marginTop: "10px" }}>
                      <button
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        <img src={LikeIcon} alt="Like" style={{ width: "24px" }} />
                      </button>
                      <button
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        <img src={ShoppingIcon} alt="Shopping" style={{ width: "24px" }} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p style={{ fontSize: "1.2rem", color: "#777" }}>No artworks found.</p>
          )}
        </div>

        <button
          onClick={() => navigate("/signup")}
          style={{
            backgroundColor: "#000",
            color: "#fff",
            padding: "10px 20px",
            fontSize: "1.2rem",
            marginTop: "40px",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          <b>Explore More</b>
        </button>
      </div>
    </div>
  );
};
