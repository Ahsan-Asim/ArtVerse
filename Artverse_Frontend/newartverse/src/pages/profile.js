import React from 'react'
import Profile_header from '../components/Profile_header'
import Profile_main from '../components/Profile_main'
import Profile_footer from '../components/Profile_footer'
import '../styles/Profile.css'
function profile() {
  return (
    <div className='profile'>
      <Profile_header />
      <Profile_main />
      <Profile_footer />
    </div>
  )
}

export default profile
