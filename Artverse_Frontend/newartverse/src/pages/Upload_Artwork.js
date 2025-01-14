import React, { useState } from "react";
import axios from "axios";
import "../styles/UploadArtworkPage.css";
import { Link } from "react-router-dom";

const Upload_Artwork = () => {
  const [artworkDetails, setArtworkDetails] = useState({
    title: "",
    category: "",
    subject: "",
    yearProduced: "",
    medium: "",
    material: "",
    style: "",
    price: "",
    height: "",
    width: "",
    depth: "",
    description: "",
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({}); // Track if fields have been touched

  // Regex validation rules
  const regexRules = {
    alphabetic: /^[A-Za-z\s]+$/, // Only letters and spaces
    price: /^(?!0$)(\d{1,7})(\.\d{1,2})?$/, // Price between $1 and $10,000,000
    year: /^(1500|1[5-9]\d{2}|20[0-2]\d|2024)$/, // Year from 1500 to 2024
  };

  // Validate a single input
  const validateInput = (name, value) => {
    let error = "";
    if (["title", "category", "medium", "material", "style"].includes(name)) {
      if (value && !regexRules.alphabetic.test(value)) {
        error = " only alphabetic characters allowed ";
      }
    } else if (name === "price") {
      const price = parseFloat(value);
      if (
        value &&
        (!regexRules.price.test(value) || price < 1 || price > 10000000)
      ) {
        error = "Price must be between $1 and $10,000,000.";
      }
    } else if (name === "yearProduced") {
      if (value && !regexRules.year.test(value)) {
        error = "Year must be between 1500 and 2024.";
      }
    }
    return error;
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const error = validateInput(name, value); // Validate the input
    setArtworkDetails({ ...artworkDetails, [name]: value });
    if (touched[name]) {
      setErrors({ ...errors, [name]: error }); // Only show error if field is touched
    }
  };

  // Handle blur event to mark a field as touched
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    const error = validateInput(name, value);
    setErrors({ ...errors, [name]: error });
  };

  // Handle file changes
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setArtworkDetails({ ...artworkDetails, image: file });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submission
    const newErrors = {};
    Object.keys(artworkDetails).forEach((field) => {
      const error = validateInput(field, artworkDetails[field]);
      if (error) newErrors[field] = error;
    });

    // If any errors exist, prevent submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert("Please fix the errors before submitting.");
      return;
    }

    // Create FormData object to send with the request
    const formData = new FormData();
    Object.keys(artworkDetails).forEach((key) => {
      formData.append(key, artworkDetails[key]);
    });

    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:4000/api/artwork/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Artwork uploaded successfully!");
        setArtworkDetails({
          title: "",
          category: "",
          subject: "",
          yearProduced: "",
          medium: "",
          material: "",
          style: "",
          price: "",
          height: "",
          width: "",
          depth: "",
          description: "",
          image: null,
        });
        setErrors({});
        setTouched({});
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert(
          "Your account is under verification. You cannot upload artwork yet."
        );
      } else {
        alert("Error uploading artwork.");
      }
    }
  };

  return (
    <div className="upload-artwork-page">
      <h1>Upload Artwork</h1>
      <form onSubmit={handleSubmit} className="upload-form">
        {/* Upload primary photo */}
        <div className="upload-primary-photo-container">
          <label htmlFor="primaryPhoto" className="upload-primary-photo-label">
            Upload Primary Photo
            <input type="file" id="primaryPhoto" onChange={handleFileChange} />
          </label>
        </div>

        {/* Grid inputs */}
        <div className="grid-container">
          {["title", "category", "medium", "material", "style"].map((field) => (
            <div key={field} className="input-container">
              <input
                type="text"
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={artworkDetails[field]}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`text-input rounded-input ${
                  errors[field] && touched[field] ? "input-error" : ""
                }`}
              />
              {errors[field] && touched[field] && (
                <span className="error-message1">{errors[field]}</span>
              )}
            </div>
          ))}
          {/* Price input */}
          <div className="input-container">
            <input
              type="number"
              name="price"
              placeholder="Price in $"
              value={artworkDetails.price}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`text-input rounded-input ${
                errors.price && touched.price ? "input-error" : ""
              }`}
            />
            {errors.price && touched.price && (
              <span className="error-message">{errors.price}</span>
            )}
          </div>
          {/* Year input */}
          <div className="input-container">
            <input
              type="number"
              name="yearProduced"
              placeholder="Year Produced"
              value={artworkDetails.yearProduced}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`text-input rounded-input ${
                errors.yearProduced && touched.yearProduced ? "input-error" : ""
              }`}
            />
            {errors.yearProduced && touched.yearProduced && (
              <span className="error-message">{errors.yearProduced}</span>
            )}
          </div>
        </div>

        {/* Dimensions input */}
        <div className="dimensions-section">
          <h3>Dimensions (inches)</h3>
          {["height", "width", "depth"].map((dim) => (
            <div key={dim} className="input-container">
              <input
                type="number"
                name={dim}
                placeholder={dim.charAt(0).toUpperCase() + dim.slice(1)}
                value={artworkDetails[dim]}
                onChange={handleInputChange}
                className="text-input rounded-input"
              />
            </div>
          ))}
        </div>

        {/* Description textarea */}
        <div className="form-section">
          <textarea
            name="description"
            placeholder="Description"
            value={artworkDetails.description}
            onChange={handleInputChange}
            className="textarea rounded-input"
          ></textarea>
        </div>

        {/* Submit button */}
        <button type="submit" className="save-button">
          Save Artwork
        </button>
      </form>
    </div>
  );
};

export default Upload_Artwork;
