import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage/HomePage.css';
import Home_Page_Image from '../components/Home_Page_Image';
import { Footer } from '../components/Footer';
import Home_Category_Section from '../components/Home_Page_Category_Section';
import Home_Page_Artist_Display from '../components/Home_Page_Artist_Display';
import { NavigationBar } from '../components/Home_Page_Navigation';
import axios from 'axios';
import { Modal ,Button } from "react-bootstrap";

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (!token) {
      navigate('/signin');
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/users/home', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data.user);
      } catch (err) {
        setError('Failed to fetch profile.');
        console.error(err);
      }
    };

    fetchUserProfile();

    // Handle Back Button Navigation
    const handleBackButton = () => {
      console.log('Back button pressed, showing logout modal'); // Debugging log
      setShowLogoutModal(true); // Show Logout Modal
      setTimeout(() => {
        window.history.pushState(null, '', window.location.href); // Prevent going back
      }, 0);
    };

    // Push initial history state to prevent back navigation
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [navigate]);

  // Handle User Logout
  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/signin');
  };

  if (error) return <div>{error}</div>;
  if (!user) return <div>Loading...</div>;

  return (
    <div className="home-page">
      <NavigationBar />
      <div className="content-wrapper" style={{ paddingTop: '180px' }}>
        <Home_Page_Image />
        <Home_Category_Section />
        <Home_Page_Artist_Display />
        
        {/* Profile Section */}
        <div className="profile-container">
          <img src={user.profilePic || "https://via.placeholder.com/50"} alt="Profile" className="profile-pic" />
          <span className="username">{user.username}</span>
        </div>

        <Footer />
      </div>

      {/* Logout Confirmation Modal */}
      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You are already logged in! Do you want to log out and go to the Sign-in page?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleLogout}>Yes, Logout</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HomePage;
