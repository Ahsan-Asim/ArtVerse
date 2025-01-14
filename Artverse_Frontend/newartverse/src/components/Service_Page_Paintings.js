import React from 'react';
import '../styles/Service_Page_Paintings.css';


function Service_Page_Paintings() {
  return (
    <div>

<div className="art-cards-container3">
      {/* First Card */}
      <div className="art-card3">
        <div className="card-image3" style={{ backgroundImage: `url(${require('../assets/images/Service_Cate_1.png')})` }}></div>
        <div className="card-details3">
          <div className="left-details3">
            <h3 className="art-title3">Custom Sketches, Made for you</h3>
            <p className="artist-name3">Personalized, hand-drawn sketches to bring your ideas to life—perfect for portraits, concepts, and more.</p>
          </div>
        </div>
        
      </div>

      {/* Second Card */}
      <div className="art-card4">
        <div className="card-image3" style={{ backgroundImage: `url(${require('../assets/images/Service_Cate_2.png')})` }}></div>
        <div className="card-details3">
          <div className="left-details3">
            <h2 className="art-title3">Portrait Service</h2>
            <h3 className="art-title3">Bring Your Moments to Life</h3>
            <p className="artist-name3">Handcrafted portraits that capture personality and emotion, perfect for gifts or memories.</p>
          </div>
        </div>
        
      </div>

      {/* Third Card */}
      <div className="art-card5">
        <div className="card-image3" style={{ backgroundImage: `url(${require('../assets/images/Service_Cate_3.png')})` }}></div>
        <div className="card-details3">
          <div className="left-details3">
            <h2 className="art-title3">Custom Oil Painting</h2>
            <h3 className="art-title3">Timeless Beauty in Oil</h3>
            <p className="artist-name3">High-quality, custom oil paintings tailored to your vision—perfect for decor or collectors.</p>
          </div>
        </div>
       
      </div>
    </div>



    <div className="art-cards-container4">
      {/* First Card */}
      <div className="art-card6">
        <div className="card-image3" style={{ backgroundImage: `url(${require('../assets/images/Service_Cate_1.png')})` }}></div>
        <div className="card-details3">
          <div className="left-details3">
            <h3 className="art-title3">Custom Sketches, Made for you</h3>
            <p className="artist-name3">Personalized, hand-drawn sketches to bring your ideas to life—perfect for portraits, concepts, and more.</p>
          </div>
        </div>
        
      </div>

      {/* Second Card */}
      <div className="art-card7">
        <div className="card-image3" style={{ backgroundImage: `url(${require('../assets/images/Service_Cate_2.png')})` }}></div>
        <div className="card-details3">
          <div className="left-details3">
            <h2 className="art-title3">Portrait Service</h2>
            <h3 className="art-title3">Bring Your Moments to Life</h3>
            <p className="artist-name3">Handcrafted portraits that capture personality and emotion, perfect for gifts or memories.</p>
          </div>
        </div>
        
      </div>

      {/* Third Card */}
      <div className="art-card8">
        <div className="card-image3" style={{ backgroundImage: `url(${require('../assets/images/Service_Cate_3.png')})` }}></div>
        <div className="card-details3">
          <div className="left-details3">
            <h2 className="art-title3">Custom Oil Painting</h2>
            <h3 className="art-title3">Timeless Beauty in Oil</h3>
            <p className="artist-name3">High-quality, custom oil paintings tailored to your vision—perfect for decor or collectors.</p>
          </div>
        </div>
       
      </div>
    </div>

    <button className='sixth-button1'><b>Load More</b></button>

    <hr className='service_line'></hr>


      
    </div>
  )
}

export default Service_Page_Paintings;
