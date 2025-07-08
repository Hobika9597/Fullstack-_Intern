// src/App.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import LandingPage from "./pages/LandingPage";
import UserLogin from "./pages/UserLogin"; // Correctly imported
import UserSignup from "./pages/UserSignup"; // Correctly imported
import ItemList from "./pages/ItemList";
import ShoppingCart from "./pages/ShoppingCart";
import AuthRoute from "./components/AuthRoute";
import ProductDetail from "./components/ProductDetail";
import CheckOrder from "./pages/CheckOrder";
import MyOrders from "./pages/MyOrders";

const AppContent = () => {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(
    !["/login", "/signup"].includes(location.pathname),
  );
  const navbarRef = useRef(null);

  useEffect(() => {
    setShowNavbar(!["/login", "/signup"].includes(location.pathname));
  }, [location.pathname]);

  return (
    <div style={{ minHeight: "100vh", margin: 0, padding: 0 }}>
      <div
        ref={navbarRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          transition: "transform 0.3s ease-in-out, opacity 0.3s",
          transform: showNavbar ? "translateY(0)" : "translateY(-100%)",
          opacity: showNavbar ? 1 : 0,
          pointerEvents: showNavbar ? "auto" : "none",
        }}
      >
        <NavigationBar />
      </div>
      <div style={{ paddingTop: showNavbar ? "80px" : "0" }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/login" element={<UserLogin />} /> {/* Corrected */}
          <Route path="/signup" element={<UserSignup />} /> {/* Corrected */}
          <Route path="/products" element={<AuthRoute element={ItemList} />} />
          <Route path="/cart" element={<AuthRoute element={ShoppingCart} />} />
          <Route path="/checkorder" element={<AuthRoute element={CheckOrder} />} />
          <Route path="/myorders" element={<AuthRoute element={MyOrders} />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
