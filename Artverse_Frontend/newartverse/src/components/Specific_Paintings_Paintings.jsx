import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
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
      <h1 className='main-heading' style={{ marginTop: '300px' }}><b>More From Artists</b></h1>

      <div className="art-cards-container">
        {paintings.map((painting, index) => {
          const imageUrl = painting.image.startsWith("http")
            ? painting.image
            : `http://localhost:4000${painting.image}`;

          return (
            <div key={index} className="art-card">
              <Link to="/painting" state={{ artwork: painting }} className="art-card-link">
                <div className="card-image">
                  <img src={imageUrl} alt={painting.artwork || "Artwork"} />
                </div>
                <div className="card-details">
                  <h3 className="art-title">{painting.artwork}</h3>
                  <p className="artist-name">By {painting.artist}</p>
                  <p className="art-style"><b>Style:</b> {painting.style}</p>
                  <p className="art-type"><b>Type:</b> {painting.type}</p>
                  <p className="art-medium"><b>Medium:</b> {painting.medium}</p>
                  <p className="art-price"><b>Price:</b> Rs. {painting.Price}</p>
                </div>
              </Link>
              <div className="card-buttons">
                <button className="icon-container">
                  <img src={LikeIcon} alt="Like" />
                </button>
                <button className="icon-container">
                  <img src={ShoppingIcon} alt="Shopping" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Specific_Paintings_Paintings;
