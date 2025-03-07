import React, { useState, useEffect } from "react";

const FilterComponent = ({ onFilterChange }) => {
  const [mediums, setMediums] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });

  const [selectedMedium, setSelectedMedium] = useState("");
  const [selectedMinPrice, setSelectedMinPrice] = useState("");
  const [selectedMaxPrice, setSelectedMaxPrice] = useState("");
  const [selectedArtist, setSelectedArtist] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");

  useEffect(() => {
    fetchFilters();
  }, []);

  const fetchFilters = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/artwork/filters");
      const data = await response.json();
      setMediums(data.mediums);
      setPriceRange(data.priceRange);
    } catch (error) {
      console.error("Error fetching filters:", error);
    }
  };

  const applyFilters = () => {
    onFilterChange({
      medium: selectedMedium,
      minPrice: selectedMinPrice || priceRange.min,
      maxPrice: selectedMaxPrice || priceRange.max,
      artist: selectedArtist,
      style: selectedStyle,
    });
  };

  return (
    <div style={{ width: "250px", padding: "20px", borderRight: "1px solid #ddd" }}>
      <h3>Filters</h3>

      {/* Medium Filter */}
      <label>Medium:</label>
      <select
        value={selectedMedium}
        onChange={(e) => setSelectedMedium(e.target.value)}
        style={{ width: "100%", padding: "5px", marginBottom: "10px" }}
      >
        <option value="">All</option>
        {mediums.map((medium) => (
          <option key={medium} value={medium}>
            {medium}
          </option>
        ))}
      </select>

      {/* Price Filter */}
      <label>Price Range:</label>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <input
          type="number"
          placeholder={`Min (${priceRange.min})`}
          value={selectedMinPrice}
          onChange={(e) => setSelectedMinPrice(e.target.value)}
          style={{ width: "48%", padding: "5px" }}
        />
        <input
          type="number"
          placeholder={`Max (${priceRange.max})`}
          value={selectedMaxPrice}
          onChange={(e) => setSelectedMaxPrice(e.target.value)}
          style={{ width: "48%", padding: "5px" }}
        />
      </div>

      {/* Artist Filter */}
      <label>Artist Name:</label>
      <input
        type="text"
        placeholder="Enter artist name"
        value={selectedArtist}
        onChange={(e) => setSelectedArtist(e.target.value)}
        style={{ width: "100%", padding: "5px", marginBottom: "10px" }}
      />

      {/* Style Filter */}
      <label>Style:</label>
      <input
        type="text"
        placeholder="Enter style type"
        value={selectedStyle}
        onChange={(e) => setSelectedStyle(e.target.value)}
        style={{ width: "100%", padding: "5px", marginBottom: "10px" }}
      />

      <button
        onClick={applyFilters}
        style={{
          width: "100%",
          marginTop: "15px",
          padding: "10px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterComponent;
