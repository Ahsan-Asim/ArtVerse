import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Install axios if not installed: npm install axios
import '../styles/SpecificPage/Specific_Paintings_Paintings.css';

import LikeIcon from '../assets/images/like_icon.png';
import ShoppingIcon from '../assets/images/shopping_icon.png';

function Specific_Paintings_Paintings() {
  const [paintings, setPaintings] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/artwork/paintings') 
      .then(response => {
        const shuffledPaintings = response.data.sort(() => 0.5 - Math.random()).slice(0, 9);
        setPaintings(shuffledPaintings);
      })
      .catch(error => console.error('Error fetching paintings:', error));
  }, []);

  return (
    <div>
      <h1 className='main-headin3' style={{ marginTop: '300px' }}><b>More From Artists</b></h1>

      <div className="art-cards-container1">
        {paintings.map((painting, index) => (
          <div className="art-card1" key={index}>
            <div className="card-image1" style={{ backgroundImage: `url(${painting.image})` }}></div>
            <div className="card-details1">
              <div className="left-details1">
                <h3 className="art-title1">{painting.title}</h3>
                <p className="artist-name1">By {painting.artist}</p>
                <p className="art-type1">{painting.category}</p>
                <p className="art-material1">{painting.material}</p>
                <p className="dimensions1">{painting.dimensions}</p>
              </div>
              <div className="right-details1">
                <p className="price-old1">Rs. {painting.oldPrice}</p>
                <p className="price-new1">Rs. {painting.newPrice}</p>
                <p className="discount1">{painting.discount}% OFF</p>
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
        ))}
      </div>
    </div>
  );
}

export default Specific_Paintings_Paintings;
