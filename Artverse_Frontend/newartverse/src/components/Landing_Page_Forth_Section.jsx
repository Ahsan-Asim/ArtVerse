import React from "react";

export const Landing_Page_Forth_Section = (props) => {
  return (
    <header id="forth-section">
      <div className="forth-intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
                <h1 className="main-heading1">
                  {props.data ? props.data.title : "Explore Inspiring Designs"}
                  <span></span>
                </h1>
                <p>{props.data ? props.data.paragraph : "We Have Best Artwork"}</p>
                <div className="text-with-background">
                  <h1 className="overlay-text">
                    <b>We Have Best Artwork</b>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
