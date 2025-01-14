import React from 'react';
import '../styles/search.css';
import Search_page_header from '../components/Search_page_header';
import Search_page_main from '../components/Search_page_main';
import Search_page_footer from '../components/Search_page_footer';

function SearchPage() {
  return(
    <div>
      <Search_page_header/>
      <Search_page_main />
      <Search_page_footer/>
    </div>
  )
}
export default SearchPage;
