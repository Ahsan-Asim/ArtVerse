import React from 'react';
import Logo from "../assets/images/ArtVerse_Logo.png"; // Correct path to your logo
import SearchIcon from "../assets/images/search.png"; // Correct path to your search icon
import ShoppingIcon from "../assets/images/shopping.png"; // Correct path to your shopping icon
import LikeIcon from "../assets/images/heart.png"; // Correct path to your like icon
import ProfileIcon from "../assets/images/profile.png"; // Correct path to your profile icon

function About_us_header() {
  return (
    <div>
      <header className="w-full flex items-center justify-between px-5 py-10 bg-[#fffdf4] rounded-2xl">
        <a href="/" className="flex-shrink-0">
          <img src={Logo} alt="ArtVerse Logo" className="w-44 h-32" />
        </a>
        <div className="flex space-x-10">
          <a href="/become-artist" className="font-aleo text-lg font-medium text-left">Become Artist</a>
          <a href="/why-us" className="font-aleo text-lg font-medium text-left">Why Us</a>
          <a href="/explore-digital-art" className="font-aleo text-lg font-medium text-left">Explore Digital Art</a>
        </div>
        <div className="flex items-center w-96 h-10 relative border-2 border-black rounded-full bg-gradient-to-r from-[#fffdf4] to-[#998486]">
          <img src={SearchIcon} alt="Search Icon" className="w-7 h-7 ml-3" />
          <input
            type="text"
            placeholder="Search"
            className="w-full h-full border-none outline-none pl-5 text-lg font-light"
          />
        </div>
        <div className="flex space-x-5">
          <a href="/cart" className="flex-shrink-0">
            <img src={ShoppingIcon} alt="Shopping Icon" className="w-14 h-12" />
          </a>
          <a href="/favorites" className="flex-shrink-0">
            <img src={LikeIcon} alt="Like Icon" className="w-14 h-12" />
          </a>
          <a href="/profile" className="flex-shrink-0">
            <img src={ProfileIcon} alt="Profile Icon" className="w-12 h-12" />
          </a>
        </div>
      </header>

      {/* New Row of Headings */}
      <div className="flex justify-center mt-2 space-x-6">
        <a href="/paintings" className="font-aleo text-lg font-medium text-gray-800 hover:text-gray-600">Paintings</a>
        <a href="/sculptures" className="font-aleo text-lg font-medium text-gray-800 hover:text-gray-600">Sculptures</a>
        <a href="/photography" className="font-aleo text-lg font-medium text-gray-800 hover:text-gray-600">Photography</a>
        <a href="/digital-arts" className="font-aleo text-lg font-medium text-gray-800 hover:text-gray-600">Digital Arts</a>
        <a href="/auctions" className="font-aleo text-lg font-medium text-gray-800 hover:text-gray-600">Auctions</a>
        <a href="/events" className="font-aleo text-lg font-medium text-gray-800 hover:text-gray-600">Events</a>
      </div>
    </div>
  );
}

export default About_us_header;
