// src/components/LeftImage.js
import React from 'react';
// import '../styles/LeftImage.css';
import leftimage from '../assets/images/Left_Image_Signup_Page.png'
import '../styles/SignInPage.css'; // Ensure to import your custom CSS



const Left_Image_Signup_page = () => {
  return (
    <div>
      <img
        src={leftimage}
        alt="Left side visual"
        className="left-image"
      />
    </div>
  );
};

export default Left_Image_Signup_page;
