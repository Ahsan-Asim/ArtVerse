import React from 'react';
import SideImage from '../assets/images/Landing_Page_Image3.png'; // Correct path to your profile icon
import ArtistsSign from '../assets/images/Artist_Sign.png'; // Correct path to your profile icon

function About_us_4th_sec() {
  return (
    <div className="flex flex-col md:flex-row mt-5 w-full">
      <div className="flex-1">
        <img
          src={SideImage}
          alt="Description"
          className="w-full h-auto rounded-2xl"
        />
      </div>
      <div className="flex-1 bg-pink-200 flex flex-col justify-center p-5 rounded-2xl">
        <h3 className="text-4xl font-serif text-center mb-4 md:text-5xl md:leading-tight">Find Art You Love</h3>
        <p className="text-lg text-center mb-5">
          “At Artverse, we make it our mission to help you discover and buy from the best emerging artists around the world.
          Whether you’re looking to discover a new artist, add a statement piece to your home, or commemorate an important life event,
          Artverse is your portal to thousands of original works by today’s top artists.”
        </p>
        <div className="flex justify-center">
          <img
            src={ArtistsSign}
            alt=""
            className="w-[375px] h-[112px] object-contain"
          />
        </div>
        <h3 className="text-center text-xl mt-4">Chief Curator & VP, Art Advisory</h3>
      </div>
    </div>
  );
}

export default About_us_4th_sec;
