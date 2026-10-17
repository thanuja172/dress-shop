import React from "react";
import { useNavigate } from "react-router-dom";

import image1 from "./assets/partywear/partywear1.jpg";
import image2 from "./assets/partywear/partywear2.jpg";
import image3 from "./assets/partywear/partywear3.jpg";
import image4 from "./assets/partywear/partywear4.jpg";
import image5 from "./assets/partywear/partywear5.jpg";

function PartyWear({ addToCart }) {
  const navigate = useNavigate();

  const products = [
    { name: "Party Wear 1", price: 1999, image: image1 },
    { name: "Party Wear 2", price: 2299, image: image2 },
    { name: "Party Wear 3", price: 2499, image: image3 },
    { name: "Party Wear 4", price: 2199, image: image4 },
    { name: "Party Wear 5", price: 2799, image: image5 }
  ];

  return (
    <div>
      <nav className="navbar">
        <h2>Fashion Store</h2>
        <button className="cart-btn" onClick={() => navigate("/cart")}>
          🛒 Cart
        </button>
      </nav>

      <h1 className="category-title">Party Wear Collection</h1>

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

export default PartyWear;