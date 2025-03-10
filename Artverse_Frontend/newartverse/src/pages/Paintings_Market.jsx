import React, { useState, useEffect, useCallback } from "react";
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

  // Removed unused variables:
  // const [currentPage, setCurrentPage] = useState(1);
  // const paintingsPerPage = 50;

  // Wrapped the function in useCallback to prevent infinite useEffect re-renders
  const fetchFilteredPaintings = useCallback(async () => {
    try {
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== "")
      );

      const queryParams = new URLSearchParams(cleanFilters).toString();
      const response = await fetch(
        `http://localhost:4000/api/artwork/filtered?${queryParams}`
      );
      const data = await response.json();

      console.log("Fetched paintings data:", data);

      if (Array.isArray(data)) {
        setPaintings(data);
      } else {
        console.error("Unexpected response format:", data);
        setPaintings([]);
      }
    } catch (error) {
      console.error("Error fetching paintings:", error);
      setPaintings([]);
    }
  }, [filters]); // Only runs when filters change

  // useEffect will now correctly depend on `fetchFilteredPaintings`
  useEffect(() => {
    fetchFilteredPaintings();
  }, [fetchFilteredPaintings]);

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
