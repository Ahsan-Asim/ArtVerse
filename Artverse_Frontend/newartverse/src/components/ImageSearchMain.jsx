import React, { useState } from "react";

const ImageSearch = () => {
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
    setResults(data.results);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Upload an Image or Enter URL</h2>

      <input type="file" onChange={handleFileChange} className="mb-2" />
      <input
        type="text"
        value={imageUrl}
        onChange={handleUrlChange}
        placeholder="Enter image URL"
        className="border p-2 w-full"
      />
      
      {preview && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Preview:</h3>
          <img src={preview} alt="Uploaded Preview" className="w-48 h-48 object-cover" />
        </div>
      )}

      <button onClick={fetchSimilarImages} className="bg-blue-500 text-white px-4 py-2 mt-2">
        Search Similar Images
      </button>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Results:</h3>
        <div className="grid grid-cols-3 gap-4">
          {results.map((item, index) => (
            <div key={index} className="p-2 border">
              <img src={`http://127.0.0.1:5000/fetch-image?url=${encodeURIComponent(item.image_url)}`} 
     alt="Fetched Image" 
     className="w-full h-32 object-cover" />

              <p className="text-sm font-semibold">Style: {item.style}</p>
              <p className="text-sm">Artwork: {item.artwork}</p>
              <p className="text-sm">Artist: {item.artist}</p>
              <p className="text-sm">Date: {item.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSearch;
