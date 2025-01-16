import React from "react";
import { Link } from 'react-router-dom';
import Artist_Image from '../assets/images/Landing_Page_Image1.png'; // Adjust this path as necessary

export const Landing_Page_Main = (props) => {
  return (
    <div id="about" style={{ marginTop: '200px' }}> {/* Added margin-top */}
      <div className="container landing-page-container"> {/* Added class for styling */}
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <div className="textabout-">
              <h2 className="main-heading">{props.data.mainHeading}</h2>
              <h5 className="second-heading">{props.data.secondHeading}</h5>
              <Link to="/signup" className="button-link">
                <button className='landing_button'>{props.data.buttonText}</button>
              </Link>
            </div>
          </div>
          <div className="col-xs-12 col-md-6 image-container">
            <img src={Artist_Image} className="img-responsive right-image" alt="Artist Heaven" /> {/* Moved image here */}
          </div>
        </div>
      </div>
    </div>
  );
};
