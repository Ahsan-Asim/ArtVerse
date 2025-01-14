import React from 'react';
import image from '../assets/images/Ellipse 18.png';
import rectangle from '../assets/images/Rectangle 69.png';

function About_us_1st_sec() {
  return (
    <div className='flex flex-col w-full h-[1100px]'>
      <div className="flex flex-col md:flex-row items-center justify-center bg-pink-500 w-full min-h-[733px] relative">
        <h1 className="text-3xl font-bold text-center md:text-5xl">About Us</h1>
        <img src={image} className="absolute bottom-0 right-0 w-[477px] h-[178.5px]" alt="Decorative Element" />
      </div>
      <div className="flex flex-col md:flex-row w-full min-h-[367px] bg-white">
        <div className="flex justify-center items-center w-full md:w-1/2 p-4">
          <img src={rectangle} alt="Left Section Graphic" className="w-full max-w-[603px] h-auto" />
        </div>
        <div className="flex flex-col justify-center w-full md:w-1/2 p-4">
          <header className="text-xl font-bold mb-2">OUR MISSION</header>
          <p className="text-base leading-6">
            At Artverse, our mission is to bridge the gap between artists and art enthusiasts by creating a vibrant, accessible platform where creativity thrives. We empower artists to showcase their work, connect with an engaged community, and bring unique, meaningful art to the world. Through innovative tools and a supportive environment, we aim to make art more discoverable, collectible, and appreciated globally.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About_us_1st_sec;
