import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import Logo from '../../assets/images/ArtVerse_Logo.png';
import '../../styles/Sign_Up_Page/RightSectionSignup.css';
import GoogleLogo from '../../assets/images/Google.png';

function Right_Section_Signup_page() {
   const navigate = useNavigate();
   const [formData, setFormData] = useState({
      firstName: '', lastName: '', email: '', phone: '', role:'', age:'', gender:'', password:'',
   });
   const [message, setMessage] = useState('');

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const response = await axios.post('http://localhost:4000/api/users/signup', formData);
         setMessage(response.data.message);
         navigate('/signin', { state: { email: formData.email, password: formData.password } });
      } catch (error) {
         setMessage(error.response?.data?.message || 'An error occurred during signup');
      }
   };

   const handleGoogleLogin = async (response) => {
      const { credential } = response;
      try {
         const res = await axios.post('http://localhost:4000/api/users/google-signup', { token: credential });
         const { user } = res.data;
         navigate('/signin', { state: { email: user.email, password: user.googleId } });
      } catch (error) {
         setMessage(error.response?.data?.message || 'Google login failed');
      }
   };

   return (
      <div className='signup-right-section'>
         <img src={Logo} alt="ArtVerse Logo" className="signup-logo" />
         <div className="signup-title"><p>Sign Up to ArtVerse</p></div>

         <form className="signup-form" onSubmit={handleSubmit}>
            <div className="name-phone-wrapper">
               <div className="form-group">
                  <label>First Name</label>
                  <input type='text' name="firstName" value={formData.firstName} onChange={handleChange} required />
               </div>
               <div className="form-group">
                  <label>Last Name</label>
                  <input type='text' name="lastName" value={formData.lastName} onChange={handleChange} required />
               </div>
            </div>

            <div className="name-phone-wrapper">
               <div className="form-group">
                  <label>Phone</label>
                  <input type='text' name="phone" value={formData.phone} onChange={handleChange} required />
               </div>
               <div className="form-group">
                  <label>Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required />
               </div>
            </div>

            <div className="name-phone-wrapper">
               <div className="form-group">
                  <label>Age</label>
                  <input type="number" name="age" value={formData.age} onChange={handleChange} required />
               </div>
               <div className="form-group">
                  <label>Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} required>
                     <option value="">Select Gender</option>
                     <option value="male">Male</option>
                     <option value="female">Female</option>
                     <option value="other">Other</option>
                  </select>
               </div>
            </div>

            <div className="form-group">
               <label>Password</label>
               <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>

            <button type="submit" className="signup-submit-button">Create Account</button>
         </form>

         {message && <p className="signup-message">{message}</p>}

         <div className="google-signup-wrapper">
            <GoogleLogin
               onSuccess={handleGoogleLogin}
               onError={() => setMessage('Google login failed')}
            />
         </div>

         <div className="signup-footer">
            Already have an ArtVerse Account? <Link to="/signin" className="signup-link">Login</Link>
         </div>
      </div>
   );
}

export default Right_Section_Signup_page;
