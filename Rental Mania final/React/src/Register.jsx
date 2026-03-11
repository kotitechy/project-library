import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ls.css';
import backend_url from './sec';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    state: '',
    city: '',
    purpose: '',
    password: '',
    rePassword: '',
    profilePhoto: null,
  });

  // Handle typing and file uploads
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0], // store single file
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("fullname", formData.fullName);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("country", formData.country);
    data.append("state", formData.state);
    data.append("city", formData.city);
    data.append("purpose", formData.purpose);
    data.append("password", formData.password);
    data.append("repassword", formData.rePassword);

    if (formData.profilePhoto) {
      data.append("profilePhoto", formData.profilePhoto);
    }

    // See what's inside
    for (const pair of data.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const response = await fetch(`${backend_url}/register`, {
        method: 'POST',
        body: data,
      });

      const result = await response.json();
      console.log(result);
      alert('✅ Registration successful');
    } catch (error) {
      console.error('❌ Error:', error);
    }
  };

  return (
    <section className="container">
      <div className="register-container">
        <div className="circle circle-one"></div>

        <div className="form-container">
          <h1>REGISTER</h1>

          <div className="upload-photo">
            <label htmlFor="profile-upload" className="photo-circle" id="photoDisplay">
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="Upload"
              />
            </label>
            <input
              type="file"
              accept="image/*"
              id="profile-upload"
              name="profilePhoto"
              onChange={handleChange}
            />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                required
              />
              <select
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                required
              >
                <option value="">Select Purpose</option>
                <option>Account Management</option>
                <option>Loan Services</option>
                <option>Investment Inquiry</option>
                <option>Technical Support</option>
                <option>Other</option>
              </select>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="rePassword"
                placeholder="Re-enter Password"
                value={formData.rePassword}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">SUBMIT</button>
            <div className="register-forget opacity" style={{ marginLeft: '150px' }}>
              <Link to='/login'>Login</Link>
            </div>
          </form>
        </div>

        <div className="circle circle-two"></div>
        <div className="theme-btn-container"></div>
      </div>
    </section>
  );
};

export default Register;
