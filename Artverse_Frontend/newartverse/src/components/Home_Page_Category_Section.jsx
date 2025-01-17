import React from "react";
import "../styles/Home_Category_Section.css"; // Ensure to import your custom CSS
import SerigraphImage from "../assets/images/home2.png";
import DrawingImage from "../assets/images/home3.png";
import PaintingImage from "../assets/images/home4.png";
import SculptureImage from "../assets/images/home5.png";
import Image1 from "../assets/images/home6.png";
import Image2 from "../assets/images/home7.png";
import Image3 from "../assets/images/home8.png";

function Home_Category_Section() {
  const categories = [
    { title: "Serigraphs", image: SerigraphImage },
    { title: "Drawings", image: DrawingImage },
    { title: "Paintings", image: PaintingImage },
    { title: "Sculptures", image: SculptureImage },
  ];

  const collections = [
    {
      title: "Colour Paintings",
      subtitle: "Artist Spotlights",
      image: Image1,
      link: "/colour-paintings",
    },
    {
      title: "Artist Spotlights",
      subtitle: "Asian Mysticism",
      image: Image2,
      link: "/artist-spotlights",
    },
    {
      title: "Englo Art",
      subtitle: "British Paintings",
      image: Image3,
      link: "/englo-art",
    },
  ];

  return (
    <div id="categories" className="category-section text-center">
      <div className="container">
        {/* Category Section */}
        <div className="section-title">
          <h2>Explore By Category</h2>
          <p>Discover unique categories of art and creativity.</p>
        </div>
        <div className="row category-items">
          {categories.map((category, index) => (
            <div key={index} className="col-sm-6 col-md-4 col-lg-3 category-item">
              <div className="hover-bg">
                <img
                  src={category.image}
                  alt={category.title}
                  className="img-responsive category-image"
                />
                <div className="hover-text">
                  <h4>{category.title}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Curated Collections Section */}
        <div className="curated-collections">
          <h2 className="collections-title">Curated Collections</h2>
          <div className="row collections-items">
            {collections.map((collection, index) => (
              <a
                key={index}
                href={collection.link}
                className="col-md-6 col-lg-4 collection-card"
              >
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="collection-image"
                />
                <div className="collection-text">
                  <h3>{collection.title}</h3>
                  <p>{collection.subtitle}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home_Category_Section;
