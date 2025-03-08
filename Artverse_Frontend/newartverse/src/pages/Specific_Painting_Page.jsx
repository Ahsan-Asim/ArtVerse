import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import '../styles/SpecificPage/Specific_Page.css'; 
import Specific_Paintings_Image from '../components/Specific_Paintings_Image.jsx';
import Specefic_Paintings_Specification from '../components/Specefic_Paintings_Specification.jsx';
import Specific_Paintings_Paintings from '../components/Specific_Paintings_Paintings.jsx';
import { NavigationBar } from "../components/Home_Page_Navigation.jsx";
import { Footer } from "../components/Footer.jsx";

function Specific_Painting_Page() {
  const location = useLocation();
  const navigate = useNavigate();
  const { artwork } = location.state || {}; // Retrieve artwork data

  if (!artwork) {
    return (
      <div className='specific_page'>
        <NavigationBar />
        <div style={{ paddingTop: "150px", minHeight: "80vh", textAlign: "center" }}>
          <p>No artwork data available.</p>
          <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className='specific_page'>
      <NavigationBar />
      <div style={{ paddingTop: "150px"}}>
        <Specific_Paintings_Image artwork={artwork} />
        <Specefic_Paintings_Specification />
        <Specific_Paintings_Paintings />
        <Footer />
      </div> 
    </div>
  );
}

export default Specific_Painting_Page;
