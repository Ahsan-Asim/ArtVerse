import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Artist_Form.css';

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
        image: null,
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const regexPatterns = {
        name: /^[a-zA-Z\s]*$/, // Only letters and spaces
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email format
        country: /^[a-zA-Z\s]*$/, // Only letters and spaces
        state: /^[a-zA-Z\s]*$/, // Only letters and spaces
        city: /^[a-zA-Z\s]*$/, // Only letters and spaces
    };

    const validateField = (name, value) => {
        if (value.trim() === '') {
            return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
        }
        if (regexPatterns[name] && !regexPatterns[name].test(value)) {
            return `Invalid ${name}`;
        }
        return '';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Validate the field
        const errorMessage = validateField(name, value);
        setErrors((prev) => ({
            ...prev,
            [name]: errorMessage,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, image: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate all fields before submission
        let isValid = true;
        const newErrors = {};
        Object.keys(formData).forEach((field) => {
            const errorMessage = validateField(field, formData[field]);
            if (errorMessage) {
                isValid = false;
                newErrors[field] = errorMessage;
            }
        });

        if (!isValid) {
            setErrors(newErrors);
            return;
        }

        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });

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
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
            <form className="artist-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className={`form-group ${errors.name ? 'error' : ''}`}>
                        <label>Artist Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Artist Name"
                            required
                        />
                        {errors.name && <span className="error-text">{errors.name}</span>}
                    </div>
                    <div className={`form-group ${errors.email ? 'error' : ''}`}>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                        />
                        {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>
                </div>

                <div className="form-row">
                    <div className={`form-group ${errors.country ? 'error' : ''}`}>
                        <label>Country</label>
                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            placeholder="Country"
                            required
                        />
                        {errors.country && <span className="error-text">{errors.country}</span>}
                    </div>
                    <div className={`form-group ${errors.state ? 'error' : ''}`}>
                        <label>State</label>
                        <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            placeholder="State"
                        />
                        {errors.state && <span className="error-text">{errors.state}</span>}
                    </div>
                    <div className={`form-group ${errors.city ? 'error' : ''}`}>
                        <label>City</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="City"
                        />
                        {errors.city && <span className="error-text">{errors.city}</span>}
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

                <button type="submit" className="register-button">
                    Register as Artisttadd 
                </button>
            </form>
        </div>
        
    );
}

export default ArtistForm;
