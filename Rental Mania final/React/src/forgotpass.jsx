
import React, { useState } from 'react';
import './style.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Reset link sent to:', email);
    setSubmitted(true);
  };

  return (
    <section className="container">
      <div className="login-container">
        <div className="circle circle-one"></div>
        <div className="form-container">
          <h1>Forgot Password</h1>

          {!submitted ? (
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit">Send Reset Link</button>
            </form>
          ) : (
            <div>
              <p>✅ A password reset link has been sent to:</p>
              <strong>{email}</strong>
              <br /><br />
              <a href="/login" className="link-button">Back to Login</a>
            </div>
          )}
        </div>
        <div className="circle circle-two"></div>
      </div>
    </section>
  );
};

export default ForgotPassword;
