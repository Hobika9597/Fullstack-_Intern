import NavigationBar from "../components/NavigationBar";
import React, { useEffect, useState } from "react";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);

    const rejectedOrder = storedOrders.find(
      (order) => order.status && order.status.toLowerCase() === "rejected"
    );
    if (rejectedOrder) {
      alert("Your order has been rejected. Please check your order status.");
    }
  }, []);

  const markAsDelivered = (orderId) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: 'Delivered' } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  const handleReviewSubmit = (orderId) => {
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        const newReview = { review, rating };
        const existingReviews = JSON.parse(localStorage.getItem(`reviews_${orderId}`)) || [];
        localStorage.setItem(`reviews_${orderId}`, JSON.stringify([...existingReviews, newReview]));
        return { ...order, reviewed: true }; // Mark as reviewed
      }
      return order;
    });
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    setReview(""); // Clear review input
    setRating(0); // Reset rating
  };

  // Styles
  const reviewContainerStyle = {
    marginTop: "20px",
    padding: "16px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const reviewTitleStyle = {
    marginBottom: "10px",
    fontSize: "18px",
    fontWeight: "600",
    color: "#4e342e",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
    boxSizing: "border-box",
  };

  const submitButtonStyle = {
    padding: "10px 16px",
    backgroundColor: "#6d4c41",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  };

  const submitButtonHoverStyle = {
    backgroundColor: "#5b3e33",
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "89vh",
        background: "linear-gradient(to right, rgb(233, 222, 196), rgb(205, 188, 162), rgb(190, 159, 112))",
        margin: "auto",
        padding: "20px",
        fontFamily: "Segoe UI, sans-serif",
        overflow: "hidden",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2
        style={{
          color: "#4e342e",
          textAlign: "center",
          fontSize: "30px",
          marginBottom: "20px",
        }}
      >
        My Orders
      </h2>

      {orders.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "18px" }}>No orders found.</p>
      ) : (
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            paddingRight: "10px",
          }}
        >
          <ul style={{ listStyle: "none", padding: 0 }}>
            {orders
              .slice()
              .reverse()
              .map((order, idx) => (
                <li
                  key={idx}
                  style={{
                    marginBottom: "20px",
                    padding: "16px",
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    borderLeft: `6px solid ${
                      order.status?.toLowerCase() === "confirmed" ? "green" : "red"
                    }`,
                  }}
                >
                  <h4 style={{ marginBottom: "10px", color: "#333" }}>
                    Order #{orders.length - idx} —{" "}
                    <span style={{ color: order.status === "Confirmed" ? "green" : "red" }}>
                      {order.status}
                    </span>
                  </h4>
                  <div style={{ marginBottom: "10px", fontSize: "14px", color: "#666" }}>
                    📅 {order.date}
                  </div>
                  <div style={{ marginBottom: "10px", fontSize: "18px", color: "#666" }}>
                    📦 Username: {order.username}
                  </div>
                  <div style={{ marginBottom: "10px", fontSize: "18px", color: "#666" }}>
                    🏠 Address: {order.address}
                  </div>
                  <ul style={{ paddingLeft: "20px" }}>
                    {order.items.map((item, i) => (
                      <li key={i}>
                        {item.name} — ₹{item.price}
                      </li>
                    ))}
                  </ul>
                  <strong style={{ display: "block", marginTop: "10px" }}>
                    Total: ₹{order.total}
                  </strong>
                  <button onClick={() => markAsDelivered(order.id)}>Mark as Delivered</button>
                  {!order.reviewed && (
                    <div style={reviewContainerStyle}>
                      <h3 style={reviewTitleStyle}>Leave a Review:</h3>
                      <input 
                        type="text" 
                        placeholder="Write your review" 
                        value={review} 
                        onChange={(e) => setReview(e.target.value)} 
                        style={inputStyle} 
                      />
                      <input 
                        type="number" 
                        min="1" 
                        max="5" 
                        placeholder="Rating (1-5)" 
                        value={rating} 
                        onChange={(e) => setRating(e.target.value)} 
                        style={inputStyle} 
                      />
                      <button 
                        onClick={() => handleReviewSubmit(order.id)} 
                        style={submitButtonStyle}
                      >
                        Submit Review
                      </button>
                    </div>
                  )}
                  {order.reviewed && (
                    <div style={{ marginTop: "10px", color: "green" }}>
                      <strong>Thankyou for your review! Your feedback is valuable to us. We appreciate your support. </strong>
                    </div>
                  )}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default MyOrders;
