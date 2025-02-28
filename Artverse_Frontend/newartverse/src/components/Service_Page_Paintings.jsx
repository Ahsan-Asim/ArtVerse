import React from 'react';
import '../styles/Service_Page_Paintings.css';

function Service_Page_Paintings() {
  const services = [
    {
      image: require('../assets/images/Service_Cate_1.png'),
      title: 'Custom Sketches, Made for you',
      description: 'Personalized, hand-drawn sketches to bring your ideas to life—perfect for portraits, concepts, and more.'
    },
    {
      image: require('../assets/images/Service_Cate_2.png'),
      title: 'Portrait Service',
      subtitle: 'Bring Your Moments to Life',
      description: 'Handcrafted portraits that capture personality and emotion, perfect for gifts or memories.'
    },
    {
      image: require('../assets/images/Service_Cate_3.png'),
      title: 'Custom Oil Painting',
      subtitle: 'Timeless Beauty in Oil',
      description: 'High-quality, custom oil paintings tailored to your vision—perfect for decor or collectors.'
    },
    {
      image: require('../assets/images/Service_Cate_3.png'),
      title: 'Custom Oil Painting',
      subtitle: 'Timeless Beauty in Oil',
      description: 'High-quality, custom oil paintings tailored to your vision—perfect for decor or collectors.'
    },
    {
      image: require('../assets/images/Service_Cate_3.png'),
      title: 'Custom Oil Painting',
      subtitle: 'Timeless Beauty in Oil',
      description: 'High-quality, custom oil paintings tailored to your vision—perfect for decor or collectors.'
    },
    {
      image: require('../assets/images/Service_Cate_3.png'),
      title: 'Custom Oil Painting',
      subtitle: 'Timeless Beauty in Oil',
      description: 'High-quality, custom oil paintings tailored to your vision—perfect for decor or collectors.'
    }
  ];

  return (
    <div className="service-container">
      <div className="art-cards-container">
        {services.map((service, index) => (
          <div className="art-card" key={index}>
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
