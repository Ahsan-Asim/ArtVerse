import './App.css';
import { Navigation } from "./components/navigation";
import { Landing_Page_Main } from './components/Landing_Page_Main';
import { Landing_Page_Forth_Section } from './components/Landing_Page_Forth_Section';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
                  <Landing_Page_Forth_Section data={landingPageData.LandingPageForthSection} />
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
