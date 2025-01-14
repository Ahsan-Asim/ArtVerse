// import React, { useState } from "react";
// import "../styles/Artist_detail_main.css";
// import home4 from "../assets/images/home4.png"; // If you want to include an image for each artist, use it here

// // Modal Component to display artist details and edit/delete buttons
// function Modal({ artist, closeModal }) {
//   return (
//     <div className="modal-overlay" onClick={closeModal}>
//       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//         <button className="close-btn" onClick={closeModal}>×</button> {/* Close button */}
//         <h3>{artist.name}</h3>
//         <p>{artist.city}</p>
//         <p>{artist.description}</p>

//         <div className="modal-buttons">
//           <button>Edit</button>
//           <button>Delete</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function ArtistCard({ image, name, city, description, onClick }) {
//   return (
//     <div className="artist-card" onClick={onClick}>
//       <img src={image || home4} alt={name} />
      
//       <div className="artist-details">
//         <h3>{name}</h3>
//         <p>{city}</p>
//         <p>{description}</p>
//       </div>
//     </div>
//   );
// }

// function Artist_detail_main() {
//   const [selectedArtist, setSelectedArtist] = useState(null); // state for selected artist for the modal

//   const artists = [
//     {
//       image: home4,
//       name: "Wajeeha Kashaf",
//       city: "Faisalabad",
//       description: "Hardworking, creative, and passionate about design and art.",
//     },
//     {
//       image: home4,
//       name: "Rohit Kumar",
//       city: "Islamabad",
//       description: "An artist blending intricate details with bold abstract elements.",
//     },
//     {
//       image: home4,
//       name: "Ali Hassan",
//       city: "Lahore",
//       description: "Inspired by nature, Ali creates minimalist art with a modern twist.",
//     },
//     {
//       image: home4,
//       name: "Sarah Khan",
//       city: "Karachi",
//       description: "A photographer turned visual artist, exploring light and shadows.",
//     },
//     {
//       image: home4,
//       name: "Usman Ali",
//       city: "Rawalpindi",
//       description: "An experimental artist known for mixing traditional with digital art.",
//     },
//   ];

//   // Handle opening the modal and setting the selected artist
//   const handleCardClick = (artist) => {
//     setSelectedArtist(artist);
//   };

//   // Handle closing the modal
//   const closeModal = () => {
//     setSelectedArtist(null);
//   };

//   return (
//     <div className="main-studio">
//       <h1>Manage Artist Profile</h1>
//       <div className="heading">Welcome to Artist Portfolios</div>

//       <div className="artist-list">
//         {artists.map((artist, index) => (
//           <ArtistCard key={index} {...artist} onClick={() => handleCardClick(artist)} />
//         ))}
//       </div>

//       {selectedArtist && (
//         <Modal artist={selectedArtist} closeModal={closeModal} />
//       )}
//     </div>
//   );
// }

// export default Artist_detail_main;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Artist_detail_main.css";

// Modal Component to display artist details and edit/delete buttons
function Modal({ artist, closeModal, refreshArtists }) {
  // Handle button click actions
  const handleVerify = async () => {
    try {
      await axios.put("http://localhost:4000/api/admin/verifyUser", { email: artist.email });
      artist.isVerified = true; // Update the artist's verified status
      refreshArtists(); // Refresh the artist list to reflect the changes
    } catch (error) {
      console.error("Error verifying user:", error);
    }
  };

  const handleUnverify = async () => {
    try {
      await axios.put("http://localhost:4000/api/admin/unverifyUser", { email: artist.email });
      artist.isVerified = false; // Update the artist's verified status
      refreshArtists();
    } catch (error) {
      console.error("Error unverifying user:", error);
    }
  };

  const handleBlock = async () => {
    try {
      await axios.put("http://localhost:4000/api/admin/blockUser", { email: artist.email });
      artist.isBlocked = true; // Update the artist's blocked status
      refreshArtists();
    } catch (error) {
      console.error("Error blocking user:", error);
    }
  };

  const handleUnblock = async () => {
    try {
      await axios.put("http://localhost:4000/api/admin/unblockUser", { email: artist.email });
      artist.isBlocked = false; // Update the artist's blocked status
      refreshArtists();
    } catch (error) {
      console.error("Error unblocking user:", error);
    }
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={closeModal}>×</button>
        <h3>{artist.artistDetails.name}</h3>
        <p><strong>Email:</strong> {artist.email}</p>
        <p><strong>Phone:</strong> {artist.phone}</p>
        <p><strong>City:</strong> {artist.artistDetails.city}</p>
        <p><strong>Address:</strong> {artist.artistDetails.address}</p>
        <p><strong>Education:</strong> {artist.artistDetails.education}</p>
        <p><strong>About:</strong> {artist.artistDetails.about}</p>
        <p><strong>Awards:</strong> {artist.artistDetails.awards}</p>
        <p><strong>Verified:</strong> {artist.isVerified ? 'Yes' : 'No'}</p>
        <p><strong>Blocked:</strong> {artist.isBlocked ? 'Yes' : 'No'}</p>

        <div className="modal-buttons">
          <button onClick={artist.isVerified ? handleUnverify : handleVerify}>
            {artist.isVerified ? "Unverify" : "Verify"}
          </button>
          <button onClick={artist.isBlocked ? handleUnblock : handleBlock}>
            {artist.isBlocked ? "Unblock" : "Block"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ArtistCard({ artist, onClick }) {
  return (
    <div className="artist-card" onClick={onClick}>
      <div className="artist-details">
        <h3>{artist.artistDetails.name}</h3>
        <div className="artist-info">
          <p><strong>Email:</strong> {artist.email}</p>
          <p><strong>Phone:</strong> {artist.phone}</p>
          <p><strong>Country:</strong> {artist.artistDetails.country}</p>
          <p><strong>City:</strong> {artist.artistDetails.city}</p>
          <p><strong>Verified:</strong> {artist.isVerified ? 'Yes' : 'No'}</p>
          <p><strong>Blocked:</strong> {artist.isBlocked ? 'Yes' : 'No'}</p>
        </div>
      </div>
    </div>
  );
}

function Artist_detail_main() {
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null); // state for selected artist for the modal

  // Fetch artists data from the API
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/admin/artists")
      .then((response) => {
        setArtists(response.data);
      })
      .catch((error) => {
        console.error("Error fetching artists:", error);
      });
  }, []);

  // Handle opening the modal and setting the selected artist
  const handleCardClick = (artist) => {
    setSelectedArtist(artist);
  };

  // Handle closing the modal
  const closeModal = () => {
    setSelectedArtist(null);
  };

  // Refresh artists data
  const refreshArtists = () => {
    axios
      .get("http://localhost:4000/api/admin/artists")
      .then((response) => {
        setArtists(response.data); // Update artist list after the action
      })
      .catch((error) => {
        console.error("Error fetching artists:", error);
      });
  };

  return (
    <div className="main-studio">
      <h1>Manage Artist Profile</h1>
      <div className="heading">Welcome to Artist Portfolios</div>

      <div className="artist-list">
        {artists.map((artist, index) => (
          <ArtistCard key={index} artist={artist} onClick={() => handleCardClick(artist)} />
        ))}
      </div>

      {selectedArtist && (
        <Modal artist={selectedArtist} closeModal={closeModal} refreshArtists={refreshArtists} />
      )}
    </div>
  );
}

export default Artist_detail_main;
