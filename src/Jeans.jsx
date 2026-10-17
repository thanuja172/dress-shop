import React from "react";
import { useNavigate } from "react-router-dom";

import image1 from "./assets/jeans/jeans1.jpg";
import image2 from "./assets/jeans/jeans2.jpg";
import image3 from "./assets/jeans/jeans3.jpg";
import image4 from "./assets/jeans/jeans4.jpg";
import image5 from "./assets/jeans/jeans5.jpg";

function Jeans({ addToCart }) {
  const navigate = useNavigate();

  const products = [
    { name: "Jeans 1", price: 1299, image: image1 },
    { name: "Jeans 2", price: 1399, image: image2 },
    { name: "Jeans 3", price: 1499, image: image3 },
    { name: "Jeans 4", price: 1199, image: image4 },
    { name: "Jeans 5", price: 1599, image: image5 }
  ];

  return (
    <div>
      <nav className="navbar">
        <h2>Fashion Store</h2>
        <button className="cart-btn" onClick={() => navigate("/cart")}>
          🛒 Cart
        </button>
      </nav>

      <h1 className="category-title">Jeans Collection</h1>

      <div className="product-grid">
        {products.map((item, index) => (
          <div className="product-card" key={index}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>

            <button
              onClick={() => {
                addToCart(item);
                navigate("/cart");
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Jeans;