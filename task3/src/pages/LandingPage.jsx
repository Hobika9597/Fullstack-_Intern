import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./LandingPage.css"; // Importing CSS for the landing page
import p1 from "../images/p1.jpg"; // Importing images
import p2 from "../images/p2.jpg";
import p3 from "../images/p3.jpg";
import p4 from "../images/p4.jpg";

const LandingPage = () => {
  const navigate = useNavigate(); // Initialize navigate for navigation

  const handleShopNowClick = () => {
    navigate("/products"); // Redirect to the products page
  };

  return (
    <div className="landing-content">
      <h1>Welcome to Our E-commerce Site!</h1>
      <p>
        Discover a wide range of products at unbeatable prices. Our platform
        connects you with the best deals on electronics, fashion, home goods,
        and more.
      </p>
      <div className="features">
        <div className="feature-card">
          <img src={p1} alt="Quality Products" className="product-image" />
          <h2>Quality Products</h2>
          <p>We source only the best products for our customers.</p>
        </div>
        <div className="feature-card">
          <img src={p2} alt="Customer Satisfaction" className="product-image" />
          <h2>Customer Satisfaction</h2>
          <p>Your satisfaction is our top priority.</p>
        </div>
        <div className="feature-card">
          <img src={p3} alt="Fast Shipping" className="product-image" />
          <h2>Fast Shipping</h2>
          <p>Get your orders delivered quickly and efficiently.</p>
        </div>
        <div className="feature-card">
          <img src={p4} alt="Secure Payments" className="product-image" />
          <h2>Secure Payments</h2>
          <p>Shop with confidence with our secure payment options.</p>
        </div>
      </div>
      <button className="cta-button" onClick={handleShopNowClick}>
        Shop Now
      </button>
    </div>
  );
};

export default LandingPage;
