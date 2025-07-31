import './ls.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignOut = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    alert("You have been signed out.");
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="container">
      <div className="form-container" style={{ maxWidth: '400px', textAlign: 'center' }}>
        <h2>Sign Out</h2>
        <p>Are you sure you want to sign out?</p>
        <button onClick={handleSignOut} style={{ marginTop: '20px' }}>Yes, Sign Out</button>
      </div>
    </div>
  );
};

export default SignOut;
