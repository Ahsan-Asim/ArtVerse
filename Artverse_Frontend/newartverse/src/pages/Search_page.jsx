import React from 'react';
import '../styles/SearchPage/search.css';
import { NavigationBar } from "../components/Home_Page_Navigation.jsx";
import { Footer } from "../components/Footer.jsx";
import Search_page_main from '../components/Search_page_main.jsx';

function SearchPage() {
  return(
    <div className='Search_page'>
    <NavigationBar />
    <div style={{ paddingTop: "150px", minHeight: "80vh" }}>
    <Search_page_main />
    </div> 
    <Footer />  
  </div>
  )
}
export default SearchPage;