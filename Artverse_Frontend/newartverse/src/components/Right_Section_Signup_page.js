import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import Logo from '../assets/images/ArtVerse_Logo.png';
import '../styles/RightSectionSignup.css';
import GoogleLogo from '../assets/images/Google.png';

function Right_Section_Signup_page() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
  });

  // Regex for validations
  const nameRegex = /^[A-Za-z\s]+$/;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const phoneRegex = /^((\+92\d{3}\d{3}\d{3}\d)|(\+92\d{3}\d{7})|(03\d{2}\d{3}\d{4}))$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear validation error and styling on input change
    setErrors({
      ...errors,
      [e.target.name]: '',
    });
    e.target.classList.remove('invalid-input');
  };

  // Validate a field
  const validateField = (name, value, element) => {
    let errorMessage = '';

    // Perform validation
    if (value.trim() === '') {
      // Do not add error or styling for empty fields
      errorMessage = '';
    } else if (name === 'name' && !nameRegex.test(value)) {
      errorMessage = 'Name must only contain alphabetic characters and spaces';
    } else if (name === 'email' && !emailRegex.test(value)) {
      errorMessage = 'Invalid email format';
    } else if (name === 'phone' && !phoneRegex.test(value)) {
      errorMessage = 'Phone number must be 11 digits and Starts with +92 or 03';
    } else if (name === 'password' && !passwordRegex.test(value)) {
      errorMessage =
        'Password must be at least 8 characters, including one uppercase letter, one lowercase letter, and one number';
    }

    // Apply error state and styles if applicable
    if (errorMessage) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: errorMessage,
      }));

      // Add invalid styles only if input is non-empty
      if (value.trim() !== '') {
        element.classList.add('invalid-input', 'shake');
        setTimeout(() => {
          element.classList.remove('shake');
        }, 300); // Match shake animation duration
      }
    } else {
      element.classList.remove('invalid-input');
    }

    return errorMessage === ''; // Return true if valid
  };

  // Handle blur event
  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value, e.target);
  };

  // Validate the entire form before submission
  const validateForm = () => {
    let valid = true;

    Object.keys(formData).forEach((key) => {
      const element = document.querySelector(`[name=${key}]`);
      if (!validateField(key, formData[key], element)) {
        valid = false;
      }
    });

    return valid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post('http://localhost:4000/api/users/signup', formData);
      setMessage(response.data.message);
      navigate('/signin', {
        state: {
          email: formData.email,
          password: formData.password,
        },
      });
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred during signup');
    }
  };

  const handleGoogleLogin = async (response) => {
    const { credential } = response;
    try {
      const res = await axios.post('http://localhost:4000/api/users/google-signup', { token: credential });
      setMessage(res.data.message);
      navigate('/home');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Google login failed');
    }
  };

  return (
    <div className="right-section">
      <img src={Logo} alt="ArtVerse Logo" className="logo" />
      <div className="sign_div1"><p>Sign up To ArtVerse</p></div>

      <form className="signin-form" onSubmit={handleSubmit}>
        <div className="name-phone-container">
          <div className="name-container">
            <label className="name-label">Name</label>
            <input
              type="text"
              name="name"
              className="name-input"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>
          <div className="phone-container">
            <label className="phone-label">Phone</label>
            <input
              type="text"
              name="phone"
              className="phone-input"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.phone && <p className="error-message">{errors.phone}</p>}
          </div>
        </div>

        <label className="email-label">Email</label>
        <input
          type="email"
          name="email"
          className="email-input"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {errors.email && <p className="error-message">{errors.email}</p>}

        <div className="password-container">
          <label className="password-label">Password</label>
        </div>
        <input
          type="password"
          name="password"
          className="password-input"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {errors.password && <p className="error-message">{errors.password}</p>}

        <button type="submit" className="signin-button">Create Account</button>
      </form>

      {message && <p className="message">{message}</p>}

      <div className="sign_div2" style={{ textAlign: "center" }}>
        <span className="Google_Text">Continue With Google</span>
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => setMessage('Google login failed')}
          render={(renderProps) => (
            <button
              className="google-login-btn"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <img src={GoogleLogo} alt="Google Logo" className="google-logo" />
              <span>Continue With Google</span>
            </button>
          )}
        />
      </div>

      <div className="signup-text">
        Already have an ArtVerse Account? <Link to="/signin" className="signup-link">Login</Link>
      </div>
    </div>
  );
}

export default Right_Section_Signup_page;
