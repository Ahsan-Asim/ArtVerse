// src/pages/signin_page.js
import React from 'react';
import Left_Image_Signin_page from '../components/Left_Image_Signin_page';
import Right_Section_Signin_page from '../components/Right_Section_Signin_page';
import '../styles/SignInPage.css'; // Ensure to import your custom CSS

const SignInPage = () => {
  return (
    <div className="container d-flex" style={{ height: '830px' , position: 'relative'  }}>
      <div className="left-image-container">
        <Left_Image_Signin_page />
      </div>
      <div className="right-section">
        <Right_Section_Signin_page />
      </div>
    </div>
  );
};

export default SignInPage;
