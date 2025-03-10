import '../styles/Artist_Form.css';


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ArtistForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        country: '',
        state: '',
        city: '',
        address: '',
        education: '',
        about: '',
        awards: '',
        certificates: '',
        image: null, // New state to store the image
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, image: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('country', formData.country);
        data.append('state', formData.state);
        data.append('city', formData.city);
        data.append('address', formData.address);
        data.append('education', formData.education);
        data.append('about', formData.about);
        data.append('awards', formData.awards);
        data.append('certificates', formData.certificates);
        if (formData.image) {
            data.append('image', formData.image); // Append the image file
        }

        try {
            const response = await axios.post('http://localhost:4000/api/users/become-artist', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setMessage(response.data.message);
            setError('');
            sessionStorage.setItem('email', formData.email);
            sessionStorage.setItem('role', 'artist');

            setTimeout(() => {
                navigate('/home');
            }, 2000);
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred');
            setMessage('');
        }
    };

    return (
        <div className="artist-form-container">
            <h2>Register as an Artist</h2>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
            <form className="artist-form" onSubmit={handleSubmit}>
                {/* Other form fields... */}
                <div className="form-row">
                    <div className="form-group">
                        <label>Artist Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Artist Name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Country</label>
                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            placeholder="Country"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>State</label>
                        <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            placeholder="State"
                        />
                    </div>
                    <div className="form-group">
                        <label>City</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="City"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Residential Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Residential Address"
                    />
                </div>

                <div className="form-group">
                    <label>Education</label>
                    <input
                        type="text"
                        name="education"
                        value={formData.education}
                        onChange={handleChange}
                        placeholder="Education"
                    />
                </div>

                <div className="form-group">
                    <label>About Me</label>
                    <textarea
                        name="about"
                        value={formData.about}
                        onChange={handleChange}
                        placeholder="About Me"
                    />
                </div>

                <div className="form-group">
                    <label>Awards</label>
                    <textarea
                        name="awards"
                        value={formData.awards}
                        onChange={handleChange}
                        placeholder="Awards"
                    />
                </div>

                <div className="form-group">
                    <label>Certificates</label>
                    <textarea
                        name="certificates"
                        value={formData.certificates}
                        onChange={handleChange}
                        placeholder="Certificates"
                    />
                </div>

                
                <div className="form-group">
                    <label>Profile Picture</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>

                <button type="submit" className="register-button">Register as Artist</button>
            </form>
        </div>
    );
}

export default ArtistForm;

