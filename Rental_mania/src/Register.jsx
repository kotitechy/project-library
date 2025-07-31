
import React from 'react';

import { Link } from 'react-router-dom';
import './ls.css';

const Register = () => {
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
            <input type="file" accept="image/*" id="profile-upload" />
          </div>

          <form>
            <div className="form-grid">
              <input type="text" placeholder="Full Name" required />
              <input type="email" placeholder="Email Address" required />
              <input type="tel" placeholder="Phone Number" required />
              <input type="text" placeholder="Country" required />
              <input type="text" placeholder="State" required />
              <input type="text" placeholder="City" required />
              <select required>
                <option value="">Select Purpose</option>
                <option>Account Management</option>
                <option>Loan Services</option>
                <option>Investment Inquiry</option>
                <option>Technical Support</option>
                <option>Other</option>
              </select>
              <input type="password" placeholder="Password" required />
              <input type="password" placeholder="Re-enter Password" required />
            </div>
            <button type="submit">SUBMIT</button>
            <div className="register-forget opacity" style={{ marginLeft: '150px' }}>
            <Link to ='/login'>Login</Link>
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
