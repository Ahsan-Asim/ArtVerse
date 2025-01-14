import React from 'react';
import '../styles/Landing_Page_Fifth_Section.css'; // Ensure to import your custom CSS

import LikeIcon from '../assets/images/like_icon.png';
import ShoppingIcon from '../assets/images/shopping_icon.png';


function Landing_Page_fifth_Section() {
  return (
    <div>
      <h1 className='main-headin30'><b>Explore inspiring designs</b></h1>





      <div className="art-cards-container10">
      {/* First Card */}
      <div className="art-card1">
        <div className="card-image1" style={{ backgroundImage: `url(${require('../assets/images/home9.png')})` }}></div>
        <div className="card-details1">
          <div className="left-details1">
            <h3 className="art-title1">Flowery</h3>
            <p className="artist-name1">By Asif Hussain</p>
            <p className="art-type1">Painting</p>
            <p className="art-material1">Oil, Acrylic on Canvas</p>
            <p className="dimensions1">72 x 52 Inches</p>
          </div>
          <div className="right-details1">
            <p className="price-old1">Rs. 80,000</p>
            <p className="price-new1">Rs. 71,000</p>
            <p className="discount1">30% OFF</p>
          </div>
        </div>
        <div className="card-buttons1">
          <button className="icon-container1">
            <img src={LikeIcon} alt="Like" />
          </button>
          <button className="icon-container1">
            <img src={ShoppingIcon} alt="Shopping" />
          </button>
        </div>
      </div>

      {/* Second Card */}
      <div className="art-card1">
        <div className="card-image1" style={{ backgroundImage: `url(${require('../assets/images/home10.png')})` }}></div>
        <div className="card-details1">
          <div className="left-details1">
            <h3 className="art-title1">Colour Paintings</h3>
            <p className="artist-1">By Artist Name</p>
            <p className="art-type1">Artist Spotlights</p>
            <p className="art-material1">Oil, Acrylic on Canvas</p>

            <p className="dimensions1">60 x 40 Inches</p>
          </div>
          <div className="right-details1">
            <p className="price-old1">Rs. 90,000</p>
            <p className="price-new1">Rs. 81,000</p>
            <p className="discount1">10% OFF</p>
          </div>
        </div>
        <div className="card-buttons1">
          <button className="icon-container1">
            <img src={LikeIcon} alt="Like" />
          </button>
          <button className="icon-container1">
            <img src={ShoppingIcon} alt="Shopping" />
          </button>
        </div>
      </div>

      {/* Third Card */}
      <div className="art-card1">
        <div className="card-image1" style={{ backgroundImage: `url(${require('../assets/images/home11.png')})` }}></div>
        <div className="card-details1">
          <div className="left-details1">
            <h3 className="art-title1">Asian Mysticism</h3>
            <p className="artist-name1">By Artist Name</p>
            <p className="art-type1">Englo Art</p>
            <p className="art-material1">Acrylic on Canvas</p>
            <p className="dimensions1">50 x 70 Inches</p>
          </div>
          <div className="right-details1">
            <p className="price-old1">Rs. 100,000</p>
            <p className="price-new1">Rs. 90,000</p>
            <p className="discount1">15% OFF</p>
          </div>
        </div>
        <div className="card-buttons1">
          <button className="icon-container1">
            <img src={LikeIcon} alt="Like" />
          </button>
          <button className="icon-container1">
            <img src={ShoppingIcon} alt="Shopping" />
          </button>
        </div>
      </div>
    </div>




    <div className="art-cards-container20">
      {/* First Card */}
      <div className="art-card1">
        <div className="card-image1" style={{ backgroundImage: `url(${require('../assets/images/home9.png')})` }}></div>
        <div className="card-details1">
          <div className="left-details1">
            <h3 className="art-title1">Flowery</h3>
            <p className="artist-name1">By Asif Hussain</p>
            <p className="art-type1">Painting</p>
            <p className="art-material1">Oil, Acrylic on Canvas</p>
            <p className="dimensions1">72 x 52 Inches</p>
          </div>
          <div className="right-details1">
            <p className="price-old1">Rs. 80,000</p>
            <p className="price-new1">Rs. 71,000</p>
            <p className="discount1">30% OFF</p>
          </div>
        </div>
        <div className="card-buttons1">
          <button className="icon-container1">
            <img src={LikeIcon} alt="Like" />
          </button>
          <button className="icon-container1">
            <img src={ShoppingIcon} alt="Shopping1" />
          </button>
        </div>
      </div>

      {/* Second Card */}
      <div className="art-card1">
        <div className="card-image1" style={{ backgroundImage: `url(${require('../assets/images/home10.png')})` }}></div>
        <div className="card-details1">
          <div className="left-details1">
            <h3 className="art-title1">Colour Paintings</h3>
            <p className="artist-name1">By Artist Name</p>
            <p className="art-type1">Artist Spotlights</p>
            <p className="art-material1">Oil, Acrylic on Canvas</p>

            <p className="dimensions1">60 x 40 Inches</p>
          </div>
          <div className="right-details1">
            <p className="price-old1">Rs. 90,000</p>
            <p className="price-new1">Rs. 81,000</p>
            <p className="discount1">10% OFF</p>
          </div>
        </div>
        <div className="card-buttons1">
          <button className="icon-container1">
            <img src={LikeIcon} alt="Like" />
          </button>
          <button className="icon-container1">
            <img src={ShoppingIcon} alt="Shopping1" />
          </button>
        </div>
      </div>

      {/* Third Card */}
      <div className="art-card1">
        <div className="card-image1" style={{ backgroundImage: `url(${require('../assets/images/home11.png')})` }}></div>
        <div className="card-details1">
          <div className="left-details1">
            <h3 className="art-title1">Asian Mysticism</h3>
            <p className="artist-name1">By Artist Name</p>
            <p className="art-type1">Englo Art</p>
            <p className="art-material1">Acrylic on Canvas</p>
            <p className="dimensions1">50 x 70 Inches</p>
          </div>
          <div className="right-details1">
            <p className="price-old1">Rs. 100,000</p>
            <p className="price-new1">Rs. 90,000</p>
            <p className="discount1">15% OFF</p>
          </div>
        </div>
        <div className="card-buttons1">
          <button className="icon-container1">
            <img src={LikeIcon} alt="Like1" />
          </button>
          <button className="icon-container1">
            <img src={ShoppingIcon} alt="Shopping1" />
          </button>
        </div>
      </div>
    </div>



    <div className="art-cards-container30">
      {/* First Card */}
      <div className="art-card1">
        <div className="card-image1" style={{ backgroundImage: `url(${require('../assets/images/home9.png')})` }}></div>
        <div className="card-details1">
          <div className="left-details1">
            <h3 className="art-title1">Flowery</h3>
            <p className="artist-name1">By Asif Hussain</p>
            <p className="art-type1">Painting</p>
            <p className="art-material1">Oil, Acrylic on Canvas</p>
            <p className="dimensions1">72 x 52 Inches</p>
          </div>
          <div className="right-details1">
            <p className="price-old1">Rs. 80,000</p>
            <p className="price-new1">Rs. 71,000</p>
            <p className="discount1">30% OFF</p>
          </div>
        </div>
        <div className="card-buttons1">
          <button className="icon-container1">
            <img src={LikeIcon} alt="Like" />
          </button>
          <button className="icon-container1">
            <img src={ShoppingIcon} alt="Shopping1" />
          </button>
        </div>
      </div>

      {/* Second Card */}
      <div className="art-card1">
        <div className="card-image1" style={{ backgroundImage: `url(${require('../assets/images/home10.png')})` }}></div>
        <div className="card-details1">
          <div className="left-details1">
            <h3 className="art-title1">Colour Paintings</h3>
            <p className="artist-name1">By Artist Name</p>
            <p className="art-type1">Artist Spotlights</p>
            <p className="art-material1">Oil, Acrylic on Canvas</p>

            <p className="dimensions1">60 x 40 Inches</p>
          </div>
          <div className="right-details1">
            <p className="price-old1">Rs. 90,000</p>
            <p className="price-new1">Rs. 81,000</p>
            <p className="discount1">10% OFF</p>
          </div>
        </div>
        <div className="card-buttons1">
          <button className="icon-container1">
            <img src={LikeIcon} alt="Like" />
          </button>
          <button className="icon-container1">
            <img src={ShoppingIcon} alt="Shopping1" />
          </button>
        </div>
      </div>

      {/* Third Card */}
      <div className="art-card1">
        <div className="card-image1" style={{ backgroundImage: `url(${require('../assets/images/home11.png')})` }}></div>
        <div className="card-details1">
          <div className="left-details1">
            <h3 className="art-title1">Asian Mysticism</h3>
            <p className="artist-name1">By Artist Name</p>
            <p className="art-type1">Englo Art</p>
            <p className="art-material1">Acrylic on Canvas</p>
            <p className="dimensions1">50 x 70 Inches</p>
          </div>
          <div className="right-details1">
            <p className="price-old1">Rs. 100,000</p>
            <p className="price-new1">Rs. 90,000</p>
            <p className="discount1">15% OFF</p>
          </div>
        </div>
        <div className="card-buttons1">
          <button className="icon-container1">
            <img src={LikeIcon} alt="Like1" />
          </button>
          <button className="icon-container1">
            <img src={ShoppingIcon} alt="Shopping1" />
          </button>
        </div>
      </div>
    </div>
    </div>






  
  )
}

export default Landing_Page_fifth_Section
