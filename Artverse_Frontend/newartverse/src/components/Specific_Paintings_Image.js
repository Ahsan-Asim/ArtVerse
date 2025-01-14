import React from 'react';
import '../styles/Specific_Painting_Image.css';

export default function Specific_Paintings_Image({ artwork }) {
  return (
    <div>
      <div className="featured-art1">
        <img
          src={artwork.image}
          alt={artwork.title}
          className="background-image11"
        />
      </div>
      <div className="heading-icons-container">
        <h2 className="specific-h2">{artwork.title}</h2>
        <div className="icons-container">
          <img src="/assets/images/like_icon.png" alt="Like" className="icon" />
          <img src="/assets/images/share_icon.png" alt="Share" className="icon" />
          <img
            src="/assets/images/bag_icon.png"
            alt="Add to Cart"
            className="icon"
          />
          <img src="/assets/images/eye_icon.png" alt="View" className="icon" />
          <img
            src="/assets/images/shopping_icon2.png"
            alt="Bookmark"
            className="icon"
          />
        </div>
      </div>
      <h2 className="specific-Price">Rs. {artwork.price}</h2>
      <p>{artwork.description}</p>
    </div>
  );
}
