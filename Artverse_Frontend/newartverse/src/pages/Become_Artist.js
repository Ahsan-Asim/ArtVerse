// src/pages/BecomeArtistPage.js
import React from 'react';
import ArtistForm from '../components/ArtistForm';
import '../styles/BecomeArtist.css';

// BecomeArtistPage.js



function Become_Artist() {
    return (
        <div className="become-artist-container">
            <div className="logo-header">
                <img src={require('../assets/images/ArtVerse_Logo.png')} alt="Artverse Logo" className="logo1" />
                <h2>Become Artist at Artverse</h2>
            </div>
            
            {/* <div className="profile-photo-section">
                <div className="photo-upload-circle">
                    <span>Upload Photo</span>
                </div>
                <p>Profile Photo</p>
            </div> */}
            
            <ArtistForm />
        </div>
    );
}

export default Become_Artist;