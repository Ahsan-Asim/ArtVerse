// Landing_Page.jsx
import React, { useEffect, useState } from "react";
import data from '../data/data.json';
import { Landing_Page_Main } from "../components/Landing_Page_Main";
import { Landing_Page_Artist_Section } from "../components/Landing_Page_Artist_Section";
import { Landing_Page_Forth_Section } from "../components/Landing_Page_Forth_Section";
import { Landing_Page_fifth_Section } from "../components/Landing_Page_Fifth_Section";
import { Landing_Page_Sixth_Section } from "../components/Landing_Page_Sixth_Section";
import { Landing_Page_Seventh_Section } from "../components/Landing_Page_Seventh_Section";
import { Footer } from "../components/Footer";

const Landing_Page = () => {
  const [landingPageData, setLandingPageData] = useState({});

  useEffect(() => {
    setLandingPageData(data);
  }, []);

  return (
    <div>
      {landingPageData.LandingPage ? (
        <>
          <Landing_Page_Main data={landingPageData.LandingPage} />
          <Landing_Page_Artist_Section />
          <Landing_Page_Forth_Section data={landingPageData.LandingPageForthSection} />
          <Landing_Page_fifth_Section />
          <Landing_Page_Sixth_Section />
          <Landing_Page_Seventh_Section />
          <Footer />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Landing_Page;
