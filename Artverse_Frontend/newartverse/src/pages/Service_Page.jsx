import React from 'react';

import '../styles/Service_Page.css'; // Ensure to import your custom CSS
// import Service_Page_Header from '../components/Service_Page_Header';
import { Navigation } from '../components/navigation';
import Service_Page_Main from '../components/Service_Page_Main';
import Service_Page_Paintings from '../components/Service_Page_Paintings';
import Service_Page_Meet_Artists from '../components/Service_Page_Meet_Artists';
// import { Footer } from '../components/Footer';
// import Service_Page_Footer from '../components/Service_Page_Footer';
import { Footer } from '../components/Footer';



function Service_Page() {
  return (
    <div className='Service_Page'>
      <Navigation />
      <Service_Page_Main />
      <Service_Page_Paintings />
      <Service_Page_Meet_Artists />
      <Footer />



      {/* <Service_Page_Header />
      <Service_Page_Main />
      <Service_Page_Paintings />
      <Service_Page_Meet_Artists />
      <Service_Page_Footer /> */}
      
    </div>
  )
}

export default Service_Page;
