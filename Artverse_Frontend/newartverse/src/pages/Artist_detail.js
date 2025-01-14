import React from 'react';
import '../styles/Artist_detail.css';
import Artist_detail_header from '../components/Artist_detail_header';
import Artist_detail_main from '../components/Artist_detail_main';
// import Artist_detail_footer from '../components/Artist_detail_footer'; // If needed in the future

function Artist_detail() {
  return (
    <div className='artist-detail'>
      <Artist_detail_header />
      <Artist_detail_main />
      {/* Uncomment below if the footer is needed */}
      {/* <Artist_detail_footer /> */}
    </div>
  );
}

export default Artist_detail;
