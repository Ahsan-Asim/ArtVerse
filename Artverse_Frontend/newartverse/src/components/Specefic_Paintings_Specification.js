import React from "react";
import "../styles/Specefic_Paintings_Specification.css"; // Ensure to import your custom CSS
import ArtistImage from "../assets/images/Artist_Image.png";
import vVerifiedIcon from "../assets/images/verified_icon.png";

function Specefic_Paintings_Specification() {
  return (
    <div className="artist-details-row">
      {/* Left Container */}
      <div className="left-container">
        <div className="key-value-pairs">
          <h3 style={{ textAlign: "center" }}>Specifications</h3>
          <div className="pair">
            <span className="key">Name:</span>
            <span className="value">Rohit Kumar</span>
          </div>
          <div className="pair">
            <span className="key">Location:</span>
            <span className="value">Islamabad, Pakistan</span>
          </div>
          <div className="pair">
            <span className="key">Art Style:</span>
            <span className="value">Abstract</span>
          </div>
          <div className="pair">
            <span className="key">Experience:</span>
            <span className="value">10 years</span>
          </div>
          <div className="pair">
            <span className="key">Specialization:</span>
            <span className="value">Painting</span>
          </div>
          <div className="pair">
            <span className="key">Achievements:</span>
            <span className="value">Featured in National Art Gallery</span>
          </div>
          <div className="pair">
            <span className="key">Contact:</span>
            <span className="value">rohit@example.com</span>
          </div>
        </div>
      </div>

      {/* Right Container */}
      <div className="right-container">
        <h3 style={{ textAlign: "center" }}>Artist</h3>

        {/* Artist Image and Info */}
        <div className="artist-info">
          <img src={ArtistImage} alt="Artist" className="artist-image" />
          <div className="artist-text">
            <h3>Rohit Kumar</h3>
            <p>Islamabad, Pakistan</p>
            <div className="verified">
              Verified{" "}
              <img
                src={vVerifiedIcon}
                alt="Verified Icon"
                className="verified-icon"
              />
            </div>

            {/* Buttons */}
            <div className="buttons-container">
              <button className="action-button">Message</button>
              <button className="action-button">Follow</button>
            </div>
          </div>
        </div>
        {/* About Artist Section */}
        <h4 className="about-heading">About Artist</h4>
        <p className="about-paragraph">
          Rohit Kumar is an artist who creates from a place of passion and
          observation. Known for blending intricate details with bold abstract
          elements, Rohit's work tells a story of personal memories and
          reflections. Each piece is a journey through patterns, textures, and
          expressive mark-making, offering a unique perspective on the world
          through their eyes.
        </p>

      </div>

      <h2 className="spec-h2">Description</h2>
      <p className="spec-p">
        Original Abstract Painting- Crafted spontaneously with layers of acrylic
        paint and gestural strokes. This artwork is an artistic voyage through
        memories, impressions of nature and practice of meditational process.
        The repetitive mark-making, reflects calm state of mind. Transform your
        home with unique, hand-painted originals of Ketki Fadnis from our online
        collections.
      </p>

      <hr className="spec-hr"></hr>
    </div>
  );
}

export default Specefic_Paintings_Specification;
