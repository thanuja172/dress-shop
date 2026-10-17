import React from "react";
import { useNavigate } from "react-router-dom";

import image1 from "./assets/western/western1.jpg";
import image2 from "./assets/western/western2.jpg";
import image3 from "./assets/western/western3.jpg";
import image4 from "./assets/western/western4.jpg";
import image5 from "./assets/western/western5.jpg";

function Western({ addToCart }) {
  const navigate = useNavigate();

  const products = [
    { name: "Western Wear 1", price: 1499, image: image1 },
    { name: "Western Wear 2", price: 1599, image: image2 },
    { name: "Western Wear 3", price: 1299, image: image3 },
    { name: "Western Wear 4", price: 1799, image: image4 },
    { name: "Western Wear 5", price: 1399, image: image5 }
  ];

  return (
    <ProductPage
      title="Western Wear"
      products={products}
      addToCart={addToCart}
      navigate={navigate}
    />
  );
}

function ProductPage({ title, products, addToCart, navigate }) {
  return (
    <div>
      <nav className="navbar">
        <h2>Fashion Store</h2>
        <button className="cart-btn" onClick={() => navigate("/cart")}>
          🛒 Cart
        </button>
      </nav>

      <h1 className="category-title">{title}</h1>

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

export default Western;