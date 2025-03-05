import React from "react";

const PaintingList = ({ paintings }) => {
    console.log("Displaying paintings count:", paintings.length); // 🔍 Log count
    return (
      <div style={{ padding: "30px", fontFamily: "Arial, sans-serif" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
          🎨 Featured Paintings ({paintings.length})
        </h2>
  
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {paintings.map((painting, index) => (
            <div key={index} style={{ border: "1px solid #ddd", padding: "10px" }}>
              <img src={painting.image} alt={painting.title} style={{ width: "100%" }} />
              <h3>{painting.title}</h3>
              <p>Artist: {painting.artist}</p>
              <p>Price: ${painting.Price}</p>
              <p>Style: ${painting.style}</p>
              <p>Medium: ${painting.medium}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  export default PaintingList;