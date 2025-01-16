// src/pages/Sign_In.jsx
import React from 'react';
import Left_Image_Signin_page from '../components/Sign_In_Page/Left_Image';
import Right_Section_Signin_page from '../components/Sign_In_Page/Right_Section';
import '../styles/Sign_In_Page_Css/SignInPage.css';

const Sign_In = () => {
  return (
    <div className="signin-container">
      <div className="left-image-container">
        <Left_Image_Signin_page />
      </div>
      <div className="right-section">
        <Right_Section_Signin_page />
      </div>
    </div>
  );
};

export default Sign_In;
