// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom"; // For routing
// import Logo from "../assets/images/ArtVerse_Logo.png"; // Correct path to your logo
// import SearchIcon from "../assets/images/search.png"; // Correct path to your search icon
// import ShoppingIcon from "../assets/images/shopping.png"; // Correct path to your shopping icon
// import LikeIcon from "../assets/images/heart.png"; // Correct path to your like icon
// import ProfileIcon from "../assets/images/profile.png"; // Correct path to your profile icon
// import "../styles/Header.css"; // Ensure to import your custom CSS

// function Home_Page_Header() {
//   const [isArtistLoggedIn, setIsArtistLoggedIn] = useState(false);
//   const [searchQuery, setSearchQuery] = useState(""); // State to track search input

//   useEffect(() => {
//     // Check if artistId exists in localStorage when the component mounts
//     const artistId = localStorage.getItem("artistId");
//     setIsArtistLoggedIn(!!artistId); // Set to true if artistId exists
//   }, []);

//   // Function to handle search action
//   const handleSearch = () => {
//     if (searchQuery.trim()) {
//       // Navigate to the search results page with the search query
//       window.location.href = `/search?title=${searchQuery}`;
//     }
//   };
//   const handleAddToCart = () => {
//     const userEmail = sessionStorage.getItem("email");
//     if (!userEmail) {
//       alert("Please sign in to add items to your cart.");
//       return;
//     }
//   }

//   return (
//     <>
//       <header className="header">
//         <Link to="/" className="logo-link">
//           <img src={Logo} alt="ArtVerse Logo" className="logo" />
//         </Link>
//         <div className="headings">
//           <Link to="/become-artist" className="become-artist">
//             Become Artist
//           </Link>
//           <Link to="/why-us" className="why-us">
//             Why Us
//           </Link>
//           <Link to="/explore-digital-art" className="explore-digital-art">
//             Explore Digital Art
//           </Link>
//         </div>

//         <div className="search-container30">
//           <img
//             src={SearchIcon}
//             alt="Search Icon"
//             className="search-icon"
//             onClick={handleSearch} // Trigger search when clicked
//             style={{ cursor: "pointer" }}
//           />
//           <input
//             type="text"
//             placeholder="Search"
//             className="search-input"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)} // Update state when input changes
//             onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Trigger search on Enter key
//           />
//         </div>

//         <Link to="/cartpage" className="icon-link" onClick={handleAddToCart}>
//           <img
//             src={ShoppingIcon}
//             alt="Shopping Icon"
//             className="shopping-icon"
//           />
//         </Link>

//         <Link to="/favorites" className="icon-link">
//           <img src={LikeIcon} alt="Like Icon" className="like-icon" />
//         </Link>

//         {/* Simplified Profile Icon */}
//         <Link to="/profile" className="icon-link">
//           <img src={ProfileIcon} alt="Profile Icon" className="profile-icon" />
//         </Link>
//       </header>

//       {/* New Row of Headings */}
//       <div className="sub-headings">
//         <Link to="/paintings" className="sub-heading-item">
//           Paintings
//         </Link>
//         <Link to="/sculptures" className="sub-heading-item">
//           Sculptures
//         </Link>
//         <Link to="/photography" className="sub-heading-item">
//           Photography
//         </Link>
//         <Link to="/digital-arts" className="sub-heading-item">
//           Digital Arts
//         </Link>
//         <Link to="/auctions" className="sub-heading-item">
//           Auctions
//         </Link>
//         <Link to="/events" className="sub-heading-item">
//           Events
//         </Link>
//       </div>
//     </>
//   );
// }

// export default Home_Page_Header;



import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/ArtVerse_Logo.png"; // Correct path to your logo
import SearchIcon from "../assets/images/search.png"; // Correct path to your search icon
import ShoppingIcon from "../assets/images/shopping.png"; // Correct path to your shopping icon
import LikeIcon from "../assets/images/heart.png"; // Correct path to your like icon
// import DefaultProfileIcon from "../assets/images/profile.png"; // Default profile icon if artist doesn't have one
import DefaultProfileIcon from "../assets/images/default_profile.jpeg" // Default profile icon if artist doesn't have one

import "../styles/Header.css"; // Ensure to import your custom CSS

function Home_Page_Header() {
  const [isArtistLoggedIn, setIsArtistLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State to track search input
  const [artistProfileImage, setArtistProfileImage] = useState(""); // State to store artist profile image URL
  const [artistName, setArtistName] = useState(""); // State to store artist name

  useEffect(() => {
    // Check if artistId exists in sessionStorage when the component mounts
    const artistEmail = sessionStorage.getItem("email");  // Fetch artist email from sessionStorage
    if (artistEmail) {
      setIsArtistLoggedIn(true);  // Set logged-in status to true

      // Fetch artist details from the backend using the email
      fetch(`http://localhost:4000/api/artist/image?email=${artistEmail}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.profileImage) {
            setArtistProfileImage(data.profileImage);  // Set the profile image path
            console.log(data.profileImage);
          }
          if (data.name) {
            setArtistName(data.name);  // Set the artist name
          }
        })
        .catch((err) => console.error("Error fetching artist data: ", err));
    }
  }, []);

  // Function to handle search action
  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Navigate to the search results page with the search query
      window.location.href = `/search?title=${searchQuery}`;
    }
  };

  const handleAddToCart = () => {
    const userEmail = sessionStorage.getItem("email");
    if (!userEmail) {
      alert("Please sign in to add items to your cart.");
      return;
    }
  };

  return (
    <header className="header">
      <Link to="/" className="logo-link">
        <img src={Logo} alt="ArtVerse Logo" className="logo" />
      </Link>

      <div className="headings">
        <Link to="/become-artist" className="become-artist">Become Artist</Link>
        <Link to="/why-us" className="why-us">Why Us</Link>
        <Link to="/explore-digital-art" className="explore-digital-art">Explore Digital Art</Link>
      </div>

      <div className="search-container30">
        <img
          src={SearchIcon}
          alt="Search Icon"
          className="search-icon"
          onClick={handleSearch}
          style={{ cursor: "pointer" }}
        />
        <input
          type="text"
          placeholder="Search"
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
      </div>

      <Link to="/cartpage" className="icon-link" onClick={handleAddToCart}>
        <img src={ShoppingIcon} alt="Shopping Icon" className="shopping-icon" />
      </Link>

      <Link to="/favorites" className="icon-link">
        <img src={LikeIcon} alt="Like Icon" className="like-icon" />
      </Link>

      {/* Profile Icon - Display the artist's image if available */}
      <Link to="/profile" className="icon-link">
        <img
          src={artistProfileImage ? `http://localhost:4000/${artistProfileImage}` : DefaultProfileIcon}
          alt="Profile Icon"
          className="profile-icon"
        />
      </Link>
    </header>
  );
}

export default Home_Page_Header;
