import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCart);
  }, []);

  const removeFromCart = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

  const handleCheckout = () => {
    alert("Thank you for your purchase!");
    localStorage.removeItem("cartItems");
    setCartItems([]);
    navigate("/checkorder");
  };

  return (
    <div
      style={{
        width: "99vw",
        height: "78vh",
        margin: "auto",
        marginTop: "40px",
        overflow: "hidden",
        padding: "20px 30px",
        background: "linear-gradient(to right, rgb(233, 222, 196), rgb(205, 188, 162), rgb(190, 159, 112))",
        fontFamily: "Segoe UI, sans-serif",
        boxSizing: "border-box",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <h2
        style={{
          color: "#3e2723",
          fontSize: "26px",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Your Cart
      </h2>

      {cartItems.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "18px" }}>
          Your cart is empty.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            maxHeight: "55vh",
            overflow: "auto", // you can change this to hidden if you want strict no scroll
            paddingBottom: "10px",
          }}
        >
          {cartItems.map((item, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#fff",
                padding: "15px",
                borderRadius: "8px",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <h3 style={{ marginBottom: "8px", color: "#4e342e" }}>{item.name}</h3>
              <p style={{ marginBottom: "12px" }}>₹{item.price}</p>
              <button
                onClick={() => removeFromCart(index)}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  padding: "8px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <div
  style={{
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  }}
>
  {/* Total on its own line */}
  <h3 style={{ color: "#3e2723" }}>Total: ₹{totalAmount}</h3>

  {/* Buttons on separate line */}
  <div style={{ display: "flex", gap: "20px" }}>
    <button
      onClick={handleCheckout}
      style={{
        backgroundColor: "green",
        color: "white",
        border: "none",
        padding: "10px 20px",
        cursor: "pointer",
        borderRadius: "5px",
        fontWeight: "bold",
      }}
    >
      Checkout
    </button>

    <button
      onClick={() => navigate("/checkorder")}
      style={{
        backgroundColor: "orange",
        color: "white",
        border: "none",
        padding: "10px 20px",
        cursor: "pointer",
        borderRadius: "5px",
        fontWeight: "bold",
      }}
    >
      Check Order
    </button>
  </div>
</div>

      )}
    </div>
  );
};

export default ShoppingCart;
