import React from "react";
import { useNavigate } from "react-router-dom";

import image1 from "./assets/tops/tops1.jpg";
import image2 from "./assets/tops/tops2.jpg";
import image3 from "./assets/tops/tops3.jpg";
import image4 from "./assets/tops/tops4.jpg";
import image5 from "./assets/tops/tops5.jpg";

function Tops({ addToCart }) {
  const navigate = useNavigate();

  const products = [
    { name: "Top 1", price: 699, image: image1 },
    { name: "Top 2", price: 799, image: image2 },
    { name: "Top 3", price: 899, image: image3 },
    { name: "Top 4", price: 749, image: image4 },
    { name: "Top 5", price: 999, image: image5 }
  ];

  return (
    <div>
      <nav className="navbar">
        <h2>Fashion Store</h2>
        <button className="cart-btn" onClick={() => navigate("/cart")}>
          🛒 Cart
        </button>
      </nav>

      <h1 className="category-title">Tops Collection</h1>

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

export default Tops;