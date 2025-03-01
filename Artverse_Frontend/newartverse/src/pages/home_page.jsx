import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css'; // Ensure to import your custom CSS
// import Home_Page_Header from '../components/Home_Page_Header';
import Home_Page_Image from '../components/Home_Page_Image';
import { Footer } from '../components/Footer';
import { Navigation } from '../components/navigation';
import { Landing_Page_Artist_Section } from '../components/Landing_Page_Artist_Section';
import { Landing_Page_fifth_Section } from '../components/Landing_Page_Fifth_Section';
import axios from 'axios';
import Home_Category_Section from '../components/Home_Page_Category_Section';
import Home_Page_Artist_Display from '../components/Home_Page_Artist_Display';
import { Home_Page_Navigation } from '../components/Home_Page_Navigation';

const HomePage = () => {
  const [user, setUser] = useState(null);  // State to hold user data
  const [error, setError] = useState(null); // State to handle any error
  const navigate = useNavigate(); // For redirection

  // Fetch the user profile after checking token
  useEffect(() => {
    const token = sessionStorage.getItem('token'); // Get the JWT token from localStorage
    console.log(token);
    if (!token) {
      // If no token is found, redirect the user to the sign-in page
      navigate('/signin');
      return;
    }

    // Fetch user profile from the backend using the JWT token
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/users/home', {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token to the header
          },
        });
        console.log("The role of user is:",response.data.user.role);
        setUser(response.data.user); // Set the user data in state
      } catch (err) {
        setError('Failed to fetch profile.'); // Handle errors
        console.error(err);
      }
    };

    fetchUserProfile(); // Call the function to fetch profile when the component mounts
  }, [navigate]);

  // If there's an error, show the error message
  if (error) {
    return <div>{error}</div>;
  }

  // If user data is still loading, show a loading message
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home-page">
      <Home_Page_Navigation /> {/* Ensure header is properly styled */}
      <div className="content-wrapper">
        <Home_Page_Image />
        {/* Other components */}
        <Home_Category_Section />
        <Landing_Page_fifth_Section />
        <Home_Page_Artist_Display />
        <Footer />
      </div>
    </div>
  );
  
  
};

export default HomePage;