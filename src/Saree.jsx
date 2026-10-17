import React from "react";
import { useNavigate } from "react-router-dom";

import image1 from "./assets/saree/saree1.jpg";
import image2 from "./assets/saree/saree2.jpg";
import image3 from "./assets/saree/saree3.jpg";
import image4 from "./assets/saree/saree4.jpg";
import image5 from "./assets/saree/saree5.jpg";

function Saree({ addToCart }) {
  const navigate = useNavigate();

  const products = [
    { name: "Saree 1", price: 1599, image: image1 },
    { name: "Saree 2", price: 1799, image: image2 },
    { name: "Saree 3", price: 1999, image: image3 },
    { name: "Saree 4", price: 2199, image: image4 },
    { name: "Saree 5", price: 1899, image: image5 }
  ];

  return (
    <div>
      <nav className="navbar">
        <h2>Fashion Store</h2>
        <button className="cart-btn" onClick={() => navigate("/cart")}>
          🛒 Cart
        </button>
      </nav>

      <h1 className="category-title">Saree Collection</h1>

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

export default Saree;
