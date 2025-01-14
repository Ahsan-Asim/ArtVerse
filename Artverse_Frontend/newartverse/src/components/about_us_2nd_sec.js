import React from "react";
import FeaturedImage1 from '../assets/images/Rectangle 85.png';

function About_us_2nd_sec() {
  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      <img src={FeaturedImage1} alt="Featured Art" className="w-full h-full object-cover object-center" />
      <div className="absolute bottom-[30px] left-1/2 transform -translate-x-1/2 text-center text-white w-[90%]">
        <p className="text-xl sm:text-2xl md:text-3xl font-normal leading-[58px] mt-2">
          Artverse: Where creativity connects and collections come to life.
          Discover, create, and celebrate art in a thriving digital community.
        </p>
      </div>
    </div>
  );
}

export default About_us_2nd_sec;
