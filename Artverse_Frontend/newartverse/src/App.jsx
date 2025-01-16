import './App.css';
import { Navigation } from "./components/navigation";
import { Landing_Page_Main } from './components/Landing_Page_Main';
import { Landing_Page_Forth_Section } from './components/Landing_Page_Forth_Section';
import { Landing_Page_Artist_Section } from './components/Landing_Page_Artist_Section';
import { Landing_Page_fifth_Section } from './components/Landing_Page_Fifth_Section';
import { Landing_Page_Sixth_Section } from './components/Landing_Page_Sixth_Section';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Landing_Page_Seventh_Section } from './components/Landing_Page_Seventh_Section';
import { Footer } from './components/Footer';
import data from './data/data.json';
import React, { useState, useEffect } from "react";

function App() {
  const [landingPageData, setLandingPageData] = useState({});

  useEffect(() => {
    setLandingPageData(data);
  }, []);

  return (
    <div className="App">
      <Router>
        <Navigation />
        <Routes>
          <Route
            path="/"
            element={
              landingPageData.LandingPage ? (
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
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
