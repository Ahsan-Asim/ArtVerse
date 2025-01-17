
import React from 'react';

import leftImage from '../../assets/images/Left_Image_Signin_Page.png';
import '../../styles/Sign_In_Page_Css/LeftImageSignin.css';

const Left_Image_Signin_page = () => {
  return (
    <div className='left-image-container '>
      <img
        src={leftImage}
        alt="Left side visual"
        className="left-image"
      />
      </div>
  );
};

export default Left_Image_Signin_page;
