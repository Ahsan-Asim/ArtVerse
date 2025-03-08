import React from "react";
import "../styles/About_us_3rd_sec.css";

function About_us_3rd_sec() {
  return (
    <div className="main">
      <div className="text1">
        <h2>OUR TEAM</h2>
        <p>
          Our team is a passionate group of creators, technologists, and art
          lovers dedicated to empowering artists and art enthusiasts alike.
          We’re united by a vision to make art accessible, meaningful, and
          celebrated, bringing together diverse talents to build a platform
          where creativity knows no bounds.
        </p>
      </div>

      <div className="profile-cards-container10">
        {/* First Card */}
        <div className="profile-card10">
          <div
            className="card-image"
            style={{
              backgroundImage: `url(${require("../assets/images/Artist_Image.png")})`,
            }}
          ></div>
          <div className="card-details">
            <div className="detail-row">
              <h2>Rohit Kumar</h2>
              <h3>Team Leader</h3>
            </div>
            <p>
            Special thanks to <b>Rohit</b>, the brilliant designer behind the Figma designs for this project. Their creativity and attention to detail have brought our vision to life, making this website not only functional but visually stunning. We truly appreciate their invaluable contribution to this journey!
            </p>
          </div>
        </div>

        {/* Second Card */}
        <div className="profile-card10">
          <div
            className="card-image"
            style={{
              backgroundImage: `url(${require("../assets/images/designer.png")})`,
            }}
          ></div>
          <div className="card-details">
            <div className="detail-row">
              <h2>Wajeeha Kashaf</h2>
              <h3>Designer</h3>
            </div>
            <p>
            A huge thank you to Wajeeha for her incredible support in designing the React components and helping with various aspects of the project. Her dedication and expertise have played a key role in bringing this website to life. We are truly grateful for her invaluable assistance and teamwork throughout the development process!
            </p>
          </div>
        </div>

        {/* Third Card */}
        <div className="profile-card10">
          <div
            className="card-image"
            style={{
              backgroundImage: `url(${require("../assets/images/backend_dev.png")})`,
            }}
          ></div>
          <div className="card-details">
            <div className="detail-row">
              <h2>Ahsan Asim</h2>
              <h3>Backend Developer</h3>
            </div>
            <p>A special thanks to Ahsan for his leadership and dedication throughout this project. Taking charge of both the backend and frontend development, he ensured everything ran smoothly. Ahsan's hard work in uniting the team and guiding them toward success has been invaluable in bringing this project to completion!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About_us_3rd_sec;