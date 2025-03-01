import React, { useState } from "react";

const ImageSearchMain = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [results, setResults] = useState([]);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
    setPreview(e.target.value);
  };

  const fetchSimilarImages = async () => {
    const formData = new FormData();
    if (imageFile) {
      formData.append("image", imageFile);
    } else if (imageUrl) {
      formData.append("url", imageUrl);
    } else {
      alert("Please upload an image or provide a URL.");
      return;
    }

    const response = await fetch("http://127.0.0.1:5000/search", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    console.log("Results data:", data.results);
    setResults(data.results || []);
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
        Upload an Image or Enter URL
      </h2>

      {/* Upload & URL Input */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          backgroundColor: "#f8f8f8",
          padding: "15px",
          borderRadius: "10px",
          boxShadow: "2px 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <label
          style={{
            cursor: "pointer",
            backgroundColor: "#007bff",
            color: "white",
            padding: "10px 15px",
            borderRadius: "6px",
            fontWeight: "bold",
            boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
          }}
        >
          Choose File
          <input type="file" onChange={handleFileChange} style={{ display: "none" }} />
        </label>

        <input
          type="text"
          value={imageUrl}
          onChange={handleUrlChange}
          placeholder="Enter image URL"
          style={{
            flex: 1,
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            fontSize: "16px",
          }}
        />
      </div>

      {/* Preview Section */}
      {preview && (
        <div style={{ marginTop: "20px" }}>
          <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>Preview:</h3>
          <img
            src={preview}
            alt="Uploaded Preview"
            style={{
              width: "300px",
              height: "300px",
              objectFit: "cover",
              borderRadius: "8px",
              border: "1px solid #ddd",
              boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          />
        </div>
      )}

      {/* Search Button */}
      <button
        onClick={fetchSimilarImages}
        style={{
          marginTop: "20px",
          backgroundColor: "#28a745",
          color: "white",
          padding: "12px 20px",
          borderRadius: "8px",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: "2px 2px 6px rgba(0, 0, 0, 0.2)",
        }}
      >
        🔍 Search Similar Images
      </button>

      {/* Results Section */}
      <div style={{ marginTop: "30px" }}>
        <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}>
          Results:
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {results.length > 0 ? (
            results.map((item, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  boxShadow: "3px 3px 8px rgba(0,0,0,0.1)",
                  overflow: "hidden",
                  padding: "15px",
                }}
              >
                {/* Image Section */}
                <div
                  style={{
                    width: "100%",
                    height: "250px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#f2f2f2",
                  }}
                >
                  <img
                    src={item.image}
                    alt="Artwork"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                      boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                </div>

                {/* Artwork Details */}
                <div style={{ padding: "10px" }}>
                  <h4 style={{ fontSize: "18px", fontWeight: "bold" }}>{item.artwork}</h4>
                  <p style={{ color: "#555" }}>By {item.artist}</p>
                  <p style={{ fontSize: "14px", color: "#777" }}>{item.style}</p>
                  <p style={{ fontSize: "14px", color: "#777" }}>{item.date}</p>
                  <p style={{ fontSize: "14px", color: "#777" }}>{item.medium}</p>
                  <p style={{ fontSize: "14px", color: "#777" }}>
                    Dimensions: {item.width} × {item.height} px
                  </p>
                  <p style={{ fontSize: "14px", color: "#444" }}>{item.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", color: "#777" }}>No images found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageSearchMain;
