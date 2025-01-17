// src/components/Right_Section_Signup_Page.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google'; // Import GoogleLogin
import Logo from '../../assets/images/ArtVerse_Logo.png';
import '../../styles/Sign_Up_Page/RightSectionSignup.css';
import GoogleLogo from '../../assets/images/Google.png'; // Import your Google logo

function Right_Section_Signup_page() {
   const navigate = useNavigate();
   const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      role:'',
      age:'',
      gender:'',
      password:'',
   });
   const [message, setMessage] = useState('');

   // Handle input changes
   const handleChange = (e) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      });
   };

   // Handle form submission for email signup
   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const response = await axios.post('http://localhost:4000/api/users/signup', formData);
         setMessage(response.data.message); // Success message from server
         navigate('/signin', {
            state:{
               email : formData.email,
               password : formData.password,
            },
         });
      } catch (error) {
         setMessage(error.response?.data?.message || 'An error occurred during signup');
      }
   };

   // Handle Google login response
   const handleGoogleLogin = async (response) => {
      const { credential } = response;
      try {
         const res = await axios.post('http://localhost:4000/api/users/google-signup', { token : credential });
         const { user } = res.data; // Extract user details from the response
         navigate('/signin', {
            state:{
               email : user.email,
               password : user.googleId,
            },
         });
      } catch (error) {
         setMessage(error.response?.data?.message || 'Google login failed');
      }
   };

   return (
      <div className='signup-right-section'>
         <img src={Logo} alt="ArtVerse Logo" className="signup-logo" />
         <div className="signup-title"><p>Sign up To ArtVerse</p></div>

         <form className="signup-form" onSubmit={handleSubmit}>
            <div className="name-phone-wrapper">
               <div className="name-input-container">
                  <label className="name-label">First Name</label>
                  <input
                     type='text'
                     name="firstName"
                     className='name-input'
                     value={formData.firstName}
                     onChange={handleChange}
                     required
                  />
               </div>
               <div className="name-input-container">
                  <label className="name-label">Last Name</label>
                  <input
                     type='text'
                     name="lastName"
                     className='name-input'
                     value={formData.lastName}
                     onChange={handleChange}
                     required
                  />
               </div>
            </div>

            <label className="phone-label">Phone</label>
            <input
               type='text'
               name="phone"
               className='phone-input'
               value={formData.phone}
               onChange={handleChange}
               required
            />

            <label className="email-label">Email</label>
            <input
               type="email"
               name="email"
               className="email-input"
               value={formData.email}
               onChange={handleChange}
               required
            />

            <label className="age-label">Age</label>
            <input
              type="number"
              name="age"
              className="age-input"
              value={formData.age}
              onChange={handleChange}
              required
            />

            <label className="gender-label">Gender</label>
            <select 
              name="gender" 
              className="gender-select" 
              value={formData.gender} 
              onChange={handleChange} 
              required>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>

            <label className="password-label">Password</label>
            <input
               type="password"
               name="password"
               className="password-input"
               value={formData.password}
               onChange={handleChange}
               required
            />

            <button type="submit" className="signup-submit-button">Create Account</button>
         </form>

         {message && <p className="signup-message">{message}</p>}

         {/* Google login button */}
         <div className="google-signup-wrapper">
            <GoogleLogin
               onSuccess={handleGoogleLogin}
               onError={() => setMessage('Google login failed')}
               render={(renderProps) => (
                  <button
                     className="google-login-button"
                     onClick={renderProps.onClick}
                     disabled={renderProps.disabled}
                  >
                     <img src={GoogleLogo} alt="Google Logo" className="google-logo" />
                     <span className="google-login-text">Continue With Google</span>
                  </button>
               )}
            />
         </div>

         <div className="signup-footer">
            Already have an ArtVerse Account? <Link to="/signin" className="signup-link">Login</Link>
         </div>
      </div>
   );
}

export default Right_Section_Signup_page;
