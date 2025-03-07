import React from "react";
import axios from "axios"; // To handle API requests
import "../styles/SpecificPage/Specific_Painting_Image.css";

// Import all icons
import LikeIcon from "../assets/images/like_icon.png";
import ShareIcon from "../assets/images/share_icon.png";
import BagIcon from "../assets/images/bag_icon.png";
import EyeIcon from "../assets/images/eye_icon.png";
import BookmarkIcon from "../assets/images/shopping_icon2.png";

export default function Specific_Paintings_Image({ artwork }) {
  if (!artwork) return <p>Loading...</p>;

  const imageUrl = artwork.image.startsWith("http")
    ? artwork.image
    : `http://localhost:4000${artwork.image}`;

  // Add to Cart Function
  const handleAddToCart = async () => {
    try {
      const userEmail =
        sessionStorage.getItem("email") || "guest@example.com";

      const response = await axios.post("http://localhost:4000/api/cart/add", {
        userEmail,
        title: artwork.artwork || "Untitled",
        artist: artwork.artist || "Unknown Artist",
        price: artwork.price,
        quantity: 1,
        image: artwork.image,
      });

      if (response.status === 200) {
        alert("Item successfully added to cart!");
      } else {
        alert("Failed to add item to cart.");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("An error occurred while adding the item to the cart.");
    }
  };

  return (
    <div className="specific-artwork-container">
      {/* Artwork Image */}
      <div className="featured-art1">
        <img src={imageUrl} alt={artwork.artwork} className="background-image11" />
      </div>

      {/* Artwork Details */}
      <div className="artwork-details-container">
        <div className="heading-icons-container">
          <h2 className="specific-h2">{artwork.artwork || "Untitled"}</h2>
          <div className="icons-container">
            <img src={LikeIcon} alt="Like" className="icon" />
            <img src={ShareIcon} alt="Share" className="icon" />
            <img
              src={BagIcon}
              alt="Add to Cart"
              className="icon"
              onClick={handleAddToCart}
              style={{ cursor: "pointer" }}
            />
            <img src={EyeIcon} alt="View" className="icon" />
            <img src={BookmarkIcon} alt="Bookmark" className="icon" />
          </div>
        </div>

        {/* Artwork Meta Information */}
        <h2 className="specific-Price">Rs. {artwork.Price}</h2>
        <p className="artwork-meta">
          By <strong>{artwork.artist || "Unknown Artist"}</strong> |{" "}
          <em>{artwork.style || "Unknown Style"}</em> | {artwork.date || "Unknown Date"}
        </p>
        <p className="artwork-dimensions">
          Dimensions: {artwork.width} x {artwork.height} cm
        </p>
        <p className="artwork-description">{artwork.description || "No description available."}</p>
      </div>
    </div>
  );
}
