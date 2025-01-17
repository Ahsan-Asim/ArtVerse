// Updated Sign_Up.jsx
// src/pages/signin_page.js
import React from 'react';
import LeftImageSignup from '../components/Sign_Up_Page/Left_Image_Signup_page';
import RightSectionSignup from '../components/Sign_Up_Page/Right_Section_Signup_page';
import '../styles/Sign_Up_Page/SignUp.css';

const SignUp = () => {
  return (
    <div className="signup-container d-flex" style={{ height: '830px', position: 'relative' }}>
      <div className="signup-left-image">
        <LeftImageSignup />
      </div>
      <div className="signup-right-section">
        <RightSectionSignup />
      </div>
    </div>
  );
};

export default SignUp;