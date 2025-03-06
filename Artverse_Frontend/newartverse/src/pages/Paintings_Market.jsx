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

  const [currentPage, setCurrentPage] = useState(1);
  const paintingsPerPage = 50;

  useEffect(() => {
    fetchFilteredPaintings();
  }, [filters, currentPage]); // Fetch when filters or page changes

  const fetchFilteredPaintings = async () => {
    try {
      // Remove empty filters before sending request
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== "")
      );
  
      const queryParams = new URLSearchParams(cleanFilters).toString();
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
        <FilterComponent onFilterChange={setFilters} />

        <div style={{ flex: 1, padding: "20px" }}>
          <PaintingList paintings={paintings} />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Paintings_Market;
