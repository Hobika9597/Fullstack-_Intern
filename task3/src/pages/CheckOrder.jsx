import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckOrder = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCart);

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleConfirm = () => {
    if (!username || !address) {
      alert("Please enter your username and address.");
      return;
    }

    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const newOrder = {
      items: cartItems,
      total: cartItems.reduce((total, item) => total + item.price, 0),
      status: "Confirmed",
      date: new Date().toLocaleString(),
      username: username,
      address: address,
    };
    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.removeItem("cartItems");
    setOrderConfirmed(true);
    setCartItems([]);
  };

  const handleReject = () => {
    navigate("/cart");
  };

  const styles = {
    container: {
      height: "90vh",
      width: "100vw",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(to right,rgb(233, 222, 196),rgb(205, 188, 162),rgb(190, 159, 112))",
      fontFamily: "Segoe UI, sans-serif",
      padding: "20px",
    },
    card: {
      backgroundColor: "#ffffff",
      padding: "30px 40px",
      borderRadius: "16px",
      boxShadow: "0 12px 30px rgba(0, 0, 0, 0.2)",
      width: "80vw", // Wider width
      maxWidth: "1200px",
      textAlign: "center",
    },
    title: {
      fontSize: "32px",
      fontWeight: "bold",
      color: "#00796b",
      marginBottom: "24px",
    },
    titleSuccess: {
      fontSize: "30px",
      fontWeight: "bold",
      color: "#2e7d32",
      marginBottom: "20px",
    },
    text: {
      fontSize: "18px",
      color: "#555",
      marginBottom: "20px",
    },
    itemList: {
      listStyle: "none",
      padding: 0,
      marginBottom: "24px",
      textAlign: "left",
    },
    item: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "10px",
      fontSize: "17px",
      paddingBottom: "5px",
      borderBottom: "1px solid #ddd",
    },
    total: {
      fontSize: "22px",
      fontWeight: "600",
      color: "#000",
      marginBottom: "20px",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "10px",
      borderRadius: "4px",
      border: "1px solid #ddd",
    },
    buttonGroup: {
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      marginTop: "20px",
    },
    buttonPrimary: {
      padding: "12px 24px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "bold",
    },
    buttonSuccess: {
      padding: "12px 24px",
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "bold",
    },
    buttonDanger: {
      padding: "12px 24px",
      backgroundColor: "#dc3545",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {orderConfirmed ? (
          <>
            <h2 style={styles.titleSuccess}>🎉 Order Confirmed</h2>
            <p style={styles.text}>Your order has been successfully placed!</p>
            <button onClick={() => navigate("/myorders")} style={styles.buttonPrimary}>
              View My Orders
            </button>
          </>
        ) : (
          <>
            <h2 style={styles.title}>🛒 Review Your Order</h2>
            {cartItems.length === 0 ? (
              <p style={styles.text}>Your cart is empty.</p>
            ) : (
              <>
                <ul style={styles.itemList}>
                  {cartItems.map((item, idx) => (
                    <li key={idx} style={styles.item}>
                      <span>{item.name}</span>
                      <span>₹{item.price}</span>
                    </li>
                  ))}
                </ul>
                <h3 style={styles.total}>
                  Total: ₹{cartItems.reduce((total, item) => total + item.price, 0)}
                </h3>
                <p style={styles.text}>Please Enter Your Username and Address:</p>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={styles.input}
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  style={styles.input}
                />
                <p style={styles.text}>
                  Please review your items. Do you want to confirm or reject this order?
                </p>
                <div style={styles.buttonGroup}>
                  <button onClick={handleConfirm} style={styles.buttonSuccess}>
                    ✅ Confirm Order
                  </button>
                  <button onClick={handleReject} style={styles.buttonDanger}>
                    ❌ Reject Order
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CheckOrder;
