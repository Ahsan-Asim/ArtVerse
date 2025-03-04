import React from "react";

const FilterSection = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ flex: 1, borderRight: "1px solid #ccc", padding: "20px", maxWidth: "250px" }}>
      <h3>Filters</h3>

      <label>Price:</label>
      <select name="price" onChange={handleChange}>
        <option value="">All</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <label>Size:</label>
      <select name="size" onChange={handleChange}>
        <option value="">All</option>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select>

      <label>Style:</label>
      <select name="style" onChange={handleChange}>
        <option value="">All</option>
        <option value="abstract">Abstract</option>
        <option value="realistic">Realistic</option>
        <option value="modern">Modern</option>
      </select>

      <label>Subject:</label>
      <select name="subject" onChange={handleChange}>
        <option value="">All</option>
        <option value="nature">Nature</option>
        <option value="portrait">Portrait</option>
      </select>

      <label>Medium:</label>
      <select name="medium" onChange={handleChange}>
        <option value="">All</option>
        <option value="oil">Oil</option>
        <option value="watercolor">Watercolor</option>
      </select>
    </div>
  );
};

export default FilterSection;
