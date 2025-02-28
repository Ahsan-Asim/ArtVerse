import React from "react";
import { Link } from "react-router-dom"; // Import Link for routing


import LikeIcon from "../assets/images/like_icon.png";
import ShoppingIcon from "../assets/images/shopping_icon.png";
import Home9 from "../assets/images/home9.png";
import Home10 from "../assets/images/home10.png";
import Home11 from "../assets/images/home11.png";

export const Landing_Page_fifth_Section = (props) => {
  const artworks = [
    {
      title: "Flowery",
      artist: "Asif Hussain",
      type: "Painting",
      material: "Oil, Acrylic on Canvas",
      dimensions: "72 x 52 Inches",
      priceOld: "Rs. 80,000",
      priceNew: "Rs. 71,000",
      discount: "30% OFF",
      image: Home9, // Directly use the imported image
    },
    {
      title: "Colour Paintings",
      artist: "Artist Name",
      type: "Artist Spotlights",
      material: "Oil, Acrylic on Canvas",
      dimensions: "60 x 40 Inches",
      priceOld: "Rs. 90,000",
      priceNew: "Rs. 81,000",
      discount: "10% OFF",
      image: Home10, // Directly use the imported image
    },
    {
      title: "Asian Mysticism",
      artist: "Artist Name",
      type: "Englo Art",
      material: "Acrylic on Canvas",
      dimensions: "50 x 70 Inches",
      priceOld: "Rs. 100,000",
      priceNew: "Rs. 90,000",
      discount: "15% OFF",
      image: Home11, // Directly use the imported image
    },
  ];

  return (
    <div id="portfolio" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Explore Inspiring Designs</h2>
          <p>Discover the beauty and creativity of our curated art collection.</p>
        </div>
        <div className="row">
          {artworks.map((art, index) => (
            <div key={index} className="col-sm-6 col-md-4 col-lg-4">
              <div className="art-card">
                {/* Use the imported image directly */}
                <div
                  className="card-image"
                  style={{
                    backgroundImage: `url(${art.image})`, // Use the imported image
                  }}
                ></div>
                <div className="card-details">
                  <div className="left-details">
                    <h3 className="art-title">{art.title}</h3>
                    <p className="artist-name">By {art.artist}</p>
                    <p className="art-type">{art.type}</p>
                    <p className="art-material">{art.material}</p>
                    <p className="dimensions">{art.dimensions}</p>
                  </div>
                  <div className="right-details">
                    <p className="price-old">{art.priceOld}</p>
                    <p className="price-new">{art.priceNew}</p>
                    <p className="discount">{art.discount}</p>
                  </div>
                </div>
                <div className="card-buttons">
                  <button className="icon-container">
                    <img src={LikeIcon} alt="Like" />
                  </button>
                  <button className="icon-container">
                    <img src={ShoppingIcon} alt="Shopping" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row" style={{marginTop: "100px"}}>
          {artworks.map((art, index) => (
            <div key={index} className="col-sm-6 col-md-4 col-lg-4">
              <div className="art-card">
                {/* Use the imported image directly */}
                <div
                  className="card-image"
                  style={{
                    backgroundImage: `url(${art.image})`, // Use the imported image
                  }}
                ></div>
                <div className="card-details">
                  <div className="left-details">
                    <h3 className="art-title">{art.title}</h3>
                    <p className="artist-name">By {art.artist}</p>
                    <p className="art-type">{art.type}</p>
                    <p className="art-material">{art.material}</p>
                    <p className="dimensions">{art.dimensions}</p>
                  </div>
                  <div className="right-details">
                    <p className="price-old">{art.priceOld}</p>
                    <p className="price-new">{art.priceNew}</p>
                    <p className="discount">{art.discount}</p>
                  </div>
                </div>
                <div className="card-buttons">
                  <button className="icon-container">
                    <img src={LikeIcon} alt="Like" />
                  </button>
                  <button className="icon-container">
                    <img src={ShoppingIcon} alt="Shopping" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row" style={{marginTop: "100px"}}>
          {artworks.map((art, index) => (
            <div key={index} className="col-sm-6 col-md-4 col-lg-4">
              <div className="art-card">
                {/* Use the imported image directly */}
                <div
                  className="card-image"
                  style={{
                    backgroundImage: `url(${art.image})`, // Use the imported image
                  }}
                ></div>
                <div className="card-details">
                  <div className="left-details">
                    <h3 className="art-title">{art.title}</h3>
                    <p className="artist-name">By {art.artist}</p>
                    <p className="art-type">{art.type}</p>
                    <p className="art-material">{art.material}</p>
                    <p className="dimensions">{art.dimensions}</p>
                  </div>
                  <div className="right-details">
                    <p className="price-old">{art.priceOld}</p>
                    <p className="price-new">{art.priceNew}</p>
                    <p className="discount">{art.discount}</p>
                  </div>
                </div>
                <div className="card-buttons">
                  <button className="icon-container">
                    <img src={LikeIcon} alt="Like" />
                  </button>
                  <button className="icon-container">
                    <img src={ShoppingIcon} alt="Shopping" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Link to="/signup" className="button-link">
        <button className="sixth-sec-button" style={{marginBottom:'10px',  alignItems:'center'}}>
          <b>Explore More</b>
        </button>
      </Link>
    </div>
  );
};
