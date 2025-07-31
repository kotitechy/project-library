import React, { useState } from 'react';

import Sidebar from './sidebar';
import Header from './header';
import DashboardContent from './DashboardContent';
import './index.css';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';


const SettingsPage = () => {
  const [form, setForm] = useState({
    name: 'Shiva Charan',
    email: 'shiva@example.com',
    phone: '9876543210',
    language: 'English',
    darkMode: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Settings saved:', form);
    alert('Settings saved!');
  };

  return (
    <>
    <div className="App">
            <Header data='Settings' />
            <Sidebar />
        </div>
        
        <div className="main-content">
        <div className="properties-container">

    <div className="settings-container">
      <h2>Account Settings</h2>
      <form className="settings-form" onSubmit={handleSubmit} >
        <label>
          Name:
          <input type="text" name="name" value={form.name} onChange={handleChange} disabled  />
        </label>

        <label>
          Email:
          <input type="email" name="email" value={form.email} onChange={handleChange} disabled />
        </label>

        <label>
          Phone:
          <input type="tel" name="phone" value={form.phone} onChange={handleChange} disabled />
        </label>
        <label>
          Alternate-Number:
          <input type="tel" name="phone" value={form.al_phone} onChange={handleChange}  />
        </label>
        <label>
          Dob:
          <input type="date" name="date" value={form.dob} onChange={handleChange}  />
        </label>

        <label>
          Gender:
          <select name="language" value={form.language} onChange={handleChange}>
            <option>Male</option>
            <option>Female</option>
            <option>Others</option>
          </select>
        </label>
        {/* <label className="checkbox-group">
          <input
          type="checkbox"
          name="darkMode"
          checked={form.darkMode}
          onChange={handleChange}
          />
          Enable Dark Mode
          </label> */}

        <button type="submit">Save Settings</button>
      </form>
    </div>
          </div>
          </div>
          </>
  );
};

export default SettingsPage;
