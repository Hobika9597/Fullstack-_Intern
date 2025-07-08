import React, { useState } from "react";
import "./UserLogin.css"; // Importing CSS for the login page
import logo from "../images/logo.jpg";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.email === email && user.password === password,
    );

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      window.location.href = "/"; // Redirect to home page
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <div style={{ display: "flex", alignItems: "center", marginBottom: 18 }}>
        <img
          src={logo}
          alt="EcoMart Logo"
          style={{ width: 38, height: 38, marginRight: 10, borderRadius: 6 }}
        />
        <span
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: "#e47911",
            fontFamily: "Amazon Ember, Arial, sans-serif",
          }}
        >
          EcoMart
        </span>
      </div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <input
            type="email"
            className="input-field"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            className="input-field"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <div
        style={{
          marginTop: 18,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <a
          href="/"
          style={{
            color: "#007185",
            textDecoration: "none",
            fontWeight: 700,
            fontSize: 15,
            padding: "8px 0",
            borderRadius: 4,
            transition: "background 0.2s",
            letterSpacing: "0.5px",
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = "#f7fafa")}
          onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
        >
          &larr; Back to Home
        </a>
        <a
          href="/signup"
          style={{
            color: "#007185",
            textDecoration: "none",
            fontWeight: 500,
            fontSize: 15,
            padding: "8px 0",
            borderRadius: 4,
            transition: "background 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = "#f7fafa")}
          onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
        >
          New to EcoMart?{" "}
          <span style={{ textDecoration: "underline" }}>Sign Up</span>
        </a>
      </div>
    </div>
  );
};

export default UserLogin;
