// src/components/LeftImage.js
import React from 'react';
// import '../styles/LeftImage.css';
import leftImage from '../assets/images/Left_Image_Signin_Page.png'; // Import the image directly
import '../styles/SignInPage.css'; // Ensure to import your custom CSS



const Left_Image_Signin_page = () => {
  return (
    <div>
      <img
        src={leftImage}
        alt="Left side visual"
        className="left-image"
      />
    </div>
  );
};

export default Left_Image_Signin_page;
