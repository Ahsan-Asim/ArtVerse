import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import '../styles/RightSectionSignin.css';
import Logo from '../assets/images/ArtVerse_Logo.png';
import GoogleLogo from '../assets/images/Google.png';

const Right_Section_Signin_page = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

  useEffect(() => {
    if (location.state) {
      setCredentials({
        email: location.state.email || '',
        password: location.state.password || '',
      });
    }
  }, [location.state]);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === 'email') setEmailError('');
    if (e.target.name === 'password') setPasswordError('');
  };

  const validateEmail = () => {
    if (!credentials.email) {
      setEmailError('');
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(credentials.email)) {
      setEmailError('Invalid email format.');
    } else {
      setEmailError('');
    }
  };
  
  const validatePassword = () => {
    if (!credentials.password) {
      setPasswordError('');
      return;
    }
  
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(credentials.password)) {
      setPasswordError(
        'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
      );
    } else {
      setPasswordError('');
    }
  };
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    validateEmail();
    validatePassword();
  
    // If there are errors, stop login
    if (emailError || passwordError) return;
  
    try {
      const response = await axios.post('http://localhost:4000/api/users/signin', credentials);
      sessionStorage.setItem('token', response.data.token);
  
      const { user } = response.data;
      const userRole = user.role;
  
      if (userRole === 'admin') {
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
    }
  };
  

  return (
    <div className="right-section">
      <img src={Logo} alt="ArtVerse Logo" className="logo10" />
      <div className="sign_div1">
        <p>Sign in To ArtVerse</p>
      </div>

      <div className="sign_div2" style={{ textAlign: 'center' }}>
        <span className="Google_Text">Sign in With Google</span>
        <img src={GoogleLogo} alt="Google Logo" className="google-logo" />
      </div>

      <div className="sign_div4">
        <div className="line left-line"></div>
        <span className="or-text">Or Sign in with Email</span>
        <div className="line right-line"></div>
      </div>

      <form className="signin-form" onSubmit={handleLogin}>
        {/* Email Field */}
        <label className="email-label">Email</label>
        <input
          type="email"
          name="email"
          className="email-input"
          value={credentials.email}
          onChange={handleChange}
          onBlur={validateEmail}
          placeholder="Enter your email"
          required
          
        />
        {emailError && <div className="error-message1">{emailError}</div>}

        {/* Password Field */}
        <div className="password-container">
          <label className="password-label">Password</label>
          <span className="forgot-password">Forget?</span>
        </div>
        <div className="password-field-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            className="password-input"
            placeholder="8+ Characters"
            value={credentials.password}
            onChange={handleChange}
            onBlur={validatePassword}
            required
          />
          
           {passwordError && <div className="error-message">{passwordError}</div>}
        </div>
        
       

        {/* Submit Button */}
        <button type="submit" className="signin-button">
          Sign In
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      <div className="signup-text">
        Don't have an ArtVerse Account?{' '}
        <Link to="/signup" className="signup-link">
          Signup
        </Link>
      </div>
    </div>
  );
};

export default Right_Section_Signin_page;
