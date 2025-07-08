// src/pages/ItemList.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import productData from "../data/productData";

const ItemList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [priceFilter, setPriceFilter] = useState("all");
  const [colorFilter, setColorFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCart);
  }, []);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  let filteredProducts = productData;
  if (searchTerm.trim() !== "") {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  if (priceFilter !== "all") {
    filteredProducts = filteredProducts.filter((product) => {
      if (priceFilter === "low") return product.price < 50;
      if (priceFilter === "mid") return product.price >= 50 && product.price < 99;
      if (priceFilter === "high") return product.price >= 100 && product.price < 199;
      if (priceFilter === "premium") return product.price >= 200;
      return true;
    });
  }
  if (colorFilter !== "all") {
    filteredProducts = filteredProducts.filter((product) => product.color === colorFilter);
  }
  if (categoryFilter !== "all") {
    filteredProducts = filteredProducts.filter((product) => product.category === categoryFilter);
  }

  const paginatedItems = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const addToCart = (product) => {
    const updatedCart = [...cartItems, product];
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    alert("Item added to cart!");
  };

  return (
    <div
      style={{
        width: "99.9vw",
        height: "89vh",
        overflow: "auto",
        background:
          "linear-gradient(to right, rgb(233, 222, 196), rgb(205, 188, 162), rgb(190, 159, 112))",
        padding: "20px 40px",
        fontFamily: "Segoe UI, sans-serif",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "32px",
          fontWeight: "bold",
          color: "#4e342e",
          marginBottom: "20px",
        }}
      >
        Product
      </h2>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
          marginBottom: "16px",
        }}
      >
        <select
          value={priceFilter}
          onChange={(e) => {
            setPriceFilter(e.target.value);
            setCurrentPage(1);
          }}
          style={dropdownStyle}
        >
          <option value="all">All Prices</option>
          <option value="low">Below 50</option>
          <option value="mid">50 - 99</option>
          <option value="high">100 - 199</option>
          <option value="premium">200 and above</option>
        </select>

        <select
          value={colorFilter}
          onChange={(e) => {
            setColorFilter(e.target.value);
            setCurrentPage(1);
          }}
          style={dropdownStyle}
        >
          <option value="all">All Colors</option>
          <option value="Black">Black</option>
          <option value="Red">Red</option>
          <option value="White">White</option>
          <option value="Brown">Brown</option>
          <option value="Silver">Silver</option>
          <option value="Blue">Blue</option>
        </select>

        <select
          value={categoryFilter}
          onChange={(e) => {
            setCategoryFilter(e.target.value);
            setCurrentPage(1);
          }}
          style={dropdownStyle}
        >
          <option value="all">All Categories</option>
          <option value="Fruits">Fruits</option>
          <option value="Electronics">Electronics</option>
          <option value="Dress">Dress</option>
          <option value="Things">Things</option>
          <option value="Snacks">Snacks</option>
        </select>

        <input
          type="text"
          placeholder="🔍 Search..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            width: "180px",
          }}
        />
      </div>

      {/* Product Cards */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 2fr))",
          gap: "20px",
          overflow: "hidden",
          minHeight: "200px",
        }}
      >
        {paginatedItems.map((product) => {
          // Retrieve reviews for the product
          const reviews = JSON.parse(localStorage.getItem(`reviews_${product.id}`)) || [];
          const averageRating = reviews.length > 0 ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1) : 0;

          return (
            <div
              key={product.id}
              style={{
                backgroundColor: "#fff",
                borderRadius: "12px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                height: "100%",
                minHeight: "340px",
                maxHeight: "340px",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  height: "200px",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/products/${product.id}`)} // Navigate to product detail page
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
              <h3 style={{ margin: "12px 0 6px 0", color: "#333", fontSize: "18px" }}>
                {product.name}
              </h3>
              <p style={{ marginBottom: "10px", fontWeight: "bold" }}>₹{product.price}</p>
              <p style={{ marginBottom: "10px", color: "#666" }}>Average Rating: {averageRating} ⭐</p>
              <button
                onClick={() => addToCart(product)}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#6d4c41",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "12px",
          gap: "12px",
        }}
      >
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          style={paginationButtonStyle(currentPage === 1)}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage * itemsPerPage >= filteredProducts.length}
          style={paginationButtonStyle(currentPage * itemsPerPage >= filteredProducts.length)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

// Reusable Styles
const dropdownStyle = {
  padding: "8px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const paginationButtonStyle = (disabled) => ({
  padding: "10px 20px",
  fontSize: "14px",
  borderRadius: "16px",
  background: disabled ? "#e0e0e0" : "linear-gradient(180deg,#f7dfa5,#f0c14b)",
  color: "#111",
  border: "1px solid #a88734",
  boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
  cursor: disabled ? "not-allowed" : "pointer",
  fontWeight: "bold",
  opacity: disabled ? 0.7 : 1,
});

export default ItemList;
