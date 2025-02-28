import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
// import '../styles/RightSectionSignin.css';
import '../../styles/Sign_In_Page_Css/RightSectionSignin.css';
import Logo from '../../assets/images/ArtVerse_Logo.png';
import GoogleLogo from '../../assets/images/Google.png';

import { GoogleLogin } from '@react-oauth/google'; // Import GoogleLogin


const Right_Section_Signin_page = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Correctly import and use navigate
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null); // State for error message

  /////////////////////////////////////////////////////

// Inside your Right_Section_Signin_page component
const handleGoogleLogin = async (response) => {
  const { credential } = response;
  try {
    // Send the Google token to your backend for login
    const res = await axios.post('http://localhost:4000/api/users/google-signin', { token: credential });

    const { token, role } = res.data; // Extract token and role from the response

    // Save JWT token in session storage
    sessionStorage.setItem('token', token);

    // Redirect to the /home page
    navigate('/home', { state: { role } });
  } catch (error) {
    setError(error.response?.data?.message || 'Google login failed');
  }
};

/////////////////////////////////////////////////////////////

  // Check for email and password in location.state
  useEffect(() => {
    if (location.state) {
      setCredentials({
        email: location.state.email || '',
        password: location.state.password || location.state.googleId || '',
      });
    }
  }, [location.state]);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/users/signin', credentials);
      console.log(response.role);
      
      // Save the JWT token to localStorage
      // localStorage.setItem('token', response.data.token);
      sessionStorage.setItem('token', response.data.token);
     


      
      // Get the user details and role from the response
      const { user, token } = response.data;
      const userRole = user.role; // 'user' or 'artist'
      const userEmail = user.email; // 'user' or 'artist'
      const isVerified1 = user.isVerified; // 'user' or 'artist'



      console.log(isVerified1);
      console.log(token);

      sessionStorage.setItem('email', userEmail);
      sessionStorage.setItem('role', userRole);
      // sessionStorage.setItem('isVerified', isVerified1);
      console.log("The the role is:",userRole);

    if (userRole == "admin"){
      navigate('/artist_detail', {
      });

    }
    else {

      // Navigate to home page with user email, password, and role
      navigate('/home', {
        state: {
          email: credentials.email,
          role: userRole, // Send the role along with email
        },
      });
    }
    } catch (error) {
      setError('An error occurred during signin. Please check your credentials and try again.');
      console.log(error); // Log the error for debugging
    }
  };

  return (
    <div className="right-section1">
      <img src={Logo} alt="ArtVerse Logo" className="logo10" />
      <div className="sign_div1"><p>Sign in To ArtVerse</p></div>

    {/* <div className="sign_div2" style={{ textAlign: "center" }}>
    <GoogleLogin
  onSuccess={handleGoogleLogin}
  onError={() => setError('Google login failed')}
  render={(renderProps) => (
    <button
      className="google-login-btn"
      onClick={renderProps.onClick}
      disabled={renderProps.disabled}
    >
      <img src={GoogleLogo} alt="Google Logo" className="google-logo" />
      <span className="Google_Text">Continue With Google</span>
    </button>
  )}
/> */}


      <div className="sign_div4">
        <div className="line left-line"></div>
        <span className="or-text">Or Sign in with Email</span>
        <div className="line right-line"></div>
      </div>

      <form className="signin-form1" onSubmit={handleLogin}>
        <label className="email-label">Email</label>
        <input
          type="email"
          name="email"
          className="email-input"
          value={credentials.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />

        <div className="password-container">
          <label className="password-label">Password</label>
          <span className="forgot-password">Forget?</span>
        </div>
        <input
          type="password"
          name="password"
          className="password-input"
          placeholder="8+ Characters"
          value={credentials.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="signin-button">Sign In</button>
      </form>

      



      {error && <div className="error-message">{error}</div>} {/* Display error message */}

      <div className="signup-text">
        Don't have an ArtVerse Account? <Link to="/signup" className="signup-link">Signup</Link>
      </div>
    </div>
  );
};

export default Right_Section_Signin_page;
