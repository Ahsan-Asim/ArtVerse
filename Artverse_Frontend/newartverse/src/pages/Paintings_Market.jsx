import React, { useState, useEffect } from "react";
import { NavigationBar } from "../components/Home_Page_Navigation.jsx";
import { Footer } from "../components/Footer.jsx";
import PaintingList from "../components/Paintings_market/PaintingList.jsx";
import FilterComponent from "../components/Paintings_market/FilterSection.jsx";

function Paintings_Market() {
  const [paintings, setPaintings] = useState([]);
  const [filters, setFilters] = useState({
    medium: "",
    minPrice: "",
    maxPrice: "",
    artist: "",
    style: "",
  });

  useEffect(() => {
    fetchFilteredPaintings();
  }, [filters]);

  const fetchFilteredPaintings = async () => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await fetch(`http://localhost:4000/api/artwork/filtered?${queryParams}`);
      const data = await response.json();
  
      console.log("Fetched paintings data:", data);
  
      if (Array.isArray(data)) {
        setPaintings(data);
      } else {
        console.error("Unexpected response format:", data);
        setPaintings([]); // Ensure paintings is always an array
      }
    } catch (error) {
      console.error("Error fetching paintings:", error);
      setPaintings([]); // Prevent map error in case of failure
    }
  };
  
  return (
    <div>
      <NavigationBar />

      <div style={{ display: "flex", paddingTop: "150px", minHeight: "80vh" }}>
        {/* Left Sidebar (Filters) */}
        <FilterComponent onFilterChange={setFilters} />

        {/* Right Side (Artworks) */}
        <div style={{ flex: 1, padding: "20px" }}>
          <PaintingList paintings={paintings} />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Paintings_Market;
