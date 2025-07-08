import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.jpg";
import "../index.css";

const NavigationBar = ({ items = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("loggedInUser");

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm.trim() === "") {
        setSearchResults([]);
        return;
      }
      const results = items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
      );
      setSearchResults(results);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm, items]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (searchTerm.trim() === "") {
        navigate("/products");
        return;
      }
      if (searchResults.length > 1) {
        navigate("/products", { state: { searchResults } });
      } else if (searchResults.length === 1) {
        navigate(`/products/${searchResults[0].id}`, {
          state: { searchResults },
        });
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "/login";
  };

  return (
    <nav
      className="navbar"
      style={{
        background: "linear-gradient(to right, rgb(233, 222, 196), rgb(205, 188, 162), rgb(190, 159, 112))",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 30px",
        height: "60px",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        flexWrap: "wrap",
maxWidth: "97%",
        boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)"
      }}
    >
      <div className="logo-container" style={{ display: "flex", alignItems: "center" }}>
        <img
          src={logo}
          alt="Site Logo"
          style={{ height: "40px", width: "40px", borderRadius: "50%", marginRight: "10px" }}
        />
        <span className="site-name" style={{ fontWeight: "bold", fontSize: "20px", color: "#3e2723" }}>
          EcoMart
        </span>
      </div>

      <div className="navbar-links" style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Link style={{ textDecoration: "none", color: "#3e2723", fontWeight: "bold" }} to="/">Home</Link>
        <Link style={{ textDecoration: "none", color: "#3e2723", fontWeight: "bold" }} to="/products">Products</Link>
        <Link style={{ textDecoration: "none", color: "#3e2723", fontWeight: "bold" }} to="/cart">Cart</Link>
        {isLoggedIn && (
          <>
            <Link style={{ textDecoration: "none", color: "#3e2723", fontWeight: "bold" }} to="/myorders">My Orders</Link>
            <Link style={{ textDecoration: "none", color: "#3e2723", fontWeight: "bold" }} to="/signup">Signup</Link>
            <Link style={{ textDecoration: "none", color: "#3e2723", fontWeight: "bold" }} to="/login">Login</Link>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "#e53935",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold"
                
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
