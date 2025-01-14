import React from "react";

function About_us_3rd_sec() {
  return (
    <div className="flex flex-col items-center text-center p-5">
      <div className="max-w-2xl mb-10">
        <h2 className="text-3xl font-semibold">OUR TEAM</h2>
        <p className="text-base mt-4">
          Our team is a passionate group of creators, technologists, and art
          lovers dedicated to empowering artists and art enthusiasts alike.
          We’re united by a vision to make art accessible, meaningful, and
          celebrated, bringing together diverse talents to build a platform
          where creativity knows no bounds.
        </p>
      </div>

      <div className="flex flex-wrap gap-5 justify-center">
        {/* First Card */}
        <div className="w-[300px] rounded-lg shadow-lg bg-white flex flex-col items-center overflow-hidden">
          <div
            className="w-full h-[200px] bg-cover bg-center"
            style={{
              backgroundImage: `url(${require("../assets/images/Artist_Image.png")})`,
            }}
          ></div>
          <div className="p-5 flex flex-col items-center text-center">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-medium">Rohit Kumar</h2>
              <h3 className="text-sm text-gray-600">Team Leader</h3>
            </div>
            <p className="text-sm mt-3">
              An entrepreneur and visionary leader, Rohit Kumar guides Artverse
              with a commitment to innovation and empowering the art community.
            </p>
          </div>
        </div>

        {/* Second Card */}
        <div className="w-[300px] rounded-lg shadow-lg bg-white flex flex-col items-center overflow-hidden">
          <div
            className="w-full h-[200px] bg-cover bg-center"
            style={{
              backgroundImage: `url(${require("../assets/images/designer.png")})`,
            }}
          ></div>
          <div className="p-5 flex flex-col items-center text-center">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-medium">Wajeeha Kashaf</h2>
              <h3 className="text-sm text-gray-600">Designer</h3>
            </div>
            <p className="text-sm mt-3">
              She is a very chill girl who only eats, sleeps, and repeats. A
              very lazy girl.
            </p>
          </div>
        </div>

        {/* Third Card */}
        <div className="w-[300px] rounded-lg shadow-lg bg-white flex flex-col items-center overflow-hidden">
          <div
            className="w-full h-[200px] bg-cover bg-center"
            style={{
              backgroundImage: `url(${require("../assets/images/backend_dev.png")})`,
            }}
          ></div>
          <div className="p-5 flex flex-col items-center text-center">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-medium">Ahsan Asim</h2>
              <h3 className="text-sm text-gray-600">Backend Developer</h3>
            </div>
            <p className="text-sm mt-3">
              He is also a bad boy, "snake chupa rustam", and a lot more.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About_us_3rd_sec;
