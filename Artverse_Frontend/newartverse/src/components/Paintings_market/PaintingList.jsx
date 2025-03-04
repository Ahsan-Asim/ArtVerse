import React from "react";

const PaintingList = ({ paintings }) => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" }}>
      {paintings.length > 0 ? (
        paintings.map((painting) => (
          <div key={painting.id} style={{ textAlign: "center", border: "1px solid #ccc", padding: "10px", borderRadius: "10px" }}>
            <img src={`http://localhost:4000/uploads/${painting.image}`} alt={painting.title} style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "10px" }} />
            <h4>{painting.title}</h4>
            <p>${painting.price}</p>
          </div>
        ))
      ) : (
        <p>No paintings found.</p>
      )}
    </div>
  );
};

export default PaintingList;
