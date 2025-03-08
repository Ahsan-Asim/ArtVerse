import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import '../../styles/Sign_In_Page_Css/RightSectionSignin.css';
import Logo from '../../assets/images/ArtVerse_Logo.png';

const Right_Section_Signin_page = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);

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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/users/signin', credentials);
      const { user, token } = response.data;
      const userRole = user.role;
      const userEmail = user.email;

      sessionStorage.setItem('token', token);
      sessionStorage.setItem('email', userEmail);
      sessionStorage.setItem('role', userRole);

      if (userRole === "admin") {
        navigate('/artist_detail');
      } else {
        navigate('/home', {
          state: {
            email: credentials.email,
            role: userRole,
          },
        });
      }
    } catch (error) {
      setError('An error occurred during signin. Please check your credentials and try again.');
      console.error(error);
    }
  };

  return (
    <div className="right-section1">
      <div className="logo-container">
        <img src={Logo} alt="ArtVerse Logo" className="logo10" />
        <p className="sign-title">Sign In to ArtVerse</p>
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

      {error && <div className="error-message">{error}</div>}

      <div className="signup-text">
        Don't have an ArtVerse Account? <Link to="/signup" className="signup-link">Signup</Link>
      </div>
    </div>
  );
};

export default Right_Section_Signin_page;
