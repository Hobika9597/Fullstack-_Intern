import React from 'react';

const ProductModal = ({ product, onClose, addToCart }) => {
  if (!product) return null;

  // Fetch reviews for the product
  const reviews = JSON.parse(localStorage.getItem(`reviews_${product.id}`)) || [];
  const averageRating = reviews.length > 0 ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1) : 0;

  return (
    <div style={modalOverlayStyle}>
      <div style={modalStyle}>
        <div style={modalHeaderStyle}>
          <button onClick={onClose} style={backButtonStyle}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="#6d4c41" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </button>
          <button onClick={onClose} style={closeButtonStyle}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="#6d4c41" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div style={modalContentStyle}>
          <div style={imageContainerStyle}>
            <img
              src={product.image}
              alt={product.name}
              style={productImageStyle}
            />
          </div>
          <div style={detailsContainerStyle}>
            <h2 style={productTitleStyle}>{product.name}</h2>
            <div style={dividerStyle}></div>
            
            <div style={priceContainerStyle}>
              <span style={priceLabelStyle}>Price:</span>
              <span style={priceValueStyle}>₹{product.price}</span>
            </div>

            {product.color && (
              <div style={detailRowStyle}>
                <span style={detailLabelStyle}>Color:</span>
                <span style={detailValueStyle}>{product.color}</span>
              </div>
            )}

            {product.category && (
              <div style={detailRowStyle}>
                <span style={detailLabelStyle}>Category:</span>
                <span style={detailValueStyle}>{product.category}</span>
              </div>
            )}

            <div style={descriptionContainerStyle}>
              <h3 style={descriptionTitleStyle}>Description</h3>
              <p style={descriptionTextStyle}>
                {product.description || "No description available"}
              </p>
            </div>

            <button onClick={() => addToCart(product)} style={addToCartButtonStyle}>
              Add to Cart
            </button>

            {/* Display Reviews */}
            <h3 style={descriptionTitleStyle}>Reviews:</h3>
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={index}>
                  <p>{review.review} - ⭐{review.rating}</p>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
            <p>Average Rating: {averageRating} ⭐</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles (same as before)
const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.85)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
  backdropFilter: 'blur(4px)',
};

const modalStyle = {
  backgroundColor: '#fff',
  borderRadius: '12px',
  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
  width: '90%',
  maxWidth: '850px',
  maxHeight: '85vh',
  overflow: 'hidden',
};

const modalHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 20px',
  backgroundColor: '#f9f5f0',
  borderBottom: '1px solid #e0e0e0',
};

const backButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  background: 'none',
  border: 'none',
  fontSize: '16px',
  fontWeight: '500',
  color: '#6d4c41',
  cursor: 'pointer',
  padding: '4px 8px',
  borderRadius: '4px',
  transition: 'background-color 0.2s',
};

const closeButtonStyle = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '4px',
  borderRadius: '4px',
  transition: 'background-color 0.2s',
};

const modalContentStyle = {
  display: 'flex',
  flexDirection: 'row',
};

const imageContainerStyle = {
  flex: '1',
  padding: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#f5f5f5',
};

const productImageStyle = {
  maxWidth: '100%',
  maxHeight: '400px',
  objectFit: 'contain',
  borderRadius: '8px',
};

const detailsContainerStyle = {
  flex: '1',
  padding: '24px',
  overflowY: 'auto',
};

const productTitleStyle = {
  fontSize: '28px',
  fontWeight: '600',
  color: '#4e342e',
  marginBottom: '16px',
};

const dividerStyle = {
  height: '2px',
  backgroundColor: '#e0e0e0',
  marginBottom: '20px',
  width: '50px',
};

const priceContainerStyle = {
  marginBottom: '20px',
};

const priceLabelStyle = {
  fontSize: '16px',
  color: '#6d4c41',
  fontWeight: '600',
  marginRight: '8px',
};

const priceValueStyle = {
  fontSize: '24px',
  fontWeight: '700',
  color: '#4e342e',
};

const detailRowStyle = {
  display: 'flex',
  marginBottom: '12px',
  alignItems: 'center',
};

const detailLabelStyle = {
  minWidth: '100px',
  color: '#6d4c41',
  fontWeight: '600',
  fontSize: '15px',
};

const detailValueStyle = {
  color: '#333',
  fontSize: '15px',
};

const descriptionContainerStyle = {
  marginTop: '24px',
  marginBottom: '24px',
};

const descriptionTitleStyle = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#4e342e',
  marginBottom: '12px',
};

const descriptionTextStyle = {
  color: '#555',
  lineHeight: '1.6',
  fontSize: '15px',
};

const addToCartButtonStyle = {
  width: '100%',
  padding: '14px',
  backgroundColor: '#6d4c41',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  fontSize: '16px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
};

export default ProductModal;
