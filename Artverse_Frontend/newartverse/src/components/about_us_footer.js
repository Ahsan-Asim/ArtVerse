import React from 'react'

function About_us_footer() {
  return (
    <div>
      <footer className="w-full h-[410px] bg-[#f8f8f8] flex p-5 mx-auto absolute top-[3300px] left-0">
        {/* Logo */}
        <div className="w-[253px] h-[329px] bg-contain bg-no-repeat" style={{ backgroundImage: `url(${require('../assets/images/ArtVerse_Logo.png')})` }}></div>

        {/* Footer Content */}
        <div className="flex flex-wrap justify-between w-full max-w-screen-xl pl-7">
          {/* Column 1 */}
          <div className="w-full sm:w-[22%] mb-6 sm:mb-0">
            <h4 className="text-lg text-[#333] mb-3">For Collectors</h4>
            <ul className="list-none p-0 space-y-2">
              <li>Digital Art / NFTs</li>
              <li>Art Category</li>
              <li>Artist</li>
              <li>Seller Forum</li>
              <li>Collector’s Support</li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="w-full sm:w-[22%] mb-6 sm:mb-0">
            <h4 className="text-lg text-[#333] mb-3">Drawing</h4>
            <ul className="list-none p-0 space-y-2">
              <li>M.F Hussain</li>
              <li>Sell Your Art</li>
              <li>Resell Work</li>
              <li>Sh Raza</li>
              <li>Artverse For Sellers</li>
              <li>Collector’s FAQ</li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="w-full sm:w-[22%] mb-6 sm:mb-0">
            <h4 className="text-lg text-[#333] mb-3">Art By Price</h4>
            <ul className="list-none p-0 space-y-2">
              <li>Paintings</li>
              <li>Under Rs 2500</li>
              <li>Photography</li>
              <li>Rs 25000 - Rs 1 lac</li>
              <li>Print Making</li>
              <li>Rs 1 lac - Rs 3 lac</li>
              <li>Sculpture</li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="w-full sm:w-[22%] mb-6 sm:mb-0">
            <h4 className="text-lg text-[#333] mb-3">Services</h4>
            <ul className="list-none p-0 space-y-2">
              <li>Jatin</li>
              <li>Sellers FAQ</li>
              <li>Ahsan Asim</li>
              <li>Support</li>
              <li>Bon Proctor</li>
              <li>Sellings KYC</li>
              <li>Laxmi Kaur</li>
              <li>Victor Frankl</li>
              <li>Rohit Kumar</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default About_us_footer;
