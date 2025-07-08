// src/components/ProductDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productData from '../data/productData';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = productData.find((item) => item.id === parseInt(productId));

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const storedReviews = JSON.parse(localStorage.getItem(`reviews_${productId}`)) || [];
    setReviews(storedReviews);
  }, [productId]);

  const addToCart = (product) => {
    const updatedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    updatedCart.push(product);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    alert("Item added to cart!");
  };

  const handleSubmit = () => {
    const newReview = { rating, comment };
    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews_${productId}`, JSON.stringify(updatedReviews));
    setRating(0);
    setComment('');
  };

  const averageRating = reviews.length > 0 ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1) : 0;

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={() => navigate('/products')} style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#6d4c41', color: '#fff' }}>
        Back to Products
      </button>
      <h2 style={{ color: 'black' }}>{product.name}</h2>
      <img src={product.image} alt={product.name} style={{ maxWidth: '300px' }} />
      <p style={{ color: 'black' }}>Price: ₹{product.price}</p>
      <p style={{ color: 'black' }}>Color: {product.color}</p>
      <p style={{ color: 'black' }}>Category: {product.category}</p>
      <p style={{ color: 'black' }}>Description: {product.description || "No description available"}</p>
      <p style={{ color: 'black' }}>Average Rating: {averageRating} ⭐</p>
      
      {/* Rating and Comment Section */}
      <div>
        <h3>Rate this product:</h3>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'gray' }}
            onClick={() => setRating(star)}
          >
            ★
          </span>
        ))}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Leave a comment..."
          style={{ width: '100%', marginTop: '10px', padding: '10px' }}
        />
        <button onClick={handleSubmit} style={{ marginTop: '10px', padding: '10px', backgroundColor: '#6d4c41', color: '#fff', border: 'none', borderRadius: '5px' }}>
          Submit Review
        </button>
      </div>

      <button onClick={() => addToCart(product)} style={{ padding: '10px', backgroundColor: '#6d4c41', color: '#fff', marginTop: '20px', border: 'none', borderRadius: '5px' }}>
        Add to Cart
      </button>

      {/* Display Reviews */}
      <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
        <h3>Reviews:</h3>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((review, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <p>Reviewer: {review.name}</p>
              <p>Rating: {review.rating} ⭐</p>
              <p>Comment: {review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
