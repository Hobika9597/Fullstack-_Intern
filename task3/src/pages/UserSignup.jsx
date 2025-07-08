import React, { useState } from "react";
import "./UserSignup.css"; // Importing the CSS file
import logo from "../images/logo.jpg";

const UserSignup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find((user) => user.email === email)) {
      setError("Email already exists");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const newUser = { username, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup successful! Please log in.");
    window.location.href = "/login"; // Redirect to login
  };

  return (
    <div className="signup-container">
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
      <h2>Signup</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSignup} className="signup-form">
        <input
          type="text"
          className="input-field"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          className="input-field"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="input-field"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          className="input-field"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" className="signup-button">
          Signup
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
          href="/login"
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
          Already have an account?{" "}
          <span style={{ textDecoration: "underline" }}>Login</span>
        </a>
      </div>
    </div>
  );
};

export default UserSignup;
