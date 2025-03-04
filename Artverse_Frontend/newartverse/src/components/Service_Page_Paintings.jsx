import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ServicePage//Service_Page_Paintings.css';

function Service_Page_Paintings() {
  const navigate = useNavigate();

  const services = [
    {
      id: 'portrait',
      image: require('../assets/images/potrait.jpg'),
      title: 'Portrait Sketches – Made Just for You',
      subtitle: 'Personalized Expressions in Pencil',
      description: 'Hand-drawn or digital portraits capturing emotions and uniqueness.'
    },
    {
      id: 'illustration',
      image: require('../assets/images/illustration.jpg'),
      title: 'Fantasy Illustrations – Bring Your Imagination to Life',
      subtitle: 'Dreamlike Worlds on Paper',
      description: 'Custom fantasy sketches featuring mythical creatures and magical landscapes.'
    },
    {
      id: 'architectural',
      image: require('../assets/images/architectural_sketch.jpg'),
      title: 'Architectural Sketches – Designs with a Personal Touch',
      subtitle: 'Precision & Artistry in Every Line',
      description: 'Intricate sketches of buildings and landscapes, ideal for decor or visualization.'
    },
    {
      id: 'anime',
      image: require('../assets/images/anime1.jpeg'),
      title: 'Anime & Manga Sketches – Your Favorite Style, Personalized',
      subtitle: 'Iconic Anime, Custom-Made for You',
      description: 'Detailed anime and manga character sketches tailored to your preferences.'
    },
    {
      id: 'abstract',
      image: require('../assets/images/abstract_minimalist.jpg'),
      title: 'Abstract & Minimalist Sketches – Art in its Purest Form',
      subtitle: 'Simplicity Meets Elegance',
      description: 'Minimalist and abstract sketches using clean lines and creative compositions.'
    },
    {
      id: 'nature',
      image: require('../assets/images/nature_wildlife.jpeg'),
      title: 'Nature & Wildlife Sketches – Capturing the Beauty of the Outdoors',
      subtitle: 'The Wild, Immortalized in Art',
      description: 'Wildlife and nature-inspired sketches with breathtaking detail.'
    },
    {
      id: 'vintage',
      image: require('../assets/images/vintage.jpeg'),
      title: 'Historical & Vintage Sketches – Relive the Past in Art',
      subtitle: 'A Timeless Glimpse into History',
      description: 'Vintage-style sketches recreating historical moments and classic aesthetics.'
    },
    {
      id: 'merchandise',
      image: require('../assets/images/merchant.jpeg'),
      title: 'Custom Merchandise Sketches – Designs Ready for Print',
      subtitle: 'Unique Art, Made for You',
      description: 'Sketch designs for T-shirts, posters, and phone cases to bring your vision to life.'
    }
  ];

  const handleCardClick = (serviceId) => {
    navigate(`/customize/${serviceId}`);
  };

  return (
    <div className="service-container">
      <div className="art-cards-container">
        {services.map((service, index) => (
          <div
            className="art-card"
            key={index}
            onClick={() => handleCardClick(service.id)}
          >
            <div
              className="card-image"
              style={{ backgroundImage: `url(${service.image})` }}
            ></div>
            <div className="card-details">
              <div className="left-details">
                <h3 className="art-title">{service.title}</h3>
                {service.subtitle && <h4 className="art-subtitle">{service.subtitle}</h4>}
                <p className="artist-name">{service.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className='load-more'><b>Load More</b></button>
      <hr className='service-line' />
    </div>
  );
}

export default Service_Page_Paintings;
