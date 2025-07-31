import React from 'react';
import './LandingPage';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="hero">
        <h1>Find Your Perfect Rental Home</h1>
        <p>Explore apartments, villas, and commercial spaces near you</p>
        <button className="cta-button">Browse Listings</button>
      </header>

      <section className="features">
        <div className="feature-card">
          <h3>Verified Listings</h3>
          <p>We list only verified properties to ensure a safe experience.</p>
        </div>
        <div className="feature-card">
          <h3>Affordable Rentals</h3>
          <p>From budget-friendly to premium properties, we’ve got it all.</p>
        </div>
        <div className="feature-card">
          <h3>Easy Contact</h3>
          <p>Contact property owners directly with just one click.</p>
        </div>
      </section>

      <section className="about">
        <h2>Why Choose Us?</h2>
        <p>
          We make renting simple. Whether you are looking for a small apartment or a luxury villa, our platform connects you with the right options quickly and easily.
        </p>
      </section>

      <footer className="footer">
        <p>© 2025 RentalService.com | All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
