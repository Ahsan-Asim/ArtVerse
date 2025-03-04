import React, { useState, useEffect } from "react";
import { NavigationBar } from "../components/Home_Page_Navigation.jsx";
import { Footer } from "../components/Footer.jsx";
import FilterSection from "../components/Paintings_market/FilterSection.jsx";
import PaintingList from "../components/Paintings_market/PaintingList.jsx";

function Paintings_Market() {
  const [filters, setFilters] = useState({
    price: "",
    size: "",
    style: "",
    subject: "",
    medium: "",
  });

  const [paintings, setPaintings] = useState([]);

  useEffect(() => {
    fetchPaintings();
  }, [filters]);

  const fetchPaintings = async () => {
    try {
      const queryString = new URLSearchParams(filters).toString();
      const response = await fetch(`http://localhost:4000/api/artwork?${queryString}`);
      const data = await response.json();
      setPaintings(data);
    } catch (error) {
      console.error("Error fetching paintings:", error);
    }
  };

  return (
    <div>
      <NavigationBar />

      <div className="Market-Paintings-page">
        <div className="content-wrapper" style={{ paddingTop: "100px", display: "flex" }}>
          {/* Left Filter Section */}
          <FilterSection filters={filters} setFilters={setFilters} />

          {/* Right Paintings Display Section */}
          <div style={{ flex: 3, marginLeft: "20px", padding: "20px" }}>
            <PaintingList paintings={paintings} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Paintings_Market;
