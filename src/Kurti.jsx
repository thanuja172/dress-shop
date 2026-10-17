import React from "react";
import { useNavigate } from "react-router-dom";

import image1 from "./assets/kurti/kurti1.jpg";
import image2 from "./assets/kurti/kurti2.jpg";
import image3 from "./assets/kurti/kurti3.jpg";
import image4 from "./assets/kurti/kurti4.jpg";
import image5 from "./assets/kurti/kurti5.jpg";

function Kurti({ addToCart }) {
  const navigate = useNavigate();

  const products = [
    { name: "Kurti 1", price: 899, image: image1 },
    { name: "Kurti 2", price: 999, image: image2 },
    { name: "Kurti 3", price: 799, image: image3 },
    { name: "Kurti 4", price: 1099, image: image4 },
    { name: "Kurti 5", price: 1199, image: image5 }
  ];

  return (
    <div>
      <nav className="navbar">
        <h2>Fashion Store</h2>
        <button className="cart-btn" onClick={() => navigate("/cart")}>
          🛒 Cart
        </button>
      </nav>

      <h1 className="category-title">Kurti Collection</h1>

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

export default Kurti;