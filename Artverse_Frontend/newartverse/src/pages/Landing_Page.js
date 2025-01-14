import React from 'react';
import '../styles/Landing_Page.css'; // Ensure to import your custom CSS
import Landing_Page_Header from '../components/Landing_Page_Header';
import Landing_Page_Main_Section from '../components/Landing_Page_Main_Section';
import Landing_Page_Artist_Section from '../components/Landing_Page_Artist_Section';
import Landing_Page_Forth_Section from '../components/Landing_Page_Forth_Section';
import Landing_Page_fifth_Section from '../components/Landing_Page_fifth_Section';
import Landing_Page_Sixth_Section from '../components/Landing_Page_Sixth_Section';
import Landing_Page_Seventh_Section from '../components/Landing_Page_Seventh_Section';
import Landing_Page_Footer from '../components/Landing_Page_Footer';

function Landing_Page() {
  return (
    <div className='landing_page'>
      <Landing_Page_Header />
      <Landing_Page_Main_Section />
      <Landing_Page_Artist_Section />
      <Landing_Page_Forth_Section />
      <Landing_Page_fifth_Section />
      <Landing_Page_Sixth_Section />
      <Landing_Page_Seventh_Section />
      <Landing_Page_Footer />
      
    </div>
  )
}

export default Landing_Page;
