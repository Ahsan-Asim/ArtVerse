import React from 'react'
import '../styles/Artist_studio.css';
import Artist_studio_header from '../components/Artist_studio_header.js';
import Artist_studio_main from '../components/Artist_studio_main.js';
import Artist_studio_footer from '../components/Artist_studio_footer.js';

function Artist_studio() {
  return (
    <div className='artist-studio'>
      <Artist_studio_header />
      <Artist_studio_main />
      {/* <Artist_studio_footer /> */}
    </div>
  )
}

export default Artist_studio
