import React from "react";
import { Link } from "react-router-dom";
import SideImage from "../assets/images/Landing_Page_Image3.png"; // Correct path to your image
import ArtistsSign from "../assets/images/Artist_Sign.png"; // Correct path to your image

export const Landing_Page_Sixth_Section = () => {
  return (
    <div className="sixth-sec-main" >
      
      <div className="sixth-sec-container">
        <div className="sixth-sec-image-container">
          <img src={SideImage} alt="Art" className="sixth-sec-styled-image" />
        </div>
        <div className="sixth-sec-text-container">
          <h3 className="sixth-sec-heading">Find Art You Love</h3>
          <p className="sixth-sec-para">
            “At Artverse, we make it our mission to help you discover and buy
            from the best emerging artists around the world. Whether you’re
            looking to discover a new artist, add a statement piece to your
            home, or commemorate an important life event, Artverse is your
            portal to thousands of original works by today’s top artists.”
          </p>
          <img src={ArtistsSign} alt="Artist Signature" className="sixth-sec-pic" />
          <h3 className="sixth-sec-head3">Chief Curator & VP, Art Advisory</h3>
        </div>
      </div>
    </div>
  );
};

export default Landing_Page_Sixth_Section;
