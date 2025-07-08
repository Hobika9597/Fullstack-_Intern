import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import productData from "../data/productData";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(productData);
  const [priceFilter, setPriceFilter] = useState("all");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    let matches = productData.filter((product) =>
      product.name.toLowerCase().includes(term),
    );
    // Filter by price if selected
    if (priceFilter !== "all") {
      matches = matches.filter((product) => {
        if (priceFilter === "low") return product.price < 100;
        if (priceFilter === "mid")
          return product.price >= 100 && product.price < 300;
        if (priceFilter === "high") return product.price >= 300;
        return true;
      });
    }
    // If more than one product matches and their names are the same, show all similar products
    if (matches.length > 1) {
      const grouped = {};
      matches.forEach((product) => {
        const name = product.name.toLowerCase();
        if (!grouped[name]) grouped[name] = [];
        grouped[name].push(product);
      });
      const similar = Object.values(grouped).flatMap((group) =>
        group.length > 1 ? group : [],
      );
      setFilteredProducts(similar.length > 0 ? similar : matches);
    } else {
      setFilteredProducts(matches);
    }
  };

  const handlePriceFilter = (event) => {
    setPriceFilter(event.target.value);
    // Re-run search with new price filter
    let matches = productData.filter((product) =>
      product.name.toLowerCase().includes(searchTerm),
    );
    if (event.target.value !== "all") {
      matches = matches.filter((product) => {
        if (event.target.value === "low") return product.price < 100;
        if (event.target.value === "mid")
          return product.price >= 100 && product.price < 300;
        if (event.target.value === "high") return product.price >= 300;
        return true;
      });
    }
    setFilteredProducts(matches);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && searchTerm.trim() === "") {
      navigate("/products");
    }
  };

  const handleFilter = (category) => {
    setFilteredProducts(
      productData.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm) &&
          product.category === category,
      ),
    );
  };

  // Reset search state when the page is refreshed
  React.useEffect(() => {
    setSearchTerm("");
    setFilteredProducts(productData);
  }, []);

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <input
        type="text"
        placeholder="Search for items..."
        value={searchTerm}
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
        style={{
          padding: "8px",
          width: "300px",
          fontSize: "16px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          margin: "20px auto",
          display: "block",
        }}
      />

      <input
        type="text"
        placeholder="Search products..."
        style={{
          marginLeft: "16px",
          padding: "6px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          width: "200px",
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.target.value.trim() === "") {
            window.location.href = "/products";
          }
        }}
      />

      <div style={{ margin: "10px 0" }}>
        <label>Filter by price: </label>
        <select
          value={priceFilter}
          onChange={handlePriceFilter}
          style={{
            padding: "6px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        >
          <option value="all">All</option>
          <option value="low">Below $100</option>
          <option value="mid">$100 - $299</option>
          <option value="high">$300 and above</option>
        </select>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "24px",
          marginTop: "30px",
          width: "100%",
        }}
      >
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #eee",
              borderRadius: "8px",
              padding: "16px",
              minwidth: "100px",
              textAlign: "center",
              boxShadow: "0 2px 8px #f0f0f0",
              background: "#fff",
              margin: "0 auto",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "100%",
                height: "120px",
                objectFit: "cover",
                borderRadius: "4px",
              }}
            />
            <h3 style={{ margin: "10px 0 5px 0" }}>{product.name}</h3>
            <p
              style={{
                margin: "0 0 10px 0",
                fontWeight: "bold",
                color: "#333",
              }}
            >
              Price: ${product.price}
            </p>
            <p style={{ fontSize: "12px", color: "#888" }}>ID: {product.id}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
