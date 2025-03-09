

// export default Service_Page_Meet_Artists;
import React from "react";
import "../styles/ServicePage/Service_Page_Meet_Artists.css";
import img1 from "../assets/images/backend_dev.png";
import img2 from "../assets/images/Artist_Image.png";
import img3 from "../assets/images/backend_dev.png";
import img4 from "../assets/images/backend_dev.png";

const Review = () => {
  return (
    <div className="review-container">
      <h1>What Our Customers Say</h1>
      <div className="review-grid">
        <div className="review-box">
          <img src={img1} alt="Customer" />
          <h2>Sarah Johnson</h2>
          <h3>New York, USA</h3>
          <p>"Fantastic service! The quality exceeded my expectations. Will definitely return!"</p>
        </div>
        <div className="review-box">
          <img src={img2} alt="Customer" />
          <h2>James Carter</h2>
          <h3>London, UK</h3>
          <p>"Very professional and timely delivery. Highly recommended for everyone!"</p>
        </div>
        <div className="review-box">
          <img src={img3} alt="Customer" />
          <h2>Linda Martinez</h2>
          <h3>Toronto, Canada</h3>
          <p>"I am impressed with the attention to detail. The best experience I've had!"</p>
        </div>
        <div className="review-box">
          <img src={img4} alt="Customer" />
          <h2>Michael Brown</h2>
          <h3>Sydney, Australia</h3>
          <p>"Excellent craftsmanship and customer service. Will definitely be back!"</p>
        </div>
      </div>
    </div>
  );
};

export default Review;
