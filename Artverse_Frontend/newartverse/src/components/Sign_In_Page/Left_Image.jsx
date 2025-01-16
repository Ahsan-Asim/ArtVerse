// src/components/LeftImage.js
import React from 'react';
// import leftImage from '../assets/images/Left_Image_Signin_Page.png';
// import leftImage from '../../assets/images/Left_Image_Signin_Page.png';
import leftImage from '../../assets/images/Left_Image_Signin_Page.png';
import '../../styles/Sign_In_Page_Css/LeftImageSignin.css';

const Left_Image_Signin_page = () => {
  return (
    <div>
      <img src={leftImage} alt="Creative visual" className="left-image1" />
    </div>
  );
};

export default Left_Image_Signin_page;
